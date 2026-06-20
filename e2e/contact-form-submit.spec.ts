import { test, expect } from "@playwright/test";

test.describe("Contact form – submit flow", () => {
  /**
   * Before each test we intercept the two API endpoints so the tests run
   * without a real server, RESEND key, or the 3-second anti-bot timer.
   */
  test.beforeEach(async ({ page }) => {
    // Mock token endpoint – the component uses this to enable the submit button
    await page.route("**/api/contact-token", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token: "test-token-e2e" }),
      });
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.locator("#contact").scrollIntoViewIfNeeded();
  });

  test("fills and submits the form successfully", async ({ page }) => {
    // Mock a successful POST /api/contact
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, id: "mock-email-id" }),
      });
    });

    await page.locator('input[name="name"]').fill("Jane Doe");
    await page.locator('input[name="email"]').fill("jane@example.com");
    await page.locator('textarea[name="message"]').fill("Hello! This is a test message from Playwright.");

    // Submit button must be enabled (token loaded)
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeEnabled({ timeout: 5000 });
    await submitBtn.click();

    // Success message should appear
    await expect(
      page.getByText("Message sent! I'll get back to you soon.")
    ).toBeVisible({ timeout: 5000 });
  });

  test("shows error message when the API fails", async ({ page }) => {
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ error: "Failed to send email" }),
      });
    });

    await page.locator('input[name="name"]').fill("John Error");
    await page.locator('input[name="email"]').fill("john@example.com");
    await page.locator('textarea[name="message"]').fill("This message should trigger an error.");

    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeEnabled({ timeout: 5000 });
    await submitBtn.click();

    await expect(
      page.getByText("Failed to send email")
    ).toBeVisible({ timeout: 5000 });
  });

  test("submit button stays disabled when token is missing", async ({ page }) => {
    // Override the token mock to return empty token
    await page.route("**/api/contact-token", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ token: "" }),
      });
    });

    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeDisabled({ timeout: 5000 });
  });

  test("form resets after a successful submission", async ({ page }) => {
    await page.route("**/api/contact", (route) => {
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true, id: "mock-email-id" }),
      });
    });

    await page.locator('input[name="name"]').fill("Reset Test");
    await page.locator('input[name="email"]').fill("reset@example.com");
    await page.locator('textarea[name="message"]').fill("Message that should disappear after submit.");

    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeEnabled({ timeout: 5000 });
    await submitBtn.click();

    await expect(page.getByText("Message sent!")).toBeVisible({ timeout: 5000 });

    // Fields should be cleared after successful submission
    await expect(page.locator('input[name="name"]')).toHaveValue("");
    await expect(page.locator('input[name="email"]')).toHaveValue("");
    await expect(page.locator('textarea[name="message"]')).toHaveValue("");
  });

  test("verifies the POST payload contains expected fields", async ({ page }) => {
    let capturedBody: Record<string, unknown> = {};

    await page.route("**/api/contact", async (route) => {
      const request = route.request();
      capturedBody = JSON.parse(request.postData() ?? "{}");
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ success: true }),
      });
    });

    await page.locator('input[name="name"]').fill("Payload Checker");
    await page.locator('input[name="email"]').fill("payload@example.com");
    await page.locator('textarea[name="message"]').fill("Checking the request payload.");

    await expect(page.locator('button[type="submit"]')).toBeEnabled({ timeout: 5000 });
    await page.locator('button[type="submit"]').click();

    await expect(page.getByText("Message sent!")).toBeVisible({ timeout: 5000 });

    expect(capturedBody.name).toBe("Payload Checker");
    expect(capturedBody.email).toBe("payload@example.com");
    expect(capturedBody.message).toBe("Checking the request payload.");
    expect(capturedBody._token).toBe("test-token-e2e");
    // Honeypot must be empty
    expect(capturedBody.fax).toBeFalsy();
  });
});

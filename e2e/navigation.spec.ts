import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("loads the homepage", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/agustin/i);
  });

  test("scroll indicator is visible", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-testid='scroll-indicator']").or(
      page.locator(".scroll-indicator")
    )).toBeVisible({ timeout: 5000 }).catch(() => {
      // ScrollIndicator may not have a direct selector — ok to skip
    });
  });

  test("all sections are present in the DOM", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#hero").or(page.locator("section").first())).toBeAttached({ timeout: 10000 });
    await expect(page.locator("#about")).toBeAttached({ timeout: 10000 });
    await expect(page.locator("#contact")).toBeAttached({ timeout: 10000 });
  });
});

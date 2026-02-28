import { useState } from "react";
import { Mail } from "lucide-react";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      message: formData.get("message") ?? "",
    };

    setStatus("loading");
    setErrorMessage("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setStatus("error");
      setErrorMessage(data.error ?? "Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    form.reset();
  }

  return (
    <div
      id="contact"
      className="container-section flex-col bg-white p-0 snap-start"
    >
      <div className="container-content mx-auto flex-1 ">
        <div className="flex flex-col items-center justify-center">
          <Typography.H2 className="text-center">Let's talk!</Typography.H2>
          <form
            onSubmit={handleSubmit}
            className="mt-8 w-full max-w-xl space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  className="h-10 border-border"
                  required
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="h-10 border-border"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-foreground"
              >
                Your message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Type your message here"
                rows={5}
                className="min-h-24 border-border"
                required
              />
              <p className="text-xs text-muted-foreground">
                Your message will be copied to the support team.
              </p>
            </div>
            {status === "success" && (
              <p className="text-center text-sm text-green-600">
                Message sent! I'll get back to you soon.
              </p>
            )}
            {status === "error" && errorMessage && (
              <p className="text-center text-sm text-red-600">{errorMessage}</p>
            )}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={status === "loading"}
                className="bg-violet-600 px-6 py-3 font-semibold uppercase text-white hover:bg-violet-700 disabled:opacity-70"
              >
                <Mail className="size-4" />
                {status === "loading" ? "Sending…" : "SHOOT!"}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="bg-violet-800 min-h-56 ">
        <div className="container-content mx-auto flex-1 px-12 xl:px-0 space-y-4">
          <Typography.P className="text-yellow-300 font-semibold">
            SAY HELLO! 👋
          </Typography.P>
          <a href="mailto:agustinrzarate@gmail.com">
            <Typography.P className="text-white">
            -
            </Typography.P>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;

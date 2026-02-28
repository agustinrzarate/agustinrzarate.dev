import { useState, useEffect, useRef } from "react";
import { Linkedin, Mail } from "lucide-react";
import Typography from "../ui/typography";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type SubmitStatus = "idle" | "loading" | "success" | "error";

function Contact() {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const formReadyAt = useRef<number>(0);

  useEffect(() => {
    formReadyAt.current = Date.now();
    fetch("/api/contact-token")
      .then((r) => r.json())
      .then((data) => setToken(data.token ?? ""))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!token) {
      setStatus("error");
      setErrorMessage("Please refresh the page and try again.");
      return;
    }
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") ?? "",
      email: formData.get("email") ?? "",
      message: formData.get("message") ?? "",
      fax: formData.get("fax") ?? "",
      _token: token,
      _formReadyAt: formReadyAt.current,
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
    formReadyAt.current = Date.now();
    fetch("/api/contact-token")
      .then((r) => r.json())
      .then((data) => setToken(data.token ?? ""))
      .catch(() => {});
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
            {/* Honeypot: name chosen so browsers don't autofill it (e.g. "fax") */}
            <div
              className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden opacity-0"
              aria-hidden="true"
            >
              <label htmlFor="fax">Fax</label>
              <Input
                id="fax"
                name="fax"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
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
                  maxLength={200}
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
                  maxLength={320}
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
                placeholder="Type your message here (min 10 characters)"
                rows={5}
                className="min-h-24 border-border"
                required
                minLength={10}
                maxLength={5000}
              />
              <p className="text-xs text-muted-foreground">
                Your message  
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
                disabled={status === "loading" || !token}
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
          <a href="https://www.linkedin.com/in/agustin-zarate/" className="flex gap-2 border-b border-white pb-2 w-40" target="_blank">
          <Linkedin color="white" />
          <span className="text-white">agustin-zarate</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;

import { useState, useEffect, useRef } from "react";
import { Linkedin, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useInView } from "@/hooks/useInView";

type SubmitStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MSG_MIN = 10;
const MSG_MAX = 5000;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};

  if (!name.trim()) {
    errors.name = "Name is required.";
  } else if (name.startsWith(" ")) {
    errors.name = "Name must not start with a space.";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!message.trim()) {
    errors.message = "Message is required.";
  } else if (message.trim().length < MSG_MIN) {
    errors.message = `Message must be at least ${MSG_MIN} characters.`;
  } else if (message.trim().length > MSG_MAX) {
    errors.message = `Message must not exceed ${MSG_MAX} characters.`;
  }

  return errors;
}

function Contact() {
  const { ref, inView } = useInView(0.1);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formReadyAt = useRef<number>(0);

  useEffect(() => {
    formReadyAt.current = Date.now();
    fetch("/api/contact-token")
      .then((r) => r.json())
      .then((data) => setToken(data.token ?? ""))
      .catch(() => {});
  }, []);

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const form = e.target.form;
    if (!form) return;
    const data = new FormData(form);
    const errors = validate(
      String(data.get("name") ?? ""),
      String(data.get("email") ?? ""),
      String(data.get("message") ?? "")
    );
    setFieldErrors(errors);

    // Live-clear the specific field error once it becomes valid
    if (!errors[name as keyof FieldErrors]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (!touched[e.target.name]) return;
    const form = e.target.form;
    if (!form) return;
    const data = new FormData(form);
    const errors = validate(
      String(data.get("name") ?? ""),
      String(data.get("email") ?? ""),
      String(data.get("message") ?? "")
    );
    setFieldErrors(errors);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const message = String(formData.get("message") ?? "");

    // Mark all touched to show all errors
    setTouched({ name: true, email: true, message: true });
    const errors = validate(name, email, message);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (!token) {
      setStatus("error");
      setErrorMessage("Please refresh the page and try again.");
      return;
    }

    const payload = {
      name,
      email,
      message,
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
    setFieldErrors({});
    setTouched({});
    formReadyAt.current = Date.now();
    fetch("/api/contact-token")
      .then((r) => r.json())
      .then((d) => setToken(d.token ?? ""))
      .catch(() => {});
  }

  return (
    <div
      id="contact"
      className="container-section flex-col bg-white p-0 snap-start"
    >
      <div
        ref={ref}
        className="container-content mx-auto flex-1 px-6 sm:px-8 md:px-12"
      >
        <div className="flex flex-col max-w-2xl">
          {/* Section label */}
          <p
            className={`text-xs font-semibold text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-4 sm:mb-6 ${
              inView ? "anim-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "100ms" }}
          >
            <span>04</span>
            <span className="inline-block w-8 h-px bg-gray-300" />
            <span>CONTACT</span>
          </p>

          {/* Heading */}
          <h2
            className={`font-extrabold leading-tight mb-3 ${
              inView ? "anim-blur-up" : "opacity-0"
            }`}
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              animationDelay: "200ms",
            }}
          >
            <span className="text-gray-900">Let's </span>
            <span className="text-violet-600">talk!</span>
          </h2>

          <p
            className={`text-gray-500 text-sm leading-relaxed mb-6 sm:mb-8 ${
              inView ? "anim-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "320ms" }}
          >
            Have a project in mind or want to discuss an opportunity?
            <br />
            Send me a message and I'll get back to you within 24 hours.
          </p>

          {/* noValidate disables native browser popup validation */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className={`space-y-4 sm:space-y-5 ${
              inView ? "anim-fade-up" : "opacity-0"
            }`}
            style={{ animationDelay: "440ms" }}
          >
            {/* Honeypot */}
            <div
              className="absolute left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0"
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

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  maxLength={200}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={touched.name && !!fieldErrors.name}
                  aria-describedby={
                    touched.name && fieldErrors.name ? "name-error" : undefined
                  }
                  className={`h-11 bg-gray-50 focus:bg-white transition-colors ${
                    touched.name && fieldErrors.name
                      ? "border-red-400 focus-visible:ring-red-300"
                      : "border-gray-200"
                  }`}
                />
                {touched.name && fieldErrors.name && (
                  <p
                    id="name-error"
                    role="alert"
                    className="text-xs text-red-500 flex items-center gap-1"
                  >
                    <span aria-hidden="true">⚠</span> {fieldErrors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  maxLength={320}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  aria-invalid={touched.email && !!fieldErrors.email}
                  aria-describedby={
                    touched.email && fieldErrors.email
                      ? "email-error"
                      : undefined
                  }
                  className={`h-11 bg-gray-50 focus:bg-white transition-colors ${
                    touched.email && fieldErrors.email
                      ? "border-red-400 focus-visible:ring-red-300"
                      : "border-gray-200"
                  }`}
                />
                {touched.email && fieldErrors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-red-500 flex items-center gap-1"
                  >
                    <span aria-hidden="true">⚠</span> {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Your message
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder={`Type your message here (min ${MSG_MIN} characters)`}
                rows={4}
                maxLength={MSG_MAX}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={touched.message && !!fieldErrors.message}
                aria-describedby={
                  touched.message && fieldErrors.message
                    ? "message-error"
                    : undefined
                }
                className={`min-h-24 sm:min-h-28 bg-gray-50 focus:bg-white resize-none transition-colors ${
                  touched.message && fieldErrors.message
                    ? "border-red-400 focus-visible:ring-red-300"
                    : "border-gray-200"
                }`}
              />
              {touched.message && fieldErrors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="text-xs text-red-500 flex items-center gap-1"
                >
                  <span aria-hidden="true">⚠</span> {fieldErrors.message}
                </p>
              )}
            </div>

            {/* Live region — announces form result to screen readers */}
            <div aria-live="polite" aria-atomic="true">
              {status === "success" && (
                <p className="text-sm text-green-600 font-medium bg-green-50 border border-green-200 rounded-lg px-4 py-3">
                  Message sent! I'll get back to you soon.
                </p>
              )}
              {status === "error" && errorMessage && (
                <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={status === "loading" || !token}
                className="bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 rounded-full disabled:opacity-70 flex items-center gap-2"
              >
                <Send className="size-4" />
                {status === "loading" ? "Sending…" : "Shoot!"}
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-violet-800 w-full">
        <div className="container-content mx-auto py-10 px-6 xl:px-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-3">
            <p className="text-yellow-300 font-semibold text-sm tracking-wide">
              SAY HELLO! 👋
            </p>
            <a
              href="https://www.linkedin.com/in/agustin-zarate/"
              className="flex items-center gap-2 text-white hover:text-yellow-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="size-4" />
              <span className="text-sm font-medium">/agustin-zarate</span>
              <span className="text-xs opacity-60">↗</span>
            </a>
          </div>
          <p className="text-white/75 text-xs">© 2026 Agustin Zarate</p>
        </div>
      </div>
    </div>
  );
}

export default Contact;

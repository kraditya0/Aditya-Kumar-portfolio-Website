"use client";

import { ArrowRight, Check, Copy, LoaderCircle, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { contact } from "@/data/content";
import { ResumeLink } from "./ResumeLink";
import { Reveal } from "./Reveal";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const initialFields: Fields = { name: "", email: "", message: "" };
const formEndpoint =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xwleobob";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Errors>({});
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [emailCopied, setEmailCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contact.email);
    } catch {
      const input = document.createElement("input");
      input.value = contact.email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2200);
  }

  function validate() {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = "Enter a valid email address.";
    if (fields.message.trim().length < 10) next.message = "Please add a little more detail.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate() || submitStatus === "submitting") return;

    setSubmitStatus("submitting");

    const formData = new FormData();
    formData.append("name", fields.name.trim());
    formData.append("email", fields.email.trim());
    formData.append("message", fields.message.trim());
    formData.append("_subject", `Portfolio enquiry from ${fields.name.trim()}`);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Form submission failed");

      setFields(initialFields);
      setErrors({});
      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    }
  }

  function update(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (submitStatus !== "idle" && submitStatus !== "submitting") setSubmitStatus("idle");
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <p className="section-kicker">06 / Contact</p>
          <h2>Let&apos;s build something useful.</h2>
          <p className="section-lead">Have a project, idea, or opportunity? I&apos;d love to hear about it.</p>
          <div className="contact-email-row">
            <a href={`mailto:${contact.email}`} className="contact-email"><Mail size={18} />{contact.email}</a>
            <button
              className="copy-email-button"
              type="button"
              onClick={copyEmail}
              aria-label={emailCopied ? "Email copied" : "Copy email address"}
              title={emailCopied ? "Copied" : "Copy email"}
            >
              {emailCopied ? <Check size={15} /> : <Copy size={15} />}
              <span aria-live="polite">{emailCopied ? "Copied" : "Copy"}</span>
            </button>
          </div>
          <ResumeLink />
        </Reveal>

        <Reveal className="contact-form-wrap" delay={0.1}>
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={fields.name}
                  onChange={(event) => update("name", event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  placeholder="Your name"
                />
                {errors.name && <span className="form-error" id="name-error">{errors.name}</span>}
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  placeholder="you@example.com"
                />
                {errors.email && <span className="form-error" id="email-error">{errors.email}</span>}
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={fields.message}
                onChange={(event) => update("message", event.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                placeholder="Tell me about the project, role, or idea."
              />
              {errors.message && <span className="form-error" id="message-error">{errors.message}</span>}
            </div>
            <button
              className="button button-primary submit-button"
              type="submit"
              disabled={submitStatus === "submitting"}
            >
              {submitStatus === "submitting" ? (
                <>Sending <LoaderCircle className="submit-spinner" size={18} /></>
              ) : submitStatus === "success" ? (
                <>Message Sent <Check size={18} /></>
              ) : (
                <>Send Message <ArrowRight size={18} /></>
              )}
            </button>
            <div className="form-feedback" aria-live="polite">
              {submitStatus === "success" && (
                <p className="form-success" role="status">Thanks. Your message has been sent successfully.</p>
              )}
              {submitStatus === "error" && (
                <p className="form-submit-error" role="alert">
                  The message could not be sent. Please try again or email me directly.
                </p>
              )}
            </div>
            <p className="form-note">Delivered securely through Formspree.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

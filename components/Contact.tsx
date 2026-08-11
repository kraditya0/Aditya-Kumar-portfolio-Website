"use client";

import { ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";
import { contact } from "@/data/content";
import { ResumeLink } from "./ResumeLink";
import { Reveal } from "./Reveal";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const initialFields: Fields = { name: "", email: "", message: "" };

export function Contact() {
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Errors>({});

  function validate() {
    const next: Errors = {};
    if (fields.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) next.email = "Enter a valid email address.";
    if (fields.message.trim().length < 10) next.message = "Please add a little more detail.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(`Portfolio enquiry from ${fields.name}`);
    const body = encodeURIComponent(`${fields.message}\n\nFrom: ${fields.name}\nEmail: ${fields.email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  function update(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <p className="section-kicker">06 / Contact</p>
          <h2>Let&apos;s build something useful.</h2>
          <p className="section-lead">Have a project, idea, or opportunity? I&apos;d love to hear about it.</p>
          <a href={`mailto:${contact.email}`} className="contact-email"><Mail size={18} />{contact.email}</a>
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
            <button className="button button-primary submit-button" type="submit">
              Send Message <ArrowRight size={18} />
            </button>
            <p className="form-note">Opens your email client. No form data is stored.</p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

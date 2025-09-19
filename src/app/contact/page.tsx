"use client";

import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactUsPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate a submission, reset, and show success
    try {
      // Here you would call your backend API to submit the form
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormStatus({
        type: "success",
        message: "Thank you! Your message has been sent.",
      });
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus({
        type: "error",
        message: "Oops! Something went wrong, please try again later.",
      });
    }
  };

  return (
    <main className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] min-h-screen py-20 px-6 sm:px-12 lg:px-20">
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-serif font-black mb-4">Contact Us</h1>
        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-xl mx-auto leading-relaxed">
          We would love to hear from you — whether you have questions about an
          order, want fashion advice, or just want to say hello.
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Contact Info */}
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-black mb-6 text-[hsl(var(--accent))]">
              Get in touch
            </h2>
            <p className="mb-6 text-[hsl(var(--muted-foreground))] leading-relaxed">
              Our customer support team is here to assist you from 9am to 6pm,
              Monday to Friday.
            </p>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <MapPin className="text-[hsl(var(--brand-accent))] w-8 h-8" />
                <address className="not-italic">
                  123 Fashion Avenue,
                  <br />
                  Style City, AM 45678
                </address>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-[hsl(var(--brand-accent))] w-8 h-8" />
                <a
                  href="tel:+18001234567"
                  className="underline hover:text-[hsl(var(--accent))]"
                >
                  +1 (800) 123-4567
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Mail className="text-[hsl(var(--brand-accent))] w-8 h-8" />
                <a
                  href="mailto:support@amado.com"
                  className="underline hover:text-[hsl(var(--accent))]"
                >
                  support@amado.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Clock className="text-[hsl(var(--brand-accent))] w-8 h-8" />
                <span>Support Hours: 9:00 AM - 6:00 PM (Mon-Fri)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl p-8 sm:p-12 flex flex-col gap-6"
          noValidate
        >
          <h2 className="text-3xl font-black mb-6 text-[hsl(var(--accent))] text-center">
            Send us a message
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="p-4 rounded border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--brand-accent))] outline-none"
            required
            value={formState.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="p-4 rounded border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--brand-accent))] outline-none"
            required
            value={formState.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            className="p-4 rounded border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--brand-accent))] outline-none"
            required
            value={formState.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Your Message"
            className="p-4 rounded border border-[hsl(var(--border))] focus:ring-2 focus:ring-[hsl(var(--brand-accent))] outline-none resize-none"
            required
            value={formState.message}
            onChange={handleChange}
          />

          {formStatus && (
            <p
              className={`text-center font-semibold ${
                formStatus.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {formStatus.message}
            </p>
          )}

          <button
            type="submit"
            className="btn-accent px-6 py-4 rounded font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send size={20} />
            Send Message
          </button>
        </form>
      </div>
    </main>
  );
}

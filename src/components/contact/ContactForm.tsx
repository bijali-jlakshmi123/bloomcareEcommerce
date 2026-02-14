"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStatus("loading");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      setErrorMsg("Please fill in all required fields.");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setErrorMsg("Failed to send message. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="p-6 lg:p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg">
      <h2 className="text-xl font-bold mb-6">Send us a Message</h2>

      {status === "success" && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
          Thank you! Your message has been sent. We&apos;ll get back to you within 24 hours.
        </div>
      )}

      {status === "error" && errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <Input
            label="Name *"
            name="name"
            type="text"
            placeholder="Your name"
            required
          />
          <Input
            label="Email *"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>
        <Input
          label="Subject"
          name="subject"
          type="text"
          placeholder="How can we help?"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Message *
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Your message..."
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none transition-all resize-none"
          />
        </div>
        <Button
          type="submit"
          fullWidth
          isLoading={status === "loading"}
          disabled={status === "loading"}
        >
          Send Message
        </Button>
      </form>
    </div>
  );
}

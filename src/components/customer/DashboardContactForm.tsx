"use client";

import { CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { useState } from "react";

export default function DashboardContactForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFeedback(null);
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: subject, message }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message ?? "Could not send your message.");
      setSubject("");
      setMessage("");
      setFeedback({ type: "success", text: result.message ?? "Message sent to the salon team." });
    } catch (error: unknown) {
      setFeedback({
        type: "error",
        text: error instanceof Error ? error.message : "Could not send your message.",
      });
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-rose-100 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
      <p className="mt-2 text-gray-500">Your message will be delivered to the admin notification inbox.</p>

      {feedback && (
        <div
          className={`mt-5 flex items-center gap-2 rounded-xl p-4 text-sm ${
            feedback.type === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          <CheckCircle2 size={18} />
          {feedback.text}
        </div>
      )}

      <div className="mt-6 space-y-5">
        <label className="block text-sm font-semibold text-gray-700">
          Subject
          <input
            required
            maxLength={100}
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="mt-2 w-full rounded-xl border border-rose-100 p-3 font-normal outline-none focus:border-rose-500"
          />
        </label>
        <label className="block text-sm font-semibold text-gray-700">
          Message
          <textarea
            required
            maxLength={1000}
            rows={7}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className="mt-2 w-full resize-none rounded-xl border border-rose-100 p-3 font-normal outline-none focus:border-rose-500"
          />
        </label>
      </div>

      <button
        disabled={sending}
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-rose-700 px-6 py-3 font-semibold text-white transition hover:bg-rose-800 disabled:opacity-60"
      >
        {sending ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
        Send Message
      </button>
    </form>
  );
}

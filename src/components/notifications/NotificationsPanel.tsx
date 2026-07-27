"use client";

import { Check, Inbox, LoaderCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { NotificationView } from "@/src/types/notification";

type CustomerOption = { id: string; name: string; email: string };

export default function NotificationsPanel({ role }: { role: "customer" | "admin" }) {
  const [box, setBox] = useState<"inbox" | "sent">("inbox");
  const [notifications, setNotifications] = useState<NotificationView[]>([]);
  const [customers, setCustomers] = useState<CustomerOption[]>([]);
  const [selected, setSelected] = useState<NotificationView | null>(null);
  const [composing, setComposing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [form, setForm] = useState({ recipientId: "", title: "", message: "" });

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/notifications?box=${box}`, { cache: "no-store" });
      const data = await response.json() as {
        notifications?: NotificationView[];
        message?: string;
      };
      if (!response.ok) throw new Error(data.message ?? "Could not load notifications.");
      setNotifications(data.notifications ?? []);
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not load notifications.");
    } finally {
      setLoading(false);
    }
  }, [box]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void loadNotifications(), 0);
    return () => window.clearTimeout(timeout);
  }, [loadNotifications]);

  useEffect(() => {
    if (role !== "admin") return;
    async function loadCustomers() {
      const response = await fetch("/api/admin/customers", { cache: "no-store" });
      if (!response.ok) return;
      const data = await response.json() as {
        customers?: Array<{ _id: string; name: string; email: string }>;
      };
      setCustomers((data.customers ?? []).map((customer) => ({
        id: customer._id,
        name: customer.name,
        email: customer.email,
      })));
    }
    void loadCustomers();
  }, [role]);

  async function openNotification(notification: NotificationView) {
    setSelected(notification);
    if (box !== "inbox" || notification.readAt) return;
    const response = await fetch(`/api/notifications/${notification.id}`, { method: "PATCH" });
    if (response.ok) {
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id ? { ...item, readAt: new Date().toISOString() } : item,
        ),
      );
    }
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setFeedback("");
    try {
      const response = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error(data.message ?? "Could not send notification.");
      setFeedback(data.message ?? "Notification sent.");
      setForm({ recipientId: "", title: "", message: "" });
      setComposing(false);
      setBox("sent");
      if (box === "sent") await loadNotifications();
    } catch (error) {
      setFeedback(error instanceof Error ? error.message : "Could not send notification.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className={role === "admin" ? "mx-auto max-w-6xl" : "mx-auto max-w-5xl"}>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-rose-700">
            Communication
          </p>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-500">
            {role === "admin"
              ? "Receive customer messages and notify a customer."
              : "Receive salon updates and contact the salon team."}
          </p>
        </div>
        <button
          onClick={() => setComposing(true)}
          className="inline-flex items-center gap-2 rounded-xl bg-rose-700 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-rose-800"
        >
          <Send size={18} />
          New message
        </button>
      </div>

      {feedback && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-rose-100 bg-white p-4 text-sm text-gray-700">
          <Check size={17} className="text-rose-700" />
          {feedback}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-rose-100 bg-white shadow-sm">
        <div className="flex border-b border-rose-100 p-2">
          {(["inbox", "sent"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setBox(tab);
                setSelected(null);
              }}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-semibold capitalize ${
                box === tab ? "bg-rose-700 text-white" : "text-gray-600 hover:bg-rose-50"
              }`}
            >
              {tab === "inbox" ? <Inbox size={18} /> : <Send size={18} />}
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center text-rose-700">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <Inbox size={38} className="mb-3 text-rose-300" />
            <p className="font-semibold text-gray-700">No {box} notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-rose-50">
            {notifications.map((notification) => {
              const person = box === "inbox" ? notification.sender : notification.recipient;
              return (
                <button
                  key={notification.id}
                  onClick={() => void openNotification(notification)}
                  className={`flex w-full items-start gap-4 p-5 text-left transition hover:bg-rose-50 ${
                    box === "inbox" && !notification.readAt ? "bg-rose-50/60" : ""
                  }`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-700">
                    {person.name.slice(0, 1).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-gray-900">{person.name}</span>
                      <span className="shrink-0 text-xs text-gray-400">
                        {new Date(notification.createdAt).toLocaleString()}
                      </span>
                    </span>
                    <span className="mt-1 block font-medium text-gray-700">{notification.title}</span>
                    <span className="mt-1 block truncate text-sm text-gray-500">{notification.message}</span>
                  </span>
                  {box === "inbox" && !notification.readAt && (
                    <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-rose-600" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
          <article className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  {box === "inbox" ? `From ${selected.sender.name}` : `To ${selected.recipient.name}`}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900">{selected.title}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-full p-2 hover:bg-rose-50">
                <X />
              </button>
            </div>
            <p className="whitespace-pre-wrap leading-7 text-gray-700">{selected.message}</p>
            <p className="mt-6 text-xs text-gray-400">
              {new Date(selected.createdAt).toLocaleString()}
            </p>
          </article>
        </div>
      )}

      {composing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4">
          <form onSubmit={submit} className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">New message</h2>
              <button type="button" onClick={() => setComposing(false)} className="rounded-full p-2 hover:bg-rose-50">
                <X />
              </button>
            </div>
            <div className="space-y-4">
              {role === "admin" && (
                <label className="block text-sm font-semibold text-gray-700">
                  Customer
                  <select
                    required
                    value={form.recipientId}
                    onChange={(event) => setForm({ ...form, recipientId: event.target.value })}
                    className="mt-2 w-full rounded-xl border border-rose-100 bg-white p-3 font-normal outline-none focus:border-rose-500"
                  >
                    <option value="">Select a customer</option>
                    {customers.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name} — {customer.email}
                      </option>
                    ))}
                  </select>
                </label>
              )}
              {role === "customer" && (
                <p className="rounded-xl bg-rose-50 p-3 text-sm text-gray-600">
                  This message will be delivered to the salon admin team.
                </p>
              )}
              <label className="block text-sm font-semibold text-gray-700">
                Subject
                <input
                  required
                  maxLength={100}
                  value={form.title}
                  onChange={(event) => setForm({ ...form, title: event.target.value })}
                  className="mt-2 w-full rounded-xl border border-rose-100 p-3 font-normal outline-none focus:border-rose-500"
                />
              </label>
              <label className="block text-sm font-semibold text-gray-700">
                Message
                <textarea
                  required
                  maxLength={1000}
                  rows={6}
                  value={form.message}
                  onChange={(event) => setForm({ ...form, message: event.target.value })}
                  className="mt-2 w-full resize-none rounded-xl border border-rose-100 p-3 font-normal outline-none focus:border-rose-500"
                />
              </label>
            </div>
            <button
              disabled={sending}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-rose-700 py-3 font-semibold text-white disabled:opacity-60"
            >
              {sending ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}
              Send message
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

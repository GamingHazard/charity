"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5454/api";

type UnsubscribeState = "loading" | "success" | "error";

export default function NewsletterUnsubscribePage() {
  const [state, setState] = useState<UnsubscribeState>("loading");
  const [message, setMessage] = useState("Updating your newsletter preferences...");

  useEffect(() => {
    const tokenParam = new URLSearchParams(window.location.search).get("token");
    if (!tokenParam) {
      setState("error");
      setMessage("This unsubscribe link is missing a valid token.");
      return;
    }
    const token = tokenParam;

    async function unsubscribe() {
      try {
        const response = await fetch(`${API_BASE_URL}/newsletter/unsubscribe/${encodeURIComponent(token)}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || "Unable to unsubscribe right now.");
        setState("success");
        setMessage(data.message || "You have been unsubscribed from the newsletter.");
      } catch (error) {
        setState("error");
        setMessage(error instanceof Error ? error.message : "Unable to unsubscribe right now.");
      }
    }

    void unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          {state === "loading" ? "Updating preferences" : state === "success" ? "You are unsubscribed" : "Unsubscribe unavailable"}
        </h1>
        <p className="mt-4 text-muted-foreground" role={state === "error" ? "alert" : "status"}>
          {message}
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Return to homepage</Link>
        </Button>
      </section>
    </main>
  );
}

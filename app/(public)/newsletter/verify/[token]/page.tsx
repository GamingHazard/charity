"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5454/api";

type VerificationState = "loading" | "success" | "error";

export default function NewsletterVerificationPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const [state, setState] = useState<VerificationState>("loading");
  const [message, setMessage] = useState("Confirming your newsletter subscription...");

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const { token } = await params;
      try {
        const response = await fetch(`${API_BASE_URL}/newsletter/verify/${encodeURIComponent(token)}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data?.message || "This verification link is invalid or expired.");
        if (!cancelled) {
          setState("success");
          setMessage(data.message || "Your newsletter subscription has been confirmed.");
        }
      } catch (error) {
        if (!cancelled) {
          setState("error");
          setMessage(error instanceof Error ? error.message : "Unable to verify your subscription.");
        }
      }
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [params]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <section className="w-full max-w-lg rounded-lg border border-border bg-card p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-foreground">
          {state === "loading" ? "Confirming subscription" : state === "success" ? "Subscription confirmed" : "Verification unavailable"}
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

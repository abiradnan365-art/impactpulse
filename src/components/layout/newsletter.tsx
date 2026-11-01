"use client"

import * as React from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Newsletter() {
  const [email, setEmail] = React.useState("")
  const [subscribed, setSubscribed] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <section className="px-4 mt-10 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-3xl rounded-4xl border border-emerald-200/70 bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-transparent px-6 py-14 text-center shadow-sm shadow-emerald-200/50 sm:px-10 dark:border-emerald-500/15 dark:from-emerald-950/50 dark:via-emerald-950/20 dark:to-transparent dark:shadow-black/20">
        <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400">
          Stay Connected
        </p>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Subscribe to Local Cause Alerts
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
          Get notified when new winter drives, blanket distributions, or
          emergency cleanups are organized in your neighborhood.
        </p>

        {subscribed ? (
          <div className="mx-auto mt-8 flex h-12 max-w-xl items-center justify-center rounded-xl border border-emerald-300/60 bg-emerald-100/60 text-sm font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
            You&apos;re subscribed! Watch your inbox for local cause alerts.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              className="h-12 min-w-0 flex-1 rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-emerald-400 focus:ring-3 focus:ring-emerald-400/25 dark:focus:border-emerald-400/60 dark:focus:ring-emerald-400/15"
            />
            <Button
              type="submit"
              className="h-12 rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700"
            >
              <Send className="size-4" data-icon="inline-start" />
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-5 text-sm text-muted-foreground">
          No spam guaranteed. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}

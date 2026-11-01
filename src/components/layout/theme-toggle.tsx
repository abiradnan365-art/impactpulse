"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

const THEME_KEY = "impactpulse-theme"
const THEME_EVENT = "impactpulse:theme-change"

type Theme = "light" | "dark"

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(THEME_EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

// The pre-paint script in the root layout may or may not have added `.dark`
// based on localStorage; server HTML always assumes light.
function getServerSnapshot(): Theme {
  return "light"
}

export function ThemeToggle() {
  const theme = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  function toggleTheme() {
    const next: Theme = theme === "dark" ? "light" : "dark"
    document.documentElement.classList.toggle("dark", next === "dark")
    try {
      window.localStorage.setItem(THEME_KEY, next)
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still works for the session
    }
    window.dispatchEvent(new Event(THEME_EVENT))
  }

  return (
    <Button
      variant="outline"
      size="icon"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={toggleTheme}
      className="size-10 rounded-full border-amber-200 text-amber-500 hover:bg-amber-50 hover:text-amber-600 dark:border-amber-400/30 dark:bg-transparent dark:text-amber-400 dark:hover:bg-amber-400/10"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

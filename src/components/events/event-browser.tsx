"use client"

import * as React from "react"
import { SearchIcon } from "lucide-react"

import { EventCard, type DisplayEvent } from "@/components/events/event-card"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "cn"

const TODAY = new Date().toLocaleDateString("en-CA")

const categories = [
  "All",
  "Donation",
  "Cleanup Drive",
  "Blood Donation",
  "Relief Distribution",
  "Tree Plantation",
] as const

export function EventBrowser({ events }: { events: DisplayEvent[] }) {
  const [category, setCategory] = React.useState<string>("All")
  const [query, setQuery] = React.useState("")

  // Past events are excluded automatically, as promised in the subtitle.
  const upcoming = events.filter(
    (event) => event.eventDate === "" || event.eventDate >= TODAY
  )
  const visible = upcoming.filter((event) => {
    const inCategory = category === "All" || event.eventType === category
    if (!inCategory) return false
    const needle = query.trim().toLowerCase()
    if (!needle) return true
    return [event.title, event.location, event.eventType].some((field) =>
      field.toLowerCase().includes(needle)
    )
  })

  function resetFilters() {
    setCategory("All")
    setQuery("")
  }

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Category chips */}
        <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                category === item
                  ? "border-transparent bg-emerald-700 text-white"
                  : "border-border bg-card text-foreground/80 hover:border-emerald-300 hover:text-emerald-700"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Search */}
        <InputGroup className="h-10 w-full rounded-full sm:w-72 lg:ml-auto">
          <InputGroupAddon>
            <SearchIcon className="text-muted-foreground" />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            aria-label="Search events"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search events or areas..."
          />
        </InputGroup>
      </div>

      {/* Grid */}
      {visible.length > 0 ? (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
          <p className="text-lg font-bold text-foreground">
            No upcoming events found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {query || category !== "All"
              ? "Try a different category or search term."
              : "Check back soon — new drives are added regularly."}
          </p>
          {(query || category !== "All") && (
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 text-sm font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}

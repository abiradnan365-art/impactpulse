import { Suspense } from "react";
import { CalendarDays, CirclePlus } from "lucide-react";
import { format, parseISO } from "date-fns";
import Link from "next/link";

import { EventBrowser } from "@/components/events/event-browser";
import { type DisplayEvent } from "@/components/events/event-card";
import { Badge } from "@/components/ui/badge";

type RawEvent = Record<string, unknown>;

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function normalizeEvent(raw: unknown, index: number): DisplayEvent {
  const record = (raw ?? {}) as RawEvent;
  const eventDate = asString(record.eventDate ?? record.date, "").slice(0, 10);
  const organizer = asString(record.organizerName ?? record.organizer, ",");

  return {
    id: asString(record._id ?? record.id, `event-${index}`),
    title: asString(record.title, "Untitled Event").trim() || "Untitled Event",
    eventType: asString(record.eventType ?? record.category, "Other"),
    eventDate,
    formattedDate: eventDate
      ? format(parseISO(eventDate), "EEE, MMM d, yyyy")
      : "Date TBD",
    location:
      asString(record.location, "Location TBD")
        .replace(/^[\s:]+/, "")
        .trim() || "Location TBD",
    imageUrl: asString(record.imageUrl ?? record.image ?? record.thumbnail, ""),
    description: asString(record.description, "").trim(),
    organizer,
  };
}

async function loadEvents(): Promise<DisplayEvent[]> {
  const response = await fetch("http://localhost:8000/events", {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(`Event service responded with ${response.status}`);
  }
  const data: unknown = await response.json();
  const list = Array.isArray(data)
    ? data
    : (data as { events?: unknown[] } | null)?.events;
  if (!Array.isArray(list)) return [];
  return list.map(normalizeEvent);
}

async function EventsList() {
  let events: DisplayEvent[];
  try {
    events = await loadEvents();
  } catch {
    return (
      <div className="mt-8 rounded-2xl border border-dashed border-destructive/40 bg-destructive/5 px-6 py-16 text-center">
        <p className="text-lg font-bold text-foreground">
          Event service unavailable
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Couldn&apos;t reach the events API at localhost:8000. Refresh once
          your backend is running.
        </p>
      </div>
    );
  }
  return <EventBrowser events={events} />;
}

function EventsSkeleton() {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="h-[420px] animate-pulse rounded-2xl border border-border/60 bg-muted/50"
        />
      ))}
    </div>
  );
}

export default function UpcomingEventsPage() {
  return (
    <main className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Badge className="h-7 rounded-full bg-emerald-50 px-3 text-sm font-bold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
            <CalendarDays />
            Future Community Drives
          </Badge>
          <Link
            href="/create-event"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            <CirclePlus className="size-4" />
            Create Event
          </Link>
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          Upcoming Events
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          Discover verified volunteer initiatives scheduled for upcoming dates.
          Past events are automatically excluded so you can focus on active
          drives that need support.
        </p>

        <Suspense fallback={<EventsSkeleton />}>
          <EventsList />
        </Suspense>
      </div>
    </main>
  );
}

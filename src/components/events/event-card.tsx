import { ArrowRight, CalendarDays, Droplet, Image as ImageIcon, MapPin, User } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export type DisplayEvent = {
  id: string
  title: string
  eventType: string
  eventDate: string // yyyy-MM-dd slice, "" when unknown
  formattedDate: string
  location: string
  imageUrl: string
  description: string
  organizer: string
}

export function EventCard({ event }: { event: DisplayEvent }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm shadow-black/5 transition-shadow hover:shadow-md">
      <div className="relative h-44 w-full">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-500 dark:from-emerald-900/40 dark:to-teal-800/40">
            <ImageIcon className="size-8" />
          </div>
        )}
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1 text-xs font-bold text-foreground shadow-sm">
          <Droplet className="size-3.5 text-emerald-500" />
          {event.eventType}
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-white">
          <CalendarDays className="size-3.5" />
          {event.formattedDate}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-emerald-500" />
          {event.location}
        </p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {event.description}
        </p>

        <div className="mt-4 border-t border-border/60 pt-4">
          <p className="flex items-center gap-1.5 text-sm text-muted-foreground">

            <Link href={`/upcoming-events/${event.id}`} className=" mt-4 h-10 w-full rounded-lg bg-emerald-600 font-bold text-white hover:bg-emerald-700 flex items-center justify-center gap-2">
              <Button className=" mt-4 h-10 w-full rounded-lg bg-emerald-600 font-bold text-white hover:bg-emerald-700">
                View Event
                <ArrowRight className="size-4" />
              </Button>
            </Link>
          </p>
        </div>

      </div>
    </article>
  )
}

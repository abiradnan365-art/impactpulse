"use client"

import * as React from "react"
import {
  CirclePlus,
  Droplet,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Type,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "cn"

// Local midnight in yyyy-MM-dd (the value ships with <input type="date">).
// Module-level so it is computed once — avoids hydration churn, and the
// <select>/state below never needs an effect (react-compiler lint rules).
const MIN_DATE = new Date().toLocaleDateString("en-CA")

const eventTypes = [
  "Donation",
  "Cleanup Drive",
  "Blood Donation",
  "Relief Distribution",
  "Tree Plantation",
  "Other",
] as const

// Quick photo presets — one-click, verified Unsplash images.
const photoPresets = [
  {
    label: "Winter Clothes",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=60",
  },
  {
    label: "Blanket Relief",
    url: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=60",
  },
  {
    label: "Cleanup",
    url: "https://images.unsplash.com/photo-1532995677721-29da18901960?auto=format&fit=crop&w=800&q=60",
  },
  {
    label: "Tree Plantation",
    url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=60",
  },
] as const

const requiredMark = <span className="text-destructive">*</span>

type EventFormState = {
  title: string
  eventType: string
  eventDate: string
  location: string
  imageUrl: string
  description: string
  dateError: string | null
  published: boolean
}

const initialFormState: EventFormState = {
  title: "",
  eventType: "",
  eventDate: "",
  location: "",
  imageUrl: "",
  description: "",
  dateError: null,
  published: false,
}

export function CreateEventForm() {
  const [form, setForm] = React.useState<EventFormState>(initialFormState)
  
  function setField<Key extends keyof EventFormState>(
    key: Key,
    value: EventFormState[Key]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function handleDateChange(value: string) {
    setField("eventDate", value)
    if (form.dateError) setField("dateError", null)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log("Form submitted:", form)

    // Native pickers respect min="" today, but manual typing can bypass it
    // (and some browsers accept shifting); validate the value defensively.
    if (!form.eventDate) {
      setField("dateError", "Please choose an event date.")
      return
    }
    if (form.eventDate < MIN_DATE) {
      setField("dateError", "Event date must be today or later.")
      return
    }
    setField("dateError", null)
    setField("published", true)
  }

  function handleReset() {
    setForm(initialFormState)
  }

  if (form.published) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
          <CirclePlus className="size-7" />
        </span>
        <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-foreground">
          Event Published!
        </h2>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          &ldquo;{form.title}&rdquo; is live for volunteers. You can view it under
          Upcoming Events.
        </p>
        <Button
          onClick={handleReset}
          className="mt-7 h-11 rounded-xl bg-emerald-600 px-6 text-white hover:bg-emerald-700"
        >
          <CirclePlus className="size-4" data-icon="inline-start" />
          Create Another Event
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <Badge className="h-7 rounded-full bg-emerald-50 px-3 text-sm font-bold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
        <Sparkles />
        Social Service Drive
      </Badge>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        Create a Community Event
      </h1>
      <p className="mt-2 text-sm text-muted-foreground sm:text-base">
        Organize a local relief effort, environmental cleanup, or community
        support drive.
      </p>

      <form onSubmit={handleSubmit} className="mt-9 flex flex-col gap-6" noValidate>
        {/* Event title */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="event-title">
            Event Title {requiredMark}
          </Label>
          <InputGroup className="h-10">
            <InputGroupAddon>
              <Type className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              id="event-title"
              name="title"
              required
              value={form.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
            />
          </InputGroup>
        </div>

        {/* Event type / date row */}
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="event-type">
              Event Type {requiredMark}
            </Label>
            <Select
              value={form.eventType}
              onValueChange={(value) => setField("eventType", value as string)}
            >
              <SelectTrigger
                id="event-type"
                className="h-10 w-full items-center aria-[expanded]:ring-0"
              >
                <Droplet className="size-4 text-muted-foreground" />
                <SelectValue placeholder="Choose event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="event-date">
              Event Date {requiredMark}
            </Label>
            <Input
              id="event-date"
              name="eventDate"
              type="date"
              required
              min={MIN_DATE}
              value={form.eventDate}
              onChange={(event) => handleDateChange(event.target.value)}
              aria-invalid={Boolean(form.dateError)}
              aria-describedby={form.dateError ? "event-date-error" : "event-date-hint"}
              className="h-10"
            />
            {form.dateError ? (
              <p id="event-date-error" className="text-xs font-medium text-destructive">
                {form.dateError}
              </p>
            ) : (
              <p id="event-date-hint" className="text-xs text-muted-foreground">
                Dates must be in the future (today or later)
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="event-location">
            Location / Venue {requiredMark}
          </Label>
          <InputGroup className="h-10">
            <InputGroupAddon>
              <MapPin className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              id="event-location"
              name="location"
              required
              value={form.location}
              onChange={(event) => setField("location", event.target.value)}
              placeholder="e.g. Mohammadpur Town Hall, Dhaka"
            />
          </InputGroup>
        </div>

        {/* Thumbnail */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="event-image-url">
            Thumbnail Image URL {requiredMark}
          </Label>
          <InputGroup className="h-10">
            <InputGroupAddon>
              <ImageIcon className="text-muted-foreground" />
            </InputGroupAddon>
            <InputGroupInput
              id="event-image-url"
              name="imageUrl"
              type="url"
              required
              value={form.imageUrl}
              onChange={(event) => setField("imageUrl", event.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
            />
          </InputGroup>
          <p className="text-xs text-muted-foreground">
            Quick photo presets:{" "}
            {photoPresets.map((preset, index) => (
              <React.Fragment key={preset.label}>
                {index > 0 && <span aria-hidden="true"> • </span>}
                <button
                  type="button"
                  onClick={() => setField("imageUrl", preset.url)}
                  className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  {preset.label}
                </button>
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="event-description">
            Event Description {requiredMark}
          </Label>
          <Textarea
            id="event-description"
            name="description"
            required
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
            className="min-h-28"
          />
        </div>

        {/* Attached organizer email (read-only until auth exists) */}
        <div className="flex h-10 items-center justify-between rounded-lg border border-input bg-input/30 px-3 text-sm">
          <span className="text-muted-foreground">Organizer Email attached:</span>
          <span className="font-semibold text-foreground">mypit@mailinator.com</span>
        </div>

        <Button
          type="submit"
          className={cn(
            "h-11 w-full rounded-lg bg-emerald-600 text-base font-bold text-white",
            "hover:bg-emerald-700 focus-visible:ring-emerald-400/40"
          )}
        >
          <CirclePlus className="size-4" data-icon="inline-start" />
          Publish Event
        </Button>
      </form>
    </div>
  )
}

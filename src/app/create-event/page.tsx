import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { CreateEventForm } from "@/components/events/create-event-form";

export default function CreateEventPage() {
   
  return (
    <main className="flex-1 bg-muted/40 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/upcoming-events"
          className="inline-flex items-center gap-2 text-sm font-semibold text-foreground/80 hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Upcoming Events
        </Link>

        <div className="mt-6 rounded-3xl border border-border/60 bg-card px-4 py-8 shadow-sm shadow-black/5 sm:px-10 sm:py-9">
          <CreateEventForm />
        </div>
      </div>
    </main>
  );
}

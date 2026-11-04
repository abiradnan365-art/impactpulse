
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";

type Event = {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  eventDate: string;
};

const RecentEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/recent-upcoming-events`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }

        return res.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">
            Make an Impact
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Recent Upcoming Events
          </h2>

          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
            Discover exciting events, connect with people, and make a
            meaningful difference in your community.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <p className="text-muted-foreground animate-pulse">
              Loading upcoming events...
            </p>
          </div>
        )}

        {/* Empty State */}
        {!loading && events.length === 0 && (
          <div className="text-center py-16 rounded-xl border border-dashed">
            <CalendarDays
              className="mx-auto mb-4 text-muted-foreground"
              size={40}
            />

            <h3 className="text-xl font-semibold text-foreground">
              No Upcoming Events
            </h3>

            <p className="text-muted-foreground mt-2">
              Check back later for new events.
            </p>
          </div>
        )}

        {/* Event Cards */}
        {!loading && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {events.map((event) => (
              <div
                key={event._id}
                className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative h-52 overflow-hidden">
                  {event.imageUrl ? (
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted">
                      <CalendarDays
                        size={40}
                        className="text-muted-foreground"
                      />
                    </div>
                  )}
                </div>

                {/* Event Details */}
                <div className="flex flex-col flex-1 p-5">

                  {/* Event Date */}
                  <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 mb-3">
                    <CalendarDays size={16} />

                    <span>
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Event Title */}
                  <h3 className="text-xl font-semibold text-foreground line-clamp-1">
                    {event.title}
                  </h3>

                  {/* Event Description */}
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                    {event.description}
                  </p>

                  {/* View Event Button */}
                  <div className="mt-auto pt-5">
                    <Link
                      href={`/upcoming-events/${event._id}`}
                      className="inline-flex bg-green-700 h-10 w-full items-center justify-center rounded-md  px-4 py-2 text-sm font-medium text-primary-foreground transition-colors "
                    >
                      View Event
                      <ArrowRight className="ml-2" size={16} />
                    </Link>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default RecentEvents;

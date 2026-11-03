
"use client";

import { useEffect, useState } from "react";
import type { ComponentProps } from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import EditEventDialog from "@/components/EditEventDialog";
import DeleteEventDialog from "@/components/DeleteEventDialog";

type Event = {
    _id: string;
    title: string;
    eventType: string;
    eventDate: string;
    location: string;
    imageUrl: string;
    description: string;
    createdBy: string;
};

export default function ManageEventsPage() {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const userId = user?.id;

        if (!userId) return;

        let isMounted = true;

        async function fetchMyEvents() {
            try {
                setError("");

                const res = await fetch(
                    `http://localhost:8000/my-events/${userId}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch your events.");
                }

                const data: Event[] = await res.json();

                if (isMounted) {
                    setEvents(data);
                }
            } catch (err) {
                console.error("Error fetching events:", err);

                if (isMounted) {
                    setError(
                        err instanceof Error
                            ? err.message
                            : "Something went wrong."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchMyEvents();

        return () => {
            isMounted = false;
        };
    }, [user?.id]);

    const handleUpdated = (updatedEvent: Partial<Event> & { _id: string }) => {
        setEvents((prev) =>
            prev.map((event) =>
                event._id === updatedEvent._id
                    ? { ...event, ...updatedEvent }
                    : event
            )
        );
    };

    const handleDeleted = (eventId: string) => {
        setEvents((prev) =>
            prev.filter((event) => event._id !== eventId)
        );
    };

    if (isPending || (user?.id && loading)) {
        return (
            <p className="p-10 text-center">
                Loading events...
            </p>
        );
    }

    if (!user) {
        return (
            <div className="p-10 text-center">
                <h1 className="text-2xl font-bold">
                    Please login to manage your events
                </h1>

                <Link
                    href="/login"
                    className="mt-4 inline-block text-emerald-600 underline"
                >
                    Login
                </Link>
            </div>
        );
    }

    return (

        <main className="min-h-screen bg-muted/40 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Manage Events
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Manage the events you have created.
                        </p>
                    </div>

                    <Link
                        href="/create-event"
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                    >
                        Create Event
                    </Link>
                </div>

                {error ? (
                    <div className="rounded-xl border border-red-500 p-6 text-center text-red-600">
                        {error}
                    </div>
                ) : events.length === 0 ? (
                    <div className="rounded-xl border bg-card p-10 text-center">
                        <h2 className="text-xl font-semibold">
                            No events found
                        </h2>

                        <p className="mt-2 text-muted-foreground">
                            You have not created any events yet.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="overflow-hidden rounded-xl border bg-card shadow-sm"
                            >
                                <div className="relative h-48">
                                    <Image
                                        src={event.imageUrl}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-bold">
                                        {event.title}
                                    </h2>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {event.eventType}
                                    </p>

                                    <p className="mt-1 text-sm">
                                        📍 {event.location}
                                    </p>

                                    <p className="mt-1 text-sm">
                                        📅 {event.eventDate}
                                    </p>

                                    <div className="mt-5 flex gap-3">
                                        <Link href={`/upcoming-events/${event._id}`}>
                                            <Button variant="outline" className="bg-emerald-600 px-10 py-5 text-lg text-white hover:bg-emerald-700">
                                                View
                                            </Button>
                                        </Link>

                                        <EditEventDialog
                                            event={event as ComponentProps<typeof EditEventDialog>["event"]}
                                            onUpdated={handleUpdated}
                                        />


                                        <DeleteEventDialog
                                            event={event as unknown as ComponentProps<typeof DeleteEventDialog>["event"]}
                                            onDeleted={() => handleDeleted(event._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </main>


    );
}

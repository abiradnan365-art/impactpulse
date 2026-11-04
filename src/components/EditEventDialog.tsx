"use client";

import React, { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Pencil,
    Type,
    Droplet,
    MapPin,
    Image as ImageIcon,
    CalendarDays,
} from "lucide-react";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getTokenFromClient} from "@/lib/getTokenFromClient";

const eventTypes = [
    "Donation",
    "Cleanup Drive",
    "Blood Donation",
    "Relief Distribution",
    "Tree Plantation",
    "Other",
];

export type EventData = {
    _id: string;
    title: string;
    eventType: string;
    eventDate: string;
    location: string;
    imageUrl: string;
    description: string;
};

type EditEventDialogProps = {
    event: EventData;
    // Updated event parent ke pathano hobe, jate parent state sathe sathe update kore
    onUpdated?: (updatedEvent: EventData) => void | Promise<void>;
};

const EditEventDialog = ({ event, onUpdated }: EditEventDialogProps) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: event.title || "",
        eventType: event.eventType || "",
        eventDate: event.eventDate?.slice(0, 10) || "",
        location: event.location || "",
        imageUrl: event.imageUrl || "",
        description: event.description || "",
    });

    // Dialog khulle form e latest event data boshano
    const handleOpenChange = (nextOpen: boolean) => {
        if (nextOpen) {
            setForm({
                title: event.title || "",
                eventType: event.eventType || "",
                eventDate: event.eventDate?.slice(0, 10) || "",
                location: event.location || "",
                imageUrl: event.imageUrl || "",
                description: event.description || "",
            });
        }
        setOpen(nextOpen);
    };

    const setField = (key: keyof typeof form, value: string) => {
        setForm((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = await getTokenFromClient(); 

        if (!event._id) {
            toast.error("Event ID not found!");
            return;
        }

        try {
            setLoading(true);

            const res = await fetch(
                `http://localhost:8000/update-event/${event._id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Failed to update event!");
            }

            toast.success("Event updated successfully!");

            // Notun data diye updated event toiri
            const updatedEvent: EventData = {
                ...event,
                ...form,
            };

            setOpen(false);

            // 1) Parent state sathe sathe update
            if (onUpdated) {
                await onUpdated(updatedEvent);
            }

            // 2) Server component hole oitao refresh hobe
            router.refresh();
        } catch (error) {
            console.error("Update event error:", error);

            toast.error(
                error instanceof Error
                    ? error.message
                    : "Something went wrong while updating event!"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            {/* Edit Button */}
            <DialogTrigger
                render={
                    <Button
                        variant="outline"
                        className="flex-1 rounded-lg border px-7 py-5 text-lg hover:bg-muted"
                    >
                        <Pencil className="size-4" />
                        Edit
                    </Button>
                }
            />

            <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-[550px]">
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-xl font-extrabold tracking-tight">
                        Update Event
                    </DialogTitle>

                    <DialogDescription>
                        Modify the details for your social service initiative.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
                    {/* Title */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-title">Title</Label>

                        <InputGroup className="h-10">
                            <InputGroupAddon>
                                <Type className="size-4 text-muted-foreground" />
                            </InputGroupAddon>

                            <InputGroupInput
                                id="edit-title"
                                value={form.title}
                                onChange={(e) => setField("title", e.target.value)}
                                placeholder="Enter event title"
                                required
                            />
                        </InputGroup>
                    </div>

                    {/* Event Type and Date */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Event Type */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-event-type">Event Type</Label>

                            <Select
                                value={form.eventType}
                                onValueChange={(value) =>
                                    setField("eventType", value as string)
                                }
                            >
                                <SelectTrigger
                                    id="edit-event-type"
                                    className="h-10 w-full"
                                >
                                    <Droplet className="size-4 text-muted-foreground" />
                                    <SelectValue placeholder="Choose event type" />
                                </SelectTrigger>

                                <SelectContent>
                                    {!eventTypes.includes(form.eventType) &&
                                        form.eventType && (
                                            <SelectItem value={form.eventType}>
                                                {form.eventType}
                                            </SelectItem>
                                        )}

                                    {eventTypes.map((type) => (
                                        <SelectItem key={type} value={type}>
                                            {type}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Event Date */}
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="edit-event-date">Event Date</Label>

                            <InputGroup className="h-10">
                                <InputGroupAddon>
                                    <CalendarDays className="size-4 text-muted-foreground" />
                                </InputGroupAddon>

                                <InputGroupInput
                                    id="edit-event-date"
                                    type="date"
                                    value={form.eventDate}
                                    onChange={(e) =>
                                        setField("eventDate", e.target.value)
                                    }
                                    required
                                />
                            </InputGroup>
                        </div>
                    </div>

                    {/* Location */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-location">Location</Label>

                        <InputGroup className="h-10">
                            <InputGroupAddon>
                                <MapPin className="size-4 text-muted-foreground" />
                            </InputGroupAddon>

                            <InputGroupInput
                                id="edit-location"
                                value={form.location}
                                onChange={(e) => setField("location", e.target.value)}
                                placeholder="Enter event location"
                                required
                            />
                        </InputGroup>
                    </div>

                    {/* Image URL */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-image">Image URL</Label>

                        <InputGroup className="h-10">
                            <InputGroupAddon>
                                <ImageIcon className="size-4 text-muted-foreground" />
                            </InputGroupAddon>

                            <InputGroupInput
                                id="edit-image"
                                type="url"
                                value={form.imageUrl}
                                onChange={(e) => setField("imageUrl", e.target.value)}
                                placeholder="https://images.unsplash.com/..."
                                required
                            />
                        </InputGroup>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="edit-description">Description</Label>

                        <Textarea
                            id="edit-description"
                            value={form.description}
                            onChange={(e) =>
                                setField("description", e.target.value)
                            }
                            placeholder="Describe your event..."
                            className="min-h-28 resize-none"
                            required
                        />
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                            className="rounded-lg px-5"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-emerald-600 px-5 font-bold text-white hover:bg-emerald-700"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditEventDialog;
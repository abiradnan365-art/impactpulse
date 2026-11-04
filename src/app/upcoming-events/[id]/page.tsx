

import JoiningCard from '@/components/joining/JoiningCard';
import OrganizerCard from '@/components/OrganizerCard';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';

const EventsDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const token = await getTokenFromServer();
    console.log("EventsDetailsPage token:", token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${id}`,{
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    const event = await res.json()
    console.log(event);
    return (
        <div className="max-w-5xl mx-auto my-10 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">

            {/* Hero Banner */}
            <div className="relative h-[350px]">
                <Image src={event.imageUrl} alt={event.title} fill className="object-cover"/>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Event Type */}
                <span className="absolute top-5 left-5 bg-white  text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    🌿 {event.eventType}
                </span>

                {/* Event Title & Info */}
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3">
                        {event.title}
                    </h1>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-200 ">
                        <p>📍 {event.location}</p>
                        <p>
                            📅{" "}
                            {new Date(event.eventDate).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Event Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6 md:p-8">

                {/* Left Section */}
                <div className="md:col-span-2">

                    {/* Volunteer Status */}
                    <JoiningCard event={event}/>


                    {/* Description */}
                    <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3">
                        About this Social Initiative
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-7">
                        {event.description}
                    </p>

                    <hr className="my-6" />

                    {/* Volunteer Guidelines */}
                    <h3 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                        Volunteer Guidelines
                    </h3>

                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <li>🟢 Please arrive at the designated location on time.</li>
                        <li>🟢 Be comfortable with social work and distribution.</li>
                        <li>🟢 Follow the event organizer`s instructions.</li>
                    </ul>
                </div>

                {/* Right Section */}
                <div className="space-y-4">

                    {/* Organizer Card */}
                   
                    <OrganizerCard event={event} />

                    {/* Volunteer Card */}
                    <div className="border rounded-xl p-4 dark:bg-gray-800">
                        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                            Confirmed Volunteers
                        </h3>

                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Volunteer registration is open.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EventsDetailsPage;
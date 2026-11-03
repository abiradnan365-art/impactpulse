import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
interface JoiningEvent {
    _id: string;
    imageUrl: string;
    title: string;
    eventType: string;
    eventDate: string | Date;
    location: string;
    description: string;
    joiningDate: string | Date;
    eventId: string;
}

interface MyJoiningCardProps {
    joiningData: JoiningEvent[];
}

const MyJoiningCard = ({ joiningData }: MyJoiningCardProps) => {
    return (
        <div>
    {joiningData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {joiningData.map((event) => (
                <div
                    key={event._id}
                    className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300"
                >
                    {/* Image */}
                    <div className="relative h-48">
                        <Image
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            width={400}
                            height={200}
                        />

                        {/* Event Type */}
                        <span className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            ♡ {event.eventType}
                        </span>

                        {/* Event Date */}
                        <span className="absolute bottom-3 left-3 bg-gray-900/90 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                            📅 {new Date(event.eventDate).toLocaleDateString(
                                'en-US',
                                {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    timeZone: 'UTC'
                                }
                            )}
                        </span>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            {event.title}
                        </h3>

                        {/* Location */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            <span className="text-emerald-500 mr-1">📍</span>
                            {event.location}
                        </p>

                        {/* Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 mb-4">
                            {event.description}
                        </p>

                        <hr className="border-gray-200 dark:border-gray-700 mb-4" />

                        {/* Joining Date */}
                        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-4">
                            Joined {new Date(event.joiningDate).toLocaleDateString(
                                'en-US',
                                {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                }
                            )}
                        </p>

                        {/* View Event Button */}
                        <Link
                            href={`/upcoming-events/${event.eventId}`}
                            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-sm py-3 rounded-2xl transition-all duration-300 shadow-md"
                        >
                            View Event
                            <ArrowRight />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-gray-600 dark:text-gray-400 text-center mt-10">
            You haven&apos;t joined any events yet.
        </p>
    )}
</div>
    );
};

export default MyJoiningCard;
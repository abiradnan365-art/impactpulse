
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface Organizer {
    name?: string;
    email?: string;
    image?: string;
}

interface OrganizerCardProps {
    event: {
        createdBy?: string;
    };
}

const OrganizerCard = ({ event }: OrganizerCardProps) => {
    const [organizer, setOrganizer] = useState<Organizer | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!event?.createdBy) return;

        let isMounted = true;

        const fetchOrganizer = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/${event.createdBy}`
                );

                if (!res.ok) {
                    throw new Error('Organizer not found');
                }

                const data = await res.json();

                if (isMounted) {
                    setOrganizer(data);
                }

            } catch (error) {
                console.error('Organizer fetch error:', error);

                if (isMounted) {
                    setOrganizer(null);
                }

            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchOrganizer();

        return () => {
            isMounted = false;
        };

    }, [event?.createdBy]);

    return (
        <div className="border rounded-xl p-4 dark:bg-gray-800 dark:border-gray-700">

            {/* Card Title */}
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-4">
                Initiative Organizer
            </h3>

            <div className="flex items-center gap-3">

                {/* Organizer Image */}
                <div className="w-12 h-12 rounded-full overflow-hidden bg-emerald-100 dark:bg-gray-700 flex items-center justify-center shrink-0">

                    {organizer?.image ? (
                        <Image
                            src={organizer.image}
                            alt={organizer.name || 'Organizer'}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <span className="text-xl">👤</span>
                    )}

                </div>

                {/* Organizer Information */}
                <div className="min-w-0">

                    <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {loading
                            ? 'Loading...'
                            : organizer?.name || 'Organizer Name'}
                    </h4>

                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {organizer?.email || 'Event Organizer'}
                    </p>

                </div>

            </div>

            <hr className="my-4 dark:border-gray-700" />

            {/* Verified Badge */}
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                ✓ Verified Platform Member
            </p>

        </div>
    );
};

export default OrganizerCard;

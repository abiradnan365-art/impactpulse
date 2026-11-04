
'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import { getTokenFromClient } from '@/lib/getTokenFromClient';

const JoiningCard = ({ event }: { event: Record<string, unknown> }) => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleJoinEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = await getTokenFromClient();
              if (!user) {
        toast.error('Please login first to join this event!');
        // window.location.href = '/login';
        return;
    }
        const { _id, ...eventData } = event;

        // Check if the user already joined this event
        const checkRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/my-joining/${user?.email}`,
            {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            }
        );

        const joinedEvents = await checkRes.json();

        const alreadyJoined = joinedEvents.some(
            (item: { eventId: string }) => item.eventId === _id
        );

        if (alreadyJoined) {
            toast.error('You have already joined this event!');
            return;
        }

        const data = {
            userName: user?.name,
            email: user?.email,
            image: user?.image,
            ...eventData,
            eventId: _id,
            joiningDate: new Date(),
        };

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/joining`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const bookingRes = await res.json();

        console.log("JoiningCard response:", bookingRes);

        toast.success('Successfully joined the event!');
    }

    return (
        <div>
            <div className="flex items-center justify-between gap-4 bg-gray-50 dark:bg-gray-800 border rounded-xl p-4 mb-8">
                <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                        Volunteer Opportunity
                    </h3>
                    <p className="text-xs text-gray-500">
                        Join us and make a difference in the community.
                    </p>
                </div>

                <form onSubmit={handleJoinEvent}>
                    <Button type='submit' className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg text-sm font-medium">
                        Join Event
                        <ArrowRight />
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default JoiningCard;

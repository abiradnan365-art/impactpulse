'use client';

import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

const JoiningCard = ({event}: { event: Record<string, unknown> }) => {

      const { data: session } = authClient.useSession();
      const user = session?.user;

    // console.log("JoiningCard event:", event);

    const handleJoinEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            userName: user?.name,
            email: user?.email,
            image: user?.image,
            ...event,
            joiningDate: new Date()
        }
        // console.log("JoiningCard data:", data);
        const res = await fetch("http://localhost:8000/joining", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const bookingRes = await res.json();
        console.log("JoiningCard response:", bookingRes);
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
                            <ArrowRight/>
                        </Button>
                      </form>
                    </div>
        </div>
    );
};

export default JoiningCard;
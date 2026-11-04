import MyJoiningCard from '@/components/MyJoiningCard';
import { auth } from '@/lib/auth';
import { getTokenFromServer } from '@/lib/getTokenFromServer';
import { headers } from 'next/headers';
import React from 'react';

const MyJoiningPage = async ()  => {

    const session = await auth.api.getSession({
        headers: await headers(),
    })
    const user = session?.user;
     const token = await getTokenFromServer();
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-joining/${user?.email}`,{
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    const joiningData = await res.json();
    console.log("MyJoiningPage joiningData:", joiningData);


    return (
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div>
            <h1 className="text-4xl font-bold ">Joining events</h1>
            <p className="text-gray-500">Here are all the social development and community service drives you have signed up for, sorted by event date.</p>
          </div> 
         < MyJoiningCard joiningData={joiningData} />

        </div>
    );
};

export default MyJoiningPage;
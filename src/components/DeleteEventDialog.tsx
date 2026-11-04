'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { getTokenFromClient } from "@/lib/getTokenFromClient";


const DeleteEventDialog = ({ event, onDeleted }: { event: Event & { _id: string }, onDeleted: () => void }) => {
    const handleDelete = async () => {
        const token = await getTokenFromClient();
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/event/${event._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        });
        const data = await res.json();
        if (res.ok) {
            console.log("Event deleted successfully:", data);
            onDeleted();
        }
    };
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger render={<Button
                    variant="destructive"
                    className="flex-1 rounded-lg bg-red-600 px-4 py-5 text-lg text-white hover:bg-red-700"
                >
                    Delete
                </Button>}>

                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your event from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteEventDialog;
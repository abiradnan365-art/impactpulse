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


const DeleteEventDialog = ({event, onDeleted}: {event: Event & {_id: string}, onDeleted: () => void}) => {
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:8000/event/${event._id}`, {
            method: "DELETE",
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
                <AlertDialogTrigger  render={  <Button
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
                            This action cannot be undone. This will permanently delete your account
                            from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DeleteEventDialog;
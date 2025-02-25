import { useState } from "react";
import { useConnections } from "../../hooks/useConnections";
import Loader from "../utils/Loader";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useMutation } from "@tanstack/react-query";
import { createConversation } from "../../api/api";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../main";

interface CreateChatProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}



export const CreateChat = ({ open, onOpenChange }: CreateChatProps) => {
    const { user } = useAuthContext()
    const id = user?._id;
    const navigate = useNavigate()
    const { connections, isLoading } = useConnections();
    const [searchTerm, setSearchTerm] = useState(""); // State to track search input

    // Split the search term into an array of words for dynamic regex filtering
    const searchArray = searchTerm.split(/\s+/).filter((word) => word);
    const reg = new RegExp("(?=.*" + searchArray.join(")(?=.*") + ")", "i"); // Case-insensitive match for all words

    // Filter connections using the dynamic regex
    const filteredConnections = connections?.filter((connection) =>
        reg.test(`${connection.username} ${connection.email}`) // Combine username and email for regex matching
    );

    const mutation = useMutation({
        mutationFn: createConversation, // Use the imported function
        onSuccess: (data) => {
            const conversationID = data.conversation._id
            queryClient.invalidateQueries(["conversations"]);
            setSearchTerm("");
            onOpenChange(false);
            navigate(`/messages/${conversationID}`)
        },
        onError: (error) => {
            console.error("Error creating conversation:", error);
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center font-bold text-lg">Send a new message</DialogTitle>
                    <Input
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term dynamically
                        className="mt-3"
                    />
                </DialogHeader>
                <div className="flex flex-col gap-5 overflow-y-auto max-h-[300px] mt-5">
                    {
                        isLoading ? <Loader /> : (
                            filteredConnections?.map((connection) => {
                                return (
                                    <div
                                        key={connection._id}
                                        className="hover:bg-muted px-5 py-2 rounded-md flex items-center justify-between"
                                    >
                                        <div className="flex gap-5 items-center justify-center">
                                            <div>
                                                <img
                                                    src={connection.image[0]}
                                                    alt=""
                                                    width={"40px"}
                                                    height={"20px"}
                                                    className="rounded-full"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-bold capitalize">
                                                    {connection.username}
                                                </div>
                                                <div className="text-muted-foreground">{connection.email}</div>
                                            </div>
                                        </div>
                                        <Button
                                            className="font-semibold- text-xs text-white"
                                            onClick={() => {
                                                if (!id) {
                                                    console.log("User ID is undefined. Cannot create conversation.");
                                                    return;
                                                }
                                                mutation.mutate({ participants: [connection?._id, id] });
                                            }}
                                        >
                                            Send message
                                        </Button>
                                    </div>
                                );
                            })
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    );
};

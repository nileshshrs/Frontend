import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../components/ui/dialog";

interface CreateChatProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CreateChat = ({ open, onOpenChange }: CreateChatProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center font-bold text-lg">Send a New Message</DialogTitle>
                  
                    <form className="flex flex-col gap-4 mt-4">


                        <div className="flex justify-center gap-2">

                            <button
                                type="submit"
                                className="bg-primary text-white px-4 py-2 rounded w-full"
                            >
                                Chat
                            </button>
                        </div>
                    </form>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

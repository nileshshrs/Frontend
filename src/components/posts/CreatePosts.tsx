import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';

interface CreatePostProps {
    isOpen: boolean,
    onOpenChange: (value: boolean) => void;
}

const CreatePosts = ({isOpen, onOpenChange}: CreatePostProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center font-bold text-lg">Send a new message</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5 overflow-y-auto max-h-[300px] mt-5">
                    <Textarea />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePosts
import { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

interface CreatePostProps {
    isOpen: boolean;
    onOpenChange: (value: boolean) => void;
}

const CreatePosts = ({ isOpen, onOpenChange }: CreatePostProps) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [textSize, setTextSize] = useState<'xl' | 'lg' | 'md'>('xl');
    const [showAttachment, setShowAttachment] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    const handleInput = () => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        textarea.style.height = 'auto';
        const newHeight = Math.min(textarea.scrollHeight, 340);
        textarea.style.height = `${newHeight}px`;

        if (newHeight <= 200) {
            setTextSize('xl');
        } else if (newHeight <= 300) {
            setTextSize('lg');
        } else {
            setTextSize('md');
        }
    };

    const handleAddToPostClick = () => {
        setShowAttachment(!showAttachment);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newFiles = Array.from(e.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const renderFilePreviews = () => {
        const fileCount = files.length;

        if (fileCount === 1) {
            return (
                <div className="w-full h-full relative">
                    <img
                        src={URL.createObjectURL(files[0])}
                        alt={files[0].name}
                        className="w-full h-full object-cover"
                    />
                </div>
            );
        } else if (fileCount === 2) {
            return (
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                    {files.map((file, index) => (
                        <div key={index} className="w-full h-full relative">
                            <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>
            );
        } else if (fileCount > 2) {
            return (
                <div className="grid grid-cols-2 gap-2 w-full h-full">
                    {/* First Column: Image 1 */}
                    <div className="w-full h-full relative">
                        <img
                            src={URL.createObjectURL(files[0])}
                            alt={files[0].name}
                            className="w-full h-full object-cover" // Ensure image covers the available space
                        />
                    </div>
        
                    {/* Second Column: Image 2 and "+X more" */}
                    <div className="grid grid-rows-[1fr,auto] gap-2 h-full">
                        {/* Image 2 */}
                        <div className="w-full h-full relative">
                            <img
                                src={URL.createObjectURL(files[1])}
                                alt={files[1].name}
                                className="w-full h-full object-cover" // Image in second row, filling the available height
                            />
                        </div>
        
                        {/* Text for more images */}
                        <div className="w-full flex items-center justify-center text-center text-gray-500 font-bold">
                            <span>+{fileCount - 2} more</span>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    useEffect(() => {
        // Reset all states when dialog is closed
        if (!isOpen) {
            setTextSize('xl');
            setShowAttachment(false);
            setFiles([]);
            if (textareaRef.current) {
                textareaRef.current.value = ''; // Clear the textarea content
                textareaRef.current.style.height = 'auto'; // Reset the height
            }
        }
    }, [isOpen]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center font-bold text-xl">Create Post</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-5 mt-5">
                    <Textarea
                        ref={textareaRef}
                        onInput={handleInput}
                        className={`border-none max-h-[340px] min-h-[60px] overflow-y-auto p-2 text-${textSize} resize-none`}
                        placeholder="What's on your mind...?"
                        style={{
                            scrollbarWidth: 'none',
                        }}
                    />
                    {showAttachment && (
                        <div
                            className="h-[230px] border-2 rounded-lg flex items-center justify-center p-2"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            style={{ borderStyle: 'dashed', cursor: 'pointer' }}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <div className="h-full w-full border rounded-lg bg-muted flex items-center justify-center">
                                {renderFilePreviews()}
                                {!files.length && <span>Drag and drop files here or click to upload</span>}
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                        </div>
                    )}

                    <Button
                        variant={'outline'}
                        className="inline-flex justify-between p-5 text-lg font-semibold"
                        onClick={handleAddToPostClick}
                    >
                        Add to your post{' '}
                        <span>
                            <img src="/image/Ivw7nhRtXyo.png" alt="attachment icon" />
                        </span>
                    </Button>
                </div>
                <DialogFooter>
                    <Button className="w-full text-white text-lg">Post</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePosts;

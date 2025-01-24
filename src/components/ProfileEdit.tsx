import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { useAuthContext } from "../context/AuthContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { updateUserProfile } from "../api/api";
import { uploadImages } from "../firebase/uploadToFirebase";
import { Textarea } from "./ui/textarea";

interface ProfileEditProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const ProfileEdit = ({ open, onOpenChange }: ProfileEditProps) => {
    const { user, updateUser } = useAuthContext();

    const [username, setUsername] = useState(user?.username || '');
    const [fullname, setFullname] = useState(user?.fullname || '');
    const [email, setEmail] = useState(user?.email || '');
    const [image, setImage] = useState(user?.image || "https://avatars.pfptown.com/020/anime-girl-pfp-995.png");
    const [bio, setBio] = useState(user?.bio || ''); // Add state for bio

    const fileInputRef = useRef<HTMLInputElement | null>(null);  // useRef to manage file input
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingFullname, setIsEditingFullname] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    const mutation = useMutation(updateUserProfile, {
        onSuccess: (data) => {
            console.log('Profile updated:', data.user);
            updateUser(data.user);
            setIsEditingUsername(false);
            setIsEditingFullname(false);
            setIsEditingEmail(false);
            setBio("")
        },
        onError: (error) => {
            console.error('Error updating profile:', error);
        },
    });

    const handleSave = () => {
        const updatedProfile = {
            username,
            fullname,
            email,
            image,
            bio, // Include bio in the updated profile
        };
        mutation.mutate(updatedProfile);
    };

    const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const [uploadedImageUrl] = await uploadImages([file]);
                setImage(uploadedImageUrl);
                mutation.mutate({
                    username,
                    fullname,
                    email,
                    image: uploadedImageUrl,
                    bio,
                });
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    // Trigger file input click
    const handleFileInputClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='my-5'>Edit Profile</DialogTitle>
                </DialogHeader>
                <div>
                    <div className='px-5 flex items-center justify-between py-5 bg-muted rounded-lg my-5'>
                        <div className='flex gap-5'>
                            <img
                                src={image}
                                alt='Profile'
                                className="w-[50px] h-[50px] rounded-full"
                            />
                            <div>
                                <div className='font-bold capitalize'>
                                    {user?.username}
                                </div>
                                <div>{user?.fullname}</div>
                            </div>
                        </div>
                        <Button value={'primary'} onClick={handleFileInputClick}>
                            Change photo
                        </Button>
                    </div>

                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChangeImage}
                    />

                    <form>
                        {/* Username Edit */}
                        <div className="my-4">
                            <Label htmlFor='username'>Username</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id='username'
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={!isEditingUsername}
                                />
                                {isEditingUsername ? (
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="w-[70px]"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingUsername(true)}
                                        className="w-[70px]"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Email Edit */}
                        <div className="my-4">
                            <Label htmlFor='email'>Email</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={!isEditingEmail}
                                />
                                {isEditingEmail ? (
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="w-[70px]"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingEmail(true)}
                                        className="w-[70px]"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Fullname Edit */}
                        <div className="my-4">
                            <Label htmlFor='fullname'>Name</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id='fullname'
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    disabled={!isEditingFullname}
                                />
                                {isEditingFullname ? (
                                    <button
                                        type="button"
                                        onClick={handleSave}
                                        className="w-[70px]"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingFullname(true)}
                                        className="w-[70px]"
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Bio Edit */}
                        <div className="my-4">
                            <Label htmlFor='bio'>Bio</Label>
                            <div className="flex flex-col items-center gap-4">
                                <Textarea
                                    id="bio"
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full p-2 border rounded"
                                />

                                <Button
                                    value={'primary'}
                                    type="button"
                                    onClick={handleSave}
                                    className="w-full"
                                >
                                    Save
                                </Button>


                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProfileEdit;

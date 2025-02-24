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
  const [image, setImage] = useState(
    user?.image || "https://avatars.pfptown.com/020/anime-girl-pfp-995.png"
  );
  const [bio, setBio] = useState(user?.bio || '');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const mutation = useMutation(updateUserProfile, {
    onSuccess: (data) => {
      updateUser(data.user);
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
    },
  });

  const handleSave = () => {
    const updatedProfile = {
      username,
      fullname,
      email,
      image,
      bio,
    };
    mutation.mutate(updatedProfile);
    setTimeout(()=>{

    }, 2000)    
    onOpenChange(false)
  };

  const handleChangeImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-5">Edit Profile</DialogTitle>
        </DialogHeader>
        <div>
          <div className="px-5 flex items-center justify-between py-5 bg-muted rounded-lg my-5">
            <div className="inline-flex items-center gap-5">
              <img
                src={image}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div>
                <div className="font-bold capitalize">
                  {user?.username}
                </div>
                {user?.fullname ? <div>{user?.fullname}</div> : null}
              </div>
            </div>
            <Button value="primary" onClick={handleFileInputClick}>
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
            {/* Username (always disabled) */}
            <div className="my-4">
              <Label htmlFor="username">Username</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled
                />
              </div>
            </div>

            {/* Email (always disabled) */}
            <div className="my-4">
              <Label htmlFor="email">Email</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                />
              </div>
            </div>

            {/* Fullname (always enabled) */}
            <div className="my-4">
              <Label htmlFor="fullname">Name</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="fullname"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
            </div>

            {/* Bio (always enabled) */}
            <div className="my-4">
              <Label htmlFor="bio">Bio</Label>
              <div className="flex flex-col items-center gap-4">
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <Button
                  value="primary"
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

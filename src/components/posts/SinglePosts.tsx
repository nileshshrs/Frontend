import { useQuery } from "@tanstack/react-query";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { getPostsByID } from "../../api/api";
import Slider from "react-slick";
import Comment from "../comments/Comment";
import { Link } from "react-router-dom";

interface dataProps {
    id: string;
    isOpen: boolean;
    setIsOpen: (isOpen: any) => void;  // Set to accept boolean or null
}


const SinglePosts = ({ id, isOpen, setIsOpen }: dataProps) => {
    const { data, isLoading } = useQuery({
        queryKey: ["data", id],
        queryFn: () => getPostsByID(id),
    });

    const settings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}> {/* Ensure this passes a boolean */}
            <DialogContent
                className="w-full sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[75vw] xl:max-w-[50vw] 
                p-0 flex flex-col lg:flex-row items-center lg:items-start"
            >
                {/* Image Slider */}
                <div className="w-full lg:w-1/2 flex-shrink-0">
                    <Slider {...settings} className="w-full">
                        {isLoading ? (
                            <div className="w-full h-[585px] flex items-center justify-center bg-gray-200 rounded-lg">
                                <span className="text-gray-500">Loading...</span>
                            </div>
                        ) : (
                            Array.isArray(data?.image) && data?.image.length > 0 ? (
                                data?.image.map((img: string, index: number) => (
                                    <div key={index} className="border bg-transparent rounded-lg">
                                        <img
                                            src={img}
                                            alt={`Post Image ${index + 1}`}
                                            className="w-full h-[585px] object-contain"
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="w-full h-[585px] flex items-center justify-center bg-gray-200 rounded-lg">
                                    <span className="text-gray-500">No Image Available</span>
                                </div>
                            )
                        )}
                    </Slider>
                </div>

                {/* Post Details */}
                <div className="w-full lg:w-1/2 flex-shrink-0 flex flex-col justify-center">
                    <div className="flex items-center py-2 border-b">
                        <Link to={`/profile/${data?.user._id}`} className="px-4">
                            <img
                                src={data?.user?.image?.[0] || "/default-profile-image.png"}
                                alt="User Profile"
                                className="w-[45px] h-[45px] rounded-full border-primary border-2"
                            />
                        </Link>
                        <div>
                            <DialogHeader>
                                <DialogTitle className="text-start py-3">
                                    <Link to={`/profile/${data?.user._id}`} className="text-sm text-start capitalize ">
                                        {isLoading ? "Loading..." : data?.user?.username || "Unknown User"}
                                    </Link>
                                </DialogTitle>
                            </DialogHeader>

                            {/* Content Description */}
                            {isLoading ? (
                                <DialogDescription className="text-sm md:text-base">
                                    <span className="flex items-center gap-3 text-sm font-normal">Loading content...</span>
                                </DialogDescription>
                            ) : (
                                data?.content && (
                                    <DialogDescription className="text-sm md:text-base">
                                        <span className="flex items-center gap-3 text-sm font-normal">
                                            {data?.content}
                                        </span>
                                    </DialogDescription>
                                )
                            )}
                        </div>
                    </div>

                    {/* Comments Section */}
                    <Comment postID={id} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SinglePosts;

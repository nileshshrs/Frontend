import { useInfinitePosts } from "../../hooks/useInfiniteScroll";
import { fetchedPost } from "../../utils/types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import Loader from "../utils/Loader";
import { useAuthContext } from "../../context/AuthContext";
import { FaEllipsisH } from "react-icons/fa";
import { Link } from "react-router-dom";
import Likes from "./Likes";
import { useState } from "react";
import SinglePosts from "./SinglePosts";

const Posts = () => {
  const { user } = useAuthContext();
  const [likesLoading, setLikesLoading] = useState(false);
  const [openSinglePosts, setOpenSinglePosts] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState(null);

  const {
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfinitePosts();

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
    <div className="w-full max-w-[470px] mx-auto px-4 sm:px-0 sm:mx-0">
      {(isLoading || likesLoading) && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {data?.pages.map((page, index) => (
        <div key={index} className="w-full">
          {page.map((post: fetchedPost) => (
            <div key={post._id} className="w-full mb-10 border-b-2">
              <Link to="" className="w-full py-4">
                <div className="flex items-center justify-between w-full h-full">
                  <div className="flex gap-5 mb-5 h-full">
                    <div>
                      <img
                        src={post.user.image ||
                          "https://play-lh.googleusercontent.com/jInS55DYPnTZq8GpylyLmK2L2cDmUoahVacfN_Js_TsOkBEoizKmAl5-p8iFeLiNjtE=w526-h296-rw"}
                        alt=""
                        className="h-[50px] w-[50px] rounded-full border-primary border-2"
                      />
                    </div>
                    <div>
                      <div className="capitalize font-bold mb-1">{post.user.username}</div>
                      <div className="text-xs text-muted-foreground">{formatTimeAgo(post.createdAt)}</div>
                    </div>
                  </div>

                  {post.user._id === user?._id && (
                    <div className="h-full flex items-center justify-end ml-auto mb-5">
                      <FaEllipsisH className="cursor-pointer" />
                    </div>
                  )}
                </div>

                <Slider {...settings} className="w-full border bg-transparent rounded-lg">
                  {Array.isArray(post.image) && post.image.length === 1 ? (
                    <div className="relative w-full sm:w-[300px] h-[585px] sm:h-[585px] rounded-lg overflow-hidden">
                      <img src={post.image[0]} alt="" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    Array.isArray(post.image) && post.image.map((img: string, index: number) => (
                      <div key={index} className="relative w-full sm:w-[300px] h-[585px] max-h-[585px] rounded-lg overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-contain" />
                      </div>
                    ))
                  )}
                </Slider>
              </Link>
              <div className="flex flex-col gap-1 mt-6 mb-2">
                <Likes postID={post._id} setLikesLoading={setLikesLoading} isOpen={openSinglePosts} setIsOpen={setOpenSinglePosts} />
                {post.content !== "" && (
                  <p>
                    <span className="font-bold capitalize">
                      <Link to="">{post.user.username}</Link>
                    </span> {post.content}
                  </p>
                )}
              </div>
              <SinglePosts id={post._id} isOpen={openSinglePosts} setIsOpen={setOpenSinglePosts} />
            </div>
          ))}
        </div>
      ))}

      {isFetchingNextPage && (
        <div className="w-full flex items-center justify-center">
          <Loader />
        </div>
      )}

      {!hasNextPage && <div>No more posts</div>}

    </div>
  );
};

export default Posts;

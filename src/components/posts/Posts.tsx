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
import { useState, useEffect, useRef } from "react";
import SinglePosts from "./SinglePosts";
import { useTheme } from "../../context/ThemeContext";

const Posts = () => {
  const { user } = useAuthContext();
  const { theme } = useTheme();
  const noposts = theme === 'light' ? '/image/noposts.png' : '/image/nopostsdark.png';

  const [likesLoading, setLikesLoading] = useState(false);
  const [selectedPostID, setSelectedPostID] = useState<string | null>(null);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfinitePosts();

  // Create a ref for the sentinel element that triggers loading more posts.
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  // Use Intersection Observer to trigger fetching the next page when the sentinel is in view.
  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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
        <div className="w-full flex items-center justify-center py-4">
          <Loader />
        </div>
      )}

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex} className="w-full">
          {page.map((post: fetchedPost) => (
            <div key={post._id} className="w-full mb-10 border-b-2">
              <Link to={`/post/${post._id}`} className="w-full py-4">
                <div className="flex items-center justify-between">
                  <div className="flex gap-5">
                    <Link to={`/profile/${post.user._id}`}>
                      <img
                        src={
                          post.user.image ||
                          "https://via.placeholder.com/50"
                        }
                        alt={`${post.user.username} profile`}
                        className="h-[50px] w-[50px] rounded-full border-primary border-2"
                      />
                    </Link>
                    <div>
                      <Link to={`/profile/${post.user._id}`} className="capitalize font-bold mb-1">
                        {post.user.username}
                      </Link>
                      <div className="text-xs text-muted-foreground">
                        {formatTimeAgo(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  {post.user._id === user?._id && (
                    <div className="flex items-center">
                      <FaEllipsisH className="cursor-pointer" />
                    </div>
                  )}
                </div>

                <Slider {...settings} className="w-full border bg-transparent rounded-lg mt-4">
                  {Array.isArray(post.image) && post.image.length > 0 ? (
                    post.image.map((img: string, index: number) => (
                      <div
                        key={index}
                        className="relative w-full sm:w-[300px] h-[585px] rounded-lg overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="relative w-full sm:w-[300px] h-[585px] rounded-lg overflow-hidden">
                      <img
                        src="https://via.placeholder.com/300x585"
                        alt="Default"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                </Slider>
              </Link>
              <div className="flex flex-col gap-1 mt-6 mb-2">
                <Likes
                  postID={post._id}
                  setLikesLoading={setLikesLoading}
                  isOpen={selectedPostID === post._id}
                  setIsOpen={() =>
                    setSelectedPostID(selectedPostID === post._id ? null : post._id)
                  }
                />
                {post.content && (
                  <p>
                    <span className="font-bold capitalize">
                      <Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>
                    </span>{" "}
                    {post.content}
                  </p>
                )}
              </div>
              {selectedPostID === post._id && (
                <SinglePosts
                  id={post._id}
                  isOpen={true}
                  setIsOpen={() => setSelectedPostID(null)}
                />
              )}
            </div>
          ))}
        </div>
      ))}

      {/* Sentinel element for Intersection Observer */}
      <div ref={loadMoreRef} className="w-full flex items-center justify-center py-4">
        {isFetchingNextPage && <Loader />}
      </div>

      {!hasNextPage && (
        <div className="text-center py-4 text-gray-500">
          <img src={noposts} alt="" />
        </div>
      )}
    </div>
  );
};

export default Posts;

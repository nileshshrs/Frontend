// hooks/useInfinitePosts.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchPosts } from "../api/api";

export const useInfinitePosts = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  } = useInfiniteQuery(
    ["posts"], // Query key
    ({ pageParam = 1 }) => fetchPosts(pageParam), // Fetch function with pagination
    {
      getNextPageParam: (lastPage, pages) => {
        // If lastPage has posts, go to the next page, otherwise return undefined
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
    }
  );

  // Handle infinite scroll
  const handleScroll = () => {
    const bottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  // Attach scroll event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    data,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch
  };
};

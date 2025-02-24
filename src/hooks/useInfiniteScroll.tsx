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
    refetch,
  } = useInfiniteQuery(
    ["posts"],
    ({ pageParam = 1 }) => fetchPosts(pageParam),
    {
      // If the last page returns exactly 5 posts, assume there might be more
      getNextPageParam: (lastPage, pages) =>
        lastPage.length === 5 ? pages.length + 1 : undefined,
    }
  );

  const handleScroll = () => {
    // Trigger fetch when the user is within 100px of the bottom
    if (
      window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  };
};

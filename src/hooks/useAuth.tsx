import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserProfile } from "../api/api";

export const AUTH = "auth";

// Define the type of data returned by getUserProfile
type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

// Custom return type for useAuth
type UseAuthReturn = {
    user: UserProfile | undefined; // Extracted `user` data
    isLoading: boolean;
    isError: boolean;
    error: unknown;
};

// UseAuth hook with proper typings
const useAuth = (opt: UseQueryOptions<UserProfile> = {}): UseAuthReturn => {
    const { data: user, isLoading, isError, error } = useQuery<UserProfile>({
        queryKey: [AUTH],
        queryFn: getUserProfile, // Directly use getUserProfile here
        staleTime: Infinity,
        retry: false,
        ...opt,
    });

    console.log("user", user); // Log the user data to see what's being returned

    return {
        user,
        isLoading,
        isError,
        error,
    };
};

export default useAuth;

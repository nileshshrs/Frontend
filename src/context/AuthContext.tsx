import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getUserProfile } from "../api/api";

export const AUTH = "auth";

// Define the type of data returned by getUserProfile
type UserProfile = Awaited<ReturnType<typeof getUserProfile>>;

// Define the AuthContext type
type AuthContextType = {
  user: UserProfile | null;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  setUser: (user: UserProfile | null) => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    // Check if user exists in localStorage on initial render
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const { data: fetchedUser, isLoading, isError, error } = useQuery<UserProfile>({
    queryKey: [AUTH],
    queryFn: getUserProfile,
    staleTime: Infinity,
    retry: false,
    enabled: !user, // Only fetch if user is not in localStorage
  });

  // Update localStorage and user state when fetchedUser changes
  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
      localStorage.setItem("user", JSON.stringify(fetchedUser));
    }
  }, [fetchedUser]);

  // Expose the AuthContext values
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isError,
        error,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }

  return context;
};

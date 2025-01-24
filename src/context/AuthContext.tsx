import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { User } from "../utils/types";

// Step 1: Add "UPDATE_USER" to AuthAction
type AuthState = {
  user: User | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" }
  | { type: "UPDATE_USER"; payload: User }; // Add this line

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_USER":
      return { user: action.payload }; // Handle user update
    default:
      return state;
  }
};

type AuthContextType = {
  user: User | null;
  dispatch: React.Dispatch<AuthAction>;
  loading: boolean;
  updateUser: (updatedUser: User) => void; // Expose updateUser function
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user: User = JSON.parse(userData);
        dispatch({ type: "LOGIN", payload: user });
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // Step 2: Update user
  const updateUser = (updatedUser: User) => {
    dispatch({ type: "UPDATE_USER", payload: updatedUser });
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Update localStorage
  };

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthContextProvider");
  }
  return context;
};

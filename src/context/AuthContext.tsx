import { ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { User } from "../utils/types";

type AuthState = {
  user: User | null;
};

type AuthAction =
  | { type: "LOGIN"; payload: User }
  | { type: "LOGOUT" };

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

type AuthContextType = {
  user: User | null; // `user` object from state
  dispatch: React.Dispatch<AuthAction>;
  loading: boolean; // Indicates whether the user's auth state is still being determined
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });
  const [loading, setLoading] = useState<boolean>(true); // Track whether we're still loading user data

  useEffect(() => {
    const loadUser = async () => {
      const userData = localStorage.getItem("user");
      if (userData) {
        const user: User = JSON.parse(userData); // Parse user data
        dispatch({ type: "LOGIN", payload: user }); // Dispatch login action
      }
      setLoading(false); // Mark loading as complete
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, loading }}>
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

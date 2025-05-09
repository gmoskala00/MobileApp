import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AuthContextType = {
  token: string;
  userId: string;
  isAuthenticated: boolean;
  authenticate: (token: string, userId: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: "",
  userId: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string>("");
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const storedUserId = await AsyncStorage.getItem("userId");

      if (storedToken && storedUserId) {
        setAuthToken(storedToken);
        setUserId(storedUserId);
        router.replace("/(authenticated)/welcome");
      }
    }

    fetchToken();
  }, []);

  function authenticate(token: string, userId: string) {
    setAuthToken(token);
    setUserId(userId);
    AsyncStorage.setItem("token", token);
    AsyncStorage.setItem("userId", userId);
    router.replace("/(authenticated)/welcome");
  }

  function logout() {
    setAuthToken("");
    setUserId("");
    router.replace("/auth/login");
  }

  const value = {
    token: authToken,
    userId: userId,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found!");
  return context;
}

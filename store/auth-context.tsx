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
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: "",
  isAuthenticated: false,
  authenticate: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string>("");

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setAuthToken(storedToken);
        router.replace("/(authenticated)/welcome");
      }
    }

    fetchToken();
  }, []);

  function authenticate(token: string) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    router.replace("/(authenticated)/welcome");
  }

  function logout() {
    setAuthToken("");
    router.replace("/auth/login");
  }

  const value = {
    token: authToken,
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

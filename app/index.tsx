import { useEffect } from "react";
import { router } from "expo-router";
import { useAuth } from "@/store/auth-context";

export default function AppEntry() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace({
        pathname: isAuthenticated
          ? "/(authenticated)/(tabs)/recent-expenses"
          : "/auth",
      });
    }, 0);
  }, [isAuthenticated]);

  return null;
}

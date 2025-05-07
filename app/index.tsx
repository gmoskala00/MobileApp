import { useEffect } from "react";
import { router } from "expo-router";

export default function AppEntry() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/(tabs)/recent-expenses");
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  return null;
}

import { useEffect } from "react";
import { router } from "expo-router";

export default function AuthRedirect() {
  useEffect(() => {
    router.replace("/auth/login");
  }, []);

  return null;
}

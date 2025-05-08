import { Stack } from "expo-router";
import { GlobalStyles } from "@/constants/style";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        contentStyle: {
          backgroundColor: GlobalStyles.colors.primary100,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Create Account" }} />
    </Stack>
  );
}

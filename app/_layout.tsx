import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthContextProvider } from "@/store/auth-context";
import { GlobalStyles } from "@/constants/style";

function RootLayoutInner() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="(authenticated)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <RootLayoutInner />
      </AuthContextProvider>
    </>
  );
}

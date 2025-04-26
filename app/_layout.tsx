import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#3f2f25",
        },
        headerStyle: {
          backgroundColor: "#351401",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

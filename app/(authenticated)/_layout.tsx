// app/(authenticated)/_layout.tsx
import { Stack } from "expo-router";
import ExpensesContextProvider from "@/store/expenses-context";
import { GlobalStyles } from "@/constants/style";

export default function AuthenticatedLayout() {
  return (
    <ExpensesContextProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary500,
          },
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontSize: 22,
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpensesContextProvider>
  );
}

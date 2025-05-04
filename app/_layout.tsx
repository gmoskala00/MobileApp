import { GlobalStyles } from "@/constants/style";
import { Stack } from "expo-router";
import ExpensesContextProvider from "@/store/expenses-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <Stack
          screenOptions={{
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
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ExpensesContextProvider>
    </>
  );
}

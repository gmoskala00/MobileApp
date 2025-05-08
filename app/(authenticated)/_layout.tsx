import { Stack } from "expo-router";
import ExpensesContextProvider from "@/store/expenses-context";
import { GlobalStyles } from "@/constants/style";
import IconButton from "@/components/UI/IconButton";
import { useAuth } from "@/store/auth-context";

export default function AuthenticatedLayout() {
  const { logout } = useAuth();

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
        <Stack.Screen
          name="welcome"
          options={{
            title: "Welcome",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="exit"
                size={24}
                color={tintColor ?? "white"}
                onPress={() => {
                  logout();
                }}
              />
            ),
          }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ExpensesContextProvider>
  );
}

import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "@/constants/style";
import IconButton from "@/components/UI/IconButton";
import { useAuth } from "@/store/auth-context";

const TabsLayout = () => {
  const { logout } = useAuth();

  return (
    <Tabs
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
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <>
            <IconButton
              icon="add"
              size={24}
              color={tintColor ?? "white"}
              onPress={() => {
                router.push({
                  pathname: "/manage-expense",
                  params: { expenseId: null },
                });
              }}
            />
            <IconButton
              icon="exit"
              size={24}
              color={tintColor ?? "white"}
              onPress={() => {
                logout();
              }}
            />
          </>
        ),
      }}
    >
      <Tabs.Screen
        name="recent-expenses"
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="all-expenses"
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

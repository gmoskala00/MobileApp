import { GlobalStyles } from "@/constants/style";
import { useAuth } from "@/store/auth-context";
import { router } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

function WelcomeScreen() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  const onPress = () => {
    router.push("/(authenticated)/(tabs)/recent-expenses");
  };

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.smallText}>You authenticated successfully!</Text>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Move to your Expenses</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  smallText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 24,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 4,
  },
});

import { GlobalStyles } from "@/constants/style";
import { StyleSheet, View, ActivityIndicator, Text } from "react-native";

type LoadingOverlayProps = {
  message?: string;
};

const LoadingOverlay = ({ message }: LoadingOverlayProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  message: {
    fontSize: 16,
    marginBottom: 12,
  },
});

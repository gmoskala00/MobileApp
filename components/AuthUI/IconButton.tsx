// components/UI/IconButton.tsx
import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  onPress: (event: GestureResponderEvent) => void;
};

function IconButton({ icon, color, size, onPress }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  button: {
    margin: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});

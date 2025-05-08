import { GlobalStyles } from "@/constants/style";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";

type InputProps = {
  label: string;
  style?: StyleProp<ViewStyle>;
  invalid: boolean;
  textInputConfig?: TextInputProps;
};

const Input = ({ label, style, invalid, textInputConfig }: InputProps) => {
  const inputStyles: StyleProp<TextStyle>[] = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={inputStyles} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 12,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

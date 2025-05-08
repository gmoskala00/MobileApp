import { useContext, useState } from "react";
import AuthContent from "@/components/Auth/AuthConent";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { login } from "@/util/auth";
import { EmailPassword } from "@/models/auth";
import { Alert } from "react-native";
import { AuthContext } from "@/store/auth-context";
import { router } from "expo-router";

function LoginScreen() {
  const authContext = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signinHandler = async ({ email, password }: EmailPassword) => {
    setIsAuthenticating(true);
    try {
      const idToken = await login(email, password);
      authContext.authenticate(idToken);
    } catch (error) {
      Alert.alert(
        "Authentication Error!",
        "Could not log in. Please check your credentials or try again later"
      );
    }
    setIsAuthenticating(false);
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin={true} onAuthenticate={signinHandler} />;
}

export default LoginScreen;

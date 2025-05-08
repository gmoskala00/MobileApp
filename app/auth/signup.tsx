import AuthContent from "@/components/Auth/AuthConent";
import { createUser } from "@/util/auth";
import { EmailPassword } from "@/models/auth";
import { useContext, useState } from "react";
import { Alert } from "react-native";
import LoadingOverlay from "@/components/UI/LoadingOverlay";
import { AuthContext } from "@/store/auth-context";
import { router } from "expo-router";

function SignupScreen() {
  const authContext = useContext(AuthContext);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const signupHandler = async ({ email, password }: EmailPassword) => {
    setIsAuthenticating(true);
    try {
      const idToken = await createUser(email, password);
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
    return <LoadingOverlay message="Creating User..." />;
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;

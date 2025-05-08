import AuthContent from "@/components/ExpensesOutput/Auth/AuthConent";

function LoginScreen() {
  const test = () => {
    console.log("TEST");
  };
  return <AuthContent isLogin onAuthenticate={test} />;
}

export default LoginScreen;

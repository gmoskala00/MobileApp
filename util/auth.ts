import axios from "axios";

const API_KEY = "AIzaSyC15ErXW2_LthBjDFxPuSNTsE4vKDU6nUQ";

export async function authenticate(
  mode: string,
  email: string,
  password: string
): Promise<{ token: string; userId: string }> {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  const { idToken: token, localId: userId } = response.data;
  return { token, userId };
}

export function createUser(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}

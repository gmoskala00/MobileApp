import axios from "axios";

const API_KEY = "AIzaSyC15ErXW2_LthBjDFxPuSNTsE4vKDU6nUQ";

export async function createUser(email: string, password: string) {
  const response = await axios.post(
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + API_KEY,
    { email: email, password: password, returnSecureToken: true }
  );
}

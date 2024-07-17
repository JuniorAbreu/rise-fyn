import { api, requestConfig } from "../utils/config";
import { useStorage } from "../hooks/useStorage";
const { saveItem, removeItem } = useStorage();

// Register a user
const register = async (data) => {
  const config = requestConfig("POST", data);
  try {
    const res = await fetch(api + "/users/register", config)
      .then((res) => res.json())
      .catch((err) => err);
    if (res && !res.errors) {
      saveItem('@user', JSON.stringify(res));
      // localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Logout a user
const logout = () => {
  // localStorage.removeItem("user");
  removeItem('@user', 0)
};

// Sign in a user
const login = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(api + "/users/login", config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      saveItem('@user', JSON.stringify(res));
      // localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
  logout,
  login,
};

export default authService;

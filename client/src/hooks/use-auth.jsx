import { useStore } from "@nanostores/react";
import { $user, clearUser, setUser } from "../lib/store";
import { API_URL } from "@/env";

function useAuth() {
  const user = useStore($user);

  const register = async (name, username, password) => {
    try {
      if (!name || !username || !password) {
        throw new Error("Name, username, and password are required!");
      }

      const response = await fetch(`${API_URL}/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
        credentials: "include",
      });
      const jsonObject = await response.json();
      const msg = jsonObject.message;
      if (!response.ok) {
        throw new Error(msg);
      }
      const { user } = jsonObject;
      setUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage =
        (error).message ?? "Please try again later!";
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const login = async (email, password) => {
    try {
      if (!email || !password) {
        throw new Error("Email and password are required!");
      }
      const response = await fetch(`${API_URL}/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const jsonObject = await response.json();
      const msg = jsonObject.message;
      if (!response.ok) {
        throw new Error(msg);
      }
      const { user } = jsonObject;
      setUser(user);
      return { success: true };
    } catch (error) {
      const errorMessage =
        (error).message ?? "Please try again later!";
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/sign-out`, {
        method: "POST",
        credentials: "include",
      });
      clearUser();
    } catch (error) {
      const errorMessage =
        (error).message ?? "Please try again later!";
      console.log(errorMessage);
    }
  };

  const validate = async () => {
    if (!user || !user.email) return false;

    try {
      const response = await fetch(`${API_URL}/validate-session`, {
        credentials: "include",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  return { user, login, register, logout, validate };
}

export default useAuth;

import { persistentMap } from "nanostores/persistent";

const defaultUser = {
  id: "",
  name: "",
  username: "",
  email: "",
};
export const $user = persistentMap("user:", defaultUser);

export const setUser = (user) => {
  $user.set(user);
};

export const clearUser = () => {
  $user.set(null);
};

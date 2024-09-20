import { create } from "zustand";
import { User } from "src/types/user";
import { persist } from "zustand/middleware";

export interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,

      setUser: async (user: User) => {
        set({ user });
        return user;
      },
    }),
    { name: "user" }
  )
);

export default useUserStore;

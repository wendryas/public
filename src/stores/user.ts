import { create } from "zustand";
import { User } from "src/types/user";
import { persist } from "zustand/middleware";

export interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

const useUserStore = create(
  persist<UserState>(
    (set) => ({
      user: null,

      setUser: async (user: User | null) => {
        set({ user });
        return user;
      },
    }),
    { name: "user" }
  )
);

export default useUserStore;

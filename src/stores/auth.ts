import { create } from "zustand";
import { persist } from "zustand/middleware";
import { auth, login, LoginParams, getOAuthRedirect } from "src/firebase/auth";
import { createUser, getUserByEmail } from "src/services/user";
import { User } from "src/types/user";

export interface AuthState {
  user: User | null;
  checkAuthState: () => void;
  login: (params: LoginParams) => Promise<User>;
  watchOAuth: () => Promise<boolean>;
  register: (params: Omit<User, "id">) => Promise<User>;
  logout: () => Promise<void>;
}

const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,

      checkAuthState: () => {
        return auth.onAuthStateChanged(async (user) => {
          if (user) {
            const dbUser = (await getUserByEmail(
              user.email as string
            )) as User;
            set({ user: dbUser });
          } else {
            set({ user: null });
          }
        });
      },

      register: async (data: Omit<User, "id">) => {
        const userWithEmail = await getUserByEmail(data.email);
        if (userWithEmail)
          throw new Error("Ja existe um usuário com este e-mail");

        const { id } = await createUser(data);
        const user = { ...data, id };

        set({ user });
        return user;
      },

      watchOAuth: async () => {
        const user = await getOAuthRedirect().then(async (credential) => {
          if (!credential) return null;

          const dbUser = await getUserByEmail(credential.user.email as string);
          if (!dbUser) {
            const userData = {
              name: credential.user.displayName as string,
              email: credential.user.email as string,
              password: credential.user.uid,
            };
            const { id } = await createUser(userData);
            return { ...userData, id };
          }
          return dbUser;
        });

        if (!user) return false;

        set({ user });
        return true;
      },

      login: async ({ email, password }: LoginParams) => {
        const [, dbUser] = await Promise.all([
          login({ email, password }),
          getUserByEmail(email) as Promise<User>,
        ]);

        const user = dbUser;

        set({ user });
        return user;
      },

      logout: async () => {
        await auth.signOut();
        set({ user: null });
      },
    }),
    { name: "auth" }
  )
);

export default useAuthStore;

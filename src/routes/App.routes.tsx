import BaseLayout from "src/components/BaseLayout";
import Dashboard from "src/pages/Dashboard";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { auth } from "src/config/firebase";
import useUserStore from "src/stores/user";
import { getUserByEmail, createUser } from "src/services/user";
import { User } from "src/types/user";

export function AppRoutes() {
  const [user] = useAuthState(auth);
  const { setUser } = useUserStore();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (user) {
      intervalId = setInterval(async () => {
        if (user.displayName && user.email) {
          const existingUser = await getUserByEmail(user.email);

          if (existingUser) {
            setUser(existingUser as User);
          } else {
            const currUser = {
              id: user.uid,
              name: user.displayName,
              email: user.email
            };
            await createUser(currUser);
            setUser(currUser);
          }

          if (intervalId) {
            clearInterval(intervalId);
          }
        }
      }, 100);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [user]);

  return (
    <Routes>
      <Route path="/" Component={BaseLayout}>,
        <Route index Component={Dashboard} />
        <Route path="*" Component={Dashboard} />
      </Route>
    </Routes>
  );
}

import BaseLayout from "src/components/BaseLayout";
import Dashboard from "src/pages/Dashboard";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Route, Routes } from "react-router-dom";
import { auth } from "src/config/firebase";
import { getUserByEmail } from "src/services/user";

export function AppRoutes() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user?.email) {
      console.log(user)
          const existingUser = getUserByEmail(user.email);

          console.log(existingUser, 'user')
        }
  }, [user]);

  return (
    <Routes>
      <Route path="/" Component={BaseLayout}>
        <Route index path="dashboard" Component={Dashboard} />
        <Route path="*" Component={Dashboard} />
      </Route>
    </Routes>
  );
}

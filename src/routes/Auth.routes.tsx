import Login from "src/pages/Account/Login";
import ForgotPassword from "src/pages/Account/ForgotPassword";
import Register from "src/pages/Account/Register";
import RecoverPassword from "src/pages/Account/RecoverPassword";
import { Route, Routes } from "react-router-dom";

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" Component={Login} />
      <Route path="forgot-password" Component={ForgotPassword} />
      <Route path="recover-password" Component={RecoverPassword} />
      <Route path="register" Component={Register} />
      <Route path="*" Component={Login} />
    </Routes>
  );
}
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./App.routes";
import { AuthRoutes } from "./Auth.routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/config/firebase";
import { LoadingOutlined } from "@ant-design/icons";

export function Router() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="w-full h-screen bg-white flex items-center justify-center">
        <div>
          <LoadingOutlined className="text-[24px]" />
        </div>
      </div>
    );
  }

  return <BrowserRouter>{user ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>;
}

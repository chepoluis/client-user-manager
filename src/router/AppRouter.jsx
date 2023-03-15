import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../components/CheckingAuth";
import { useCheckAuth } from "../hooks/useCheckout";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import { GeneralRoutes } from "./GeneralRoutes";

export const AppRouter = () => {
  const status = useCheckAuth();
  const isAuthenticated = () => status === "authenticated";

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <div className="app">
      {isAuthenticated() && <Sidebar />}
      <main className="content">
        {isAuthenticated() && <Topbar />}

        <Routes>
          {isAuthenticated() ? (
            <Route path="/*" element={<GeneralRoutes />} />
          ) : (
            <Route path="/*" element={<AuthRoutes />} />
          )}

          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
};

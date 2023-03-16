import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth } from "../components/CheckingAuth";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import { GeneralRoutes } from "./GeneralRoutes";

export const AppRouter = () => {
  const { isAuthenticated, status } = useAuth();

  if (status === "checking") {
    return <CheckingAuth />;
  }

  return (
    <div className="app">
      {isAuthenticated && <Sidebar />}
      <main className="content">
        {isAuthenticated && <Topbar />}

        <Routes>
          {isAuthenticated ? (
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

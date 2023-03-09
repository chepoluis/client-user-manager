import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import { GeneralRoutes } from "./GeneralRoutes";
// import { useCheckAuth } from "../hooks";
// import { CheckingAuth } from "../components";

export const AppRouter = () => {
  const isAuth = true; // <- Just for testing
  //   const status = useCheckAuth(); // <- TODO: Create custom hook to manage the authentication

  //   if (status === "checking") {
  //     return <CheckingAuth />; // <- TODO: Create component to show a loading page
  //   }

  return (
    <div className="app">
      {isAuth && <Sidebar />}
      <main className="content">
        {isAuth && <Topbar />}

        <Routes>
          {/* {status === "authenticated" ? ( */}
          {isAuth ? (
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

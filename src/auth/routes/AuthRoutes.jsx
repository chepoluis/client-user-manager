import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../scenes/login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      {/* If it doesn't match any route, it goes to login */}
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

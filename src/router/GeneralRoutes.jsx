import { Navigate, Route, Routes } from "react-router-dom";
import Accounts from "../scenes/accounts";
import Home from "../scenes/home/Home";
import Logs from "../scenes/logs";
import { Profile } from "../scenes/profile/Profile";
import Teams from "../scenes/teams";
import Users from "../scenes/users";

export const GeneralRoutes = () => {
  // TODO: implement the normal user routes (home and profile)
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="/accounts" element={<Accounts />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="/logs" element={<Logs />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};

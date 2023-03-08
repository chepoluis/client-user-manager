import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Topbar from "./scenes/global/Topbar";
import Home from "./scenes/home/Home";
import Sidebar from "./scenes/global/Sidebar";
import Login from "./scenes/login";
import Users from "./scenes/users";
import Accounts from "./scenes/accounts";
import Teams from "./scenes/teams";
import Logs from "./scenes/logs";
import { Profile } from "./scenes/profile/Profile";

function App() {
  const [theme, colorMode] = useMode();
  const isLoggedIn = true;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Resets the css to defaults. Default MUI styles are applied */}
        <CssBaseline />

        <div className="app">
          {isLoggedIn && <Sidebar />}
          <main className="content">
            {isLoggedIn && <Topbar />}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path='/users' element={ <Users /> } />
              <Route path='/accounts' element={ <Accounts /> } />
              <Route path='/teams' element={ <Teams /> } />
              <Route path='/logs' element={ <Logs /> } />
              <Route path='/profile' element={ <Profile /> } />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

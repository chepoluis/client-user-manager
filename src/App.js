import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import Topbar from './scenes/global/Topbar';
import Home from './scenes/home/Home';
import Sidebar from './scenes/global/Sidebar';

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Resets the css to defaults. Default MUI styles are applied */}
        <CssBaseline />

        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />

            <Routes>
              <Route path='/' element={ <Home /> } />
              {/* <Route path='/users' element={ <Users /> } /> */}
              {/* <Route path='/accounts' element={ <Accounts /> } /> */}
              {/* <Route path='/teams' element={ <Teams /> } /> */}
              {/* <Route path='/logs' element={ <Logs /> } /> */}
              {/* <Route path='/profile' element={ <Profile /> } /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

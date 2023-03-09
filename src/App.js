import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppRouter } from "./router/AppRouter";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* Resets the css to defaults. Default MUI styles are applied */}
        <CssBaseline />

        <AppRouter />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

// src/pages/_app.js
import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Criação do tema claro
const themeClaro = createTheme({
  palette: {
    mode: "light", // Força o tema claro
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={themeClaro}>
      <CssBaseline /> {/* Aplica o reset e estilo global do Material UI */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

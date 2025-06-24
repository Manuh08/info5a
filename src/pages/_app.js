import "@/styles/globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";


const themeClaro = createTheme({
  palette: {
    mode: "light",
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={themeClaro}>
      <CssBaseline /> 
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

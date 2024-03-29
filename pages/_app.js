import { ThemeProvider } from "next-themes";
import "../styles/global.css";

function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default App
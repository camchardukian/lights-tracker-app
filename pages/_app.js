import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AuthProvider } from "../Providers";

function MyApp({ Component, pageProps }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LocalizationProvider>
  );
}

export default MyApp;

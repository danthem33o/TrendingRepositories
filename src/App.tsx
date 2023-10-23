import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage/HomePage";
import { StateProvider } from "./state/context/StateProvider";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { SnackbarProvider } from "notistack";

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <QueryClientProvider client={queryClient}>
            <StateProvider>
              <HomePage />
            </StateProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage/HomePage";
import { StateProvider } from "./state/context/StateProvider";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <StateProvider>
          <HomePage />
        </StateProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;

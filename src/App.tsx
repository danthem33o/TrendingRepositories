import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage/HomePage";
import { StateProvider } from "./state/context/StateProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StateProvider>
        <HomePage />
      </StateProvider>
    </QueryClientProvider>
  );
}

export default App;

import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, BrowserRouter } from "react-router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="auth/register" element={<Register />} />*/}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

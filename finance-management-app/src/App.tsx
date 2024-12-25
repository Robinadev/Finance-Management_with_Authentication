import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage";
import "./styles/index.css";

function App() {
  return (
    <ChakraProvider>
      <LandingPage />
    </ChakraProvider>
  );
}

export default App;
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./pages/LandingPage";
import './styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import SignUpPage from "./pages/auth/SignUp";
import Dashboard from './pages/dashboard/Dashboard';
import SignUpPage1 from "./pages/auth/SignUp1";
function App() {
  return (
     <Router>
     <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/signup1" element={<SignUpPage1 />} />
       <Route path="/login" element={<Login />} />
       <Route path="/dashboard" element={<Dashboard />} />
       
     </Routes>
   </Router>
  );
}

export default App;
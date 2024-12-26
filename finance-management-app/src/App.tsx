import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpPage1 from './pages/auth/SignUp1';
import './styles/index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpPage1 />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup1" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;

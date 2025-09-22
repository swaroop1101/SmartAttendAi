import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ProfessorDashboard from "./pages/ProfessorDashboard";
import StudentPortal from "./pages/StudentPortal";
import QRScanner from "./pages/QRScanner";
import FacialRecognition from "./pages/FacialRecognition";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/professor-dashboard" element={<ProfessorDashboard />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/qr-scanner" element={<QRScanner />} />
          <Route path="/facial-recognition" element={<FacialRecognition />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
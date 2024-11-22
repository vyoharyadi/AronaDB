import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import CharacterPage from "./pages/CharacterPage";
import BannerPage from "./pages/BannerPage";
import RaidPage from "./pages/RaidPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/character" element={<CharacterPage />} />
        <Route path="/banner" element={<BannerPage />} />
        <Route path="/raid" element={<RaidPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Navbar />
    </Router>
  );
}

export default App;

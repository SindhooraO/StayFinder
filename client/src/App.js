// ✅ App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ListingDetails from './pages/ListingDetails';
import Home from './pages/Home';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Optional: Validate or decode token here if needed
      setUser({}); // Dummy set if no decoding
    }
  }, []);

  return (
    <Router>
      <Navbar
        user={user}
        onLoginClick={() => setShowLogin(true)}
        onRegisterClick={() => setShowRegister(true)}
        onLogout={handleLogout}
      />

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onOpenRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onOpenLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />

      <main className="min-h-[80vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetails />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from "react-router-dom";

function Navbar({ onLoginClick, onRegisterClick, user, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      onLogout();
      setShowDropdown(false);
    }
  };

  return (
    <nav className="bg-white shadow px-4 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-rose-600">
        Stay<span className="text-gray-800">Finder</span>
      </Link>

      <div className="relative">
       {!user ? (
  <div className="space-x-2">
    <button
      onClick={onLoginClick}
      className="text-sm px-3 py-1.5 border bg-rose-500 text-white rounded-full hover:bg-rose-600 transition"
    >
      Login
    </button>
    <button
      onClick={onRegisterClick}
      className="text-sm px-3 py-1.5 border bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
    >
      Register
    </button>
  </div>
) : (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <FaUserCircle className="text-2xl text-gray-700" />
              <span className="text-gray-800 font-medium">
                {user.username || user.name || 'User'}
              </span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg py-2 w-40 z-50">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

// src/components/Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../services/authService';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="navbar">
            {isAuthenticated() && (
                <div className="links">
                    <a href="/">Home</a>
                </div>
            )}
            {isAuthenticated() && (
                <div className="logout-container">
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
};

export default Navbar;

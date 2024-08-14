// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProjectPage from './pages/ProjectPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import PrivateRoute from './PrivateRoute';
import { isAuthenticated } from './services/authService'; // Import isAuthenticated

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/"
                        element={
                            isAuthenticated() ? <Navigate to="/home" /> : <Navigate to="/login" />
                        }
                    />
                    <Route
                        path="/home"
                        element={
                            <PrivateRoute>
                                <HomePage />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/projects/:id"
                        element={
                            <PrivateRoute>
                                <ProjectPage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to={isAuthenticated() ? "/home" : "/login"} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

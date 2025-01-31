import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Header from "./components/Header";
import { StudentTable } from "./components/StudentTable";
import Home from "./components/home";
import StudentForm from "./components/StudentForm";
import EditStudentForm from "./components/EditForm";

// Get authentication status
const getAuthStatus = () => localStorage.getItem("isAuthenticated") === "true";

// PrivateRoute component
const PrivateRoute = ({ children }) => {
    return getAuthStatus() ? children : <Navigate to="/signUp" />;
};

export const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(getAuthStatus());

    useEffect(() => {
        const checkAuth = () => {
            setIsAuthenticated(getAuthStatus());
        };
        window.addEventListener("storage", checkAuth); // Sync auth status
        return () => window.removeEventListener("storage", checkAuth);
    }, []);

    return (
        <Router>
            <Header />
            <Routes>
                {/* Public Route */}
                <Route path="/signUp" element={<Signup onLogin={() => setIsAuthenticated(true)} />} />

                {/* Private Routes */}
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/updateStudent/:id" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
                <Route path="/deleteStudent/:id" element={<PrivateRoute><EditStudentForm /></PrivateRoute>} />
                <Route path="/addStudent" element={<PrivateRoute><StudentForm /></PrivateRoute>} />
                <Route path="/studentTable" element={<PrivateRoute><StudentTable /></PrivateRoute>} />
            </Routes>
        </Router>
    );
};

export default App;

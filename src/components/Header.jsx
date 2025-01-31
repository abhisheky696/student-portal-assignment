import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Clear authentication status
        setIsAuthenticated(false);
        navigate("/signUp"); // Redirect to login page
    };

    return (
        <nav>
            <div className="flex justify-between bg-blue-600 text-white p-3 shadow-md h-16">
                <Link
                    to="/"
                    className="rounded-lg text-2xl px-3 py-1 font-bold hover:border hover:border-pink-300"
                >
                    Student Portal
                </Link>
                <div className="lg:hidden flex items-center" onClick={toggleMenu}>
                    <button className="text-3xl cursor-pointer">☰</button>
                </div>
                <div className="hidden lg:flex mx-5 flex justify-between">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/addStudent"
                                className="px-2 py-1 text-lg font-bold mx-2 hover:border hover:border-pink-300 rounded-lg"
                            >
                                + Add Student
                            </Link>
                            <Link
                                to="/studentTable"
                                className="px-2 py-1 text-lg font-bold mx-2 hover:border hover:border-pink-300 rounded-lg"
                            >
                                Student Detail
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg px-2 py-1 text-lg font-bold mx-3 hover:border hover:border-red-300  text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signUp"
                            className="rounded-lg px-2 py-1 text-lg font-bold mx-3 hover:border hover:border-pink-300"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-blue-600 text-white p-3 flex flex-col">
                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/addStudent"
                                className="px-2 py-1 text-lg font-bold hover:border hover:border-pink-300 rounded-lg mb-2"
                            >
                                + Add Student
                            </Link>
                            <Link
                                to="/studentTable"
                                className="px-2 py-1 text-lg font-bold hover:border hover:border-pink-300 rounded-lg mb-2"
                            >
                                Student Detail
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg px-2 py-1 text-lg font-bold hover:border hover:border-red-300  text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/signUp"
                            className="rounded-lg px-2 py-1 text-lg font-bold hover:border hover:border-pink-300"
                        >
                            Login
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;

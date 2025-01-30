import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
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
                <div
                    className="lg:hidden flex items-center"
                    onClick={toggleMenu}
                >
                    <button className="text-3xl cursor-pointer">☰</button>
                </div>
                <div className="hidden lg:flex mx-5 flex justify-between">
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
                    <Link
                        to="/signUp"
                        className="rounded-lg px-2 py-1 text-lg font-bold mx-3 hover:border hover:border-pink-300"
                    >
                        Login
                    </Link>
                </div>
            </div>
            {isMenuOpen && (
                <div className="lg:hidden bg-blue-600 text-white p-3 flex flex-col">
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
                    <Link
                        to="/signUp"
                        className="rounded-lg px-2 py-1 text-lg font-bold hover:border hover:border-pink-300"
                    >
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Header;

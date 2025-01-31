import { useState } from "react";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getAuth,
} from "firebase/auth";
import { App } from "./firebase";
import { useNavigate } from "react-router-dom";

const auth = getAuth(App);

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleAuth = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Try signing in first
            await signInWithEmailAndPassword(auth, email, password);
            console.log("User signed in successfully");
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                try {
                    // If user not found, create an account
                    await createUserWithEmailAndPassword(auth, email, password);
                    console.log("User registered successfully");
                } catch (registerError) {
                    setError(registerError.message);
                    return;
                }
            } else {
                setError(error.message);
                return;
            }
        }

        // Store authentication status & redirect
        localStorage.setItem("isAuthenticated", "true");
        navigate("/");
        window.location.reload(); // Refresh the UI if needed
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg mx-5">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Login
                </h2>

                {error && (
                    <p className="text-red-500 text-center mt-2">{error}</p>
                )}

                <form onSubmit={handleAuth} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 mt-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none"
                    >
                        Login / Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

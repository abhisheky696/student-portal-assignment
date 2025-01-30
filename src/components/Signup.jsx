import { useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    getAuth,
} from "firebase/auth";
import { App } from "./firebase";
const auth = getAuth(App);
const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const SignUpUser = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => console.log("User signed in successfully"))
            .catch((error) => alert(error.message));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        SignUpUser();
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg mx-5">
                <h2 className="text-2xl font-bold text-center text-gray-700">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="mt-4" method="get">
                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
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
                            name="password"
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

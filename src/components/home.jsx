import React from "react";
import image from "../images/front.jpg";

const Home = () => {
    return (
        <div
            className="relative flex items-center justify-center h-screen w-[98.9vw] overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
        >
            <div className="absolute inset-0 bg-[#4d3f3fa5]"></div>
            <div className="relative z-10 text-blue-900 text-5xl mt-0 bg-red-100 p-5 rounded-lg font-bold text-center font-serif ">
                Welcome to Student Portal
            </div>
        </div>
    );
};

export default Home;

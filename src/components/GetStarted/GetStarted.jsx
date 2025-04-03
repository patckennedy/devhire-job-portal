import React from 'react';
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';
import devlogo from '../assets/devlogo.png';

const GetStarted = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 my-8 bg-gradient-to-b from-[#010101] to-black text-white overflow-hidden">
            {/* DevHire Logo}
            {/* Logo at the top */}
            <img
                src={devlogo}
                alt="DevHire Logo"
                className="w-16 h-auto mb-6 animate-spin"
            />
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white-800">
                Welcome to Devhire!
            </h1>
            <p className="text-lg md:text-xl text-white-600 max-w-2xl text-center mb-10">
                To help you get started, choose if you'd like to join DevHire as
                a developer or a recruiter.
            </p>
            {/* Card Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Card 1: Developer / Freelancer */}
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
                    {/* Icon to be added in a different style */}

                    <div className="mb-6">
                        <FaUserGraduate className="w-10 h-20 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        I'm a developer
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Use DeHire to land your next role. Browse a wide range
                        of job listings and opportunities.
                    </p>

                    <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 w">
                        Join as a developer
                    </button>
                </div>
                {/* Card 2: Recruiter */}
                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
                    {/* Icon to be added in a different style */}

                    <div className="mb-6">
                        <FaUserTie className="w-10 h-20 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                        I'm a recruiter
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Use DeHire to to find highly qualifiedtailented
                        candidtes and post job opportunities.
                    </p>
                    {/* <button className="bg-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-700 transition-colors">
                        Join as a developer
                    </button> */}
                    <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900">
                        Join as a recruiter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;

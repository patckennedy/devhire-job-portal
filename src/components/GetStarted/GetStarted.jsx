import React from 'react';
import { FaUserTie, FaUserGraduate } from 'react-icons/fa';
// import devlogo from '../assets/devlogo.png';

// Import useNavigate
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    // Initialize navigate and handler
    const navigate = useNavigate();

    // Allow optional tab (register or login)
    const handleJoin = (role, tab = 'register') => {
        navigate(`/auth?role=${role}&tab=${tab}`);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 my-8 bg-gradient-to-b from-[#04091A] to-black text-white overflow-hidden">
            {/* DevHire Logo */}
            {/* <img
                src={devlogo}
                alt="DevHire Logo"
                className="w-16 h-auto mb-6 animate-spin"
            /> */}

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white-800">
                Welcome to Devhire!
            </h1>
            <p className="text-lg md:text-xl text-white-600 max-w-2xl text-center mb-10">
                To help you get started, choose if you'd like to join DevHire as
                a developer or a recruiter.
            </p>

            {/* Card Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
                {/* Developer Card */}
                <div className="border border-gray-700 bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:bg-gray-800 hover:shadow-xl transition-all">
                    <div className="mb-6">
                        <FaUserGraduate className="w-10 h-20 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        I'm a developer
                    </h2>
                    <p className="text-gray-400 text-center mb-6">
                        Use DevHire to land your next role. Browse a wide range
                        of job listings and opportunities.
                    </p>

                    {/* Role-based options */}
                    <div className="flex flex-col gap-2 w-full">
                        <button
                            onClick={() => handleJoin('job_seeker', 'register')}
                            className="text-purple-500 border border-purple-600 hover:bg-purple-800 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Join as a Developer
                        </button>
                        <button
                            onClick={() => handleJoin('job_seeker', 'login')}
                            className="text-white border border-gray-500 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Login as Developer
                        </button>
                    </div>
                </div>

                {/* Recruiter Card */}
                <div className="border border-gray-700 bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center hover:bg-gray-800 hover:shadow-xl transition-all">
                    <div className="mb-6">
                        <FaUserTie className="w-10 h-20 text-gray-600" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        I'm a recruiter
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Use DevHire to find highly qualified talented candidates
                        and post job opportunities.
                    </p>

                    {/* Role-based options */}
                    <div className="flex flex-col gap-2 w-full">
                        <button
                            onClick={() => handleJoin('recruiter', 'register')}
                            className="text-purple-500 border border-purple-600 hover:bg-purple-800 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Join as a Recruiter
                        </button>
                        <button
                            onClick={() => handleJoin('recruiter', 'login')}
                            className="text-white border border-gray-500 hover:bg-gray-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Login as Recruiter
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GetStarted;

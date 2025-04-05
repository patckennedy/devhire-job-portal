import React from 'react';

const GetStartedNew = () => {
    return (
        <div>
            <div className="border border-gray-700 bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center  hover:bg-gray-800 hover:shadow-xl transition-all">
                {/* Icon to be added in a different style */}

                <div className="mb-6">
                    <FaUserGraduate className="w-10 h-20 text-gray-600" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    I'm a developer
                </h2>
                <p className="text-gray-400 text-center mb-6">
                    Use DeHire to land your next role. Browse a wide range of
                    job listings and opportunities.
                </p>

                <button className="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900 w">
                    Join as a developer
                </button>
            </div>
        </div>
    );
};

export default GetStartedNew;

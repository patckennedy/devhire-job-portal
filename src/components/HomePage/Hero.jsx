import React from 'react';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex bg-gradient-to-b from-[#010101] to-black text-white overflow-hidden ">
            <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center relative z-10">
                {/* Left Section */}
                <div className="w-full md:w-1/2 text-left mt-10 md:mt-0">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">
                        Find Your <br />
                        Next Job at Dev Hire
                    </h1>
                    <p className="text-gray-300 text-lg sm:text-xl md:text-2xl mb-8 max-w-xl">
                        DevHire is the complete dark-themed solution for your
                        job board website.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-purple-600  hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-full transition">
                            Explore Pages
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-full transition">
                            Explore pages
                        </button>
                    </div>
                </div>
            </div>
            {/* Right Section */}
            <div>
                
            </div>
        </section>
    );
};

export default Hero;

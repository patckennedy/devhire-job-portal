import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center bg-[#04091A] text-white">
            <div className="container mx-auto px-6 py-10 md:py-20 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
                {/* Left Content */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-4">
                        <span className="text-teal-500">Great Teams</span>{' '}
                        <br />
                        <span>
                            <Typewriter
                                words={[
                                    'Find Your Next Job',
                                    'Start Your Dream Career',
                                    'Level Up Today',
                                ]}
                                loop={0}
                                cursor
                                cursorStyle="|"
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={2000}
                            />
                        </span>
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl mb-6 md:mb-8 max-w-md md:max-w-none mx-auto md:mx-0">
                        DevHire is your one-stop solution for discovering top
                        tech jobs and connecting with great companies.
                    </p>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition duration-200">
                        Get Started
                    </button>
                </div>

                {/* Right Image */}
                <div className="w-full md:w-1/2 flex justify-center object-contain rounded-xl shadow-[0_0_25px_#2dd4bf] animate-pulse">
                    <img
                        src="/images/womanh.png"
                        alt="Excited woman holding phone"
                        className="w-full max-w-md md:max-w-lg object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;

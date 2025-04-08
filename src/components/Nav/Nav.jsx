import React from 'react';
import { NavLink } from 'react-router-dom';
// import ThemeToggler from '../ThemeToggler/ThemeToggler.jsx';
// import useStore from '../../zustand/store';

function Nav() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4 bg-transparent">
            <div className="w-full flex items-center justify-between py-3 px-4 rounded-full border-2 border-gray-700 shadow-inner backdrop-blur-xl bg-gradient-to-b from-gray-800 to-black">
                {/* Brand/Logo */}
                <NavLink
                    to="/"
                    className="flex items-center cursor-pointer hover:opacity-80"
                >
                    {/* Image - logo */}

                    {/* <img
                        src="/images/logo/devlogo.png"
                        alt="DevHire Logo"
                        className="h-10 w-10 mr-2 object-contain"
                    /> */}

                    <span className="text-white text-3xl font-bold uppercase tracking-wide">
                        DevHire
                    </span>
                </NavLink>
                {/* Nav Links (Desktop) */}
                <ul className="hidden md:flex items-center space-x-8">
                    <li>
                        <NavLink
                            to="/job-listing"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            BROWSE JOBS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/about"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            ABOUT
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/resources"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            RESOURCES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            end
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            CONTACT
                        </NavLink>
                    </li>
                </ul>
                {/* Get Started Button (Desktop) */}
                <NavLink
                    to="/get-started"
                    end
                    className="hidden md:inline-block text-[#A259FF] font-semibold px-9 py-4 rounded-full border-2 border-[#A259FF] transition focus:outline-none focus:ring-2 focus:ring-[#6C00FF] hover:bg-gradient-to-r hover:from-[#A259FF] hover:to-[#6C00FF] hover:text-white"
                >
                    GET STARTED
                </NavLink>

                {/* Theme Toggler */}
                {/* <div className="ml-4">
                    <ThemeToggler />
                </div> */}
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        type="button"
                        className="text-white focus:outline-none"
                    >
                        <svg
                            className="h-8 w-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;

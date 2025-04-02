import React from 'react';
import { NavLink } from 'react-router-dom';

import useStore from '../../zustand/store';

function Nav() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4 bg-transparent">
            <div
                className="
          mx-auto w-full max-w-[80rem] 
          flex items-center justify-between
          py-4 px-6
          rounded-full
          border border-[#09112A]
          shadow-[inset_0_0_5px_#cfc8c86b]
          backdrop-blur-[15px]
          bg-gradient-to-t from-white/10 to-white/10
        "
            >
                {/* Brand/Logo */}
                <div className="flex items-center">
                    {/* <img
            src={devlogo}
            alt="DevHire Logo"
            className="h-10 w-10 mr-2 object-contain"
          /> */}
                    <span className="text-white text-xl font-bold uppercase tracking-wide">
                        DevHire
                    </span>
                </div>

                {/* Nav Links (Desktop) */}
                <ul className="hidden md:flex items-center space-x-8">
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
                    className="hidden md:inline-block bg-purple-600 hover:bg-purple-600 text-white font-semibold px-9 py-4 rounded-full transition"
                >
                    GET STARTED
                </NavLink>

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

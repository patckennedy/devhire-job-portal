import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function Nav() {
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-5 py-4 bg-transparent">
            <div className="w-full flex items-center justify-between py-3 px-4 rounded-full border-2 border-gray-700 shadow-inner backdrop-blur-xl bg-gradient-to-b from-gray-800 to-black">
                {/* Brand/Logo */}
                <NavLink
                    to="/"
                    className="flex items-center cursor-pointer hover:opacity-80"
                >
                    <span className="text-white text-3xl font-bold uppercase tracking-wide">
                        DevHire
                    </span>
                </NavLink>

                {/* Nav Links (Public + Conditional) */}
                <ul className="hidden md:flex items-center space-x-8">
                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/resources"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            Resources
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive
                                    ? 'text-purple-400 font-semibold'
                                    : 'text-white hover:text-purple-400 transition'
                            }
                        >
                            Contact
                        </NavLink>
                    </li>

                    {/* Conditional Links by Role */}
                    {user?.id && user.role === 'job_seeker' && (
                        <li>
                            <NavLink
                                to="/job-seeker-dashboard"
                                className="text-white hover:text-purple-400 transition"
                            >
                                My Dashboard
                            </NavLink>
                        </li>
                    )}

                    {user?.id && user.role === 'recruiter' && (
                        <>
                            <li>
                                <NavLink
                                    to="/recruiter-dashboard"
                                    className="text-white hover:text-purple-400 transition"
                                >
                                    Recruiter Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/post-jobs"
                                    className="text-white hover:text-purple-400 transition"
                                >
                                    Post a Job
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Auth Links */}
                    {!user?.id ? (
                        <>
                            <li>
                                <NavLink
                                    to="/login"
                                    className="text-white hover:text-purple-400 transition"
                                >
                                    Login
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/registration"
                                    className="text-white hover:text-purple-400 transition"
                                >
                                    Register
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li>
                            <button
                                onClick={handleLogout}
                                className="text-red-400 hover:text-red-500 font-semibold"
                            >
                                Logout
                            </button>
                        </li>
                    )}
                </ul>

                {/* Mobile Menu (optional for later) */}
                <div className="md:hidden">
                    <button
                        type="button"
                        className="text-white focus:outline-none"
                    >
                        {/* Add real mobile nav here later */}
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

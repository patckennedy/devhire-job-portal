import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function Nav() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/login');
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-gray-700">
                <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2">
                        <img
                            src="/images/newlogo.png"
                            alt="DevHire Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </NavLink>

                    {/* Nav links */}
                    <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
                        {['about', 'resources', 'contact'].map((link) => (
                            <li key={link}>
                                <NavLink
                                    to={`/${link}`}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-purple-400 underline underline-offset-4'
                                            : 'text-gray-300 hover:text-white transition'
                                    }
                                >
                                    {link.charAt(0).toUpperCase() +
                                        link.slice(1)}
                                </NavLink>
                            </li>
                        ))}

                        {!user?.id ? (
                            <>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        Login
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/registration"
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        Register
                                    </NavLink>
                                </li>
                            </>
                        ) : (
                            <>
                                {user.role === 'recruiter' && (
                                    <li>
                                        <NavLink
                                            to="/recruiter-dashboard"
                                            className="text-gray-300 hover:text-white transition"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                )}
                                {user.role === 'job_seeker' && (
                                    <li>
                                        <NavLink
                                            to="/job-seeker-dashboard"
                                            className="text-gray-300 hover:text-white transition"
                                        >
                                            Dashboard
                                        </NavLink>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-red-400 hover:text-red-500 transition font-semibold"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-white"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
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

                {/* Mobile Menu Items */}
                {isMobileMenuOpen && (
                    <div className="md:hidden bg-black/90 border-t border-gray-700 px-6 py-4 text-lg font-medium flex flex-col gap-4">
                        {['about', 'resources', 'contact'].map((link) => (
                            <NavLink
                                key={link}
                                to={`/${link}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) =>
                                    isActive
                                        ? 'text-purple-400 underline underline-offset-4'
                                        : 'text-gray-300 hover:text-white transition'
                                }
                            >
                                {link.charAt(0).toUpperCase() + link.slice(1)}
                            </NavLink>
                        ))}

                        {!user?.id ? (
                            <>
                                <NavLink
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    Login
                                </NavLink>
                                <NavLink
                                    to="/registration"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-300 hover:text-white transition"
                                >
                                    Register
                                </NavLink>
                            </>
                        ) : (
                            <>
                                {user.role === 'recruiter' && (
                                    <NavLink
                                        to="/recruiter-dashboard"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        Dashboard
                                    </NavLink>
                                )}
                                {user.role === 'job_seeker' && (
                                    <NavLink
                                        to="/job-seeker-dashboard"
                                        onClick={() =>
                                            setIsMobileMenuOpen(false)
                                        }
                                        className="text-gray-300 hover:text-white transition"
                                    >
                                        Dashboard
                                    </NavLink>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-red-400 hover:text-red-500 transition font-semibold text-left"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </>
    );
}

export default Nav;

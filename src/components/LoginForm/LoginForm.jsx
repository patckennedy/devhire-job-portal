import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';

const LoginForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Logging in with:', { email, password });
        } else {
            console.log('Signing up with:', { name, email, password });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#04091A] px-6 mt-[-80px]">
            {/* Toggle Button */}
            <div className="flex items-center mb-8 space-x-4 text-gray-300">
                <span className={`text-lg ${isLogin ? 'text-purple-400' : ''}`}>
                    LOG IN
                </span>
                <div
                    className="relative w-16 h-8 flex items-center bg-gradient-to-r from-[#00AEEF] to-[#007BFF] rounded-full cursor-pointer"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    <motion.div
                        className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md"
                        animate={{ x: isLogin ? 2 : 42 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {isLogin ? '←' : '→'}
                    </motion.div>
                </div>
                <span
                    className={`text-lg ${!isLogin ? 'text-purple-400' : ''}`}
                >
                    SIGN UP
                </span>
            </div>

            {/* Animated Form Card */}
            <div className="relative w-full max-w-md">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isLogin ? 'login' : 'signup'}
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gray-900 text-white p-10 rounded-lg shadow-xl w-full"
                    >
                        <h2 className="text-2xl font-bold text-center mb-4">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!isLogin && (
                                <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                    <User className="text-purple-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        className="bg-transparent outline-none text-white w-full"
                                    />
                                </div>
                            )}

                            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                <Mail className="text-purple-400 mr-2" />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-transparent outline-none text-white w-full"
                                />
                            </div>

                            <div className="flex items-center bg-gray-800 p-3 rounded-lg">
                                <Lock className="text-purple-400 mr-2" />
                                <input
                                    type="password"
                                    placeholder="Your Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="bg-transparent outline-none text-white w-full"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white py-3 rounded-lg font-semibold mt-4 hover:opacity-90 transition-all"
                            >
                                {isLogin ? 'Login' : 'Sign Up'}
                            </button>

                            {/* Forgot Password - Only for Login */}
                            {isLogin && (
                                <p className="text-center text-sm text-gray-400 mt-3">
                                    <a
                                        href="#"
                                        className="text-purple-400 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </p>
                            )}
                        </form>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default LoginForm;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const logIn = useStore((state) => state.logIn);
    const user = useStore((state) => state.user);
    const errorMessage = useStore((state) => state.authErrorMessage);
    const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);
    const navigate = useNavigate();

    useEffect(() => {
        return () => setAuthErrorMessage('');
    }, []);

    useEffect(() => {
        if (user?.id) {
            if (user.role === 'job_seeker') {
                console.log('Redirecting to:', user.role);

                navigate('/job-seeker-dashboard');
            } else if (user.role === 'recruiter') {
                navigate('/recruiter-dashboard');
            }
        }
    }, [user, navigate]);

    const handleLogIn = (event) => {
        event.preventDefault();
        logIn({ username, password });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#04091A] p-4">
            <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-md space-y-6">
                <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

                <form onSubmit={handleLogIn} className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block mb-1 text-sm font-medium"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-sm font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded text-white font-semibold hover:opacity-90 transition"
                    >
                        Log In
                    </button>
                </form>

                {errorMessage && (
                    <p className="text-red-400 text-sm text-center">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
}

export default LoginPage;

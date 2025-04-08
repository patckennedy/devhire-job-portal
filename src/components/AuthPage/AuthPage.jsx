import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useStore from '../../zustand/store';

const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const defaultRole = searchParams.get('role') || 'job_seeker';
    const defaultTab = searchParams.get('tab') || 'register';

    const [tab, setTab] = useState(defaultTab);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(defaultRole);

    const logIn = useStore((state) => state.logIn);
    const register = useStore((state) => state.register);
    const errorMessage = useStore((state) => state.authErrorMessage);
    const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

    // Clear error if any
    useEffect(() => {
        return () => setAuthErrorMessage('');
    }, []);

    // Keep tab in sync with URL when navigating from GetStarted
    useEffect(() => {
        const tabParam = searchParams.get('tab');
        if (tabParam && tabParam !== tab) {
            setTab(tabParam);
        }
    }, [searchParams]);

    const handleLogin = (e) => {
        e.preventDefault();
        logIn({ username, password });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        register({ username, password, role });
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Tab Switch */}
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => setTab('login')}
                        className={`w-1/2 py-2 font-semibold rounded-t ${
                            tab === 'login'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-700 text-gray-300'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setTab('register')}
                        className={`w-1/2 py-2 font-semibold rounded-t ${
                            tab === 'register'
                                ? 'bg-purple-600 text-white'
                                : 'bg-gray-700 text-gray-300'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Auth Form */}
                {tab === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        />
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold"
                        >
                            Log In
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600"
                        >
                            <option value="job_seeker">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded font-semibold"
                        >
                            Register
                        </button>
                    </form>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <p className="mt-4 text-red-400 text-sm text-center">
                        {errorMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthPage;

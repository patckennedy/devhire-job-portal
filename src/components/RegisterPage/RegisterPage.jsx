import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../zustand/store';

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('job_seeker');

    const register = useStore((state) => state.register);
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
                navigate('/job-seeker-dashboard');
            } else if (user.role === 'recruiter') {
                navigate('/recruiter-dashboard');
            }
        }
    }, [user, navigate]);

    const handleRegister = (event) => {
        event.preventDefault();
        register({ username, password, role });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#04091A] p-4">
            <div className="bg-gray-900 text-white w-full max-w-md p-8 rounded-xl shadow-md space-y-6">
                <h2 className="text-3xl font-bold text-center">
                    Create an Account
                </h2>

                <form onSubmit={handleRegister} className="space-y-4">
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
                    <div>
                        <label
                            htmlFor="role"
                            className="block mb-1 text-sm font-medium"
                        >
                            Registering As
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                            <option value="job_seeker">Job Seeker</option>
                            <option value="recruiter">Recruiter</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded text-white font-semibold hover:opacity-90 transition"
                    >
                        Register
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

export default RegisterPage;

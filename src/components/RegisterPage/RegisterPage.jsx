import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useStore from '../../zustand/store';

function RegisterPage() {
    // Read role from the URL like ?role=recruiter or ?role=job_seeker
    const [searchParams] = useSearchParams();
    const initialRole = searchParams.get('role') || 'job_seeker';

    // Set up state for form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(initialRole);

    // Global store functions for registration and error display
    const register = useStore((state) => state.register);
    const errorMessage = useStore((state) => state.authErrorMessage);
    const setAuthErrorMessage = useStore((state) => state.setAuthErrorMessage);

    // Clear any auth error messages
    useEffect(() => {
        return () => setAuthErrorMessage('');
    }, []);

    // Handle form submission
    const handleRegister = (event) => {
        event.preventDefault();
        register({ username, password, role });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-4">
            <h2 className="text-3xl font-bold mb-6">Create an Account</h2>

            {/* Registration form */}
            <form
                onSubmit={handleRegister}
                className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
            >
                <div>
                    <label
                        htmlFor="username"
                        className="block mb-1 font-medium"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="password"
                        className="block mb-1 font-medium"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Role Selection (auto-selected if role is in the URL) */}
                <div>
                    <label htmlFor="role" className="block mb-1 font-medium">
                        Register as
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="job_seeker">Job Seeker</option>
                        <option value="recruiter">Recruiter</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 py-3 rounded text-white font-semibold hover:opacity-90 transition"
                >
                    Register
                </button>
            </form>

            {/* Error message */}
            {errorMessage && (
                <p className="text-red-400 mt-4">{errorMessage}</p>
            )}
        </div>
    );
}

export default RegisterPage;

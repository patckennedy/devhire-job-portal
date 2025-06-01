import axios from 'axios';

// Ensure cookies (session info) are included in all requests
axios.defaults.withCredentials = true;

const createUserSlice = (set, get) => ({
    user: {},
    authErrorMessage: '',

    // Fetch user from server
    fetchUser: async () => {
        try {
            const { data } = await axios.get('http://localhost:5001/api/user');
            console.log('Fetched user from server:', data);
            set({ user: data });
        } catch (err) {
            console.log('fetchUser error:', err);
            set({ user: {} });
        }
    },

    // Register a new user and redirect to the correct dashboard
    register: async (newUserCredentials) => {
        get().setAuthErrorMessage('');
        try {
            await axios.post(
                'http://localhost:5001/api/user/register',
                newUserCredentials
            );

            // Automatically login after successful registration
            await get().logIn(newUserCredentials);

            // Fetch user again to ensure latest role is available
            const { role } = get().user;

            if (role === 'recruiter') {
                window.location.href = '/recruiter-dashboard';
            } else {
                window.location.href = '/job-seeker-dashboard';
            }
        } catch (err) {
            console.log('register error:', err);
            get().setAuthErrorMessage(
                'Oops! Registration failed. That username might already be taken. Try again!'
            );
        }
    },

    // Login user and redirect based on role
    logIn: async (userCredentials) => {
        console.log('Attempting login:', userCredentials);
        get().setAuthErrorMessage('');

        try {
            await axios.post(
                'http://localhost:5001/api/user/login',
                userCredentials
            );

            // Fetch user details after login
            await get().fetchUser();

            const { role } = get().user;

            if (role === 'recruiter') {
                window.location.href = '/recruiter-dashboard';
            } else {
                window.location.href = '/job-seeker-dashboard';
            }
        } catch (err) {
            console.log('logIn error:', err);
            if (err.response?.status === 401) {
                get().setAuthErrorMessage(
                    'Oops! Login failed. Invalid username or password.'
                );
            } else {
                get().setAuthErrorMessage(
                    'Oops! Login failed. Please try again.'
                );
            }
        }
    },

    // Log out user and clear state
    logOut: async () => {
        try {
            await axios.post('http://localhost:5001/api/user/logout');
            set({ user: {} });
            window.location.href = '/';
        } catch (err) {
            console.log('logOut error:', err);
        }
    },

    // Set error message for UI
    setAuthErrorMessage: (message) => {
        set({ authErrorMessage: message });
    },
});

export default createUserSlice;

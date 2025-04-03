import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Existing Components from the template
import useStore from '../../zustand/store';
import Nav from '../Nav/Nav';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
//New DevHire Pages/Views
import GetStarted from '../GetStarted/GetStarted';
import JobListing from '../JobListing/JobListing';
import PostJobs from '../PostJobs/PostJobs';
import RecruiterDashboard from '../RecruiterDashboard/RecruiterDashboard';
import RecruiterJobDetails from '../RecruiterJobDetails/RecruiterJobDetails';
import ViewJobDetails from '../ViewJobDetails/ViewJobDetails';
import SavedJobs from '../SavedJobs/SavedJobs';
import MyJobs from '../MyJobs/MyJobs';
import About from '../About/About';
import Contact from '../Contact/Contact';
import Resources from '../Resources/Resources';
import Footer from '../Footer/Footer';








function App() {
    // Get user state and the function to fetch user data from the global store.
    const user = useStore((state) => state.user);
    const fetchUser = useStore((state) => state.fetchUser);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <>
            <header>
                <Nav />
            </header>
            <main>
                <Routes>
                    {/* Public Routes: accessible to everyone */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/resources" element={<Resources />} />
                    <Route path="/get-started" element={<GetStarted />} />
                    <Route path="/job-listing" element={<JobListing />} />
                    {/* Public Routes: ENDS */}
                    {/* Authentication Routes */}
                    <Route
                        path="/login"
                        element={
                            user.id ? (
                                <Navigate to="/" replace />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    {/* ENDS */}
                    <Route
                        path="/registration"
                        element={
                            user.id ? (
                                <Navigate to="/" replace />
                            ) : (
                                <RegisterPage />
                            )
                        }
                    />
                    {/* ENDS */}

                    {/* If a user clicks on "View Details" on a job card and is not logged in, send them to GetStarted */}
                    <Route path="/job/:id" element={<GetStarted />} />

                    {/* Protected Routes: these routes are accessible only if a user is logged in */}
                    {user.id && (
                        <>
                            {/* For Job Seekers */}
                            <Route
                                path="/view-job/:id"
                                element={<ViewJobDetails />}
                            />
                            <Route path="/saved-jobs" element={<SavedJobs />} />
                            <Route path="/my-jobs" element={<MyJobs />} />

                            {/* For Recruiters */}
                            <Route path="/post-jobs" element={<PostJobs />} />
                            <Route
                                path="/recruiter-dashboard"
                                element={<RecruiterDashboard />}
                            />
                            <Route
                                path="/recruiter/job/:id"
                                element={<RecruiterJobDetails />}
                            />
                        </>
                    )}
                    {/* Authentication Routes ENDS */}

                    {/* Catch-all Route for unknown URLs */}
                    <Route path="*" element={<h2>404 Page Not Found</h2>} />

                    {/* --- */}
                </Routes>
            </main>
            {/* <footer>
                <p>Copyright © {new Date().getFullYear()}</p>
            </footer> */}
            <Footer />
        </>
    );
}

export default App;

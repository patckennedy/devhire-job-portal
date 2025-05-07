import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import useStore from '../../zustand/store';

// Pages & Components
import Nav from '../Nav/Nav';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import About from '../About/About';
import JobSeekerDashboard from '../JobSeekerDashboard/JobSeekerDashboard';
import RecruiterDashboard from '../RecruiterDashboard/RecruiterDashboard';
import RecruiterJobDetails from '../RecruiterJobDetails/RecruiterJobDetails';
import PostJobs from '../PostJobs/PostJobs';
import ViewJobDetails from '../ViewJobDetails/ViewJobDetails';
import Footer from '../Footer/Footer';
import Resources from '../Resources/Resources';
import Contact from '../Contact/Contact';

function App() {
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
                    {/* Public Routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/Resources" element={<Resources />} />

                    {/* <Route path="/resources" element={<Resources />} /> */}

                    {/* Auth Routes */}

                    <Route
                        path="/login"
                        element={
                            user.id ? (
                                user.role === 'recruiter' ? (
                                    <Navigate
                                        to="/recruiter-dashboard"
                                        replace
                                    />
                                ) : (
                                    <Navigate
                                        to="/job-seeker-dashboard"
                                        replace
                                    />
                                )
                            ) : (
                                <LoginPage />
                            )
                        }
                    />

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

                    {/* Protected Dashboards */}
                    <Route
                        path="/job-seeker-dashboard"
                        element={
                            <ProtectedRoute requiredRole="job_seeker">
                                <JobSeekerDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter-dashboard"
                        element={
                            <ProtectedRoute requiredRole="recruiter">
                                <RecruiterDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/post-jobs"
                        element={
                            <ProtectedRoute requiredRole="recruiter">
                                <PostJobs />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/recruiter/job/:id"
                        element={
                            <ProtectedRoute requiredRole="recruiter">
                                <RecruiterJobDetails />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/job/:id"
                        element={
                            <ProtectedRoute requiredRole="job_seeker">
                                <ViewJobDetails />
                            </ProtectedRoute>
                        }
                    />

                    {/* Fallback Route */}
                    <Route
                        path="*"
                        element={
                            <h2 className="pt-28 text-center text-white">
                                404 Page Not Found
                            </h2>
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;

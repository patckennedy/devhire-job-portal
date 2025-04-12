import React, { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import ModernJobCard from '../ModernJobCard/ModernJobCard';

const JobSeekerDashboard = () => {
    console.log('✅ JobSeekerDashboard loaded'); // Debug log
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);
    const [jobs, setJobs] = useState([]);

    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);

    useEffect(() => {
        if (!user.id) return;

        fetch(`http://localhost:5008/api/applied-jobs/${user.id}`)
            .then((res) => res.json())
            .then((data) => setAppliedJobs(data))
            .catch((err) => console.error('Error fetching applied jobs:', err));
    }, [user.id]);

    useEffect(() => {
        if (!user.id) return;

        fetch(`http://localhost:5008/api/saved-jobs/${user.id}`)
            .then((res) => res.json())
            .then((data) => setSavedJobs(data))
            .catch((err) => console.error('Error fetching saved jobs:', err));
    }, [user.id]);

    useEffect(() => {
        fetch('http://localhost:5008/api/jobs')
            .then((res) => res.json())
            .then((data) => setJobs(data))
            .catch((err) => console.error('Error fetching jobs:', err));
    }, []);

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6 pt-28">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.name || 'Job Seeker'}!
                </h1>
                <button
                    onClick={logOut}
                    className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded font-medium"
                >
                    Log Out
                </button>
            </div>

            {/* Available Jobs */}
            <section className="max-w-7xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
                {jobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <ModernJobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No jobs found.</p>
                )}
            </section>

            {/* Saved Jobs */}
            <section className="max-w-7xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">My Saved Jobs</h2>
                {savedJobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.map((job) => (
                            <ModernJobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">
                        You haven’t saved any jobs yet.
                    </p>
                )}
            </section>

            {/* Applied Jobs */}

            <section className="max-w-7xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">
                    Jobs I’ve Applied To
                </h2>
                {appliedJobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {appliedJobs.map((job) => (
                            <ModernJobCard key={job.id} job={job} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">
                        You haven’t applied to any jobs yet.
                    </p>
                )}
            </section>
        </div>
    );
};

export default JobSeekerDashboard;

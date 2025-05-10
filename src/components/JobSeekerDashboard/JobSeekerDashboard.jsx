import React, { useState, useEffect } from 'react';
import useStore from '../../zustand/store';
import ModernJobCard from '../ModernJobCard/ModernJobCard';

const JobSeekerDashboard = () => {
    console.log('JobSeekerDashboard loaded');
    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);
    const [jobs, setJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

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

    // 🔍 Filter jobs based on search input
    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6 pt-28">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.name || 'Jobseeker'}
                </h1>
            </div>

            {/* Search Input */}

            {/* Search Input with Button */}
            <div className="max-w-2xl mx-auto mb-10">
                <input
                    type="text"
                    placeholder="Search by job title, company, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 rounded-md bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>

            {/* Available Jobs */}
            <section className="max-w-7xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
                {filteredJobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <ModernJobCard
                                key={job.id}
                                job={job}
                                savedJobs={savedJobs}
                                updateSavedJobs={setSavedJobs}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No jobs found.</p>
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
            {/* Saved Jobs */}
            {/* Saved Jobs */}
            {/* Saved Jobs */}
            <section className="max-w-7xl mx-auto mb-12">
                <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>
                {savedJobs.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {savedJobs.map((job) => (
                            <ModernJobCard
                                key={job.id}
                                job={job}
                                savedJobs={savedJobs}
                                updateSavedJobs={(updatedList) =>
                                    setSavedJobs([...updatedList])
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">
                        You haven’t saved any jobs yet.
                    </p>
                )}
            </section>
        </div>
    );
};

export default JobSeekerDashboard;

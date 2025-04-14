import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import useStore from '../../zustand/store';

const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [totalJobs, setTotalJobs] = useState(0);
    const [totalApplications, setTotalApplications] = useState(0);

    const user = useStore((state) => state.user);
    const logOut = useStore((state) => state.logOut);

    useEffect(() => {
        if (!user.id) return;
        fetch(`http://localhost:5008/api/jobs/recruiter/${user.id}`)
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
                setTotalJobs(data.length);
                const totalApps = data.reduce(
                    (sum, job) => sum + (job.applications || 0),
                    0
                );
                setTotalApplications(totalApps);
            })
            .catch((err) =>
                console.error('Failed to fetch recruiter jobs:', err)
            );
    }, [user.id]);
    // Handles Job Status Change
    const handleStatusChange = async (jobId, newStatus) => {
        try {
            const res = await fetch(
                `http://localhost:5008/api/jobs/${jobId}/status`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ job_status: newStatus }),
                }
            );

            if (res.ok) {
                const updated = jobs.map((job) =>
                    job.id === jobId ? { ...job, job_status: newStatus } : job
                );
                setJobs(updated);
            } else {
                console.error('Failed to update job status.');
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    // Handle delete function
    const handleDelete = (jobId) => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            const updated = jobs.filter((job) => job.id !== jobId);
            setJobs(updated);
            setTotalJobs(updated.length);
            const totalApps = updated.reduce(
                (sum, job) => sum + (job.applications || 0),
                0
            );
            setTotalApplications(totalApps);
        }
    };

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6 mt-24">
            {/* Header with Logout */}
            <div className="flex justify-between items-center max-w-6xl mx-auto mb-8">
                <h1 className="text-4xl font-bold">Recruiter Dashboard</h1>
            </div>

            {/* Metrics */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-[#12172A] border border-[#1abc9c]/30 hover:border-[#1abc9c]/60 hover:shadow-md transition duration-300 rounded-2xl p-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">{totalJobs}</h2>
                    <p className="text-gray-400">Jobs Posted</p>
                </div>
                <div className="bg-[#12172A] border border-[#1abc9c]/30 hover:border-[#1abc9c]/60 hover:shadow-md transition duration-300 rounded-2xl p-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">
                        {totalApplications}
                    </h2>
                    <p className="text-gray-400">Total Applications</p>
                </div>
                <div className="bg-[#12172A] border border-[#1abc9c]/30 hover:border-[#1abc9c]/60 hover:shadow-md transition duration-300 rounded-2xl p-6 text-center">
                    <h2 className="text-2xl font-bold mb-2">Updated Soon</h2>
                    <p className="text-gray-400">Recent Activity</p>
                </div>
            </div>

            {/*Add Job Button */}
            <div className="max-w-6xl mx-auto mb-6 text-right">
                <Link
                    to="/post-jobs"
                    className="bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-md font-medium"
                >
                    + Post a Job
                </Link>
            </div>

            {/*Job Cards */}
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Your Job Postings</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.length > 0 ? (
                        jobs.map((job) => (
                            <div
                                key={job.id}
                                className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col gap-4 transition-all duration-200 hover:border-teal-400 hover:shadow-[0_0_10px_1px_rgba(20,184,166,0.5)]"
                            >
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {job.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        {job.company_name} - {job.location}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <label className="text-gray-300 text-sm font-semibold">
                                        Status:
                                    </label>
                                    <select
                                        value={job.job_status}
                                        onChange={(e) =>
                                            handleStatusChange(
                                                job.id,
                                                e.target.value
                                            )
                                        }
                                        className="bg-gray-800 text-white p-1 rounded text-sm focus:outline-none"
                                    >
                                        <option value="Open">Open</option>
                                        <option value="Interviewing">
                                            Interviewing
                                        </option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>

                                <div>
                                    <p className="text-gray-300 text-sm">
                                        <span className="font-semibold">
                                            Applications:
                                        </span>{' '}
                                        {job.applications || 0}
                                    </p>
                                </div>

                                <div className="mt-auto flex justify-between items-center">
                                    <Link
                                        to={`/recruiter/job/${job.id}`}
                                        className="text-sm px-4 py-2 bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white rounded hover:opacity-90 transition"
                                    >
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(job.id)}
                                        className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-md transition"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-full text-gray-400">
                            <p className="mb-4">
                                You haven't posted any jobs yet.
                            </p>
                            <Link
                                to="/post-jobs"
                                className="inline-block bg-purple-700 hover:bg-purple-600 text-white py-2 px-4 rounded-md font-medium"
                            >
                                + Post Your First Job
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecruiterDashboard;

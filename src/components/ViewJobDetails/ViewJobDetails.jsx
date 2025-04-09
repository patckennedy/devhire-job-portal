import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ViewJobDetails = ({ jobId }) => {
    const { id } = useParams();
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5008/api/jobs/${id}`)
            .then((res) => res.json())
            .then((data) => setJob(data))
            .catch((err) => console.error('Error fetching job:', err));
    }, [id]);

    if (!job) {
        return (
            <div className="min-h-screen bg-[#04091A] text-white p-10 mt-24 text-center">
                <p>Loading job details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#04091A] text-white px-6 py-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left: Main Content */}
                <div className="lg:col-span-2">
                    <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                    <p className="text-gray-400 mb-6">
                        {job.company_name} • {job.location}
                    </p>

                    <h2 className="text-xl font-semibold mb-2">
                        Job Description
                    </h2>
                    <p className="text-gray-300 mb-6">{job.description}</p>

                    <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                    <p className="text-gray-300">{job.requirements}</p>
                </div>

                {/* Right: Sidebar */}
                <div className="sticky top-28 h-fit bg-[#12172A] border border-gray-700 p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                        {job.company_name}
                    </p>

                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="text-white">{job.location}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm text-gray-500 mb-1">Job Type</p>
                        <p className="text-white">{job.job_type}</p>
                    </div>

                    {job.salary && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500 mb-1">Salary</p>
                            <p className="text-white">${job.salary}</p>
                        </div>
                    )}

                    {job.application_link && (
                        <a
                            href={job.application_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-center mt-6 bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Apply Now
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ViewJobDetails;

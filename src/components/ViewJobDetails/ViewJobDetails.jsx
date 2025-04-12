import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../zustand/store';
import axios from 'axios';

const ViewJobDetails = () => {
    const { id } = useParams();
    const user = useStore((state) => state.user);
    const [job, setJob] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5008/api/jobs/${id}`)
            .then((res) => res.json())
            .then((data) => setJob(data))
            .catch((err) => console.error('Error fetching job:', err));
    }, [id]);

    const handleApply = async () => {
        if (!user?.id) {
            alert('Please log in to apply.');
            return;
        }

        try {
            await axios.post('http://localhost:5008/api/applied-jobs', {
                user_id: user.id,
                job_id: job.id,
            });
            alert('Successfully applied!');
        } catch (err) {
            console.error('Error applying to job:', err);
        }
    };

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
                    <p className="text-gray-300 mb-6 whitespace-pre-line">
                        {job.description}
                    </p>

                    <h2 className="text-xl font-semibold mb-2">Requirements</h2>
                    <p className="text-gray-300 whitespace-pre-line">
                        {job.requirements}
                    </p>
                </div>

                {/* Right: Sidebar */}
                <div className="sticky top-28 h-fit space-y-6 items-center text-center">
                    {/* Apply Now Box */}
                    <div className="bg-[#12172A] border border-gray-700 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">
                            Apply Now
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Take the next step in your career.
                        </p>
                        <button
                            onClick={handleApply}
                            className="w-full bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                        >
                            Apply
                        </button>
                    </div>

                    {/* About Company / Resources Box */}
                    <div className="bg-[#12172A] border border-gray-700 p-6 rounded-xl shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">
                            Interview Preps & Tips
                        </h3>
                        <p className="text-gray-400 text-sm mb-4">
                            Discover how to prepare, get interview tips, and
                            more.
                        </p>
                        <a
                            href="/resources"
                            className="block text-center border border-blue-500 text-blue-400 py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                        >
                            Explore Resources
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewJobDetails;

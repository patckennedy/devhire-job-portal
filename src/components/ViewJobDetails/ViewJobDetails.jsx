import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useStore from '../../zustand/store';
import axios from 'axios';

const ViewJobDetails = () => {
    const { id } = useParams();
    const user = useStore((state) => state.user);
    const [job, setJob] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [resume, setResume] = useState(null);
    const [skills, setSkills] = useState('');
    const [experience, setExperience] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {
        fetch(`http://localhost:5008/api/jobs/${id}`)
            .then((res) => res.json())
            .then((data) => setJob(data))
            .catch((err) => console.error('Error fetching job:', err));
    }, [id]);

    const handleApply = () => {
        if (!user?.id) {
            alert('Please log in to apply.');
            return;
        }
        setShowForm(true);
    };

    const handleSubmitApplication = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('job_id', job.id);
        formData.append('resume', resume);
        formData.append('skills', skills);
        formData.append('experience', experience);

        try {
            await axios.post(
                'http://localhost:5008/api/applied-jobs',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setSuccessMsg('Your application has been submitted successfully!');
            setTimeout(() => {
                setSuccessMsg('');
                setShowForm(false);
                setResume(null);
                setSkills('');
                setExperience('');
            }, 2000);
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
        <div className="min-h-screen bg-[#04091A] text-white px-6 py-20 pt-48">
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
                        {successMsg && (
                            <p className="text-green-400 text-sm mt-4">
                                {successMsg}
                            </p>
                        )}
                    </div>

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
                    <div>
                        {/* Back to Dashboard Link */}
                        <Link
                            to="/job-seeker-dashboard"
                            className="block text-center mt-4 text-purple-400 hover:underline"
                        >
                            ← Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
                    <div className="bg-[#1F2937] p-6 rounded-lg w-full max-w-lg relative">
                        <h3 className="text-xl font-semibold mb-4 text-white">
                            Submit Application
                        </h3>
                        <form
                            onSubmit={handleSubmitApplication}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Upload Resume
                                </label>
                                <input
                                    type="file"
                                    onChange={(e) =>
                                        setResume(e.target.files[0])
                                    }
                                    required
                                    className="w-full text-sm p-2 rounded bg-gray-700 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-300 mb-1">
                                    Skills
                                </label>
                                <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    placeholder="e.g., JavaScript, React"
                                    className="w-full text-sm p-2 rounded bg-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-left text-sm text-white font-medium mb-1">
                                    Experience (in years)
                                </label>

                                <input
                                    type="number"
                                    value={experience}
                                    onChange={(e) =>
                                        setExperience(e.target.value)
                                    }
                                    placeholder="e.g., 3"
                                    className="w-full text-sm p-2 rounded bg-gray-700 text-white"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-600"
                                >
                                    Submit Application
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewJobDetails;

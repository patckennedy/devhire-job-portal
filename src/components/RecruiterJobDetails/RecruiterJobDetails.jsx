import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecruiterJobDetails = () => {
    const [job, setJob] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:5008/api/jobs/${id}`)
            .then((res) => {
                setJob(res.data);
                setEditData(res.data);
            })
            .catch((err) => console.error('Failed to load job details:', err));
    }, [id]);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        axios
            .put(`http://localhost:5008/api/jobs/${id}`, editData)
            .then((res) => {
                setJob(res.data);
                setIsEditing(false);
                alert('Job updated successfully!');
            })
            .catch((err) => {
                console.error('Error updating job:', err);
                alert('Failed to update job.');
            });
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditData({ ...job });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this job?')) {
            axios
                .delete(`http://localhost:5008/api/jobs/${id}`)
                .then(() => {
                    alert('Job deleted.');
                    navigate('/recruiter-dashboard');
                })
                .catch((err) => {
                    console.error('Error deleting job:', err);
                    alert('Failed to delete job.');
                });
        }
    };

    if (!job) {
        return (
            <p className="text-white text-center pt-40">
                Loading job details...
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6 pt-32">
            <div className="max-w-4xl mx-auto bg-[#12172A] border border-[#2f2f3a] p-8 rounded-2xl shadow-xl space-y-6">
                <h1 className="text-4xl font-bold">{job.title}</h1>

                <div className="flex items-center gap-4">
                    {job.company_logo ? (
                        <img
                            src={job.company_logo}
                            alt="Company Logo"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold">
                                {job.company_name
                                    ? job.company_name.charAt(0)
                                    : 'C'}
                            </span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-semibold">
                            {job.company_name}
                        </h2>
                        <p className="text-gray-400">{job.location}</p>
                    </div>
                </div>

                <div className="border-t border-b border-gray-700 py-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Job Description
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">
                        {job.description}
                    </p>
                </div>

                <div className="border-b border-gray-700 pb-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Job Requirements
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">
                        {job.requirements}
                    </p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={handleEditClick}
                        className="bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                    >
                        Edit Job
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition"
                    >
                        Delete Job
                    </button>
                </div>

                <Link
                    to="/recruiter-dashboard"
                    className="text-[#A259FF] hover:underline mb-4 inline-block"
                >
                    ← Back to Dashboard
                </Link>

                {isEditing && (
                    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                        <h2 className="text-2xl font-bold mb-4">Edit Job</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-1">
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={editData.title}
                                    onChange={handleInputChange}
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">
                                    Job Description
                                </label>
                                <textarea
                                    name="description"
                                    value={editData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-gray-300 mb-1">
                                    Job Requirements
                                </label>
                                <textarea
                                    name="requirements"
                                    value={editData.requirements}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                                ></textarea>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-4">
                            <button
                                onClick={handleSave}
                                className="bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecruiterJobDetails;

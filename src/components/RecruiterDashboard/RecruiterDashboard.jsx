import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RecruiterJobDetails = () => {
    // Dummy job data for visual design (no backend calls)
    const [job, setJob] = useState({
        id: 1,
        title: 'Senior Backend Engineer',
        company: 'DevHire Inc.',
        companyLogo: '',
        location: 'Remote',
        description:
            'This is a sample job description tailored for a Recruiter context. It outlines the main responsibilities and tasks for the role, along with key objectives and goals.',
        requirements:
            '• 5+ years of experience in Node.js\n• Proficiency with Express\n• Excellent communication skills\n• Ability to mentor junior developers',
    });

    // State to toggle the edit drawer
    const [isEditing, setIsEditing] = useState(false);
    // State to hold editable form data, initialized with job details
    const [editData, setEditData] = useState({ ...job });

    // Toggle edit drawer visibility
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Update editData state when form fields change
    const handleInputChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Simulate saving the changes by updating the job state
    const handleSave = () => {
        setJob(editData);
        setIsEditing(false);
        alert('Job updated successfully! (For design only)');
    };

    // Cancel editing and close the drawer without saving changes
    const handleCancel = () => {
        setIsEditing(false);
        setEditData({ ...job });
    };

    // For design purposes, the delete operation simply alerts the user.
    const handleDelete = () => {
        alert('Delete Job clicked! (For design only)');
    };

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6">
            <div className="max-w-4xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
                {/* Job Header Section */}
                <h1 className="text-4xl font-bold mb-4">{job.title}</h1>

                {/* Company Info Section */}
                <div className="flex items-center gap-4 mb-6">
                    {job.companyLogo ? (
                        <img
                            src={job.companyLogo}
                            alt="Company Logo"
                            className="w-16 h-16 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold">
                                {job.company ? job.company.charAt(0) : 'C'}
                            </span>
                        </div>
                    )}
                    <div>
                        <h2 className="text-2xl font-semibold">
                            {job.company}
                        </h2>
                        <p className="text-gray-400">{job.location}</p>
                    </div>
                </div>

                {/* Job Description Section */}
                <div className="mb-6 border-b border-gray-700 pb-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Job Description
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">
                        {job.description}
                    </p>
                </div>

                {/* Job Requirements Section */}
                <div className="mb-6 border-b border-gray-700 pb-4">
                    <h3 className="text-xl font-semibold mb-2">
                        Job Requirements
                    </h3>
                    <p className="text-gray-300 whitespace-pre-line">
                        {job.requirements}
                    </p>
                </div>

                {/* Action Buttons for Recruiter Management */}
                <div className="flex gap-4 mb-6">
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

                {/* Back to Dashboard Link */}
                <Link
                    to="/recruiter-dashboard"
                    className="text-[#A259FF] hover:underline mb-6 inline-block"
                >
                    Back to Dashboard
                </Link>

                {/* Edit Drawer */}
                {isEditing && (
                    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
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
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

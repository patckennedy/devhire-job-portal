import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import useStore from '../../zustand/store';

const PostJobs = () => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        jobType: '',
        salary: '',
        description: '',
        requirements: '',
        applyLink: '',
        logo: null,
        jobStatus: '',
    });

    const [states, setStates] = useState([]);
    const [message, setMessage] = useState('');

    const user = useStore((state) => state.user);

    // Fetch states from API (fixed + log)
    useEffect(() => {
        axios
            .get('http://localhost:5008/api/states')
            .then((response) => {
                console.log('States fetched from backend:', response.data);
                setStates(response.data);
            })
            .catch((error) => console.error('Error fetching states:', error));
    }, []);

    // check to confirm state...
    console.log('States in component:', states);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, logo: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage('');

        const jobData = {
            title: formData.title,
            description: formData.description,
            requirements: formData.requirements,
            location: formData.location,
            job_type: formData.jobType,
            company_name: formData.company,
            salary: formData.salary || '',
            job_status: formData.jobStatus,
            application_link: formData.applyLink || '',
            company_logo: formData.logo?.name || '',
            recruiter_id: user?.id,
        };

        axios
            .post('http://localhost:5008/api/jobs', jobData)
            .then((response) => {
                console.log('Job Posted:', response.data);
                setMessage('Job posted successfully!');
                resetForm();
            })
            .catch((error) => {
                console.error('Error posting job:', error);
                setMessage('Failed to post job. Try again.');
            });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            company: '',
            location: '',
            jobType: '',
            salary: '',
            description: '',
            requirements: '',
            applyLink: '',
            logo: null,
            jobStatus: '',
        });
        document.getElementById('logoUpload').value = null;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { when: 'beforeChildren', staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
    };
    /////////////////////////////////////////////demo only-delete after presentatin
    const handleDemoFill = () => {
        setFormData({
            title: 'Junior Frontend Developer',
            company: 'TechNova Inc.',
            location: 'California',
            jobType: 'Full-time',
            salary: '70000',
            description:
                'We’re looking for a junior frontend developer to help build amazing user experiences using React.',
            requirements:
                '1+ years of experience with HTML, CSS, JavaScript. Familiarity with React is a plus.',
            applyLink: 'https://technova.com/apply',
            logo: null,
            jobStatus: 'Open',
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#04091A] to-black text-white overflow-hidden">
            <div className="max-w-9xl mx-auto pt-36 px-4 sm:px-6 lg:px-8">
                <div className="text-right mb-4 max-w-7xl mx-auto">
                    <a
                        href="/recruiter-dashboard"
                        className="text-purple-400 hover:underline text-sm font-medium"
                    >
                        ← Back to Dashboard
                    </a>
                </div>

                <h2 className="text-center text-3xl sm:text-4xl font-bold mb-10">
                    Post a Job
                </h2>
            </div>

            <div className="mt-[-12px]">
                <motion.div
                    className="border border-gray-700 w-full max-w-7xl bg-gray-900 rounded-lg shadow-lg p-6 mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {message && (
                        <motion.div
                            className="mb-4 text-center text-sm text-white bg-purple-600 p-2 rounded"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {message}
                        </motion.div>
                    )}
                    {/* delete after presentation */}
                    <div className="flex justify-end mb-4">
                        <button
                            type="button"
                            onClick={handleDemoFill}
                            className="px-2 py- text-sm  bg-gray-800 hover:bg-gray-700 text-white rounded"
                        >
                            Demo Fill
                        </button>
                    </div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                        {/* Left Column */}
                        <motion.div
                            className="space-y-6"
                            variants={itemVariants}
                        >
                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Title
                                </span>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    placeholder="e.g., Software Engineer"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Company
                                </span>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    placeholder="e.g., DevHire Inc."
                                    required
                                />
                            </label>

                            {/* Location Drop Down */}
                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Location
                                </span>
                                <select
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    required
                                >
                                    <option value="">Select Location</option>
                                    {states.map((state) => (
                                        <option
                                            key={state.id}
                                            value={state.name}
                                        >
                                            {state.name}
                                        </option>
                                    ))}
                                </select>
                                {/* If dropdown is empty, show warning */}
                                {states.length === 0 && (
                                    <p className="text-red-400 text-sm mt-1">
                                        States not loaded. Please check API.
                                    </p>
                                )}
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Job Type
                                </span>
                                <select
                                    name="jobType"
                                    value={formData.jobType}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    required
                                >
                                    <option value="">Select Job Type</option>
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                </select>
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Salary (Optional)
                                </span>
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="e.g., 60000"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    min="0"
                                    step="1000"
                                />
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Job Status
                                </span>
                                <select
                                    name="jobStatus"
                                    value={formData.jobStatus}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    required
                                >
                                    <option value="">Select Job Status</option>
                                    <option value="Open">Open</option>
                                    <option value="Interviewing">
                                        Interviewing
                                    </option>
                                    <option value="Closed">Closed</option>
                                </select>
                            </label>
                        </motion.div>

                        {/* Right Column */}
                        <motion.div
                            className="space-y-6"
                            variants={itemVariants}
                        >
                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Job Description
                                </span>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    rows="4"
                                    placeholder="Brief overview of the role..."
                                    required
                                ></textarea>
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Job Requirements
                                </span>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                    rows="4"
                                    placeholder="Required skills, experience, etc."
                                    required
                                ></textarea>
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Application Link (Optional)
                                </span>
                                <input
                                    type="text"
                                    name="applyLink"
                                    placeholder="e.g., https://company.com/apply"
                                    value={formData.applyLink}
                                    onChange={handleChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white placeholder:text-sm placeholder:italic focus:outline-none focus:ring-1 focus:ring-purple-600 border-none"
                                />
                            </label>

                            <label className="block">
                                <span className="flex items-center text-gray-200 font-medium mb-2">
                                    Company Logo (Optional)
                                </span>
                                <input
                                    id="logoUpload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 border-none file:bg-gray-700 file:text-white file:px-4 file:py-2 file:rounded file:mr-4"
                                />
                            </label>
                        </motion.div>

                        <motion.div
                            className="lg:col-span-2"
                            variants={itemVariants}
                        >
                            <button
                                type="submit"
                                className="w-full py-3 mt-2 rounded text-white font-semibold bg-gradient-to-r from-[#A259FF] to-[#6C00FF] hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
                            >
                                Post Job
                            </button>
                        </motion.div>
                    </motion.form>
                </motion.div>
            </div>
        </div>
    );
};

export default PostJobs;

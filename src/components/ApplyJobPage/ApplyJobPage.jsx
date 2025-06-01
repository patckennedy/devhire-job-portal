import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../../zustand/store';

const ApplyJobPage = ({ job }) => {
    const user = useStore((state) => state.user);

    // State for form fields
    const [yearsOfExperience, setYearsOfExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [resumeFile, setResumeFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', user.id); // User's ID from the global store
        formData.append('job_id', job.id); // Job ID passed as a prop to the page
        formData.append('years_of_experience', yearsOfExperience);
        formData.append('skills', skills);
        if (resumeFile) {
            formData.append('resume', resumeFile); // Add resume file if chosen
        }

        try {
            const response = await axios.post(
                'http://localhost:5001/api/apply',
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            console.log('Application submitted successfully:', response.data);
            // You can add a success message or redirect here
        } catch (err) {
            console.error('Error submitting application:', err);
        }
    };

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6 pt-28">
            <h1 className="text-3xl font-bold mb-4">Apply for {job.title}</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label
                        htmlFor="yearsOfExperience"
                        className="block text-lg mb-2"
                    >
                        Years of Experience
                    </label>
                    <input
                        type="number"
                        id="yearsOfExperience"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(e.target.value)}
                        className="p-2 w-full bg-gray-800 text-white rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="skills" className="block text-lg mb-2">
                        Skills (Comma Separated)
                    </label>
                    <input
                        type="text"
                        id="skills"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="p-2 w-full bg-gray-800 text-white rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="resume" className="block text-lg mb-2">
                        Upload Resume
                    </label>
                    <input
                        type="file"
                        id="resume"
                        onChange={(e) => setResumeFile(e.target.files[0])}
                        className="p-2 w-full bg-gray-800 text-white rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white py-3 rounded-lg font-medium"
                >
                    Apply
                </button>
            </form>
        </div>
    );
};

export default ApplyJobPage;

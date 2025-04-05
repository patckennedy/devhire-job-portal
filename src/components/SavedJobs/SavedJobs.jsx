import React, { useState, useEffect } from 'react';
import JobCard from '../JobListing/JobCard';

const SavedJobs = () => {
    // State to store saved jobs; later, this will be updated based on the user profile data
    const [savedJobs, setSavedJobs] = useState([]);

    // For now, simulate fetching saved jobs with dummy data
    useEffect(() => {
        // Dummy data simulating saved jobs. Replace this with an API call as needed.
        const dummySavedJobs = [
            {
                id: 1,
                title: 'Software Engineer',
                company: 'DevHire Inc.',
                companyLogo: '',
                location: 'San Francisco, CA',
            },
            {
                id: 2,
                title: 'Frontend Developer',
                company: 'DevHire Inc.',
                companyLogo: '',
                location: 'New York, NY',
            },
            {
                id: 3,
                title: 'Backend Developer',
                company: 'DevHire Inc.',
                companyLogo: '',
                location: 'Austin, TX',
            },
        ];
        setSavedJobs(dummySavedJobs);
    }, []);

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6">
            {/* Page Title */}
            <h1 className="text-4xl font-bold text-center mb-6">Saved Jobs</h1>

            {/* Saved Jobs Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs.length > 0 ? (
                    savedJobs.map((job) => <JobCard key={job.id} job={job} />)
                ) : (
                    <p className="text-center text-gray-400">
                        No saved jobs yet.
                    </p>
                )}
            </div>
        </div>
    );
};

export default SavedJobs;

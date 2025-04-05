import React from 'react';

const ViewJobDetails = () => {
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

export default ViewJobDetails;

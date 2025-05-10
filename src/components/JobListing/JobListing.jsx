import React, { useState, useEffect } from 'react';
import ModernJobCard from '../ModernJobCard/ModernJobCard';

const JobListing = () => {
    const [jobs, setJobs] = useState([]);
    const [states, setStates] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');

    useEffect(() => {
        fetch('http://localhost:5008/api/jobs')
            .then((res) => {
                console.log('Raw response:', res);
                return res.json();
            })
            .then((data) => {
                console.log('Parsed JSON:', data);
                setJobs(data);
            })
            .catch((err) => console.error('Error fetching jobs:', err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5008/api/states')
            .then((res) => {
                console.log('Raw response for states:', res);
                return res.json();
            })
            .then((data) => {
                console.log('Parsed states:', data);
                setStates(data);
            })
            .catch((err) => console.error('Error fetching states:', err));
    }, []);

    // Filtered jobs
    const filteredJobs = jobs.filter(
        (job) =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (location === '' || job.location === location) &&
            (company === '' || job.company_name === company)
    );

    return (
        <div className="min-h-screen bg-[#04091A] text-white p-6 mt-32">
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">
                Browse Jobs
            </h1>
            <p className="text-center text-gray-400 mb-6">
                {filteredJobs.length} job{filteredJobs.length !== 1 && 's'}{' '}
                found
            </p>

            {/* Filters */}
            <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <input
                    type="text"
                    placeholder="Search jobs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-3 rounded-md text-black w-full sm:w-1/3 bg-gray-200"
                />
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="p-3 rounded-md text-black w-full sm:w-1/4 bg-gray-200"
                >
                    <option value="">All Locations</option>
                    {states.map((state) => (
                        <option key={state.id} value={state.name}>
                            {state.name}
                        </option>
                    ))}
                </select>
                <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="p-3 rounded-md text-black w-full sm:w-1/4 bg-gray-200"
                >
                    <option value="">All Companies</option>
                    {[...new Set(jobs.map((job) => job.company_name))].map(
                        (companyName, idx) => (
                            <option key={idx} value={companyName}>
                                {companyName}
                            </option>
                        )
                    )}
                </select>
                <button
                    onClick={() => {
                        setSearchQuery('');
                        setLocation('');
                        setCompany('');
                    }}
                    className="p-3 bg-gradient-to-r from-[#A259FF] to-[#6C00FF] text-white rounded-md"
                >
                    Clear
                </button>
            </div>

            {/* Job Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <ModernJobCard key={job.id} job={job} />
                    ))
                ) : (
                    <p className="text-center text-gray-400 col-span-full">
                        No jobs found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default JobListing;

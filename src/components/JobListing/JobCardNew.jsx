import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Building, ArrowRight } from 'lucide-react';

const JobCard = ({ job }) => {
    const [saved, setSaved] = useState(false);

    // Toggle save job state and prevent card navigation when clicking save
    const handleSaveJob = (e) => {
        e.stopPropagation();
        setSaved(!saved);
    };

    return (
        <div className="bg-gray-900 text-white rounded-xl shadow-md p-6 flex flex-col gap-4 transition-all hover:shadow-xl">
            {/* Header Section: Company Logo, Job Title & Company */}
            <div className="flex items-center gap-4 border-b border-gray-700 pb-4">
                {job.companyLogo ? (
                    <img
                        src={job.companyLogo}
                        alt="Company Logo"
                        className="w-16 h-16 rounded-full object-cover"
                    />
                ) : (
                    <Building size={48} className="text-gray-500" />
                )}
                <div>
                    <h2 className="text-2xl font-bold">{job.title}</h2>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                </div>
            </div>

            {/* Details Section: Location, Employment Type, Salary */}
            <div className="flex flex-col gap-2 border-b border-gray-700 pb-4">
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                    <MapPin size={18} />
                    <span>{job.location}</span>
                </div>
                {job.employment_type && (
                    <p className="text-gray-400 text-sm">
                        <span className="font-medium">Type:</span>{' '}
                        {job.employment_type}
                    </p>
                )}
                {job.salary && (
                    <p className="text-gray-400 text-sm">
                        <span className="font-medium">Salary:</span> $
                        {job.salary}
                    </p>
                )}
            </div>

            {/* Description Section */}
            <div>
                <p className="text-gray-200 text-sm">
                    {job.description.length > 100
                        ? job.description.substring(0, 100) + '...'
                        : job.description}
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center">
                {/* Save Job Button */}
                <button
                    onClick={handleSaveJob}
                    className={`p-2 rounded-full transition ${
                        saved ? 'text-red-500' : 'text-gray-400'
                    }`}
                    aria-label="Save Job"
                >
                    <Heart size={20} fill={saved ? 'red' : 'none'} />
                </button>

                {/* Icon-Only "View Details" Button with Tooltip */}
                <Link
                    to={`/job/${job.id}`}
                    title="View Details"
                    className="p-2 rounded-full bg-gradient-to-r from-[#A259FF] to-[#6C00FF] hover:opacity-90 transition"
                >
                    <ArrowRight size={20} className="text-white" />
                </Link>
            </div>
        </div>
    );
};

export default JobCard;

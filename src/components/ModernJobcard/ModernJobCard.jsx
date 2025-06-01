import React, { useState, useEffect } from 'react';
import { MapPin, Building2, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../zustand/store';

const ModernJobCard = ({ job, savedJobs = [], updateSavedJobs }) => {
    const user = useStore((state) => state.user);
    const [isSaved, setIsSaved] = useState(false);

    // Check if this job is already saved
    useEffect(() => {
        const saved = savedJobs.some((saved) => saved.id === job.id);
        setIsSaved(saved);
    }, [savedJobs, job.id]);

    const handleToggleSaveJob = async () => {
        if (!user?.id) {
            alert('Please log in to save jobs.');
            return;
        }

        try {
            if (isSaved) {
                // Unsave job
                await axios.delete(
                    `http://localhost:5001/api/saved-jobs/${user.id}/${job.id}`
                );
                setIsSaved(false);
                // Remove from parent savedJobs....
                if (updateSavedJobs) {
                    updateSavedJobs((prev) =>
                        prev.filter((savedJob) => savedJob.id !== job.id)
                    );
                }
            } else {
                // Save job
                await axios.post('http://localhost:5001/api/saved-jobs', {
                    user_id: user.id,
                    job_id: job.id,
                });
                setIsSaved(true);

                // Add to parent saveJobs...
                if (updateSavedJobs) {
                    updateSavedJobs((prev) => [...prev, job]);
                }
            }
        } catch (err) {
            console.error('Error saving/removing job:', err);
        }
    };

    return (
        <div className="bg-[#12172A] text-white rounded-2xl p-6 shadow-lg border border-gray-800 hover:border-teal-400 transition hover:shadow-xl">
            <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#1C2035] p-3 rounded-xl">
                    <Building2 className="text-purple-500 w-8 h-8" />
                </div>
                <div>
                    <p className="text-lg text-gray-400 font-bold uppercase">
                        {job.company_name || 'COMPANY'}
                    </p>
                    <h2 className="text-xl font-semibold">
                        {job.title || 'Job Title'}
                    </h2>
                </div>
            </div>

            <p className="text-gray-300 text-sm mb-4">
                {job.description && job.description.length > 100
                    ? `${job.description.slice(0, 100)}...`
                    : job.description ||
                      'Short job description preview here...'}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center gap-1 bg-[#1C2035] text-sm px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" /> {job.location || 'Location'}
                </span>
            </div>

            <div className="flex justify-between items-center mt-4 text-sm">
                <div className="text-purple-400 font-semibold">
                    {job.job_status && `Status: ${job.job_status}`}
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        to={`/job/${job.id}`}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300"
                    >
                        View Details <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                        onClick={handleToggleSaveJob}
                        className="hover:scale-110 transition"
                    >
                        <Heart
                            className={`w-5 h-5 ${
                                isSaved
                                    ? 'text-pink-500 fill-pink-500'
                                    : 'text-gray-400'
                            }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModernJobCard;

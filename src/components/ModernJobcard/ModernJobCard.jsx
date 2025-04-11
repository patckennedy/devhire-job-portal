import React from 'react';
import { MapPin, Briefcase, Building2, ArrowRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import useStore from '../../zustand/store';

const ModernJobCard = ({ job }) => {
    const user = useStore((state) => state.user);

    const handleSaveJob = async () => {
        if (!user?.id) {
            alert('Please log in to save jobs.');
            return;
        }

        try {
            await axios.post('http://localhost:5008/api/saved-jobs', {
                user_id: user.id,
                job_id: job.id,
            });
            console.log('Job saved successfully');
        } catch (err) {
            console.error('Error saving job:', err);
        }
    };

    return (
        <div className="bg-[#12172A] text-white rounded-2xl p-6 shadow-lg transition hover:shadow-xl">
            {/* Top Row: Logo & Title */}
            <div className="flex items-start gap-4 mb-4">
                <div className="bg-[#1C2035] p-3 rounded-xl">
                    <Building2 className="text-purple-500 w-8 h-8" />
                </div>
                <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">
                        {job.company_name || 'COMPANY'}
                    </p>
                    <h2 className="text-xl font-semibold">
                        {job.title || 'Job Title'}
                    </h2>
                </div>
            </div>

            {/* Job Description */}
            <p className="text-gray-300 text-sm mb-4">
                {job.description && job.description.length > 100
                    ? `${job.description.slice(0, 100)}...`
                    : job.description ||
                      'Short job description preview here...'}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className="flex items-center gap-1 bg-[#1C2035] text-sm px-3 py-1 rounded-full">
                    <MapPin className="w-4 h-4" /> {job.location || 'Location'}
                </span>
                {job.level && (
                    <span className="bg-[#1C2035] text-sm px-3 py-1 rounded-full">
                        {job.level}
                    </span>
                )}
                {job.category && (
                    <span className="bg-[#1C2035] text-sm px-3 py-1 rounded-full">
                        {job.category}
                    </span>
                )}
            </div>

            {/* View + Save */}
            <div className="flex justify-between items-center mt-4">
                <Link
                    to={`/job/${job.id}`}
                    className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
                >
                    View Details <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                    onClick={handleSaveJob}
                    className="hover:scale-110 transition"
                >
                    <Heart className="text-gray-400 hover:text-pink-500 w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default ModernJobCard;

import { MapPin, Briefcase, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
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

            {/* Job Description (Short Preview) */}
            <p className="text-gray-300 text-sm mb-4">
                {job.description && job.description.length > 100
                    ? `${job.description.slice(0, 100)}...`
                    : job.description ||
                      'Short job description preview here...'}
            </p>

            {/* Tags: Location, Level, Category */}
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

            {/* Bottom Right Arrow */}
            <div className="flex justify-end">
                <Link
                    to={`/job/${job.id}`}
                    className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
                >
                    View Details <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
};

export default JobCard;

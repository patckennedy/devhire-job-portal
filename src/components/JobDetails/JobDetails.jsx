import { useParams } from 'react-router-dom';

const JobDetails = () => {
    const { id } = useParams();

    // TEMP: Dummy job data (will be replaced by real API call later)
    const job = {
        id,
        title: 'AI Developer',
        company: 'Facebook',
        location: 'Berlin, DE',
        level: 'Senior',
        type: 'Part time',
        department: 'Development',
        description: `Join the XYZ Tech Wizards, a cutting-edge tech company conjuring the future of Web3, blockchain, AI, and crypto. We're on a mission to decode the digital enigmas and unlock the full potential of these technologies.`,
        aboutCompany: `Mauris sollicitudin fermentum libero. Vivamus aliquet elit ac nisl. In hac habitasse platea dictumst.`,
    };

    return (
        <div className="min-h-screen bg-[#0f0f1c] text-white p-8 grid md:grid-cols-3 gap-6 mt-24">
            {/* Left Column: Job Content */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-[#1a1a2e] p-6 rounded-xl shadow">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-blue-600 p-4 rounded-lg">
                            <span className="text-3xl font-bold">F</span>
                        </div>
                        <div>
                            <p className="text-sm uppercase text-gray-400">
                                {job.company}
                            </p>
                            <h1 className="text-2xl font-bold">{job.title}</h1>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 text-sm text-white">
                        <span className="bg-gray-800 px-3 py-1 rounded">
                            {job.location}
                        </span>
                        <span className="bg-gray-800 px-3 py-1 rounded">
                            {job.level}
                        </span>
                        <span className="bg-gray-800 px-3 py-1 rounded">
                            {job.department}
                        </span>
                        <span className="bg-gray-800 px-3 py-1 rounded">
                            {job.type}
                        </span>
                    </div>

                    <hr className="my-6 border-gray-700" />

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">
                            Position Overview
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                            {job.description}
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Column: Sticky Sidebar */}
            <div className="space-y-6 sticky top-6 self-start">
                <div className="bg-[#1a1a2e] p-6 rounded-xl shadow space-y-4">
                    <h3 className="text-lg font-bold">Apply now</h3>
                    <p className="text-gray-400 text-sm">
                        Get your Web3 career to the next level today and change
                        the future.
                    </p>
                    <button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 py-2 rounded font-semibold text-white">
                        Apply
                    </button>
                </div>

                <div className="bg-[#1a1a2e] p-6 rounded-xl shadow space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-2 rounded">
                            <span className="text-xl font-bold">F</span>
                        </div>
                        <h4 className="font-bold">About {job.company}</h4>
                    </div>
                    <p className="text-sm text-gray-400">{job.aboutCompany}</p>
                    <button className="w-full border border-blue-400 text-blue-400 py-2 rounded hover:bg-blue-600 hover:text-white transition">
                        See website
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;

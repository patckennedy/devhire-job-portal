import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../../zustand/store';
import ModernJobCard from '../ModernJobCard/ModernJobCard';

const SaveJobs = () => {
    const user = useStore((state) => state.user);
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        axios
            .get(`http://localhost:5008/api/saved-jobs/${user.id}`)
            .then((res) => {
                setSavedJobs(res.data);
            })
            .catch((err) => {
                console.error('Error fetching saved jobs:', err);
            });
    }, [user?.id]);

    return (
        <div className="min-h-screen bg-[#04091A] text-white px-6 pt-36 pb-20">
            <h1 className="text-3xl font-bold mb-4">Saved Jobs</h1>

            {savedJobs.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((job) => (
                        <ModernJobCard key={job.id} job={job} />
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">No saved jobs yet.</p>
            )}
        </div>
    );
};

export default SaveJobs;

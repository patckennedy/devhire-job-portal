import React from 'react';

const Resources = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Resources</h1>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>
                    <a
                        href="https://www.linkedin.com/learning"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        LinkedIn Learning – Tech Courses
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.interviewcake.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Interview Cake – Coding Interview Prep
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.resumegenius.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 hover:underline"
                    >
                        Resume Genius – Build Your Resume
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Resources;

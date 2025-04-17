import React from 'react';

const About = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-bold mb-4 text-center">About Us</h1>
            <p className="text-gray-700 mb-4">
                Welcome to DevHire – a platform built to connect talented
                software engineers with forward-thinking tech companies. Whether
                you're a job seeker looking for your next opportunity or a
                recruiter looking to hire top talent, DevHire streamlines the
                process for both sides.
            </p>
            <p className="text-gray-700 mb-4">
                Our mission is to make job searching and hiring simple,
                transparent, and efficient. Built with modern web technologies
                and a user-focused design, DevHire empowers users with real-time
                features, personalized dashboards, and job tracking tools.
            </p>
            <p className="text-gray-700">
                This project was created as a full-stack coding bootcamp
                capstone to showcase practical skills in React, Express,
                PostgreSQL, and more. We're proud of what we've built and
                excited for what's next!
            </p>
        </div>
    );
};

export default About;

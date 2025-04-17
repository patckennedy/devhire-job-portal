import React from 'react';

const Contact = () => {
    return (
        <div className="max-w-xl mx-auto p-6 mt-10 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">
                Contact Us
            </h2>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Name
                    </label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Your name"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        type="email"
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="you@example.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Message
                    </label>
                    <textarea
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        rows="4"
                        placeholder="Type your message..."
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;

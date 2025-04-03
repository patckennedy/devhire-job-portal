import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-8">
            {/* Horizontal line to separate footer */}
            <hr className="border-gray-700 mb-6" />
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} DevHire. All rights
                    reserved.
                </p>
                <div className="mt-4 flex justify-center space-x-4">
                    <a
                        href="/privacy"
                        className="text-sm hover:text-purple-400 transition"
                    >
                        About
                    </a>
                    <a
                        href="/terms"
                        className="text-sm hover:text-purple-400 transition"
                    >
                        Resources
                    </a>
                    <a
                        href="/contact"
                        className="text-sm hover:text-purple-400 transition"
                    >
                        Contact
                    </a>
                </div>
                <p className="text-center text-sm text-gray-600">
                    Made with <FaHeart className="inline text-red-500 mx-1" />{' '}
                    by candy
                </p>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { FaHeart } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-[#010101] to-black text-white">
            {' '}
            {/* Horizontal line to separate footer */}
            <hr className="border-gray-700 mb-6" />
            <div className="container mx-auto px-4 text-center">
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
                <p className="text-sm pt-4">
                    &copy; {new Date().getFullYear()} DevHire. All rights
                    reserved.
                </p>
                <p className="text-center text-sm text-gray-600 pt-4">
                    Made with <FaHeart className="inline text-red-500 mx-1" />{' '}
                    by Patricia Kennedy
                </p>
            </div>
        </footer>
    );
};

export default Footer;

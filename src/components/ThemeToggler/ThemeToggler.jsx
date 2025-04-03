import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggler = () => {
    // Initialize theme from localStorage or system preference
    const [darkMode, setDarkMode] = useState(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            return storedTheme === 'dark';
        }
        // If no saved theme, check system preference
        return (
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        );
    });

    // Update <html> class and localStorage when darkMode changes
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    // Toggle the theme
    const toggleTheme = () => {
        setDarkMode((prevMode) => !prevMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full focus:outline-none hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Toggle Dark Mode"
        >
            {darkMode ? (
                <FaSun className="text-yellow-500 w-6 h-6" />
            ) : (
                <FaMoon className="text-gray-600 w-6 h-6" />
            )}
        </button>
    );
};

export default ThemeToggler;

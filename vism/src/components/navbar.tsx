import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="flex flex-row items-center justify-center px-4 py-3 dark:bg-gray-600">
            <div className="">
                <Link className="px-4 py-2 mx-2 dark:border dark:border-white dark:bg-gray-500 dark:hover:bg-gray-700 text-white font-bold rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    href="/">
                    Home
                </Link>

                <Link className="px-4 py-2 mx-2 dark:border dark:border-white dark:bg-gray-500 dark:hover:bg-gray-700 dark:text-white font-bold rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    href="/mscz_braille">
                    MuseScore to Braille
                </Link>
                
                <Link className="px-4 py-2 mx-2 dark:border dark:border-white dark:bg-gray-500 dark:hover:bg-gray-700 dark:text-white font-bold rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    href="/interactive_braille">
                    Interactive Braille creator (WIP)
                </Link>
                
                <Link className="px-4 py-2 mx-2 dark:border dark:border-white dark:bg-gray-500 dark:hover:bg-gray-700 dark:text-white font-bold rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    href="/pdf_braille">
                    PDF to Braille (WIP)
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

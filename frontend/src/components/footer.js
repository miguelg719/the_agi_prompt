import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
    <div>
        <footer className="bg-gray-950 py-12 px-4">
            <div className="flex flex-wrap">
                <div className="w-full">
                    <h4 className="text-xl text-white font-semibold mb-6">Social</h4>
                    <div className="flex space-x-7 justify-center">
                        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300"><FontAwesomeIcon icon={faDiscord} size="lg" /></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300"><FontAwesomeIcon icon={faGithub} size="lg" /></a>
                    </div>
                </div>
            </div>
        </footer>
        <text className="flex text-xs bg-gray-950 justify-center text-center text-gray-500 pb-10">© 2024 All rights reserved.</text>
    </div>
);

export default Footer;
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Intro = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(`process.env.PUBLIC_URL: ${process.env.PUBLIC_URL}`);
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[92vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/images/image.png)`,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            transform: `translateY(${scrollPosition * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-10 transition-all duration-300 ease-out transform"
              style={{ transform: `translateY(${-scrollPosition * 0.2}px)` }}>
            Collaborate on the future of AI
          </h1>
          {/* <p className="text-2xl mb-8 transition-all duration-300 ease-out transform"
             style={{ transform: `translateY(${-scrollPosition * 0.1}px)` }}>
            Collaborate on the future of AI
          </p> */}
          <Link to={'/home'}>
            <button className="bg-white text-black py-3 px-8 rounded-full text-lg font-semibold hover:bg-opacity-90 transition duration-300">
              Explore Prompts
            </button>
          </Link>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">Revolutionize AI Development</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              title="Collaborative Prompts"
              description="Work together to create and refine AI prompts"
              icon="👥"
            />
            <FeatureCard 
              title="Advanced Voting"
              description="Community-driven ranking of the most effective prompts"
              icon="🗳️"
            />
            <FeatureCard 
              title="LLM Integration"
              description="Test prompts across multiple language models"
              icon="🧠"
            />
          </div>
        </div>
      </section>

      <section className="flex py-20 px-4 bg-gray-900">
        <div className="flex items-center max-w-4xl mx-auto h-[40vh] ">
            <text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </text>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-700 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Join the community</h2>
          <p className="text-xl mb-8">Be part of shaping the future of AI</p>
          <Link to='/login'>
            <button className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Sign Up Now
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-gray-900 p-6 rounded-lg text-center">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

export default Intro;

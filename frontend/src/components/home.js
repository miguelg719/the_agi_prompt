import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, Tag } from 'lucide-react';
import PromptCard from './prompt-card';
import FeaturedCard from './featured-card';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {

  const { isAuthenticated } = useAuth();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('http://localhost:3000/api/prompts');
      const data = await response.json();
      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  const samplePrompts = [
    {
      id: 1,
      prompt: "GPT-4 ethical decision-making and human value alignment",
      votes: 128,
      comments: 42,
      author: "AIEthicist",
      createdAt: "2024-07-15T10:30:00Z",
      tags: ["Ethics", "Human Values", "Decision Making", "General AI", "GPT-4"]
    },
    {
      id: 2,
      prompt: "Create an AGI with the ability to explain its reasoning process in natural language",
      votes: 95,
      comments: 31,
      author: "ExplainableAI",
      createdAt: "2024-07-14T15:45:00Z",
      tags: ["Explainable AI", "Natural Language", "Reasoning"]
    },
    // ...other prompts
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-7">
      <main className="container mx-auto px-4 sm:px-6 md:px-8 overflow-x-hidden">
        {/* Search Bar */}
        <div className="flex mb-4 sm:mb-6">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        {/* Sort and Filter Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between mb-4 sm:mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex space-x-4">
            <button
              className="flex items-center py-2 px-5 rounded-full transition-colors duration-300 bg-gray-600 text-white hover:bg-blue-500"
            >
              Sort
              <ChevronDown className="ml-2" />
            </button>
            <div className="flex items-center bg-gray-600 text-white border border-gray-700 rounded-full py-2 px-1">
              <Tag size={15} className='mr-2' />
              <input
                type="text"
                placeholder="Filter"
                className="bg-gray-600 text-white border-none focus:outline-none"
              />
            </div>
          </div>
          {isAuthenticated && (
            <Link to={'/prompt'}>
              <button
                className="flex items-center py-2 px-5 rounded-full transition-colors duration-300 bg-blue-600 text-white hover:bg-blue-500"
              >
                New Prompt
                <Plus className="ml-2" />
              </button>
            </Link>
          )}
        </div>

        {/* Main Grid: Prompts and Featured Prompts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Prompts Column */}
          <div className="lg:col-span-2">
            <div className="max-h-screen overflow-y-auto">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} {...prompt} />
              ))}
            </div>
          </div>

          {/* Featured Prompts */}
          <div className="lg:col-span-1 w-full">
            <div className="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4 underline underline-offset-8">Featured Prompts</h2>
              <div className='divide-y divide-gray-600'>
                {samplePrompts.slice(0, 5).map((prompt, index) => (
                  <FeaturedCard
                    key={prompt.id}
                    rank={index + 1}
                    prompt={prompt.prompt}
                    score={prompt.votes}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

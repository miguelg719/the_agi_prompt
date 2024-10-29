import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Plus, Tag} from 'lucide-react';
import PromptCard from './prompt-card';
import FeaturedCard from './featured-card';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';


const Home = () => {

  const { isAuthenticated } = useAuth();

  // Replace useState and useEffect with useQuery
  const { data: prompts = [], isLoading, error } = useQuery({
    queryKey: ['prompts'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/prompts`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Error: {error.message}</p>
      </div>
    );
  }

  // Sample data for demonstration
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
    {
      id: 3,
      prompt: "Design an AGI framework that can seamlessly integrate and utilize multiple specialized AI models",
      votes: 82,
      comments: 27,
      author: "AIArchitect",
      createdAt: "2024-07-13T09:15:00Z",
      tags: ["Framework", "Integration", "Specialized AI"]
    },
    {
        id: 4,
        prompt: "Claude June 2024",
        votes: 52,
        comments: 7,
        author: "Anthropic",
        createdAt: "2024-07-13T09:15:00Z",
        tags: ["LLM", "Integration", "General AI"]
    },
    {
        id: 5,
        prompt: "Gemini Cracked Woke Prompt",
        votes: 21,
        comments: 100,
        author: "LLM Hacks",
        createdAt: "2024-07-13T09:15:00Z",
        tags: ["LLM", "Integration", "General AI"]
    },
    {
      id: 6,
      prompt: "Design an AGI framework that can seamlessly integrate and utilize multiple specialized AI models",
      votes: 82,
      comments: 27,
      author: "AIArchitect",
      createdAt: "2024-07-13T09:15:00Z",
      tags: ["Framework", "Integration", "Specialized AI"]
    },
    {
        id: 7,
        prompt: "Claude June 2024",
        votes: 52,
        comments: 7,
        author: "Anthropic",
        createdAt: "2024-07-13T09:15:00Z",
        tags: ["LLM", "Integration", "General AI"]
    },
    {
        id: 8,
        prompt: "Gemini Cracked Woke Prompt",
        votes: 21,
        comments: 100,
        author: "LLM Hacks",
        createdAt: "2024-07-13T09:15:00Z",
        tags: ["LLM", "Integration", "General AI"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-7">
      <main className="container mx-auto px-4">
        <div className="flex mb-6">
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

        <div className="flex mb-6 space-x-4 justify-between">
          <div className="flex space-x-4">
            <button
              className="flex items-center py-2 px-5 rounded-full transition-colors duration-300 bg-gray-600 text-white hover:bg-blue-500"
            >
              Sort
              <ChevronDown className="ml-2" />
            </button>
            <div className="flex items-center bg-gray-600 text-white border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500">
              <Tag size={15} className='mr-2'></Tag>
              <input
                type="text"
                placeholder="Filter"
                className="bg-gray-600 text-white text-bold border-none focus:outline-none"
              />
            </div>
          </div>
          {isAuthenticated && ( // Conditionally render the New Prompt button
            <Link to={'/prompt'}>
              <button
                className="flex items-center py-2 px-5 rounded-full transition-colors duration-300 bg-blue-600 text-white hover:bg-blue-500 ml-auto"
              >
                New Prompt
                <Plus className="ml-2" />
              </button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
              <div className="max-h-screen overflow-y-auto scrollbar-hidden">
                {prompts.map((prompt) => (
                  <PromptCard key={prompt.id} {...prompt} />
                ))}
              </div>
            </div>
            <div className="mb-7 lg:block hidden">
                <div className="bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-white-500 underline underline-offset-8">Featured Prompts</h2>
                    <div className='divide-y divide-gray-600'>  
                        {samplePrompts.slice(0,5).map((prompt, index) => (
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
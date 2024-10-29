import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Tag } from 'lucide-react';
import LeaderboardCard from './leaderboard-card';
import { Link } from 'react-router-dom';
import { API_URL } from '../api/config';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

const PromptLeaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  // Simulated data - in a real app, you'd fetch this from an API
    // const dummyData = [
    //   {
    //     id: 1,
    //     prompt: "GPT-4 ethical decision-making and human value alignment",
    //     votes: 128,
    //     comments: 42,
    //     author: "AIEthicist",
    //     createdAt: "2024-07-15T10:30:00Z",
    //     tags: ["Ethics", "Human Values", "Decision Making", "General AI", "GPT-4"]
    //   },
    //   {
    //     id: 3,
    //     prompt: "Create an AGI with the ability to explain its reasoning process in natural language",
    //     votes: 95,
    //     comments: 31,
    //     author: "ExplainableAI",
    //     createdAt: "2024-07-14T15:45:00Z",
    //     tags: ["Explainable AI", "Natural Language", "Reasoning"]
    //   },
    //   {
    //     id: 5,
    //     prompt: "Design an AGI framework that can seamlessly integrate and utilize multiple specialized AI models",
    //     votes: 82,
    //     comments: 27,
    //     author: "AIArchitect",
    //     createdAt: "2024-07-13T09:15:00Z",
    //     tags: ["Framework", "Integration", "Specialized AI"]
    //   },
    //   {
    //     id: 9,
    //     prompt: "Claude June 2024",
    //     votes: 52,
    //     comments: 7,
    //     author: "Anthropic",
    //     createdAt: "2024-07-13T09:15:00Z",
    //     tags: ["LLM", "Integration", "General AI"]
    //   },
    //   {
    //     id: 10,
    //     prompt: "Gemini Cracked Woke Prompt",
    //     votes: 21,
    //     comments: 100,
    //     author: "LLM Hacks",
    //     createdAt: "2024-07-13T09:15:00Z",
    //     tags: ["LLM", "Integration", "General AI"]
    //   },
    //   {
    //     id: 8,
    //     prompt: "Optimizing neural networks for faster training times",
    //     votes: 67,
    //     comments: 12,
    //     author: "SpeedyAI",
    //     createdAt: "2024-07-12T08:20:00Z",
    //     tags: ["Neural Networks", "Optimization", "Training"]
    //   },
    //   {
    //     id: 5,
    //     prompt: "Leveraging AI to enhance cybersecurity measures",
    //     votes: 88,
    //     comments: 25,
    //     author: "CyberGuard",
    //     createdAt: "2024-07-11T14:30:00Z",
    //     tags: ["Cybersecurity", "AI", "Protection"]
    //   },
    //   {
    //     id: 2,
    //     prompt: "AI-driven advancements in medical diagnostics",
    //     votes: 104,
    //     comments: 34,
    //     author: "MediTech",
    //     createdAt: "2024-07-10T11:45:00Z",
    //     tags: ["Medical AI", "Diagnostics", "Healthcare"]
    //   },
    //   {
    //     id: 7,
    //     prompt: "The future of AI in autonomous vehicle technology",
    //     votes: 79,
    //     comments: 19,
    //     author: "AutoAI",
    //     createdAt: "2024-07-09T13:55:00Z",
    //     tags: ["Autonomous Vehicles", "AI", "Future Tech"]
    //   },
    //   {
    //     id: 4,
    //     prompt: "AI for predicting and mitigating climate change impacts",
    //     votes: 91,
    //     comments: 28,
    //     author: "ClimateAI",
    //     createdAt: "2024-07-08T17:10:00Z",
    //     tags: ["Climate Change", "Prediction", "Mitigation"]
    //   }
    // ];
    // setPrompts(dummyData);
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

  const filteredPrompts = prompts
    .filter(prompt => 
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase())
      // prompt.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(prompt => 
      filterTerm === '' ||
      prompt.tags.some(tag => 
        tag.toLowerCase().includes(filterTerm.toLowerCase())
      )
    )
    .sort((a, b) => (b.upvotes-b.downvotes) - (a.upvotes-a.downvotes))
    .slice(0, 10);

  return (
    <div className="min-h-screen bg-gray-900 text-white mt-7">
      <main className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Leaderboard</h1>
        
        <div className="flex mb-6">
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search prompts or authors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 text-white border border-gray-700 rounded-full py-2 px-4 pl-10 focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
          </div>
        </div>

        <div className="flex mb-6 space-x-4">
          <button className="flex items-center py-2 px-5 rounded-full transition-colors duration-300 bg-gray-600 text-white hover:bg-blue-500">
            Sort
            <ChevronDown className="ml-2" />
          </button>
          <div className="flex items-center bg-gray-600 text-white border border-gray-700 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500">
            <Tag size={15} className='mr-2'></Tag>
            <input
              type="text"
              placeholder="Filter"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              className="bg-gray-600 text-white text-bold border-none focus:outline-none"
            />
          </div>
        </div>

        <div className="">
          <div className="">
            {filteredPrompts.map((prompt, index) => (
              <Link to={`/prompt/${prompt._id}`} key={prompt._id}>
                <LeaderboardCard index={index} {...prompt} />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PromptLeaderboard;

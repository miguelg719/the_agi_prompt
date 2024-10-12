import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Tag } from 'lucide-react';
import LeaderboardCard from './leaderboard-card';

const PromptLeaderboard = () => {
  const [prompts, setPrompts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch('http://localhost:3000/api/prompts');
      const data = await response.json();
      console.log(data);
      setPrompts(data);
    };
    fetchPrompts();
  }, []);

  const filteredPrompts = prompts
    .filter(prompt => 
      prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prompt.author.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="min-h-screen bg-gray-900 text-white p-4 md:mt-7">
      <main className="max-w-3xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Leaderboard</h1>
        
        <div className="mb-6">
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

        <div className="flex flex-nowrap gap-2 mb-6 overflow-x-auto">
          <button className="flex-shrink-0 flex items-center py-2 px-4 rounded-full transition-colors duration-300 bg-gray-600 text-white hover:bg-blue-500">
            Sort
            <ChevronDown className="ml-2" />
          </button>
          <div className="flex-grow flex items-center bg-gray-600 text-white border border-gray-700 rounded-full py-2 px-3 focus:outline-none focus:border-blue-500 min-w-0">
            <Tag size={15} className="flex-shrink-0 mr-2" />
            <input
              type="text"
              placeholder="Filter"
              value={filterTerm}
              onChange={(e) => setFilterTerm(e.target.value)}
              className="bg-gray-600 text-white text-bold border-none focus:outline-none w-full min-w-0"
            />
          </div>
        </div>

        <div>
          {filteredPrompts.map((prompt, index) => (
            <LeaderboardCard key={prompt.id} index={index} {...prompt} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default PromptLeaderboard;
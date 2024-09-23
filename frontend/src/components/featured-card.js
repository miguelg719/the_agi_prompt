import React from 'react';

const FeaturedCard = ({ rank, prompt, score }) => (
    <div className="p-3 shadow-lg flex items-center justify-between mb-2">
      <span className="text-blue-400 font-semibold">#{rank}</span>
      <button className="text-gray-200 truncate mx-2 flex-grow hover:text-gray-400">{prompt}</button>
    </div>
);

export default FeaturedCard;
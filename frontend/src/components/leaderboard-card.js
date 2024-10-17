import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const LeaderboardCard = ({ index, title, upvotes, downvotes }) => (
    <div className="bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      <div className="flex justify-between items-center">
        <span className='text-white ml-4 md:text-xl text-slate-400'>
            #{index+1}
        </span>
        <h3 className="md:text-xl font-semibold text-white flex-grow">
            {title}
        </h3>
            <div className="flex justify-between items-center ml-4">
                <span className="text-green-400 transition-colors duration-300 mr-2">
                    <ThumbsUp size={17} />
                </span>
                <span className="text-md font-bold my-1">{upvotes-downvotes}</span>
                <span className="text-red-400 transition-colors duration-300 ml-2 mr-2">
                    <ThumbsDown size={17} />
                </span>
            </div>
        </div>
    </div>
  );

export default LeaderboardCard;
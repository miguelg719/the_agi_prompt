import React from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Tag, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const PromptCard = ({ _id, title, upvotes, comments, author, downvotes, tags }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 mb-6">
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-semibold text-white mb-2 flex-grow">
          <Link to={`/prompt/${_id}`} className="hover:text-blue-400">
            {title}
          </Link>
        </h3>
            <div className="flex justify-between items-center ml-4">
                <span className="text-green-400 transition-colors duration-300 mr-2">
                    <ThumbsUp size={17} />
                </span>
                <span className="text-md font-bold my-1">{upvotes - downvotes}</span>
                <span className="text-red-400 transition-colors duration-300 ml-2">
                    <ThumbsDown size={17} />
                </span>
            </div>
        </div>
        <div className="flex items-center text-gray-400 mb-3">
            <User size={16} className="mr-2" />
            <span className="mr-4">{author.username}</span>
        </div>
        <div className="flex items-center justify-between w-full">
            <div className="flex flex-wrap items-center flex-grow basis-6/7 overflow-hidden" style={{ maxHeight: '1.75rem' }}>
                {tags.map((tag, index) => (
                <span key={index} className="bg-gray-700 text-blue-300 rounded-full px-3 py-1 text-xs mr-2 flex items-center">
                    <Tag size={8} className="mr-1" />
                    {tag}
                </span>
                ))}
            </div>
            <div className="flex items-center text-gray-400 basis-1/7 justify-end">
                <MessageSquare size={16} className="mr-2" />
                <span>{comments.length}</span>
                <span className='hidden md:block ml-2'>comments</span>
            </div>
        </div>
    </div>
  );

export default PromptCard;
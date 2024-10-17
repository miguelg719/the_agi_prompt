import React, { useState } from 'react';
import { PlusIcon, Loader2 } from 'lucide-react';
import { createPrompt } from '../services/api'; 
import { getUserInfo } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import ErrorOverlay from './error-overlay';


const CreatePrompt = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = getUserInfo(); 
  const navigate = useNavigate();
  
  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    setError(null);
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value && tags.length < 5) {
      setTags([...tags, e.target.value]);
      e.preventDefault();
      e.target.value = '';
    } else if (e.key === 'Enter' && tags.length >= 5) {
      e.preventDefault();
      handleError('Maximum of 5 tags allowed');
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    clearError();

    try {
      const newPrompt = {
        title,
        prompt,
        tags,
        author: userId, 
      };

      const response = await createPrompt(newPrompt);
      
      setTitle('');
      setPrompt('');
      setTags([]);
      
      setIsRedirecting(true);
      setTimeout(() => {
        navigate(`/prompt/${response._id}`);
      }, 2000);
      
    } catch (err) {
      handleError('Failed to create prompt. Please try again.');
      console.error('Error creating prompt:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <main className="container mx-auto mt-2 p-8">
        <h1 className="text-2xl font-bold mb-6 text-white">Create New Prompt</h1>
        
        {error && <ErrorOverlay message={error} onClose={clearError} />}
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg mt-4 mb-10 text-left">
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 ml-3 text-xl font-semibold">Title</label>
            <input
              id="title"
              type="text"
              className="w-full bg-white p-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter prompt title"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="prompt" className="block mb-2 ml-3 text-xl font-semibold">Prompt</label>
            <textarea
              id="prompt"
              className="w-full bg-white p-2 rounded h-32"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe prompt"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label className="block mb-2 ml-3 text-xl font-semibold">Tags</label>
            <div className="flex flex-wrap items-center w-full bg-white p-2 rounded">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-700 text-white px-2 py-1 rounded-full mr-2">
                  {tag}
                  <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2">&times;</button>
                </span>
              ))}
              <input
                type="text"
                className="bg-transparent outline-none"
                placeholder="Include tags"
                onKeyPress={handleAddTag}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button 
              type="submit" 
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition-colors"
              disabled={isSubmitting || isRedirecting}
            >
              {isSubmitting || isRedirecting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <PlusIcon className="mr-2" size={20} />
              )}
              {isSubmitting ? 'Publishing...' : isRedirecting ? 'Uploading...' : 'Publish Prompt'}
            </button>
          </div>
        </form>

        {isRedirecting && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
              <p className="text-lg font-semibold">Uploading prompt...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CreatePrompt;

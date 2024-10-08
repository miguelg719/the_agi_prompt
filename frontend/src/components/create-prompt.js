import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';
import { createPrompt } from '../services/api'; 

const CreatePrompt = () => {
    const [title, setTitle] = useState('');
    const [prompt, setPrompt] = useState('');
    const [tags, setTags] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
  
    const handleAddTag = (e) => {
      if (e.key === 'Enter' && e.target.value) {
        setTags([...tags, e.target.value]);
        e.target.value = '';
      }
    };
  
    const handleRemoveTag = (tagToRemove) => {
      setTags(tags.filter(tag => tag !== tagToRemove));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log({ title, prompt, tags });
      setIsSubmitting(true);
      setError(null);

      try {
        const newPrompt = {
          title,
          prompt,
          tags,
          author: 'test6', // Replace with actual user data when available
        };

        const response = await createPrompt(newPrompt);
        console.log('Prompt created:', response);
        
        // Clear form after successful submission
        setTitle('');
        setPrompt('');
        setTags([]);
        
        // You might want to show a success message or redirect the user
      } catch (err) {
        setError('Failed to create prompt. Please try again.');
        console.error('Error creating prompt:', err);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-gray-900">
        <main className="container mx-auto mt-2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-white">Create New Prompt</h1>
          
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg mt-4 mb-10 text-left">
            {error && <div className="text-red-500 mb-4">{error}</div>}
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
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-600 transition-colors">
                <PlusIcon className="mr-2" size={20} />
                {isSubmitting ? 'Publishing...' : 'Publish Prompt'}
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  };
  
  export default CreatePrompt;
import React, { useState, useRef, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Tag, Clock, ChevronDown, ChevronUp, User, Paperclip, Plus, Minus, Link as LinkIcon } from 'lucide-react';
import { fetchPromptById, fetchComments, createComment, updatePrompt } from '../services/api';
import { getUserInfo } from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PromptView = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [prompt, setPrompt] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [votes, setVotes] = useState(0);
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [overflowingComments, setOverflowingComments] = useState({});
  const commentRefs = useRef({});
  const { userId } = getUserInfo();

  const renderPromptWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    const fetchPromptAndComments = async () => {
      setLoading(true);
      try {
        const promptData = await fetchPromptById(id);
        setPrompt(promptData);
        const commentsData = await fetchComments(promptData.comments);
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPromptAndComments();
  }, [id]);

  useEffect(() => {
    const checkOverflow = () => {
      const newOverflowingComments = {};
      comments.forEach((_, index) => {
        if (commentRefs.current[index]) {
          const isOverflowing = commentRefs.current[index].scrollHeight > commentRefs.current[index].clientHeight;
          newOverflowingComments[index] = isOverflowing;
        }
      });
      setOverflowingComments(newOverflowingComments);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [comments]);

  const toggleCommentExpansion = (index) => {
    setExpandedComments(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleAddComment = async () => {
    if (newComment.trim() && isAuthenticated) {
      try {
        const newCommentObj = await createComment(id, userId, newComment);
        setComments([...comments, newCommentObj]);
        const updatedPrompt = await updatePrompt(id, { 'comment': newCommentObj._id });
        setPrompt(updatedPrompt);
        setNewComment('');
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleCommentVote = (index, value) => {
    const updatedComments = [...comments];
    updatedComments[index].votes += value;
    setComments(updatedComments);
  };

  const handleVote = (value) => {
    setVotes(votes + value);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!prompt) return <div>No prompt found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg mt-4 mb-10">
      {/* Prompt Section with Attachments */}
      <div className="mb-6 p-4 bg-white rounded-lg">
        <h2 className="text-xl font-bold mb-2 px-5 py-2">{prompt.title}</h2>

        <p className="text-gray-700 mb-4 text-justify p-5">{renderPromptWithLineBreaks(prompt.prompt)}</p>
        
        {/* Attachments Subsection */}
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Paperclip size={20} className="mr-2" /> Attachments
          </h3>
          <div className="flex flex-wrap gap-2 mb-2">
            <img src="/images/prompt.png" alt="Screenshot 1" className="w-24 h-24 object-cover rounded" />
          </div>
          <div className="flex flex-wrap gap-4">
            {/* <a href="https://x.com/AmandaAskell/status/1765207842993434880/photo/1" className="text-blue-500 hover:underline flex items-center"> */}
            <a href="https://pastebin.com/qsHEt1QX" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
              <LinkIcon size={16} className="mr-1" /> Prompt Link 1
            </a>
            {/* <a href="#" className="text-blue-500 hover:underline flex items-center">
              <LinkIcon size={16} className="mr-1" /> Related Link 2
            </a> */}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="mb-6 flex flex-wrap items-center text-sm text-gray-600">
        <span className="flex items-center mr-4"><User size={16} className="mr-1" /> {prompt.author.username}</span>
        <span className="flex items-center mr-4"><Clock size={16} className="mr-1" /> Last edited: {new Date(prompt.createdAt).toLocaleDateString()}</span>
        <span className="flex items-center"><Tag size={16} className="mr-1" /> {prompt.tags.join(', ')}</span>
        <div className="flex items-end ml-auto mr-2">
        <button onClick={() => handleVote(1)} className="flex items-center mr-2 p-1 rounded hover:bg-gray-200">
          <ThumbsUp size={22} className="text-green-500" />
        </button>
        <span className="text-lg font-bold">{votes}</span>
        <button onClick={() => handleVote(-1)} className="flex items-center ml-2 p-1 rounded hover:bg-gray-200">
          <ThumbsDown size={22} className="text-red-500" />
        </button>
      </div>
      </div>

      {/* Voting */}


      {/* Comments Section */}
      <div className='flex items-center'>
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <MessageSquare size={20} className="mr-2" /> Comments
          {isAuthenticated && (<button
            onClick={toggleInput}
            className="ml-2 text-blue-800 hover:text-blue-900"
            aria-label={showInput ? 'Hide input' : 'Show input'}
          >
            {showInput ? <Minus size={15} /> : <Plus size={15} />}
          </button>)}
          </h3>
        </div>
        {showInput && (
          <div className="flex mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-grow p-2 border rounded-l-lg"
            />
            <button
              onClick={handleAddComment}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        )}
        <div className="mb-4">
          {comments.map((comment, index) => (
            <div key={comment._id} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-grow mr-4 relative">
                  <p
                    ref={el => commentRefs.current[index] = el}
                    className={`text-gray-800 mb-4 text-left pr-5 pl-2 ${expandedComments[index] ? '' : 'line-clamp-3'}`}
                  >
                    {comment.body}
                  </p>
                  {overflowingComments[index] && (
                    <button
                      onClick={() => toggleCommentExpansion(index)}
                      className="text-blue-500 hover:text-blue-700 text-sm flex mt-2 items-center absolute bottom-0 right-0"
                    >
                      {expandedComments[index] ? (
                        <>
                          less <ChevronUp size={14} className="ml-1" />
                        </>
                      ) : (
                        <>
                          more <ChevronDown size={14} className="ml-1" />
                        </>
                      )}
                    </button>
                  )}
                </div>
                <div className="flex items-center pr-1">
                  <button onClick={() => handleCommentVote(index, 1)} className="mr-1">
                    <ThumbsUp size={12} className="text-green-500" />
                  </button>
                  <span className="font-bold text-sm mx-1">{comment.upvotes-comment.downvotes}</span>
                  <button onClick={() => handleCommentVote(index, -1)} className="ml-1">
                    <ThumbsDown size={12} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-1 text-sm text-gray-600">
                <span className="flex items-center">
                  <User size={14} className="mr-1" /> {comment.user.username}
                </span>
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" /> {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default PromptView;
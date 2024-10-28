import React, { useState, useRef, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Tag, Clock, ChevronDown, ChevronUp, User, Paperclip, Plus, Minus, Link as LinkIcon, Loader } from 'lucide-react';
import { fetchPromptById, fetchComments, createComment, updatePrompt, updateComment } from '../services/api';
import { getUserInfo } from '../utils/auth';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorOverlay from './error-overlay';

const PromptView = () => {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();

  const [prompt, setPrompt] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [overflowingComments, setOverflowingComments] = useState({});
  const commentRefs = useRef({});
  const userInfo = getUserInfo();
  const userId = userInfo?.userId;
  const [userVote, setUserVote] = useState(0);
  const [commentVotes, setCommentVotes] = useState({});

  const renderPromptWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  const renderVoteButton = (voteType) => {
    const isUpvote = voteType === 1;
    const Icon = isUpvote ? ThumbsUp : ThumbsDown;
    
    // Retrieve the user's vote from localStorage
    const storedVote = localStorage.getItem(`userVote_${id}`);
    const currentUserVote = storedVote ? parseInt(storedVote, 10) : 0;
    
    const isSelected = currentUserVote === voteType;
    const fillColorClass = isUpvote ? 'text-green-500' : 'text-red-500';
    const strokeColorClass = isUpvote ? 'stroke-green-600' : 'stroke-red-600';

    return (
      <button 
        onClick={() => handleVote(voteType)} 
        className={`flex items-center p-1 rounded hover:bg-gray-200 ${isSelected ? 'bg-gray-200' : ''}`}
      >
        <Icon 
          size={22} 
          className={`
            ${fillColorClass} 
            ${isSelected ? `fill-current ${strokeColorClass}` : 'stroke-current'}
          `} 
        />
      </button>
    );
  };

  useEffect(() => {
    const fetchPromptAndComments = async () => {
      setLoading(true);
      try {
        const promptData = await fetchPromptById(id);
        setPrompt(promptData);
        
        // Retrieve the user's vote from localStorage
        const storedVote = localStorage.getItem(`userVote_${id}`);
        const userVoteValue = storedVote ? parseInt(storedVote, 10) : 0;
        
        setUserVote(userVoteValue);
        
        const commentsData = await fetchComments(promptData.comments);
        setComments(commentsData);

        // Load comment votes from localStorage
        const storedCommentVotes = {};
        commentsData.forEach(comment => {
          const storedVote = localStorage.getItem(`commentVote_${comment._id}`);
          if (storedVote) {
            storedCommentVotes[comment._id] = parseInt(storedVote, 10);
          }
        });
        setCommentVotes(storedCommentVotes);
      } catch (err) {
        handleError(err.message);
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

  const handleError = (errorMessage) => {
    setError(errorMessage);
  };

  const clearError = () => {
    handleError(null);
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
        handleError(err.message);
      }
    }
  };

  const handleCommentVote = async (commentId, value) => {
    if (isAuthenticated) {
      try {
        if (!userId) {
          handleError('Unable to retrieve user information.');
          return;
        }
        console.log(commentId, value);
        let voteValue;
        if (commentVotes[commentId] === value) {
          // If the user clicks the same vote again, remove their vote
          voteValue = 0;
        } else {
          // Otherwise, set the new vote
          voteValue = value;
        }

        // Update the comment vote in the backend
        const updatedComment = await updateComment(commentId, { vote: voteValue, userId });
        
        // Update the local state
        setComments(comments.map(comment => 
          comment._id === commentId ? updatedComment : comment
        ));
        
        setCommentVotes(prev => ({
          ...prev,
          [commentId]: voteValue
        }));
        
        // Store the user's vote in localStorage
        localStorage.setItem(`commentVote_${commentId}`, voteValue.toString());
      } catch (err) {
        handleError('Failed to update comment vote. Please try again.');
      }
    } else {
      handleError('You must be logged in to vote.');
    }
  };

  const renderCommentVoteButton = (commentId, voteType) => {
    const isUpvote = voteType === 1;
    const Icon = isUpvote ? ThumbsUp : ThumbsDown;
    
    const currentUserVote = commentVotes[commentId] || 0;
    
    const isSelected = currentUserVote === voteType;
    const fillColorClass = isUpvote ? 'text-green-500' : 'text-red-500';
    const strokeColorClass = isUpvote ? 'stroke-green-600' : 'stroke-red-600';

    return (
      <button 
        onClick={() => handleCommentVote(commentId, voteType)} 
        className={`flex items-center p-1 rounded hover:bg-gray-200`}
      >
        <Icon 
          size={16} 
          className={`
            ${fillColorClass} 
            ${isSelected ? `fill-current ${strokeColorClass}` : 'stroke-current'}
          `} 
        />
      </button>
    );
  };

  const handleVote = async (value) => {
    if (isAuthenticated) {
      try {
        if (!userId) {
          handleError('Unable to retrieve user information.');
          return;
        }

        let voteValue;
        if (userVote === value) {
          // If the user clicks the same vote again, remove their vote
          voteValue = 0;
        } else {
          // Otherwise, set the new vote
          voteValue = value;
        }

        const updatedPrompt = await updatePrompt(id, { vote: voteValue, userId });
        setPrompt(updatedPrompt);
        setUserVote(voteValue);
        
        // Store the user's vote in localStorage
        localStorage.setItem(`userVote_${id}`, voteValue.toString());
      } catch (err) {
        handleError('Failed to update vote. Please try again.');
      }
    } else {
      handleError('You must be logged in to vote.');
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-blue-500" size={48} />
    </div>
  );
  if (!prompt) return <div>No prompt found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-200 shadow-lg rounded-lg mt-4 mb-10">
      {error && <ErrorOverlay message={error} onClose={clearError} />}
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
            <img src="url('/images/image.png')" alt="Screenshot 1" className="w-24 h-24 object-cover rounded" />
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
        {/* Voting */}
        <div className="flex items-center ml-auto mr-2">
          {renderVoteButton(1)}
          <span className="text-lg font-bold mx-2">{prompt.upvotes-prompt.downvotes}</span>
          {renderVoteButton(-1)}
        </div>
      </div>
      </div>

      


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
                  {renderCommentVoteButton(comment._id, 1)}
                  <span className="font-bold text-sm mx-1">{comment.upvotes - comment.downvotes}</span>
                  {renderCommentVoteButton(comment._id, -1)}
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

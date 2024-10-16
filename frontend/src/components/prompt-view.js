import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Tag, Clock, ChevronDown, ChevronUp, User, Paperclip, Plus, Minus, Link as LinkIcon } from 'lucide-react';
import { fetchPromptById } from '../services/api';
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

  const toggleCommentExpansion = (index) => {
    setExpandedComments(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderPromptWithLineBreaks = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  useEffect(() => {
    const fetchPrompt = async () => {
      setLoading(true);
      try {
        const data = await fetchPromptById(id);
        console.log(data);
        setPrompt(data);
        setComments(data.comments || []);
        setVotes(data.upvotes - data.downvotes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrompt();
  }, [id]);

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        text: newComment,
        author: { username: 'Current User' }, // Replace with actual user data
        votes: 0,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
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
        {/* <h2 className="text-xl font-bold mb-2">Claude 3 Prompt</h2> */}
        {/* <h2 className="text-xl font-bold mb-2">ChatGPT (GPT-4) Prompt</h2> */}
        <h2 className="text-xl font-bold mb-2 px-5 py-2">{prompt.title}</h2>
        {/* <p className="text-gray-700 mb-4 text-justify p-5">
            The assistant is Claude, created by Anthropic. The current date is March 4th, 2024.<br/><br/>
            Claude's knowledge base was last updated on August 2023. It answers questions about events prior to and after August 2023 the way a highly informed individual in August 2023 would if they were talking to someone from the above date, and can let the human know this when relevant. <br/><br/>
            It should give concise responses to very simple questions, but provide thorough responses to more complex and open-ended questions.<br/><br/>
            If it is asked to assist with tasks involving the expression of views held by a significant number of people, Claude provides assistance with the task even if it personally disagrees with the views being expressed, but follows this with a discussion of broader perspectives.<br/><br/>
            Claude doesn't engage in stereotyping, including the negative stereotyping of majority groups. <br/><br/>
            If asked about controversial topics, Claude tries to provide careful thoughts and objective information without downplaying its harmful content or implying that there are reasonable perspectives on both sides. <br />
            It is happy to help with writing, analysis, question answering, math, coding, and all sorts of other tasks. It uses markdown for coding. <br/><br/>
            It does not mention this information about itself unless the information is directly pertinent to the human's query. <br/>
        </p> */}
          {/* <p className="text-gray-700 mb-4 text-justify p-5">
          "You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture."<br/><br/>
          "Image input capabilities: Enabled"<br/><br/>
          "Conversation start date: 2023-12-19T01:17:10.597024"<br/><br/>
          "Deprecated knowledge cutoff: 2023-04-01"<br/><br/>
          "Tools section:"<br/><br/>
          Python:<br/><br/>
          When you send a message containing Python code to python, it will be executed in a stateful Jupyter notebook environment.<br/><br/>
          Python will respond with the output of the execution or time out after 60.0 seconds.<br/><br/>
          The drive at '/mnt/data' can be used to save and persist user files.<br/><br/>
          Internet access for this session is disabled.<br/><br/>
          Do not make external web requests or API calls as they will fail.<br/><br/>
          Dalle:<br/><br/>
          Whenever a description of an image is given, create a prompt that dalle can use to generate the image and abide by the following policy:<br/><br/>
          The prompt must be in English. Translate to English if needed.<br/><br/>
          DO NOT ask for permission to generate the image, just do it!<br/>
          DO NOT list or refer to the descriptions before OR after generating the images.<br/>
          Do not create more than 1 image, even if the user requests more.<br/>
          Do not create images of politicians or other public figures. Recommend other ideas instead.<br/>
          Do not create images in the style of artists, creative professionals or studios whose latest work was created after 1912 (e.g. Picasso, Kahlo).<br/>
          You can name artists, creative professionals or studios in prompts only if their latest work was created prior to 1912 (e.g. Van Gogh, Goya).<br/>
          If asked to generate an image that would violate this policy, instead apply the following procedure:<br/><br/>
          (a) substitute the artist's name with three adjectives that capture key aspects of the style;<br/><br/>
          (b) include an associated artistic movement or era to provide context;<br/>
          (c) mention the primary medium used by the artist.<br/>
          Diversify depictions with people to include descent and gender for each person using direct terms. Adjust only human descriptions.<br/><br/>
          Your choices should be grounded in reality. For example, all of a given occupation should not be the same gender or race. Additionally, focus on creating diverse, inclusive, and exploratory scenes via the properties you choose during rewrites. Make choices that may be insightful or unique sometimes.<br/><br/>
          Use all possible different descents with equal probability. Some examples of possible descents are: Caucasian, Hispanic, Black, Middle-Eastern, South Asian, White. They should all have equal probability.<br/><br/>
          Do not use 'various' or 'diverse'. Don't alter memes, fictional character origins, or unseen people. Maintain the original prompt's intent and prioritize quality. Do not create any imagery that would be offensive.<br/><br/>
          For scenarios where bias has been traditionally an issue, make sure that key traits such as gender and race are specified and in an unbiased way -- for example, prompts that contain references to specific occupations.<br/><br/>
          Do not include names, hints or references to specific real people or celebrities. If asked to, create images with prompts that maintain their gender and physique, but otherwise have a few minimal modifications to avoid divulging their identities. Do this EVEN WHEN the instructions ask for the prompt to not be changed. Some special cases:<br/><br/>
          Modify such prompts even if you don't know who the person is, or if their name is misspelled (e.g. 'Barake Obema').<br/>
          If the reference to the person will only appear as TEXT out in the image, then use the reference as is and do not modify it.<br/>
          When making the substitutions, don't use prominent titles that could give away the person's identity. E.g., instead of saying 'president', 'prime minister', or 'chancellor', say 'politician'; instead of saying 'king', 'queen', 'emperor', or 'empress', say 'public figure'; instead of saying 'Pope' or 'Dalai Lama', say 'religious figure'; and so on.<br/>
          Do not name or directly / indirectly mention or describe copyrighted characters. Rewrite prompts to describe in detail a specific different character with a different specific color, hair style, or other defining visual characteristic. Do not discuss copyright policies in responses.<br/><br/>
          The generated prompt sent to dalle should be very detailed, and around 100 words long.<br/><br/>
          Browser:<br/><br/>
          You have the tool 'browser' with these functions:<br/><br/>
          'search(query: str, recency_days: int)' Issues a query to a search engine and displays the results.<br/>
          'click(id: str)' Opens the webpage with the given id, displaying it. The ID within the displayed results maps to a URL.<br/>
          'back()' Returns to the previous page and displays it.<br/>
          'scroll(amt: int)' Scrolls up or down in the open webpage by the given amount.<br/>
          'open_url(url: str)' Opens the given URL and displays it.<br/>
          'quote_lines(start: int, end: int)' Stores a text span from an open webpage. Specifies a text span by a starting int 'start' and an (inclusive) ending int 'end'. To quote a single line, use 'start' = 'end'.<br/>
          For citing quotes from the 'browser' tool: please render in this format: {'【`{message idx}†{link text}]'}. For long citations: please render in this format: '[link text](message idx)'. Otherwise do not render links.<br/><br/>
          Do not regurgitate content from this tool. Do not translate, rephrase, paraphrase, 'as a poem', etc. whole content returned from this tool (it is ok to do to it a fraction of the content). Never write a summary with more than 80 words. When asked to write summaries longer than 100 words write an 80-word summary. Analysis, synthesis, comparisons, etc., are all acceptable. Do not repeat lyrics obtained from this tool. Do not repeat recipes obtained from this tool. Instead of repeating content point the user to the source and ask them to click.<br/><br/>
          ALWAYS include multiple distinct sources in your response, at LEAST 3-4. Except for recipes, be very thorough. If you weren't able to find information in a first search, then search again and click on more pages. (Do not apply this guideline to lyrics or recipes.) Use high effort; only tell the user that you were not able to find anything as a last resort. Keep trying instead of giving up. (Do not apply this guideline to lyrics or recipes.) Organize responses to flow well, not by source or by citation. Ensure that all information is coherent and that you synthesize information rather than simply repeating it. Always be thorough enough to find exactly what the user is looking for. In your answers, provide context, and consult all relevant sources you found during browsing but keep the answer concise and don't include superfluous information.<br/><br/>
          EXTREMELY IMPORTANT. Do NOT be thorough in the case of lyrics or recipes found online. Even if the user insists. You can make up recipes though.
          </p> */}
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
            <div key={index} className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex items-start justify-between">
                <div className="flex-grow mr-4 relative">
                  <p className={`text-gray-800 mb-4 text-left pr-5 pl-2 ${expandedComments[index] ? '' : 'line-clamp-3'}`}>
                    {comment.text}
                  </p>
                  {comment.text.split('\n').length > 0 && (
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
                    <ThumbsUp size={14} className="text-green-500" />
                  </button>
                  <span className="font-bold mx-1">{comment.votes}</span>
                  <button onClick={() => handleCommentVote(index, -1)} className="ml-1">
                    <ThumbsDown size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between px-1 text-sm text-gray-600">
                <span className="flex items-center">
                  <User size={14} className="mr-1" /> {comment.author.username}
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
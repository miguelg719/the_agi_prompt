import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ArrowRight, Users, Brain, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

const Intro = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Check each section's visibility
      [featuresRef, aboutRef, ctaRef].forEach(ref => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          setIsVisible(prev => ({ ...prev, [ref.current.id]: isVisible }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial visibility

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/images/image.png')",
            transform: `scale(${1 + scrollPosition * 0.0002})`,
          }}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        
        {/* Animated gradient overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black animate-pulse" /> */}
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 
            className="text-4xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-200 to-white animate-gradient-x"
            style={{ transform: `translateY(${-scrollPosition * 0.2}px)` }}
          >
            Collaborate on the 
            <span className="block text-blue-400">future of AI</span>
          </h1>
          <p 
            className="text-xl md:text-2xl mb-8 text-gray-300"
            style={{ transform: `translateY(${-scrollPosition * 0.1}px)` }}
          >
            Join our community of innovators shaping the next generation of artificial intelligence
          </p>
          <Link to="/home">
            <button className="group relative px-8 py-4 bg-white text-black rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
              <span className="relative z-10 flex items-center gap-2">
                Explore Prompts
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </Link>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <ChevronDown size={32} className="animate-bounce text-white/80" />
        </div>
      </section>

      {/* Features Section */}
      <section 
        id="features"
        ref={featuresRef}
        className="pt-20 pb-28 px-4"
      >
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold p-1 mb-16 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Aligning AI and Humans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              title="Collaborative Prompts"
              description="Work together with AI enthusiasts worldwide to create, refine, and perfect prompts that push the boundaries of what's possible."
              icon={<Users className="w-8 h-8" />}
              gradient="from-blue-500 to-cyan-500"
            />
            <FeatureCard 
              title="Zero-Bias Benchmarks"
              description="Leverage diversity and inclusion through sophisticated bias-surfacing datasets and supportive voting system to quantify inherent bias."
              icon={<Vote className="w-8 h-8" />}
              gradient="from-purple-500 to-pink-500"
            />
            <FeatureCard 
              title="LLM Integration"
              description="Test your prompts across multiple language models to ensure consistency and maximize effectiveness across platforms."
              icon={<Brain className="w-8 h-8" />}
              gradient="from-orange-500 to-red-500"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about"
        ref={aboutRef}
        className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black"
      >
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Shaping the Future Together
              
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              The world is in a race to build superintelligent systems, and the exponential growth of AI-generated content on the internet is spreading its inherent biases like wildfire.
              Although there are ongoing efforts to align AI’s goals with human values, this process within major firms is often opaque and controlled by a small, homogeneous group of people.
              <br></br><br></br>
              <span className='font-logo text-xl font-bold'>The AGI Prompt</span>  offers a solution by fostering diversity and involving people from numerous backgrounds.
              It promotes a democratic process to collaboratively define essential safeguards and guide the general direction of AI development.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        id="cta"
        ref={ctaRef}
        className="py-20 px-2 bg-gradient-to-b from-black to-gray-900"
      >
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Join the Community
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Be part of shaping the future of artificial intelligence
          </p>
          <Link to="/login">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, icon, gradient }) => (
  <div className="group relative bg-gray-800/50 backdrop-blur-lg p-8 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10">
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${gradient} mb-6`}>
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

export default Intro;
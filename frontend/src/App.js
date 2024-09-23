import './App.css';
import Home from './components/home';
import Header from './components/header';
import Leaderboard from './components/leaderboard';
import Intro from './components/intro';
import Footer from './components/footer';
import PromptView from './components/prompt-view';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App bg-gray-900">
      <Header />
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/home" element={<Home />} /> 
        <Route path="/leaderboard" element={<Leaderboard />} /> 
        <Route path="/prompt_test" element={<PromptView />} />
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}

export default App;

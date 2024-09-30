import './App.css';
import Home from './components/home';
import Header from './components/header';
import Leaderboard from './components/leaderboard';
import Intro from './components/intro';
import Footer from './components/footer';
import PromptView from './components/prompt-view';
import LoginSignup from './components/login-signup';
import ProfilePage from './components/profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
      <div className="App bg-gray-900">
        <Header />
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Home />} /> 
          <Route path="/leaderboard" element={<Leaderboard />} /> 
          <Route path="/prompt_test" element={<PromptView />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
      </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

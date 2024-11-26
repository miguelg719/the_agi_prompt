import './App.css';
import Home from './components/home';
import Header from './components/header';
import Leaderboard from './components/leaderboard';
import Intro from './components/intro';
import Footer from './components/footer';
import PromptView from './components/prompt-view';
import CreatePrompt from './components/create-prompt';
import LoginSignup from './components/login-signup';
import ProfilePage from './components/profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
        <div className="App bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/home" element={<Home />} /> 
            <Route path="/leaderboard" element={<Leaderboard />} /> 
            <Route path="/prompt/:id" element={<PromptView />} />
            <Route path="/prompt" element={<CreatePrompt />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          <Footer />
        </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;

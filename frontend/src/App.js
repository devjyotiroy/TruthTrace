import { useState, useEffect } from 'react';
import Home from './components/Home';
import Scanner from './components/Scanner';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [page, setPage] = useState('home'); // home, login, signup, scanner
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      setPage('scanner');
    }
  }, []);

  const handleGetStarted = () => {
    setPage('login');
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setPage('scanner');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setPage('scanner');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setPage('home');
  };

  const handleBackToHome = () => {
    setPage('home');
  };

  if (page === 'home') {
    return <Home onGetStarted={handleGetStarted} />;
  }

  if (page === 'login') {
    return (
      <Login 
        onLogin={handleLogin} 
        onSwitchToSignup={() => setPage('signup')}
        onBack={handleBackToHome}
      />
    );
  }

  if (page === 'signup') {
    return (
      <Signup 
        onSignup={handleSignup} 
        onSwitchToLogin={() => setPage('login')}
        onBack={handleBackToHome}
      />
    );
  }

  return <Scanner user={user} onLogout={handleLogout} />;
}

export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import Results from './Results';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';

function App() {
  return (
    <Router>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Hello, Edu Career Advisor!</h1>
        <LanguageSwitcher />
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results results={[]} />} /> {/* Pass results later dynamically */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

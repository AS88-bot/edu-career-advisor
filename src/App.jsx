// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-start p-6">
        <header className="w-full max-w-4xl mb-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">EduCareer Advisor</h1>
          <LanguageSwitcher />
        </header>

        <main className="w-full max-w-4xl">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="*" element={<div className="text-red-500 text-center">Page not found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

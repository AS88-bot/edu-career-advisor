// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Quiz from './components/Quiz';
import LanguageSwitcher from './components/LanguageSwitcher';
import './i18n';
               // <-- important
function App() {
  return (
    <div>
      <h1>Hello, Edu Career Advisor!</h1>
    </div>
  );
}
export default App;

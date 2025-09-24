// src/Results.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Results() {
  const location = useLocation();
  const navigate = useNavigate();

  // Grab results passed via state (from Quiz page)
  const results = location.state?.results || [];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Your Career Results</h1>

      {results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((item, index) => (
            <li
              key={index}
              className="p-4 border rounded shadow-sm hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <>
          <p>No results found. Try taking the quiz first.</p>
          <button
            onClick={() => navigate('/quiz')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Take Quiz
          </button>
        </>
      )}
    </div>
  );
}

export default Results;

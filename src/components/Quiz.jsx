// src/components/Quiz.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

// Function to sync offline assessments
const syncOfflineAssessments = async () => {
  const offline = JSON.parse(localStorage.getItem('offline_assessments') || '[]');
  if (!offline.length) return;
  for (const item of offline) {
    try {
      await addDoc(collection(db, 'assessments'), item);
    } catch (err) {
      console.error('Sync error:', err);
    }
  }
  localStorage.removeItem('offline_assessments');
};

const fetchUserAssessments = async (uid) => {
  const q = query(collection(db, 'assessments'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export default function Quiz() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const data = await fetchUserAssessments(u.uid);
        setAssessments(data);
      }
      setLoading(false);
    });

    window.addEventListener('online', syncOfflineAssessments);
    return () => {
      unsubscribe();
      window.removeEventListener('online', syncOfflineAssessments);
    };
  }, []);

  // Handle submitting a new quiz answer
  const handleSubmit = async () => {
    if (!answer) return alert('Please enter an answer');

    const recommendation = {
      course: answer, // For demo, use answer as course recommendation
      createdAt: serverTimestamp(),
    };

    const assessmentData = {
      uid: user?.uid || 'guest',
      recommendation,
    };

    if (navigator.onLine && user) {
      try {
        await addDoc(collection(db, 'assessments'), assessmentData);
      } catch (err) {
        console.error('Firebase error:', err);
        localStorage.setItem(
          'offline_assessments',
          JSON.stringify([assessmentData, ...(JSON.parse(localStorage.getItem('offline_assessments') || '[]'))])
        );
      }
    } else {
      // Offline: save locally
      localStorage.setItem(
        'offline_assessments',
        JSON.stringify([assessmentData, ...(JSON.parse(localStorage.getItem('offline_assessments') || '[]'))])
      );
    }

    // Navigate to Results page with this recommendation
    navigate('/results', { state: { results: [recommendation] } });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Take a Quiz</h2>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Enter your career interest:</label>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="e.g., Software Engineer"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Submit
      </button>

      <h2 className="text-xl font-semibold text-gray-700 mt-6 mb-2">Your Past Assessments</h2>
      {loading ? (
        <p className="text-gray-500">Loading assessments...</p>
      ) : assessments.length === 0 ? (
        <p className="text-gray-600">No assessments found.</p>
      ) : (
        <ul className="space-y-2">
          {assessments.map(({ id, createdAt, recommendation }) => {
            const timestamp = createdAt?.seconds ? createdAt.seconds * 1000 : createdAt;
            return (
              <li key={id} className="border-b pb-2">
                <span className="font-medium">{new Date(timestamp).toLocaleString()}</span> –{' '}
                <span className="text-green-600">{recommendation?.course || 'No recommendation'}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

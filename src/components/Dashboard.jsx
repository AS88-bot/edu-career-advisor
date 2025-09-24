import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';

const fetchAssessments = async (uid) => {
  const q = query(collection(db, 'assessments'), where('uid', '==', uid));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export default function Dashboard() {
  const [assessments, setAssessments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await fetchAssessments(user.uid);
        setAssessments(data);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Dashboard</h2>
      <Link to="/quiz" className="text-blue-500 hover:underline mb-6 inline-block">
        ➕ Take a New Quiz
      </Link>

      {loading ? (
        <p className="text-gray-500">Loading your assessments...</p>
      ) : assessments.length === 0 ? (
        <p className="text-gray-600">No assessments found. Start with a quiz!</p>
      ) : (
        <ul className="space-y-2">
          {assessments.map(({ id, createdAt, recommendation }) => {
            const timestamp = createdAt?.seconds ? createdAt.seconds * 1000 : createdAt;
            return (
              <li key={id} className="border-b pb-2">
                <span className="font-medium">{new Date(timestamp).toLocaleString()}</span> –{" "}
                <span className="text-green-600">{recommendation?.course || "No recommendation"}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

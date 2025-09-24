import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await fetchUserAssessments(user.uid);
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

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Your Past Assessments</h2>

      {loading ? (
        <p className="text-gray-500">Loading assessments...</p>
      ) : assessments.length === 0 ? (
        <p className="text-gray-600">No assessments found. Try taking a quiz!</p>
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

import React from 'react';
import { auth, provider, db } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Login() {
  const nav = useNavigate();
  const { t } = useTranslation();

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: new Date()
      }, { merge: true });
      nav('/dashboard');
    } catch (err) {
      console.error('Login failed', err);
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">EduCareer Advisor</h1>
      <button
        onClick={handleGoogle}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded shadow"
      >
        {t('sign_in') || 'Sign in with Google'}
      </button>
    </div>
  );
}

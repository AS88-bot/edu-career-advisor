// src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher(){
  const { i18n } = useTranslation();
  return (
    <div style={{ position: 'absolute', right: 12, top: 12 }}>
      <select value={i18n.language} onChange={e => i18n.changeLanguage(e.target.value)}>
        <option value="en">EN</option>
        <option value="hi">HI</option>
        <option value="ur">UR</option>
        <option value="ks">KS</option>
      </select>
    </div>
  );
}

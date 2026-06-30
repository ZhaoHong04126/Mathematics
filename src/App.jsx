import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';

export default function App() {
  // Initialize state from localStorage
  const [theme] = useState(() => {
    return localStorage.getItem('notes-theme') || 'dark';
  });
  
  const [activeTopicId, setActiveTopicId] = useState(() => {
    return localStorage.getItem('notes-active-topic') || null;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Apply theme to document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('notes-theme', theme);
  }, [theme]);

  // Persist active topic selection
  useEffect(() => {
    if (activeTopicId) {
      localStorage.setItem('notes-active-topic', activeTopicId);
    } else {
      localStorage.removeItem('notes-active-topic');
    }
  }, [activeTopicId]);

  return (
    <div className="app-container">
      {/* Mobile top bar */}
      <div className="mobile-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="logo-icon" style={{ width: '28px', height: '28px', fontSize: '1rem' }}>∑</div>
          <span style={{ fontWeight: '700', fontSize: '1rem' }}>大學數學</span>
        </div>
        <button 
          className="hamburger-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar navigation */}
      <Sidebar
        activeTopicId={activeTopicId}
        setActiveTopicId={setActiveTopicId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main lecture contents */}
      <MainContent
        activeTopicId={activeTopicId}
        setActiveTopicId={setActiveTopicId}
      />
    </div>
  );
}

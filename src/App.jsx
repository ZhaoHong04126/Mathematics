import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import { chaptersData } from './data/chapters';

export default function App() {
  // Initialize theme to light mode (light orange)
  const [theme] = useState('light');
  
  // Helper to convert internal ID (like "1-1-1") to friendly URL segment (like "1.1")
  const idToUrlSegment = (id) => {
    if (!id) return '';
    const match = id.match(/^(\d+)-(\d+)-(\d+)$/);
    if (match) {
      return `${match[2]}.${match[3]}`; // e.g. "1-1-1" -> "1.1", "1-2-5" -> "2.5"
    }
    return id;
  };

  // Helper to convert friendly URL segment (like "1.1") back to internal ID (like "1-1-1")
  const urlSegmentToId = (segment, subjectId) => {
    if (!segment) return null;
    const match = segment.match(/^(\d+)\.(\d+)$/);
    if (match) {
      // Determine prefix based on subjectId
      let prefix = '1'; // Default for Calculus
      if (subjectId === 'LinearAlgebra') prefix = '2';
      if (subjectId === 'MultivariableCalculus') prefix = '3';
      return `${prefix}-${match[1]}-${match[2]}`; // e.g. "1.1" -> "1-1-1"
    }
    return segment;
  };

  // Helper to extract the topic ID from Hash URL (supporting #/Calculus/Functions/1.1 and backwards compatibility)
  const getActiveTopicIdFromHash = () => {
    const hash = window.location.hash;
    const parts = hash.split('/');
    
    // Check if the last segment is a decimal section number (e.g. "1.1" or "2.5")
    if (parts.length >= 3) {
      const subjectId = parts[1];
      const lastSegment = parts[parts.length - 1];
      if (lastSegment.match(/^\d+\.\d+$/)) {
        return urlSegmentToId(lastSegment, subjectId);
      }
    }
    
    // Fallback for descriptive paths
    if (parts.length >= 4) {
      return parts[3]; // subject/chapter/unit
    }
    if (parts.length === 3) {
      return parts[2]; // subject/chapter (e.g. Calculus/Functions, Info/DevelopmentLog)
    }
    if (parts.length === 2 && parts[1]) {
      return parts[1];
    }
    return null;
  };

  // Helper to find the route parts of a given topic/subtopic ID
  const getRouteParts = (topicId) => {
    if (!topicId) return { subjectId: '', chapterId: '', unitId: '' };
    for (const chapter of chaptersData) {
      // 1. Check if the topicId is a top-level topic under this chapter
      const topic = chapter.topics.find(t => t.id === topicId);
      if (topic) {
        return { subjectId: chapter.id, chapterId: topic.id, unitId: '' };
      }
      
      // 2. Check if the topicId is a subtopic under a topic
      for (const t of chapter.topics) {
        if (t.subtopics) {
          const subtopic = t.subtopics.find(s => s.id === topicId);
          if (subtopic) {
            return { subjectId: chapter.id, chapterId: t.id, unitId: subtopic.id };
          }
        }
      }
    }
    return { subjectId: '', chapterId: '', unitId: topicId };
  };

  const [activeTopicId, setActiveTopicId] = useState(() => {
    return getActiveTopicIdFromHash() || localStorage.getItem('notes-active-topic') || null;
  });

  const [mobileOpen, setMobileOpen] = useState(false);

  // Apply theme to document attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('notes-theme', theme);
  }, [theme]);

  // Sync state when URL hash changes (handles browser Back/Forward)
  useEffect(() => {
    const handleHashChange = () => {
      const topicId = getActiveTopicIdFromHash();
      setActiveTopicId(topicId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Persist active topic selection and sync to URL Hash
  useEffect(() => {
    if (activeTopicId) {
      localStorage.setItem('notes-active-topic', activeTopicId);
      
      const { subjectId, chapterId, unitId } = getRouteParts(activeTopicId);
      if (subjectId) {
        if (unitId) {
          const segment = idToUrlSegment(unitId);
          window.location.hash = `#/${subjectId}/${chapterId}/${segment}`;
        } else {
          window.location.hash = `#/${subjectId}/${chapterId}`;
        }
      } else {
        window.location.hash = `#/${activeTopicId}`;
      }
    } else {
      localStorage.removeItem('notes-active-topic');
      window.location.hash = '#/';
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

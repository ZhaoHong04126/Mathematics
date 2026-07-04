import { useState } from 'react';
import { chaptersData } from '../data/chapters';

export default function Sidebar({
  activeTopicId,
  setActiveTopicId,
  mobileOpen,
  setMobileOpen
}) {
  const [expandedChapters, setExpandedChapters] = useState({
    ch1: false,  // 微積分
    ch2: false,  // 線性代數
    ch3: false, // 多變量微積分
    info: false // 資源
  });
  const [expandedTopics, setExpandedTopics] = useState({});

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const handleTopicClick = (topicId) => {
    setActiveTopicId(topicId);
    setMobileOpen(false); // Close sidebar on mobile
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={`sidebar-backdrop ${mobileOpen ? 'active' : ''}`}
        onClick={() => setMobileOpen(false)}
      />

      <div className={`sidebar ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Header */}
        <div className="sidebar-header">
          <div className="logo-section" onClick={() => handleTopicClick(null)} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">∑</div>
            <div className="logo-text">大學數學</div>
          </div>
        </div>

        {/* Course Chapter Tree */}
        <div className="sidebar-nav">
          {chaptersData.map((chapter) => {
            const isExpanded = !!expandedChapters[chapter.id];

            return (
              <div key={chapter.id} className="chapter-group">
                <div 
                  className="chapter-header"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <span className="chapter-title">
                    <svg style={{ width: '16px', height: '16px', color: 'var(--accent-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {chapter.id === 'info' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      )}
                    </svg>
                    {chapter.title}
                  </span>
                  <svg 
                    className={`chapter-arrow ${isExpanded ? 'expanded' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {isExpanded && (
                  <div className="topics-list">
                    {chapter.topics.map((topic) => {
                      const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
                      const isTopicExpanded = !!expandedTopics[topic.id];

                      return (
                        <div key={topic.id} className="topic-group">
                          <div 
                            className={`topic-item ${activeTopicId === topic.id ? 'active' : ''}`}
                            onClick={() => {
                              handleTopicClick(topic.id);
                              if (hasSubtopics) {
                                toggleTopic(topic.id);
                              }
                            }}
                            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                          >
                            <span style={{ flex: 1, padding: '4px 0' }}>
                              {topic.title}
                            </span>
                            {hasSubtopics && (
                              <svg 
                                className={`topic-arrow ${isTopicExpanded ? 'expanded' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            )}
                          </div>

                          {hasSubtopics && isTopicExpanded && (
                            <div className="subtopics-list">
                              {topic.subtopics.map((subtopic) => (
                                <div
                                  key={subtopic.id}
                                  className={`subtopic-item ${activeTopicId === subtopic.id ? 'active' : ''}`}
                                  onClick={() => handleTopicClick(subtopic.id)}
                                >
                                  <span>{subtopic.title}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

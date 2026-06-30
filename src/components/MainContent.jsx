import { chaptersData } from '../data/chapters';

export default function MainContent({ activeTopicId, setActiveTopicId }) {
  // Find the active topic/subtopic and its parent/chapter
  let activeTopic = null;
  let activeChapter = null;
  let parentTopic = null;

  if (activeTopicId) {
    for (const chapter of chaptersData) {
      // 1. Check if it's a top-level topic
      const topic = chapter.topics.find(t => t.id === activeTopicId);
      if (topic) {
        activeTopic = topic;
        activeChapter = chapter;
        break;
      }
      
      // 2. Check if it's a subtopic under a topic
      for (const t of chapter.topics) {
        if (t.subtopics) {
          const subtopic = t.subtopics.find(s => s.id === activeTopicId);
          if (subtopic) {
            activeTopic = subtopic;
            parentTopic = t;
            activeChapter = chapter;
            break;
          }
        }
      }
      if (activeTopic) break;
    }
  }

  // Math inline formatter helper
  const renderMathOnly = (text) => {
    if (!text) return "";
    const parts = text.split(/\$(.*?)\$/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return (
          <span key={index} className="math-inline">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  // Simple Markdown & Math Renderer
  const renderMarkdownAndMath = (text) => {
    if (!text || text.trim() === '' || text.trim() === '未有此內容') {
      return (
        <div style={{ color: 'var(--text-tertiary)', fontStyle: 'italic', textAlign: 'center', padding: '40px 0', fontSize: '1.1rem' }}>
          未有此內容
        </div>
      );
    }

    const lines = text.split('\n');
    return (
      <div className="math-serif" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
        {lines.map((line, idx) => {
          // Check headers
          if (line.startsWith('# ')) {
            return (
              <h1 key={idx} style={{ margin: '28px 0 14px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', color: 'var(--text-primary)', fontSize: '1.8rem' }}>
                {renderMathOnly(line.slice(2))}
              </h1>
            );
          }
          if (line.startsWith('## ')) {
            return (
              <h2 key={idx} style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.4rem' }}>
                {renderMathOnly(line.slice(3))}
              </h2>
            );
          }
          if (line.startsWith('### ')) {
            return (
              <h3 key={idx} style={{ margin: '20px 0 10px 0', color: 'var(--text-primary)', fontSize: '1.15rem' }}>
                {renderMathOnly(line.slice(4))}
              </h3>
            );
          }
          // Bullet point lists
          if (line.startsWith('- ')) {
            return (
              <li key={idx} style={{ marginLeft: '20px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
                {renderMathOnly(line.slice(2))}
              </li>
            );
          }
          // Block equations $$ ... $$
          if (line.trim().startsWith('$$') && line.trim().endsWith('$$')) {
            const eq = line.trim().slice(2, -2);
            return (
              <div key={idx} className="math-block">
                {eq}
              </div>
            );
          }
          // Normal paragraphs
          return (
            <p key={idx} style={{ margin: '14px 0', minHeight: '1.2em', color: 'var(--text-secondary)' }}>
              {renderMathOnly(line)}
            </p>
          );
        })}
      </div>
    );
  };

  // Welcome Dashboard View (Table of Contents)
  if (!activeTopic) {
    return (
      <div className="content-wrapper">
        <div className="main-content" style={{ padding: '40px', overflowY: 'auto', height: '100%', width: '100%' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
              大學數學資學網
            </h1>
            <p style={{ color: 'var(--text-tertiary)', marginBottom: '32px', fontSize: '1rem' }}>
              各學科單元目錄索引
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {chaptersData.map((chapter) => (
                <div 
                  key={chapter.id} 
                  id={chapter.id} 
                  style={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-color)', 
                    borderRadius: 'var(--radius-md)',
                    padding: '24px',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'border-color 0.5s ease'
                  }}
                >
                  <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--accent-primary)', fontWeight: '600' }}>
                    {chapter.title}
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
                    {chapter.topics.map(topic => {
                      const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;
                      return (
                        <div 
                          key={topic.id} 
                          style={{ 
                            fontSize: '0.9rem', 
                            color: 'var(--text-secondary)', 
                            padding: '12px 16px',
                            borderRadius: 'var(--radius-sm)',
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            transition: 'var(--transition)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px'
                          }}
                          className="syllabus-item-hover"
                        >
                          <div 
                            onClick={() => setActiveTopicId(topic.id)}
                            style={{ cursor: 'pointer', fontWeight: '500', transition: 'var(--transition)' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                          >
                            {topic.title}
                          </div>
                          
                          {hasSubtopics && (
                            <div style={{ 
                              display: 'flex', 
                              flexDirection: 'column', 
                              gap: '6px', 
                              paddingLeft: '12px', 
                              borderLeft: '1px dashed var(--border-color)',
                              marginTop: '4px'
                            }}>
                              {topic.subtopics.map(subtopic => (
                                <div 
                                  key={subtopic.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveTopicId(subtopic.id);
                                  }}
                                  style={{ 
                                    fontSize: '0.8rem', 
                                    color: 'var(--text-tertiary)', 
                                    cursor: 'pointer',
                                    transition: 'var(--transition)'
                                  }}
                                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-secondary)'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                                >
                                  {subtopic.title}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Selected Chapter Reading View
  return (
    <div className="content-wrapper">
      <div className="main-content" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '24px 40px' }}>
        
        {/* Breadcrumbs and active section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div className="breadcrumbs" style={{ margin: '0' }}>
            <span 
              onClick={() => setActiveTopicId(null)}
              style={{ cursor: 'pointer', transition: 'var(--transition)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              大學數學
            </span>
            <span>/</span>
            <span 
              onClick={() => {
                setActiveTopicId(null);
                setTimeout(() => {
                  const element = document.getElementById(activeChapter.id);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.style.borderColor = 'var(--accent-primary)';
                    setTimeout(() => {
                      element.style.borderColor = 'var(--border-color)';
                    }, 1500);
                  }
                }, 100);
              }}
              style={{ cursor: 'pointer', transition: 'var(--transition)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
            >
              {activeChapter.title}
            </span>
            <span>/</span>
            {parentTopic && (
              <>
                <span 
                  onClick={() => setActiveTopicId(parentTopic.id)}
                  style={{ cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                >
                  {parentTopic.title}
                </span>
                <span>/</span>
              </>
            )}
            <span style={{ color: 'var(--accent-primary)', fontWeight: '500' }}>{activeTopic.title}</span>
          </div>
        </div>

        {/* Content Box */}
        <div style={{ 
          flex: 1, 
          border: '1px solid var(--border-color)', 
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '40px',
            backgroundColor: 'var(--bg-secondary)'
          }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              {activeTopic.title}
            </h1>
            {activeTopic.component ? (
              <div className="math-serif" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                <activeTopic.component />
              </div>
            ) : (
              renderMarkdownAndMath(activeTopic.content)
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

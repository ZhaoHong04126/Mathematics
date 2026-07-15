import { useState, useEffect, useRef } from 'react';

// 行內數學公式
export function MathInline({ math }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise && ref.current) {
      window.MathJax.typesetPromise([ref.current]).catch((err) => console.error(err));
    }
  }, [math]);
  return <span ref={ref} className="math-inline">{`\\(${math}\\)`}</span>;
}

// 區塊數學公式
export function MathBlock({ math }) {
  const ref = useRef(null);
  useEffect(() => {
    if (window.MathJax && window.MathJax.typesetPromise && ref.current) {
      window.MathJax.typesetPromise([ref.current]).catch((err) => console.error(err));
    }
  }, [math]);
  return <div ref={ref} className="math-block">{`\\[${math}\\]`}</div>;
}

// 定義區塊
export function Definition({ title, children }) {
  return (
    <div className="definition-block math-serif">
      <div className="block-header">
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        定義：{title}
      </div>
      <div className="block-body">{children}</div>
    </div>
  );
}

// 定理區塊
export function Theorem({ title, children }) {
  return (
    <div className="theorem-block math-serif">
      <div className="block-header">
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        定理：{title}
      </div>
      <div className="block-body">{children}</div>
    </div>
  );
}

// 例題區塊
export function Example({ title, children }) {
  return (
    <div className="example-block math-serif">
      <div className="block-header">
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        例題：{title}
      </div>
      <div className="block-body">{children}</div>
    </div>
  );
}

// 解答區塊 (嵌套在例題中)
export function Solution({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ marginTop: '16px' }}>
      <button 
        className="solution-toggle-btn" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
      >
        <svg 
          style={{ width: '12px', height: '12px', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        {isOpen ? '隱藏解答' : '顯示解答'}
      </button>
      {isOpen && (
        <div className="solution-body math-serif">
          {children}
        </div>
      )}
    </div>
  );
}

// 證明區塊
export function Proof({ title = "證明", children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="proof-block math-serif">
      <div 
        className="proof-header" 
        onClick={() => setIsOpen(!isOpen)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <span>{title}</span>
        <svg 
          style={{ width: '12px', height: '12px', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
      {isOpen && (
        <div className="proof-body">
          {children}
        </div>
      )}
    </div>
  );
}

// 練習題區塊
export function Exercises({ children }) {
  return (
    <div className="exercises-card math-serif">
      <div className="exercises-title">
        <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        練習題
      </div>
      <div className="exercise-list">
        {children}
      </div>
    </div>
  );
}

// 練習題單項
export function ExerciseItem({ children }) {
  return <div className="exercise-item">{children}</div>;
}

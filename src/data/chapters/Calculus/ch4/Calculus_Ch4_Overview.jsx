import { Definition } from '../../../../components/MathBlocks';

export default function Calculus_Ch4_Overview({ setActiveTopicId }) {
  const subtopics = [
    { 
      id: '1-4-1', 
      title: '4.1 導函數與函數性質', 
      desc: '運用一階與二階導數，判別函數的遞增減與凹向性，並找出極大、極小值與反曲點，以精確描繪函數圖形。'
    },
    { 
      id: '1-4-2', 
      title: '4.2 極值問題', 
      desc: '介紹如何在給定區間內尋找函數的絕對極端值，並將此概念應用於最佳化問題中，尋求現實情境的最佳解。'
    },
    { 
      id: '1-4-3', 
      title: '4.3 均值定理', 
      desc: '微積分最重要的理論基石。羅爾定理與均值定理建立了函數的「平均變化率」與「瞬時變化率」之間的橋樑。'
    },
    { 
      id: '1-4-4', 
      title: '4.4 洛必達法則', 
      desc: '利用微分的技巧來計算極限中的不定型（如 0/0 或 ∞/∞），大幅簡化複雜極限問題的運算。'
    }
  ];

  return (
    <div>
      {/* 標題與導讀 */}
      <h2 style={{ 
        borderLeft: '4px solid var(--accent-primary)', 
        paddingLeft: '12px', 
        margin: '24px 0 16px 0', 
        fontSize: '1.6rem',
        color: 'var(--text-primary)',
        fontWeight: '600'
      }}>
        本章導讀與學習指引 (Chapter Guide)
      </h2>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在第三章中，我們掌握了計算各種函數導數的技巧。而本章**第四章：微分的應用**，我們將把這些數學工具轉化為強大的分析武器。我們不僅會利用一階與二階導數來探索函數的性質與圖形特徵，還會探討如何尋找函數的極值並解決最佳化問題。同時，我們也會介紹微積分的核心理論「均值定理」，以及運用微分來快速計算不定型極限的「洛必達法則」。
      </p>

      {/* 學習目標卡片 */}
      <Definition title="第四章 學習目標 (Learning Objectives)">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>掌握函數性質與圖形：</strong> 熟練運用導數精確地判斷函數的遞增減、凹向性，並找出極大、極小值與反曲點。
          </li>
          <li>
            <strong>解決極端值問題：</strong> 能夠在給定區間找出函數的絕對極值，並處理生活中的最佳化應用題。
          </li>
          <li>
            <strong>理解均值定理：</strong> 掌握羅爾定理與均值定理的核心概念，並了解其在理論推導與估算上的意義。
          </li>
          <li>
            <strong>計算不定型極限：</strong> 熟悉並正確地運用洛必達法則解決各種 0/0 或 ∞/∞ 型態的複雜極限問題。
          </li>
        </ul>
      </Definition>

      {/* 單元導覽列表 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        本章單元目錄索引 (Syllabus)
      </h3>
      <p style={{ color: 'var(--text-tertiary)', marginBottom: '20px', fontSize: '0.95rem' }}>
        點擊下方單元卡片即可快速跳轉至該節詳細內容：
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', margin: '20px 0 40px 0' }}>
        {subtopics.map(topic => (
          <div 
            key={topic.id}
            onClick={() => setActiveTopicId(topic.id)}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'var(--transition)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: 'var(--shadow-sm)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.05rem', fontWeight: '600', margin: 0 }}>
              {topic.title}
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.6', margin: 0 }}>
              {topic.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

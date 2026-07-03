import { Definition } from '../../../../components/MathBlocks';

export default function Calculus_Ch3_Overview({ setActiveTopicId }) {
  const subtopics = [
    { 
      id: '1-3-1', 
      title: '3.1 導數的定義與切線斜率', 
      desc: '導數的本質是瞬時變化率。本單元介紹如何以割線逼近切線的極限過程，建立導數（Derivatives）的幾何與物理定義。' 
    },
    { 
      id: '1-3-2', 
      title: '3.2 導數函數與可微性', 
      desc: '研究將導數視為一個新函數（導函數）。探討函數在某點可微的條件，並深入分析「可微必連續，連續不一定可微」的性質（如絕對值函數的尖點）。' 
    },
    { 
      id: '1-3-3', 
      title: '3.3 基本微分公式與乘除法法則', 
      desc: '學習核心的求導工具。掌握常數、冪函數（Power Rule）、常數倍數與和差公式，以及極其重要的乘法法則與除法法則。' 
    },
    { 
      id: '1-3-4', 
      title: '3.4 常見函數的導數', 
      desc: '推導並熟記各種常用初等函數的導數，包括六個基本三角函數、指數函數與對數函數的求導公式。' 
    },
    { 
      id: '1-3-5', 
      title: '3.5 連鎖法則與隱函數微分', 
      desc: '掌握連鎖法則（Chain Rule）以解決複合函數微分。此外，學習如何對未寫成顯式的隱函數方程（如圓方程）進行求導。' 
    },
    { 
      id: '1-3-6', 
      title: '3.6 對數微分法與高階導數', 
      desc: '介紹利用對數律來簡化複雜乘除分式的對數微分求導技巧，並探討二階、三階乃至高階導數的物理與幾何意義。' 
    },
    { 
      id: '1-3-7', 
      title: '3.7 (補充) 雙曲函數的導數與反函數的導數', 
      desc: '（補充單元）推導雙曲函數（sinh, cosh 等）的導數，以及利用反函數求導定理推導反三角函數的求導公式。' 
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
        歡迎來到微積分的第二大支柱——<strong>微分 (Differentiation)</strong>！如果說極限是微積分的基石，那麼微分就是微積分用來觀測世界變化的眼睛。在日常生活中，我們無時無刻不面對著「變化」：速度的改變、溫度的升降、金融市場的波動。微分的核心任務，就是將這些「瞬時變化率」在數學上進行精確的量化與分析。透過求導，我們能輕易地求解曲線在任意一點的切線斜率，並為後續研究函數的極值、最優化問題提供強大的數學武器。
      </p>

      {/* 學習目標卡片 */}
      <Definition title="第三章 學習目標 (Learning Objectives)">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>理解導數與幾何意義：</strong> 深入掌握導數的極限定義，並能寫出曲線在給定點的切線方程式。
          </li>
          <li>
            <strong>判定可微與連續性：</strong> 理解可微性 (Differentiability) 的定義，並能用極限分析函數在分段點或尖點（如絕對值）是否可微。
          </li>
          <li>
            <strong>精通求導基本法則：</strong> 熟練運用冪函數微分、乘除法法則與連鎖法則 (Chain Rule)，對任意複合函數進行求導。
          </li>
          <li>
            <strong>掌握初等函數與特殊求導：</strong> 熟記三角、反三角、指數與對數的求導公式，並能靈活運用隱函數求導法與對數微分法解決問題。
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

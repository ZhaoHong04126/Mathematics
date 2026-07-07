import { Definition, MathInline } from '../../../../components/MathBlocks';

export default function Calculus_Ch5_Overview({ setActiveTopicId }) {
  const subtopics = [
    { 
      id: '1-5-1', 
      title: '5.1 反導函數', 
      desc: '微分的逆向過程。已知一個函數的導函數，還原求解其原函數，並理解積分常數 C 的幾何意義。' 
    },
    { 
      id: '1-5-2', 
      title: '5.2 面積問題', 
      desc: '探討求解不規則曲線下方圖形面積的幾何挑戰，引導讀者使用矩形分割法逼近，奠定定積分的幾何思維。' 
    },
    { 
      id: '1-5-3', 
      title: '5.3 定積分', 
      desc: '藉由黎曼和 (Riemann Sum) 的極限過程建立定積分的數學定義，並介紹其核心代數與幾何運算性質。' 
    },
    { 
      id: '1-5-4', 
      title: '5.4 微積分基本定理 (FTC)', 
      desc: '微積分學的精髓。完美連結微分（斜率）與積分（面積）這兩個核心運算，是快速計算定積分的利器。' 
    },
    { 
      id: '1-5-5', 
      title: '5.5 不定積分', 
      desc: '定義反導函數集合的標準符號表示法，整理求各類初等函數不定積分的基本公式與運算法則。' 
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
        歡迎來到微積分的另一座宏偉高峰——<strong>積分學 (Integral Calculus)</strong>！在前幾章中，我們深入研究了「微分（求變化率）」，而本章將向您展示其最完美的鏡像對稱概念——「積分（求累積量）」。
        我們將從微分的逆向工程「反導函數」出發；接著，為了解決經典的「曲線下面積」幾何問題，我們將構造精密的黎曼和與定積分。最後，我們將見證微積分中最震撼人心的定理——「微積分基本定理 (FTC)」，它完美地將微分與積分兩條平行線交織在一起，並延伸出不定積分的系統運算。
      </p>

      {/* 學習目標卡片 */}
      <Definition title="第五章 學習目標 (Learning Objectives)">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>掌握反導函數求法：</strong> 理解反導函數的本質，能對基礎函數進行逆向微分，並解決給定初值條件的物理或幾何問題。
          </li>
          <li>
            <strong>理解定積分與黎曼和：</strong> 理解如何利用無窮細分的矩形面積逼近曲線下的面積，掌握黎曼和 <MathInline math="\sum_{i=1}^n f(x_i^*)\Delta x" /> 的極限即為定積分的核心幾何思想與定義。
          </li>
          <li>
            <strong>精通定積分運算性質：</strong> 熟悉定積分的代數性質，包含線性組合、積分區間拆分、對稱性積分（奇偶函數）以及積分的大小比較。
          </li>
          <li>
            <strong>應用微積分基本定理 (FTC)：</strong> 深刻理解第一與第二基本定理，學會利用 <MathInline math="\frac{d}{dx}\int_a^x f(t)dt = f(x)" /> 求變上限積分的導數，以及利用反導函數 <MathInline math="F(b) - F(a)" /> 高效計算定積分。
          </li>
          <li>
            <strong>熟練不定積分公式：</strong> 掌握不定積分的記號表示，熟記冪函數、指數函數、對數函數與三角函數等基本積分公式。
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

import { Definition, MathInline } from '../../../../components/MathBlocks';

export default function Calculus_Ch6_Overview({ setActiveTopicId }) {
  const subtopics = [
    { 
      id: '1-6-1', 
      title: '6.1 代換積分法', 
      desc: '微分「連鎖法則」的逆運算。透過引入新變數代換，將複合函數的積分簡化為基本積分公式型態。' 
    },
    { 
      id: '1-6-2', 
      title: '6.2 分部積分法', 
      desc: '微分「乘法法則」的逆運算。用於計算兩個不同類型函數乘積的積分，是極為強大且通用的工具。' 
    },
    { 
      id: '1-6-3', 
      title: '6.3 三角積分', 
      desc: '探討含有三角函數冪次乘積（如正弦/餘弦、正切/餘割）的積分計算技巧與乘積化簡法則。' 
    },
    { 
      id: '1-6-4', 
      title: '6.4 三角代換法', 
      desc: '藉由構造直角三角形與三角恆等式，將根號內含有平方和或平方差（如 \\(a^2-x^2\\)、\\(a^2+x^2\\)）的被積函數化簡。' 
    },
    { 
      id: '1-6-5', 
      title: '6.5 部分分式積分法', 
      desc: '將複雜的有理函數拆解為數個簡單部分分式之和，進而利用對數與反三角函數公式進行逐項積分。' 
    },
    { 
      id: '1-6-6', 
      title: '6.6 瑕積分', 
      desc: '將積分推廣至無窮區間，或被積函數具有無窮間斷點的情況，學習收斂與發散的定義與比較判定法。' 
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
        在第五章中，我們學習了積分的基本概念與微積分基本定理，並熟悉了基本函數的積分公式。然而，在面對複雜的實際問題時，大多數被積函數無法直接套用基本公式。
        本章<strong>第六章：積分技巧 (Techniques of Integration)</strong> 將為您裝備一系列強大的代數與解析武器。我們將學習如何利用變數代換簡化複合函數，如何利用分部積分處理函數乘積，如何運用三角函數的代數特性與幾何代換化簡根式，以及如何將有理函數拆解為部分分式。最後，我們將探討區間無界或函數無界的「瑕積分」，將積分的概念擴展到無窮的領域。
      </p>

      {/* 學習目標卡片 */}
      <Definition title="第六章 學習目標 (Learning Objectives)">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>熟練代換積分法：</strong> 靈活運用變數代換將複合函數化簡為基本積分公式，掌握定積分與不定積分的代換變數邊界變更。
          </li>
          <li>
            <strong>精通分部積分法：</strong> 熟練掌握分部積分公式 <MathInline math="\int u \, dv = uv - \int v \, du" />，並能運用 LIATE 原則選取 <MathInline math="u" /> 與 <MathInline math="dv" />，解決循環積分等典型題型。
          </li>
          <li>
            <strong>掌握三角積分與三角代換：</strong> 熟悉三角函數的冪次積分規則；能針對含有 <MathInline math="\sqrt{a^2-x^2}" />、<MathInline math="\sqrt{a^2+x^2}" /> 或 <MathInline math="\sqrt{x^2-a^2}" /> 的式子，選取正確的三角代換（如 <MathInline math="x = a\sin\theta, x=a\tan\theta, x=a\sec\theta" />）化簡積分。
          </li>
          <li>
            <strong>熟練部分分式拆解法：</strong> 能將各式有理函數進行多項式除法、因式分解，並正確拆解為部分分式進行求和積分。
          </li>
          <li>
            <strong>理解與計算瑕積分：</strong> 掌握第一類與第二類瑕積分的極限定義，能夠正確判斷其收斂性 (Convergence) 與發散性 (Divergence) 並計算其收斂值。
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

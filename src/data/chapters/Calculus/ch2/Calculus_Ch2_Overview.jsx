import { Definition, MathInline } from '../../../../components/MathBlocks';

export default function Calculus_Ch2_Overview({ setActiveTopicId }) {
  const subtopics = [
    { 
      id: '1-2-1', 
      title: '2.1 極限的直觀定義', 
      desc: '極限是微積分的基石。本單元介紹如何以直觀與符號方式理解函數在某一點的逼近趨勢，並探討單側極限與極限存在的充要條件。' 
    },
    { 
      id: '1-2-2', 
      title: '2.2 極限的嚴格定義與運算法則', 
      desc: '探討柯西所建立的嚴格極限數學語言—— ε-δ 定義。學習如何使用嚴謹的代數論證證明極限，並推導基本極限運算法則與夾擠定理。' 
    },
    { 
      id: '1-2-3', 
      title: '2.3 無窮極限與漸近線', 
      desc: '研究當自變數趨向正負無窮，或函數值無限膨脹時的極限行為。學習水平漸近線、垂直漸近線與斜漸近線的代數判定與幾何特徵。' 
    },
    { 
      id: '1-2-4', 
      title: '2.4 函數的連續性與重要定理', 
      desc: '定義函數在單點與區間的連續性，介紹連續函數的代數性質，並探討介值定理 (IVT) 等極其重要的微積分基本定理與實際應用。' 
    },
    { 
      id: '1-2-5', 
      title: '2.5 常用極限公式', 
      desc: '彙整微積分中在有理函數、無理函數、三角函數、指數函數與對數函數下最常見的基本極限公式，方便快速檢索與化簡。' 
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
        歡迎來到微積分的核心基礎——<strong>極限與連續性 (Limits and Continuity)</strong>！如果說函數是微積分的原料，那麼「極限」就是提煉出微分與積分的熔爐。微積分中所有的基本概念（如切線斜率、瞬時速度、曲線下的面積）在本質上都是某種極限過程。透過極限，我們得以在數學上精確地處理「無限逼近」與「無窮大」的概念，並建立函數「連續性」的科學定義。
      </p>

      {/* 學習目標卡片 */}
      <Definition title="第二章 學習目標 (Learning Objectives)">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>掌握極限直觀與運算：</strong> 理解極限的本質是「趨勢而非等於」，並熟練運用極限法則（極限四則運算、夾擠定理）計算函數極限。
          </li>
          <li>
            <strong>理解嚴格的數理邏輯：</strong> 克服從直觀到嚴格的邏輯跨越，理解並學會使用 <MathInline math="\varepsilon-\delta" /> 定義證明簡單函數的極限。
          </li>
          <li>
            <strong>判定漸近線行為：</strong> 熟練掌握自變數或函數值趨近於無窮大時的極限分析，並能求出函數的所有水平與垂直漸近線。
          </li>
          <li>
            <strong>應用連續性定理：</strong> 掌握單點及區間連續的充要條件，並學會運用「介值定理 (Intermediate Value Theorem)」證明方程式根的存在性與估值。
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

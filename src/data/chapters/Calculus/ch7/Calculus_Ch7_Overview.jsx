import { Definition, MathInline } from '../../../../components/MathBlocks';

export default function Calculus_Ch7_Overview({ setActiveTopicId }) {
  const subtopics = [
    { 
      id: '1-7-1', 
      title: '7.1 兩曲線間的面積', 
      desc: '利用定積分計算平面上由兩條或多條函數曲線所圍成的封閉區域面積。' 
    },
    { 
      id: '1-7-2', 
      title: '7.2 體積：圓盤與墊圈法', 
      desc: '計算旋轉體體積的經典方法。將立體圖形切片為圓盤或有孔墊圈，並將其體積進行積分加總。' 
    },
    { 
      id: '1-7-3', 
      title: '7.3 體積：圓柱殼法', 
      desc: '另一種計算旋轉體體積的方法。當旋轉軸平行於所切片的矩形時，將其展開為圓柱殼進行積分。' 
    },
    { 
      id: '1-7-4', 
      title: '7.4 弧長與旋轉曲面面積', 
      desc: '利用積分計算函數曲線的精確長度，以及該曲線繞特定軸旋轉所產生的曲面表面積。' 
    },
    { 
      id: '1-7-5', 
      title: '7.5 物理與工程應用', 
      desc: '將積分應用於解決實際物理問題，如計算變力作功 (Work)、流體靜壓力，以及尋找質量中心 (Center of Mass)。' 
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
        在前面的章節中，我們學會了計算定積分與各種積分技巧。本章<strong>第七章：積分的應用 (Applications of Integration)</strong> 將把這些抽象的數學工具，轉化為解決幾何與物理問題的利器。
        我們將不再侷限於求函數下方的面積，而是進一步探討如何計算兩曲線之間的面積、立體圖形（特別是旋轉體）的體積，甚至是曲線的長度與表面的面積。最後，我們也會展示微積分如何完美地解決物理學中的作功與形心等問題。
      </p>

      {/* 學習目標卡片 */}
      <Definition title="第七章 學習目標 (Learning Objectives)">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>計算幾何面積：</strong> 能夠設定正確的積分邊界與被積函數，求出兩條或多條交錯曲線所包圍的平面面積。
          </li>
          <li>
            <strong>掌握旋轉體體積：</strong> 熟悉 <strong>圓盤法/墊圈法 (Disk/Washer Method)</strong> 與 <strong>圓柱殼法 (Cylindrical Shells)</strong>，並能根據題型與旋轉軸判斷哪種方法較為簡便。
          </li>
          <li>
            <strong>曲線特徵計算：</strong> 運用積分公式推導並計算平滑曲線的 <strong>弧長 (Arc Length)</strong> 以及其旋轉所產生的 <strong>表面積 (Surface Area)</strong>。
          </li>
          <li>
            <strong>連結物理實務：</strong> 將黎曼和的概念應用於物理模型，解決變力彈簧作功、抽水作功以及幾何圖形的形心與質量中心計算。
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

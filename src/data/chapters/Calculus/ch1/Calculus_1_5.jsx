import { useState } from 'react';
import { Definition, Example, Solution, MathInline, MathBlock, Exercises, ExerciseItem } from '../../../../components/MathBlocks';

function ExpLogGraphViewer() {
  const [base, setBase] = useState(2); // 預設底數為 2
  
  // 依據底數動態調整滑桿 p 的範圍，以防點座標超出圖形邊界
  // 我們希望 a^p <= 5.8 且 p >= -3.5 (且當底數為 0.5 時，a^p <= 5.8 意即 p >= -2.5)
  const getSliderRange = (a) => {
    if (a === 2) return { min: -3.0, max: 2.5 };
    if (a === Math.E) return { min: -3.0, max: 1.7 };
    if (a === 10) return { min: -3.0, max: 0.75 };
    if (a === 0.5) return { min: -2.5, max: 3.0 };
    return { min: -3.0, max: 3.0 };
  };

  const { min: minP, max: maxP } = getSliderRange(base);
  
  // 初始化 p 的值在範圍的中間偏右一點
  const [p, setP] = useState(1);

  // 確保切換底數時 p 在合理範圍內
  const handleBaseChange = (newBase) => {
    setBase(newBase);
    const range = getSliderRange(newBase);
    // 如果當前的 p 超出了新範圍，重置它
    if (p < range.min) setP(range.min);
    else if (p > range.max) setP(range.max);
  };

  const w = 360;
  const h = 360;
  const minX = -4;
  const maxX = 6;
  const minY = -4;
  const maxY = 6;

  // 坐標映射函數
  const mapX = (x) => ((x - minX) / (maxX - minX)) * w;
  const mapY = (y) => h - ((y - minY) / (maxY - minY)) * h;

  // 計算點座標
  const q = Math.pow(base, p); // q = a^p 也就是指數函數的 y 值，亦為對數函數的 x 值

  // 產生指數函數的繪圖路徑 (y = a^x)
  const getExpPath = () => {
    let pts = [];
    for (let x = -4; x <= 6; x += 0.05) {
      let y = Math.pow(base, x);
      if (y >= -4 && y <= 6) {
        pts.push({ x, y });
      }
    }
    if (pts.length === 0) return '';
    return `M ${mapX(pts[0].x)} ${mapY(pts[0].y)} ` + pts.slice(1).map(pt => `L ${mapX(pt.x)} ${mapY(pt.y)}`).join(' ');
  };

  // 產生對數函數的繪圖路徑 (y = log_a(x))
  const getLogPath = () => {
    let pts = [];
    // 對數函數定義域為 x > 0
    for (let x = 0.01; x <= 6; x += 0.02) {
      let y = Math.log(x) / Math.log(base);
      if (y >= -4 && y <= 6) {
        pts.push({ x, y });
      }
    }
    if (pts.length === 0) return '';
    return `M ${mapX(pts[0].x)} ${mapY(pts[0].y)} ` + pts.slice(1).map(pt => `L ${mapX(pt.x)} ${mapY(pt.y)}`).join(' ');
  };

  // 生成格線
  const renderGrid = () => {
    let gridLines = [];
    for (let i = minX + 1; i < maxX; i++) {
      if (i === 0) continue;
      // 垂直線
      gridLines.push(
        <line 
          key={`v-${i}`} 
          x1={mapX(i)} 
          y1={0} 
          x2={mapX(i)} 
          y2={h} 
          stroke="var(--border-color)" 
          strokeWidth="0.5" 
          opacity="0.3" 
        />
      );
    }
    for (let i = minY + 1; i < maxY; i++) {
      if (i === 0) continue;
      // 水平線
      gridLines.push(
        <line 
          key={`h-${i}`} 
          x1={0} 
          y1={mapY(i)} 
          x2={w} 
          y2={mapY(i)} 
          stroke="var(--border-color)" 
          strokeWidth="0.5" 
          opacity="0.3" 
        />
      );
    }
    return gridLines;
  };

  return (
    <div style={{
      margin: '24px 0',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden'
    }}>
      {/* 頂部標題 */}
      <div style={{
        padding: '14px 20px',
        fontWeight: '700',
        fontSize: '0.95rem',
        borderBottom: '1px solid var(--border-color)',
        color: 'var(--accent-primary)',
        backgroundColor: 'rgba(139, 92, 246, 0.03)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        指數與對數函數互動式對稱圖形 (Exp & Log Symmetry Viewer)
      </div>

      {/* 主體區塊 */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: '20px',
        gap: '24px',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {/* 左側 SVG 圖形 */}
        <div style={{ position: 'relative' }}>
          <svg 
            width={w} 
            height={h} 
            style={{ 
              backgroundColor: 'var(--bg-primary)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-sm)',
              overflow: 'visible'
            }}
          >
            {/* 格線 */}
            {renderGrid()}

            {/* 坐標軸 */}
            <line x1="0" y1={mapY(0)} x2={w} y2={mapY(0)} stroke="var(--text-tertiary)" strokeWidth="1.2" opacity="0.8" />
            <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={h} stroke="var(--text-tertiary)" strokeWidth="1.2" opacity="0.8" />
            
            {/* 軸箭頭 */}
            <polygon points={`${w},${mapY(0)-4} ${w+8},${mapY(0)} ${w},${mapY(0)+4}`} fill="var(--text-tertiary)" />
            <polygon points={`${mapX(0)-4},0 ${mapX(0)},-8 ${mapX(0)+4},0`} fill="var(--text-tertiary)" />

            {/* 坐標軸標籤 */}
            <text x={w - 10} y={mapY(0) + 18} fill="var(--text-secondary)" fontSize="11" fontWeight="600">x</text>
            <text x={mapX(0) - 15} y={15} fill="var(--text-secondary)" fontSize="11" fontWeight="600">y</text>
            
            {/* 刻度標籤 (Origin) */}
            <text x={mapX(0) - 12} y={mapY(0) + 14} fill="var(--text-tertiary)" fontSize="9">0</text>
            {/* X 軸刻度 1 */}
            <line x1={mapX(1)} y1={mapY(0)-3} x2={mapX(1)} y2={mapY(0)+3} stroke="var(--text-tertiary)" />
            <text x={mapX(1)} y={mapY(0)+14} fill="var(--text-tertiary)" fontSize="9" textAnchor="middle">1</text>
            {/* Y 軸刻度 1 */}
            <line x1={mapX(0)-3} y1={mapY(1)} x2={mapX(0)+3} y2={mapY(1)} stroke="var(--text-tertiary)" />
            <text x={mapX(0)-10} y={mapY(1)+3} fill="var(--text-tertiary)" fontSize="9" textAnchor="end">1</text>

            {/* 對稱軸 y = x (虛線) */}
            <line 
              x1={mapX(-3.8)} 
              y1={mapY(-3.8)} 
              x2={mapX(5.8)} 
              y2={mapY(5.8)} 
              stroke="var(--text-tertiary)" 
              strokeWidth="1.2" 
              strokeDasharray="4 4" 
              opacity="0.6"
            />
            <text x={mapX(5.0)} y={mapY(5.2)} fill="var(--text-tertiary)" fontSize="10" fontStyle="italic">y = x</text>

            {/* 函數曲線 1： y = a^x (指數函數) */}
            <path 
              d={getExpPath()} 
              fill="none" 
              stroke="var(--accent-primary)" 
              strokeWidth="2.2" 
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0px 0px 2px var(--accent-primary-glow))' }}
            />

            {/* 函數曲線 2： y = log_a(x) (對數函數) */}
            <path 
              d={getLogPath()} 
              fill="none" 
              stroke="var(--accent-secondary)" 
              strokeWidth="2.2" 
              strokeLinecap="round"
              style={{ filter: 'drop-shadow(0px 0px 2px rgba(6, 182, 212, 0.2))' }}
            />

            {/* 互動點投影輔助線與點 */}
            {q >= -4 && q <= 6 && (
              <>
                {/* 投影到坐標軸 (P1: 指數點) */}
                <line x1={mapX(p)} y1={mapY(0)} x2={mapX(p)} y2={mapY(q)} stroke="var(--accent-primary)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                <line x1={mapX(0)} y1={mapY(q)} x2={mapX(p)} y2={mapY(q)} stroke="var(--accent-primary)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />

                {/* 投影到坐標軸 (P2: 對數點) */}
                <line x1={mapX(q)} y1={mapY(0)} x2={mapX(q)} y2={mapY(p)} stroke="var(--accent-secondary)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />
                <line x1={mapX(0)} y1={mapY(p)} x2={mapX(q)} y2={mapY(p)} stroke="var(--accent-secondary)" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5" />

                {/* P1 與 P2 的對稱連接線 (垂直於 y = x) */}
                <line x1={mapX(p)} y1={mapY(q)} x2={mapX(q)} y2={mapY(p)} stroke="var(--accent-warm)" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

                {/* 指數函數點 P1(p, a^p) */}
                <circle cx={mapX(p)} cy={mapY(q)} r="5" fill="var(--accent-primary)" stroke="var(--bg-primary)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 0px 3px var(--accent-primary))' }} />
                <text x={mapX(p) + 8} y={mapY(q) - 8} fill="var(--text-primary)" fontSize="10" fontWeight="600" className="math-serif">
                  P₁({p.toFixed(2)}, {q.toFixed(2)})
                </text>

                {/* 對數函數點 P2(a^p, p) */}
                <circle cx={mapX(q)} cy={mapY(p)} r="5" fill="var(--accent-secondary)" stroke="var(--bg-primary)" strokeWidth="1.5" style={{ filter: 'drop-shadow(0px 0px 3px var(--accent-secondary))' }} />
                <text x={mapX(q) + 8} y={mapY(p) + 14} fill="var(--text-primary)" fontSize="10" fontWeight="600" className="math-serif">
                  P₂({q.toFixed(2)}, {p.toFixed(2)})
                </text>
              </>
            )}
          </svg>
        </div>

        {/* 右側 控制面板 */}
        <div style={{
          flex: '1',
          minWidth: '260px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* 底數切換按鈕 */}
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '8px' }}>
              選擇底數 (Base a)：
            </span>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { name: 'a = 2', val: 2 },
                { name: 'a = e', val: Math.E, label: 'e ≈ 2.718' },
                { name: 'a = 10', val: 10 },
                { name: 'a = 0.5', val: 0.5 }
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => handleBaseChange(opt.val)}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: base === opt.val ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.02)',
                    color: base === opt.val ? '#fff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontWeight: base === opt.val ? '700' : 'normal',
                    transition: 'all 0.2s ease',
                    boxShadow: base === opt.val ? '0 0 8px var(--accent-primary-glow)' : 'none'
                  }}
                >
                  {opt.label || opt.name}
                </button>
              ))}
            </div>
          </div>

          {/* 自變數 p 滑桿控制 */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              <span>設定指數輸入 p (P₁ 的 x 座標)：</span>
              <span style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>p = {p.toFixed(2)}</span>
            </div>
            <input 
              type="range" 
              min={minP} 
              max={maxP} 
              step="0.05" 
              value={p} 
              onChange={(e) => setP(parseFloat(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--accent-primary)',
                cursor: 'pointer'
              }}
            />
          </div>

          {/* 點資訊卡片 */}
          <div style={{
            padding: '12px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255,255,255,0.01)',
            fontSize: '0.85rem',
            lineHeight: '1.6'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)' }}></span>
              <span style={{ color: 'var(--text-primary)' }}>
                指數函數點：y = {base === Math.E ? 'e' : base}^x
              </span>
            </div>
            <div style={{ paddingLeft: '14px', color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: '10px' }}>
              P₁ (x, y) = ({p.toFixed(2)}, {q.toFixed(2)})
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontWeight: '700' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)' }}></span>
              <span style={{ color: 'var(--text-primary)' }}>
                對數函數點：y = log_{base === Math.E ? 'e' : base}(x)
              </span>
            </div>
            <div style={{ paddingLeft: '14px', color: 'var(--text-secondary)', fontFamily: 'monospace', marginBottom: '10px' }}>
              P₂ (x, y) = ({q.toFixed(2)}, {p.toFixed(2)})
            </div>

            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '8px', fontSize: '0.8rem', color: 'var(--accent-warm)' }}>
              💡 觀察可知：P₁ 點與 P₂ 點的坐標恰好互換，這正是互為<strong>反函數</strong>的幾何核心特徵（對稱於直線 y = x）。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ch1_1_5() {
  return (
    <div>
      {/* 標題與引言 */}
      <h2 style={{ 
        borderLeft: '4px solid var(--accent-primary)', 
        paddingLeft: '12px', 
        margin: '24px 0 16px 0', 
        fontSize: '1.6rem',
        color: 'var(--text-primary)',
        fontWeight: '600'
      }}>
        1.5 指數與對數函數 (Exponential & Logarithmic Functions)
      </h2>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在微積分學與自然科學中，<strong>指數函數</strong>與其反函數——<strong>對數函數</strong>扮演著極其核心的角色。它們廣泛應用於描述生物族群成長、放射性衰變、利率複利以及許多變化率與當前大小成正比的自然現象。
      </p>

      {/* 一、指數函數的數學定義 */}
      <Definition title="指數函數 (Exponential Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設底數 <MathInline math="a" /> 為大於 <MathInline math="0" /> 且不等於 <MathInline math="1" /> 的實數。定義在實數集上的函數：
        </p>
        <MathBlock math="f(x) = a^x \quad (a > 0, \ a \neq 1)" />
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          稱為以 <MathInline math="a" /> 為底的<strong>指數函數</strong>。
        </p>
        
        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          基本性質與圖形特徵：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>定義域與值域：</strong>定義域為全體實數集 <MathInline math="\mathbb{R} = (-\infty, \infty)" />；值域為正實數集 <MathInline math="(0, \infty)" />。
          </li>
          <li>
            <strong>恆過定點：</strong>對任意底數 <MathInline math="a" />，當 <MathInline math="x = 0" /> 時，<MathInline math="a^0 = 1" />，故圖形必定通過點 <MathInline math="(0, 1)" />。
          </li>
          <li>
            <strong>單調性與漸近線：</strong>
            <br />
            - 當 <MathInline math="a > 1" /> 時，函數是嚴格遞增的。當 <MathInline math="x \to -\infty" /> 時，<MathInline math="a^x \to 0" />，所以 <MathInline math="y = 0" />（即 <MathInline math="x" /> 軸）為其<strong>水平漸近線</strong>。
            <br />
            - 當 <MathInline math="0 < a < 1" /> 時，函數是嚴格遞減的。當 <MathInline math="x \to \infty" /> 時，<MathInline math="a^x \to 0" />，同樣以 <MathInline math="y = 0" /> 為水平漸近線。
          </li>
        </ol>
      </Definition>

      {/* 自然指數函數與尤拉數 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-secondary)',
          backgroundColor: 'rgba(6, 182, 212, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          自然指數函數與尤拉數 e (Euler's Number)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            尤拉數 <MathInline math="e" /> 是在所有指數函數 (exponential function) 的底數中，<strong>最有用也最常用的一個</strong>。最主要的原因是因為以 <MathInline math="e" /> 為底的指數函數在微積分的微分與積分運算中非常方便。此外，在物理學與經濟學中，這個常數也有著足夠深刻的意義。
          </p>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '18px 0 8px 0' }}>
            1. 幾何切線斜率的觀點：
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
            我們觀察指數函數 <MathInline math="y = a^x" /> 在點 <MathInline math="(0, 1)" /> 處的切線斜率 <MathInline math="m" />（切線斜率的精確算法與定義將在後續介紹微積分導數時詳細討論）：
            <br />
            - 若底數 <MathInline math="a = 2 \implies m \approx 0.7" /> （斜率小於 1）
            <br />
            - 若底數 <MathInline math="a = 3 \implies m \approx 1.1" /> （斜率大於 1）
            <br />
            我們非常有興趣的是：<strong>何時切線斜率 <MathInline math="m = 1" /> ？</strong>
            <br />
            數學家定義：<strong>讓指數函數在點 <MathInline math="(0, 1)" /> 處的切線斜率恰好為 <MathInline math="1" /> 的那個底數 <MathInline math="a" />，就定義為 <MathInline math="e" /></strong>。
            <br />
            尤拉數 <MathInline math="e" /> 與圓周率 <MathInline math="\pi" /> 一樣，是一個超越數（無理數），其值為：
          </p>
          <MathBlock math="e \approx 2.71828\dots" />

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '18px 0 8px 0' }}>
            2. 複利計算法的觀點（銀行本利和）：
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            上述的幾何切線概念可能較為抽象，我們也可以用銀行存錢的<strong>複利計算方式</strong>來理解這個常數。
            <br />
            將年利率設為 <MathInline math="100\%" />。當存入 <MathInline math="1" /> 元到銀行，依一年內複利期數的不同，本利和的計算如下：
          </p>

          <div style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
              textAlign: 'left',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)'
            }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--text-primary)' }}>期數 (n)</th>
                  <th style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)', fontWeight: '600', color: 'var(--text-primary)' }}>本利和計算方式</th>
                  <th style={{ padding: '8px 12px', fontWeight: '600', color: 'var(--text-primary)' }}>本利和近似值</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>單期 (年複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="1 + 1" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>= 2.00000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>二期 (半年複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{2}\right)^2 = \frac{9}{4}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>= 2.25000</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>三期 (每四個月複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{3}\right)^3 = \frac{64}{27}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.37037</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>四期 (季複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{4}\right)^4" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.44141</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>十二期 (月複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{12}\right)^{12}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.61304</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>三百六十五期 (日複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{365}\right)^{365}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.71457</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>一千期</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{1000}\right)^{1000}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.71815</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>一萬期</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{10000}\right)^{10000}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.71827</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}>一千萬期 (連續複利)</td>
                  <td style={{ padding: '8px 12px', borderRight: '1px solid var(--border-color)' }}><MathInline math="\left(1 + \frac{1}{10000000}\right)^{10000000}" /></td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace' }}>≈ 2.71828</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            我們可以看到，當複利期數 <MathInline math="n" /> 越來越大時，本利和漸漸地逼近某個常數，這個常數就是 <MathInline math="e" />。
            <br />
            用數學式子來表達：
          </p>
          <MathBlock math="\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e" />

          {/* Remark */}
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            borderLeft: '3px solid var(--accent-secondary)',
            backgroundColor: 'rgba(6, 182, 212, 0.02)',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0'
          }}>
            <strong style={{ color: 'var(--accent-secondary)' }}>Remark: </strong>
            以 <MathInline math="e" /> 為底的指數函數為 <MathInline math="f(x) = e^x" />。
            其定義域為 <MathInline math="\mathbb{R}" />，值域為 <MathInline math="(0, \infty)" />。
            <br />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              (函數定義域、對應域、值域的詳細定義可參見 Chapter A / Section 1.1)
            </span>
          </div>
        </div>
      </div>

      {/* 二、對數函數的數學定義 */}
      <Definition title="對數函數 (Logarithmic Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          因為指數函數 <MathInline math="f(x) = a^x" /> 是一對一函數，所以它一定存在反函數。這個反函數即稱為以 <MathInline math="a" /> 為底的<strong>對數函數</strong>，記作 <MathInline math="\log_a x" />：
        </p>
        <MathBlock math="y = \log_a x \iff a^y = x" />
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          其中對數的底數限制為 <MathInline math="a > 0" /> 且 <MathInline math="a \neq 1" />，自變數（又稱真數）必須滿足 <MathInline math="x > 0" />。
        </p>

        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          基本性質與圖形特徵：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>定義域與值域：</strong>定義域為正實數集 <MathInline math="(0, \infty)" />；值域為全體實數集 <MathInline math="(-\infty, \infty)" />。
          </li>
          <li>
            <strong>恆過定點與垂直漸近線：</strong>對數函數圖形必過點 <MathInline math="(1, 0)" />。且當 <MathInline math="x \to 0^+" /> 時，<MathInline math="y \to -\infty" />（若 <MathInline math="a > 1" />），此時 <MathInline math="x = 0" />（即 <MathInline math="y" /> 軸）為其<strong>垂直漸近線</strong>。
          </li>
          <li>
            <strong>自然對數 (Natural Logarithm)：</strong>以 <MathInline math="e" /> 為底的對數稱為自然對數，簡記為 <MathInline math="\ln x = \log_e x" />。滿足：
            <MathBlock math="\ln x = y \iff e^y = x" />
            取消關係式：<MathInline math="e^{\ln x} = x \quad (x > 0)" />，<MathInline math="\ln(e^x) = x \quad (x \in \mathbb{R})" />。
          </li>
        </ol>
      </Definition>

      {/* 指數律與對數律 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-warm)',
          backgroundColor: 'rgba(245, 158, 11, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          常用運算律 (Exponent & Logarithm Laws)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            <div>
              <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>指數律 (對任意實數 x, y)：</p>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><MathInline math="a^x \cdot a^y = a^{x+y}" /></li>
                <li><MathInline math="\frac{a^x}{a^y} = a^{x-y}" /></li>
                <li><MathInline math="(a^x)^y = a^{xy}" /></li>
                <li><MathInline math="(ab)^x = a^x \cdot b^x" /></li>
              </ul>
            </div>
            <div>
              <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>對數律 (設 x, y &gt; 0, r 為實數)：</p>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><MathInline math="\log_a (xy) = \log_a x + \log_a y" /></li>
                <li><MathInline math="\log_a \left(\frac{x}{y}\right) = \log_a x - \log_a y" /></li>
                <li><MathInline math="\log_a (x^r) = r \log_a x" /></li>
                <li><strong>換底公式：</strong><MathInline math="\log_a x = \frac{\ln x}{\ln a} = \frac{\log_{10} x}{\log_{10} a}" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 插入互動式 SVG 圖形 */}
      <ExpLogGraphViewer />

      {/* 典型例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        觀念探討與典型例題
      </h3>

      {/* 例題 1 */}
      <Example title="求對數函數的定義域">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試求函數 <MathInline math="f(x) = \ln(9 - x^2)" /> 的定義域。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            根據對數函數的定義，對數的<strong>真數部分必須嚴格大於零</strong>。
            <br />
            因此，本題的限制條件為：
          </p>
          <MathBlock math="9 - x^2 > 0" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將不等式進行因式分解：
          </p>
          <MathBlock math="(3 - x)(3 + x) > 0 \implies x^2 < 9" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            解此二次不等式，可得範圍為：
          </p>
          <MathBlock math="-3 < x < 3" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            故此函數的定義域為區間 <strong><MathInline math="(-3, 3)" /></strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="求解對數方程式">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試求解下列方程式：
          <br />
          (1) <MathInline math="e^{5 - 3x} = 10" />
          <br />
          (2) <MathInline math="\ln x + \ln(x - 3) = \ln 4" />
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (1) 求解 <MathInline math="e^{5-3x} = 10" />：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            對等號兩邊同時取自然對數（即以 <MathInline math="e" /> 為底的對數），利用消除性質：
          </p>
          <MathBlock math="\ln(e^{5-3x}) = \ln(10) \implies 5 - 3x = \ln 10" />
          <div style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            移項解出 <MathInline math="x" />：
            <MathBlock math="3x = 5 - \ln 10 \implies x = \frac{5 - \ln 10}{3}" />
          </div>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (2) 求解 <MathInline math="\ln x + \ln(x - 3) = \ln 4" />：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', style: { color: 'var(--accent-warm)' }, fontWeight: '600' }}>
            注意！在求解對數方程式之前，必須先確立定義域條件（真數必須為正）：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            由第一個真數得 <MathInline math="x > 0" />，由第二個真數得 <MathInline math="x - 3 > 0 \implies x > 3" />。
            兩者取交集，本方程式的解必須滿足 <strong><MathInline math="x > 3" /></strong>。
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            利用對數的加法性質將左式合併：
          </p>
          <MathBlock math="\ln[x(x - 3)] = \ln 4" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            兩邊同取指數以消去自然對數：
          </p>
          <MathBlock math="x(x - 3) = 4 \implies x^2 - 3x - 4 = 0" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            因式分解解二次方程：
          </p>
          <MathBlock math="(x - 4)(x + 1) = 0 \implies x = 4 \quad \text{或} \quad x = -1" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            因為限制條件為 <MathInline math="x > 3" />，故 <MathInline math="x = -1" /> 是無效的增根，必須捨去。
            <br />
            方程式的唯一解為 <strong><MathInline math="x = 4" /></strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="求含有指數的複合函數反函數">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設函數 <MathInline math="f(x) = \frac{e^x - e^{-x}}{2}" />（此為雙曲正弦函數 <MathInline math="\sinh x" />），試求其反函數 <MathInline math="f^{-1}(x)" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            令 <MathInline math="y = \frac{e^x - e^{-x}}{2}" />，我們的目標是從此關係式中解出 <MathInline math="x" />。
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            首先，兩邊同乘以 <MathInline math="2" />：
          </p>
          <MathBlock math="2y = e^x - e^{-x}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            為了消去負指數，兩邊再同乘以 <MathInline math="e^x" />：
          </p>
          <MathBlock math="2y e^x = (e^x)^2 - 1 \implies (e^x)^2 - 2y(e^x) - 1 = 0" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            這是一個關於 <MathInline math="e^x" /> 的二次方程式。若我們令 <MathInline math="u = e^x" />，方程式可寫作 <MathInline math="u^2 - 2yu - 1 = 0" />。
            <br />
            利用公式解求出 <MathInline math="e^x" />：
          </p>
          <MathBlock math="e^x = \frac{-(-2y) \pm \sqrt{(-2y)^2 - 4(1)(-1)}}{2} = \frac{2y \pm \sqrt{4y^2 + 4}}{2} = y \pm \sqrt{y^2 + 1}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            開方取正值（因為對所有實數 <MathInline math="x" />，指數值 <MathInline math="e^x > 0" />，且 <MathInline math="y - \sqrt{y^2 + 1} < 0" />）：
          </p>
          <MathBlock math="e^x = y + \sqrt{y^2 + 1}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            兩邊取自然對數解出 <MathInline math="x" />：
          </p>
          <MathBlock math="x = \ln\left(y + \sqrt{y^2 + 1}\right)" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            互換變數 <MathInline math="x" /> 與 <MathInline math="y" />，即可得反函數：
            <br />
            <strong><MathInline math="f^{-1}(x) = \ln\left(x + \sqrt{x^2 + 1}\right)" /></strong>，其定義域為全體實數集 <MathInline math="\mathbb{R}" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 4 */}
      <Example title="微積分極限前瞻：指數函數的極限">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試求下列極限值：
          <br />
          (1) <MathInline math="\lim_{x \to \infty} \frac{e^{2x} - 1}{e^{2x} + 1}" />
          <br />
          (2) <MathInline math="\lim_{x \to -\infty} \frac{e^{2x} - 1}{e^{2x} + 1}" />
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (1) 求解趨於正無窮的極限：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            當 <MathInline math="x \to \infty" /> 時，指數項 <MathInline math="e^{2x} \to \infty" />。這是一個 <MathInline math="\frac{\infty}{\infty}" /> 未定式。
            <br />
            我們可以將分子與分母同時除以最大增長項 <MathInline math="e^{2x}" />：
          </p>
          <MathBlock math="\lim_{x \to \infty} \frac{e^{2x} - 1}{e^{2x} + 1} = \lim_{x \to \infty} \frac{1 - e^{-2x}}{1 + e^{-2x}}" />
          <div style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            因為當 <MathInline math="x \to \infty" /> 時，負指數項 <MathInline math="e^{-2x} \to 0" />，所以極限為：
            <MathBlock math="\frac{1 - 0}{1 + 0} = 1" />
          </div>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (2) 求解趨於負無窮的極限：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            當 <MathInline math="x \to -\infty" /> 時，指數項 <MathInline math="e^{2x} \to 0" />。
            <br />
            這是一個可以直接代入確定值的極限。我們直接取極限：
          </p>
          <MathBlock math="\lim_{x \to -\infty} \frac{e^{2x} - 1}{e^{2x} + 1} = \frac{0 - 1}{0 + 1} = -1" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <em>（註：這代表雙曲正切函數 <MathInline math="y = \tanh x = \frac{e^x - e^{-x}}{e^x + e^{-x}} = \frac{e^{2x} - 1}{e^{2x} + 1}" /> 的兩條水平漸近線分別為 <MathInline math="y = 1" /> 與 <MathInline math="y = -1" />）</em>
          </p>
        </Solution>
      </Example>

      {/* 自主練習題 */}
      <Exercises>
        <ExerciseItem>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            問題 1：求定義域
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            試求函數 <MathInline math="f(x) = \log_2(x^2 - x - 6)" /> 的定義域。
          </p>
          <Solution>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              對數函數真數必須為正：
              <br />
              <MathInline math="x^2 - x - 6 > 0 \implies (x - 3)(x + 2) > 0" />
              解此不等式得：
              <br />
              <strong><MathInline math="x > 3" /> 或 <MathInline math="x < -2" /></strong>。
              <br />
              因此定義域為：<strong><MathInline math="(-\infty, -2) \cup (3, \infty)" /></strong>。
            </p>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            問題 2：解指數方程式
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            試求方程式 <MathInline math="2^{x+1} = 5^{1-x}" /> 的精確解（用自然對數表示）。
          </p>
          <Solution>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              兩邊同取自然對數：
              <br />
              <MathInline math="\ln(2^{x+1}) = \ln(5^{1-x}) \implies (x + 1)\ln 2 = (1 - x)\ln 5" />
              展開並整理含有 <MathInline math="x" /> 的項：
              <br />
              <MathInline math="x\ln 2 + \ln 2 = \ln 5 - x\ln 5 \implies x(\ln 2 + \ln 5) = \ln 5 - \ln 2" />
              利用對數加減法合併：
              <br />
              <MathInline math="x\ln(10) = \ln(2.5)" />
              解出 <MathInline math="x" />：
              <br />
              <strong><MathInline math="x = \frac{\ln(2.5)}{\ln(10)} = \log_{10}(2.5)" /></strong>。
            </p>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            問題 3：求反函數
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            試求函數 <MathInline math="f(x) = 2 + \ln(x - 1)" /> 的反函數 <MathInline math="f^{-1}(x)" />，並求其定義域。
          </p>
          <Solution>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              令 <MathInline math="y = 2 + \ln(x - 1)" />，移項解 <MathInline math="x" />：
              <br />
              <MathInline math="y - 2 = \ln(x - 1) \implies e^{y-2} = x - 1 \implies x = 1 + e^{y-2}" />
              互換變數得到反函數：
              <br />
              <strong><MathInline math="f^{-1}(x) = 1 + e^{x-2}" /></strong>。
              <br />
              因為原對數函數的值域為全體實數，因此反函數的定義域為<strong>全體實數集 <MathInline math="\mathbb{R}" /></strong>。
            </p>
          </Solution>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}
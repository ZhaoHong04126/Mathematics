import { useState } from 'react';
import { 
  Definition, 
  Theorem, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

function InteractiveIntervalExtrema() {
  const [a, setA] = useState(-0.8);
  const [b, setB] = useState(2.8);

  // f(x) = x^3 - 3x^2 + 1
  const f = (x) => x * x * x - 3 * x * x + 1;

  // Mapping functions
  // Math x in [-1.5, 3.5] -> SVG X in [0, 500]
  // Math y in [-6.5, 6.5] -> SVG Y in [0, 320]
  const toSvgX = (x) => 150 + x * 100;
  const toSvgY = (y) => 160 - y * 22;

  // Generate curve path
  const curvePoints = [];
  for (let x = -1.4; x <= 3.4; x += 0.05) {
    curvePoints.push(`${toSvgX(x)},${toSvgY(f(x))}`);
  }
  const curveD = `M ${curvePoints.join(' L ')}`;

  // Active shaded interval path
  const activePoints = [];
  for (let x = a; x <= b; x += 0.05) {
    activePoints.push(`${toSvgX(x)},${toSvgY(f(x))}`);
  }
  // To shade under the curve to the X axis:
  const activeAreaPoints = [
    `${toSvgX(a)},${toSvgY(0)}`,
    ...activePoints,
    `${toSvgX(b)},${toSvgY(0)}`
  ];
  const activeAreaD = `M ${activeAreaPoints.join(' L ')} Z`;

  // Candidates list
  const candidates = [];
  candidates.push({ label: '端點 f(a)', x: a, y: f(a), type: 'endpoint' });
  candidates.push({ label: '端點 f(b)', x: b, y: f(b), type: 'endpoint' });
  if (0 >= a && 0 <= b) {
    candidates.push({ label: '臨界點 f(0)', x: 0, y: f(0), type: 'critical' });
  }
  if (2 >= a && 2 <= b) {
    candidates.push({ label: '臨界點 f(2)', x: 2, y: f(2), type: 'critical' });
  }

  // Find absolute max and min
  let absMax = candidates[0];
  let absMin = candidates[0];
  for (const c of candidates) {
    if (c.y > absMax.y) absMax = c;
    if (c.y < absMin.y) absMin = c;
  }

  return (
    <div style={{
      margin: '24px 0',
      padding: '24px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      boxShadow: 'var(--shadow-sm)',
    }}>
      <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        🎯 互動視覺化：閉區間絕對極值探索儀
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
        調整下方滑桿設定區間邊界 <MathInline math="a" /> 與 <MathInline math="b" />。觀察落在區間內的候選點（端點與區間內的臨界點），並找出該區間上的絕對最大與絕對最小值。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* SVG display */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          backgroundColor: '#0c0f17', 
          borderRadius: 'var(--radius-md)',
          padding: '10px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <svg width="100%" height="320" viewBox="0 0 500 320" style={{ maxWidth: '500px', overflow: 'visible' }}>
            {/* Grid Lines */}
            {Array.from({ length: 6 }).map((_, i) => {
              const x = -1 + i;
              const svgX = toSvgX(x);
              return (
                <line 
                  key={`grid-x-${i}`} 
                  x1={svgX} y1="0" x2={svgX} y2="320" 
                  stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" 
                />
              );
            })}
            {Array.from({ length: 7 }).map((_, i) => {
              const y = -6 + i * 2;
              const svgY = toSvgY(y);
              return (
                <line 
                  key={`grid-y-${i}`} 
                  x1="0" y1={svgY} x2="500" y2={svgY} 
                  stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" 
                />
              );
            })}

            {/* Axes */}
            <line x1="0" y1={toSvgY(0)} x2="500" y2={toSvgY(0)} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2="320" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />

            {/* Labels */}
            <text x="490" y={toSvgY(0) - 5} fill="rgba(255, 255, 255, 0.4)" fontSize="10" textAnchor="end">x</text>
            <text x={toSvgX(0) + 8} y="15" fill="rgba(255, 255, 255, 0.4)" fontSize="10">y</text>
            
            {/* Shaded Area for interval [a, b] */}
            <path 
              d={activeAreaD} 
              fill="rgba(59, 130, 246, 0.08)" 
              stroke="none"
            />
            {/* Vertical lines indicating boundaries */}
            <line x1={toSvgX(a)} y1="0" x2={toSvgX(a)} y2="320" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1={toSvgX(b)} y1="0" x2={toSvgX(b)} y2="320" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x={toSvgX(a) - 6} y="20" fill="rgba(59, 130, 246, 0.8)" fontSize="11" textAnchor="end">x = a</text>
            <text x={toSvgX(b) + 6} y="20" fill="rgba(59, 130, 246, 0.8)" fontSize="11">x = b</text>

            {/* Background Full Curve */}
            <path 
              d={curveD} 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.15)" 
              strokeWidth="2" 
            />

            {/* Foreground Active Interval Curve */}
            <path 
              d={`M ${activePoints.join(' L ')}`} 
              fill="none" 
              stroke="var(--accent-primary)" 
              strokeWidth="3" 
            />

            {/* Plot candidates */}
            {candidates.map((pt, idx) => {
              const isMax = pt.x === absMax.x;
              const isMin = pt.x === absMin.x;
              let ptColor = 'var(--text-secondary)';
              if (isMax) ptColor = 'var(--accent-warm)';
              else if (isMin) ptColor = '#3b82f6';
              else if (pt.type === 'critical') ptColor = '#a78bfa';

              return (
                <g key={`cand-${idx}`}>
                  <circle cx={toSvgX(pt.x)} cy={toSvgY(pt.y)} r="5.5" fill={ptColor} stroke="#fff" strokeWidth="1.5" />
                  <text 
                    x={toSvgX(pt.x)} 
                    y={toSvgY(pt.y) - 10} 
                    fill={ptColor} 
                    fontSize="10.5" 
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    {isMax ? '★ MAX' : isMin ? '★ MIN' : pt.type === 'critical' ? '臨界點' : ''}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>設定左邊界 a：<strong>{a.toFixed(2)}</strong></span>
            <input 
              type="range" 
              min="-1.2" 
              max="1.0" 
              step="0.05" 
              value={a} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setA(val);
              }}
              style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>設定右邊界 b：<strong>{b.toFixed(2)}</strong></span>
            <input 
              type="range" 
              min="1.0" 
              max="3.2" 
              step="0.05" 
              value={b} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                setB(val);
              }}
              style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Candidates Table */}
        <div style={{
          padding: '16px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)'
        }}>
          <h5 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: '0.92rem', fontWeight: '600' }}>
            📋 候選點函數值比較表 (區間: [{a.toFixed(2)}, {b.toFixed(2)}])
          </h5>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '6px', textAlign: 'left' }}>候選點類型</th>
                  <th style={{ padding: '6px', textAlign: 'center' }}>座標 x</th>
                  <th style={{ padding: '6px', textAlign: 'center' }}>函數值 f(x)</th>
                  <th style={{ padding: '6px', textAlign: 'right' }}>結果</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((pt, idx) => {
                  const isMax = pt.x === absMax.x;
                  const isMin = pt.x === absMin.x;
                  const bg = isMax ? 'rgba(245, 158, 11, 0.04)' : isMin ? 'rgba(59, 130, 246, 0.04)' : 'transparent';
                  return (
                    <tr key={`cand-row-${idx}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', backgroundColor: bg }}>
                      <td style={{ padding: '8px 6px', fontWeight: pt.type === 'critical' ? '600' : 'normal' }}>
                        {pt.label}
                      </td>
                      <td style={{ padding: '8px 6px', textAlign: 'center' }}>{pt.x.toFixed(2)}</td>
                      <td style={{ padding: '8px 6px', textAlign: 'center', fontWeight: '600', color: 'var(--text-primary)' }}>
                        {pt.y.toFixed(4)}
                      </td>
                      <td style={{ padding: '8px 6px', textAlign: 'right', fontWeight: '700' }}>
                        {isMax ? (
                          <span style={{ color: 'var(--accent-warm)' }}>🏆 絕對最大值</span>
                        ) : isMin ? (
                          <span style={{ color: '#3b82f6' }}>💎 絕對最小值</span>
                        ) : (
                          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>候選點</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Calculus_4_2() {
  return (
    <div>
      {/* 引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在實際生活中，我們經常需要尋找「最優」的方案。例如：如何以最小的成本製作一個包裝盒、如何用固定的圍籬圍出最大的農田、如何設計一個易拉罐以達到最省材料的表面積。
        在數學上，這類問題均可歸結為<strong>極值問題（Maximum and Minimum Problems / Optimization Problems）</strong>。
        本節我們將探討如何利用導函數尋找函數在特定區間上的<strong>絕對極值</strong>，並學習將其應用於最佳化應用題中。
      </p>

      {/* 絕對極值與極端值定理 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        絕對極值與極端值定理 (Absolute Extrema & Extreme Value Theorem)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在微積分中，我們區分「局部極值」與「絕對極值」：
      </p>

      <Definition title="絕對極值與相對極值 (Absolute vs. Relative Extrema)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設函數 <MathInline math="f" /> 的定義域為 <MathInline math="D" />，且 <MathInline math="c \in D" />：
        </p>
        
        <strong style={{ color: 'var(--text-primary)', display: 'block', margin: '14px 0 6px 0', fontSize: '0.95rem' }}>
          一、絕對極值 (Absolute / Global Extrema)
        </strong>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>
            <strong>絕對最大值 (Absolute / Global Maximum)：</strong>
            若對於所有 <MathInline math="x \in D" /> 均滿足 <MathInline math="f(x) \le f(c)" />，則稱 <MathInline math="f" /> 在 <MathInline math="c" /> 處有絕對最大值。此時的函數值 <MathInline math="f(c)" /> 亦稱為 <MathInline math="f" /> 的<strong>最大值 (Maximum value)</strong>。
          </li>
          <li>
            <strong>絕對最小值 (Absolute / Global Minimum)：</strong>
            若對於所有 <MathInline math="x \in D" /> 均滿足 <MathInline math="f(x) \ge f(c)" />，則稱 <MathInline math="f" /> 在 <MathInline math="c" /> 處有絕對最小值。此時的函數值 <MathInline math="f(c)" /> 亦稱為 <MathInline math="f" /> 的<strong>最小值 (Minimum value)</strong>。
          </li>
        </ul>

        <strong style={{ color: 'var(--text-primary)', display: 'block', margin: '18px 0 6px 0', fontSize: '0.95rem' }}>
          二、相對極值 (Relative / Local Extrema)
        </strong>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <li>
            <strong>相對極大值 (Relative / Local Maximum)：</strong>
            若對於所有在 <MathInline math="c" /> 附近的 <MathInline math="x" />（即存在包含 <MathInline math="c" /> 的開區間使得區間內所有 <MathInline math="x" />）均滿足 <MathInline math="f(x) \le f(c)" />，則稱 <MathInline math="f" /> 在 <MathInline math="c" /> 處有相對極大值。
          </li>
          <li>
            <strong>相對極小值 (Relative / Local Minimum)：</strong>
            若對於所有在 <MathInline math="c" /> 附近的 <MathInline math="x" /> 均滿足 <MathInline math="f(x) \ge f(c)" />，則稱 <MathInline math="f" /> 在 <MathInline math="c" /> 處有相對極小值。
          </li>
        </ul>
      </Definition>

      {/* 端點排除警告 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(245, 158, 11, 0.03)',
        padding: '16px'
      }}>
        <strong style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '6px' }}>⚠️ 重要幾何觀念：端點與局部極值的關係</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          請特別注意：<strong>區間的端點（Endpoints）絕不可能作為相對極值（Local Extrema）點</strong>。
          因為相對極值的定義要求必須在該點的「左右兩側」鄰域（即雙側附近）進行大小比較。在端點處，由於函數在區間外沒有定義，我們無法探討雙側鄰域，因此<strong>端點不在相對極大/相對極小值考慮的範圍中</strong>。
          相對地，端點<strong>可以</strong>是絕對極大/絕對最小值（Absolute Extrema）點。
        </p>
      </div>

      {/* 絕對極值與相對極值的關聯與差異 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(6, 182, 212, 0.02)',
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
          <span>🔍 深入探討：絕對極值與相對極值的關係</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '12px', margin: 0 }}>
            <li>
              <strong>1. 開區間上的關聯性：</strong>
              若函數 <MathInline math="f" /> 在<strong>開區間 <MathInline math="(a, b)" /></strong> 上達到絕對極值，則此點必定也是相對極值點。
              <MathBlock math={"\\text{在開區間 } (a, b) \\text{ 上：絕對最大值 } \\implies \\text{ 相對極大值}"} />
              <MathBlock math={"\\text{在開區間 } (a, b) \\text{ 上：絕對最小值 } \\implies \\text{ 相對極小值}"} />
              這是因為開區間內部的任何點都保證具備左右雙側鄰域，故絕對極值在局部上自然也是極值。
            </li>
            <li>
              <strong>2. 兩者不完全等價 (<MathInline math={"\\text{絕對極值} \\ne \\text{相對極值}"} />)：</strong>
              若考慮區間的端點，或更一般的定義域：
              <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'circle', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>一個絕對極值（例如發生在閉區間端點處）<strong>不一定是</strong>相對極值。</li>
                <li>一個相對極值（例如局部的小山峰）<strong>不一定是</strong>全域的絕對極值。</li>
              </ul>
            </li>
            <li>
              <strong>3. 並非所有函數都存在極值：</strong>
              極值的存在性取決於函數的連續性與定義域的區間型態。例如：
              <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'circle', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>函數 <MathInline math="f(x) = x" /> 在開區間 <MathInline math="(0, 1)" /> 上連續，但該區間內並<strong>沒有</strong>任何絕對最大值或絕對最小值。</li>
                <li>不連續函數或無界函數在某些區間上亦可能完全沒有極值。</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        並不是所有函數都存在絕對最大值與絕對最小值。然而，當函數滿足「在閉區間上連續」的條件時，絕對極值就必定存在：
      </p>

      <Theorem title="極端值定理 (Extreme Value Theorem, EVT)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上是<strong>連續函數</strong>，則 <MathInline math="f" /> 在 <MathInline math="[a, b]" /> 上必定存在絕對最大值與絕對最小值。
        </p>
      </Theorem>

      {/* 費馬定理 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        費馬定理 (Fermat's Theorem)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        既然我們知道閉區間上的連續函數必定存在絕對極值，那麼該如何定位它們的位置呢？費馬定理為我們指明了搜尋極值候選點的核心方向：
      </p>

      <Theorem title="費馬定理 (Fermat's Theorem)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          若函數 <MathInline math="f" /> 在點 <MathInline math="x = c" /> 處達到相對極大值或相對極小值，且導數 <MathInline math="f'(c)" /> 存在，則：
        </p>
        <MathBlock math="f'(c) = 0" />
      </Theorem>

      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(6, 182, 212, 0.02)',
        padding: '20px'
      }}>
        <strong style={{ color: 'var(--accent-secondary)', display: 'block', marginBottom: '8px' }}>💡 定理的核心價值與幾何意義：</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          這個定理在「尋找極值」的方向上極為重要。它告訴我們：<strong>若函數在極值點處是可微的 (differentiable)，則該處的切線斜率必定為 0，即具有水平切線 (Horizontal Tangent Line)</strong>。
          <br />
          換言之，可微函數的相對極值只可能發生在 <MathInline math="f'(x) = 0" /> 的位置。這也是為什麼我們在解題時，第一步往往是令一階導數為 0。
        </p>
      </div>

      {/* 臨界點的定義與定理 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        臨界點與極值候選點 (Critical Points and Extrema Candidates)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        為了處理更一般的情況（例如函數圖形有尖點，導致極值點處不可微），我們將費馬定理的概念推廣，定義了「臨界點」作為極值可能發生的位置：
      </p>

      <Definition title="臨界點 (Critical Point)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設 <MathInline math="c" /> 為函數 <MathInline math="f" /> 定義域內的一點（即 <MathInline math={"c \\in \\text{dom}(f)"} />）。若滿足下列兩個條件之一：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            一階導數為 0，即 <MathInline math="f'(c) = 0" />（切線為水平線）。
          </li>
          <li>
            一階導數不存在，即 <MathInline math="f'(c)" /> 不存在（例如尖角點、垂直切線點等）。
          </li>
        </ul>
        <p style={{ margin: '14px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          則稱 <MathInline math="c" /> 為函數 <MathInline math="f" /> 的一個<strong>臨界點 (Critical Point)</strong>。
        </p>
      </Definition>

      {/* 重點提醒：必須在定義域中 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
        padding: '16px'
      }}>
        <strong style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '6px' }}>⚠️ 核心重點：臨界點 c 必須在函數的定義域中</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          一個點要成為臨界點，<strong>首要前提是該點必須位於原函數的定義域中（即 <MathInline math={"c \\in \\text{dom}(f)"} />）</strong>。
          例如，分式函數 <MathInline math={"f(x) = \\frac{1}{x}"} /> 的導數 <MathInline math={"f'(x) = -\\frac{1}{x^2}"} /> 在 <MathInline math="x=0" /> 處未定義（不存在）。但因為 <MathInline math="x=0" /> 根本不在原函數 <MathInline math="f" /> 的定義域中，所以 <MathInline math="x=0" /> <strong>不是</strong>該函數的臨界點。
        </p>
      </div>

      {/* 極值必發生在臨界點定理 */}
      <Theorem title="極值發生位置定理">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若函數 <MathInline math="f" /> 在點 <MathInline math="c" /> 處有相對極值（相對極大或相對極小值），則 <MathInline math="c" /> 必定是 <MathInline math="f" /> 的一個<strong>臨界點 (Critical Point)</strong>。
        </p>
      </Theorem>

      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(6, 182, 212, 0.02)',
        padding: '20px'
      }}>
        <strong style={{ color: 'var(--accent-secondary)', display: 'block', marginBottom: '8px' }}>🔍 觀念提醒：臨界點不等於極值點</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          上述定理指出<strong>「相對極值點 $\implies$ 臨界點」</strong>，這為我們提供了尋找局部極值可能發生的所有位置。
          但<strong>逆命題不成立</strong>（即「臨界點不一定是極值點」）。要確定一個臨界點究竟是相對極大、相對極小，還是兩者皆非，<strong>我們必須對該點進行進一步的檢驗</strong>（例如：使用一階導數測試法觀察兩側導數變號情形，或二階導數測試法）。
        </p>
      </div>

      {/* 局部極值檢驗法 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        局部極值檢驗法 (Tests for Local Extrema)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當我們求出函數的臨界點後，需要一套系統性的方法來檢驗這些點究竟是相對極大值、相對極小值，還是非極值點。微積分中主要有以下兩種檢驗法：
      </p>

      {/* 一階導數檢驗法 */}
      <Theorem title="一階導數檢驗法 (First Derivative Test)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設 <MathInline math="c" /> 為連續函數 <MathInline math="f" /> 的一個臨界點：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
          <li>
            <strong>(1) 若 <MathInline math="f'" /> 在 <MathInline math="c" /> 處由負變正（即 <MathInline math={"- \\implies +"} />）：</strong>
            <br />
            則 <MathInline math="f" /> 在 <MathInline math="c" /> 處達到<strong>相對極小值 (Local Minimum)</strong>。
          </li>
          <li>
            <strong>(2) 若 <MathInline math="f'" /> 在 <MathInline math="c" /> 處由正變負（即 <MathInline math={"+ \\implies -"} />）：</strong>
            <br />
            則 <MathInline math="f" /> 在 <MathInline math="c" /> 處達到<strong>相對極大值 (Local Maximum)</strong>。
          </li>
          <li>
            <strong>(3) 若 <MathInline math="f'" /> 在 <MathInline math="c" /> 兩側的符號沒有改變（無變號）：</strong>
            <br />
            則 <MathInline math="f" /> 在 <MathInline math="c" /> 處<strong>不是</strong>相對極大值也不是相對極小值。
          </li>
        </ul>
      </Theorem>

      {/* 二階導數檢驗法 */}
      <Theorem title="二階導數檢驗法 (Second Derivative Test)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          假設 <MathInline math="f''" /> 在臨界點 <MathInline math="c" /> 附近連續，且滿足 <MathInline math="f'(c) = 0" />：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
          <li>
            <strong>(1) 若 <MathInline math="f''(c) > 0" />：</strong>
            <br />
            則 <MathInline math="f" /> 在 <MathInline math="c" /> 處達到<strong>相對極小值 (Local Minimum)</strong>（幾何意義：圖形在該點凹向上）。
          </li>
          <li>
            <strong>(2) 若 <MathInline math="f''(c) < 0" />：</strong>
            <br />
            則 <MathInline math="f" /> 在 <MathInline math="c" /> 處達到<strong>相對極大值 (Local Maximum)</strong>（幾何意義：圖形在該點凹向下）。
          </li>
          <li>
            <strong>(3) 若 <MathInline math="f''(c) = 0" />：</strong>
            <br />
            <strong>無法得出結論 (No Conclusion)</strong>。此時我們必須回到「一階導數檢驗法」來重新檢驗該臨界點。
          </li>
        </ul>
      </Theorem>

      {/* FDT vs SDT 優缺點對比 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '12px 20px',
          borderBottom: '1px solid var(--border-color)',
          fontWeight: '600',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⚖️ 檢驗法優缺點比較：FDT vs SDT
        </div>
        <div style={{
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.01)'
        }}>
          {/* FDT Card */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '10px', fontSize: '0.95rem' }}>
              🔍 一階導數檢驗法 (FDT)
            </strong>
            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <span style={{ color: '#10b981', fontWeight: '600' }}>👍 優點：</span>
                適用範圍極廣。只要函數在臨界點處連續即可使用，不論該點是否可微（即使導數不存在亦可適用）。
              </li>
              <li>
                <span style={{ color: '#ef4444', fontWeight: '600' }}>👎 缺點：</span>
                正負號判斷較繁瑣。需要分析臨界點左側與右側的導數正負號，在計算上可能較為不便。
              </li>
            </ul>
          </div>

          {/* SDT Card */}
          <div style={{
            padding: '16px',
            backgroundColor: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)'
          }}>
            <strong style={{ color: 'var(--accent-secondary)', display: 'block', marginBottom: '10px', fontSize: '0.95rem' }}>
              ⚡ 二階導數檢驗法 (SDT)
            </strong>
            <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.88rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>
                <span style={{ color: '#10b981', fontWeight: '600' }}>👍 優點：</span>
                計算方便且判斷迅速。只需將臨界點直接代入二階導數，即可立刻判斷極值狀態。
              </li>
              <li>
                <span style={{ color: '#ef4444', fontWeight: '600' }}>👎 缺點：</span>
                適用條件較嚴苛。要求函數必須二次可微且連續，且只適用於 <MathInline math="f'(c) = 0" /> 的點。若 <MathInline math="f''(c) = 0" /> 則會失效（無結論，必須回到一階導數檢驗法）。
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 閉區間法 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        閉區間法尋找絕對極值 (The Closed Interval Method)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        根據費馬定理，連續函數在閉區間上的絕對極值，只可能發生在以下兩類候選點中：
        <strong>(1) 區間內部的臨界點</strong>，以及 <strong>(2) 區間的端點</strong>。
        因此，尋找絕對極值可以遵循以下的三步驟流程：
      </p>

      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-primary)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          color: 'var(--accent-primary)',
          backgroundColor: 'rgba(59, 130, 246, 0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }}>
          📝 閉區間法操作步驟
        </div>
        <div style={{ padding: '20px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
            <li>
              <strong>步驟一：</strong> 尋找函數 <MathInline math="f" /> 在開區間 <MathInline math="(a, b)" /> 內的所有臨界點 <MathInline math="c" />（使 <MathInline math="f'(c) = 0" /> 或 <MathInline math="f'(c)" /> 不存在的點），並計算其對應的函數值 <MathInline math="f(c)" />。
            </li>
            <li>
              <strong>步驟二：</strong> 計算函數在區間端點處的函數值 <MathInline math="f(a)" /> 與 <MathInline math="f(b)" />。
            </li>
            <li>
              <strong>步驟三：</strong> 比較上述所有函數值。其中<strong>最大者</strong>即為絕對最大值，<strong>最小者</strong>即為絕對最小值。
            </li>
          </ol>
        </div>
      </div>

      <InteractiveIntervalExtrema />

      {/* 最佳化問題的解決指南 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        應用題：最佳化問題解決指引 (Solving Optimization Problems)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        面對實際的應用問題，我們常需要建立數學模型並求出最大或最小值。一般建議依照以下步驟來分析：
      </p>

      <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
        <li>
          <strong>1. 繪圖與列變數：</strong> 畫出問題的示意圖（若有幾何關係），定義自變數與其他相關變數，明確指出哪一個變數是我們要求極值的目標量。
        </li>
        <li>
          <strong>2. 建立目標函數：</strong> 列出目標量的關係式。若公式中含有多個變數，應藉由題目中的限制條件（Constraint Equations），將目標量表達為<strong>單一變數</strong>的函數，並寫出該變數的<strong>實質物理定義域（區間）</strong>。
        </li>
        <li>
          <strong>3. 微分求導尋找臨界點：</strong> 求出該目標函數的導數，並令其為 0，找出區間內的臨界點。
        </li>
        <li>
          <strong>4. 極值確認：</strong> 利用一階導數測試、二階導數測試，或閉區間法，證明該臨界點確實是我們要找的最大值或最小值。
        </li>
      </ul>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與詳細解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：多項式在閉區間上的絕對極值">
        <p style={{ color: 'var(--text-secondary)' }}>
          求連續函數 <MathInline math="f(x) = x^3 - 3x^2 + 1" /> 在閉區間 <MathInline math="[-0.5, 4]" /> 上的絕對最大值與絕對最小值。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            由於函數為多項式，在實數集上連續可微，我們可以使用閉區間法。
          </p>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第一步：求開區間內的臨界點】</strong>
            <br />
            對函數求導：
            <MathBlock math="f'(x) = 3x^2 - 6x = 3x(x - 2)" />
            令 <MathInline math="f'(x) = 0" />，求得臨界點為 <MathInline math="x = 0" /> 與 <MathInline math="x = 2" />。
            我們檢查這兩個點是否落在開區間 <MathInline math="(-0.5, 4)" /> 內：
            由於 <MathInline math="0 \in (-0.5, 4)" /> 且 <MathInline math="2 \in (-0.5, 4)" />，因此這兩個點皆為有效候選點。
          </div>
          <div style={{ marginBottom: '12px' }}>
            計算這兩點的函數值：
            <MathBlock math="f(0) = 0^3 - 3(0)^2 + 1 = 1" />
            <MathBlock math="f(2) = 2^3 - 3(2)^2 + 1 = 8 - 12 + 1 = -3" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第二步：求端點函數值】</strong>
            <br />
            區間端點分別為 <MathInline math="x = -0.5" /> 與 <MathInline math="x = 4" />。計算其函數值：
            <MathBlock math="f(-0.5) = (-0.5)^3 - 3(-0.5)^2 + 1 = -0.125 - 0.75 + 1 = 0.125" />
            <MathBlock math="f(4) = 4^3 - 3(4)^2 + 1 = 64 - 48 + 1 = 17" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第三步：比較數值做出結論】</strong>
            <br />
            列出所有候選函數值進行比較：
            <MathBlock math="f(0) = 1, \quad f(2) = -3, \quad f(-0.5) = 0.125, \quad f(4) = 17" />
            比較可知：
            絕對最大值為 <MathInline math="f(4) = 17" />，絕對最小值為 <MathInline math="f(2) = -3" />。
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：最佳化問題——經典圍欄最大面積">
        <p style={{ color: 'var(--text-secondary)' }}>
          一位農夫手頭有 <MathInline math="100" /> 米長的圍籬，他打算沿著一堵筆直的磚牆圍出一個矩形的菜園（靠牆的那一面不需要圍籬）。
          問該如何設計矩形的長與寬，才能使圍出的菜園面積最大？最大面積是多少？
        </p>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第一步：繪圖與設定變數】</strong>
            <br />
            設與磚牆垂直的矩形兩邊寬為 <MathInline math="x" /> 米，與磚牆平行的矩形長為 <MathInline math="y" /> 米。
            我們要最大化的目標量為菜園面積 <MathInline math="A" />，其公式為：
            <MathBlock math="A = x \cdot y" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第二步：建立單變數目標函數與限制條件】</strong>
            <br />
            根據圍籬總長度的限制條件，三面圍籬的長度之和必須等於 100 米：
            <MathBlock math="2x + y = 100 \implies y = 100 - 2x" />
            將此代入面積公式中，將面積表達為單一變數 <MathInline math="x" /> 的函數：
            <MathBlock math="A(x) = x(100 - 2x) = 100x - 2x^2" />
            考慮自變數 <MathInline math="x" /> 的物理限制：寬度 <MathInline math="x" /> 必須大於 0；且因為圍籬總長為 100 米，<MathInline math="2x < 100 \implies x < 50" />。
            因此定義域為閉區間 <MathInline math="[0, 50]" />（在端點 0 和 50 處，面積均為 0，無實質幾何意義，但可用於數學檢驗）。
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第三步：微分求臨界點】</strong>
            <br />
            對面積函數求導：
            <MathBlock math="A'(x) = 100 - 4x" />
            令 <MathInline math="A'(x) = 0" />，可解得臨界點：
            <MathBlock math="100 - 4x = 0 \implies x = 25 \text{ 米}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第四步：極值確認與結論】</strong>
            <br />
            我們計算端點與臨界點的函數值：
            <MathBlock math="A(0) = 0, \quad A(50) = 0, \quad A(25) = 25(100 - 50) = 1250 \text{ 平方米}" />
            （亦可使用二階導數測試：<MathInline math="A''(x) = -4 < 0" />，說明該函數為凹向下，臨界點處必定是局部最大值且為全域最大值。）
          </div>
          <p>
            當垂直於牆壁的寬度設計為 <MathInline math="x = 25" /> 米，平行於牆壁的長度設計為 <MathInline math="y = 100 - 2(25) = 50" /> 米時，能圍出最大的菜園面積為 <strong><MathInline math="1250" /> 平方米</strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：工業最佳化——最省材料易拉罐設計">
        <p style={{ color: 'var(--text-secondary)' }}>
          欲設計一個容積固定為 <MathInline math="V = 1000 \text{ cm}^3" /> 的圓柱形鐵皮易拉罐。
          問應如何選擇底面半徑 <MathInline math="r" /> 與高 <MathInline math="h" /> 的尺寸，才能使製作該罐所消耗的鐵皮表面積最小（最節省成本）？
        </p>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第一步：幾何公式與限制條件】</strong>
            <br />
            設圓柱體的底面半徑為 <MathInline math="r" />，高為 <MathInline math="h" />。
            圓柱體易拉罐的體積為：
            <MathBlock math="V = \pi r^2 h = 1000 \implies h = \frac{1000}{\pi r^2}" />
            我們的目標是要使圓柱罐的總表面積（包括頂蓋、底面與側面）最小。總表面積 <MathInline math="S" /> 公式為：
            <MathBlock math="S = 2\pi r^2 + 2\pi r h" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第二步：消去變數建立目標函數】</strong>
            <br />
            將 <MathInline math="h = \frac{1000}{\pi r^2}" /> 代入表面積公式中：
            <MathBlock math="S(r) = 2\pi r^2 + 2\pi r \left( \frac{1000}{\pi r^2} \right) = 2\pi r^2 + \frac{2000}{r}" />
            考慮物理限制，半徑 <MathInline math="r" /> 必須大於 0，因此定義域為開區間 <MathInline math="(0, \infty)" />。
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第三步：微分與求臨界點】</strong>
            <br />
            對 <MathInline math="S(r)" /> 進行微分：
            <MathBlock math="S'(r) = 4\pi r - \frac{2000}{r^2}" />
            令 <MathInline math="S'(r) = 0" />：
            <MathBlock math="4\pi r - \frac{2000}{r^2} = 0 \iff 4\pi r^3 = 2000 \iff r^3 = \frac{500}{\pi}" />
            解得唯一臨界點為：
            <MathBlock math="r = \sqrt[3]{\frac{500}{\pi}} \approx 5.42 \text{ cm}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>【第四步：確認最小值】</strong>
            <br />
            對 <MathInline math="S'(r)" /> 再次求導得二階導數：
            <MathBlock math="S''(r) = 4\pi + \frac{4000}{r^3}" />
            當 <MathInline math="r > 0" /> 時，顯然有二階導數 <MathInline math="S''(r) > 0" />（圖形凹向上）。
            根據二階導數極值測試法，該臨界點確實為函數的唯一絕對最小值。
          </div>
          <div style={{ marginBottom: '10px' }}>
            此時，我們計算罐子的高 <MathInline math="h" /> 與半徑 <MathInline math="r" /> 的關係：
            <MathBlock math="h = \frac{1000}{\pi r^2} = \frac{2 \cdot 500}{\pi \cdot r^2} = \frac{2 \cdot \pi r^3}{\pi r^2} = 2r" />
          </div>
          <p>
            當設計圓柱罐的高等於底面直徑（即 <MathInline math="h = 2r \approx 10.84 \text{ cm}" />，底面半徑 <MathInline math="r \approx 5.42 \text{ cm}" />）時，能使製作該罐所消耗的材料表面積最小，此最小表面積大約為 <MathInline math="S(5.42) \approx 554 \text{ cm}^2" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求連續函數 <MathInline math="f(x) = x - 2\sin x" /> 在閉區間 <MathInline math="[0, \pi]" /> 上的絕對最大值與絕對最小值。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：臨界點為 <MathInline math="x = \frac{\pi}{3}" />。絕對最大值在右端點為 <MathInline math="f(\pi) = \pi \approx 3.14" />；絕對最小值在臨界點為 <MathInline math="f\left(\frac{\pi}{3}\right) = \frac{\pi}{3} - \sqrt{3} \approx -0.68" />。）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 設計一個無蓋的長方體包裝盒，底面為正方形，且要求盒子的總容積固定為 <MathInline math="V = 32 \text{ cm}^3" />。
            問紙盒的底面邊長與高應如何設計，才能使紙盒的表面積最小？
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：設正方形底邊長為 <MathInline math="x" />，高為 <MathInline math="y" />。表面積目標函數為 <MathInline math="S(x) = x^2 + \frac{128}{x}" />。當底邊長 <MathInline math="x = 4 \text{ cm}" />，高 <MathInline math="y = 2 \text{ cm}" /> 時表面積最小為 <MathInline math="48 \text{ cm}^2" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

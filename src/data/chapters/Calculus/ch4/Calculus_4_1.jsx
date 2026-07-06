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

function InteractiveGraph() {
  const [xVal, setXVal] = useState(1.0);

  // f(x) = 1/3 x^3 - x^2 - 3x + 4
  const f = (x) => (x * x * x) / 3 - x * x - 3 * x + 4;
  const df = (x) => x * x - 2 * x - 3;
  const ddf = (x) => 2 * x - 2;

  // Coordinate conversion:
  // Math x in [-4.5, 6.5] -> SVG X in [0, 500]
  // Math y in [-8.5, 8.5] -> SVG Y in [0, 350]
  const toSvgX = (x) => 200 + x * 45;
  const toSvgY = (y) => 175 - y * 18;

  // Generate SVG path for the curve
  const points = [];
  for (let x = -3.5; x <= 5.5; x += 0.1) {
    points.push(`${toSvgX(x)},${toSvgY(f(x))}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  // Active point values
  const py = f(xVal);
  const slope = df(xVal);
  const d2 = ddf(xVal);

  const activeX = toSvgX(xVal);
  const activeY = toSvgY(py);

  // Tangent line endpoints: x1 = xVal - 1.5, x2 = xVal + 1.5
  const x1 = xVal - 1.5;
  const y1 = py - 1.5 * slope;
  const x2 = xVal + 1.5;
  const y2 = py + 1.5 * slope;

  // Critical Points for reference
  const critPoints = [
    { x: -1, y: f(-1), label: '極大值 (-1, 5.67)', color: 'var(--accent-warm)' },
    { x: 3, y: f(3), label: '極小值 (3, -5)', color: 'var(--accent-primary)' }
  ];
  // Inflection Point for reference
  const inflPoint = { x: 1, y: f(1), label: '反曲點 (1, 0.33)', color: '#a78bfa' };

  // Status flags
  const isIncreasing = slope > 0.01;
  const isDecreasing = slope < -0.01;
  const isCritical = Math.abs(slope) <= 0.01;
  const isConcaveUp = d2 > 0.01;
  const isConcaveDown = d2 < -0.01;
  const isInflection = Math.abs(d2) <= 0.01;

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
        📈 互動視覺化：函數性質探索儀
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
        調整下方的滑桿來改變 <MathInline math="x" /> 的位置，觀察切線斜率（一階導函數值）與圖形彎曲方向（二階導函數值）的即時變化。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* SVG Display */}
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
          <svg width="100%" height="340" viewBox="0 0 500 340" style={{ maxWidth: '500px', overflow: 'visible' }}>
            {/* Grid Lines */}
            {Array.from({ length: 11 }).map((_, i) => {
              const x = -4 + i;
              const svgX = toSvgX(x);
              return (
                <line 
                  key={`grid-x-${i}`} 
                  x1={svgX} y1="0" x2={svgX} y2="340" 
                  stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" 
                />
              );
            })}
            {Array.from({ length: 9 }).map((_, i) => {
              const y = -8 + i * 2;
              const svgY = toSvgY(y);
              return (
                <line 
                  key={`grid-y-${i}`} 
                  x1="0" y1={svgY} x2="500" y2={svgY} 
                  stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" 
                />
              );
            })}

            {/* X and Y Axes */}
            <line x1="0" y1={toSvgY(0)} x2="500" y2={toSvgY(0)} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2="340" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            
            {/* Axis Labels */}
            <text x="490" y={toSvgY(0) - 5} fill="rgba(255, 255, 255, 0.5)" fontSize="11" textAnchor="end">x</text>
            <text x={toSvgX(0) + 8} y="18" fill="rgba(255, 255, 255, 0.5)" fontSize="11">y</text>
            <text x={toSvgX(0) - 12} y={toSvgY(0) + 12} fill="rgba(255, 255, 255, 0.3)" fontSize="10">0</text>

            {/* Function Curve */}
            <path 
              d={pathD} 
              fill="none" 
              stroke="rgba(255, 255, 255, 0.6)" 
              strokeWidth="2.5" 
            />

            {/* Reference Points (Critical & Inflection) */}
            {critPoints.map((pt, idx) => (
              <g key={`crit-${idx}`}>
                <circle cx={toSvgX(pt.x)} cy={toSvgY(pt.y)} r="5.5" fill={pt.color} />
                <text 
                  x={toSvgX(pt.x)} 
                  y={toSvgY(pt.y) + (pt.x === -1 ? -12 : 20)} 
                  fill={pt.color} 
                  fontSize="11" 
                  fontWeight="600"
                  textAnchor="middle"
                >
                  {pt.label}
                </text>
              </g>
            ))}
            <circle cx={toSvgX(inflPoint.x)} cy={toSvgY(inflPoint.y)} r="5.5" fill={inflPoint.color} />
            <text 
              x={toSvgX(inflPoint.x) + 8} 
              y={toSvgY(inflPoint.y) + 4} 
              fill={inflPoint.color} 
              fontSize="11" 
              fontWeight="600"
            >
              {inflPoint.label}
            </text>

            {/* Tangent Line */}
            <line 
              x1={toSvgX(x1)} y1={toSvgY(y1)} 
              x2={toSvgX(x2)} y2={toSvgY(y2)} 
              stroke="var(--accent-primary)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
            />

            {/* Dynamic Active Point */}
            <circle 
              cx={activeX} 
              cy={activeY} 
              r="7.5" 
              fill="var(--accent-primary)" 
              stroke="#fff" 
              strokeWidth="2" 
            />
          </svg>
        </div>

        {/* Slider control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            <span>自變數位置：<strong>x = {xVal.toFixed(2)}</strong></span>
            <span>函數值：<strong>f(x) = {py.toFixed(2)}</strong></span>
          </div>
          <input 
            type="range" 
            min="-3.0" 
            max="5.0" 
            step="0.05" 
            value={xVal} 
            onChange={(e) => setXVal(parseFloat(e.target.value))}
            style={{ 
              width: '100%', 
              accentColor: 'var(--accent-primary)',
              cursor: 'pointer',
              height: '6px',
              borderRadius: '3px',
              backgroundColor: 'rgba(255,255,255,0.1)'
            }} 
          />
        </div>

        {/* Readout panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {/* First Derivative Card */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              一階導數 (切線斜率)
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              f&apos;(x) = {slope.toFixed(2)}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {isIncreasing && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  📈 函數遞增 (Increasing)
                </span>
              )}
              {isDecreasing && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.2)'
                }}>
                  📉 函數遞減 (Decreasing)
                </span>
              )}
              {isCritical && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(245, 158, 11, 0.1)', 
                  color: '#f59e0b',
                  border: '1px solid rgba(245, 158, 11, 0.2)'
                }}>
                  👑 臨界點 (Critical Point)
                </span>
              )}
            </div>
          </div>

          {/* Second Derivative Card */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              二階導數 (彎曲方向)
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              f&apos;&apos;(x) = {d2.toFixed(2)}
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {isConcaveUp && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(167, 139, 250, 0.1)', 
                  color: '#a78bfa',
                  border: '1px solid rgba(167, 139, 250, 0.2)'
                }}>
                  ∪ 凹向上 (Concave Up)
                </span>
              )}
              {isConcaveDown && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(244, 114, 182, 0.1)', 
                  color: '#f472b6',
                  border: '1px solid rgba(244, 114, 182, 0.2)'
                }}>
                  ∩ 凹向下 (Concave Down)
                </span>
              )}
              {isInflection && (
                <span style={{ 
                  fontSize: '0.75rem', 
                  padding: '2px 8px', 
                  borderRadius: '4px', 
                  backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.25)'
                }}>
                  🎯 反曲點 (Inflection Point)
                </span>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Calculus_4_1() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在之前的章節中，我們掌握了微分的運算公式。但微分到底能如何幫助我們理解一個函數呢？
        本節我們將介紹微積分中極為核心的幾何應用——<strong>如何利用導函數（一階與二階導數）來分析函數的圖形性質</strong>。
        我們將學習如何利用一階導數判定函數的遞增與遞減，利用二階導數判定圖形的彎曲方向（凹凸性），並找出函數的所有極值與反曲點，進而畫出函數的精確圖形。
      </p>

      {/* 一階導函數與單調性 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一階導數與函數遞增減 (First Derivative and Monotonicity)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在探討導數與單調性的關聯之前，我們首先需要明確「單調性（Monotonicity）」的數學定義。
      </p>

      {/* 遞增、遞減與單調性定義 */}
      <Definition title="單調性定義 (Definitions of Monotonicity)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          設函數 <MathInline math="f" /> 定義於區間 <MathInline math="I" /> 上。對於區間內任意滿足 <MathInline math="x < y" /> 的兩數 <MathInline math="x, y \in I" />：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li>
            <strong>遞增 (Increasing)：</strong>
            若滿足 <MathInline math="f(x) < f(y)" />，則稱 <MathInline math="f" /> 在區間 <MathInline math="I" /> 上為<strong>遞增 (Increasing)</strong>。
          </li>
          <li>
            <strong>遞減 (Decreasing)：</strong>
            若滿足 <MathInline math="f(x) > f(y)" />，則稱 <MathInline math="f" /> 在區間 <MathInline math="I" /> 上為<strong>遞減 (Decreasing)</strong>。
          </li>
          <li>
            <strong>非遞減 (Nondecreasing)：</strong>
            若滿足 <MathInline math="f(x) \le f(y)" />，則稱 <MathInline math="f" /> 在區間 <MathInline math="I" /> 上為<strong>非遞減 (Nondecreasing)</strong>。
          </li>
          <li>
            <strong>非遞增 (Nonincreasing)：</strong>
            若滿足 <MathInline math="f(x) \ge f(y)" />，則稱 <MathInline math="f" /> 在區間 <MathInline math="I" /> 上為<strong>非遞增 (Nonincreasing)</strong>。
          </li>
        </ul>
      </Definition>

      {/* 術語說明卡片 */}
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
          <span>📖 備註：不同書籍中的術語差異</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-primary)', marginBottom: '14px', lineHeight: '1.7' }}>
            在高等數學與不同版本的微積分教科書中，對於「遞增減」的定義有時存在約定俗成的差異，閱讀文獻時需多加注意：
          </p>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                  <th style={{ padding: '8px', textAlign: 'left', width: '35%' }}>定義條件 (<MathInline math="x < y" /> 時)</th>
                  <th style={{ padding: '8px', textAlign: 'left', width: '30%' }}>標準術語 (本教材採用)</th>
                  <th style={{ padding: '8px', textAlign: 'left', width: '35%' }}>部分書籍對應術語</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px' }}><MathInline math="f(x) < f(y)" /></td>
                  <td style={{ padding: '8px', fontWeight: '600', color: 'var(--accent-primary)' }}>遞增 (Increasing)</td>
                  <td style={{ padding: '8px', color: 'var(--accent-warm)' }}>嚴格遞增 (Strictly Increasing)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px' }}><MathInline math="f(x) > f(y)" /></td>
                  <td style={{ padding: '8px', fontWeight: '600', color: 'var(--accent-primary)' }}>遞減 (Decreasing)</td>
                  <td style={{ padding: '8px', color: 'var(--accent-warm)' }}>嚴格遞減 (Strictly Decreasing)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px' }}><MathInline math="f(x) \le f(y)" /></td>
                  <td style={{ padding: '8px', fontWeight: '600', color: 'var(--accent-primary)' }}>非遞減 (Nondecreasing)</td>
                  <td style={{ padding: '8px', color: 'var(--accent-warm)' }}>遞增 (Increasing)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px' }}><MathInline math="f(x) \ge f(y)" /></td>
                  <td style={{ padding: '8px', fontWeight: '600', color: 'var(--accent-primary)' }}>非遞增 (Nonincreasing)</td>
                  <td style={{ padding: '8px', color: 'var(--accent-warm)' }}>遞減 (Decreasing)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        幾何上，導數 <MathInline math="f'(x)" /> 代表函數圖形在點 <MathInline math="x" /> 處切線的斜率。
        如果切線斜率為正，代表圖形往右上方爬升；若斜率為負，代表圖形往右下方下滑。這就給出了判斷函數單調性與導數關係的定理：
      </p>

      <Theorem title="單調性測試法 (Increasing/Decreasing Test)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上連續，且在開區間 <MathInline math="(a, b)" /> 內可微：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            若在 <MathInline math="(a, b)" /> 內，對於所有 <MathInline math="x" /> 均有 <MathInline math="f'(x) > 0" />，則 <MathInline math="f" /> 在 <MathInline math="[a, b]" /> 上<strong>遞增 (Increasing)</strong>。
          </li>
          <li>
            若在 <MathInline math="(a, b)" /> 內，對於所有 <MathInline math="x" /> 均有 <MathInline math="f'(x) < 0" />，則 <MathInline math="f" /> 在 <MathInline math="[a, b]" /> 上<strong>遞減 (Decreasing)</strong>。
          </li>
        </ul>
      </Theorem>

      {/* 臨界點的定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        臨界點與局部極值 (Critical Points and Local Extrema)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在尋找函數的局部極大值或極小值時，切線斜率為 0 的點或是切線斜率不存在的點是唯一的候選位置：
      </p>

      <Definition title="臨界點 (Critical Point)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設 <MathInline math="c" /> 為函數 <MathInline math="f" /> 定義域內的一點。若 <MathInline math="f'(c) = 0" /> 或 <MathInline math="f'(c)" /> 不存在，則稱 <MathInline math="c" /> 為函數 <MathInline math="f" /> 的一個<strong>臨界點 (Critical Point)</strong>。
        </p>
      </Definition>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        有了臨界點後，我們能藉由觀察一階導數在臨界點兩側的符號變化，來判定該點是否為局部極值：
      </p>

      <Theorem title="一階導數測試法 (The First Derivative Test)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設 <MathInline math="c" /> 為連續函數 <MathInline math="f" /> 的一個臨界點，且 <MathInline math="f" /> 在包含 <MathInline math="c" /> 的開區間內可微（除 <MathInline math="c" /> 本身外）：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>局部極大值：</strong>若 <MathInline math="f'(x)" /> 在 <MathInline math="c" /> 的左側為正（<MathInline math="f'(x) > 0" />）且在右側為負（<MathInline math="f'(x) < 0" />），即一階導數符號由<strong>正變負</strong>，則 <MathInline math="f(c)" /> 為 <MathInline math="f" /> 的<strong>局部極大值 (Local Maximum)</strong>。
          </li>
          <li>
            <strong>局部極小值：</strong>若 <MathInline math="f'(x)" /> 在 <MathInline math="c" /> 的左側為負（<MathInline math="f'(x) < 0" />）且在右側為正（<MathInline math="f'(x) > 0" />），即一階導數符號由<strong>負變正</strong>，則 <MathInline math="f(c)" /> 為 <MathInline math="f" /> 的<strong>局部極小值 (Local Minimum)</strong>。
          </li>
          <li>
            <strong>非極值：</strong>若 <MathInline math="f'(x)" /> 在 <MathInline math="c" /> 的兩側符號相同，則 <MathInline math="f(c)" /> <strong>不是</strong>局部極值。
          </li>
        </ul>
      </Theorem>

      {/* 插入互動圖表 */}
      <InteractiveGraph />

      {/* 二階導函數與凹凸性 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二階導數與凹向性 (Second Derivative and Concavity)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        雖然一階導數告訴我們函數是在遞增還是遞減，但它無法告訴我們圖形是「向上彎曲」還是「向下彎曲」。
        為此，我們需要二階導數。二階導數代表一階導數（切線斜率）的變化率。
      </p>

      <Definition title="凹向性 (Concavity)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設函數 <MathInline math="f" /> 在開區間 <MathInline math="I" /> 內可微：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            若 <MathInline math="f" /> 的圖形在區間 <MathInline math="I" /> 內恆位於其所有切線的<strong>上方</strong>，則稱 <MathInline math="f" /> 在該區間為<strong>凹向上 (Concave Upwards / Concave Up)</strong>。
          </li>
          <li>
            若 <MathInline math="f" /> 的圖形在區間 <MathInline math="I" /> 內恆位於其所有切線的<strong>下方</strong>，則稱 <MathInline math="f" /> 在該區間為<strong>凹向下 (Concave Downwards / Concave Down)</strong>。
          </li>
        </ul>
      </Definition>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        我們可以使用二階導數來簡單地測試凹凸性：
      </p>

      <Theorem title="凹向性測試法 (Concavity Test)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設函數 <MathInline math="f" /> 在開區間 <MathInline math="I" /> 內具有二階導數：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            若在區間 <MathInline math="I" /> 內，對於所有 <MathInline math="x" /> 均有 <MathInline math="f''(x) > 0" />，則 <MathInline math="f" /> 的圖形在該區間<strong>凹向上</strong>。
          </li>
          <li>
            若在區間 <MathInline math="I" /> 內，對於所有 <MathInline math="x" /> 均有 <MathInline math="f''(x) < 0" />，則 <MathInline math="f" /> 的圖形在該區間<strong>凹向下</strong>。
          </li>
        </ul>
      </Theorem>

      {/* 反曲點的定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        反曲點 (Inflection Points)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當圖形從「向上彎曲」轉變為「向下彎曲」或反之，這個彎曲方向發生轉折的交界點被稱為反曲點：
      </p>

      <Definition title="反曲點 (Inflection Point)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若曲線在點 <MathInline math="(c, f(c))" /> 處有切線，且圖形在該點的左右兩側<strong>凹向性相反</strong>（即一側凹向上，另一側凹向下），則點 <MathInline math="(c, f(c))" /> 稱為該曲線的一個<strong>反曲點 (Inflection Point)</strong>。
        </p>
      </Definition>

      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
        padding: '20px'
      }}>
        <strong style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '8px' }}>⚠️ 尋找反曲點的注意事項：</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          反曲點的候選點為使 <MathInline math="f''(x) = 0" /> 或 <MathInline math="f''(x)" /> 不存在的點。
          然而，類似於臨界點，<MathInline math="f''(c) = 0" /> 並不保證該點一定是反曲點，<strong>必須確認二階導數在該點的左右兩側確實發生符號變號</strong>。例如對 <MathInline math="f(x) = x^4" />，其 <MathInline math="f''(0) = 0" />，但該函數在 <MathInline math="x=0" /> 兩側的二階導數均為正（恆凹向上），故原點不是其反曲點。
        </p>
      </div>

      {/* 二階導數測試法 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二階導數極值測試法 (The Second Derivative Test)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        除了觀察一階導數的變號，我們也可以直接利用二階導數（凹向性）來判定臨界點是局部極大值還是極小值。
        如果一個點斜率為 0（切線水平），且圖形凹向上，該點勢必是谷底（局部極小值）；同理，若圖形凹向下，該點勢必是山峰（局部極大值）：
      </p>

      <Theorem title="二階導數測試法 (The Second Derivative Test)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設 <MathInline math="f''" /> 在包含 <MathInline math="c" /> 的開區間內連續，且滿足 <MathInline math="f'(c) = 0" />：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            若 <MathInline math="f''(c) > 0" />，則 <MathInline math="f(c)" /> 為<strong>局部極小值 (Local Minimum)</strong>。
          </li>
          <li>
            若 <MathInline math="f''(c) < 0" />，則 <MathInline math="f(c)" /> 為<strong>局部極大值 (Local Maximum)</strong>。
          </li>
          <li>
            若 <MathInline math="f''(c) = 0" />，則此<strong>測試法失效</strong>。此時該點可能為局部極大值、局部極小值，或都不是極值（需改用一階導數測試法判定）。
          </li>
        </ul>
      </Theorem>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與詳細解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：多項式函數的完整性質分析與圖形描繪">
        <p style={{ color: 'var(--text-secondary)' }}>
          分析四次多項式函數 <MathInline math="f(x) = 3x^4 - 4x^3 - 12x^2 + 5" /> 的遞增減區間、局部極值、凹向性與反曲點，並描繪其圖形。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【第一步：求一階導數與臨界點】</strong>
          </p>
          <p style={{ marginBottom: '10px' }}>
            對 <MathInline math="f(x)" /> 微分一次：
            <MathBlock math="f'(x) = 12x^3 - 12x^2 - 24x" />
            將其因式分解：
            <MathBlock math="f'(x) = 12x(x^2 - x - 2) = 12x(x - 2)(x + 1)" />
            令 <MathInline math="f'(x) = 0" />，得到三個臨界點：<MathInline math="x = -1, 0, 2" />。
          </p>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第二步：求二階導數與反曲點候選點】</strong>
          </p>
          <p style={{ marginBottom: '10px' }}>
            對 <MathInline math="f'(x)" /> 再微分一次：
            <MathBlock math="f''(x) = 36x^2 - 24x - 24 = 12(3x^2 - 2x - 2)" />
            令 <MathInline math="f''(x) = 0" />，利用公式解求得：
            <MathBlock math="x = \frac{-(-2) \pm \sqrt{(-2)^2 - 4(3)(-2)}}{2(3)} = \frac{2 \pm \sqrt{28}}{6} = \frac{1 \pm \sqrt{7}}{3}" />
            大約值為 <MathInline math="x \approx -0.55" /> 與 <MathInline math="x \approx 1.22" />。
          </p>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第三步：建立區間分析表】</strong>
          </p>
          <p style={{ marginBottom: '10px' }}>
            利用臨界點與二階導數變號點將實數軸分段，分析各段的符號：
          </p>
          
          <div style={{ overflowX: 'auto', margin: '16px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '8px', textAlign: 'center' }}>區間</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}><MathInline math="x < -1" /></th>
                  <th style={{ padding: '8px', textAlign: 'center' }}><MathInline math="-1 < x < 0" /></th>
                  <th style={{ padding: '8px', textAlign: 'center' }}><MathInline math="0 < x < 2" /></th>
                  <th style={{ padding: '8px', textAlign: 'center' }}><MathInline math="x > 2" /></th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold' }}><MathInline math="f'(x)" /> 的符號</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#ef4444' }}>- (負)</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#10b981' }}>+ (正)</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#ef4444' }}>- (負)</td>
                  <td style={{ padding: '8px', textAlign: 'center', color: '#10b981' }}>+ (正)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>單調性</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>遞減</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>遞增</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>遞減</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>遞增</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ marginBottom: '10px' }}>
            根據一階導數測試法，我們可以得到：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '12px' }}>
            <li>在 <MathInline math="x = -1" /> 處，<MathInline math="f'" /> 由負變正，故 <MathInline math="f(-1) = 3(-1)^4 - 4(-1)^3 - 12(-1)^2 + 5 = 0" /> 為<strong>局部極小值</strong>。</li>
            <li>在 <MathInline math="x = 0" /> 處，<MathInline math="f'" /> 由正變負，故 <MathInline math="f(0) = 5" /> 為<strong>局部極大值</strong>。</li>
            <li>在 <MathInline math="x = 2" /> 處，<MathInline math="f'" /> 由負變正，故 <MathInline math="f(2) = 3(16) - 4(8) - 12(4) + 5 = -27" /> 為<strong>局部極小值</strong>。</li>
          </ul>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第四步：凹向性與反曲點】</strong>
          </p>
          <p style={{ marginBottom: '10px' }}>
            分析二階導數的符號：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '12px' }}>
            <li>當 <MathInline math="x < \frac{1-\sqrt{7}}{3} \approx -0.55" /> 時，<MathInline math="f''(x) > 0" />，圖形<strong>凹向上</strong>。</li>
            <li>當 <MathInline math="-0.55 < x < 1.22" /> 時，<MathInline math="f''(x) < 0" />，圖形<strong>凹向下</strong>。</li>
            <li>當 <MathInline math="x > 1.22" /> 時，<MathInline math="f''(x) > 0" />，圖形<strong>凹向上</strong>。</li>
          </ul>
          <p style={{ marginBottom: '10px' }}>
            因為二階導數在 <MathInline math="x = \frac{1\pm\sqrt{7}}{3}" /> 兩側皆變號，故這兩個點對應圖形上的點為<strong>反曲點</strong>，座標分別為：
            <MathBlock math="\left( -0.55, f(-0.55) \right) \approx (-0.55, 2.14) \quad \text{與} \quad \left( 1.22, f(1.22) \right) \approx (1.22, -13.36)" />
          </p>

          <p>
            <strong>【繪圖特徵總結】</strong>：
            圖形從左側出發，在區間 <MathInline math="(-\infty, -1)" /> 遞減且凹向上，到達最低點 <MathInline math="(-1, 0)" />。
            接著在 <MathInline math="(-1, 0)" /> 遞增，途中在 <MathInline math="x \approx -0.55" /> 彎曲方向改變（凹向上轉凹向下），並在 <MathInline math="(0, 5)" /> 達到局部極大值。
            隨後圖形開始下滑，在 <MathInline math="x \approx 1.22" /> 彎曲方向再度改變（凹向下轉凹向上），最終降至最低谷 <MathInline math="(2, -27)" />，並在 <MathInline math="x > 2" /> 之後往正無窮大方向急遽爬升。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：超越函數的單調性與凹向性分析">
        <p style={{ color: 'var(--text-secondary)' }}>
          設函數 <MathInline math="f(x) = x e^{-x}" />，試分析其在實數域上的單調區間、極值與反曲點。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【第一步：求一階導數與臨界點】</strong>
            <br />
            利用乘積微分法則對 <MathInline math="f(x) = x e^{-x}" /> 求導：
            <MathBlock math="f'(x) = 1 \cdot e^{-x} + x \cdot (-e^{-x}) = (1 - x)e^{-x}" />
            因為對於任何實數 <MathInline math="x" />，指數部分 <MathInline math="e^{-x}" /> 恆大於 0。
            因此，令 <MathInline math="f'(x) = 0" /> 可解得唯一的臨界點為 <MathInline math="x = 1" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>【第二步：分析單調性與極值】</strong>
            <br />
            觀察 <MathInline math="f'(x) = (1 - x)e^{-x}" /> 的符號：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '12px' }}>
            <li>當 <MathInline math="x < 1" /> 時，<MathInline math="1 - x > 0" />，所以 <MathInline math="f'(x) > 0" />（函數遞增）。</li>
            <li>當 <MathInline math="x > 1" /> 時，<MathInline math="1 - x < 0" />，所以 <MathInline math="f'(x) < 0" />（函數遞減）。</li>
          </ul>
          <p style={{ marginBottom: '10px' }}>
            因為一階導數在 <MathInline math="x = 1" /> 處由正變負，根據一階導數測試法，函數在該點有局部極大值：
            <MathBlock math="f(1) = 1 \cdot e^{-1} = \frac{1}{e} \approx 0.368" />
          </p>

          <p style={{ marginBottom: '10px' }}>
            <strong>【第三步：求二階導數與反曲點】</strong>
            <br />
            對一階導數再次求導：
            <MathBlock math="f''(x) = -1 \cdot e^{-x} + (1 - x)(-e^{-x}) = (x - 2)e^{-x}" />
            令 <MathInline math="f''(x) = 0" /> 得到唯一的候選點為 <MathInline math="x = 2" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            觀察二階導數的變號情況：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '12px' }}>
            <li>當 <MathInline math="x < 2" /> 時，<MathInline math="f''(x) < 0" />，圖形凹向下 (Concave Down)。</li>
            <li>當 <MathInline math="x > 2" /> 時，<MathInline math="f''(x) > 0" />，圖形凹向上 (Concave Up)。</li>
          </ul>
          <p>
            因為二階導數在 <MathInline math="x = 2" /> 兩側變號，故座標 <MathInline math="(2, 2e^{-2}) = (2, \frac{2}{e^2}) \approx (2, 0.27)" /> 為曲線的<strong>反曲點</strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：探討二階導數測試法失效的狀況">
        <p style={{ color: 'var(--text-secondary)' }}>
          比較以下三個函數在 <MathInline math="x = 0" /> 處的導數與極值，並說明為何當二階導數為 0 時，二階導數測試法失效：
          <MathBlock math="(a) \ f(x) = x^4 \quad\quad (b) \ g(x) = -x^4 \quad\quad (c) \ h(x) = x^3" />
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            我們分別計算三個函數在原點的導數特徵：
          </p>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '16px' }}>
            <li>
              <strong>對於 <MathInline math="f(x) = x^4" />：</strong>
              <br />
              一階與二階導數分別為：<MathInline math="f'(x) = 4x^3" />，<MathInline math="f''(x) = 12x^2" />。
              在 <MathInline math="x = 0" /> 處，我們有 <MathInline math="f'(0) = 0" /> 且 <MathInline math="f''(0) = 0" />。
              然而，由圖形可知，<MathInline math="f(x) = x^4 \ge 0 = f(0)" /> 對於所有實數成立，因此在 <MathInline math="x=0" /> 處實際上是一個<strong>局部極小值</strong>（也是全域最小值）。
            </li>
            <li>
              <strong>對於 <MathInline math="g(x) = -x^4" />：</strong>
              <br />
              一階與二階導數分別為：<MathInline math="g'(x) = -4x^3" />，<MathInline math="g''(x) = -12x^2" />。
              在 <MathInline math="x = 0" /> 處，同樣有 <MathInline math="g'(0) = 0" /> 且 <MathInline math="g''(0) = 0" />。
              但由於 <MathInline math="g(x) = -x^4 \le 0 = g(0)" /> 恆成立，所以該點在 <MathInline math="x=0" /> 處是一個<strong>局部極大值</strong>。
            </li>
            <li>
              <strong>對於 <MathInline math="h(x) = x^3" />：</strong>
              <br />
              一階與二階導數分別為：<MathInline math="h'(x) = 3x^2" />，<MathInline math="h''(x) = 6x" />。
              在 <MathInline math="x = 0" /> 處，同樣有 <MathInline math="h'(0) = 0" /> 且 <MathInline math="h''(0) = 0" />。
              但由於當 <MathInline math="x < 0" /> 時 <MathInline math="h(x) < 0" />，當 <MathInline math="x > 0" /> 時 <MathInline math="h(x) > 0" />，因此原點 <MathInline math="x=0" /> <strong>不是</strong>局部極值點（它其實是一個反曲點）。
            </li>
          </ol>
          <p style={{ lineHeight: '1.7' }}>
            <strong>【結論】</strong>：
            在這三種情況中，函數在臨界點 <MathInline math="x=0" /> 處的二階導數皆為 0（<MathInline math="f''(0) = g''(0) = h''(0) = 0" />）。
            但這三個函數在該點卻分別呈現了「極小值」、「極大值」與「非極值」三種截然不同的結果。
            這充分說明了當 <MathInline math="f''(c) = 0" /> 時，二階導數測試法<strong>無法提供任何確定性的結論</strong>。在這種情況下，我們必須退回使用<strong>一階導數測試法</strong>。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求分式函數 <MathInline math="f(x) = \frac{x}{x^2 + 1}" /> 在實數域上的單調區間與局部極值。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：臨界點為 <MathInline math="x = \pm 1" />。遞增區間為 <MathInline math="[-1, 1]" />，遞減區間為 <MathInline math="(-\infty, -1]" /> 與 <MathInline math="[1, \infty)" />。在 <MathInline math="x = 1" /> 處有局部極大值 <MathInline math="1/2" />；在 <MathInline math="x = -1" /> 處有局部極小值 <MathInline math="-1/2" />。）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 求三次多項式函數 <MathInline math="f(x) = x^3 - 6x^2 + 9x + 2" /> 的反曲點座標，並說明其在何處凹向上、何處凹向下。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：二階導數為 <MathInline math="f''(x) = 6x - 12" />。當 <MathInline math="x > 2" /> 時凹向上，當 <MathInline math="x < 2" /> 時凹向下。反曲點座標為 <MathInline math="(2, 4)" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

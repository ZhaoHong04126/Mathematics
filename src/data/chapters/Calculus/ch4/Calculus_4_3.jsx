import { useState } from 'react';
import { 
  // Definition, 
  Theorem, 
  Example, 
  Solution, 
  Proof,
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

function InteractiveMVT() {
  const [a, setA] = useState(0.0);
  const [b, setB] = useState(5.0);

  // f(x) = 0.05 * x^3 - 0.5 * x^2 + 1.2 * x + 2
  const f = (x) => 0.05 * x * x * x - 0.5 * x * x + 1.2 * x + 2;
  const df = (x) => 0.15 * x * x - x + 1.2;

  // Coordinate Mapping
  // Math x in [-1.5, 6.5] -> SVG X in [50, 450] (400px width)
  const toSvgX = (x) => 50 + (x + 1.5) * 50;
  // Math y in [-2.0, 5.0] -> SVG Y in [20, 300] (280px height)
  const toSvgY = (y) => 260 - (y + 1) * 40;

  // Generate curve path
  const curvePoints = [];
  for (let x = -1.5; x <= 6.5; x += 0.1) {
    curvePoints.push(`${toSvgX(x)},${toSvgY(f(x))}`);
  }
  const curveD = `M ${curvePoints.join(' L ')}`;

  // Calculate secant slope
  const fa = f(a);
  const fb = f(b);
  const m = (b - a === 0) ? df(a) : (fb - fa) / (b - a);

  // Find c: 0.15*c^2 - c + 1.2 = m => 0.15*c^2 - c + (1.2 - m) = 0
  // Quadratic formula: c = (1 +- sqrt(1 - 4 * 0.15 * (1.2 - m))) / 0.3
  const delta = 1 - 0.6 * (1.2 - m);
  const cValues = [];
  if (delta >= 0) {
    const c1 = (1 + Math.sqrt(delta)) / 0.3;
    const c2 = (1 - Math.sqrt(delta)) / 0.3;
    // We only keep c that lies strictly within (a, b)
    const epsilon = 1e-5;
    if (c1 >= a - epsilon && c1 <= b + epsilon) cValues.push(c1);
    if (c2 >= a - epsilon && c2 <= b + epsilon) cValues.push(c2);
  }

  // Draw secant line segment (extended slightly)
  const secantSlope = m;
  const secantIntercept = fa - secantSlope * a;
  const secantX1 = a - 0.5;
  const secantX2 = b + 0.5;
  const secantY1 = secantSlope * secantX1 + secantIntercept;
  const secantY2 = secantSlope * secantX2 + secantIntercept;

  return (
    <div style={{
      margin: '24px 0',
      padding: '24px',
      backgroundColor: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '8px', color: 'var(--accent-primary)' }}>
        🎯 幾何動態模擬：均值定理的視覺化
      </strong>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        拖曳下方的滑桿，調整區間端點 <MathInline math="a" /> 與 <MathInline math="b" /> 的值。
        觀察連接端點的<strong>紅色虛線（割線）</strong>，以及與之平行的<strong>綠色實線（切線）</strong>。
        均值定理保證了：在開區間內，必定能找到至少一個切點 <MathInline math="c" /> 使得其切線與割線平行。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* SVG Area */}
        <div style={{
          position: 'relative',
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          padding: '10px 0'
        }}>
          <svg width="500" height="320" viewBox="0 0 500 320" style={{ maxWidth: '100%' }}>
            {/* Grid Axes */}
            <line x1="50" y1="260" x2="450" y2="260" stroke="var(--border-color)" strokeWidth="1.5" /> {/* X axis */}
            <line x1="125" y1="20" x2="125" y2="300" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="4 4" /> {/* Y axis at x=0 */}
            
            {/* Ticks and Labels */}
            <text x="120" y="275" fontSize="10" fill="var(--text-tertiary)">0</text>
            <text x="445" y="275" fontSize="10" fill="var(--text-tertiary)">x</text>
            <text x="110" y="30" fontSize="10" fill="var(--text-tertiary)">y</text>
            
            {/* Function Curve */}
            <path d={curveD} fill="none" stroke="var(--accent-primary)" strokeWidth="2.5" />
            
            {/* Interval shading lines */}
            <line x1={toSvgX(a)} y1="20" x2={toSvgX(a)} y2="300" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" />
            <line x1={toSvgX(b)} y1="20" x2={toSvgX(b)} y2="300" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="3 3" />
            <text x={toSvgX(a) - 8} y="295" fontSize="11" fontWeight="600" fill="var(--text-secondary)">a</text>
            <text x={toSvgX(b) + 3} y="295" fontSize="11" fontWeight="600" fill="var(--text-secondary)">b</text>

            {/* Secant line */}
            {a !== b && (
              <line 
                x1={toSvgX(secantX1)} 
                y1={toSvgY(secantY1)} 
                x2={toSvgX(secantX2)} 
                y2={toSvgY(secantY2)} 
                stroke="var(--accent-warm)" 
                strokeWidth="2" 
                strokeDasharray="5 4" 
              />
            )}

            {/* Tangent lines at c values */}
            {cValues.map((cVal, idx) => {
              const yc = f(cVal);
              const tSlope = df(cVal);
              // Draw line segment centered at cVal
              const tX1 = cVal - 1.0;
              const tX2 = cVal + 1.0;
              const tY1 = yc - tSlope * 1.0;
              const tY2 = yc + tSlope * 1.0;

              return (
                <g key={idx}>
                  {/* Tangent line */}
                  <line 
                    x1={toSvgX(tX1)} 
                    y1={toSvgY(tY1)} 
                    x2={toSvgX(tX2)} 
                    y2={toSvgY(tY2)} 
                    stroke="#10b981" 
                    strokeWidth="2" 
                  />
                  {/* helper line to X axis */}
                  <line 
                    x1={toSvgX(cVal)} 
                    y1={toSvgY(yc)} 
                    x2={toSvgX(cVal)} 
                    y2="260" 
                    stroke="#10b981" 
                    strokeWidth="1.2" 
                    strokeDasharray="2 2" 
                  />
                  {/* Tangent Point dot */}
                  <circle cx={toSvgX(cVal)} cy={toSvgY(yc)} r="5" fill="#10b981" />
                  <text x={toSvgX(cVal) - 14} y={toSvgY(yc) - 10} fontSize="11" fontWeight="bold" fill="#10b981">
                    c{cValues.length > 1 ? idx + 1 : ''}
                  </text>
                </g>
              );
            })}

            {/* Endpoint dots */}
            <circle cx={toSvgX(a)} cy={toSvgY(fa)} r="6" fill="var(--accent-warm)" />
            <circle cx={toSvgX(b)} cy={toSvgY(fb)} r="6" fill="var(--accent-warm)" />
          </svg>
        </div>

        {/* Sliders and Info Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                <span>區間左端點 a:</span>
                <span style={{ color: 'var(--accent-warm)', fontWeight: '600' }}>{a.toFixed(1)}</span>
              </label>
              <input 
                type="range" 
                min="-1.0" 
                max="3.0" 
                step="0.1" 
                value={a} 
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (val <= b) setA(val);
                }}
                style={{ width: '100%', marginTop: '6px', cursor: 'pointer' }}
              />
            </div>
            <div>
              <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
                <span>區間右端點 b:</span>
                <span style={{ color: 'var(--accent-warm)', fontWeight: '600' }}>{b.toFixed(1)}</span>
              </label>
              <input 
                type="range" 
                min="1.0" 
                max="6.0" 
                step="0.1" 
                value={b} 
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (val >= a) setB(val);
                }}
                style={{ width: '100%', marginTop: '6px', cursor: 'pointer' }}
              />
            </div>
          </div>

          {/* Readout panel */}
          <div style={{
            padding: '16px',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.85rem',
            lineHeight: '1.6',
            color: 'var(--text-secondary)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>📊 割線（平均變率）：</strong>
              <div style={{ fontFamily: 'monospace', marginTop: '2px', paddingLeft: '8px' }}>
                m = [f(b)-f(a)]/(b-a) = {m.toFixed(4)}
              </div>
            </div>
            <div style={{ borderTop: '1px dashed var(--border-color)', margin: '4px 0' }}></div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>⚡ 切線（瞬時變率）：</strong>
              {cValues.length === 0 ? (
                <div style={{ color: 'var(--accent-warm)', marginTop: '2px', paddingLeft: '8px' }}>
                  目前區間內無符合的 c 點 (a = b)
                </div>
              ) : (
                cValues.map((cVal, idx) => (
                  <div key={idx} style={{ fontFamily: 'monospace', marginTop: '2px', paddingLeft: '8px' }}>
                    c{cValues.length > 1 ? idx + 1 : ''} = {cVal.toFixed(4)} → f'(c) = {df(cVal).toFixed(4)}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calculus_4_3() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
        均值定理（Mean Value Theorem）是微積分學中最重要、最核心的定理之一。
        它在幾何上建立起了**「平均變化率」**與**「瞬時變化率」**之間的關聯，不僅能直觀理解，更是許多高等微積分定理（如微積分基本定理、函數單調性判斷等）的最核心基石。
      </p>

      {/* 羅爾定理 */}
      <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        羅爾定理 (Rolle's Theorem)
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
        在學習一般的均值定理前，我們首先認識其特殊情形——**羅爾定理**。該定理由法國數學家米歇爾·羅爾於 1691 年提出，描述了端點函數值相等時的情形：
      </p>

      <Theorem title="羅爾定理 (Rolle's Theorem)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '8px' }}>
          設函數 <MathInline math="f" /> 滿足下列三個條件：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px', margin: '0 0 12px 0' }}>
          <li>在閉區間 <MathInline math="[a, b]" /> 上<strong>連續</strong>。</li>
          <li>在開區間 <MathInline math="(a, b)" /> 內<strong>可微</strong>。</li>
          <li>在區間端點處的函數值相等，即 <MathInline math="f(a) = f(b)" />。</li>
        </ol>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
          則在開區間 <MathInline math="(a, b)" /> 內必定存在至少一個點 <MathInline math="c" />（即 <MathInline math="c \in (a, b)" />），使得：
        </p>
        <MathBlock math="f'(c) = 0" />
      </Theorem>

      <Proof title="顯示羅爾定理的證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', padding: '0 4px' }}>
          <strong>證明：</strong>
          <br />
          我們依據函數是否為常數，分為兩種情況進行討論：
          <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>情況 (1)：<MathInline math="f" /> 在 <MathInline math="[a, b]" /> 上為常數函數。</strong>
              <br />
              即 <MathInline math="f(x) = k" />（其中 <MathInline math="k" /> 為常數，適用於所有 <MathInline math="x \in [a, b]" />）。
              由於常數的導數為 0，因此對於開區間內的所有 <MathInline math="x \in (a, b)" />，均有 <MathInline math="f'(x) = 0" />。
              此時，區間內的任意點 <MathInline math="c" /> 均滿足 <MathInline math="f'(c) = 0" />。
            </li>
            <li>
              <strong>情況 (2)：<MathInline math="f" /> 在 <MathInline math="[a, b]" /> 上不是常數函數。</strong>
              <br />
              1. 由於 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上連續，根據<strong>極端值定理 (EVT)</strong>，<MathInline math="f" /> 在該區間上必定存在絕對最大值與絕對最小值。
              <br />
              2. 因為 <MathInline math="f" /> 不是常數函數，且已知端點值相等（即 <MathInline math="f(a) = f(b)" />），這代表<strong>絕對最大值與絕對最小值中，至少有一個不會發生在端點上</strong>。也就是說，至少有一個全域極值點必定落在開區間 <MathInline math="(a, b)" /> 內部，設此點為 <MathInline math="c \in (a, b)" />。
              <br />
              3. 由於 <MathInline math="c" /> 是開區間內部的極值點，因此它也是一個局部極值點（相對極大值或相對極小值）。
              <br />
              4. 又因為 <MathInline math="f" /> 在開區間 <MathInline math="(a, b)" /> 內可微，故導數 <MathInline math="f'(c)" /> 必定存在。
              <br />
              5. 根據<strong>費馬定理</strong>，可微函數在局部極值點處的導數必定為 0，因此可得：
              <MathBlock math="f'(c) = 0" />
            </li>
          </ul>
          綜上所述，不論哪種情況，開區間內必定存在至少一個點 <MathInline math="c \in (a, b)" /> 使得 <MathInline math="f'(c) = 0" />。
        </div>
      </Proof>

      <div style={{
        margin: '12px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(6, 182, 212, 0.02)',
        padding: '20px'
      }}>
        <strong style={{ color: 'var(--accent-secondary)', display: 'block', marginBottom: '8px' }}>💡 幾何直觀與條件的必要性</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          <strong>幾何意義：</strong> 如果一條平滑的曲線起點 and 終點的高度相同，那麼在這兩點之間，曲線至少有一個地方會「轉彎」，該處的切線是水平的（即斜率為 0）。
          <br />
          <strong>條件的必要性：</strong> 羅爾定理的三個條件缺一不可。
          <br />
          • 若不滿足<strong>連續性</strong>：如 <MathInline math="f(x) = x" /> 在 <MathInline math="[0, 1)" />，而 <MathInline math="f(1) = 0" />。雖然端點相等且可微，但因在端點處不連續，曲線在區間內沒有水平切線。
          <br />
          • 若不滿足<strong>可微性</strong>：如絕對值函數 <MathInline math="f(x) = |x|" /> 在 <MathInline math="[-1, 1]" />。雖然連續且端點相等，但在 <MathInline math="x=0" /> 處不可微（有尖角點），該區間內沒有任何點的導數為 0。
        </p>
      </div>

      <Example title="羅爾定理的驗證與求解">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          驗證函數 <MathInline math="f(x) = x^4 - 2x^2" /> 在區間 <MathInline math="[-\sqrt{2}, \sqrt{2}]" /> 上是否滿足羅爾定理的三個條件，若滿足，求出所有符合定理的 <MathInline math="c" /> 值。
        </p>
        <Solution>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
            <li>
              <strong>連續性：</strong> <MathInline math="f(x)" /> 為多項式函數，故在整個實數集上皆連續，自明在閉區間 <MathInline math="[-\sqrt{2}, \sqrt{2}]" /> 上連續。
            </li>
            <li>
              <strong>可微性：</strong> 多項式在任意開區間內皆可微，其導數為 <MathInline math="f'(x) = 4x^3 - 4x" />，顯然在開區間 <MathInline math="(-\sqrt{2}, \sqrt{2})" /> 內存在。
            </li>
            <li>
              <strong>端點相等：</strong> 計算端點函數值：
              <MathBlock math="f(-\sqrt{2}) = (-\sqrt{2})^4 - 2(-\sqrt{2})^2 = 4 - 4 = 0" />
              <MathBlock math="f(\sqrt{2}) = (\sqrt{2})^4 - 2(\sqrt{2})^2 = 4 - 4 = 0" />
              割線斜率為 0，端點值相等。
            </li>
            <li>
              <strong>求解符合條件的 c：</strong> 令 <MathInline math="f'(c) = 0" />，即：
              <MathBlock math="4c^3 - 4c = 0 \implies 4c(c^2 - 1) = 0" />
              可解得 <MathInline math="c = 0, \pm 1" />。
              我們檢驗這三個解是否都落在開區間 <MathInline math="(-\sqrt{2}, \sqrt{2}) \approx (-1.414, 1.414)" /> 內：
              由於 <MathInline math="-1.414 < -1 < 0 < 1 < 1.414" />，這三個點均在區間內部。
              故符合羅爾定理的臨界點共有三個：<MathInline math="c_1 = -1" />、<MathInline math="c_2 = 0" />、<MathInline math="c_3 = 1" />。
            </li>
          </ol>
        </Solution>
      </Example>

      {/* 均值定理 */}
      <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        均值定理 (Mean Value Theorem, MVT)
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
        如果我們把羅爾定理中「端點函數值必須相等」的限制拿掉，曲線兩端點可以有高度差，這就引出了最為著名的**拉格朗日均值定理**：
      </p>

      <Theorem title="均值定理 (Mean Value Theorem)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '8px' }}>
          設函數 <MathInline math="f" /> 滿足下列兩個條件：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px', margin: '0 0 12px 0' }}>
          <li>在閉區間 <MathInline math="[a, b]" /> 上<strong>連續</strong>。</li>
          <li>在開區間 <MathInline math="(a, b)" /> 內<strong>可微</strong>。</li>
        </ol>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
          則在開區間 <MathInline math="(a, b)" /> 內必定存在至少一個點 <MathInline math="c" />（即 <MathInline math="c \in (a, b)" />），使得：
        </p>
        <MathBlock math="f'(c) = \frac{f(b) - f(a)}{b - a}" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '8px 0 0 0' }}>
          此等式也可以等價地寫成更常用於估計函數值差額的形式：
        </p>
        <MathBlock math="f(b) - f(a) = f'(c)(b - a)" />
      </Theorem>

      {/* 幾何與物理直觀 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
        margin: '12px 0'
      }}>
        {/* Geometric Card */}
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          borderLeft: '5px solid var(--accent-primary)'
        }}>
          <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '10px', fontSize: '0.98rem' }}>
            📐 幾何意義：割線斜率 = 切線斜率
          </strong>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', lineHeight: '1.7' }}>
            在圖形上，分式 <MathInline math="\frac{f(b) - f(a)}{b - a}" /> 代表連接點 <MathInline math="A(a, f(a))" /> 與點 <MathInline math="B(b, f(b))" /> 的<strong>割線斜率</strong>。
            而 <MathInline math="f'(c)" /> 代表曲線在點 <MathInline math="c" /> 處的<strong>切線斜率</strong>。
            均值定理說明：只要曲線平滑連續，就必定能在區間內找到一個點 <MathInline math="c" />，該點的切線與這條割線<strong>完全平行</strong>。
          </p>
        </div>

        {/* Physical Card */}
        <div style={{
          padding: '20px',
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          borderLeft: '5px solid var(--accent-warm)'
        }}>
          <strong style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '10px', fontSize: '0.98rem' }}>
            🚗 物理意義：平均速度 = 瞬時速度
          </strong>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem', lineHeight: '1.7' }}>
            如果一台車在 2 小時內行駛了 100 公里，它的<strong>平均速度</strong>是 50 公里/小時。
            均值定理指出：在這段旅途中，該車的時速表在<strong>某個瞬間（至少一次）</strong>必定會精確地指在 50 公里/小時。
            這也是高速公路進行「區間測速」時判定超速的數學與法律核心依據。
          </p>
        </div>
      </div>

      {/* 互動模擬元件調用 */}
      <InteractiveMVT />

      <Example title="拉格朗日均值定理的應用">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          對函數 <MathInline math="f(x) = x^3 - x" /> 在區間 <MathInline math="[0, 2]" /> 上應用均值定理，求出所有符合定理結論的 <MathInline math="c" /> 值。
        </p>
        <Solution>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
            <li>
              <strong>條件檢查：</strong> 由於 <MathInline math="f(x)" /> 是多項式函數，它在 <MathInline math="[0, 2]" /> 上連續且在開區間 <MathInline math="(0, 2)" /> 內可微，均值定理條件滿足。
            </li>
            <li>
              <strong>計算割線斜率（平均變化率）：</strong>
              <MathBlock math="f(0) = 0^3 - 0 = 0" />
              <MathBlock math="f(2) = 2^3 - 2 = 6" />
              <MathBlock math="\frac{f(2) - f(0)}{2 - 0} = \frac{6 - 0}{2} = 3" />
              平均變化率為 3。
            </li>
            <li>
              <strong>求解符合條件的 c：</strong> 函數的導數為 <MathInline math="f'(x) = 3x^2 - 1" />。
              根據均值定理，我們需要令 <MathInline math="f'(c) = 3" />：
              <MathBlock math="3c^2 - 1 = 3 \implies 3c^2 = 4 \implies c^2 = \frac{4}{3}" />
              可解得 <MathInline math="c = \pm \frac{2}{\sqrt{3}} \approx \pm 1.155" />。
            </li>
            <li>
              <strong>區間篩選：</strong> 由於我們要求 <MathInline math="c" /> 必須落在開區間 <MathInline math="(0, 2)" /> 內：
              <MathInline math="-\frac{2}{\sqrt{3}} \approx -1.155 \notin (0, 2)" />（捨去）。
              而 <MathInline math="\frac{2}{\sqrt{3}} \approx 1.155 \in (0, 2)" />（符合）。
              因此，符合均值定理結論的點只有一個，即 <MathInline math="c = \frac{2}{\sqrt{3}}" />。
            </li>
          </ol>
        </Solution>
      </Example>

      {/* 重要推論 */}
      <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        均值定理的重要推論
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
        均值定理之所以強大，在於它可以推導出許多關於函數全局行為的深刻定理。以下是我們在往後微積分（尤其是積分學）中極度依賴的兩個核心推論：
      </p>

      <Theorem title="推論一：導數為 0 則函數為常數">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若函數 <MathInline math="f" /> 在區間 <MathInline math="I" /> 上可微，且對於區間內的所有 <MathInline math="x" />，其一階導數皆為 0（即 <MathInline math="f'(x) = 0" />），則：
          <MathInline math="f" /> 在該區間上必定是一個<strong>常數函數 (Constant Function)</strong>，即 <MathInline math="f(x) = C" />。
        </p>
      </Theorem>
      <Proof title="顯示證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', padding: '0 4px' }}>
          <strong>證明：</strong> 
          在區間內任取兩點 <MathInline math="x_1 < x_2" />。因為 <MathInline math="f" /> 滿足均值定理條件，在區間 <MathInline math="[x_1, x_2]" /> 上必存在 <MathInline math="c \in (x_1, x_2)" /> 使得：
          <MathBlock math="f(x_2) - f(x_1) = f'(c)(x_2 - x_1)" />
          因為已知所有點的導數皆為 0，故 <MathInline math="f'(c) = 0" />。
          代入上式可得 <MathInline math="f(x_2) - f(x_1) = 0 \implies f(x_2) = f(x_1)" />。
          由於 <MathInline math="x_1" /> 與 <MathInline math="x_2" /> 是任意選取的，這說明區間內所有的函數值都相等，故 <MathInline math="f(x)" /> 必為常數。
        </div>
      </Proof>

      <Theorem title="推論二：導數相等的函數相差常數">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '8px' }}>
          若兩個函數 <MathInline math="f" /> 與 <MathInline math="g" /> 在區間 <MathInline math="I" /> 上可微，且對於區間內的所有 <MathInline math="x" /> 均滿足 <MathInline math="f'(x) = g'(x)" />，則：
          在該區間上，兩函數之間必定相差一個常數，即存在常數 <MathInline math="C" /> 使得：
        </p>
        <MathBlock math="f(x) = g(x) + C" />
      </Theorem>
      <Proof title="顯示證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', padding: '0 4px' }}>
          <strong>證明：</strong> 
          令一個新的輔助函數 <MathInline math="h(x) = f(x) - g(x)" />。
          對其求導可得：<MathInline math="h'(x) = f'(x) - g'(x)" />。
          因為已知 <MathInline math="f'(x) = g'(x)" />，所以對於區間內所有點，<MathInline math="h'(x) = 0" />。
          根據<strong>推論一</strong>，<MathInline math="h(x)" /> 必定是一個常數，即 <MathInline math="h(x) = C" />。
          因此，<MathInline math="f(x) - g(x) = C \implies f(x) = g(x) + C" />。
          <br />
          這也是為什麼當我們求不定積分時，答案尾端必定要加上積分常數 <MathInline math="+ C" /> 的嚴格數學理論來源。
        </div>
      </Proof>

      {/* 課後練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 考慮函數 <MathInline math="f(x) = x^3 - 3x" /> 在區間 <MathInline math="[-1, 2]" /> 上是否適用拉格朗日均值定理？若適用，求符合定理的所有 <MathInline math="c" /> 值。
            <Solution>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 0 0' }}>
                <li>
                  <strong>條件檢查：</strong> <MathInline math="f(x)" /> 為多項式函數，在整個實數集上連續且可微，故在 <MathInline math="[-1, 2]" /> 上連續且在開區間 <MathInline math="(-1, 2)" /> 內可微，因此適用拉格朗日均值定理。
                </li>
                <li>
                  <strong>計算割線斜率（平均變化率）：</strong>
                  <br />
                  <MathInline math="f(-1) = (-1)^3 - 3(-1) = 2" />
                  <br />
                  <MathInline math="f(2) = 2^3 - 3(2) = 2" />
                  <br />
                  由於兩端點值相等（<MathInline math="f(-1) = f(2) = 2" />），平均變化率為：
                  <MathBlock math="m = \frac{f(2) - f(-1)}{2 - (-1)} = \frac{2 - 2}{3} = 0" />
                  （註：這也是羅爾定理的特殊情形）。
                </li>
                <li>
                  <strong>求解符合的 c 值：</strong> 導數為 <MathInline math="f'(x) = 3x^2 - 3" />，令其等於平均變化率 0：
                  <MathBlock math="3c^2 - 3 = 0 \implies c^2 = 1 \implies c = \pm 1" />
                </li>
                <li>
                  <strong>範圍篩選：</strong> 符合定理的 <MathInline math="c" /> 必須嚴格落在開區間 <MathInline math="(-1, 2)" /> 內。
                  由於 <MathInline math="c = -1" /> 是區間的左端點（不屬於開區間），故排除；而 <MathInline math="c = 1" /> 確實滿足 <MathInline math="-1 < 1 < 2" />。
                  因此，符合均值定理的點為：<strong><MathInline math="c = 1" /></strong>。
                </li>
              </ol>
            </Solution>
          </div>
        </ExerciseItem>

        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 利用均值定理證明不等式：對於任意實數 <MathInline math="a < b" />，均有 <MathInline math={"|\\sin(b) - \\sin(a)| \\le |b - a|"} />。
            <Solution>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 0 0' }}>
                <li>
                  <strong>定義函數與檢查條件：</strong> 令 <MathInline math="f(x) = \\sin(x)" />。正弦函數在整個實數集 <MathInline math={"\\mathbb{R}"} /> 上皆連續且可微，因此在任意區間 <MathInline math="[a, b]" /> 上均適用拉格朗日均值定理。
                </li>
                <li>
                  <strong>應用均值定理：</strong> 必定存在一個點 <MathInline math={"c \\in (a, b)"} />，使得：
                  <MathBlock math={"\\frac{\\sin(b) - \\sin(a)}{b - a} = f'(c)"} />
                </li>
                <li>
                  <strong>微分與求絕對值：</strong> 由於 <MathInline math={"f'(x) = \\cos(x)"} />，上式成為：
                  <MathBlock math={"\\frac{\\sin(b) - \\sin(a)}{b - a} = \\cos(c)"} />
                  對兩邊取絕對值：
                  <MathBlock math={"\\frac{|\\sin(b) - \\sin(a)|}{|b - a|} = |\\cos(c)|"} />
                </li>
                <li>
                  <strong>不等式估計：</strong> 由於對於任何實數 <MathInline math="c" />，餘弦函數均滿足 <MathInline math={"|\\cos(c)| \\le 1"} />，故可得：
                  <MathBlock math={"\\frac{|\\sin(b) - \\sin(a)|}{|b - a|} \\le 1"} />
                  兩邊同乘以正數 <MathInline math="|b - a|" />，即得證：
                  <MathBlock math={"|\\sin(b) - \\sin(a)| \\le |b - a|"} />
                </li>
              </ol>
            </Solution>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

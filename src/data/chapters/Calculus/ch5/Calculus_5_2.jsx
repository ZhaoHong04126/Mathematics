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

function RiemannSumVisualizer() {
  const [n, setN] = useState(6);
  const [approxType, setApproxType] = useState('right'); // 'left' or 'right'

  // Coordinate mapping:
  // Math x in [0, 1.1] -> SVG X in [50, 450] (Width = 400)
  // Math y in [0, 1.1] -> SVG Y in [300, 40] (Height = 260)
  const toSvgX = (x) => 50 + x * 360;
  const toSvgY = (y) => 280 - y * 230;

  // Generate curve path for y = x^2
  const points = [];
  for (let x = 0; x <= 1.05; x += 0.02) {
    points.push(`${toSvgX(x)},${toSvgY(x * x)}`);
  }
  const pathD = `M ${points.join(' L ')}`;

  // Generate rectangles and calculate sum
  const rects = [];
  const deltaX = 1 / n;
  let approxSum = 0;

  for (let i = 0; i < n; i++) {
    const xl = i / n;
    const xr = (i + 1) / n;
    const targetX = approxType === 'left' ? xl : xr;
    const yVal = targetX * targetX;
    approxSum += yVal * deltaX;

    const rx = toSvgX(xl);
    const ry = toSvgY(yVal);
    const rw = deltaX * 360;
    const rh = yVal * 230;

    rects.push(
      <rect
        key={i}
        x={rx}
        y={ry}
        width={rw}
        height={rh}
        fill={approxType === 'left' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(139, 92, 246, 0.15)'}
        stroke={approxType === 'left' ? 'var(--accent-secondary)' : 'var(--accent-primary)'}
        strokeWidth="1.5"
        style={{ transition: 'all 0.2s ease' }}
      />
    );
  }

  const actualArea = 1 / 3;
  const errorVal = Math.abs(approxSum - actualArea);

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
        📊 互動模擬：黎曼長方形面積分割逼近
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
        藉由調整滑桿改變分割段數 <MathInline math="n" />，並切換左端點與右端點逼近。當 <MathInline math="n \to \infty" /> 時，長方形總面積將會完美收斂至曲線下方的真實面積 <MathInline math="1/3" />。
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Toggle buttons and Slider */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Toggle buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setApproxType('left')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: approxType === 'left' ? 'rgba(6, 182, 212, 0.15)' : 'var(--bg-primary)',
                color: approxType === 'left' ? 'var(--accent-secondary)' : 'var(--text-secondary)',
                fontWeight: approxType === 'left' ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              左端點逼近 (Lₙ)
            </button>
            <button
              onClick={() => setApproxType('right')}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: approxType === 'right' ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-primary)',
                color: approxType === 'right' ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: approxType === 'right' ? '600' : '400',
                cursor: 'pointer',
                transition: 'var(--transition)',
              }}
            >
              右端點逼近 (Rₙ)
            </button>
          </div>

          {/* Slider for n */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '220px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              分割數 <strong>n = {n}</strong>
            </span>
            <input 
              type="range" 
              min="2" 
              max="50" 
              step="1" 
              value={n} 
              onChange={(e) => setN(parseInt(e.target.value))}
              style={{ 
                flex: 1,
                accentColor: approxType === 'left' ? 'var(--accent-secondary)' : 'var(--accent-primary)',
                cursor: 'pointer',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }} 
            />
          </div>
        </div>

        {/* SVG Drawing Area */}
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
            <line x1="50" y1={toSvgY(0.5)} x2="450" y2={toSvgY(0.5)} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1="50" y1={toSvgY(1.0)} x2="450" y2={toSvgY(1.0)} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1={toSvgX(0.5)} y1="40" x2={toSvgX(0.5)} y2="280" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <line x1={toSvgX(1.0)} y1="40" x2={toSvgX(1.0)} y2="280" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

            {/* Rectangles */}
            {rects}

            {/* Curve f(x) = x^2 */}
            <path 
              d={pathD} 
              fill="none" 
              stroke="var(--accent-warm)" 
              strokeWidth="3" 
            />

            {/* X & Y Axes */}
            <line x1="30" y1={toSvgY(0)} x2="470" y2={toSvgY(0)} stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1="20" x2={toSvgX(0)} y2="300" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5" />

            {/* Ticks and Labels */}
            {/* X-axis ticks */}
            <line x1={toSvgX(0.5)} y1={toSvgY(0)} x2={toSvgX(0.5)} y2={toSvgY(0) + 5} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <text x={toSvgX(0.5)} y={toSvgY(0) + 18} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">0.5</text>
            
            <line x1={toSvgX(1.0)} y1={toSvgY(0)} x2={toSvgX(1.0)} y2={toSvgY(0) + 5} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <text x={toSvgX(1.0)} y={toSvgY(0) + 18} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="middle">1.0</text>

            {/* Y-axis ticks */}
            <line x1={toSvgX(0) - 5} y1={toSvgY(0.5)} x2={toSvgX(0)} y2={toSvgY(0.5)} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <text x={toSvgX(0) - 10} y={toSvgY(0.5) + 4} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="end">0.5</text>

            <line x1={toSvgX(0) - 5} y1={toSvgY(1.0)} x2={toSvgX(0)} y2={toSvgY(1.0)} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <text x={toSvgX(0) - 10} y={toSvgY(1.0) + 4} fill="rgba(255,255,255,0.5)" fontSize="10" textAnchor="end">1.0</text>

            {/* Label texts */}
            <text x="465" y={toSvgY(0) - 6} fill="rgba(255, 255, 255, 0.5)" fontSize="11" textAnchor="end">x</text>
            <text x={toSvgX(0) + 8} y="32" fill="rgba(255, 255, 255, 0.5)" fontSize="11">y</text>
            <text x={toSvgX(0) - 10} y={toSvgY(0) + 14} fill="rgba(255, 255, 255, 0.3)" fontSize="10">0</text>

            {/* Curve Label */}
            <text x={toSvgX(0.85)} y={toSvgY(0.85 * 0.85) - 10} fill="var(--accent-warm)" fontSize="11" fontWeight="600">y = x²</text>
          </svg>
        </div>

        {/* Readout statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
          {/* Estimate Sum */}
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              長方形估計面積
            </div>
            <div style={{ 
              fontSize: '1.25rem', 
              fontWeight: '700', 
              color: approxType === 'left' ? 'var(--accent-secondary)' : 'var(--accent-primary)' 
            }}>
              {approxType === 'left' ? 'L' : 'R'} = {approxSum.toFixed(6)}
            </div>
          </div>

          {/* Actual Area */}
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              真實面積
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              A = 1/3 ≈ 0.333333
            </div>
          </div>

          {/* Error */}
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginBottom: '4px' }}>
              逼近誤差 (Error)
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--accent-warm)' }}>
              {errorVal.toFixed(6)}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Calculus_5_2() {
  return (
    <div>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在幾何學中，計算多邊形（如三角形、矩形）的面積非常簡單，因為我們可以將其拆解成數個基本的幾何圖形。但當我們面對由不規則曲線所圍成的區域時，求取面積就變成了一項極具挑戰性的幾何難題。
        在本節中，我們將學習如何利用<strong>「長方形分割逼近法」</strong>來逐步估算一個曲線下方區域的面積，並透過極限的工具，求得精確的面積數值。這種思維是建立定積分（Definite Integral）最為核心的前置基礎。
      </p>

      {/* 經典例子 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        求 <MathInline math="y = x^2" /> 下方的面積
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        考慮函數 <MathInline math="f(x) = x^2" />，我們希望求出該曲線、<MathInline math="x" /> 軸，以及垂直線 <MathInline math="x = 0" /> 與 <MathInline math="x = 1" /> 所圍成的區域面積。
        因為這條邊界是彎曲的（拋物線），我們無法直接套用常規公式。
        為了估計這個面積，我們可以將區間 <MathInline math="[0, 1]" /> 等分成若干段，並在每段區間上構造一個長方形。
      </p>

      {/* 定義 L_n 與 R_n */}
      <Definition title="左端點與右端點逼近 (Left/Right Endpoint Approximations)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '8px' }}>
          將積分區間 <MathInline math="[a, b]" /> 等分成 <MathInline math="n" /> 個子區間，每一段的寬度為：
          <MathInline math="\Delta x = \frac{b-a}{n}" />
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>左端點逼近 (Left Endpoint Approximation) <MathInline math="L_n" />：</strong>
            以每個子區間的<strong>左側端點</strong>對應的函數值作為該長方形的高度。
          </li>
          <li>
            <strong>右端點逼近 (Right Endpoint Approximation) <MathInline math="R_n" />：</strong>
            以每個子區間的<strong>右側端點</strong>對應的函數值作為該長方形的高度。
          </li>
        </ul>
      </Definition>

      {/* 第一部分：分步推導 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: '24px 0' }}>
        
        {/* n = 2 情況 */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          boxShadow: 'var(--shadow-sm)'
        }} className="math-serif">
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '10px', fontSize: '1.1rem' }}>
            1. 當分割數 <MathInline math="n = 2" /> 時（分成兩等份，每段寬度 <MathInline math="\Delta x = 1/2" />）：
          </strong>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '10px' }}>
            子區間為 <MathInline math="[0, 1/2]" /> 與 <MathInline math="[1/2, 1]" />。
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <strong>右端點估計 <MathInline math="R_2" />：</strong>
              高度採右端點的函數值 <MathInline math="f(1/2)" /> 與 <MathInline math="f(1)" />：
              <MathBlock math="R_2 = \frac{1}{2} \cdot \left(\frac{1}{2}\right)^2 + \frac{1}{2} \cdot 1^2 = \frac{1}{8} + \frac{1}{2} = \frac{5}{8} = 0.625" />
            </li>
            <li>
              <strong>左端點估計 <MathInline math="L_2" />：</strong>
              高度採左端點的函數值 <MathInline math="f(0)" /> 與 <MathInline math="f(1/2)" />：
              <MathBlock math="L_2 = \frac{1}{2} \cdot 0^2 + \frac{1}{2} \cdot \left(\frac{1}{2}\right)^2 = 0 + \frac{1}{8} = \frac{1}{8} = 0.125" />
            </li>
          </ul>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
            因此，真實面積 <MathInline math="A" /> 被夾在兩者之間：<MathInline math="0.125 \le A \le 0.625" />。這時的估計區間範圍非常寬。
          </p>
        </div>

        {/* n = 4 情況 */}
        <div style={{
          padding: '20px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
          boxShadow: 'var(--shadow-sm)'
        }} className="math-serif">
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '10px', fontSize: '1.1rem' }}>
            2. 當分割數 <MathInline math="n = 4" /> 時（分成四等份，每段寬度 <MathInline math="\Delta x = 1/4" />）：
          </strong>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '10px' }}>
            子區間為 <MathInline math="[0, 1/4], [1/4, 2/4], [2/4, 3/4], [3/4, 1]" />。
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <strong>右端點估計 <MathInline math="R_4" />：</strong>
              <MathBlock math="R_4 = \frac{1}{4} \cdot \left[\left(\frac{1}{4}\right)^2 + \left(\frac{2}{4}\right)^2 + \left(\frac{3}{4}\right)^2 + 1^2\right] = \frac{1}{64}(1 + 4 + 9 + 16) = \frac{30}{64} = 0.46875" />
            </li>
            <li>
              <strong>左端點估計 <MathInline math="L_4" />：</strong>
              <MathBlock math="L_4 = \frac{1}{4} \cdot \left[0^2 + \left(\frac{1}{4}\right)^2 + \left(\frac{2}{4}\right)^2 + \left(\frac{3}{4}\right)^2\right] = \frac{1}{64}(0 + 1 + 4 + 9) = \frac{14}{64} = 0.21875" />
            </li>
          </ul>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
            此時，我們得到更精確的夾擠：<MathInline math="0.21875 \le A \le 0.46875" />。可以看出，隨著分割數增加，誤差顯著地變小了。
          </p>
        </div>

      </div>

      {/* 黎曼和模擬器 */}
      <RiemannSumVisualizer />

      {/* 極限求得精確面積 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        無限分割下的極限運算 (Limiting Process)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        若我們要得到精確的面積，我們必須將區間等分成 <MathInline math="n" /> 段，並使 <MathInline math="n" /> 趨近於無窮大。
        此時的右端點加總與極限過程如下：
      </p>

      <Theorem title="右端點無限分割與收斂">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          考慮分成 <MathInline math="n" /> 等份，寬度 <MathInline math="\Delta x = 1/n" />。右端點坐標為 <MathInline math="x_i = i/n" />。
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          加總所有長方形面積：
          <MathBlock math="R_n = \sum_{i=1}^n f(x_i)\Delta x = \sum_{i=1}^n \left(\frac{i}{n}\right)^2 \cdot \frac{1}{n} = \frac{1}{n^3} \sum_{i=1}^n i^2" />
        </div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          利用連續整數的平方和公式：<MathInline math="\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}" />，將其代入並化簡：
          <MathBlock math="R_n = \frac{1}{n^3} \cdot \frac{n(n+1)(2n+1)}{6} = \frac{(n+1)(2n+1)}{6n^2} = \frac{2n^2 + 3n + 1}{6n^2}" />
        </div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          令分割數趨近於無窮大：
          <MathBlock math="\lim_{n \to \infty} R_n = \lim_{n \to \infty} \left( \frac{2}{6} + \frac{3}{6n} + \frac{1}{6n^2} \right) = \frac{1}{3}" />
          同理，對左端點 <MathInline math="L_n" /> 進行相同的極限運算，亦會收斂至 <MathInline math="1/3" />。因此，該區域的真實面積為 <strong><MathInline math="1/3" /></strong>。
        </div>
      </Theorem>

      {/* 一般化區域的面積定義（手寫第二頁內容） */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一般曲線下方的面積公式 (General Formula for Area)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        將上述特殊的例子推廣至在閉區間 <MathInline math="[a, b]" /> 上的任意非負連續函數 <MathInline math="f(x) \ge 0" />。
        我們定義以長方形分割逼近並取極限後的通用面積表示：
      </p>

      <Definition title="一般區域的面積定義">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設 <MathInline math="f" /> 為區間 <MathInline math="[a, b]" /> 上的正連續函數（<MathInline math="f\text{: positive continuous function on }[a, b]" />），
          將區間 <MathInline math="[a, b]" /> 分成 <MathInline math="n" /> 等份，每一等份的寬度為：
          <MathBlock math="\Delta x = \frac{b-a}{n}" />
          端點為：
          <MathBlock math="x_0 = a,\ x_1 = a+\Delta x,\ x_2 = a+2\Delta x,\ \dots,\ x_{n-1} = a+(n-1)\Delta x,\ x_n = a+n\Delta x = b" />
        </div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          則 <MathInline math="f" /> 與 <MathInline math="x" /> 軸所圍出來的面積 <MathInline math="A" /> 定義為：
          <MathBlock math="A = \lim_{n \to \infty} R_n = \lim_{n \to \infty} \sum_{i=1}^n f(x_i)\Delta x" />
          其中，若以左端點當作長方形的高度，亦有相似的表示法：
          <MathBlock math="L_n = f(x_0)\Delta x + f(x_1)\Delta x + \dots + f(x_{n-1})\Delta x = \sum_{i=0}^{n-1} f(x_i)\Delta x \implies A = \lim_{n \to \infty} L_n" />
        </div>
      </Definition>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與詳細解答 (Selected Examples)
      </h3>

      <Example title="1：利用右端點極限法求直線下方的面積">
        <p style={{ color: 'var(--text-secondary)' }}>
          試使用長方形分割逼近法（右端點極限法），求函數 <MathInline math="f(x) = x" /> 在區間 <MathInline math="[0, 2]" /> 圍成的三角形區域面積，並用幾何公式驗證結果。
        </p>
        <Solution>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第一步：求寬度與端點坐標】</strong>
            <br />
            將區間 <MathInline math="[0, 2]" /> 等分成 <MathInline math="n" /> 段，則每一段的寬度為：
            <MathBlock math="\Delta x = \frac{2 - 0}{n} = \frac{2}{n}" />
            第 <MathInline math="i" /> 個右端點坐標為：
            <MathBlock math="x_i = 0 + i\Delta x = \frac{2i}{n}" />
          </div>

          <div style={{ margin: '14px 0 10px 0', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第二步：寫出右端點逼近加總 Rₙ】</strong>
            <br />
            將高度 <MathInline math="f(x_i) = x_i" /> 與寬度帶入公式：
            <MathBlock math="R_n = \sum_{i=1}^n f(x_i)\Delta x = \sum_{i=1}^n \left(\frac{2i}{n}\right) \cdot \frac{2}{n} = \frac{4}{n^2} \sum_{i=1}^n i" />
            套用整數求和公式 <MathInline math="\sum_{i=1}^n i = \frac{n(n+1)}{2}" />：
            <MathBlock math="R_n = \frac{4}{n^2} \cdot \frac{n(n+1)}{2} = \frac{2n(n+1)}{n^2} = 2 \left(1 + \frac{1}{n}\right)" />
          </div>

          <div style={{ margin: '14px 0 10px 0', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第三步：取極限並驗證】</strong>
            <br />
            令 <MathInline math="n" /> 趨近於無窮大：
            <MathBlock math="A = \lim_{n \to \infty} R_n = \lim_{n \to \infty} 2 \left(1 + \frac{1}{n}\right) = 2" />
            <strong>幾何驗證</strong>：直線 <MathInline math="y = x" /> 與 <MathInline math="x = 2" /> 以及 <MathInline math="x" /> 軸所包圍的圖形為一個底為 2，高為 2 的直角三角形。
            <br />
            其面積為：<MathInline math="\text{面積} = \frac{1}{2} \times \text{底} \times \text{高} = \frac{1}{2} \times 2 \times 2 = 2" />。
            兩者所得結果完全一致！
          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 設欲求曲線 <MathInline math="f(x) = x^3" /> 在區間 <MathInline math="[0, 1]" /> 圍成的區域面積。
            <br />
            (1) 試寫出分成 <MathInline math="n" /> 等份時的右端點估算公式 <MathInline math="R_n" />。
            <br />
            (2) 已知整數立方和公式為 <MathInline math="\sum_{i=1}^n i^3 = \left[ \frac{n(n+1)}{2} \right]^2" />，求此區域的精確面積。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：(1) <MathInline math="R_n = \sum_{i=1}^n \left(\frac{i}{n}\right)^3 \cdot \frac{1}{n} = \frac{1}{n^4} \sum_{i=1}^n i^3" />
              <br />
              (2) <MathInline math="R_n = \frac{n^2(n+1)^2}{4n^4} = \frac{n^2 + 2n + 1}{4n^2}" />，取極限 <MathInline math="\lim_{n \to \infty} R_n = \frac{1}{4}" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

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
  const [cVal, setCVal] = useState(0.0);
  const [xVal, setXVal] = useState(1.0);

  // F(x) = x^3/3 - x + C
  // f(x) = x^2 - 1
  const F = (x, c) => (x * x * x) / 3 - x + c;
  const f = (x) => x * x - 1;

  // Coordinate mapping:
  // Math x in [-3.3, 3.3] -> SVG X in [0, 500]
  // Math y in [-8.5, 8.5] -> SVG Y in [0, 340]
  const toSvgX = (x) => 250 + x * 72; 
  const toSvgY = (y) => 170 - y * 19; 

  const py = F(xVal, cVal);
  const slope = f(xVal);

  const activeX = toSvgX(xVal);

  // Generate SVG path for any C
  const getPathD = (c) => {
    const points = [];
    for (let x = -3.2; x <= 3.2; x += 0.1) {
      points.push(`${toSvgX(x)},${toSvgY(F(x, c))}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // Tangent line endpoints (dx = 0.8 on x-axis)
  const dx = 0.8;
  const tx1 = xVal - dx;
  const tx2 = xVal + dx;

  // Background curves for C = -2.0, -1.0, 1.0, 2.0
  const bgCs = [-2.0, -1.0, 1.0, 2.0];

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
        📈 互動視覺化：反導函數與積分常數 C 的幾何意義
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.6' }}>
        調整下方的兩個滑桿，觀察積分曲線族 <MathInline math="F(x) = \frac{x^3}{3} - x + C" />。當常數 <MathInline math="C" /> 改變時，曲線僅在垂直方向平移，而在任意給定點 <MathInline math="x_0" /> 處，所有曲線的切線斜率（即導函數值 <MathInline math="f(x_0)" />）皆維持相同。
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
            {Array.from({ length: 9 }).map((_, i) => {
              const x = -3 + i * 0.75;
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

            {/* Background Curves (Family of Antiderivatives) */}
            {bgCs.map((bgC) => (
              <path 
                key={`curve-${bgC}`}
                d={getPathD(bgC)} 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.15)" 
                strokeWidth="1.5" 
                strokeDasharray="4 4"
              />
            ))}

            {/* Background curves labeling */}
            <text x={toSvgX(-2.2)} y={toSvgY(F(-2.2, 2.0)) - 6} fill="rgba(255, 255, 255, 0.2)" fontSize="9">C = +2</text>
            <text x={toSvgX(-2.2)} y={toSvgY(F(-2.2, -2.0)) + 12} fill="rgba(255, 255, 255, 0.2)" fontSize="9">C = -2</text>

            {/* Active Solid Curve */}
            <path 
              d={getPathD(cVal)} 
              fill="none" 
              stroke="var(--accent-primary)" 
              strokeWidth="3" 
            />

            {/* Reference Vertical Line at xVal */}
            <line 
              x1={activeX} y1="0" 
              x2={activeX} y2="340" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="1" 
              strokeDasharray="2 2"
            />

            {/* Tangents on other family curves to show they are parallel */}
            {bgCs.concat(cVal).map((c) => {
              const cy = F(xVal, c);
              const tLineY1 = cy - dx * slope;
              const tLineY2 = cy + dx * slope;
              const isActive = (c === cVal);
              return (
                <g key={`tangent-${c}`}>
                  {/* Point of intersection */}
                  <circle cx={activeX} cy={toSvgY(cy)} r={isActive ? 5 : 3.5} fill={isActive ? "var(--accent-secondary)" : "rgba(255,255,255,0.4)"} />
                  {/* Tangent line segment */}
                  <line 
                    x1={toSvgX(tx1)} y1={toSvgY(tLineY1)}
                    x2={toSvgX(tx2)} y2={toSvgY(tLineY2)}
                    stroke={isActive ? "var(--accent-warm)" : "rgba(245, 158, 11, 0.35)"}
                    strokeWidth={isActive ? 2 : 1}
                  />
                </g>
              );
            })}

            {/* Active Label text */}
            <text 
              x={toSvgX(2.8)} 
              y={toSvgY(F(2.8, cVal)) - 10} 
              fill="var(--accent-primary)" 
              fontSize="10" 
              fontWeight="600"
              textAnchor="middle"
            >
              F(x)
            </text>
          </svg>
        </div>

        {/* Sliders control */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {/* Slider for C */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              <span>積分常數：<strong>C = {cVal.toFixed(1)}</strong></span>
            </div>
            <input 
              type="range" 
              min="-2.5" 
              max="2.5" 
              step="0.1" 
              value={cVal} 
              onChange={(e) => setCVal(parseFloat(e.target.value))}
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

          {/* Slider for xVal */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              <span>自變數位置：<strong><MathInline math="x_0" /> = {xVal.toFixed(2)}</strong></span>
            </div>
            <input 
              type="range" 
              min="-2.2" 
              max="2.2" 
              step="0.05" 
              value={xVal} 
              onChange={(e) => setXVal(parseFloat(e.target.value))}
              style={{ 
                width: '100%', 
                accentColor: 'var(--accent-secondary)',
                cursor: 'pointer',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(255,255,255,0.1)'
              }} 
            />
          </div>
        </div>

        {/* Readout panel */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {/* Derivative at x0 */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              導函數值 (切線斜率)
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
              <MathInline math="f(x_0) = x_0^2 - 1 =" /> {slope.toFixed(3)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              不論 C 的值為何，在此處的斜率恆相等。
            </span>
          </div>

          {/* Active Function Value */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            backgroundColor: 'rgba(255, 255, 255, 0.01)',
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', marginBottom: '6px' }}>
              當前函數值
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-primary)', marginBottom: '6px' }}>
              <MathInline math="F(x_0) =" /> {py.toFixed(3)}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              對應的實線曲線在點 ( {xVal.toFixed(2)}, {py.toFixed(2)} )。
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default function Calculus_5_1() {
  return (
    <div>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在前面的章節中，我們專注於解決如下問題：<strong>「已知一個函數，如何求其導數（變化率）？」</strong>
        然而，在實際應用中，我們經常遇到相反的挑戰。例如：已知一個物體的加速度或速度，我們該如何還原求出它的位置？或者已知某個生長系統的瞬間膨脹速率，我們該如何算出它累積的總量？
        這就需要我們反過來思考微分的逆過程——這就是本節要探討的主題：<strong>反導函數 (Antiderivative)</strong>。
      </p>

      {/* 定義卡片 */}
      <Definition title="反導函數 (Antiderivative)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 定義在區間 <MathInline math="I" /> 上。若在區間 <MathInline math="I" /> 中的所有 <MathInline math="x" />，皆滿足：
        </p>
        <MathBlock math="F'(x) = f(x)" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          則稱 <MathInline math="F" /> 為 <MathInline math="f" /> 在該區間 <MathInline math="I" /> 上的一個<strong>反導函數 (Antiderivative)</strong>。
        </p>
      </Definition>

      {/* 定理卡片 */}
      <Theorem title="最一般反導函數 (Most General Antiderivative)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
          若 <MathInline math="F" /> 是 <MathInline math="f" /> 在區間 <MathInline math="I" /> 上的任意一個反導函數，則 <MathInline math="f" /> 在該區間的<strong>最一般反導函數 (Most General Antiderivative)</strong> 可表示為：
        </p>
        <MathBlock math="F(x) + C" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          其中 <MathInline math="C" /> 為任意實常數，稱為<strong>積分常數 (Constant of Integration)</strong>。
        </p>
      </Theorem>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        從幾何的角度來看，如果 <MathInline math="F'(x) = f(x)" />，那麼對於任何實數 <MathInline math="C" />，由於常數的導數為零，我們總有 <MathInline math="\frac{d}{dx}[F(x) + C] = F'(x) + 0 = f(x)" />。
        這意味著，一個函數的反導函數不是單一的一條曲線，而是<strong>一整族相互平行的曲線</strong>。
      </p>

      {/* 互動視覺化組件 */}
      <InteractiveGraph />

      {/* 常用反導函數公式表 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        基本反導函數公式表 (Basic Antiderivative Formulas)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        藉由將過去學過的基本微分公式反向操作，我們能整理出常見初等函數的反導函數公式（在以下公式中，<MathInline math="C" /> 代表任意常數）：
      </p>

      <div className="formulas-grid">
        {/* 1. 冪法則 */}
        <div className="formula-card">
          <div className="formula-label">冪函數的積 (n ≠ -1)</div>
          <div className="formula-content">
            <MathBlock math="\int x^n dx = \frac{x^{n+1}}{n+1} + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}\left[\frac{x^{n+1}}{n+1}\right] = x^n" /></span>
        </div>

        {/* 2. 倒數法則 */}
        <div className="formula-card">
          <div className="formula-label">倒數函數 (x ≠ 0)</div>
          <div className="formula-content">
            <MathBlock math="\int \frac{1}{x} dx = \ln|x| + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[\ln|x|] = \frac{1}{x}" /></span>
        </div>

        {/* 3. 指數函數 */}
        <div className="formula-card">
          <div className="formula-label">指數函數 (底數為 e)</div>
          <div className="formula-content">
            <MathBlock math="\int e^x dx = e^x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[e^x] = e^x" /></span>
        </div>

        {/* 4. 一般指數函數 */}
        <div className="formula-card">
          <div className="formula-label">指數函數 (底數 a &gt; 0, a ≠ 1)</div>
          <div className="formula-content">
            <MathBlock math="\int a^x dx = \frac{a^x}{\ln a} + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[a^x] = a^x \ln a" /></span>
        </div>

        {/* 5. 正弦函數 */}
        <div className="formula-card">
          <div className="formula-label">正弦函數</div>
          <div className="formula-content">
            <MathBlock math="\int \sin x dx = -\cos x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[-\cos x] = \sin x" /></span>
        </div>

        {/* 6. 餘弦函數 */}
        <div className="formula-card">
          <div className="formula-label">餘弦函數</div>
          <div className="formula-content">
            <MathBlock math="\int \cos x dx = \sin x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[\sin x] = \cos x" /></span>
        </div>

        {/* 7. 正割平方 */}
        <div className="formula-card">
          <div className="formula-label">正割平方</div>
          <div className="formula-content">
            <MathBlock math="\int \sec^2 x dx = \tan x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[\tan x] = \sec^2 x" /></span>
        </div>

        {/* 8. 割切乘積 */}
        <div className="formula-card">
          <div className="formula-label">正割正切乘積</div>
          <div className="formula-content">
            <MathBlock math="\int \sec x \tan x dx = \sec x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[\sec x] = \sec x \tan x" /></span>
        </div>

        {/* 9. 反正弦導數對應 */}
        <div className="formula-card">
          <div className="formula-label">反正弦對應</div>
          <div className="formula-content">
            <MathBlock math="\int \frac{1}{\sqrt{1-x^2}} dx = \sin^{-1} x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[\sin^{-1} x] = \frac{1}{\sqrt{1-x^2}}" /></span>
        </div>

        {/* 10. 反正切導數對應 */}
        <div className="formula-card">
          <div className="formula-label">反正切對應</div>
          <div className="formula-content">
            <MathBlock math="\int \frac{1}{1+x^2} dx = \tan^{-1} x + C" />
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>導數：<MathInline math="\frac{d}{dx}[\tan^{-1} x] = \frac{1}{1+x^2}" /></span>
        </div>
      </div>

      {/* 初值問題 (Initial Value Problems) */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        初值問題 (Initial Value Problems, IVP)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        由於最一般反導函數中包含未知的積分常數 <MathInline math="C" />，我們需要額外的條件來將 <MathInline math="C" /> 的具體數值解出。這種要求尋找滿足特定初始狀態（條件）之函數的問題，稱為<strong>初值問題 (Initial Value Problem, IVP)</strong>。
      </p>

      <Definition title="初值問題與初始條件">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          給定微分方程 <MathInline math="y' = f(x)" />，以及初始狀態 <MathInline math="y(x_0) = y_0" />（稱為<strong>初始條件 / Initial Condition</strong>）。
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          求解該問題的目標是，在最一般反導函數 <MathInline math="y = F(x) + C" /> 中代入條件，以求得唯一的特定常數 <MathInline math="C" />，進而找出滿足初始條件的<strong>特解 (Particular Solution)</strong>。
        </p>
      </Definition>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        這在物理學中有著最直接的應用。若以自變數時間 <MathInline math="t" /> 來描述一維運動：
        <br />
        1. 已知速度 <MathInline math="v(t) = s'(t)" /> 與初始位置 <MathInline math="s(0) = s_0" />，可經由求反導函數獲得位置函數 <MathInline math="s(t)" />。
        <br />
        2. 已知加速度 <MathInline math="a(t) = v'(t) = s''(t)" /> 與初始速度 <MathInline math="v(0) = v_0" />、初始位置 <MathInline math="s(0) = s_0" />，則需經過<strong>兩次求反導函數</strong>的過程來還原得到物體的位置。
      </p>

      {/* 精選例題與詳細解答 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與詳細解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：利用代數整理求一般反導函數">
        <p style={{ color: 'var(--text-secondary)' }}>
          試求函數 <MathInline math="f(x) = \frac{x^3 - 3\sqrt{x} + 2}{x}" /> 在區間 <MathInline math="(0, \infty)" /> 上的最一般反導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【第一步：利用代數分解化簡原式】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            在求反導函數前，我們不能直接將分子分母分開求導。必須先將式子逐項展開：
            <MathBlock math="f(x) = \frac{x^3}{x} - \frac{3x^{1/2}}{x} + \frac{2}{x} = x^2 - 3x^{-1/2} + 2x^{-1}" />
          </div>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第二步：逐項套用公式求反導函數】</strong>
          </p>
          <p style={{ marginBottom: '10px' }}>
            設 <MathInline math="F(x)" /> 為其反導函數：
          </p>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            <li>
              第一項 <MathInline math="x^2" /> 的反導函數為：<MathInline math="\frac{x^3}{3}" />。
            </li>
            <li>
              第二項 <MathInline math="-3x^{-1/2}" /> 套用冪法則：
              <MathBlock math="-3 \cdot \frac{x^{-1/2 + 1}}{-1/2 + 1} = -3 \cdot \frac{x^{1/2}}{1/2} = -6\sqrt{x}" />
            </li>
            <li>
              第三項 <MathInline math="2x^{-1} = \frac{2}{x}" /> 在 <MathInline math="x > 0" /> 時，其反導函數為：<MathInline math="2\ln x" />。
            </li>
          </ol>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第三步：加上積分常數得到最一般形式】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將上述各項相加，並加上積分常數 <MathInline math="C" />：
            <MathBlock math="F(x) = \frac{1}{3}x^3 - 6\sqrt{x} + 2\ln x + C" />
            我們可以微分檢驗 <MathInline math="F'(x) = x^2 - \frac{3}{\sqrt{x}} + \frac{2}{x} = f(x)" />，結果完全正確！
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：求解初值問題 (Initial Value Problem)">
        <p style={{ color: 'var(--text-secondary)' }}>
          已知一個曲線的導函數為 <MathInline math="f'(x) = 3e^x + \cos x" />，且此曲線通過點 <MathInline math="(0, 4)" />，試求此函數 <MathInline math="f(x)" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【第一步：求最一般反導函數】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            我們對 <MathInline math="f'(x)" /> 求一般反導函數以獲得包含常數 <MathInline math="C" /> 的函數形式：
            <MathBlock math="f(x) = \int (3e^x + \cos x) dx = 3e^x + \sin x + C" />
          </div>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第二步：代入初始條件解出 C】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            已知曲線通過點 <MathInline math="(0, 4)" />，即 <MathInline math="f(0) = 4" />。代入上式中：
            <MathBlock math="3e^0 + \sin(0) + C = 4" />
            由於 <MathInline math="e^0 = 1" /> 且 <MathInline math="sin(0) = 0" />，所以：
            <MathBlock math="3(1) + 0 + C = 4 \implies 3 + C = 4 \implies C = 1" />
          </div>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第三步：寫出特解】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將常數 <MathInline math="C = 1" /> 代回，可得此特定函數為：
            <MathBlock math="f(x) = 3e^x + \sin x + 1" />
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：物理運動學中二階初值問題的還原">
        <p style={{ color: 'var(--text-secondary)' }}>
          一顆小球從地表上方 100 公尺高的懸崖邊以初速度 <MathInline math="20 \text{ m/s}" /> 垂直向上拋出。若忽略空氣阻力，加速度為重力加速度 <MathInline math="a(t) = -9.8 \text{ m/s}^2" />。
          <br />
          (1) 求小球的速度函數 <MathInline math="v(t)" /> 與高度函數 <MathInline math="s(t)" />。
          <br />
          (2) 求小球何時落地？以及落地時的速度為多少？
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【第 (1) 小題：求速度與高度函數】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            重力加速度為速度對時間的導數，即 <MathInline math="v'(t) = a(t) = -9.8" />。
            <br />
            求其反導函數可得最一般速度函數：
            <MathBlock math="v(t) = -9.8t + C_1" />
            代入初始條件：當時間 <MathInline math="t = 0" /> 時，向上拋出的初速度為 <MathInline math="v(0) = 20 \text{ m/s}" />。
            <MathBlock math="-9.8(0) + C_1 = 20 \implies C_1 = 20" />
            因此，速度函數為：<strong><MathInline math="v(t) = -9.8t + 20" /></strong>。
          </div>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            接著，速度是高度對時間的導數，即 <MathInline math="s'(t) = v(t) = -9.8t + 20" />。
            <br />
            求其反導函數可得最一般高度函數：
            <MathBlock math="s(t) = -9.8 \cdot \frac{t^2}{2} + 20t + C_2 = -4.9t^2 + 20t + C_2" />
            代入初始條件：當時間 <MathInline math="t = 0" /> 時，出發高度為懸崖高 <MathInline math="s(0) = 100 \text{ m}" />。
            <MathBlock math="-4.9(0)^2 + 20(0) + C_2 = 100 \implies C_2 = 100" />
            因此，高度函數為：<strong><MathInline math="s(t) = -4.9t^2 + 20t + 100" /></strong>。
          </div>

          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【第 (2) 小題：落地分析】</strong>
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            小球落地代表高度 <MathInline math="s(t) = 0" />。解二次方程：
            <MathBlock math="-4.9t^2 + 20t + 100 = 0" />
            利用公式解：
            <MathBlock math="t = \frac{-20 \pm \sqrt{20^2 - 4(-4.9)(100)}}{2(-4.9)} = \frac{-20 \pm \sqrt{400 + 1960}}{-9.8} = \frac{-20 \pm \sqrt{2360}}{-9.8}" />
            由於 <MathInline math="\sqrt{2360} \approx 48.58" />，且時間 <MathInline math="t" /> 必須為正值：
            <MathBlock math="t = \frac{-20 - 48.58}{-9.8} = \frac{-68.58}{-9.8} \approx 7.00 \text{ 秒}" />
            小球在大約 <strong>7.00 秒</strong> 後落地。
          </div>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將 <MathInline math="t \approx 7.00" /> 代入速度函數，求落地速度：
            <MathBlock math="v(7.00) = -9.8(7.00) + 20 = -68.6 + 20 = -48.6 \text{ m/s}" />
            因此，落地時的速度大小為 <MathInline math="48.6 \text{ m/s}" />，負號代表方向<strong>向下</strong>。
          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求最一般反導函數：<MathInline math="f(x) = 4\sec^2 x - \frac{3}{x^2 + 1}" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：<MathInline math="F(x) = 4\tan x - 3\tan^{-1} x + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 求解二階微分方程之特解：已知 <MathInline math="f''(x) = 12x^2 + 6x - 4" />，且其一階導數在零的值為 <MathInline math="f'(0) = 2" />，函數在點一的值為 <MathInline math="f(1) = 5" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：一階導數反導函數為 <MathInline math="f'(x) = 4x^3 + 3x^2 - 4x + C_1" />，代入 <MathInline math="f'(0)=2 \implies C_1=2" />。
              再求一次反導函數為 <MathInline math="f(x) = x^4 + x^3 - 2x^2 + 2x + C_2" />，代入 <MathInline math="f(1)=1+1-2+2+C_2 = 2+C_2 = 5 \implies C_2=3" />。特解為 <MathInline math="f(x) = x^4 + x^3 - 2x^2 + 2x + 3" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

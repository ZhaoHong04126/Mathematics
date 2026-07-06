import { useState } from 'react';
import { 
  Theorem, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

function InteractiveLHopital() {
  const [activePreset, setActivePreset] = useState('sin');
  const [x0, setX0] = useState(1.0);

  // Presets definition
  const presets = {
    sin: {
      name: 'f(x) = sin x, g(x) = x',
      limitText: '\\lim_{x\\to 0} \\frac{\\sin x}{x} = 1',
      f: (x) => Math.sin(x),
      g: (x) => x,
      df: (x) => Math.cos(x),
      dg: () => 1,
      yRange: [-1.2, 1.6],
      fColor: 'var(--accent-primary)',
      gColor: 'var(--accent-secondary)'
    },
    exp: {
      name: 'f(x) = e^x - 1, g(x) = x',
      limitText: '\\lim_{x\\to 0} \\frac{e^x - 1}{x} = 1',
      f: (x) => Math.exp(x) - 1,
      g: (x) => x,
      df: (x) => Math.exp(x),
      dg: () => 1,
      yRange: [-1.2, 2.2],
      fColor: 'var(--accent-primary)',
      gColor: 'var(--accent-secondary)'
    },
    cos: {
      name: 'f(x) = 1 - cos x, g(x) = x^2',
      limitText: '\\lim_{x\\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}',
      f: (x) => 1 - Math.cos(x),
      g: (x) => x * x,
      df: (x) => Math.sin(x),
      dg: (x) => 2 * x,
      yRange: [-0.3, 1.8],
      fColor: 'var(--accent-primary)',
      gColor: 'var(--accent-secondary)'
    }
  };

  const preset = presets[activePreset];
  const { f, g, df, dg, yRange } = preset;

  // Coordinate Mapping
  // Math x in [-2, 2] -> SVG X in [50, 450] (400px width)
  const toSvgX = (x) => 250 + x * 100;
  // Math y in [yRange[0], yRange[1]] -> SVG Y in [30, 270] (240px height)
  const yMin = yRange[0];
  const yMax = yRange[1];
  const toSvgY = (y) => 270 - ((y - yMin) / (yMax - yMin)) * 240;

  // Generate curve path
  const fPoints = [];
  const gPoints = [];
  for (let x = -2.0; x <= 2.0; x += 0.05) {
    fPoints.push(`${toSvgX(x)},${toSvgY(f(x))}`);
    gPoints.push(`${toSvgX(x)},${toSvgY(g(x))}`);
  }
  const fPathD = `M ${fPoints.join(' L ')}`;
  const gPathD = `M ${gPoints.join(' L ')}`;

  // Evaluate values at current slider position x0
  const fx0 = f(x0);
  const gx0 = g(x0);
  const dfx0 = df(x0);
  const dgx0 = dg(x0);
  const ratio = gx0 === 0 ? 1 : fx0 / gx0;
  const slopeRatio = dgx0 === 0 ? (activePreset === 'cos' ? 0.5 : 1) : dfx0 / dgx0;

  // Tangent line values for visualization
  // y - y0 = m(x - x0) => y = m(x - x0) + y0
  const tangentX1 = x0 - 0.4;
  const tangentX2 = x0 + 0.4;
  const fTangentY1 = dfx0 * (tangentX1 - x0) + fx0;
  const fTangentY2 = dfx0 * (tangentX2 - x0) + fx0;
  const gTangentY1 = dgx0 * (tangentX1 - x0) + gx0;
  const gTangentY2 = dgx0 * (tangentX2 - x0) + gx0;

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
        🎯 幾何動態模擬：洛必達法則的極限逼近
      </strong>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
        當我們計算極限 <MathInline math="\lim_{x \to 0} \frac{f(x)}{g(x)}" /> 時，若分子與分母在 <MathInline math="x=0" /> 處皆為 0（即未定式 <MathInline math="\frac{0}{0}" />），
        洛必達法則指出：當 <MathInline math="x" /> 無限趨近於 0 時，兩個高度的比值 <MathInline math="\frac{f(x)}{g(x)}" /> 將收斂於它們切線斜率的比值 <MathInline math="\frac{f'(x)}{g'(x)}" />。
      </p>

      {/* Preset selection tabs */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '16px',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '8px'
      }}>
        {Object.keys(presets).map((key) => (
          <button
            key={key}
            onClick={() => {
              setActivePreset(key);
              if (key === 'cos' && Math.abs(x0) < 0.2) {
                setX0(0.8);
              }
            }}
            style={{
              padding: '6px 12px',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: activePreset === key ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              backgroundColor: activePreset === key ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
              color: activePreset === key ? 'var(--accent-primary)' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontWeight: activePreset === key ? '600' : 'normal',
              transition: 'all 0.2s'
            }}
          >
            {key === 'sin' && 'sin x / x'}
            {key === 'exp' && '(e^x - 1) / x'}
            {key === 'cos' && '(1 - cos x) / x²'}
          </button>
        ))}
      </div>

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
          <svg width="500" height="300" viewBox="0 0 500 300" style={{ maxWidth: '100%' }}>
            {/* Grid Axes */}
            <line x1="50" y1={toSvgY(0)} x2="450" y2={toSvgY(0)} stroke="var(--border-color)" strokeWidth="1.5" /> {/* X axis */}
            <line x1={toSvgX(0)} y1="30" x2={toSvgX(0)} y2="270" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="3 3" /> {/* Y axis */}
            
            {/* Labels */}
            <text x={toSvgX(0) - 15} y={toSvgY(0) + 15} fontSize="10" fill="var(--text-tertiary)">0</text>
            <text x="445" y={toSvgY(0) - 8} fontSize="10" fill="var(--text-tertiary)">x</text>
            <text x={toSvgX(0) + 8} y="40" fontSize="10" fill="var(--text-tertiary)">y</text>
            
            {/* Function Curves */}
            <path d={fPathD} fill="none" stroke={preset.fColor} strokeWidth="2.5" />
            <path d={gPathD} fill="none" stroke={preset.gColor} strokeWidth="2.5" />
            
            {/* Interval shading line at x0 */}
            <line x1={toSvgX(x0)} y1="30" x2={toSvgX(x0)} y2="270" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
            <text x={toSvgX(x0) - 15} y="285" fontSize="11" fontWeight="600" fill="var(--accent-warm)">
              x = {x0.toFixed(2)}
            </text>

            {/* Tangent lines at x0 */}
            {Math.abs(x0) > 0.05 && (
              <g>
                {/* f tangent */}
                <line 
                  x1={toSvgX(tangentX1)} 
                  y1={toSvgY(fTangentY1)} 
                  x2={toSvgX(tangentX2)} 
                  y2={toSvgY(fTangentY2)} 
                  stroke={preset.fColor} 
                  strokeWidth="1.5" 
                  strokeDasharray="2 2"
                />
                {/* g tangent */}
                <line 
                  x1={toSvgX(tangentX1)} 
                  y1={toSvgY(gTangentY1)} 
                  x2={toSvgX(tangentX2)} 
                  y2={toSvgY(gTangentY2)} 
                  stroke={preset.gColor} 
                  strokeWidth="1.5" 
                  strokeDasharray="2 2"
                />
              </g>
            )}

            {/* Endpoint dots */}
            <circle cx={toSvgX(x0)} cy={toSvgY(fx0)} r="5" fill={preset.fColor} />
            <circle cx={toSvgX(x0)} cy={toSvgY(gx0)} r="5" fill={preset.gColor} />

            {/* Legend */}
            <g transform="translate(60, 45)">
              <rect width="130" height="50" rx="4" fill="rgba(0,0,0,0.03)" stroke="var(--border-color)" strokeWidth="0.5" />
              <circle cx="15" cy="15" r="4" fill={preset.fColor} />
              <text x="25" y="19" fontSize="10.5" fill="var(--text-primary)" fontWeight="500">f(x) [分子]</text>
              <circle cx="15" cy="35" r="4" fill={preset.gColor} />
              <text x="25" y="39" fontSize="10.5" fill="var(--text-primary)" fontWeight="500">g(x) [分母]</text>
            </g>
          </svg>
        </div>

        {/* Sliders and Info Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px'
        }}>
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: '500', color: 'var(--text-secondary)' }}>
              <span>調整逼近位置 x:</span>
              <span style={{ color: 'var(--accent-warm)', fontWeight: '600' }}>{x0.toFixed(2)}</span>
            </label>
            <input 
              type="range" 
              min="-1.5" 
              max="1.5" 
              step="0.05" 
              value={x0} 
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                // Avoid absolute 0 to prevent division by zero in display
                setX0(val === 0 ? 0.01 : val);
              }}
              style={{ width: '100%', marginTop: '8px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', marginTop: '6px', textAlign: 'center' }}>
              （向 0 拖曳以觀察比值的收斂行為）
            </span>
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
              <strong style={{ color: 'var(--text-primary)' }}>📊 當前高度與比值：</strong>
              <div style={{ fontFamily: 'monospace', marginTop: '2px', paddingLeft: '8px' }}>
                f(x) = {fx0.toFixed(4)}
                <br />
                g(x) = {gx0.toFixed(4)}
                <br />
                比值 f(x)/g(x) = <span style={{ color: 'var(--accent-warm)', fontWeight: 'bold' }}>{ratio.toFixed(4)}</span>
              </div>
            </div>
            <div style={{ borderTop: '1px dashed var(--border-color)', margin: '4px 0' }}></div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>⚡ 當前切線斜率與比值：</strong>
              <div style={{ fontFamily: 'monospace', marginTop: '2px', paddingLeft: '8px' }}>
                f'(x) = {dfx0.toFixed(4)}
                <br />
                g'(x) = {dgx0.toFixed(4)}
                <br />
                斜率比 f'(x)/g'(x) = <span style={{ color: '#10b981', fontWeight: 'bold' }}>{slopeRatio.toFixed(4)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Calculus_4_4() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
        在求極限的過程中，我們經常會遇到類似 <MathInline math="\lim \frac{\sin x}{x}" /> 或 <MathInline math="\lim \frac{\ln x}{x-1}" /> 等在極限點處呈現出 <MathInline math="\frac{0}{0}" /> 或 <MathInline math="\frac{\infty}{\infty}" /> 的情況。
        這類型的極限被稱為**未定式 (Indeterminate Forms)**。法國數學家洛必達（Guillaume de l'Hôpital）於 1696 年在其著作中發表了一種利用導數來求解此類極限的強大定理，即著名的**洛必達法則**。
      </p>

      {/* 定理介紹 */}
      <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        洛必達法則的定義 (L'Hôpital's Rule)
      </h2>

      <Theorem title="洛必達法則">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '8px' }}>
          設函數 <MathInline math="f" /> 與 <MathInline math="g" /> 在含有點 <MathInline math="a" /> 的某個開區間內可微（在點 <MathInline math="a" /> 處本身可以不可微），且滿足：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px', margin: '0 0 12px 0' }}>
          <li>
            <MathInline math="\lim_{x \to a} f(x) = 0" /> 且 <MathInline math="\lim_{x \to a} g(x) = 0" />，
            <br />
            或者 <MathInline math="\lim_{x \to a} f(x) = \pm\infty" /> 且 <MathInline math="\lim_{x \to a} g(x) = \pm\infty" />（即呈現 <MathInline math="\frac{0}{0}" /> 或 <MathInline math="\frac{\infty}{\infty}" /> 型未定式）。
          </li>
          <li>在點 <MathInline math="a" /> 的去心鄰域內，<MathInline math="g'(x) \ne 0" />。</li>
          <li>極限 <MathInline math="\lim_{x \to a} \frac{f'(x)}{g'(x)}" /> 存在（或極限值為 <MathInline math="\pm\infty" />）。</li>
        </ol>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
          則：
        </p>
        <MathBlock math="\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \frac{f'(x)}{g'(x)}" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '8px 0 0 0', fontSize: '0.92rem' }}>
          註：此定理在單側極限（<MathInline math="x \to a^+" /> 或 <MathInline math="x \to a^-" />）以及無窮遠處的極限（<MathInline math="x \to \infty" /> 或 <MathInline math="x \to -\infty" />）同樣適用。
        </p>
      </Theorem>

      {/* 核心防錯警告卡片 */}
      <div style={{
        margin: '12px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(244, 63, 94, 0.02)',
        padding: '20px'
      }}>
        <strong style={{ color: 'var(--accent-warm)', display: 'block', marginBottom: '8px' }}>⚠️ 學生最常犯的致命錯誤</strong>
        <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.92rem', lineHeight: '1.7' }}>
          <strong>錯誤一：在非未定式時使用洛必達法則。</strong>
          <br />
          使用定理前<strong>必須先確認</strong>是否為 <MathInline math="\frac{0}{0}" /> 或 <MathInline math="\frac{\infty}{\infty}" />。例如：
          <MathInline math="\lim_{x \to 0} \frac{\cos x}{x + 1} = \frac{1}{0 + 1} = 1" />。
          如果直接對分子分母求導，會得到 <MathInline math="\lim_{x \to 0} \frac{-\sin x}{1} = 0" />（這完全是錯的！）。
          <br />
          <strong>錯誤二：誤用商的微分公式 (Quotient Rule)。</strong>
          <br />
          洛必達法則是將分子與分母<strong>分別求導</strong>（即 <MathInline math="\frac{f'(x)}{g'(x)}" />），
          而**不是**對整個分數求商的導函數（即不使用 <MathInline math="\left(\frac{f}{g}\right)'" />）。
        </p>
      </div>

      {/* 幾何幾何視覺化模擬 */}
      <InteractiveLHopital />

      {/* 其他類型未定式轉換 */}
      <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginTop: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        其他類型未定式的轉換與求解
      </h2>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
        除了標準的 <MathInline math="\frac{0}{0}" /> 與 <MathInline math="\frac{\infty}{\infty}" /> 外，還有其他幾種常見的未定式。我們必須先利用代數技巧將它們**轉換為標準型**，才能套用洛必達法則：
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        margin: '12px 0'
      }}>
        {/* 0 * inf */}
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>
            1. 相乘型：<MathInline math="0 \cdot \infty" />
          </strong>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: '1.6' }}>
            若 <MathInline math="f \to 0" /> 且 <MathInline math="g \to \infty" />，可將乘積改寫為倒數除法形式：
            <MathBlock math="f \cdot g = \frac{f}{1/g} \quad \left(\text{變成 } \frac{0}{0}\right) \quad \text{或} \quad f \cdot g = \frac{g}{1/f} \quad \left(\text{變成 } \frac{\infty}{\infty}\right)" />
          </div>
        </div>

        {/* inf - inf */}
        <div style={{ padding: '16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <strong style={{ color: 'var(--accent-primary)', display: 'block', marginBottom: '6px' }}>
            2. 相減型：<MathInline math="\infty - \infty" />
          </strong>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: '1.6' }}>
            通常發生在分式相減或對數相減時。可透過**通分**、**有理化**或**提取公因式**，將其合併為單一分式：
            <MathBlock math="\frac{1}{A} - \frac{1}{B} = \frac{B - A}{A \cdot B}" />
          </div>
        </div>
      </div>

      {/* 指數型未定式對數轉換 */}
      <div style={{
        padding: '20px',
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        borderLeft: '5px solid var(--accent-secondary)'
      }}>
        <strong style={{ color: 'var(--accent-secondary)', display: 'block', marginBottom: '10px' }}>
          📈 指數型未定式：<MathInline math="1^\infty" />, <MathInline math="0^0" />, <MathInline math="\infty^0" />（指指型函數）的處理方法
        </strong>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: 0, lineHeight: '1.7' }}>
          當極限的底數與指數同時都含有自變數 <MathInline math="x" /> 時（俗稱**「指指型函數」**），我們無法直接套用常規極限公式。
          這類形式是<strong>藉由指數函數 <MathInline math="\exp" /> 與自然對數 <MathInline math="\ln" /> 來進行恆等轉換</strong>：
          <MathBlock math="[f(x)]^{g(x)} = e^{\ln\left([f(x)]^{g(x)}\right)} = e^{g(x) \ln [f(x)]} = \exp\Big(g(x) \ln [f(x)]\Big)" />
          <strong>標準求解步驟：</strong>
          <br />
          1. 運用上述恆等式，將原本的指數型極限 <MathInline math="\lim [f(x)]^{g(x)}" /> 轉換為 <MathInline math="\lim e^{g(x) \ln [f(x)]}" />。
          <br />
          2. 將焦點轉移到求解指數部分（即相乘型極限 <MathInline math="0 \cdot \infty" />）的極限值：
          <MathBlock math="K = \lim_{x \to a} g(x) \ln [f(x)]" />
          3. 利用洛必達法則求得指數部分極限 <MathInline math="K" /> 後，原極限的最終答案即為：
          <MathBlock math="L = e^K = \exp(K)" />
        </div>
      </div>

      {/* 經典例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        經典例題與詳細解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="多次應用洛必達法則">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          計算極限：<MathInline math="\lim_{x \to 0} \frac{\sin x - x}{x^3}" />。
        </p>
        <Solution>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
            <li>
              <strong>型態檢查：</strong>當 <MathInline math="x \to 0" /> 時，分子 <MathInline math="\sin 0 - 0 = 0" />，分母 <MathInline math="0^3 = 0" />。這是一個 <MathInline math="\frac{0}{0}" /> 未定式，可以套用洛必達法則。
            </li>
            <li>
              <strong>第一階段求導：</strong>對分子與分母各自求導數：
              <MathBlock math="\lim_{x \to 0} \frac{\sin x - x}{x^3} = \lim_{x \to 0} \frac{\cos x - 1}{3x^2}" />
            </li>
            <li>
              <strong>第二次檢查：</strong>再次代入 <MathInline math="x=0" />，此時分子為 <MathInline math="\cos 0 - 1 = 0" />，分母為 <MathInline math="3(0)^2 = 0" />。依然是 <MathInline math="\frac{0}{0}" /> 型態，我們**需要再次使用**洛必達法則。
            </li>
            <li>
              <strong>第二階段求導：</strong>
              <MathBlock math="\lim_{x \to 0} \frac{\cos x - 1}{3x^2} = \lim_{x \to 0} \frac{-\sin x}{6x}" />
            </li>
            <li>
              <strong>第三次檢查與求解：</strong>此時仍為 <MathInline math="\frac{0}{0}" />，我們可以直接利用基本極限值 <MathInline math="\lim_{x\to0} \frac{\sin x}{x} = 1" /> 計算，或進行第三次求導：
              <MathBlock math="\lim_{x \to 0} \frac{-\sin x}{6x} = \lim_{x \to 0} \frac{-\cos x}{6} = \frac{-1}{6}" />
            </li>
            <li>
              <strong>結論：</strong>極限值為 <strong><MathInline math="-\frac{1}{6}" /></strong>。
            </li>
          </ol>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="相乘型 0 * inf 轉換">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          計算極限：<MathInline math="\lim_{x \to \infty} x \sin\left(\frac{1}{x}\right)" />。
        </p>
        <Solution>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
            <li>
              <strong>型態檢查：</strong>當 <MathInline math="x \to \infty" /> 時，第一項 <MathInline math="x \to \infty" />，第二項 <MathInline math="\sin(1/x) \to \sin(0) = 0" />。這是 <MathInline math="\infty \cdot 0" /> 未定式。
            </li>
            <li>
              <strong>代數轉換：</strong>為了套用洛必達，我們將其改寫為分式形式。令 <MathInline math="t = \frac{1}{x}" />，當 <MathInline math="x \to \infty" /> 時，有 <MathInline math="t \to 0^+" />。
              <br />
              因此，極限可以改寫為：
              <MathBlock math="\lim_{x \to \infty} x \sin\left(\frac{1}{x}\right) = \lim_{t \to 0^+} \frac{\sin t}{t}" />
            </li>
            <li>
              <strong>求解：</strong>此時分子分母皆趨於 0。對分子與分母分別求導：
              <MathBlock math="\lim_{t \to 0^+} \frac{\sin t}{t} = \lim_{t \to 0^+} \frac{\cos t}{1} = \cos 0 = 1" />
            </li>
            <li>
              <strong>結論：</strong>極限值為 <strong>1</strong>。
            </li>
          </ol>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="指數型 0^0 未定式">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          計算極限：<MathInline math="\lim_{x \to 0^+} x^x" />。
        </p>
        <Solution>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0 }}>
            <li>
              <strong>型態檢查：</strong>當 <MathInline math="x \to 0^+" /> 時，底數與指數皆趨近於 0，呈現典型的 <MathInline math="0^0" /> 未定式（指指型函數）。
            </li>
            <li>
              <strong>利用 exp 與 ln 恆等轉換：</strong>將函數改寫為以 <MathInline math="e" /> 為底的指數形式：
              <MathBlock math="x^x = e^{\ln(x^x)} = e^{x \ln x} = \exp(x \ln x)" />
              接下來，我們只需計算指數部分 <MathInline math="x \ln x" /> 在 <MathInline math="x \to 0^+" /> 時的極限。
            </li>
            <li>
              <strong>求指數部分極限：</strong>極限型態為 <MathInline math="0 \cdot (-\infty)" />，我們先將其改寫為 <MathInline math="\frac{\infty}{\infty}" /> 型的分式：
              <MathBlock math="\lim_{x \to 0^+} x \ln x = \lim_{x \to 0^+} \frac{\ln x}{1/x}" />
            </li>
            <li>
              <strong>應用洛必達法則：</strong>對分子分母分別對 <MathInline math="x" /> 求導：
              <MathBlock math="\lim_{x \to 0^+} \frac{[\ln x]'}{[1/x]'} = \lim_{x \to 0^+} \frac{1/x}{-1/x^2} = \lim_{x \to 0^+} (-x) = 0" />
            </li>
            <li>
              <strong>恢復原函數極限：</strong>將求得的指數極限 0 代回：
              <MathBlock math="\lim_{x \to 0^+} x^x = e^{\lim_{x \to 0^+} x \ln x} = e^0 = 1" />
            </li>
            <li>
              <strong>結論：</strong>極限值為 <strong>1</strong>。
            </li>
          </ol>
        </Solution>
      </Example>

      {/* 課後練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 求極限值 <MathInline math="\lim_{x \to 0} \frac{\ln(1+x) - x}{x^2}" />。
            <Solution>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 0 0' }}>
                <li>
                  <strong>代入分析：</strong>當 <MathInline math="x=0" /> 時，分子為 <MathInline math="\ln(1) - 0 = 0" />，分母為 <MathInline math="0^2 = 0" />。適用 <MathInline math="\frac{0}{0}" /> 洛必達法則。
                </li>
                <li>
                  <strong>分別求導數：</strong>
                  分子導函數為 <MathInline math="[\ln(1+x) - x]' = \frac{1}{1+x} - 1" />，分母導函數為 <MathInline math="[x^2]' = 2x" />。
                  <MathBlock math="\lim_{x \to 0} \frac{\ln(1+x) - x}{x^2} = \lim_{x \to 0} \frac{\frac{1}{1+x} - 1}{2x}" />
                </li>
                <li>
                  <strong>再次應用：</strong>此時仍為 <MathInline math="\frac{0}{0}" />，我們可以直接化簡為：
                  <MathBlock math="\lim_{x \to 0} \frac{1 - (1+x)}{2x(1+x)} = \lim_{x \to 0} \frac{-x}{2x(1+x)} = \lim_{x \to 0} \frac{-1}{2(1+x)} = -\frac{1}{2}" />
                </li>
                <li>
                  <strong>結論：</strong>答案為 <strong><MathInline math="-\frac{1}{2}" /></strong>。
                </li>
              </ol>
            </Solution>
          </div>
        </ExerciseItem>

        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 求極限值 <MathInline math="\lim_{x \to 0} \frac{e^x - e^{-x} - 2x}{x - \sin x}" />。
            <Solution>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 0 0' }}>
                <li>
                  <strong>第一階段檢驗：</strong>當 <MathInline math="x=0" /> 時，為 <MathInline math="\frac{1 - 1 - 0}{0 - 0} = \frac{0}{0}" />。套用洛必達法則：
                  <MathBlock math="\lim_{x \to 0} \frac{e^x - e^{-x} - 2x}{x - \sin x} = \lim_{x \to 0} \frac{e^x + e^{-x} - 2}{1 - \cos x}" />
                </li>
                <li>
                  <strong>第二階段檢驗：</strong>代入 <MathInline math="x=0" />，此時分子為 <MathInline math="1 + 1 - 2 = 0" />，分母為 <MathInline math="1 - 1 = 0" />。仍為 <MathInline math="\frac{0}{0}" />，再次求導：
                  <MathBlock math="\lim_{x \to 0} \frac{e^x + e^{-x} - 2}{1 - \cos x} = \lim_{x \to 0} \frac{e^x - e^{-x}}{\sin x}" />
                </li>
                <li>
                  <strong>第三階段檢驗與求解：</strong>此時仍為 <MathInline math="\frac{0}{0}" />，最後一次套用洛必達法則：
                  <MathBlock math="\lim_{x \to 0} \frac{e^x - e^{-x}}{\sin x} = \lim_{x \to 0} \frac{e^x + e^{-x}}{\cos x} = \frac{1 + 1}{1} = 2" />
                </li>
                <li>
                  <strong>結論：</strong>答案為 <strong>2</strong>。
                </li>
              </ol>
            </Solution>
          </div>
        </ExerciseItem>

        <ExerciseItem>
          <div>
            <strong>練習 3.</strong> 求指數極限值 <MathInline math="\lim_{x \to \infty} \left(1 + \frac{3}{x}\right)^{2x}" />。
            <Solution>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 0 0' }}>
                <li>
                  <strong>型態分析：</strong>當 <MathInline math="x \to \infty" /> 時，底數趨近於 1，指數趨近於無窮大，為典型的 <MathInline math="1^\infty" /> 未定式。
                </li>
                <li>
                  <strong>對數代換：</strong>令 <MathInline math="y = \left(1 + \frac{3}{x}\right)^{2x}" />，其對數為：
                  <MathBlock math="\ln y = 2x \ln\left(1 + \frac{3}{x}\right)" />
                  我們轉為求 <MathInline math="\lim_{x \to \infty} 2x \ln(1 + 3/x)" />（為 <MathInline math="\infty \cdot 0" /> 型態）。
                </li>
                <li>
                  <strong>改寫成分式並求導：</strong>
                  <MathBlock math="\lim_{x \to \infty} \frac{2\ln(1 + 3/x)}{1/x}" />
                  應用洛必達法則，對分子與分母分別對 <MathInline math="x" /> 求導：
                  <MathBlock math="\lim_{x \to \infty} \frac{2 \cdot \frac{1}{1 + 3/x} \cdot \left(-3/x^2\right)}{-1/x^2} = \lim_{x \to \infty} \frac{6}{1 + 3/x} = 6" />
                  由此求出對數極限為 6。
                </li>
                <li>
                  <strong>復原與求解：</strong>
                  <MathBlock math="\lim_{x \to \infty} y = e^{\lim \ln y} = e^6" />
                </li>
                <li>
                  <strong>結論：</strong>極限值為 <strong><MathInline math="e^6" /></strong>。
                </li>
              </ol>
            </Solution>
          </div>
        </ExerciseItem>

        <ExerciseItem>
          <div>
            <strong>練習 4.</strong> 求單側極限值 <MathInline math="\lim_{x \to 0^+} \left(\cot x - \frac{1}{x}\right)" />。
            <Solution>
              <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', margin: '8px 0 0 0' }}>
                <li>
                  <strong>型態分析：</strong>當 <MathInline math="x \to 0^+" /> 時，<MathInline math="\cot x \to \infty" /> 且 <MathInline math="1/x \to \infty" />。這是一個 <MathInline math="\infty - \infty" /> 型未定式。
                </li>
                <li>
                  <strong>通分轉換：</strong>將餘切函數寫為 <MathInline math="\cos x / \sin x" /> 並進行通分合併：
                  <MathBlock math="\cot x - \frac{1}{x} = \frac{\cos x}{\sin x} - \frac{1}{x} = \frac{x \cos x - \sin x}{x \sin x}" />
                  此時成功轉換為 <MathInline math="\frac{0}{0}" /> 未定式。
                </li>
                <li>
                  <strong>第一階段洛必達：</strong>對分子分母求導（注意乘積微分法）：
                  <MathBlock math="\lim_{x \to 0^+} \frac{[x\cos x - \sin x]'}{[x\sin x]'} = \lim_{x \to 0^+} \frac{\cos x - x\sin x - \cos x}{\sin x + x\cos x} = \lim_{x \to 0^+} \frac{-x\sin x}{\sin x + x\cos x}" />
                </li>
                <li>
                  <strong>第二階段洛必達：</strong>依舊是 <MathInline math="\frac{0}{0}" />，我們再次求導：
                  <MathBlock math="\lim_{x \to 0^+} \frac{-\sin x - x\cos x}{\cos x + \cos x - x\sin x} = \frac{0 - 0}{1 + 1 - 0} = \frac{0}{2} = 0" />
                </li>
                <li>
                  <strong>結論：</strong>極限值為 <strong>0</strong>。
                </li>
              </ol>
            </Solution>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

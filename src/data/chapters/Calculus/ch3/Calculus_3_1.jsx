import { useState, useEffect } from 'react';
import { 
  Definition, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

export default function Calculus_3_1() {
  const [xMath, setXMath] = useState(3.0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setXMath((prev) => {
          if (prev <= 1.02) {
            setIsPlaying(false);
            return 1.02;
          }
          return Math.round((prev - 0.02) * 100) / 100;
        });
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Math function f(t) = t^2
  // We map xMath in [1.0, 4.0] to SVG coords
  const getSvgCoords = (t) => {
    const xSvg = 120 + (t - 1) * 100;
    const yMath = t * t;
    const ySvg = 80 + (yMath - 1) * 10;
    return { x: xSvg, y: ySvg };
  };

  // Fixed point A(a, f(a)) at xMath = 1.0
  const ptA = getSvgCoords(1.0); // { x: 120, y: 80 }
  // Dynamic point Q(x, f(x))
  const ptQ = getSvgCoords(xMath);

  // SVG slope of the active secant line
  const mSvg = (ptQ.y - ptA.y) / (ptQ.x - ptA.x);
  
  // Endpoints of the extended secant line
  const secantX1 = 80;
  const secantY1 = ptA.y + mSvg * (secantX1 - ptA.x);
  const secantX2 = 460;
  const secantY2 = ptA.y + mSvg * (secantX2 - ptA.x);

  // Math values for readout
  const deltaX = Math.round((xMath - 1.0) * 100) / 100;
  const deltaY = Math.round((xMath * xMath - 1.0) * 100) / 100;
  const slopeMath = deltaX === 0 ? 2.0 : Math.round((deltaY / deltaX) * 1000) / 1000;

  // Static key points for historical secant reference (as in the handwritten note)
  const refPoints = [4.0, 2.4, 1.8, 1.3].map(t => ({
    t,
    coords: getSvgCoords(t),
    m: (getSvgCoords(t).y - ptA.y) / (getSvgCoords(t).x - ptA.x)
  }));

  const refColors = ['#a78bfa', '#34d399', '#22d3ee', '#f472b6']; // purple, green, cyan, pink

  // General curve path generator
  const curvePoints = [];
  for (let t = 0.8; t <= 4.2; t += 0.05) {
    const coords = getSvgCoords(t);
    curvePoints.push(`${coords.x},${coords.y}`);
  }
  const curvePathD = `M ${curvePoints.join(' L ')}`;

  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        微積分的誕生主要源於兩個經典的幾何與物理問題：一是「如何求取曲線在某一點的切線斜率」（微分學的核心），二是「如何求取曲線下方所圍成的面積」（積分學的核心）。在本單元中，我們將透過極限的觀念，精確定義「切線斜率」以及函數在某一點的「導數」。
      </p>

      {/* 幾何背景：割線與切線 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        幾何背景：從割線到切線 (From Secant to Tangent Lines)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在初等幾何中，圓的切線被定義為「與圓恰交於一點的直線」。然而，對於更一般的曲線（例如三次方曲線 <MathInline math="y = x^3" />），這種定義不再適用。
        為了解決這個問題，我們引進「割線逼近」的方法，其極限狀態即為切線：
      </p>

      {/* 割線趨近切線的互動幾何示意圖 */}
      <div style={{
        margin: '24px 0',
        padding: '24px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        backgroundColor: 'rgba(255, 255, 255, 0.01)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1.05rem', textAlign: 'center' }}>
          割線逼近切線的動態幾何示意圖 (Interactive Secant and Tangent Line slope)
        </div>
        
        <svg viewBox="0 0 600 360" style={{ width: '100%', maxWidth: '600px', height: 'auto', overflow: 'visible' }}>
          {/* Definitions for Markers (Arrowheads) */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-primary)" />
            </marker>
          </defs>

          {/* X-axis */}
          <line x1="40" y1="300" x2="560" y2="300" stroke="var(--text-primary)" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="550" y="325" fill="var(--text-primary)" fontSize="12" fontWeight="600">x</text>

          {/* Dashed vertical lines from key reference points to X-axis */}
          {refPoints.map((pt, idx) => (
            <line key={`ref-dash-${idx}`} x1={pt.coords.x} y1={pt.coords.y} x2={pt.coords.x} y2={300} stroke={refColors[idx]} strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
          ))}
          
          {/* Active dashed vertical line for Q(x) */}
          <line x1={ptQ.x} y1={ptQ.y} x2={ptQ.x} y2={300} stroke="var(--accent-warm)" strokeWidth="1.5" strokeDasharray="4 4" />
          
          {/* Dashed vertical line for A(a) */}
          <line x1={ptA.x} y1={ptA.y} x2={ptA.x} y2={300} stroke="var(--accent-secondary)" strokeWidth="1.5" strokeDasharray="4 4" />

          {/* Labels on X-axis */}
          <text x={ptA.x} y="320" fill="var(--accent-secondary)" fontSize="13" textAnchor="middle" fontWeight="bold" fontFamily="math-serif">a (1.0)</text>
          <text x={ptQ.x} y="340" fill="var(--accent-warm)" fontSize="13" textAnchor="middle" fontWeight="bold" fontFamily="math-serif">x ({xMath.toFixed(2)})</text>
          
          {/* Static reference labels on X-axis */}
          {refPoints.map((pt, idx) => (
            <text key={`ref-label-${idx}`} x={pt.coords.x} y="320" fill={refColors[idx]} fontSize="11" textAnchor="middle" opacity="0.6" fontFamily="math-serif">
              x{4 - idx}
            </text>
          ))}

          {/* The general curve y = f(x) */}
          <path d={curvePathD} fill="none" stroke="var(--text-primary)" strokeWidth="2.5" />
          <text x="455" y="250" fill="var(--text-primary)" fontSize="13" fontFamily="math-serif">y = f(x)</text>

          {/* Historical Static Secant lines (for educational context) */}
          {refPoints.map((pt, idx) => {
            const y1 = ptA.y + pt.m * (secantX1 - ptA.x);
            const y2 = ptA.y + pt.m * (secantX2 - ptA.x);
            return (
              <line key={`ref-line-${idx}`} x1={secantX1} y1={y1} x2={secantX2} y2={y2} stroke={refColors[idx]} strokeWidth="1" opacity="0.25" />
            );
          })}

          {/* Active Secant line (Dynamic) */}
          <line x1={secantX1} y1={secantY1} x2={secantX2} y2={secantY2} stroke="var(--accent-warm)" strokeWidth="2.5" />

          {/* Tangent line at A (Teal/Accent-Secondary) */}
          {/* Slope is 0.2 in SVG coords */}
          <line x1={80} y1={72} x2={460} y2="148" stroke="var(--accent-secondary)" strokeWidth="2" strokeDasharray="5 3" opacity="0.8" />

          {/* Static points on Curve */}
          {refPoints.map((pt, idx) => (
            <circle key={`ref-dot-${idx}`} cx={pt.coords.x} cy={pt.coords.y} r="4" fill={refColors[idx]} stroke="var(--bg-primary)" strokeWidth="1" opacity="0.6" />
          ))}

          {/* Dynamic Point Q */}
          <circle cx={ptQ.x} cy={ptQ.y} r="6" fill="var(--accent-warm)" stroke="var(--bg-primary)" strokeWidth="1.5" />
          
          {/* Fixed Point A */}
          <circle cx={ptA.x} cy={ptA.y} r="6" fill="var(--accent-secondary)" stroke="var(--bg-primary)" strokeWidth="2" />
          
          {/* Labels for Points */}
          <text x={ptA.x} y="62" fill="var(--text-primary)" fontSize="13" fontWeight="600" textAnchor="middle" fontFamily="math-serif">A(a, f(a))</text>
          <text x={ptQ.x + 8} y={ptQ.y - 8} fill="var(--accent-warm)" fontSize="12" fontWeight="600" fontFamily="math-serif">Q(x, f(x))</text>

          {/* Annotation text & arrow */}
          <text x="360" y="65" fill="var(--text-secondary)" fontSize="13" fontWeight="600">找一組割線，</text>
          <text x="360" y="85" fill="var(--text-secondary)" fontSize="13" fontWeight="600">讓 x 愈來愈接近 a</text>
          <path d="M 400,285 L 140,285 M 147,281 L 140,285 L 147,289" fill="none" stroke="var(--text-secondary)" strokeWidth="1.2" />
        </svg>

        {/* Dynamic Controls and Dashboard Grid */}
        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '20px',
          marginTop: '12px'
        }}>
          {/* Slider and Buttons Control */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                手動調整自變數 <MathInline math="x" />：
              </span>
              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-warm)' }}>
                x = {xMath.toFixed(2)}
              </span>
            </div>
            
            <input 
              type="range" 
              min="1.02" 
              max="4.00" 
              step="0.01" 
              value={xMath} 
              onChange={(e) => setXMath(parseFloat(e.target.value))} 
              style={{ width: '100%', accentColor: 'var(--accent-warm)', cursor: 'pointer' }}
            />

            <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isPlaying ? 'var(--accent-warm)' : 'var(--accent-primary)',
                  color: '#fff',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'background-color 0.2s'
                }}
              >
                {isPlaying ? (
                  <>
                    <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                    暫停動畫
                  </>
                ) : (
                  <>
                    <svg style={{ width: '14px', height: '14px' }} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    自動逼近 (x → a)
                  </>
                )}
              </button>
              
              <button 
                onClick={() => {
                  setIsPlaying(false);
                  setXMath(4.00);
                }}
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                重設
              </button>
            </div>
          </div>

          {/* Metrics Table */}
          <div style={{
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
              即時數值計算 (當前函數: <MathInline math="f(t) = t^2" />)
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>定點位置：</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}><MathInline math="a = 1.00" /></span>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>定點函數值：</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}><MathInline math="f(a) = 1.00" /></span>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>動點位置：</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}><MathInline math={`x = ${xMath.toFixed(2)}`} /></span>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)' }}>動點函數值：</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}><MathInline math={`f(x) = ${(xMath*xMath).toFixed(3)}`} /></span>
              </div>
            </div>

            <div style={{
              marginTop: '4px',
              padding: '10px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontSize: '0.85rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>自變數改变量 (<MathInline math="\Delta x = x - a" />):</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{deltaX.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-secondary)' }}>函數值改变量 (<MathInline math="\Delta y = f(x) - f(a)" />):</span>
                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{deltaY.toFixed(3)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px dashed var(--border-color)', paddingTop: '6px', marginTop: '2px' }}>
                <span style={{ color: 'var(--accent-warm)', fontWeight: '700' }}>割線斜率 (<MathInline math="m_{\text{sec}} = \frac{\Delta y}{\Delta x}" />):</span>
                <span style={{ color: 'var(--accent-warm)', fontWeight: '700', fontSize: '0.95rem' }}>
                  {typeof slopeMath === 'number' ? slopeMath.toFixed(3) : slopeMath}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--accent-secondary)', fontWeight: '700' }}>切線斜率極限值 (<MathInline math="f'(a)" />):</span>
                <span style={{ color: 'var(--accent-secondary)', fontWeight: '700', fontSize: '0.95rem' }}>2.000</span>
              </div>
            </div>

            {/* Explanatory helper text */}
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.5',
              padding: '8px 12px',
              borderRadius: '6px',
              borderLeft: '3px solid var(--accent-primary)',
              backgroundColor: 'rgba(139, 92, 246, 0.03)'
            }}>
              {xMath > 3.0 && "目前 x 距離 a 較遠，割線斜率與切線斜率（極限值 2.000）有明顯落差。"}
              {xMath > 2.0 && xMath <= 3.0 && "隨著 x 逐漸朝 a 靠近，割線的傾斜程度開始貼近切線。"}
              {xMath > 1.1 && xMath <= 2.0 && "此時 x 已經非常接近 a，割線斜率已非常逼近極限值 2.000！"}
              {xMath <= 1.1 && "在極限狀態下 (x → a)，割線斜率的極限值就是點 A 處的切線斜率 (導數 = 2.000)！"}
            </div>
          </div>
        </div>
      </div>

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
          <span>🔍 割線斜率的極限過程</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            設 <MathInline math="A(a, f(a))" /> 為曲線 <MathInline math="y = f(x)" /> 上的一個定點，而 <MathInline math="Q(x, f(x))" /> 為曲線上另一個變動點。
          </p>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>割線斜率：</strong> 連接 <MathInline math="A" /> 與 <MathInline math="Q" /> 兩點的直線稱為「割線」，其斜率為：
              <MathBlock math="m_{\text{sec}} = \frac{f(x) - f(a)}{x - a}" />
            </li>
            <li>
              <strong>切線斜率的極限：</strong> 當動點 <MathInline math="Q" /> 沿著曲線無限趨近於定點 <MathInline math="A" /> 時（即 <MathInline math="x \to a" />），如果割線的斜率存在極限值，該極限值 <MathInline math="m" /> 就是曲線在點 <MathInline math="A" /> 處的「切線斜率」。
            </li>
          </ol>
        </div>
      </div>

      {/* 切線斜率的定義卡片 */}
      <Definition title="切線斜率 (Slope of a Tangent Line)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 在包含 <MathInline math="a" /> 的開區間內有定義。曲線 <MathInline math="y = f(x)" /> 在點 <MathInline math="A(a, f(a))" /> 處的切線斜率 <MathInline math="m" /> 定義為：
        </p>
        <MathBlock math="m = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}" />
        <p style={{ margin: '14px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若令增量 <MathInline math="h = x - a" />（即 <MathInline math="x = a + h" />），則當 <MathInline math="x \to a" /> 時，<MathInline math="h \to 0" />。上式亦可改寫為：
        </p>
        <MathBlock math="m = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}" />
        <p style={{ margin: '14px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若上述極限存在，則該切線方程式為：
        </p>
        <MathBlock math="y - f(a) = m(x - a)" />
      </Definition>

      {/* 導數的定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        導數的正式定義 (Formal Definition of the Derivative)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        切線斜率的極限概念在數學上被提煉為「導數」。導數描述了函數在某個特定點的「瞬時變化率」。
      </p>

      <Definition title="點的導數 (Derivative at a Point)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          函數 <MathInline math="f" /> 在數值 <MathInline math="a" /> 處的<strong>導數 (Derivative)</strong>，記作 <MathInline math="f'(a)" />，定義為：
        </p>
        <MathBlock math="f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}" />
        <p style={{ margin: '14px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若此極限存在，我們稱函數 <MathInline math="f" /> 在 <MathInline math="x = a" /> 處為<strong>可微 (Differentiable)</strong>。
        </p>
        <p style={{ margin: '14px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          等價的極限表示法：
        </p>
        <MathBlock math="f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a}" />
      </Definition>

      {/* 導數的寫法 */}
      <div className="definition-block math-serif" style={{ margin: '24px 0' }}>
        <div className="block-header" style={{ color: 'var(--definition-border)', backgroundColor: 'rgba(6, 182, 212, 0.03)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          導數的寫法 (Notation of Derivatives)
        </div>
        <div className="block-body" style={{ padding: '20px' }}>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '16px', listStyleType: 'disc' }}>
            <li>
              <strong>拉格朗日符號 (Lagrange's notation)：</strong>
              <div style={{ margin: '4px 0 8px 0' }}>最常見且簡潔的寫法，使用撇號。</div>
              <div style={{ paddingLeft: '12px', margin: '8px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <MathInline math="f'(x), \quad y'" />
              </div>
            </li>
            <li>
              <strong>萊布尼茲符號 (Leibniz's notation)：</strong>
              <div style={{ margin: '4px 0 8px 0' }}>強調微小的變化量比例 (<MathInline math="dy" /> 與 <MathInline math="dx" />)，在連鎖律和積分計算中非常直觀。</div>
              <div style={{ paddingLeft: '12px', margin: '8px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <MathInline math="\frac{dy}{dx}, \quad \frac{d}{dx}f(x)" />
              </div>
            </li>
            <li>
              <strong>牛頓符號 (Newton's notation)：</strong>
              <div style={{ margin: '4px 0 8px 0' }}>在變數上方加點，通常專門用於物理學中表示對「時間」的微分。</div>
              <div style={{ paddingLeft: '12px', margin: '8px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <MathInline math="\dot{y}, \quad \ddot{y}" />
              </div>
            </li>
            <li>
              <strong>尤拉符號 (Euler's notation)：</strong>
              <div style={{ margin: '4px 0 8px 0' }}>將微分視為一個算子 (Operator) 作用在函數上。</div>
              <div style={{ paddingLeft: '12px', margin: '8px 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                <MathInline math="D_x y, \quad Df(x)" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* 物理與應用背景：瞬時速度 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        物理意義：瞬時變率與速度 (Instantaneous Rates of Change & Velocity)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        導數不僅有幾何上的切線斜率意義，在物理學中也有著極其重要的應用。最經典的例子是描述物體的運動速度：
      </p>

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
          <span>🚗 運動學中的速度問題</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
            設一物體在直線運動中的位置函數為 <MathInline math="s(t)" />，其中 <MathInline math="t" /> 代表時間。
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>平均速度 (Average Velocity)：</strong> 在時間區間 <MathInline math="[t_0, t_0 + h]" /> 內，物體移動的平均速度為位置的改变量除以時間量：
              <MathBlock math="v_{\text{avg}} = \frac{s(t_0 + h) - s(t_0)}{h}" />
            </li>
            <li>
              <strong>瞬時速度 (Instantaneous Velocity)：</strong> 當時間間隔 <MathInline math="h \to 0" /> 時，平均速度的極限值即為物體在時刻 <MathInline math="t_0" /> 的瞬時速度：
              <MathBlock math="v(t_0) = s'(t_0) = \lim_{h \to 0} \frac{s(t_0 + h) - s(t_0)}{h}" />
            </li>
          </ul>
        </div>
      </div>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：求拋物線的切線與導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = x^2" /> 在 <MathInline math="x = 1" /> 處的導數 <MathInline math="f'(1)" />，並求出在該點的切線方程式。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            首先計算在 <MathInline math="x=1" /> 的函數值：<MathInline math="f(1) = 1^2 = 1" />。因此切點座標為 <MathInline math="(1, 1)" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            利用導數的第一種定義（點式極限）來計算斜率：
          </p>
          <MathBlock math="f'(1) = \lim_{x \to 1} \frac{f(x) - f(1)}{x - 1} = \lim_{x \to 1} \frac{x^2 - 1}{x - 1}" />
          <p style={{ margin: '10px 0' }}>
            因為分母與分子在 <MathInline math="x = 1" /> 時皆為 0（未定式），我們對分子進行因式分解並約分：
          </p>
          <MathBlock math="= \lim_{x \to 1} \frac{(x-1)(x+1)}{x-1} = \lim_{x \to 1} (x+1) = 1 + 1 = 2" />
          
          <p style={{ margin: '14px 0 10px 0' }}>
            <strong>【另一種方法：使用增量式極限】</strong>：
          </p>
          <MathBlock math="f'(1) = \lim_{h \to 0} \frac{f(1+h) - f(1)}{h} = \lim_{h \to 0} \frac{(1+h)^2 - 1^2}{h}" />
          <MathBlock math="= \lim_{h \to 0} \frac{1 + 2h + h^2 - 1}{h} = \lim_{h \to 0} \frac{2h + h^2}{h}" />
          <MathBlock math="= \lim_{h \to 0} (2 + h) = 2" />
          
          <div style={{ marginTop: '16px', lineHeight: '1.8' }}>
            <strong>【切線方程式】</strong>：
            <br />
            已知切點為 <MathInline math="(1, 1)" />，且切線斜率為 <MathInline math="m = f'(1) = 2" />。
            根據直線的點斜式公式：
            <MathBlock math="y - 1 = 2(x - 1) \implies y = 2x - 1" />
            所以，曲線在該點的切線方程式為 <MathInline math="y = 2x - 1" />。
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：求根式函數的導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          設 <MathInline math="c > 0" />，利用定義求函數 <MathInline math="f(x) = \sqrt{x}" /> 在 <MathInline math="x = c" /> 處的導數 <MathInline math="f'(c)" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            根據導數的極限定義：
          </p>
          <MathBlock math="f'(c) = \lim_{x \to c} \frac{\sqrt{x} - \sqrt{c}}{x - c}" />
          <p style={{ marginBottom: '10px' }}>
            這是一個包含根式的 <MathInline math="\frac{0}{0}" /> 未定式。我們可以利用分子有理化，或者將分母分解。
          </p>
          
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '14px 0 8px 0' }}>
            方法一：分子有理化
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            將分子與分母同乘共軛根式 <MathInline math="\sqrt{x} + \sqrt{c}" />：
          </p>
          <MathBlock math="\frac{\sqrt{x} - \sqrt{c}}{x - c} = \frac{(\sqrt{x} - \sqrt{c})(\sqrt{x} + \sqrt{c})}{(x - c)(\sqrt{x} + \sqrt{c})} = \frac{x - c}{(x - c)(\sqrt{x} + \sqrt{c})}" />
          <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
            當 <MathInline math="x \ne c" /> 時，約去共同因子 <MathInline math="x - c" />：
          </p>
          <MathBlock math="= \frac{1}{\sqrt{x} + \sqrt{c}}" />
          
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '14px 0 8px 0' }}>
            方法二：分母平方差分解
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            由於 <MathInline math="x > 0" /> 且 <MathInline math="c > 0" />，我們可以將分母 <MathInline math="x - c" /> 看作是根式的平方差：
          </p>
          <MathBlock math="x - c = (\sqrt{x})^2 - (\sqrt{c})^2 = (\sqrt{x} - \sqrt{c})(\sqrt{x} + \sqrt{c})" />
          <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
            代入極限式直接約分：
          </p>
          <MathBlock math="\frac{\sqrt{x} - \sqrt{c}}{x - c} = \frac{\sqrt{x} - \sqrt{c}}{(\sqrt{x} - \sqrt{c})(\sqrt{x} + \sqrt{c})} = \frac{1}{\sqrt{x} + \sqrt{c}}" />
          
          <p style={{ margin: '16px 0 10px 0' }}>
            最後求取極限值：
          </p>
          <MathBlock math="f'(c) = \lim_{x \to c} \frac{1}{\sqrt{x} + \sqrt{c}} = \frac{1}{\sqrt{c} + \sqrt{c}} = \frac{1}{2\sqrt{c}}" />
          <p style={{ marginTop: '10px' }}>
            這說明函數 <MathInline math="f(x) = \sqrt{x}" /> 的導數為 <MathInline math="f'(x) = \frac{1}{2\sqrt{x}}" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：自由落體的瞬時速度計算">
        <p style={{ color: 'var(--text-secondary)' }}>
          在忽略空氣阻力的情況下，自由落體的位置函數為 <MathInline math="s(t) = 4.9t^2" />（其中 <MathInline math="s" /> 單位為公尺，<MathInline math="t" /> 單位為秒）。求物體在落下的第 <MathInline math="2" /> 秒時的瞬時速度。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            第 <MathInline math="2" /> 秒時的瞬時速度即為位置函數 <MathInline math="s(t)" /> 在 <MathInline math="t = 2" /> 處的導數 <MathInline math="s'(2)" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            使用導數的增量定義式計算：
          </p>
          <MathBlock math="s'(2) = \lim_{h \to 0} \frac{s(2 + h) - s(2)}{h}" />
          <p style={{ margin: '10px 0' }}>
            將 <MathInline math="s(t) = 4.9t^2" /> 代入：
          </p>
          <MathBlock math="s(2+h) = 4.9(2+h)^2 = 4.9(4 + 4h + h^2) = 19.6 + 19.6h + 4.9h^2" />
          <MathBlock math="s(2) = 4.9(2)^2 = 19.6" />
          <p style={{ margin: '10px 0' }}>
            相減後帶入極限式：
          </p>
          <MathBlock math="s'(2) = \lim_{h \to 0} \frac{(19.6 + 19.6h + 4.9h^2) - 19.6}{h}" />
          <MathBlock math="= \lim_{h \to 0} \frac{19.6h + 4.9h^2}{h}" />
          <MathBlock math="= \lim_{h \to 0} (19.6 + 4.9h) = 19.6 \text{ m/s}" />
          
          <p style={{ marginTop: '16px', lineHeight: '1.8' }}>
            <strong>【結論】</strong>：
            物體在落下第 <MathInline math="2" /> 秒時的瞬時速度為 <MathInline math="19.6 \text{ m/s}" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 利用導數的定義，計算倒數函數 <MathInline math="f(x) = \frac{1}{x}" /> 在 <MathInline math="x = 2" /> 處的導數 <MathInline math="f'(2)" />，並寫出其切線方程式。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：通分並約去 <MathInline math="h" />。答案：導數為 <MathInline math="-\frac{1}{4}" />，切線方程式為 <MathInline math="x + 4y = 4" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 設 <MathInline math="x_0" /> 為任意實數，利用定義求二次多項式函數 <MathInline math="f(x) = 2x^2 + 3x" /> 在 <MathInline math="x = x_0" /> 處的導數 <MathInline math="f'(x_0)" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：使用極限式展開 <MathInline math="(x_0 + h)^2" /> 與 <MathInline math="(x_0 + h)" />，約去分母。答案為：<MathInline math="4x_0 + 3" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

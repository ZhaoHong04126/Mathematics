import { useState } from 'react';
import { 
  Definition, 
  Theorem, 
  Example, 
  Solution, 
  Proof,
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

// 內部元件：FTC 互動模擬器
function FtcVisualizer() {
  const [x, setX] = useState(3.0);
  const [h, setH] = useState(0.6);

  // 被積函數 f(t) = 1.5 + sin(t)
  const f = (t) => 1.5 + Math.sin(t);
  
  // 累積函數 g(x) = \int_0^x (1.5 + sin(t)) dt = 1.5x - cos(x) + 1
  const g = (t) => 1.5 * t - Math.cos(t) + 1;

  // SVG 座標轉換
  // t \in [0, 6.28] -> X \in [50, 430]
  // y \in [0, 3.0] -> Y \in [220, 20]
  const toSvgX = (t) => 50 + (t / 6.28) * 380;
  const toSvgY = (y) => 220 - (y / 3.0) * 180;

  // y_g \in [0, 11.0] -> Y \in [220, 20]
  const toSvgY_g = (y) => 220 - (y / 11.0) * 180;

  // 1. 生成 f(t) 曲線路徑
  const fPoints = [];
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 6.28;
    fPoints.push(`${toSvgX(t)},${toSvgY(f(t))}`);
  }
  const fPathD = `M ${fPoints.join(' L ')}`;

  // 2. 生成 g(t) 曲線路徑
  const gPoints = [];
  for (let i = 0; i <= 100; i++) {
    const t = (i / 100) * 6.28;
    gPoints.push(`${toSvgX(t)},${toSvgY_g(g(t))}`);
  }
  const gPathD = `M ${gPoints.join(' L ')}`;

  // 3. 生成陰影區間面積路徑的函數
  const buildAreaPath = (xStart, xEnd) => {
    const points = [];
    points.push(`${toSvgX(xStart)},${toSvgY(0)}`);
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const t = xStart + (i / steps) * (xEnd - xStart);
      points.push(`${toSvgX(t)},${toSvgY(f(t))}`);
    }
    points.push(`${toSvgX(xEnd)},${toSvgY(0)}`);
    return `M ${points.join(' L ')} Z`;
  };

  // 切線點計算
  const u1 = Math.max(0, x - 1.2);
  const u2 = Math.min(6.28, x + 1.2);
  const tangentY = (u) => g(x) + f(x) * (u - x);

  // 數值計算
  const val_x = x;
  const val_h = h;
  const val_fx = f(x);
  const val_gx = g(x);
  const val_gxh = g(x + h);
  const deltaG = val_gxh - val_gx;
  const approxArea = val_fx * val_h;
  const avgRate = deltaG / val_h;

  const cardStyle = {
    padding: '20px',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    boxShadow: 'var(--shadow-sm)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '20px',
    margin: '20px 0'
  };

  const statItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 12px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    fontSize: '0.9rem'
  };

  return (
    <div style={{ margin: '24px 0', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
      <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📊</span> 互動實驗室：FTC 累積函數與割線/切線斜率動態模擬
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
        透過拖動下方的滑桿，您可以自由調整積分上限 <MathInline math="x" /> 與微小增量 <MathInline math="h" />。
        觀察左圖的<strong>面積變化量 <MathInline math="\Delta g" /></strong>，並對照右圖中<strong>累積函數 <MathInline math="g(x)" /> 割線與切線的斜率變化</strong>。當 <MathInline math="h \to 0" /> 時，您將直觀地看見「變化率等於高度值」的核心結論。
      </p>

      {/* 控制滑桿區 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
            <span>積分上限 (x):</span>
            <span style={{ color: 'var(--accent-primary)', fontFamily: 'monospace' }}>{val_x.toFixed(2)}</span>
          </label>
          <input 
            type="range" 
            min="0.5" 
            max="4.5" 
            step="0.05" 
            value={x} 
            onChange={(e) => setX(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)', cursor: 'pointer' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: '500', display: 'flex', justifyContent: 'space-between' }}>
            <span>微小增量 (h):</span>
            <span style={{ color: 'var(--accent-secondary)', fontFamily: 'monospace' }}>{val_h.toFixed(2)}</span>
          </label>
          <input 
            type="range" 
            min="0.1" 
            max="1.2" 
            step="0.02" 
            value={h} 
            onChange={(e) => setH(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-secondary)', cursor: 'pointer' }}
          />
        </div>
      </div>

      {/* 圖表呈現區 */}
      <div style={gridStyle}>
        {/* 左圖：被積函數 f(t) */}
        <div style={cardStyle}>
          <h5 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', textAlign: 'center' }}>
            被積函數 <MathInline math="f(t) = 1.5 + \sin(t)" /> 與積分面積
          </h5>
          <svg viewBox="0 0 460 250" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-secondary)" />
              </marker>
            </defs>

            {/* 1. 繪製已積分的面積 g(x) [紫色] */}
            <path d={buildAreaPath(0, x)} fill="rgba(139, 92, 246, 0.15)" stroke="none" />
            
            {/* 2. 繪製微小增量面積 \Delta g [青色] */}
            <path d={buildAreaPath(x, x+h)} fill="rgba(6, 182, 212, 0.4)" stroke="none" />

            {/* 3. 繪製估計矩形 f(x) * h [橘色虛線] */}
            <rect 
              x={toSvgX(x)} 
              y={toSvgY(f(x))} 
              width={toSvgX(x+h) - toSvgX(x)} 
              height={toSvgY(0) - toSvgY(f(x))} 
              fill="none" 
              stroke="var(--accent-warm)" 
              strokeWidth="1.5" 
              strokeDasharray="4 3" 
            />

            {/* 坐標軸 */}
            <line x1="45" y1="220" x2="445" y2="220" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <line x1="50" y1="230" x2="50" y2="20" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#arrow)" />

            {/* f(t) 曲線 */}
            <path d={fPathD} fill="none" stroke="var(--accent-primary)" strokeWidth="2" />

            {/* 虛線指標與刻度 */}
            <line x1={toSvgX(x)} y1="220" x2={toSvgX(x)} y2={toSvgY(f(x))} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1={toSvgX(x+h)} y1="220" x2={toSvgX(x+h)} y2={toSvgY(f(x+h))} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="50" y1={toSvgY(f(x))} x2={toSvgX(x)} y2={toSvgY(f(x))} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />

            {/* 文字標籤 */}
            <text x={toSvgX(x)} y="236" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="500">x</text>
            <text x={toSvgX(x+h)} y="236" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="500">x+h</text>
            <text x="35" y={toSvgY(f(x)) + 4} fill="var(--text-secondary)" fontSize="10" textAnchor="end">f(x)</text>
            <text x="445" y="234" fill="var(--text-secondary)" fontSize="11" textAnchor="end">t</text>
            <text x="42" y="25" fill="var(--text-secondary)" fontSize="11" textAnchor="end">y</text>
            
            {/* 區塊內面積文字 */}
            <text x={toSvgX(x/2)} y="160" fill="var(--accent-primary)" fontSize="11" textAnchor="middle" opacity="0.8">g(x)</text>
            <text x={toSvgX(x + h/2)} y={toSvgY(f(x)/2)} fill="var(--accent-secondary)" fontSize="11" textAnchor="middle" fontWeight="bold">Δg</text>
          </svg>
        </div>

        {/* 右圖：累積函數 g(x) */}
        <div style={cardStyle}>
          <h5 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-primary)', textAlign: 'center' }}>
            累積函數 <MathInline math="g(x) = \int_0^x f(t)\,dt" /> 與割線/切線
          </h5>
          <svg viewBox="0 0 460 250" style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {/* 坐標軸 */}
            <line x1="45" y1="220" x2="445" y2="220" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#arrow)" />
            <line x1="50" y1="230" x2="50" y2="20" stroke="var(--text-secondary)" strokeWidth="1.2" markerEnd="url(#arrow)" />

            {/* g(x) 曲線 [紫色] */}
            <path d={gPathD} fill="none" stroke="var(--accent-primary)" strokeWidth="2.2" />

            {/* 繪製割線 (連接 (x, g(x)) 與 (x+h, g(x+h))) [青色] */}
            <line 
              x1={toSvgX(x)} 
              y1={toSvgY_g(g(x))} 
              x2={toSvgX(x+h)} 
              y2={toSvgY_g(g(x+h))} 
              stroke="var(--accent-secondary)" 
              strokeWidth="2" 
            />

            {/* 繪製切線 [橘色] */}
            <line 
              x1={toSvgX(u1)} 
              y1={toSvgY_g(tangentY(u1))} 
              x2={toSvgX(u2)} 
              y2={toSvgY_g(tangentY(u2))} 
              stroke="var(--accent-warm)" 
              strokeWidth="1.5" 
              strokeDasharray="4 2"
            />

            {/* 割線/切線端點與虛線刻度 */}
            <line x1={toSvgX(x)} y1="220" x2={toSvgX(x)} y2={toSvgY_g(g(x))} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
            <line x1={toSvgX(x+h)} y1="220" x2={toSvgX(x+h)} y2={toSvgY_g(g(x+h))} stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="2 2" />
            
            <circle cx={toSvgX(x)} cy={toSvgY_g(g(x))} r="4" fill="var(--accent-warm)" />
            <circle cx={toSvgX(x+h)} cy={toSvgY_g(g(x+h))} r="4" fill="var(--accent-secondary)" />

            {/* 文字標籤 */}
            <text x={toSvgX(x)} y="236" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="500">x</text>
            <text x={toSvgX(x+h)} y="236" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="500">x+h</text>
            <text x="445" y="234" fill="var(--text-secondary)" fontSize="11" textAnchor="end">x</text>
            <text x="42" y="25" fill="var(--text-secondary)" fontSize="11" textAnchor="end">y</text>

            <text x={toSvgX(u2) + 5} y={toSvgY_g(tangentY(u2))} fill="var(--accent-warm)" fontSize="10" textAnchor="start">切線 (斜率 = f(x))</text>
            <text x={toSvgX(x+h) + 5} y={toSvgY_g(g(x+h)) - 8} fill="var(--accent-secondary)" fontSize="10" textAnchor="start">割線 (斜率 = Δg/h)</text>
          </svg>
        </div>
      </div>

      {/* 數據對照面板 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '16px' }}>
        <div style={statItemStyle}>
          <span style={{ color: 'var(--text-secondary)' }}>真實面積變量 <MathInline math="\Delta g" />:</span>
          <span style={{ fontWeight: '600', color: 'var(--accent-secondary)', fontFamily: 'monospace' }}>{deltaG.toFixed(4)}</span>
        </div>
        <div style={statItemStyle}>
          <span style={{ color: 'var(--text-secondary)' }}>估算矩形面積 <MathInline math="f(x) \cdot h" />:</span>
          <span style={{ fontWeight: '600', color: 'var(--accent-warm)', fontFamily: 'monospace' }}>{approxArea.toFixed(4)}</span>
        </div>
        <div style={statItemStyle}>
          <span style={{ color: 'var(--text-secondary)' }}>平均變化率 (割線斜率) <MathInline math="\frac{\Delta g}{h}" />:</span>
          <span style={{ fontWeight: '600', color: 'var(--accent-secondary)', fontFamily: 'monospace' }}>{avgRate.toFixed(4)}</span>
        </div>
        <div style={statItemStyle}>
          <span style={{ color: 'var(--text-secondary)' }}>瞬時變化率 (切線斜率) <MathInline math="f(x)" />:</span>
          <span style={{ fontWeight: '600', color: 'var(--accent-warm)', fontFamily: 'monospace' }}>{val_fx.toFixed(4)}</span>
        </div>
      </div>
    </div>
  );
}

export default function Calculus_5_4() {
  return (
    <div>
      {/* 導言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        微積分基本定理（The Fundamental Theorem of Calculus，簡稱 <strong>FTC</strong>）是整個微積分學的靈魂與核心。
        在此定理發現之前，微分學（研究切線斜率與瞬時變化率）與積分學（研究曲線下的圖形面積與累積量）被視為兩個完全不相關的幾何學問題。
        微積分基本定理的出現，<strong>成功將微分與積分、求導數與求反導函數（積分）這兩大過程緊密連結在一起</strong>，建立起互逆的關係。
      </p>

      {/* 定理第一部分 (FTC Part 1) */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、微積分基本定理第一部分 (FTC Part 1)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        設 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上為連續函數。如果我們定義一個以積分上限為自變數的全新函數：
        <MathBlock math="g(x) = \int_a^x f(t) \, dt \quad (\text{其中 } x \in [a, b])" />
        當 <MathInline math="f \ge 0" /> 時，<MathInline math="g(x)" /> 在幾何上代表從 <MathInline math="a" /> 到 <MathInline math="x" /> 這段區間內，曲線 <MathInline math="f" /> 下方的陰影面積。
        此時，這個「累積面積函數」 <MathInline math="g(x)" /> 的導數是什麼呢？
      </div>

      <Theorem title="微積分基本定理第一部分 (The Fundamental Theorem of Calculus, Part 1)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上是<strong>連續的 (Continuous)</strong>，則由以下積分定義的累積函數：
          <MathBlock math="g(x) = \int_a^x f(t) \, dt \quad (x \in [a, b])" />
          在閉區間 <MathInline math="[a, b]" /> 上是連續的，且在開區間 <MathInline math="(a, b)" /> 上是<strong>可微的 (Differentiable)</strong>，其導數為：
          <MathBlock math="g'(x) = \frac{d}{dx} \left[ \int_a^x f(t) \, dt \right] = f(x)" />
          這意味著：<strong>先對函數進行定積分，再對其求導，結果會回到原本的被積函數自身</strong>（積分與微分在此互逆）。
        </div>
      </Theorem>

      {/* 直觀物理與幾何猜想 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        幾何直觀與猜想
      </h4>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        我們可以利用微分的定義來直觀推導。當增量 <MathInline math="h" /> 非常微小時：
        <ul style={{ paddingLeft: '20px', margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            面積的微小變化量：
            <MathBlock math="g(x+h) - g(x) = \int_x^{x+h} f(t) \, dt" />
          </li>
          <li>
            當 <MathInline math="h" /> 很小時，在區間 <MathInline math="[x, x+h]" /> 內，函數高度大致不變，幾乎等於一個高度為 <MathInline math="f(x)" />、寬度為 <MathInline math="h" /> 的長方形面積，即：
            <MathBlock math="g(x+h) - g(x) \approx h \cdot f(x)" />
          </li>
          <li>
            將兩側除以 <MathInline math="h" /> 得到平均變化率：
            <MathBlock math="\frac{g(x+h) - g(x)}{h} \approx f(x)" />
          </li>
          <li>
            所以我們猜測，取極限令 <MathInline math="h \to 0" /> 時，這就變成了導數的精確定義：
            <MathBlock math="g'(x) = \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} = f(x)" />
          </li>
        </ul>
      </div>

      {/* 嚴格證明 Part 1 */}
      <Proof title="微積分基本定理第一部分之嚴格證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設 <MathInline math="h > 0" />，考慮函數在點 <MathInline math="x" /> 處的差商：
          <MathBlock math="\frac{g(x+h) - g(x)}{h} = \frac{1}{h} \left[ \int_a^{x+h} f(t) \, dt - \int_a^x f(t) \, dt \right] = \frac{1}{h} \int_x^{x+h} f(t) \, dt" />
          由於 <MathInline math="f" /> 在閉區間 <MathInline math="[x, x+h]" /> 上連續，根據<strong>極值定理 (Extreme Value Theorem)</strong>，<MathInline math="f" /> 在此區間內必有最大值與最小值。
          我們定義：
          <MathBlock math="m := \min_{t \in [x, x+h]} f(t) = f(v) \quad (\text{其中 } v \in [x, x+h])" />
          <MathBlock math="M := \max_{t \in [x, x+h]} f(t) = f(u) \quad (\text{其中 } u \in [x, x+h])" />
          因此，對於所有在區間內的 <MathInline math="t" />，皆滿足：
          <MathBlock math="m \le f(t) \le M" />
          根據定積分的大小比較與估計性質，我們可以將不等式在區間 <MathInline math="[x, x+h]" /> 上積分：
          <MathBlock math="\int_x^{x+h} m \, dt \le \int_x^{x+h} f(t) \, dt \le \int_x^{x+h} M \, dt" />
          因為 <MathInline math="m" /> 與 <MathInline math="M" /> 在此為常數，上式化簡為：
          <MathBlock math="m \cdot h \le \int_x^{x+h} f(t) \, dt \le M \cdot h" />
          由於 <MathInline math="h > 0" />，不等式同除以 <MathInline math="h" />：
          <MathBlock math="m \le \frac{1}{h} \int_x^{x+h} f(t) \, dt \le M" />
          代入我們設定的極值點，得到：
          <MathBlock math="f(v) \le \frac{g(x+h) - g(x)}{h} \le f(u)" />
          此時，我們令 <MathInline math="h \to 0" />。
          由於自變數 <MathInline math="u, v" /> 被夾在 <MathInline math="x" /> 與 <MathInline math="x+h" /> 之間，根據夾擠性質，當 <MathInline math="h \to 0" /> 時，有 <MathInline math="v \to x" /> 且 <MathInline math="u \to x" />。
          又因為已知 <MathInline math="f" /> 在 <MathInline math="x" /> 連續，因此：
          <MathBlock math="\lim_{h \to 0} f(v) = f(x) \quad \text{且} \quad \lim_{h \to 0} f(u) = f(x) \quad \text{(此即連續性定義)}" />
          此時，套用<strong>夾擠定理 (Squeeze Theorem)</strong>：
          <MathBlock math="\lim_{h \to 0^+} \frac{g(x+h) - g(x)}{h} = f(x)" />
          當 <MathInline math="h < 0" /> 時，以類似的步驟（反向積分）亦可推得左極限為 <MathInline math="f(x)" />。
          <br />
          因此，雙邊極限存在：
          <MathBlock math="g'(x) = \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} = f(x)" />
          證明完畢。
        </div>
      </Proof>

      {/* 互動模擬器 */}
      <FtcVisualizer />

      {/* 萊布尼茲法則 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        變動上下限求導：萊布尼茲法則 (Leibniz Rule)
      </h4>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        設被積函數 <MathInline math="f" /> 連續，且積分的上限與下限均為可微函數 <MathInline math="g(x)" /> 與 <MathInline math="h(x)" />。
        利用連鎖法則 (Chain Rule) 與定積分性質，我們可以求得推廣公式：
      </p>
      <Definition title="萊布尼茲法則 (Leibniz Rule)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若 <MathInline math="f" /> 連續，<MathInline math="g(x)" /> 與 <MathInline math="h(x)" /> 為可微函數，則：
          <MathBlock math="\frac{d}{dx} \left[ \int_{g(x)}^{h(x)} f(t) \, dt \right] = f(h(x)) \cdot h'(x) - f(g(x)) \cdot g'(x)" />
        </div>
      </Definition>

      {/* 定理第二部分 (FTC Part 2) */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、微積分基本定理第二部分 (FTC Part 2)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        微積分基本定理的第二部分（有時也稱為<strong>評估定理 Evaluation Theorem</strong>），為我們提供了解決定積分計算的極致利器。
        在此之前，計算定積分必須依賴黎曼和的無窮極限；而 Part 2 告訴我們：<strong>定積分的值可以透過求出被積函數的反導函數來直接代值計算</strong>！
      </p>

      <Theorem title="微積分基本定理第二部分 (The Fundamental Theorem of Calculus, Part 2)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上是<strong>連續的 (Continuous)</strong>。
          若 <MathInline math="F" /> 為 <MathInline math="f" /> 在該區間上的<strong>任何一個反導函數 (Antiderivative)</strong>，即滿足 <MathInline math="F'(x) = f(x)" />，則：
          <MathBlock math="\int_a^b f(x) \, dx = F(b) - F(a)" />
        </div>
      </Theorem>

      <Proof title="微積分基本定理第二部分之證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          1. 考慮累積函數 <MathInline math="g(x) = \int_a^x f(t) \, dt" />。由微積分基本定理第一部分 (FTC Part 1) 可知：
          <MathBlock math="g'(x) = f(x)" />
          這代表 <MathInline math="g(x)" /> 本身就是被積函數 <MathInline math="f(x)" /> 的其中一個反導函數。
          <br /><br />
          2. 設 <MathInline math="F(x)" /> 是 <MathInline math="f(x)" /> 的「任意」一個反導函數，即 <MathInline math="F'(x) = f(x)" />。
          由導數的性質，若兩個函數的導函數相同，則它們在區間上必相差一個常數 <MathInline math="C" />：
          <MathBlock math="F(x) = g(x) + C \quad (\text{其中 } a < x < b)" />
          由於 <MathInline math="F" /> 與 <MathInline math="g" /> 在閉區間上均連續，此關係式在端點 <MathInline math="x=a" /> 與 <MathInline math="x=b" /> 上同樣成立。
          <br /><br />
          3. 我們分別將端點代入：
          <MathBlock math="F(a) = g(a) + C = \int_a^a f(t) \, dt + C = 0 + C = C \implies C = F(a)" />
          <MathBlock math="F(b) = g(b) + C = \int_a^b f(t) \, dt + C" />
          因此，將 <MathInline math="C = F(a)" /> 代回，可得：
          <MathBlock math="F(b) = \int_a^b f(t) \, dt + F(a)" />
          移項即得：
          <MathBlock math="\int_a^b f(t) \, dt = F(b) - F(a)" />
          證明完畢。
        </div>
      </Proof>

      <Definition title="計算定積分的標準記號 (Notation)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          當我們要求解 <MathInline math="\int_a^b f(x) \, dx" /> 時，通常會先求出一個反導函數 <MathInline math="F(x)" />，並使用豎線或中括號記號來記錄代值步驟：
          <MathBlock math="\int_a^b f(x) \, dx = F(x) \Big|_a^b \quad \text{或} \quad \int_a^b f(x) \, dx = [F(x)]_a^b = F(b) - F(a)" />
          在某些書籍中也會寫為 <MathInline math="F(x) \Big|_{x=a}^{x=b}" />。
        </div>
      </Definition>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        三、精選例題與詳細解答 (Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：利用 FTC Part 1 與變動上下限求導">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          求下列各函數的導函數：
          <div>(1) <MathInline math="g(x) = \int_0^x \sqrt{1 + t^2} \, dt" /></div>
          <div>(2) <MathInline math="\frac{d}{dx} \int_1^{x^4} \sin(t^2) \, dt" /></div>
          <div>(3) <MathInline math="\frac{d}{dx} \int_{2x}^{3x} \frac{u^2-1}{u^2+1} \, du" /></div>
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【解答 (1)】</strong>
            <br />
            直接套用微積分基本定理第一部分，將上限變數 <MathInline math="x" /> 取代被積變數 <MathInline math="t" /> 即可：
            <MathBlock math="g'(x) = \sqrt{1 + x^2}" />
            
            <strong>【解答 (2)】</strong>
            <br />
            此題的積分上限為 <MathInline math="x^4" />。我們必須使用連鎖法則。
            令 <MathInline math="u = x^4" />：
            <MathBlock math="\frac{d}{dx} \int_1^{x^4} \sin(t^2) \, dt = \frac{d}{du} \left[ \int_1^u \sin(t^2) \, dt \right] \cdot \frac{du}{dx}" />
            <MathBlock math="= \sin(u^2) \cdot \frac{d}{dx}(x^4) = \sin((x^4)^2) \cdot 4x^3 = 4x^3 \sin(x^8)" />
            
            <strong>【解答 (3)】</strong>
            <br />
            此題積分的上限與下限均為 <MathInline math="x" /> 的函數。我們利用萊布尼茲法則（將積分拆為以 0 為中間點的兩項之差再求導）：
            <MathBlock math="\frac{d}{dx} \int_{2x}^{3x} \frac{u^2-1}{u^2+1} \, du = \frac{d}{dx} \left[ \int_0^{3x} \frac{u^2-1}{u^2+1} \, du - \int_0^{2x} \frac{u^2-1}{u^2+1} \, du \right]" />
            將上限代入公式乘上其求導，再減去下限代入公式乘上其求導：
            <MathBlock math="= \frac{(3x)^2 - 1}{(3x)^2 + 1} \cdot 3 - \frac{(2x)^2 - 1}{(2x)^2 + 1} \cdot 2" />
            <MathBlock math="= 3 \left( \frac{9x^2 - 1}{9x^2 + 1} \right) - 2 \left( \frac{4x^2 - 1}{4x^2 + 1} \right)" />
            通分並展開分子：
            <MathBlock math="= \frac{3(9x^2 - 1)(4x^2 + 1) - 2(4x^2 - 1)(9x^2 + 1)}{(9x^2 + 1)(4x^2 + 1)}" />
            <MathBlock math="= \frac{3(36x^4 + 5x^2 - 1) - 2(36x^4 - 5x^2 - 1)}{(4x^2 + 1)(9x^2 + 1)}" />
            <MathBlock math="= \frac{(108x^4 + 15x^2 - 3) - (72x^4 - 10x^2 - 2)}{(4x^2 + 1)(9x^2 + 1)}" />
            <MathBlock math="= \frac{36x^4 + 25x^2 - 1}{(4x^2 + 1)(9x^2 + 1)}" />
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：利用 FTC Part 2 代值求定積分">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          計算下列各定積分：
          <div>(1) <MathInline math="\int_1^3 e^x \, dx" /></div>
          <div>(2) 求曲線 <MathInline math="y = x^2" /> 在區間 <MathInline math="[-1, 2]" /> 與 <MathInline math="x" /> 軸所包圍的面積。</div>
          <div>(3) <MathInline math="\int_3^6 \frac{1}{x} \, dx" /></div>
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【解答 (1)】</strong>
            <br />
            被積函數為 <MathInline math="f(x) = e^x" />，其反導函數為 <MathInline math="F(x) = e^x" />。
            <div style={{ padding: '8px 12px', margin: '8px 0', borderLeft: '3px solid var(--accent-secondary)', backgroundColor: 'var(--bg-tertiary)', fontSize: '0.9rem' }}>
              <strong>提示：</strong> 雖然函數的反導函數有無窮多個（均相差常數 <MathInline math="C" />），但在計算定積分時，我們只需要選取其中一個最簡單的（常數 <MathInline math="C=0" />）代入即可，因為常數項在相減時會自動消去。
            </div>
            代入公式計算：
            <MathBlock math="\int_1^3 e^x \, dx = e^x \Big|_1^3 = e^3 - e^1 = e^3 - e" />
            
            <strong>【解答 (2)】</strong>
            <br />
            此面積即為函數在該區間上的定積分。
            被積函數為 <MathInline math="x^2" />，反導函數為 <MathInline math="\frac{1}{3}x^3" />：
            <MathBlock math="\text{面積} = \int_{-1}^2 x^2 \, dx = \frac{1}{3} x^3 \Big|_{-1}^2" />
            <MathBlock math="= \frac{1}{3} (2)^3 - \frac{1}{3} (-1)^3" />
            <MathBlock math="= \frac{8}{3} - \left( -\frac{1}{3} \right) = \frac{8}{3} + \frac{1}{3} = 3" />
            
            <strong>【解答 (3)】</strong>
            <br />
            被積函數為 <MathInline math="\frac{1}{x}" />，其反導函數為 <MathInline math="\ln|x|" />（必須加絕對值）：
            <MathBlock math="\int_3^6 \frac{1}{x} \, dx = \ln|x| \Big|_3^6 = \ln 6 - \ln 3" />
            利用對數的性質化簡：
            <MathBlock math="= \ln \left( \frac{6}{3} \right) = \ln 2" />
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：不可忽視的前提：被積函數連續性的關鍵影響">
        <div style={{ color: 'var(--text-secondary)' }}>
          考慮積分 <MathInline math="\int_{-2}^2 \frac{1}{x^2} \, dx" />。若直接利用基本公式求得其值為 <MathInline math="-1" />，這個結果是否正確？請給出正確的觀念與解析。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【錯誤解法】</strong>
            <br />
            直觀求出 <MathInline math="1/x^2" /> 的反導函數為 <MathInline math="-1/x" />，代入上下限：
            <MathBlock math="\int_{-2}^2 \frac{1}{x^2} \, dx = \left[ -\frac{1}{x} \right]_{-2}^2 = \left( -\frac{1}{2} \right) - \left( -\frac{1}{-2} \right) = -1" />
            <span style={{ color: 'var(--accent-warm)', fontWeight: '500' }}>
              ⚠️ 錯誤原因：被積函數是 <MathInline math="1/x^2 \ge 0" />，在一非零區間上的積分（面積）絕對不可能是負數！
            </span>
            <br /><br />
            <strong>【正確解法與觀念】</strong>
            <br />
            微積分基本定理 (FTC) 的前提是：<strong>被積函數 <MathInline math="f(x)" /> 在閉區間 <MathInline math="[a, b]" /> 上必須連續</strong>。
            但在本題中，被積函數 <MathInline math="f(x) = \frac{1}{x^2}" /> 在點 <MathInline math="x = 0" /> 處是不連續的（有無窮大間斷點），且該點包含在積分區間 <MathInline math="[-2, 2]" /> 內。
            <br /><br />
            因此，我們不能在此區間直接套用 FTC Part 2。這類積分稱為<strong>瑕積分 (Improper Integral)</strong>，我們必須將區間以不連續點 <MathInline math="0" /> 為界拆為兩部分，並用極限求解：
            <MathBlock math="\int_{-2}^2 \frac{1}{x^2} \, dx = \int_{-2}^0 \frac{1}{x^2} \, dx + \int_0^2 \frac{1}{x^2} \, dx" />
            我們計算右半邊的積分極限：
            <MathBlock math="\int_0^2 \frac{1}{x^2} \, dx = \lim_{s \to 0^+} \int_s^2 \frac{1}{x^2} \, dx = \lim_{s \to 0^+} \left[ -\frac{1}{x} \right]_s^2 = \lim_{s \to 0^+} \left( -\frac{1}{2} + \frac{1}{s} \right) = \infty" />
            由於此極限趨近於無窮大，代表該瑕積分為<strong>發散 (Divergent)</strong>，其值為 <MathInline math="\infty" />。
          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求變動上下限之積分求導：
            <MathBlock math="\frac{d}{dx} \int_{\sqrt{x}}^{x^2} \cos(t^2) \, dt" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：利用萊布尼茲法則，可求得 <MathInline math="2x \cos(x^4) - \frac{\cos(x)}{2\sqrt{x}}" />。）
            </span>
          </div>
        </ExerciseItem>
        
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 計算下列定積分之值：
            <MathBlock math="\int_1^2 \left( \frac{1}{x^2} - x^{-1/2} \right) \, dx" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：反導函數為 <MathInline math="-\frac{1}{x} - 2\sqrt{x}" />，代入上下限計算可得 <MathInline math="\frac{5}{2} - 2\sqrt{2}" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

import { useState } from 'react';
import { 
  Definition, 
  // Theorem, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

// 內部元件：反導函數族常數 C 曲線族視覺化模擬器
function AntiderivativeFamilyVisualizer() {
  const [funcType, setFuncType] = useState('poly');
  const [hoverX, setHoverX] = useState(1.0);

  const configs = {
    poly: {
      name: 'f(x) = 2x - 2',
      F_text: 'F(x) = x^2 - 2x + C',
      f: (x) => 2 * x - 2,
      F: (x, c) => x * x - 2 * x + c,
      xMin: -1,
      xMax: 3,
      yMin: -5,
      yMax: 7,
      defaultX: 1.0
    },
    trig: {
      name: 'f(x) = \\cos(x)',
      F_text: 'F(x) = \\sin(x) + C',
      f: (x) => Math.cos(x),
      F: (x, c) => Math.sin(x) + c,
      xMin: -3.14,
      xMax: 3.14,
      yMin: -4.5,
      yMax: 4.5,
      defaultX: 0.0
    },
    exp: {
      name: 'f(x) = e^{0.5x}',
      F_text: 'F(x) = 2e^{0.5x} + C',
      f: (x) => Math.exp(0.5 * x),
      F: (x, c) => 2 * Math.exp(0.5 * x) + c,
      xMin: -2.0,
      xMax: 2.5,
      yMin: -3.0,
      yMax: 11.0,
      defaultX: 0.5
    }
  };

  const cfg = configs[funcType];

  // 坐標轉換
  const toSvgX = (xVal) => 50 + ((xVal - cfg.xMin) / (cfg.xMax - cfg.xMin)) * 430;
  const toSvgY = (yVal) => 260 - ((yVal - cfg.yMin) / (cfg.yMax - cfg.yMin)) * 230;

  // 常數 C 選取
  const cValues = [3, 1.5, 0, -1.5, -3];
  const colors = [
    'hsl(35, 95%, 60%)',    // C = 3 (橘)
    'hsl(190, 90%, 50%)',   // C = 1.5 (藍青)
    'hsl(250, 85%, 65%)',   // C = 0 (紫)
    'hsl(320, 85%, 60%)',   // C = -1.5 (洋紅)
    'hsl(140, 80%, 50%)'    // C = -3 (綠)
  ];

  // 處理滑鼠在畫布上的移動，獲取 x 座標
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    // 將滑鼠像素寬度 [50, 480] 對照回實數 x 區間
    const xRatio = (mouseX - 50) / 430;
    if (xRatio >= 0 && xRatio <= 1) {
      const mathX = cfg.xMin + xRatio * (cfg.xMax - cfg.xMin);
      setHoverX(mathX);
    }
  };

  // 生成曲線的 SVG Path
  const buildCurvePath = (c) => {
    const points = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const xVal = cfg.xMin + (i / steps) * (cfg.xMax - cfg.xMin);
      points.push(`${toSvgX(xVal)},${toSvgY(cfg.F(xVal, c))}`);
    }
    return `M ${points.join(' L ')}`;
  };

  // 當前切線斜率（即導數）
  const currentSlope = cfg.f(hoverX);

  return (
    <div style={{ margin: '24px 0', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
      <h4 style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>📈</span> 互動實驗室：不定積分常數 C 曲線族與平行切線
      </h4>
      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.6' }}>
        選擇不同的被積函數，並在下方的圖表上<strong>移動您的滑鼠</strong>。
        圖中繪製了五條代表不同常數 <MathInline math="C" /> 的反導函數曲線。您會發現：在相同的自變數 <MathInline math="x" /> 處，這五條曲線對應的<strong>切線（虛線）是完美平行的</strong>。
        這直觀證明了：<strong>常數 C 僅僅是垂直平移，不改變函數在任何點處的切線斜率（導數）</strong>。
      </p>

      {/* 控制區 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '20px', padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-tertiary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}>選擇被積函數 f(x):</span>
          <select 
            value={funcType} 
            onChange={(e) => {
              const newType = e.target.value;
              setFuncType(newType);
              setHoverX(configs[newType].defaultX);
            }}
            style={{ 
              padding: '6px 12px', 
              borderRadius: 'var(--radius-sm)', 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-primary)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="poly">f(x) = 2x - 2 (多項式)</option>
            <option value="trig">f(x) = cos(x) (三角函數)</option>
            <option value="exp">f(x) = e^(0.5x) (指數函數)</option>
          </select>
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>對應不定積分：</span>
          <span style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>
            <MathInline key={funcType} math={`\\int f(x)\\,dx = ${cfg.F_text}`} />
          </span>
        </div>
      </div>

      {/* 圖表呈現區 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div style={{ 
          padding: '16px', 
          borderRadius: 'var(--radius-md)', 
          backgroundColor: 'var(--bg-secondary)', 
          border: '1px solid var(--border-color)',
          position: 'relative'
        }}>
          <svg 
            viewBox="0 0 520 300" 
            style={{ width: '100%', height: 'auto', overflow: 'visible', cursor: 'crosshair' }}
            onMouseMove={handleMouseMove}
          >
            {/* 1. 輔助軸線 */}
            {/* y = 0 軸線 */}
            {cfg.yMin <= 0 && cfg.yMax >= 0 && (
              <line 
                x1="45" 
                y1={toSvgY(0)} 
                x2="490" 
                y2={toSvgY(0)} 
                stroke="rgba(255,255,255,0.08)" 
                strokeWidth="1.2" 
              />
            )}
            {/* x = 0 軸線 */}
            {cfg.xMin <= 0 && cfg.xMax >= 0 && (
              <line 
                x1={toSvgX(0)} 
                y1="265" 
                x2={toSvgX(0)} 
                y2="25" 
                stroke="rgba(255,255,255,0.08)" 
                strokeWidth="1.2" 
              />
            )}

            {/* 2. 繪製五條 F(x) + C 曲線 */}
            {cValues.map((c, idx) => (
              <path 
                key={c}
                d={buildCurvePath(c)}
                fill="none"
                stroke={colors[idx]}
                strokeWidth="2.2"
                opacity="0.85"
              />
            ))}

            {/* 3. 繪製懸停互動指示線與切線 */}
            {/* 懸停垂直虛線 */}
            <line 
              x1={toSvgX(hoverX)} 
              y1="260" 
              x2={toSvgX(hoverX)} 
              y2="25" 
              stroke="var(--text-tertiary)" 
              strokeWidth="1" 
              strokeDasharray="2 3" 
            />

            {/* 繪製各點與其對應的切線 */}
            {cValues.map((c, idx) => {
              const ptY = cfg.F(hoverX, c);
              const svgPtX = toSvgX(hoverX);
              const svgPtY = toSvgY(ptY);

              // 切線跨度
              const deltaX = (cfg.xMax - cfg.xMin) * 0.1;
              const tX1 = hoverX - deltaX;
              const tX2 = hoverX + deltaX;
              const tY1 = ptY + currentSlope * (tX1 - hoverX);
              const tY2 = ptY + currentSlope * (tX2 - hoverX);

              return (
                <g key={`tangent-${c}`}>
                  {/* 切線 */}
                  <line 
                    x1={toSvgX(tX1)} 
                    y1={toSvgY(tY1)} 
                    x2={toSvgX(tX2)} 
                    y2={toSvgY(tY2)} 
                    stroke="var(--text-primary)" 
                    strokeWidth="1.5" 
                    strokeDasharray="3 2" 
                  />
                  {/* 交點 */}
                  <circle cx={svgPtX} cy={svgPtY} r="4" fill={colors[idx]} stroke="var(--bg-secondary)" strokeWidth="1.5" />
                </g>
              );
            })}

            {/* 4. 坐標邊框刻度與外框 */}
            <rect x="50" y="25" width="430" height="235" fill="none" stroke="var(--border-color)" strokeWidth="1.2" />

            {/* X 軸標籤 */}
            <text x="480" y="278" fill="var(--text-secondary)" fontSize="11" textAnchor="end">x</text>
            <text x={toSvgX(cfg.xMin)} y="274" fill="var(--text-tertiary)" fontSize="10" textAnchor="middle">{cfg.xMin.toFixed(1)}</text>
            <text x={toSvgX(cfg.xMax)} y="274" fill="var(--text-tertiary)" fontSize="10" textAnchor="middle">{cfg.xMax.toFixed(1)}</text>
            <text x={toSvgX((cfg.xMin + cfg.xMax)/2)} y="274" fill="var(--text-tertiary)" fontSize="10" textAnchor="middle">{((cfg.xMin + cfg.xMax)/2).toFixed(1)}</text>

            {/* Y 軸標籤 */}
            <text x="42" y="30" fill="var(--text-secondary)" fontSize="11" textAnchor="end">y</text>
            <text x="42" y={toSvgY(cfg.yMin) + 3} fill="var(--text-tertiary)" fontSize="10" textAnchor="end">{cfg.yMin.toFixed(1)}</text>
            <text x="42" y={toSvgY(cfg.yMax) + 3} fill="var(--text-tertiary)" fontSize="10" textAnchor="end">{cfg.yMax.toFixed(1)}</text>

            {/* 當前 hover 處的座標標示 */}
            <text x={toSvgX(hoverX)} y="20" fill="var(--text-primary)" fontSize="11" textAnchor="middle" fontWeight="500">
              x = {hoverX.toFixed(2)}
            </text>
          </svg>

          {/* 右上角色彩對照圖例 */}
          <div style={{ 
            position: 'absolute', 
            top: '24px', 
            right: '24px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '6px', 
            padding: '10px', 
            borderRadius: 'var(--radius-sm)', 
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid var(--border-color)',
            backdropFilter: 'blur(4px)'
          }}>
            {cValues.map((c, idx) => (
              <div key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                <span style={{ width: '12px', height: '12px', borderRadius: '2px', backgroundColor: colors[idx], display: 'inline-block' }}></span>
                <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace' }}>C = {c > 0 ? `+${c.toFixed(1)}` : c.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 即時斜率面板 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-tertiary)', marginTop: '12px', fontSize: '0.9rem' }}>
        <span style={{ color: 'var(--text-secondary)' }}>
          當前自變數位置：<strong style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>x = {hoverX.toFixed(4)}</strong>
        </span>
        <span style={{ color: 'var(--text-secondary)' }}>
          所有反導函數在該點的導數值（切線斜率）：<strong style={{ color: 'var(--accent-warm)', fontFamily: 'monospace' }}>F'(x) = f(x) = {currentSlope.toFixed(4)}</strong>
        </span>
      </div>
    </div>
  );
}

export default function Calculus_5_5() {
  return (
    <div>
      {/* 導言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在前幾節中，我們介紹了定積分的觀念，並藉由微積分基本定理第二部分 (FTC Part 2) 理解到：定積分可以用反導函數代值來計算。
        為了方便系統性地尋找反導函數，我們在此正式引進<strong>「不定積分」 (Indefinite Integral)</strong> 的記號與運算法則。
        這將為我們接下來求各類初等函數的積分，以及學習代換積分法、分部積分法等重要運算技巧奠定根基。
      </p>

      {/* 不定積分的定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、不定積分的數學定義 (Definition of Indefinite Integral)
      </h3>
      
      <Definition title="不定積分 (Indefinite Integral)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          我們使用記號 <MathInline math="\int f(x) \, dx" /> 來代表函數 <MathInline math="f" /> 的反導函數。此記號稱為 <MathInline math="f" /> 的<strong>不定積分</strong>。
          也就是說：
          <MathBlock math="F(x) = \int f(x) \, dx \iff F'(x) = f(x)" />
          因為任何函數若存在反導函數，其反導函數皆有無窮多個（彼此相差一常數 <MathInline math="C" />），因此當我們寫出不定積分時，必須加上<strong>積分常數 (Constant of Integration)</strong> <MathInline math="C" />：
          <MathBlock math="\int f(x) \, dx = F(x) + C" />
        </div>
      </Definition>

      {/* 經典初等函數的不定積分公式 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        經典初等函數的不定積分基本公式
      </h4>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        透過將微分公式逆向，我們可以得到一組最基礎的不定積分公式表：
        <ul style={{ paddingLeft: '20px', margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li><strong>常數與冪函數：</strong>
            <MathInline math="\int c \, dx = cx + C" />
            ，以及當 <MathInline math="n \ne -1" /> 時的冪函數積分：
            <MathBlock math="\int x^n \, dx = \frac{x^{n+1}}{n+1} + C" />
          </li>
          <li><strong>三角函數：</strong>
            <MathBlock math="\int \cos x \, dx = \sin x + C, \quad \int \sin x \, dx = -\cos x + C" />
            <MathBlock math="\int \sec^2 x \, dx = \tan x + C, \quad \int \sec x \tan x \, dx = \sec x + C" />
          </li>
          <li><strong>指數函數：</strong>
            <MathBlock math="\int e^x \, dx = e^x + C" />
          </li>
          <li><strong>反三角函數相關（常用於分數式）：</strong>
            <MathBlock math="\int \frac{1}{x^2 + 1} \, dx = \tan^{-1} x + C" />
          </li>
        </ul>
      </div>

      {/* 重要備註：定積分與不定積分的區別 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、定積分與不定積分的本質差異 (Remarks)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        雖然這兩個概念都使用拉長字型 S 的積分記號「<MathInline math="\\int" />」，但在數學本質上它們完全不同：
        <ul style={{ paddingLeft: '20px', margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li>
            <strong>1. 定積分 (Definite Integral)：</strong>
            <MathBlock math="\int_a^b f(t) \, dt" />
            定積分<strong>是一個確定的「數值」 (Number)</strong>，代表曲線在區間上圍成的代數面積。
            它與積分變數使用的字母符號無關（虛擬變數性質），即：
            <MathInline math="\int_a^b f(t) \, dt = \int_a^b f(x) \, dx" />。
          </li>
          <li>
            <strong>2. 不定積分 (Indefinite Integral)：</strong>
            <MathBlock math="\int f(x) \, dx" />
            不定積分<strong>是一個「函數的集合」 (Family of Functions)</strong>。
            自變數的字母會直接影響積分結果的自變數，因此它們不可隨意互換：
            <MathBlock math="\int f(x) \, dx \ne \int f(t) \, dt" />
            前者的結果是關於 <MathInline math="x" /> 的函數族，後者則是關於 <MathInline math="t" /> 的函數族。
          </li>
        </ul>
      </div>

      {/* 互動模擬器插入點 */}
      <AntiderivativeFamilyVisualizer />

      {/* 不定積分的運算性質（線性性質） */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        不定積分的線性性質 (Linearity)
      </h4>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        不定積分繼承了微分的線性性質。設 <MathInline math="c" /> 為任意常數：
      </p>
      <div style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <div>1. 提出常數：<MathInline math="\int c f(x) \, dx = c \int f(x) \, dx" /></div>
        <div>2. 加減法分配律：<MathInline math="\int [f(x) \pm g(x)] \, dx = \int f(x) \, dx \pm \int g(x) \, dx" /></div>
      </div>

      {/* 三、精選例題與詳細解答 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        三、精選例題與詳細解答 (Examples)
      </h3>

      {/* 例題 1 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: '600' }}>
        第一部分：不定積分基本運算
      </h4>

      <Example title="1：利用線性性質拆分求不定積分">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求不定積分：<MathInline math="\int (12x^3 - 3\sec^2 x) \, dx" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            利用加減拆分與常數提外的線性性質：
            <MathBlock math="\int (12x^3 - 3\sec^2 x) \, dx = 12 \int x^3 \, dx - 3 \int \sec^2 x \, dx" />
            套用基本積分公式：
            <MathBlock math="= 12 \cdot \left( \frac{1}{4}x^4 \right) - 3 \cdot (\tan x) + C" />
            <MathBlock math="= 3x^4 - 3\tan x + C" />
            <div style={{ padding: '8px 12px', margin: '8px 0', borderLeft: '3px solid var(--accent-secondary)', backgroundColor: 'var(--bg-tertiary)', fontSize: '0.9rem' }}>
              <strong>重要提示：</strong> 雖然我們分別對 <MathInline math="x^3" /> 與 <MathInline math="\sec^2 x" /> 進行了積分，每一項積分理論上都會產生各自的常數 <MathInline math="C_1" /> 與 <MathInline math="C_2" />，但因為常數相加減仍為常數，所以在寫出最終結果時，<strong>只需要在結尾統一寫一個 <MathInline math="C" /> 即可</strong>。
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：三角函數變形求不定積分">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求不定積分：<MathInline math="\int \frac{\sin x}{\cos^2 x} \, dx" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            被積函數看起來不是基本公式，但我們可以利用三角恆等式對分數進行拆解變形：
            <MathBlock math="\frac{\sin x}{\cos^2 x} = \frac{\sin x}{\cos x \cdot \cos x} = \frac{\sin x}{\cos x} \cdot \frac{1}{\cos x} = \tan x \cdot \sec x" />
            將此代回積分式：
            <MathBlock math="\int \frac{\sin x}{\cos^2 x} \, dx = \int \sec x \tan x \, dx" />
            對照基本公式，這正是正割函數 <MathInline math="\sec x" /> 的導數，故：
            <MathBlock math="= \sec x + C" />
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：包含反三角與冪函數的綜合不定積分">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求不定積分：<MathInline math="\int \left( 2x^3 - 6x + \frac{1}{x^2+1} \right) \, dx" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            利用線性性質將積分拆解為三項：
            <MathBlock math="\int \left( 2x^3 - 6x + \frac{1}{x^2+1} \right) \, dx = 2 \int x^3 \, dx - 6 \int x \, dx + \int \frac{1}{x^2+1} \, dx" />
            分別求每一項的積分：
            <ul style={{ paddingLeft: '20px', margin: '6px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><MathInline math="\int x^3 \, dx = \frac{1}{4}x^4" /></li>
              <li><MathInline math="\int x \, dx = \frac{1}{2}x^2" /></li>
              <li><MathInline math="\int \frac{1}{x^2+1} \, dx = \tan^{-1} x" /></li>
            </ul>
            代回並統一加上積分常數 <MathInline math="C" />：
            <MathBlock math="= 2 \cdot \left(\frac{1}{4}x^4\right) - 6 \cdot \left(\frac{1}{2}x^2\right) + \tan^{-1} x + C" />
            <MathBlock math="= \frac{1}{2}x^4 - 3x^2 + \tan^{-1} x + C" />
          </div>
        </Solution>
      </Example>

      {/* 第二部分：定積分代值計算 */}
      <h4 style={{ margin: '32px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: '600' }}>
        第二部分：結合 FTC Part 2 求解定積分
      </h4>

      {/* 例題 4 */}
      <Example title="4：基本定積分計算">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求定積分：<MathInline math="\int_0^2 (5x^4 - 2x) \, dx" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第一步：求反導函數】</strong>
            <br />
            我們先求出被積函數的不定積分（省略常數 <MathInline math="C" />）：
            <MathBlock math="F(x) = \int (5x^4 - 2x) \, dx = x^5 - x^2" />
            <strong>【第二步：套用 FTC Part 2 代入上下限】</strong>
            <br />
            將上限 2 與下限 0 代入：
            <MathBlock math="\int_0^2 (5x^4 - 2x) \, dx = \left[ x^5 - x^2 \right]_0^2" />
            <MathBlock math="= (2^5 - 2^2) - (0^5 - 0^2)" />
            <MathBlock math="= (32 - 4) - 0 = 28" />
          </div>
        </Solution>
      </Example>

      {/* 例題 5 */}
      <Example title="5：結合反三角函數的定積分">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求定積分：<MathInline math="\int_0^1 \left( 4x^3 - 6x + \frac{3}{x^2+1} \right) \, dx" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第一步：求反導函數】</strong>
            <br />
            被積函數的反導函數為：
            <MathBlock math="F(x) = x^4 - 3x^2 + 3\tan^{-1} x" />
            <strong>【第二步：代入上下限】</strong>
            <br />
            將上限 1 與下限 0 代入：
            <MathBlock math="\int_0^1 \left( 4x^3 - 6x + \frac{3}{x^2+1} \right) \, dx = \left[ x^4 - 3x^2 + 3\tan^{-1} x \right]_0^1" />
            <MathBlock math="= (1^4 - 3(1)^2 + 3\tan^{-1} 1) - (0^4 - 3(0)^2 + 3\tan^{-1} 0)" />
            由於我們知道常見反三角函數值：
            <MathBlock math="\tan^{-1} 1 = \frac{\pi}{4}, \quad \tan^{-1} 0 = 0" />
            代入化簡：
            <MathBlock math="= \left( 1 - 3 + 3 \cdot \frac{\pi}{4} \right) - 0" />
            <MathBlock math="= -2 + \frac{3}{4}\pi = \frac{3}{4}\pi - 2" />
          </div>
        </Solution>
      </Example>

      {/* 例題 6 */}
      <Example title="6：分數拆分與分數冪次定積分">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求定積分：<MathInline math="\int_1^9 \frac{2t^2 + t^2\sqrt{t} - 1}{t^2} \, dt" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第一步：代數整理，拆分被積函數】</strong>
            <br />
            被積函數的分母只有一項 <MathInline math="t^2" />，我們可以直接將分子各項除以分母來拆分：
            <MathBlock math="\frac{2t^2 + t^2\sqrt{t} - 1}{t^2} = \frac{2t^2}{t^2} + \frac{t^2 \cdot t^{1/2}}{t^2} - \frac{1}{t^2}" />
            <MathBlock math="= 2 + t^{1/2} - t^{-2}" />
            <strong>【第二步：求反導函數】</strong>
            <br />
            我們逐項套用冪函數積分公式求反導函數：
            <ul style={{ paddingLeft: '20px', margin: '6px 0', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <li><MathInline math="\int 2 \, dt = 2t" /></li>
              <li><MathInline math="\int t^{1/2} \, dt = \frac{t^{3/2}}{3/2} = \frac{2}{3}t^{3/2}" /></li>
              <li><MathInline math="\int -t^{-2} \, dt = -\frac{t^{-1}}{-1} = t^{-1} = \frac{1}{t}" /></li>
            </ul>
            故其反導函數為：
            <MathBlock math="F(t) = 2t + \frac{2}{3}t^{3/2} + \frac{1}{t}" />
            <strong>【第三步：代入上下限】</strong>
            <br />
            代入上限 9 與下限 1：
            <MathBlock math="\int_1^9 (2 + t^{1/2} - t^{-2}) \, dt = \left[ 2t + \frac{2}{3}t^{3/2} + \frac{1}{t} \right]_1^9" />
            <MathBlock math="= \left( 2(9) + \frac{2}{3}(9^{3/2}) + \frac{1}{9} \right) - \left( 2(1) + \frac{2}{3}(1^{3/2}) + \frac{1}{1} \right)" />
            計算數值。注意 <MathInline math="9^{3/2} = (\sqrt{9})^3 = 3^3 = 27" />：
            <MathBlock math="= \left( 18 + \frac{2}{3}(27) + \frac{1}{9} \right) - \left( 2 + \frac{2}{3} + 1 \right)" />
            <MathBlock math="= \left( 18 + 18 + \frac{1}{9} \right) - \left( 3 + \frac{2}{3} \right)" />
            <MathBlock math="= \left( 36 + \frac{1}{9} \right) - \left( 3 + \frac{6}{9} \right)" />
            <MathBlock math="= 33 - \frac{5}{9} = 32\frac{4}{9} \quad (\text{或 } \frac{292}{9})" />
          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 求解下列不定積分：
            <MathBlock math="\int \left( 3\sin x + 2e^x - 5\sec^2 x \right) \, dx" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：直接套用基本公式。答案為：<MathInline math="-3\cos x + 2e^x - 5\tan x + C" />。）
            </span>
          </div>
        </ExerciseItem>
        
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 計算下列定積分：
            <MathBlock math="\int_1^4 \frac{2x - \sqrt{x}}{x} \, dx" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：先拆分為 <MathInline math="\int_1^4 (2 - x^{-1/2}) \, dx" />。
              求得其反導函數為 <MathInline math="2x - 2\sqrt{x}" />。代入上下限計算：<MathInline math="(8 - 4) - (2 - 2) = 4" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

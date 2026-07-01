import { useState, useRef } from 'react';
import { Definition, Example, Solution, MathInline, MathBlock } from '../../../../components/MathBlocks';

function MiniInverseTrigGraph({ fn }) {
  const w = 180;
  const h = 130;
  
  let minX, maxX, minY, maxY;
  let points = []; // Array of branches (each branch is an array of {x, y})
  let asymptotes = [];
  let yTicks = [];
  let xTicks = [];

  const mx = (x) => ((x - minX) / (maxX - minX)) * w;
  const my = (y) => h - ((y - minY) / (maxY - minY)) * h;

  if (fn === 'arcsin') {
    minX = -1.5; maxX = 1.5;
    minY = -1.8; maxY = 1.8;
    let branch = [];
    for (let x = -1.0; x <= 1.0; x += 0.02) {
      branch.push({ x, y: Math.asin(x) });
    }
    points = [branch];
    xTicks = [-1, 1];
    yTicks = [
      { val: -Math.PI/2, label: '-π/2' },
      { val: Math.PI/2, label: 'π/2' }
    ];
  } else if (fn === 'arccos') {
    minX = -1.5; maxX = 1.5;
    minY = -0.5; maxY = 3.6;
    let branch = [];
    for (let x = -1.0; x <= 1.0; x += 0.02) {
      branch.push({ x, y: Math.acos(x) });
    }
    points = [branch];
    xTicks = [-1, 1];
    yTicks = [
      { val: Math.PI/2, label: 'π/2' },
      { val: Math.PI, label: 'π' }
    ];
  } else if (fn === 'arctan') {
    minX = -4.0; maxX = 4.0;
    minY = -1.8; maxY = 1.8;
    let branch = [];
    for (let x = -4.0; x <= 4.0; x += 0.1) {
      branch.push({ x, y: Math.atan(x) });
    }
    points = [branch];
    asymptotes = [-Math.PI/2, Math.PI/2];
    xTicks = [-3, 3];
    yTicks = [
      { val: -Math.PI/2, label: '-π/2' },
      { val: Math.PI/2, label: 'π/2' }
    ];
  } else if (fn === 'arccsc') {
    minX = -4.0; maxX = 4.0;
    minY = -1.8; maxY = 1.8;
    let leftBranch = [];
    let rightBranch = [];
    for (let x = -4.0; x <= -1.0; x += 0.05) {
      leftBranch.push({ x, y: Math.asin(1 / x) });
    }
    for (let x = 1.0; x <= 4.0; x += 0.05) {
      rightBranch.push({ x, y: Math.asin(1 / x) });
    }
    points = [leftBranch, rightBranch];
    xTicks = [-1, 1];
    yTicks = [
      { val: -Math.PI/2, label: '-π/2' },
      { val: Math.PI/2, label: 'π/2' }
    ];
  } else if (fn === 'arcsec') {
    minX = -4.0; maxX = 4.0;
    minY = -0.5; maxY = 3.6;
    let leftBranch = [];
    let rightBranch = [];
    for (let x = -4.0; x <= -1.0; x += 0.05) {
      leftBranch.push({ x, y: Math.acos(1 / x) });
    }
    for (let x = 1.0; x <= 4.0; x += 0.05) {
      rightBranch.push({ x, y: Math.acos(1 / x) });
    }
    points = [leftBranch, rightBranch];
    asymptotes = [Math.PI/2];
    xTicks = [-1, 1];
    yTicks = [
      { val: Math.PI/2, label: 'π/2' },
      { val: Math.PI, label: 'π' }
    ];
  } else if (fn === 'arccot') {
    minX = -4.0; maxX = 4.0;
    minY = -0.5; maxY = 3.6;
    let branch = [];
    for (let x = -4.0; x <= 4.0; x += 0.1) {
      branch.push({ x, y: Math.PI / 2 - Math.atan(x) });
    }
    points = [branch];
    asymptotes = [Math.PI];
    xTicks = [-3, 3];
    yTicks = [
      { val: Math.PI/2, label: 'π/2' },
      { val: Math.PI, label: 'π' }
    ];
  }

  let pathSegments = [];
  if (points.length > 0) {
    pathSegments = points.map(branch => {
      if (branch.length === 0) return '';
      return `M ${mx(branch[0].x)} ${my(branch[0].y)} ` + 
        branch.slice(1).map(p => `L ${mx(p.x)} ${my(p.y)}`).join(' ');
    });
  }

  const renderEndpoints = () => {
    if (fn === 'arcsin' || fn === 'arccos') {
      const branch = points[0];
      if (!branch || branch.length === 0) return null;
      return (
        <>
          <circle cx={mx(branch[0].x)} cy={my(branch[0].y)} r="3" fill="var(--accent-secondary)" />
          <circle cx={mx(branch[branch.length - 1].x)} cy={my(branch[branch.length - 1].y)} r="3" fill="var(--accent-secondary)" />
        </>
      );
    }
    if (fn === 'arccsc' || fn === 'arcsec') {
      const left = points[0];
      const right = points[1];
      if (!left || left.length === 0 || !right || right.length === 0) return null;
      return (
        <>
          <circle cx={mx(left[left.length - 1].x)} cy={my(left[left.length - 1].y)} r="3" fill="var(--accent-secondary)" />
          <circle cx={mx(right[0].x)} cy={my(right[0].y)} r="3" fill="var(--accent-secondary)" />
        </>
      );
    }
    return null;
  };

  return (
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
      {/* Axes */}
      <line x1="0" y1={my(0)} x2={w} y2={my(0)} stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.6" />
      <line x1={mx(0)} y1="0" x2={mx(0)} y2={h} stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.6" />

      {/* Asymptotes */}
      {asymptotes.map((yVal, idx) => (
        <line 
          key={idx}
          x1="0"
          y1={my(yVal)}
          x2={w}
          y2={my(yVal)}
          stroke="var(--accent-warm)"
          strokeWidth="1"
          strokeDasharray="3 3"
        />
      ))}

      {/* X Ticks */}
      {xTicks.map((xVal, idx) => (
        <g key={idx}>
          <line x1={mx(xVal)} y1={my(0) - 3} x2={mx(xVal)} y2={my(0) + 3} stroke="var(--text-tertiary)" />
          <text x={mx(xVal)} y={my(0) + 12} fill="var(--text-tertiary)" fontSize="9" textAnchor="middle" fontFamily="Lora">{xVal}</text>
        </g>
      ))}

      {/* Y Ticks */}
      {yTicks.map((tick, idx) => (
        <g key={idx}>
          <line x1={mx(0) - 3} y1={my(tick.val)} x2={mx(0) + 3} y2={my(tick.val)} stroke="var(--text-tertiary)" />
          <text x={mx(0) - 6} y={my(tick.val) + 3} fill="var(--text-tertiary)" fontSize="9" textAnchor="end" fontFamily="Lora">{tick.label}</text>
        </g>
      ))}

      {/* Curves */}
      {pathSegments.map((d, idx) => (
        <path 
          key={idx}
          d={d} 
          fill="none" 
          stroke="var(--accent-secondary)" 
          strokeWidth="2.2" 
          strokeLinecap="round"
          style={{ filter: 'drop-shadow(0px 0px 2px var(--accent-primary-glow))' }}
        />
      ))}

      {/* Endpoints */}
      {renderEndpoints()}
    </svg>
  );
}

function TrigGraphViewer() {
  const [activeFn, setActiveFn] = useState('sin');
  const [hoverData, setHoverData] = useState(null);
  const svgRef = useRef(null);

  const width = 600;
  const height = 300;
  
  const mapX = (val) => ((val - (-2.5 * Math.PI)) / (5 * Math.PI)) * width;
  const mapY = (val) => height - ((val - (-2.5)) / 5) * height;

  const getPaths = (fn, step = 0.02) => {
    const paths = [];
    let currentPath = '';
    let lastY = null;

    for (let x = -2.5 * Math.PI; x <= 2.5 * Math.PI; x += step) {
      let y;
      if (fn === 'sin') y = Math.sin(x);
      else if (fn === 'cos') y = Math.cos(x);
      else if (fn === 'tan') y = Math.tan(x);
      else if (fn === 'csc') y = 1 / Math.sin(x);
      else if (fn === 'sec') y = 1 / Math.cos(x);
      else if (fn === 'cot') y = 1 / Math.tan(x);
      
      if (isNaN(y) || !isFinite(y) || Math.abs(y) > 4.5) {
        if (currentPath) {
          paths.push(currentPath);
          currentPath = '';
        }
        lastY = null;
        continue;
      }
      
      if (lastY !== null && Math.abs(y - lastY) > 3) {
        if (currentPath) {
          paths.push(currentPath);
          currentPath = '';
        }
      }
      
      const px = mapX(x);
      const py = mapY(y);
      
      if (!currentPath) {
        currentPath = `M ${px} ${py}`;
      } else {
        currentPath += ` L ${px} ${py}`;
      }
      lastY = y;
    }
    
    if (currentPath) {
      paths.push(currentPath);
    }
    return paths;
  };

  const getAsymptotes = (fn) => {
    if (fn === 'tan' || fn === 'sec') {
      return [-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map(v => v * Math.PI);
    }
    if (fn === 'csc' || fn === 'cot') {
      return [-2, -1, 0, 1, 2].map(v => v * Math.PI);
    }
    return [];
  };

  const handleMouseMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const pct = mouseX / rect.width;
    
    if (pct < 0 || pct > 1) {
      setHoverData(null);
      return;
    }
    
    const mathX = -2.5 * Math.PI + pct * (5 * Math.PI);
    
    let mathY;
    if (activeFn === 'sin') mathY = Math.sin(mathX);
    else if (activeFn === 'cos') mathY = Math.cos(mathX);
    else if (activeFn === 'tan') mathY = Math.tan(mathX);
    else if (activeFn === 'csc') mathY = 1 / Math.sin(mathX);
    else if (activeFn === 'sec') mathY = 1 / Math.cos(mathX);
    else if (activeFn === 'cot') mathY = 1 / Math.tan(mathX);
    
    if (isFinite(mathY) && Math.abs(mathY) <= 4.5) {
      setHoverData({
        x: mathX,
        y: mathY,
        px: mouseX,
        py: mapY(mathY)
      });
    } else {
      setHoverData(null);
    }
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  const getInfo = (fn) => {
    switch (fn) {
      case 'sin':
        return {
          title: '正弦函數 y = sin(x)',
          domain: '全體實數 R',
          range: '[-1, 1]',
          period: '2π',
          symmetry: '奇函數 (關於原點對稱)'
        };
      case 'cos':
        return {
          title: '餘弦函數 y = cos(x)',
          domain: '全體實數 R',
          range: '[-1, 1]',
          period: '2π',
          symmetry: '偶函數 (關於 y 軸對稱)'
        };
      case 'tan':
        return {
          title: '正切函數 y = tan(x)',
          domain: 'x ≠ π/2 + kπ, k ∈ Z',
          range: '全體實數 R',
          period: 'π',
          symmetry: '奇函數 (關於原點對稱)'
        };
      case 'csc':
        return {
          title: '餘割函數 y = csc(x)',
          domain: 'x ≠ kπ, k ∈ Z',
          range: '(-∞, -1] ∪ [1, ∞)',
          period: '2π',
          symmetry: '奇函數 (關於原點對稱)'
        };
      case 'sec':
        return {
          title: '正割函數 y = sec(x)',
          domain: 'x ≠ π/2 + kπ, k ∈ Z',
          range: '(-∞, -1] ∪ [1, ∞)',
          period: '2π',
          symmetry: '偶函數 (關於 y 軸對稱)'
        };
      case 'cot':
        return {
          title: '餘切函數 y = cot(x)',
          domain: 'x ≠ kπ, k ∈ Z',
          range: '全體實數 R',
          period: 'π',
          symmetry: '奇函數 (關於原點對稱)'
        };
      default:
        return {};
    }
  };

  const info = getInfo(activeFn);
  const paths = getPaths(activeFn);
  const asymptotes = getAsymptotes(activeFn);

  return (
    <div style={{
      margin: '24px 0',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      backgroundColor: 'var(--bg-secondary)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden'
    }}>
      {/* 標題 */}
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
        六個基本三角函數圖形 (Interactive Graphs)
      </div>

      <div style={{ padding: '20px' }}>
        {/* 切換按鈕 */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {['sin', 'cos', 'tan', 'csc', 'sec', 'cot'].map((fn) => (
            <button
              key={fn}
              onClick={() => {
                setActiveFn(fn);
                setHoverData(null);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                border: activeFn === fn ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                backgroundColor: activeFn === fn ? 'var(--accent-primary-glow)' : 'var(--bg-primary)',
                color: activeFn === fn ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: activeFn === fn ? '600' : '400',
                cursor: 'pointer',
                fontFamily: 'Lora, serif',
                fontSize: '0.9rem',
                transition: 'var(--transition)'
              }}
            >
              {fn}(x)
            </button>
          ))}
        </div>

        {/* 互動式圖形繪製區 */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto' }}>
          <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'crosshair',
              overflow: 'hidden'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* 1. 輔助網格線 */}
            {/* 水平線 */}
            {[-2, -1, 1, 2].map(yVal => (
              <line
                key={`grid-y-${yVal}`}
                x1="0"
                y1={mapY(yVal)}
                x2={width}
                y2={mapY(yVal)}
                stroke="var(--border-color)"
                strokeDasharray="2 4"
                strokeWidth="1"
              />
            ))}
            {/* 垂直線 */}
            {[-2, -1, -0.5, 0.5, 1, 2].map(xMultiplier => (
              <line
                key={`grid-x-${xMultiplier}`}
                x1={mapX(xMultiplier * Math.PI)}
                y1="0"
                x2={mapX(xMultiplier * Math.PI)}
                y2={height}
                stroke="var(--border-color)"
                strokeDasharray="2 4"
                strokeWidth="1"
              />
            ))}

            {/* 2. 主座標軸 */}
            {/* X 軸 */}
            <line x1="0" y1={mapY(0)} x2={width} y2={mapY(0)} stroke="var(--text-tertiary)" strokeWidth="1.5" />
            {/* Y 軸 */}
            <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={height} stroke="var(--text-tertiary)" strokeWidth="1.5" />

            {/* 3. 漸近線 (Asymptotes) */}
            {asymptotes.map((xVal, idx) => (
              <line
                key={`asymp-${idx}`}
                x1={mapX(xVal)}
                y1="0"
                x2={mapX(xVal)}
                y2={height}
                stroke="var(--accent-warm)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.8"
              />
            ))}

            {/* 4. 函數曲線繪製 */}
            {paths.map((d, idx) => (
              <path
                key={`curve-${idx}`}
                d={d}
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0px 0px 3px var(--accent-primary-glow))' }}
              />
            ))}

            {/* 5. 座標標籤 */}
            {/* Y 軸標籤 */}
            {[-1, 1].map(yVal => (
              <text
                key={`label-y-${yVal}`}
                x={mapX(0) + 8}
                y={mapY(yVal) + 4}
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="Lora"
              >
                {yVal}
              </text>
            ))}
            {/* X 軸標籤 */}
            {[
              { val: -2 * Math.PI, text: '-2π' },
              { val: -Math.PI, text: '-π' },
              { val: Math.PI, text: 'π' },
              { val: 2 * Math.PI, text: '2π' }
            ].map((lbl, idx) => (
              <text
                key={`label-x-${idx}`}
                x={mapX(lbl.val)}
                y={mapY(0) + 16}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="Lora"
              >
                {lbl.text}
              </text>
            ))}

            {/* 6. 滑鼠懸停互動指示線與圓點 */}
            {hoverData && (
              <>
                {/* 垂直指示線 */}
                <line
                  x1={hoverData.px}
                  y1="0"
                  x2={hoverData.px}
                  y2={height}
                  stroke="var(--text-tertiary)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />
                {/* 水平指示線 */}
                <line
                  x1="0"
                  y1={hoverData.py}
                  x2={width}
                  y2={hoverData.py}
                  stroke="var(--text-tertiary)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                />
                {/* 點 */}
                <circle
                  cx={hoverData.px}
                  cy={hoverData.py}
                  r="6"
                  fill="var(--accent-primary)"
                  stroke="var(--bg-primary)"
                  strokeWidth="2"
                  style={{ filter: 'drop-shadow(0px 0px 4px var(--accent-primary))' }}
                />
              </>
            )}
          </svg>

          {/* 7. Hover 數值工具提示 */}
          {hoverData && (
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              backgroundColor: 'var(--glass-bg)',
              backdropFilter: 'blur(4px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              padding: '6px 12px',
              fontSize: '0.8rem',
              color: 'var(--text-primary)',
              pointerEvents: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              boxShadow: 'var(--shadow-sm)',
              fontFamily: 'Lora, Fira Code, monospace'
            }}>
              <div>x = {(hoverData.x / Math.PI).toFixed(2)}π ({((hoverData.x * 180) / Math.PI).toFixed(0)}°)</div>
              <div style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>y = {hoverData.y.toFixed(3)}</div>
            </div>
          )}
        </div>

        {/* 函數基本屬性表格 */}
        <div style={{
          marginTop: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          fontSize: '0.85rem',
          color: 'var(--text-secondary)'
        }}>
          <div>
            <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>目前選取</span>
            <strong style={{ color: 'var(--text-primary)' }}>{info.title}</strong>
          </div>
          <div>
            <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>定義域</span>
            <span style={{ fontFamily: 'Lora' }}>{info.domain}</span>
          </div>
          <div>
            <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>值域</span>
            <span style={{ fontFamily: 'Lora' }}>{info.range}</span>
          </div>
          <div>
            <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>週期</span>
            <span style={{ fontFamily: 'Lora' }}>{info.period}</span>
          </div>
          <div>
            <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.75rem' }}>奇偶對稱性</span>
            <span>{info.symmetry}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Ch1_1_4() {
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
        1.4 三角函數與反三角函數 (Trigonometric & Inverse Trigonometric Functions)
      </h2>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在微積分中，<strong>三角函數</strong>與其<strong>反三角函數</strong>被廣泛用於描述週期性現象、進行幾何測量以及簡化複雜的積分計算。必須注意的是，在微積分中，<strong>角的大小一律使用「弧度制 (Radians)」而非度數制 (Degrees)</strong>，因為弧度制能使三角函數的極限與導數公式最為簡潔。
      </p>

      {/* 一、基本三角函數及其性質 */}
      <Definition title="基本三角函數 (Trigonometric Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          常用的六個基本三角函數其定義域與值域如下表：
        </p>
        
        <div style={{ overflowX: 'auto', margin: '12px 0' }}>
          <table style={{ width: '100%', minWidth: '550px', borderCollapse: 'collapse', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border-color)', color: 'var(--text-primary)' }}>
                <th style={{ padding: '10px', textAlign: 'left', whiteSpace: 'nowrap' }}>函數記號</th>
                <th style={{ padding: '10px', textAlign: 'left', whiteSpace: 'nowrap' }}>名稱</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>定義域 (Domain)</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>值域 (Range)</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontFamily: 'Lora', whiteSpace: 'nowrap' }}><MathInline math="\sin x" /></td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>正弦函數</td>
                <td style={{ padding: '10px' }}><MathInline math="\mathbb{R}" /></td>
                <td style={{ padding: '10px' }}><MathInline math="[-1, 1]" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontFamily: 'Lora', whiteSpace: 'nowrap' }}><MathInline math="\cos x" /></td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>餘弦函數</td>
                <td style={{ padding: '10px' }}><MathInline math="\mathbb{R}" /></td>
                <td style={{ padding: '10px' }}><MathInline math="[-1, 1]" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontFamily: 'Lora', whiteSpace: 'nowrap' }}><MathInline math="\tan x" /></td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>正切函數</td>
                <td style={{ padding: '10px' }}><MathInline math="\{x \mid x \neq \frac{\pi}{2} + k\pi, k \in \mathbb{Z}\}" /></td>
                <td style={{ padding: '10px' }}><MathInline math="\mathbb{R}" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontFamily: 'Lora', whiteSpace: 'nowrap' }}><MathInline math="\csc x" /></td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>餘割函數</td>
                <td style={{ padding: '10px' }}><MathInline math="\{x \mid x \neq k\pi, k \in \mathbb{Z}\}" /></td>
                <td style={{ padding: '10px' }}><MathInline math="(-\infty, -1] \cup [1, \infty)" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontFamily: 'Lora', whiteSpace: 'nowrap' }}><MathInline math="\sec x" /></td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>正割函數</td>
                <td style={{ padding: '10px' }}><MathInline math="\{x \mid x \neq \frac{\pi}{2} + k\pi, k \in \mathbb{Z}\}" /></td>
                <td style={{ padding: '10px' }}><MathInline math="(-\infty, -1] \cup [1, \infty)" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '10px', fontFamily: 'Lora', whiteSpace: 'nowrap' }}><MathInline math="\cot x" /></td>
                <td style={{ padding: '10px', whiteSpace: 'nowrap' }}>餘切函數</td>
                <td style={{ padding: '10px' }}><MathInline math="\{x \mid x \neq k\pi, k \in \mathbb{Z}\}" /></td>
                <td style={{ padding: '10px' }}><MathInline math="\mathbb{R}" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          常用三角恆等式 (Key Identities)：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li><strong>平方關係：</strong><MathInline math="\sin^2 x + \cos^2 x = 1" />、<MathInline math="1 + \tan^2 x = \sec^2 x" />、<MathInline math="1 + \cot^2 x = \csc^2 x" /></li>
          <li><strong>和差角公式：</strong>
            <br />
            - <MathInline math="\sin(x \pm y) = \sin x\cos y \pm \cos x\sin y" />
            <br />
            - <MathInline math="\cos(x \pm y) = \cos x\cos y \mp \sin x\sin y" />
            <br />
            - <MathInline math="\tan(x \pm y) = \frac{\tan x \pm \tan y}{1 \mp \tan x\tan y}" />
          </li>
          <li><strong>二倍角公式：</strong>
            <br />
            - <MathInline math="\sin(2x) = 2\sin x\cos x" />
            <br />
            - <MathInline math="\cos(2x) = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x" />
          </li>
        </ul>
      </Definition>

      {/* 互動式函數圖形繪製 */}
      <TrigGraphViewer />

      {/* 二、反三角函數的定義與定義域限制 */}
      <Definition title="反三角函數 (Inverse Trigonometric Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          因為三角函數是週期函數，在整個實數域上並非一對一函數。為了定義其反函數，我們必須將原函數的定義域限制在特定的<strong>單調區間</strong>內：
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '12px' }}>
          
          {/* 1. 反正弦 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                1. 反正弦函數 (<MathInline math="\sin^{-1} x" /> 或 <MathInline math="\arcsin x" />)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
                限制原函數 <MathInline math="\sin x" /> 的定義域為 <MathInline math="[-\frac{\pi}{2}, \frac{\pi}{2}]" />，其對應值域為 <MathInline math="[-1, 1]" />。
                <br />
                反函數定義：
                <MathBlock math="\sin^{-1} x = y \iff \sin y = x \quad \text{且 } y \in [-\frac{\pi}{2}, \frac{\pi}{2}]" />
                此時反函數的<strong>定義域為 <MathInline math="[-1, 1]" /></strong>，<strong>值域為 <MathInline math="[-\frac{\pi}{2}, \frac{\pi}{2}]" /></strong>。
              </span>
            </div>
            <div style={{ flexShrink: 0, padding: '10px' }}>
              <MiniInverseTrigGraph fn="arcsin" />
            </div>
          </div>

          {/* 2. 反餘弦 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                2. 反餘弦函數 (<MathInline math="\cos^{-1} x" /> 或 <MathInline math="\arccos x" />)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
                限制原函數 <MathInline math="\cos x" /> 的定義域為 <MathInline math="[0, \pi]" />，其對應值域為 <MathInline math="[-1, 1]" />。
                <br />
                反函數定義：
                <MathBlock math="\cos^{-1} x = y \iff \cos y = x \quad \text{且 } y \in [0, \pi]" />
                此時反函數的<strong>定義域為 <MathInline math="[-1, 1]" /></strong>，<strong>值域為 <MathInline math="[0, \pi]" /></strong>。
              </span>
            </div>
            <div style={{ flexShrink: 0, padding: '10px' }}>
              <MiniInverseTrigGraph fn="arccos" />
            </div>
          </div>

          {/* 3. 反正切 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                3. 反正切函數 (<MathInline math="\tan^{-1} x" /> 或 <MathInline math="\arctan x" />)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
                限制原函數 <MathInline math="\tan x" /> 的定義域為 <MathInline math="(-\frac{\pi}{2}, \frac{\pi}{2})" />，其值域為 <MathInline math="\mathbb{R}" />。
                <br />
                反函數定義：
                <MathBlock math="\tan^{-1} x = y \iff \tan y = x \quad \text{且 } y \in (-\frac{\pi}{2}, \frac{\pi}{2})" />
                此時反函數的<strong>定義域為 <MathInline math="\mathbb{R}" /></strong>，<strong>值域為 <MathInline math="(-\frac{\pi}{2}, \frac{\pi}{2})" /></strong>。
                <br />
                <em>特性：反正切函數在平面上有兩條水平漸近線 <MathInline math="y = \frac{\pi}{2}" /> (當 <MathInline math="x \to \infty" />) 與 <MathInline math="y = -\frac{\pi}{2}" /> (當 <MathInline math="x \to -\infty" />)。</em>
              </span>
            </div>
            <div style={{ flexShrink: 0, padding: '10px' }}>
              <MiniInverseTrigGraph fn="arctan" />
            </div>
          </div>

          {/* 6. 反餘切 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                6. 反餘切函數 (<MathInline math="\cot^{-1} x" /> 或 <MathInline math="\text{arccot } x" />)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
                限制原函數 <MathInline math="\cot x" /> 的定義域為 <MathInline math="(0, \pi)" />，其值域為 <MathInline math="\mathbb{R}" />。
                <br />
                反函數定義：
                <MathBlock math="\cot^{-1} x = y \iff \cot y = x \quad \text{且 } y \in (0, \pi)" />
                此時反函數的<strong>定義域為 <MathInline math="\mathbb{R}" /></strong>，<strong>值域為 <MathInline math="(0, \pi)" /></strong>。
              </span>
            </div>
            <div style={{ flexShrink: 0, padding: '10px' }}>
              <MiniInverseTrigGraph fn="arccot" />
            </div>
          </div>

          {/* 5. 反正割 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                5. 反正割函數 (<MathInline math="\sec^{-1} x" /> 或 <MathInline math="\text{arcsec } x" />)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
                限制原函數 <MathInline math="\sec x" /> 的定義域為 <MathInline math="[0, \frac{\pi}{2}) \cup (\frac{\pi}{2}, \pi]" />，其對應值域為 <MathInline math="(-\infty, -1] \cup [1, \infty)" />。
                <br />
                反函數定義：
                <MathBlock math="\sec^{-1} x = y \iff \sec y = x \quad \text{且 } y \in [0, \pi], y \neq \frac{\pi}{2}" />
                此時反函數的<strong>定義域為 <MathInline math="(-\infty, -1] \cup [1, \infty)" /></strong>，<strong>值域為 <MathInline math="[0, \frac{\pi}{2}) \cup (\frac{\pi}{2}, \pi]" /></strong>。
              </span>
            </div>
            <div style={{ flexShrink: 0, padding: '10px' }}>
              <MiniInverseTrigGraph fn="arcsec" />
            </div>
          </div>

          {/* 4. 反餘割 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                4. 反餘割函數 (<MathInline math="\csc^{-1} x" /> 或 <MathInline math="\text{arccsc } x" />)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
                限制原函數 <MathInline math="\csc x" /> 的定義域為 <MathInline math="[-\frac{\pi}{2}, 0) \cup (0, \frac{\pi}{2}]" />，其對應值域為 <MathInline math="(-\infty, -1] \cup [1, \infty)" />。
                <br />
                反函數定義：
                <MathBlock math="\csc^{-1} x = y \iff \csc y = x \quad \text{且 } y \in [-\frac{\pi}{2}, \frac{\pi}{2}], y \neq 0" />
                此時反函數的<strong>定義域為 <MathInline math="(-\infty, -1] \cup [1, \infty)" /></strong>，<strong>值域為 <MathInline math="[-\frac{\pi}{2}, 0) \cup (0, \frac{\pi}{2}]" /></strong>。
              </span>
            </div>
            <div style={{ flexShrink: 0, padding: '10px' }}>
              <MiniInverseTrigGraph fn="arccsc" />
            </div>
          </div>
        </div>
      </Definition>

      {/* 三、反三角函數的消除關係 */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          消除性質與限制 (Cancellation Properties & Constraints)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            由於反函數是在<strong>限制定義域</strong>下定義的，當我們套用消除性質時，必須特別注意自變數所在的範圍：
          </p>
          <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary)' }}>
            <div>
              - <MathInline math="\sin^{-1}(\sin x) = x" /> 僅在 <MathInline math="x \in [-\frac{\pi}{2}, \frac{\pi}{2}]" /> 時成立。
              <br />
              <em>例如：<MathInline math="\sin^{-1}(\sin \frac{5\pi}{6}) = \sin^{-1}(\frac{1}{2}) = \frac{\pi}{6}" />（而非 <MathInline math="\frac{5\pi}{6}" />）。</em>
            </div>
            <div>
              - <MathInline math="\sin(\sin^{-1} x) = x" /> 只要 <MathInline math="x \in [-1, 1]" /> 便恆成立。
            </div>
          </div>
        </div>
      </div>

      {/* 典型例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        觀念探討與典型例題
      </h3>

      {/* 例題 1 */}
      <Example title="求反三角函數的精確值">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試求下列反三角函數的精確弧度值：
          <br />
          (1) <MathInline math="\sin^{-1}\left(-\frac{1}{2}\right)" />
          <br />
          (2) <MathInline math="\cos^{-1}\left(-\frac{\sqrt{2}}{2}\right)" />
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (1) 求反正弦值：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            設 <MathInline math="\sin^{-1}\left(-\frac{1}{2}\right) = \theta" />，這等價於：
          </p>
          <MathBlock math="\sin \theta = -\frac{1}{2} \quad \text{且 } \theta \in \left[-\frac{\pi}{2}, \frac{\pi}{2}\right]" />
          <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            在區間 <MathInline math="[-\frac{\pi}{2}, \frac{\pi}{2}]" /> 中，正弦值為 <MathInline math="-\frac{1}{2}" /> 的角為：
            <br />
            <strong><MathInline math="\theta = -\frac{\pi}{6}" /></strong>。
          </p>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (2) 求反餘弦值：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            設 <MathInline math="\cos^{-1}\left(-\frac{\sqrt{2}}{2}\right) = \phi" />，這等價於：
          </p>
          <MathBlock math="\cos \phi = -\frac{\sqrt{2}}{2} \quad \text{且 } \phi \in [0, \pi]" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            在區間 <MathInline math="[0, \pi]" /> （第一與第二象限）中，餘弦值為負代表該角位於第二象限。
            <br />
            滿足條件的角為：
            <br />
            <strong><MathInline math="\phi = \frac{3\pi}{4}" /></strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="化簡含有反三角函數的代數式">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試將三角代數式 <MathInline math="\cos(\tan^{-1} x)" /> 化簡為不含三角函數的純代數式（常出現在三角代換法積分中）。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            令 <MathInline math="\theta = \tan^{-1} x" />，這代表：
          </p>
          <MathBlock math="\tan \theta = x = \frac{x}{1} \quad \text{且 } \theta \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            我們可以構造一個直角三角形，其中角 <MathInline math="\theta" /> 的對邊為 <MathInline math="x" />，鄰邊為 <MathInline math="1" />。
            <br />
            根據畢氏定理，斜邊的長度為：
          </p>
          <MathBlock math="c = \sqrt{x^2 + 1^2} = \sqrt{x^2 + 1}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            現在，我們要計算原式 <MathInline math="\cos(\tan^{-1} x) = \cos \theta" />：
          </p>
          <MathBlock math="\cos \theta = \frac{1}{\sqrt{x^2 + 1}}" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            由於 <MathInline math="\theta \in (-\frac{\pi}{2}, \frac{\pi}{2})" />，此角度位於第一或第四象限，其餘弦值 <MathInline math="\cos \theta" /> 恆為正值。
            <br />
            開拓化簡結果為：
            <br />
            <strong><MathInline math="\cos(\tan^{-1} x) = \frac{1}{\sqrt{x^2 + 1}}" /></strong>。
          </p>
        </Solution>
      </Example>
    </div>
  );
}
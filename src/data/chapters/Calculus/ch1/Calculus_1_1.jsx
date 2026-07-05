import { Definition, MathInline, MathBlock } from '../../../../components/MathBlocks';

export default function Ch1_1_1() {
  return (
    <div>
      {/* 標題與引言 */}

      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在探討微積分之前，我們必須先釐清「函數」這個核心工具。它不僅僅是一個公式，更是一個描述「輸入點」與「輸出點」之間唯一性關係的結構。
      </p>

      {/* 函數的現代定義卡片 */}
      <Definition title="函數的現代定義 (Modern Definition)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          函數將一個給定定義域中的每一個元素，恰好對應到另一個對應域中的唯一一個元素。
        </p>
        <p style={{ fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>
          數學記號：
        </p>
        <MathBlock math="f : A \to B" />
        
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              定義域 (Domain)
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              所有可能輸入值 <MathInline math="x" /> 的集合。
            </span>
          </div>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              對應域 (Codomain)
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              可能的輸出值所在的目標集合。
            </span>
          </div>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              值域 (Range)
            </span>
            <span style={{ color: 'var(--text-secondary)' }}>
              實際輸出值 <MathInline math="f(x)" /> 的集合。
            </span>
          </div>
        </div>
      </Definition>

      {/* 函數的詳細分類卡片 */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          函數的詳細分類 (Classification of Functions)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
            函數可以根據其不同的數學性質進行多樣化的分類。掌握這些分類有助於我們在微積分中快速判斷函數的行為與特徵：
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* 1. 奇偶性 */}
            <div>
              <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>
                1. 奇偶性 (Symmetry / Parity)
              </span>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>
                  <strong>偶函數 (Even Function)：</strong>滿足 <MathInline math="f(-x) = f(x)" />，圖形關於 <MathInline math="y" /> 軸對稱。例如：<MathInline math="x^2, \cos x" />。
                </li>
                <li>
                  <strong>奇函數 (Odd Function)：</strong>滿足 <MathInline math="f(-x) = -f(x)" />，圖形關於原點對稱。例如：<MathInline math="x^3, \sin x" />。
                </li>
              </ul>
            </div>

            {/* 2. 連續性 */}
            <div>
              <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>
                2. 連續性與不連續性 (Continuity)
              </span>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>
                  <strong>連續函數 (Continuous Function)：</strong>在定義域內每一點皆滿足極限值等於函數值（即 <MathInline math="\lim_{x \to c} f(x) = f(c)" />），圖形上無斷點。
                </li>
                <li>
                  <strong>不連續函數 (Discontinuous Function)：</strong>在定義域中的某些點（斷點）極限值不存在或不等於函數值。
                </li>
              </ul>
            </div>

            {/* 3. 單調性 */}
            <div>
              <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>
                3. 單調性 (Monotonicity)
              </span>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>
                  <strong>單調遞增 (Increasing)：</strong>若對任意 <MathInline math="x_1 < x_2" />，皆滿足 <MathInline math="f(x_1) \le f(x_2)" />（若滿足 <MathInline math="f(x_1) < f(x_2)" /> 則稱為嚴格單調遞增）。
                </li>
                <li>
                  <strong>單調遞減 (Decreasing)：</strong>若對任意 <MathInline math="x_1 < x_2" />，皆滿足 <MathInline math="f(x_1) \ge f(x_2)" />（若滿足 <MathInline math="f(x_1) > f(x_2)" /> 則稱為嚴格單調遞減）。
                </li>
              </ul>
            </div>

            {/* 4. 數域與值域類型 */}
            <div>
              <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>
                4. 數域與值域類型 (Real vs. Complex & Scalar vs. Vector)
              </span>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <strong>實函數 (Real Function) vs. 複函數 (Complex Function)：</strong>
                  <br />
                  - 實函數自變數與應變數皆為實數（如 <MathInline math="f: \mathbb{R} \to \mathbb{R}" />）。
                  <br />
                  - 複函數的自變數或應變數中包含複數（如 <MathInline math="f: \mathbb{C} \to \mathbb{C}" />）。
                </li>
                <li>
                  <strong>純量函數 (Scalar Function) vs. 向量函數 (Vector Function)：</strong>
                  <br />
                  - 純量函數的輸出值為單一數值（純量）。
                  <br />
                  - 向量函數的輸出值為一個多維向量（如 <MathInline math="f: \mathbb{R} \to \mathbb{R}^n" />）。
                </li>
              </ul>
            </div>

            {/* 5. 代數 vs. 超越 */}
            <div>
              <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '6px', fontSize: '1rem' }}>
                5. 代數 vs. 超越 (Algebraic vs. Transcendental)
              </span>
              <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li>
                  <strong>代數函數 (Algebraic Function)：</strong>可由自變數與常數經過有限次代數運算（加、減、乘、除、乘方、開方）所表示的函數。例如：多項式函數、有理函數。
                </li>
                <li>
                  <strong>超越函數 (Transcendental Function)：</strong>無法用有限次代數運算表示的函數。例如：指數函數、對數函數、三角函數、反三角函數、雙曲函數與反雙曲函數。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 如何判斷為單變數函數卡片 */}
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
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          如何判斷為單變數函數 (How to Identify a Single-Variable Function)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            單變數函數（Single-variable function）是指<strong>自變數（輸入變數）僅有一個</strong>的函數。在實際應用或幾何圖形中，我們可透過以下方式進行判斷：
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                1. 自變數個數檢驗 (Number of Independent Variables)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block' }}>
                觀察函數關係式中獨立變化的輸入變數數量。例如 <MathInline math="f(x) = 3x^2 + 5" /> 僅有唯一的自變數 <MathInline math="x" />，故為單變數函數；而 <MathInline math="f(x, y) = x^2 + y^2" /> 有兩個獨立的自變數，則屬於多變數函數。
              </span>
            </div>

            <div>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                2. 幾何特徵檢驗 (Geometric Representation)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block' }}>
                單變數實函數 <MathInline math="y = f(x)" /> 在二維直角坐標系（平面）中的幾何軌跡是一條<strong>曲線 (Curve)</strong>，而多變數函數（如雙變數函數 <MathInline math="z = f(x, y)" />）在三維空間中對應的則是一個<strong>曲面 (Surface)</strong>。
              </span>
            </div>

            <div>
              <span style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                3. 鉛直線檢驗法 (Vertical Line Test)
              </span>
              <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block' }}>
                若想判斷平面上的二維幾何圖形是否能表示為單變數函數 <MathInline math="y = f(x)" /> 的圖形：
                <br />
                在定義域內任取一條平行於 <MathInline math="y" /> 軸的鉛直線 <MathInline math="x = c" />。若<strong>任意鉛直線與圖形最多只有一個交點</strong>，則此圖形代表一個單變數函數；若存在某條鉛直線與圖形相交兩點以上，則它<strong>不是</strong>單變數函數。
                <br />
                <em>例如：圓形 <MathInline math="x^2 + y^2 = r^2" /> 無法通過鉛直線檢驗（一條鉛直線會交於上下兩點），因此圓形不能表示為單變數函數的圖形。</em>
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}


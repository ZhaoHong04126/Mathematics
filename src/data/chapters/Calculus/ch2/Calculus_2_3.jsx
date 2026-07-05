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

export default function Calculus_2_3() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在本節中，我們將探討函數在某點附近「無限增大或減小」的行為，以及當自變數往正負無窮遠處逼近時函數的趨勢。這些現象在幾何上對應於曲線的<b>漸近線 (Asymptotes)</b>。透過本單元，您將學習到如何利用極限符號描述這些無窮行為、理解其嚴格的數學定義，並掌握求取垂直漸近線、水平漸近線與斜漸近線的系統性方法。
      </p>

      {/* 第一部分：無窮極限與垂直漸近線 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、無窮極限與垂直漸近線 (Infinite Limits & Vertical Asymptotes)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當自變數 <MathInline math="x" /> 無限接近某個常數 <MathInline math="a" /> 時，如果函數值 <MathInline math="f(x)" /> 不斷往正無窮或負無窮方向膨脹，我們稱之為<b>無窮極限</b>。此時，函數圖形會無限逼近垂直線 <MathInline math="x = a" />。
      </p>

      <Definition title="無窮極限的直觀定義">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f(x)" /> 在去心鄰域 <MathInline math="N_{\delta}'(a)" /> 內有定義：
        </p>
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>正無窮極限</strong>：當 <MathInline math="x" /> 趨近於 <MathInline math="a" /> 時，<MathInline math="f(x)" /> 的值可以無限變大（即大於任何給定的正數）。記作：
            <MathBlock math="\lim_{x \to a} f(x) = \infty" />
          </li>
          <li>
            <strong>負無窮極限</strong>：當 <MathInline math="x" /> 趨近於 <MathInline math="a" /> 時，<MathInline math="f(x)" /> 的值可以無限變小（即小於任何給定的負數）。記作：
            <MathBlock math="\lim_{x \to a} f(x) = -\infty" />
          </li>
        </ul>
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: 'rgba(245, 158, 11, 0.03)',
          borderLeft: '3px solid var(--accent-warm)',
          borderRadius: '4px',
          fontSize: '0.92rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>⚠️ 注意：</strong>極限值為 <MathInline math="\infty" /> 或 <MathInline math="-\infty" /> 本質上是指極限<strong>不存在 (Does Not Exist, DNE)</strong>，因為它並非趨近於一個固定的實數。寫下等號只是為了具體描述函數在此點發散至無窮大的趨勢。
        </div>
      </Definition>

      {/* 單側無窮極限 */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        類似地，我們可以定義單側無窮極限，即自變數僅從左側 <MathInline math="x \to a^-" /> 或右側 <MathInline math="x \to a^+" /> 逼近：
      </p>

      <Definition title="單側無窮極限 (One-sided Infinite Limits)">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
          當自變數 <MathInline math="x" /> 從單側逼近 <MathInline math="a" /> 時，函數值趨向無窮：
        </p>
        <MathBlock math="\lim_{x \to a^+} f(x) = \infty, \quad \lim_{x \to a^+} f(x) = -\infty" />
        <MathBlock math="\lim_{x \to a^-} f(x) = \infty, \quad \lim_{x \to a^-} f(x) = -\infty" />
      </Definition>

      {/* 垂直漸近線定義 */}
      <Definition title="垂直漸近線 (Vertical Asymptote)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若當自變數 <MathInline math="x" /> 趨近於 <MathInline math="a" />（不論是雙側、左側或右側）時，函數的極限為無窮大：
          <MathBlock math="\lim_{x \to a} f(x) = \pm\infty \quad \text{或} \quad \lim_{x \to a^+} f(x) = \pm\infty \quad \text{或} \quad \lim_{x \to a^-} f(x) = \pm\infty" />
          則直線 <MathInline math="x = a" /> 稱為該函數圖形 <MathInline math="y = f(x)" /> 的一條<b>垂直漸近線 (Vertical Asymptote)</b>。
        </div>
      </Definition>

      {/* 無窮極限的嚴格定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600' }}>
        無窮極限的嚴格定義 (Rigorous Definition of Infinite Limits)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        為了在數學上嚴謹描述「無限變大」，我們引進了極大常數 <MathInline math="M" />，定義如下：
      </p>

      <Definition title="無窮極限的嚴格定義 (M-Delta Definition)">
        <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
          我們稱 <MathInline math="\lim_{x \to a} f(x) = \infty" /> 成立，若且唯若：
        </p>
        <MathBlock math="\forall M > 0, \exists \delta > 0 \quad \text{such that} \quad 0 < |x - a| < \delta \implies f(x) > M" />
        
        <p style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
          我們稱 <MathInline math="\lim_{x \to a} f(x) = -\infty" /> 成立，若且唯若：
        </p>
        <MathBlock math="\forall N < 0, \exists \delta > 0 \quad \text{such that} \quad 0 < |x - a| < \delta \implies f(x) < N" />

        <div style={{
          marginTop: '16px',
          padding: '14px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--border-color)'
        }}>
          <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '6px' }}>
            📍 白話幾何理解：
          </span>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            不論你指定一個多麼高（大）的水平線 <MathInline math="y = M" />，我總能圍繞 <MathInline math="x = a" /> 找到一個去心區間，使得該區間內所有 <MathInline math="x" /> 對應的函數點，全部都高過你指定的水平線（即 <MathInline math="f(x) > M" />）。
          </p>
        </div>
      </Definition>

      {/* 例題 1 與 2 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        垂直漸近線與無窮極限例題
      </h4>

      <Example title="1：求有理函數的垂直漸近線">
        <p style={{ color: 'var(--text-secondary)' }}>
          設函數 <MathInline math="f(x) = \frac{x^2 - 1}{x^2 - x - 2}" />。求該函數的所有垂直漸近線。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 1：因式分解分子與分母</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            我們首先將函數的分子與分母進行因式分解，找出可能使分母為零的點：
          </p>
          <MathBlock math="f(x) = \frac{(x-1)(x+1)}{(x-2)(x+1)}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
            從分母可知，函數在 <MathInline math="x = 2" /> 與 <MathInline math="x = -1" /> 處無定義。我們必須分別檢查這兩點的極限行為。
          </p>

          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 2：檢驗 x = -1 處的極限</strong>
          </p>
          <MathBlock math="\lim_{x \to -1} f(x) = \lim_{x \to -1} \frac{(x-1)(x+1)}{(x-2)(x+1)}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            由於極限考慮的是 <MathInline math="x \ne -1" /> 的情況，我們可以消去共同因子 <MathInline math="x + 1" />：
          </p>
          <MathBlock math="= \lim_{x \to -1} \frac{x-1}{x-2} = \frac{-1-1}{-1-2} = \frac{-2}{-3} = \frac{2}{3}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
            因為在 <MathInline math="x \to -1" /> 時的極限為有限實數 <MathInline math="\frac{2}{3}" />（此點幾何上為一個「空心點」或可去不連續點），所以 <strong><MathInline math="x = -1" /> 不是垂直漸近線</strong>。
          </p>

          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 3：檢驗 x = 2 處的極限</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            當 <MathInline math="x \to 2" /> 時，分子趨近於 <MathInline math="2-1 = 1" />，而分母趨近於 <MathInline math="2-2 = 0" />。這是一個「非零常數除以零」的形式，表明極限必定為無窮大。我們分析單側極限：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: '1.8' }}>
            <li>
              當 <MathInline math="x \to 2^+" />（即 <MathInline math="x > 2" />）時，<MathInline math="x - 2 > 0" /> 且為極小正數，分子 <MathInline math="x-1 > 1" />，故：
              <MathBlock math="\lim_{x \to 2^+} f(x) = \lim_{x \to 2^+} \frac{x-1}{x-2} = \infty" />
            </li>
            <li>
              當 <MathInline math="x \to 2^-" />（即 <MathInline math="x < 2" />）時，<MathInline math="x - 2 < 0" /> 且為極小負數，分子 <MathInline math="x-1 > 0" />，故：
              <MathBlock math="\lim_{x \to 2^-} f(x) = \lim_{x \to 2^-} \frac{x-1}{x-2} = -\infty" />
            </li>
          </ul>
          <p style={{ color: 'var(--text-secondary)' }}>
            由於符合無窮極限的條件，我們得出結論：<strong>直線 <MathInline math="x = 2" /> 是該函數唯一的垂直漸近線</strong>。
          </p>
        </Solution>
      </Example>

      <Example title="2：用嚴格定義證明無窮極限">
        <div style={{ color: 'var(--text-secondary)' }}>
          試用無窮極限的嚴格定義，證明：
          <MathBlock math="\lim_{x \to 0} \frac{1}{x^2} = \infty" />
        </div>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            本題要求我們證明：對於任意給定的常數 <MathInline math="M > 0" />，都存在一個 <MathInline math="\delta > 0" />，使得：
            <MathBlock math="0 < |x - 0| < \delta \implies \frac{1}{x^2} > M" />
          </div>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 1：分析並反推尋找 delta</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            我們希望目標不等式成立：
          </p>
          <MathBlock math="\frac{1}{x^2} > M" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            由於 <MathInline math="M > 0" /> 且 <MathInline math="x^2 > 0" />，我們可以將不等式兩邊取倒數（不等號方向改變）：
          </p>
          <MathBlock math="x^2 < \frac{1}{M}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            兩邊開平方根，可得：
          </p>
          <MathBlock math="|x| < \frac{1}{\sqrt{M}}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
            這啟發我們，只要令 <MathInline math="\delta = \frac{1}{\sqrt{M}}" />，就能完成證明。
          </p>

          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 2：撰寫正式證明</strong>
          </p>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            給定任意實數 <MathInline math="M > 0" />。
            <br />
            我們取正數 <MathInline math="\delta = \frac{1}{\sqrt{M}} > 0" />。
            <br />
            當自變數 <MathInline math="x" /> 滿足去心鄰域條件 <MathInline math="0 < |x - 0| < \delta" />（即 <MathInline math="0 < |x| < \frac{1}{\sqrt{M}}" />）時：
            <br />
            將不等式兩側平方，得到：
            <MathBlock math="x^2 < \frac{1}{M}" />
            由於 <MathInline math="x \ne 0" />，我們可將此不等式兩邊取倒數，得到：
            <MathBlock math="\frac{1}{x^2} > M" />
            因此，根據無窮極限的嚴格定義，我們證明了：
            <MathBlock math="\lim_{x \to 0} \frac{1}{x^2} = \infty \quad \blacksquare" />
          </div>
        </Solution>
      </Example>

      {/* 第二部分：在無窮遠處的極限與水平漸近線 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、在無窮遠處的極限與水平漸近線 (Limits at Infinity & Horizontal Asymptotes)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當自變數 <MathInline math="x" /> 朝正無窮大 <MathInline math="\infty" /> 或負無窮大 <MathInline math="-\infty" /> 逼近時，如果函數值 <MathInline math="f(x)" /> 趨近於一個確定的常數 <MathInline math="L" />，我們稱之為<b>在無窮遠處的極限</b>。此時，函數圖形會無限逼近水平線 <MathInline math="y = L" />。
      </p>

      <Definition title="在無窮遠處的極限直觀定義">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          1. 設函數 <MathInline math="f" /> 在區間 <MathInline math="(a, \infty)" /> 上有定義。若當 <MathInline math="x" /> 無限變大時，<MathInline math="f(x)" /> 的值能任意靠近實數 <MathInline math="L" />，我們記作：
          <MathBlock math="\lim_{x \to \infty} f(x) = L" />
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '12px' }}>
          2. 設函數 <MathInline math="f" /> 在區間 <MathInline math="(-\infty, b)" /> 上有定義。若當 <MathInline math="x" /> 無限變小（朝負方向絕對值無限增大）時，<MathInline math="f(x)" /> 的值能任意靠近實數 <MathInline math="L" />，我們記作：
          <MathBlock math="\lim_{x \to -\infty} f(x) = L" />
        </p>
      </Definition>

      <Definition title="水平漸近線 (Horizontal Asymptote)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若函數滿足下列兩個極限條件之一：
          <MathBlock math="\lim_{x \to \infty} f(x) = L \quad \text{或} \quad \lim_{x \to -\infty} f(x) = L" />
          則直線 <MathInline math="y = L" /> 稱為該函數圖形 <MathInline math="y = f(x)" /> 的一條<b>水平漸近線 (Horizontal Asymptote)</b>。
        </div>
        <div style={{
          marginTop: '12px',
          padding: '10px 14px',
          backgroundColor: 'rgba(6, 182, 212, 0.02)',
          borderLeft: '3px solid var(--accent-secondary)',
          borderRadius: '4px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          💡 <strong>觀念釐清：</strong>一個函數圖形最多只能有兩條不同的水平漸近線（分別在 <MathInline math="x \to \infty" /> 與 <MathInline math="x \to -\infty" /> 方向），但可以只有一條，甚至沒有。此外，與垂直漸近線不同的是，函數圖形<strong>可以穿過</strong>水平漸近線。
        </div>
      </Definition>

      {/* 在無窮遠處極限的嚴格定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600' }}>
        在無窮遠處極限的嚴格定義 (Rigorous Definition of Limits at Infinity)
      </h3>
      
      <Definition title="在無窮遠處極限的嚴格定義 (Epsilon-M Definition)">
        <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
          我們稱 <MathInline math="\lim_{x \to \infty} f(x) = L" /> 成立，意指：
        </p>
        <MathBlock math="\forall \epsilon > 0, \exists M > 0 \quad \text{such that} \quad x > M \implies |f(x) - L| < \epsilon" />
        
        <p style={{ marginTop: '16px', marginBottom: '12px', color: 'var(--text-secondary)' }}>
          我們稱 <MathInline math="\lim_{x \to -\infty} f(x) = L" /> 成立，意指：
        </p>
        <MathBlock math="\forall \epsilon > 0, \exists N < 0 \quad \text{such that} \quad x < N \implies |f(x) - L| < \epsilon" />
      </Definition>

      {/* 重要極限性質 */}
      <Theorem title="重要性質：倒數極限定理 (Limit of Reciprocals)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若 <MathInline math="r > 0" /> 為任意有理數，則：
          <MathBlock math="\lim_{x \to \infty} \frac{1}{x^r} = 0" />
          若當 <MathInline math="x < 0" /> 時 <MathInline math="x^r" /> 有定義，則亦有：
          <MathBlock math="\lim_{x \to -\infty} \frac{1}{x^r} = 0" />
        </div>
      </Theorem>

      {/* 求水平極限的核心技巧 */}
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
          color: 'var(--accent-secondary)',
          backgroundColor: 'rgba(6, 182, 212, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          🛠️ 在無窮遠處求極限的實用技巧
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <strong>有理分式除法：</strong>對於形如 <MathInline math="\frac{P(x)}{Q(x)}" /> 的分式，分子與分母<strong>同除以分母的最高次項</strong>。如此可使分母的最高次項變為常數，而其他項變為倒數，進而利用倒數極限定理消去。
            </li>
            <li>
              <strong>根式的正負號細節（極重要）：</strong>在處理帶有根號的題目時，我們常需作代數變形：
              <MathBlock math="\sqrt{x^2} = |x|" />
              當 <MathInline math="x \to \infty" /> 時，由於 <MathInline math="x > 0" />，故有 <MathInline math="\sqrt{x^2} = x" />；
              <br />
              當 <MathInline math="x \to -\infty" /> 時，由於 <MathInline math="x < 0" />，故有 <strong><MathInline math="\sqrt{x^2} = -x" /></strong> (或寫成 <MathInline math="x = -\sqrt{x^2}" />)。
            </li>
            <li>
              <strong>有理化技巧：</strong>若遇到無窮相減的未定式（如 <MathInline math="\infty - \infty" />），通常利用平方差公式將分子有理化，使其轉化為分式，再進行計算。
            </li>
          </ul>
        </div>
      </div>

      {/* 例題 3, 4, 5 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        在無窮遠處的極限例題
      </h4>

      <Example title="3：有理分式求水平極限">
        <div style={{ color: 'var(--text-secondary)' }}>
          試計算極限並求出對應的水平漸近線：
          <MathBlock math="\lim_{x \to \infty} \frac{3x^2 - x - 2}{5x^2 + 4x + 1}" />
        </div>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            此為代數分式，分母的最高次方項為 <MathInline math="x^2" />。我們將分子與分母同除以 <MathInline math="x^2" />：
          </p>
          <MathBlock math="\lim_{x \to \infty} \frac{3x^2 - x - 2}{5x^2 + 4x + 1} = \lim_{x \to \infty} \frac{\frac{3x^2}{x^2} - \frac{x}{x^2} - \frac{2}{x^2}}{\frac{5x^2}{x^2} + \frac{4x}{x^2} + \frac{1}{x^2}}" />
          <MathBlock math="= \lim_{x \to \infty} \frac{3 - \frac{1}{x} - \frac{2}{x^2}}{5 + \frac{4}{x} + \frac{1}{x^2}}" />
          <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
            根據極限的運算法則與倒數極限定理，當 <MathInline math="x \to \infty" /> 時，所有分母含有 <MathInline math="x" /> 的項均趨近於 0：
          </p>
          <MathBlock math="= \frac{3 - 0 - 0}{5 + 0 + 0} = \frac{3}{5}" />
          <p style={{ color: 'var(--text-secondary)' }}>
            因此，極限值為 <MathInline math="\frac{3}{5}" />。這也意謂著直線 <strong><MathInline math="y = \frac{3}{5}" /> 是該函數的一條水平漸近線</strong>。
          </p>
        </Solution>
      </Example>

      <Example title="4：含有根式的負無窮極限">
        <div style={{ color: 'var(--text-secondary)' }}>
          試計算極限：
          <MathBlock math="\lim_{x \to -\infty} \frac{\sqrt{2x^2 + 1}}{3x - 5}" />
        </div>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            當自變數趨近於 <MathInline math="-\infty" />，分母的最高次項本質上是 <MathInline math="x" />。我們將分子與分母同除以 <MathInline math="x" />。
          </p>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
            因為 <MathInline math="x \to -\infty" />，自變數必定為負數（即 <MathInline math="x < 0" />）。在處理分子根號時，我們必須注意：
            <MathBlock math="x = -\sqrt{x^2}" />
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Therefore，當我們將分子除以 <MathInline math="x" /> 時，會將負號留在根號外面：
          </p>
          <MathBlock math="\frac{\sqrt{2x^2 + 1}}{x} = \frac{\sqrt{2x^2 + 1}}{-\sqrt{x^2}} = -\sqrt{\frac{2x^2 + 1}{x^2}} = -\sqrt{2 + \frac{1}{x^2}}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            而分母除以 <MathInline math="x" /> 則正常進行：
          </p>
          <MathBlock math="\frac{3x - 5}{x} = 3 - \frac{5}{x}" />
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0' }}>
            現在，將此變形帶回極限式：
          </p>
          <MathBlock math="\lim_{x \to -\infty} \frac{\sqrt{2x^2 + 1}}{3x - 5} = \lim_{x \to -\infty} \frac{-\sqrt{2 + \frac{1}{x^2}}}{3 - \frac{5}{x}}" />
          <MathBlock math="= \frac{-\sqrt{2 + 0}}{3 - 0} = -\frac{\sqrt{2}}{3}" />
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
            <strong>📍 延伸幾何結論：</strong>
            <br />
            該函數在向左（負無窮）逼近時，有水平漸近線 <MathInline math="y = -\frac{\sqrt{2}}{3}" />。
            <br />
            讀者可以試著計算其在向右（正無窮）方向的極限，將得到 <MathInline math="\lim_{x \to \infty} f(x) = \frac{\sqrt{2}}{3}" />。
            <br />
            因此，此函數圖形共擁有兩條水平漸近線：<MathInline math="y = \frac{\sqrt{2}}{3}" /> 與 <MathInline math="y = -\frac{\sqrt{2}}{3}" />。
          </p>
        </Solution>
      </Example>

      <Example title="5：無窮相減型極限的求法">
        <div style={{ color: 'var(--text-secondary)' }}>
          計算極限：
          <MathBlock math="\lim_{x \to \infty} \left(\sqrt{x^2 + x} - x\right)" />
        </div>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            當 <MathInline math="x \to \infty" /> 時，該極限呈現 <MathInline math="\infty - \infty" /> 的未定式形式。為了解決此問題，我們對括弧內的式子進行「有理化」（乘以其共軛部分並除以相同部分）：
          </p>
          <MathBlock math="\sqrt{x^2 + x} - x = \frac{\left(\sqrt{x^2 + x} - x\right)\left(\sqrt{x^2 + x} + x\right)}{\sqrt{x^2 + x} + x}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            利用平方差公式展開分子：
          </p>
          <MathBlock math="= \frac{(x^2 + x) - x^2}{\sqrt{x^2 + x} + x} = \frac{x}{\sqrt{x^2 + x} + x}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            現在，此式子轉化為分式。我們將分子與分母同除以分母的最高次項 <MathInline math="x" />（注意，因為 <MathInline math="x \to \infty" />，<MathInline math="x = \sqrt{x^2}" />）：
          </p>
          <MathBlock math="= \frac{\frac{x}{x}}{\frac{\sqrt{x^2 + x}}{\sqrt{x^2}} + \frac{x}{x}} = \frac{1}{\sqrt{1 + \frac{1}{x}} + 1}" />
          <p style={{ color: 'var(--text-secondary)', margin: '12px 0' }}>
            此時，我們可以直接求極限值：
          </p>
          <MathBlock math="\lim_{x \to \infty} \left(\sqrt{x^2 + x} - x\right) = \lim_{x \to \infty} \frac{1}{\sqrt{1 + \frac{1}{x}} + 1} = \frac{1}{\sqrt{1 + 0} + 1} = \frac{1}{2}" />
        </Solution>
      </Example>

      {/* 第三部分：斜漸近線 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        三、斜漸近線 (Oblique / Slant Asymptotes)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在某些情況下，當自變數 <MathInline math="x \to \pm\infty" /> 時，函數圖形既不趨向水平常數，也不純粹垂直膨脹，而是無限逼近於某一條斜率非零的直線 <MathInline math="y = mx + k" />。這條直線即為函數的<b>斜漸近線</b>。
      </p>

      <Definition title="斜漸近線的定義">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若函數 <MathInline math="f(x)" /> 滿足以下極限條件之一：
          <MathBlock math="\lim_{x \to \infty} [f(x) - (mx + k)] = 0 \quad \text{或} \quad \lim_{x \to -\infty} [f(x) - (mx + k)] = 0" />
          其中斜率 <MathInline math="m \ne 0" />，則直線 <strong><MathInline math="y = mx + k" /></strong> 稱為函數圖形 <MathInline math="y = f(x)" /> 的一條<b>斜漸近線 (Oblique Asymptote)</b>。
        </div>
      </Definition>

      {/* 斜漸近線的求解方法 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-primary)',
        backgroundColor: 'rgba(139, 92, 246, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          color: 'var(--accent-primary)',
          backgroundColor: 'rgba(139, 92, 246, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          📐 斜漸近線的求解與計算方法
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '14px' }}>
            求斜漸近線 <MathInline math="y = mx + k" /> 通常有以下兩種途徑：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>有理函數長除法（適用於多項式分式）：</strong>
              <br />
              當 <MathInline math="f(x) = \frac{P(x)}{Q(x)}" /> 且分子 <MathInline math="P(x)" /> 的次數<strong>剛好比分母 <MathInline math="Q(x)" /> 大 1 次</strong>時，我們可以利用多項式長除法將其改寫為：
              <MathBlock math="f(x) = (mx + k) + \frac{R(x)}{Q(x)}" />
              其中餘式 <MathInline math="R(x)" /> 的次數低於分母 <MathInline math="Q(x)" />。此時，因為當 <MathInline math="x \to \pm\infty" /> 時，有理分式部分 <MathInline math="\lim_{x \to \pm\infty} \frac{R(x)}{Q(x)} = 0" />，所以直線 <MathInline math="y = mx + k" /> 即為斜漸近線。
            </li>
            <li>
              <strong>一般極限公式法（通用於各類函數）：</strong>
              <br />
              若要對非單純多項式分式求斜漸近線，可利用下列公式計算斜率與截距：
              <ol style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'decimal', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>計算斜率：<MathInline math="m = \lim_{x \to \pm\infty} \frac{f(x)}{x}" /></li>
                <li>計算截距：<MathInline math="k = \lim_{x \to \pm\infty} [f(x) - mx]" /></li>
              </ol>
            </li>
          </ul>
        </div>
      </div>

      {/* 例題 6 */}
      <Example title="6：求有理函數的斜漸近線">
        <div style={{ color: 'var(--text-secondary)' }}>
          試求函數 <MathInline math="f(x) = \frac{x^2 + 2x - 1}{x - 1}" /> 的斜漸近線與垂直漸近線。
        </div>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            <strong>步驟 1：求垂直漸近線</strong>
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            考慮分母為零的點 <MathInline math="x = 1" />。由於當 <MathInline math="x \to 1" /> 時，分子趨向於 <MathInline math="1^2 + 2(1) - 1 = 2 \ne 0" />，分母趨向於 0：
          </div>
          <MathBlock math="\lim_{x \to 1^+} \frac{x^2 + 2x - 1}{x - 1} = \infty, \quad \lim_{x \to 1^-} \frac{x^2 + 2x - 1}{x - 1} = -\infty" />
          <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
            因此，直線 <strong><MathInline math="x = 1" /> 是該函數的一條垂直漸近線</strong>。
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>步驟 2：利用長除法求斜漸近線</strong>
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            因為分子的次數（2次）剛好比分母的次數（1次）大 1，我們對分式進行多項式除法：
          </div>
          <div style={{
            margin: '12px 0',
            padding: '12px',
            fontFamily: 'monospace',
            backgroundColor: 'rgba(255, 255, 255, 0.02)',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            display: 'inline-block'
          }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x + 3 &nbsp;&nbsp;&nbsp;&nbsp;(商式)<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___________<br />
            x - 1 | x^2 + 2x - 1<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;x^2 - &nbsp;x<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_________<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3x - 1<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3x - 3<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2 &nbsp;(餘式)
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            透過除法，我們可以將原函數改寫為：
          </div>
          <MathBlock math="f(x) = x + 3 + \frac{2}{x - 1}" />
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            現在，檢驗函數與直線 <MathInline math="y = x + 3" /> 的距離極限：
          </p>
          <MathBlock math="\lim_{x \to \pm\infty} [f(x) - (x + 3)] = \lim_{x \to \pm\infty} \frac{2}{x - 1} = 0" />
          <p style={{ color: 'var(--text-secondary)' }}>
            因為差值極限為 0，我們得出直線 <strong><MathInline math="y = x + 3" /> 是該函數圖形的斜漸近線</strong>。
          </p>
        </Solution>
      </Example>

      {/* 第四部分：在無窮遠處的無窮極限 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        四、在無窮遠處的無窮極限 (Infinite Limits at Infinity)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當自變數 <MathInline math="x" /> 朝無窮遠處趨近時，函數值並沒有收斂至常數，而是同樣無限膨脹。例如冪函數 <MathInline math="f(x) = x^3" /> 或指數函數 <MathInline math="f(x) = e^x" />，這在極限符號上表示為：
        <MathBlock math="\lim_{x \to \infty} f(x) = \infty \quad \text{或} \quad \lim_{x \to -\infty} f(x) = \infty" />
      </div>

      <Definition title="在無窮遠處的無窮極限定義">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 在區間 <MathInline math="(a, \infty)" /> 上有定義。
          <br />
          我們稱 <MathInline math="\lim_{x \to \infty} f(x) = \infty" /> 成立，若且唯若：
          <MathBlock math="\forall M > 0, \exists N > 0 \quad \text{such that} \quad x > N \implies f(x) > M" />
        </div>
      </Definition>
      
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginTop: '16px' }}>
        其幾何意義為：不論給定多大的實數 <MathInline math="M" />，只要我們把自變數 <MathInline math="x" /> 取得足夠大（大於某個界限 <MathInline math="N" />），函數值就必定會大於該實數 <MathInline math="M" />。
      </p>

      {/* 第五部分：課後練習題 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <Exercises>
        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            1. 設函數 <MathInline math="f(x) = \frac{2x^3 - 3x^2 - 1}{x^2 - 1}" />。求該函數圖形的所有垂直漸近線與斜漸近線。
          </div>
          <Solution>
            <p style={{ marginBottom: '10px' }}>
              <strong>垂直漸近線分析：</strong>
              <br />
              令分母為零可得 <MathInline math="x^2 - 1 = 0 \implies x = 1" /> 或 <MathInline math="x = -1" />。
              <br />
              此時分子分別為：
              <br />
              - 當 <MathInline math="x = 1" /> 時，分子為 <MathInline math="2(1)^3 - 3(1)^2 - 1 = -2 \ne 0" />。
              <br />
              - 當 <MathInline math="x = -1" /> 時，分子為 <MathInline math="2(-1)^3 - 3(-1)^2 - 1 = -6 \ne 0" />。
              <br />
              因為兩點代入皆呈現「非零常數除以零」的形式，故極限皆為無窮大。
              <br />
              因此，<strong>垂直漸近線為直線 <MathInline math="x = 1" /> 與 <MathInline math="x = -1" /></strong>。
            </p>
            <div style={{ marginBottom: '10px' }}>
              <strong>斜漸近線分析：</strong>
              <br />
              由於分子次數（3次）比分母次數（2次）大 1，我們進行多項式除法：
              <MathBlock math="2x^3 - 3x^2 - 1 = (2x - 3)(x^2 - 1) + (2x - 4)" />
              因此：
              <MathBlock math="f(x) = 2x - 3 + \frac{2x - 4}{x^2 - 1}" />
              當 <MathInline math="x \to \pm\infty" /> 時，有理分式項極限為 0：
              <MathBlock math="\lim_{x \to \pm\infty} \frac{2x - 4}{x^2 - 1} = 0" />
              因此，<strong>斜漸近線為直線 <MathInline math="y = 2x - 3" /></strong>。
            </div>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            2. 試求雙曲正切函數 <MathInline math="f(x) = \tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}" /> 的所有水平漸近線。
          </div>
          <Solution>
            <p style={{ marginBottom: '10px' }}>
              我們必須分別計算自變數趨近於正無窮與負無窮的極限：
            </p>
            <div style={{ marginBottom: '10px' }}>
              <strong>1. 當 x 趨近於正無窮時：</strong>
              <br />
              此時 <MathInline math="e^{-x} \to 0" />。為了計算方便，分子與分母同除以 <MathInline math="e^x" />：
              <MathBlock math="\lim_{x \to \infty} \frac{e^x - e^{-x}}{e^x + e^{-x}} = \lim_{x \to \infty} \frac{1 - e^{-2x}}{1 + e^{-2x}} = \frac{1 - 0}{1 + 0} = 1" />
              故直線 <strong><MathInline math="y = 1" /></strong> 為向右方向的水平漸近線。
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>2. 當 x 趨近於負無窮時：</strong>
              <br />
              此時 <MathInline math="e^x \to 0" />。分子與分母同除以 <MathInline math="e^{-x}" />：
              <MathBlock math="\lim_{x \to -\infty} \frac{e^x - e^{-x}}{e^x + e^{-x}} = \lim_{x \to -\infty} \frac{e^{2x} - 1}{e^{2x} + 1} = \frac{0 - 1}{0 + 1} = -1" />
              故直線 <strong><MathInline math="y = -1" /></strong> 為向左方向的水平漸近線。
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>
              綜上所述，雙曲正切函數擁有兩條水平漸近線，分別是 <strong><MathInline math="y = 1" /> 與 <MathInline math="y = -1" /></strong>。
            </p>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            3. 計算極限值：
            <MathBlock math="\lim_{x \to \infty} \left(\sqrt{x^2 + 3x} - \sqrt{x^2 - 2x}\right)" />
          </div>
          <Solution>
            <p style={{ marginBottom: '10px' }}>
              <strong>【解答】</strong>
            </p>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              這是一個 <MathInline math="\infty - \infty" /> 型式的極限。我們藉由分子有理化，同乘以共軛根式來化簡：
            </p>
            <MathBlock math="\sqrt{x^2 + 3x} - \sqrt{x^2 - 2x} = \frac{\left(x^2 + 3x\right) - \left(x^2 - 2x\right)}{\sqrt{x^2 + 3x} + \sqrt{x^2 - 2x}}" />
            <MathBlock math="= \frac{5x}{\sqrt{x^2 + 3x} + \sqrt{x^2 - 2x}}" />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              此時，將分子分母同除以 <MathInline math="x" />（注意在根號內除以 <MathInline math="x^2" />，因為當 <MathInline math="x \to \infty" /> 時，<MathInline math="x = \sqrt{x^2}" />）：
            </p>
            <MathBlock math="= \frac{5}{\sqrt{1 + \frac{3}{x}} + \sqrt{1 - \frac{2}{x}}}" />
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              取極限可得：
            </p>
            <MathBlock math="\lim_{x \to \infty} \frac{5}{\sqrt{1 + \frac{3}{x}} + \sqrt{1 - \frac{2}{x}}} = \frac{5}{\sqrt{1+0} + \sqrt{1-0}} = \frac{5}{2}" />
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            4. 試用在無窮遠處極限的嚴格定義，證明：
            <MathBlock math="\lim_{x \to \infty} \frac{2x + 1}{x - 1} = 2" />
          </div>
          <Solution>
            <p style={{ marginBottom: '10px' }}>
              <strong>證明步驟：</strong>
            </p>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              給定任意實數 <MathInline math="\epsilon > 0" />。我們希望找到一個 <MathInline math="M > 0" />，使得當 <MathInline math="x > M" /> 時，能推得：
              <MathBlock math="\left| \frac{2x + 1}{x - 1} - 2 \right| < \epsilon" />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              首先將左側不等式進行通分化簡：
            </p>
            <MathBlock math="\left| \frac{2x + 1 - 2(x - 1)}{x - 1} \right| = \left| \frac{2x + 1 - 2x + 2}{x - 1} \right| = \left| \frac{3}{x - 1} \right|" />
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              因為我們考慮 <MathInline math="x \to \infty" /> 的大數情況，可以假設 <MathInline math="x > 1" />。此時 <MathInline math="x - 1 > 0" />，絕對值可直接拆開：
              <MathBlock math="\frac{3}{x - 1} < \epsilon \iff x - 1 > \frac{3}{\epsilon} \iff x > \frac{3}{\epsilon} + 1" />
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
              因此，我們取 <MathInline math="M = \max\left\{1, \frac{3}{\epsilon} + 1\right\} > 0" />。
            </p>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              <strong>正式驗證：</strong>
              <br />
              給定任意 <MathInline math="\epsilon > 0" />。
              <br />
              若我們取 <MathInline math="M = \frac{3}{\epsilon} + 1" />，則當自變數滿足 <MathInline math="x > M" /> 時，有：
              <br />
              <MathBlock math="x > \frac{3}{\epsilon} + 1 \implies x - 1 > \frac{3}{\epsilon} \implies \frac{3}{x - 1} < \epsilon" />
              又因為 <MathInline math="x > M \ge 1" />，故有 <MathInline math="x - 1 > 0" />，即：
              <MathBlock math="\left| \frac{2x + 1}{x - 1} - 2 \right| = \left| \frac{3}{x - 1} \right| = \frac{3}{x - 1} < \epsilon" />
              這便完整證明了該極限為 2。 <MathInline math="\blacksquare" />
            </div>
          </Solution>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

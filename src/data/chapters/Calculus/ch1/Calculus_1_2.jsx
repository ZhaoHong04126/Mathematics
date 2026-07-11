import { Definition, Example, Solution, MathInline, MathBlock } from '../../../../components/MathBlocks';

export default function Ch1_1_2() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在本節中，我們將學習微積分中最基礎且最常用到的兩大類初等函數：<strong>冪函數</strong>與由其組合而成的<strong>多項式函數</strong>。它們具有良好的代數性質（如定義域寬廣、易於求導與積分），是研究微積分各類定理的絕佳起步對象。
      </p>

      {/* 一、冪函數卡片 */}
      <Definition title="冪函數 (Power Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          形如以下定義的函數稱為<strong>冪函數</strong>：
        </p>
        <MathBlock math="f(x) = x^a \quad (a \text{ 為常數})" />
        
        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          根據指數 <MathInline math="a" /> 的不同類型，冪函數的圖形與定義域有著顯著的差別：
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '12px' }}>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              1. 正整數冪 (<MathInline math="a = n \in \mathbb{N}" />)
            </span>
            <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
              例如 <MathInline math="f(x) = x, x^2, x^3" />。其定義域為全體實數 <MathInline math="\mathbb{R}" />。
              <br />
              - 當 <MathInline math="n" /> 為<strong>偶數</strong>時，為偶函數，圖形呈拋物線狀且關於 <MathInline math="y" /> 軸對稱。
              <br />
              - 當 <MathInline math="n" /> 為<strong>奇數</strong>時，為奇函數，圖形關於原點對稱。
            </span>
          </div>
          
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              2. 負整數冪 (<MathInline math="a = -n \quad (n \in \mathbb{N})" />)
            </span>
            <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
              例如 <MathInline math="f(x) = x^{-1} = \frac{1}{x}" /> 或 <MathInline math="f(x) = x^{-2} = \frac{1}{x^2}" />。
              <br />
              其定義域為除零以外的實數 <MathInline math="\mathbb{R} \setminus \{0\}" />。在 <MathInline math="x = 0" /> 處有垂直漸近線。
            </span>
          </div>

          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              3. 分數冪/根式函數 (<MathInline math="a = \frac{1}{n} \quad (n \in \mathbb{N})" />)
            </span>
            <span style={{ color: 'var(--text-secondary)', lineHeight: '1.6', display: 'block' }}>
              即根式函數 <MathInline math="f(x) = \sqrt[n]{x}" />：
              <br />
              - 當 <MathInline math="n" /> 為<strong>偶數</strong>時，定義域為非負實數 <MathInline math="[0, \infty)" />。
              <br />
              - 當 <MathInline math="n" /> 為<strong>奇數</strong>時，定義域為全體實數 <MathInline math="\mathbb{R}" />。
            </span>
          </div>
        </div>
      </Definition>

      {/* 二、多項式函數卡片 */}
      <Definition title="多項式函數 (Polynomial Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          多項式函數是由自變數的非負整數次冪與常數經過有限次加法與乘法運算所構成的函數：
        </p>
        <MathBlock math="P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              名詞解釋：
            </span>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>項數與係數：</strong><MathInline math="a_n, a_{n-1}, \dots, a_0" /> 為實數，稱為該多項式的<strong>係數 (Coefficients)</strong>。</li>
              <li><strong>首項與首項係數：</strong>當 <MathInline math="a_n \neq 0" /> 時，<MathInline math="a_n x^n" /> 稱為<strong>首項 (Leading Term)</strong>，<MathInline math="a_n" /> 稱為<strong>首項係數 (Leading Coefficient)</strong>。</li>
              <li><strong>次數 (Degree)：</strong>最高冪次 <MathInline math="n" /> 稱為該多項式函數的<strong>次數</strong>，記作 <MathInline math="\deg(P) = n" />。</li>
              <li><strong>定義域：</strong>多項式函數的定義域恆為全體實數 <MathInline math="\mathbb{R}" />。</li>
            </ul>
          </div>

          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              常見多項式分類：
            </span>
            <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>常數函數 (Constant Function)：</strong><MathInline math="P(x) = c" /> (次數為 0)</li>
              <li><strong>一次/線性函數 (Linear Function)：</strong><MathInline math="P(x) = mx + k" /> (次數為 1)</li>
              <li><strong>二次函數 (Quadratic Function)：</strong><MathInline math="P(x) = ax^2 + bx + c" /> (次數為 2)</li>
              <li><strong>三次函數 (Cubic Function)：</strong><MathInline math="P(x) = ax^3 + bx^2 + cx + d" /> (次數為 3)</li>
            </ul>
          </div>
        </div>
      </Definition>

      {/* 例題與解答 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        觀念探討與典型例題
      </h3>

      {/* 例題 1 */}
      <Example title="求冪函數的定義域">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試求冪函數 <MathInline math="f(x) = x^{-\frac{1}{2}}" /> 的定義域，並將其寫成根式與分式形式。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            首先，根據負指數與分數指數的代數定義，我們可以將該函數改寫為：
          </p>
          <MathBlock math="f(x) = \frac{1}{x^{\frac{1}{2}}} = \frac{1}{\sqrt{x}}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            為了使該函數在實數範圍內有意義，必須滿足以下兩個條件：
          </p>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '10px' }}>
            <li>根號內部的數值必須大於或等於零：<MathInline math="x \ge 0" />（偶數次根式的基本定義）。</li>
            <li>分母的數值不能為零：<MathInline math="\sqrt{x} \neq 0 \implies x \neq 0" />。</li>
          </ol>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            綜合以上兩點限制，自變數必須滿足 <MathInline math="x > 0" />。
            <br />
            - 因此，該冪函數的定義域為開區間 <strong><MathInline math="(0, \infty)" /></strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="多項式函數的性質判斷">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設有一個多項式函數 <MathInline math="P(x) = (x-2)(x+3)(4-x)" />：
          <br />
          (1) 求該多項式函數的次數 (Degree) 與首項係數 (Leading Coefficient)。
          <br />
          (2) 求其與 <MathInline math="x" /> 軸的交點。
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (1) 求解次數與首項係數：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將多項式展開：
          </p>
          <MathBlock math="P(x) = (x^2 + x - 6)(4 - x) = 4x^2 - x^3 + 4x - x^2 - 24 + 6x = -x^3 + 3x^2 + 10x - 24" />
          <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            展開後的最高次冪項為 <MathInline math="-x^3" />。
            <br />
            - 該多項式的次數為 <strong><MathInline math="3" /></strong>（三次多項式）。
            <br />
            - 首項係數為 <strong><MathInline math="-1" /></strong>。
          </p>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (2) 求解與 x 軸的交點：
          </p>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            令 <MathInline math="P(x) = 0" />，可直接從因式分解形式得到：
            <MathBlock math="(x-2)(x+3)(4-x) = 0 \implies x = 2, -3, 4" />
            因此，該多項式函數與 <MathInline math="x" /> 軸的交點坐標為 <strong><MathInline math="(2, 0), (-3, 0), (4, 0)" /></strong>。
          </div>
        </Solution>
      </Example>
    </div>
  );
}

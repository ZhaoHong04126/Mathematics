import { 
  Definition, 
  Example, 
  Solution, 
  Proof,
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

export default function Calculus_3_5() {
  const subCardStyle = {
    padding: '16px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '12px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '16px'
  };

  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在處理更複雜的函數時，我們經常會遇到合成函數（一個函數包含著另一個函數）。**連鎖法則 (Chain Rule)** 是解決合成函數微分的核心工具。此外，當方程式無法明確地將 $y$ 寫成 $x$ 的函數，而是以隱函數形式 $F(x, y) = 0$ 呈現時，我們需要使用**隱函數微分 (Implicit Differentiation)** 來求得導數。最後，我們也會探討如何運用這些技巧來求出**反函數 (Inverse Functions)** 的導數。
      </p>

      {/* 1. 連鎖法則 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、連鎖法則 (The Chain Rule)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        連鎖法則告訴我們，對於合成函數，其變化率等於「外函數的變化率」乘以「內函數的變化率」。這在物理上可以理解為相關變化率的乘積。
      </p>

      <div className="limit-formulas-grid">
        <Definition title="連鎖法則">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                萊布尼茲符號 (Leibniz Notation)
              </span>
              <p style={{ color: 'var(--text-secondary)' }}>若 <MathInline math="y = f(u)" /> 且 <MathInline math="u = g(x)" />：</p>
              <MathBlock math="\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                牛頓/拉格朗日符號 (Prime Notation)
              </span>
              <p style={{ color: 'var(--text-secondary)' }}>若 <MathInline math="F(x) = f(g(x))" />：</p>
              <MathBlock math="F'(x) = f'(g(x)) \cdot g'(x)" />
            </div>
          </div>
        </Definition>
      </div>

      <Proof title="點擊展開：連鎖律的證明 (Proof of the Chain Rule)">
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          利用極限定義推導連鎖律：
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
          設 <MathInline math="F(x) = f(g(x)) = (f \circ g)(x)" /> 為合成函數。我們要求 <MathInline math="F'(a)" />。<br />
          令 <MathInline math="y = g(x)" />，則 <MathInline math="F(x) = f(g(x)) = f(y)" />。
          <br /><br />
          根據導數的定義：
          <MathBlock math="F'(a) = \lim_{x \to a} \frac{F(x) - F(a)}{x - a} = \lim_{x \to a} \frac{f(g(x)) - f(g(a))}{x - a}" />
          
          在分子與分母同乘 <MathInline math="g(x) - g(a)" /> （假設其不為零）：
          <MathBlock math="= \lim_{x \to a} \left[ \frac{f(g(x)) - f(g(a))}{g(x) - g(a)} \cdot \frac{g(x) - g(a)}{x - a} \right]" />
          
          利用極限的乘積性質將其拆分：
          <MathBlock math="= \lim_{x \to a} \frac{f(g(x)) - f(g(a))}{g(x) - g(a)} \cdot \lim_{x \to a} \frac{g(x) - g(a)}{x - a}" />
          
          令 <MathInline math="y = g(x)" /> 且 <MathInline math="b = g(a)" />。因為 <MathInline math="g" /> 在 <MathInline math="a" /> 點可微，故 <MathInline math="g" /> 連續，當 <MathInline math="x \to a" /> 時，<MathInline math="y \to b" />。因此左項的極限可改寫為：
          <MathBlock math="= \lim_{y \to b} \frac{f(y) - f(b)}{y - b} \cdot \lim_{x \to a} \frac{g(x) - g(a)}{x - a}" />
          
          這兩個極限分別正是 <MathInline math="f'(b)" /> 與 <MathInline math="g'(a)" />：
          <MathBlock math="= f'(b) \cdot g'(a) = f'(g(a)) \cdot g'(a)" />
          
          這就完成了證明的核心概念。<span style={{ float: 'right' }}>■</span>
        </div>
      </Proof>

      <Example title="1：合成函數的微分">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = (3x^2 + 1)^5" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            將函數視為合成函數：外函數為 <MathInline math="u^5" />，內函數為 <MathInline math="u = 3x^2 + 1" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            根據連鎖法則：
            <MathBlock math="f'(x) = 5(3x^2 + 1)^4 \cdot \frac{d}{dx}(3x^2 + 1)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            計算內函數的導數：<MathInline math="\frac{d}{dx}(3x^2 + 1) = 6x" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            代入得：
            <MathBlock math="f'(x) = 5(3x^2 + 1)^4 \cdot 6x = 30x(3x^2 + 1)^4" />
          </p>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = 30x(3x^2 + 1)^4" />。
          </p>
        </Solution>
      </Example>

      <Example title="2：指數與三角函數的合成">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="y = e^{\sin x}" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            外函數為 <MathInline math="e^u" />，內函數為 <MathInline math="u = \sin x" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            根據連鎖法則：
            <MathBlock math="\frac{dy}{dx} = e^{\sin x} \cdot \frac{d}{dx}(\sin x)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            計算內函數的導數：<MathInline math="\frac{d}{dx}(\sin x) = \cos x" />
          </p>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="\frac{dy}{dx} = (\cos x)e^{\sin x}" />。
          </p>
        </Solution>
      </Example>

      {/* 2. 隱函數微分 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、隱函數微分 (Implicit Differentiation)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當變數 $x$ 和 $y$ 的關係由方程式（例如 $x^2 + y^2 = 25$）給定時，我們可以在方程式兩邊同時對 $x$ 微分，並將 $y$ 視為 $x$ 的函數，從而利用連鎖法則解出 <MathInline math="y'" /> 或 <MathInline math="\frac{dy}{dx}" />。
      </p>

      <div className="limit-formulas-grid">
        <Definition title="隱函數微分步驟">
          <ol style={{ color: 'var(--text-secondary)', paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
            <li>對方程式等號兩邊同時對 <MathInline math="x" /> 取導數。</li>
            <li>遇到 <MathInline math="y" /> 的項時，根據連鎖法則，必須乘上 <MathInline math="\frac{dy}{dx}" />。</li>
            <li>將所有含有 <MathInline math="\frac{dy}{dx}" /> 的項移到等式的一邊，其餘項移到另一邊。</li>
            <li>提出 <MathInline math="\frac{dy}{dx}" /> 並解出它。</li>
          </ol>
        </Definition>
      </div>

      <Example title="3：圓方程式的隱函數微分">
        <p style={{ color: 'var(--text-secondary)' }}>
          已知方程式 <MathInline math="x^2 + y^2 = 25" />，求 <MathInline math="\frac{dy}{dx}" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 1</strong>：兩邊同時對 <MathInline math="x" /> 微分：
            <MathBlock math="\frac{d}{dx}(x^2 + y^2) = \frac{d}{dx}(25)" />
            <MathBlock math="2x + 2y \cdot \frac{dy}{dx} = 0" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
              （注意：對 <MathInline math="y^2" /> 微分時，使用連鎖法則得到 <MathInline math="2y \cdot y'" />）
            </span>
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 2 & 3</strong>：移項整理：
            <MathBlock math="2y \frac{dy}{dx} = -2x" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟 4</strong>：解出導數：
            <MathBlock math="\frac{dy}{dx} = -\frac{2x}{2y} = -\frac{x}{y}" />
          </p>
          <p>
            <strong>【結論】</strong>：
            隱函數的導數為 <MathInline math="\frac{dy}{dx} = -\frac{x}{y}" />（當 <MathInline math="y \neq 0" /> 時）。
          </p>
        </Solution>
      </Example>

      {/* 3. 反函數微分 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        三、反函數微分 (Derivatives of Inverse Functions)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        若函數 <MathInline math="f" /> 具有反函數 <MathInline math="f^{-1}" />，且 <MathInline math="f'(f^{-1}(x)) \neq 0" />，我們可以利用連鎖法則或隱函數微分來求出反函數的導數。
      </p>

      <div className="limit-formulas-grid">
        <Definition title="反函數定理 (Inverse Function Theorem)">
          <div style={subCardStyle}>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
              反函數的導數公式
            </span>
            <p style={{ color: 'var(--text-secondary)' }}>設 <MathInline math="y = f^{-1}(x)" />，則 <MathInline math="x = f(y)" />。對兩邊微分可得：</p>
            <MathBlock math="(f^{-1})'(x) = \frac{1}{f'(f^{-1}(x))} \quad \text{或} \quad \frac{dy}{dx} = \frac{1}{\frac{dx}{dy}}" />
          </div>
        </Definition>
      </div>

      <Example title="4：反函數的求導">
        <p style={{ color: 'var(--text-secondary)' }}>
          已知 <MathInline math="f(x) = x^3 + x" />，求其反函數在 <MathInline math="x=2" /> 處的導數，即 <MathInline math="(f^{-1})'(2)" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            首先，我們需要找到 <MathInline math="f^{-1}(2)" /> 的值。令 <MathInline math="f(y) = 2" />：
            <MathBlock math="y^3 + y = 2" />
            透過觀察可發現當 <MathInline math="y = 1" /> 時，等式成立，因此 <MathInline math="f^{-1}(2) = 1" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            接著，計算原函數的導函數：
            <MathBlock math="f'(x) = 3x^2 + 1" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            套用反函數定理：
            <MathBlock math="(f^{-1})'(2) = \frac{1}{f'(f^{-1}(2))} = \frac{1}{f'(1)}" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            計算 <MathInline math="f'(1)" />：
            <MathBlock math="f'(1) = 3(1)^2 + 1 = 4" />
          </p>
          <p>
            <strong>【結論】</strong>：
            反函數在 <MathInline math="x=2" /> 的導數為 <MathInline math="\frac{1}{4}" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 利用連鎖法則計算：
            <MathBlock math="f(x) = \sqrt{x^3 + 1}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：寫成指數形式 <MathInline math="(x^3+1)^{1/2}" />。答案為：<MathInline math="f'(x) = \frac{3x^2}{2\sqrt{x^3+1}}" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 使用隱函數微分求 <MathInline math="\frac{dy}{dx}" />：
            <MathBlock math="x^3 + y^3 = 6xy" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：等號右邊需要使用乘法法則。答案為：<MathInline math="\frac{dy}{dx} = \frac{2y - x^2}{y^2 - 2x}" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

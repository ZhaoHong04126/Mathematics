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

export default function Calculus_3_2() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在上一節中，我們定義了函數在單一特定點 <MathInline math="x = a" /> 處的導數。如果我們將這個點視為一個可以自由變動的變數 <MathInline math="x" />，那麼對每一個能計算出導數的 <MathInline math="x" />，都對應著一個新的導數值。這就產生了一個全新的函數，稱為該函數的<strong>導函數（Derivative Function）</strong>，簡稱<strong>導數</strong>。本單元將深入探討導函數的數學定義，並釐清函數的「可微性」與「連續性」之間至關重要的關聯。
      </p>

      {/* 導函數的定義 */}
      <Definition title="導函數 (The Derivative Function)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 在某區間內有定義。對於區間內任意使極限存在的實數 <MathInline math="x" />，我們定義 <MathInline math="f" /> 的<strong>導函數 (Derivative Function)</strong>，記作 <MathInline math="f'" />，其函數值為：
        </p>
        <MathBlock math="f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}" />
        <p style={{ margin: '14px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          導函數 <MathInline math="f'" /> 的定義域為所有使上述極限存在的實數 <MathInline math="x" /> 的集合。顯然，<MathInline math="f'" /> 的定義域是原函數 <MathInline math="f" /> 定義域的子集（即 <MathInline math="\text{Dom}(f') \subseteq \text{Dom}(f)" />）。
        </p>
      </Definition>

      {/* 可微性的定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        可微性的定義 (Definition of Differentiability)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        有了導函數的概念後，我們可以將「可微」的定義從一個點推廣到整個區間：
      </p>

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
          <span>🔍 區間可微性 (Differentiability on an Interval)</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li>
              <strong>在點可微：</strong> 若導數 <MathInline math="f'(a)" /> 存在，則稱函數 <MathInline math="f" /> 在點 <MathInline math="a" /> 處<strong>可微 (Differentiable at a)</strong>。
            </li>
            <li>
              <strong>在開區間可微：</strong> 若函數 <MathInline math="f" /> 在開區間 <MathInline math="(a, b)" /> 內每一個數值處皆可微，則稱其在<strong>開區間 <MathInline math="(a, b)" /> 內可微</strong>。
            </li>
            <li>
              <strong>在閉區間可微：</strong> 若函數 <MathInline math="f" /> 在開區間 <MathInline math="(a, b)" /> 內可微，且在端點處的單側極限（右導數與左導數）存在：
              <MathBlock math="f'_+(a) = \lim_{h \to 0^+} \frac{f(a+h)-f(a)}{h} \quad \text{與} \quad f'_-(b) = \lim_{h \to 0^-} \frac{f(b+h)-f(b)}{h}" />
              則稱 <MathInline math="f" /> 在<strong>閉區間 <MathInline math="[a, b]" /> 內可微</strong>。
            </li>
          </ul>
        </div>
      </div>

      {/* 可微必連續定理 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        可微與連續的關係 (Differentiability vs. Continuity)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在微積分中，可微性是一個比連續性更強大的性質。它們之間的關係由以下重要定理所揭示：
      </p>

      <Theorem title="可微必連續定理 (Differentiability Implies Continuity)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          若函數 <MathInline math="f" /> 在點 <MathInline math="a" /> 處可微，則 <MathInline math="f" /> 在點 <MathInline math="a" /> 處必定連續。
        </p>
        
        <Proof title="點擊展開定理證明">
          <div style={{ marginBottom: '10px' }}>
            要證明 <MathInline math="f" /> 在點 <MathInline math="a" /> 處連續，根據極限定義，我們只需要證明：
            <MathBlock math="\lim_{x \to a} f(x) = f(a) \iff \lim_{x \to a} [f(x) - f(a)] = 0" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            由於 <MathInline math="f" /> 在點 <MathInline math="a" /> 可微，這意味著以下極限值存在且等於導數：
            <MathBlock math="\lim_{x \to a} \frac{f(x) - f(a)}{x - a} = f'(a)" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            當 <MathInline math="x \ne a" /> 時，我們可以進行恆等變形，寫出以下乘積形式：
            <MathBlock math="f(x) - f(a) = \frac{f(x) - f(a)}{x - a} \cdot (x - a)" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            兩邊同時取當 <MathInline math="x \to a" /> 時的極限，並利用極限的乘法則：
            <MathBlock math="\lim_{x \to a} [f(x) - f(a)] = \lim_{x \to a} \left[ \frac{f(x) - f(a)}{x - a} \cdot (x - a) \right]" />
            <MathBlock math="= \left( \lim_{x \to a} \frac{f(x) - f(a)}{x - a} \right) \cdot \left( \lim_{x \to a} (x - a) \right)" />
            <MathBlock math="= f'(a) \cdot 0 = 0" />
          </div>
          <p>
            因此，我們證得了 <MathInline math="\lim_{x \to a} [f(x) - f(a)] = 0" />，即 <MathInline math="\lim_{x \to a} f(x) = f(a)" />。
            這說明函數 <MathInline math="f" /> 在 <MathInline math="x = a" /> 處連續。<span style={{ float: 'right' }}>■</span>
          </p>
        </Proof>
      </Theorem>

      {/* 重要觀念警告卡片 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(245, 158, 11, 0.04)',
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
          <span>⚠️ 逆命題不成立：連續不一定可微！</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.7' }}>
            「可微必定連續」的逆命題是<strong>不成立</strong>的。也就是說，一個函數在某點可能是連續的，但在該點卻不可微。
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            最著名的反例是絕對值函數 <MathInline math="f(x) = |x|" /> 在 <MathInline math="x = 0" /> 處的狀況。該函數在原點的圖形是一個連續的「V」字形（沒有斷點），但由於該處是一個尖銳的轉折點，我們無法在該點畫出唯一的切線，因此它在 <MathInline math="x = 0" /> 處不可微（詳細推導請見後文例題 2）。
          </p>
        </div>
      </div>

      {/* 不可微點的幾何特徵 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        不可微點的幾何特徵 (How a Function Fails to Be Differentiable)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        幾何上，如果函數的圖形是「光滑的（Smooth）」，那麼它就是可微的。當函數圖形出現以下三種幾何特徵時，函數在該點會<strong>不可微</strong>：
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', margin: '24px 0' }}>
        {/* 1. 角點與尖點 */}
        <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
          <span style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px', fontSize: '1.1rem' }}>
            1. 角點與尖點 (Corners and Cusps)
          </span>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            當圖形突然急遽轉折，形成一個「角」。此時，自左側趨近的割線斜率極限（左導數）不等於自右側趨近的割線斜率極限（右導數）。
            <br />
            <em>例如：<MathInline math="f(x) = |x|" /> 在 <MathInline math="x=0" /> 處（角點）；以及 <MathInline math="f(x) = x^{2/3}" /> 在 <MathInline math="x=0" /> 處（尖點）。</em>
          </p>
        </div>

        {/* 2. 不連續點 */}
        <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
          <span style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px', fontSize: '1.1rem' }}>
            2. 不連續點 (Discontinuities)
          </span>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            根據「可微必連續」的逆否命題，<strong>「不連續則不可微」</strong>。若函數在某點不連續（如跳躍、無窮或可去不連續點），則它在該點必定不可微。
          </p>
        </div>

        {/* 3. 垂直切線 */}
        <div style={{ padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'rgba(255, 255, 255, 0.01)' }}>
          <span style={{ fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px', fontSize: '1.1rem' }}>
            3. 垂直切線 (Vertical Tangents)
          </span>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            當圖形在某點變得極度陡峭，割線斜率的極限趨近於正無窮大或負無窮大（即 <MathInline math="\lim_{h\to 0} \frac{f(a+h)-f(a)}{h} = \pm\infty" />）。此時該點存在垂直切線，但斜率未定義（不是實數），故為不可微。
            <br />
            <em>例如：立方根函數 <MathInline math="f(x) = x^{1/3}" /> 在原點 <MathInline math="x = 0" /> 處。</em>
          </p>
        </div>
      </div>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：利用極限定義求分式導函數">
        <p style={{ color: 'var(--text-secondary)' }}>
          設函數 <MathInline math="f(x) = \frac{1}{x}" />，其定義域為 <MathInline math="\{x \in \mathbb{R} \mid x \ne 0\}" />。試利用極限定義求其導函數 <MathInline math="f'(x)" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            根據導函數的極限定義，在定義域內任意 <MathInline math="x \ne 0" /> 處，我們有：
            <MathBlock math="f'(x) = \lim_{h \to 0} \frac{f(x + h) - f(x)}{h}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            代入函數表達式：
            <MathBlock math="f'(x) = \lim_{h \to 0} \frac{\frac{1}{x+h} - \frac{1}{x}}{h}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            將分子進行通分整理：
            <MathBlock math="\frac{1}{x+h} - \frac{1}{x} = \frac{x - (x+h)}{x(x+h)} = \frac{-h}{x(x+h)}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            代回原極限式。由於極限討論中 <MathInline math="h \to 0" /> 代表 <MathInline math="h \ne 0" />，因此我們可以約去分子與分母中的公因子 <MathInline math="h" />：
            <MathBlock math="f'(x) = \lim_{h \to 0} \frac{\frac{-h}{x(x+h)}}{h} = \lim_{h \to 0} \frac{-h}{h \cdot x(x+h)} = \lim_{h \to 0} \frac{-1}{x(x+h)}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            此時直接代入 <MathInline math="h = 0" /> 求極限值：
            <MathBlock math="f'(x) = \frac{-1}{x(x + 0)} = -\frac{1}{x^2}" />
          </div>
          <p>
            <strong>【結論】</strong>：倒數函數的導函數為 <MathInline math="f'(x) = -\frac{1}{x^2}" />。其導函數的定義域與原函數完全相同，均為 <MathInline math="x \ne 0" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：證明絕對值函數在原點不可微">
        <p style={{ color: 'var(--text-secondary)' }}>
          證明連續函數 <MathInline math="f(x) = |x|" /> 在 <MathInline math="x = 0" /> 處不可微。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            我們需要檢驗在 <MathInline math="x = 0" /> 處的導數極限是否存在：
            <MathBlock math="f'(0) = \lim_{h \to 0} \frac{f(0 + h) - f(0)}{h} = \lim_{h \to 0} \frac{|h| - |0|}{h} = \lim_{h \to 0} \frac{|h|}{h}" />
          </div>
          <p style={{ marginBottom: '10px' }}>
            由於絕對值函數具有方向性特徵，我們必須分別考慮左極限與右極限（即左導數與右導數）：
          </p>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            <li>
              <strong>右導數 (Right-hand derivative)：</strong> 當 <MathInline math="h \to 0^+" /> 時，我們有 <MathInline math="h > 0" />，此時 <MathInline math="|h| = h" />。
              <MathBlock math="f'_+(0) = \lim_{h \to 0^+} \frac{h}{h} = 1" />
            </li>
            <li>
              <strong>左導數 (Left-hand derivative)：</strong> 當 <MathInline math="h \to 0^-" /> 時，我們有 <MathInline math="h < 0" />，此時 <MathInline math="|h| = -h" />。
              <MathBlock math="f'_-(0) = \lim_{h \to 0^-} \frac{-h}{h} = -1" />
            </li>
          </ol>
          <p style={{ marginBottom: '10px' }}>
            <strong>【結論】</strong>：
            因為左極限與右極限不相等（<MathInline math="f'_-(0) = -1 \ne f'_+(0) = 1" />），故該極限不存在。
            因此，絕對值函數 <MathInline math="f(x) = |x|" /> 在點 <MathInline math="x = 0" /> 處不可微。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：分段函數在分界點的連續性與可微性">
        <p style={{ color: 'var(--text-secondary)' }}>
          設分段函數如下，試分析其在分界點 <MathInline math="x = 1" /> 處的連續性與可微性：
        </p>
        <MathBlock math="f(x) = \begin{cases} x^2 & \text{if } x \le 1 \\ 2x - 1 & \text{if } x > 1 \end{cases}" />
        <Solution>
          <p style={{ marginBottom: '12px' }}>
            <strong>【第一步：檢驗在 x = 1 處的連續性】</strong>：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <li>函數值：<MathInline math="f(1) = 1^2 = 1" />。</li>
            <li>左極限：<MathInline math="\lim_{x \to 1^-} f(x) = \lim_{x \to 1^-} x^2 = 1^2 = 1" />。</li>
            <li>右極限：<MathInline math="\lim_{x \to 1^+} f(x) = \lim_{x \to 1^+} (2x - 1) = 2(1) - 1 = 1" />。</li>
          </ul>
          <p style={{ marginBottom: '16px' }}>
            由於左右極限相等且等於函數值，即 <MathInline math="\lim_{x \to 1} f(x) = f(1) = 1" />，故 <strong><MathInline math="f" /> 在 <MathInline math="x = 1" /> 處連續</strong>。
          </p>

          <p style={{ marginBottom: '12px' }}>
            <strong>【第二步：檢驗在 x = 1 處的可微性】</strong>：
            我們需要檢驗導數定義中的左右極限是否一致。
          </p>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
            1. 左導數 (從左側逼近，使用上段函數 <MathInline math="x \le 1" />)：
          </p>
          <MathBlock math="f'_-(1) = \lim_{h \to 0^-} \frac{f(1 + h) - f(1)}{h} = \lim_{h \to 0^-} \frac{(1+h)^2 - 1^2}{h}" />
          <MathBlock math="= \lim_{h \to 0^-} \frac{1 + 2h + h^2 - 1}{h} = \lim_{h \to 0^-} (2 + h) = 2" />
          
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginTop: '14px' }}>
            2. 右導數 (從右側逼近，使用下段函數 <MathInline math="x > 1" />)：
          </p>
          <MathBlock math="f'_+(1) = \lim_{h \to 0^+} \frac{f(1 + h) - f(1)}{h} = \lim_{h \to 0^+} \frac{[2(1+h) - 1] - 1}{h}" />
          <MathBlock math="= \lim_{h \to 0^+} \frac{2 + 2h - 2}{h} = \lim_{h \to 0^+} 2 = 2" />

          <p style={{ marginTop: '16px', lineHeight: '1.8' }}>
            <strong>【結論】</strong>：
            因為左導數與右導數均存在且相等（<MathInline math="f'_-(1) = f'_+(1) = 2" />），所以在 <MathInline math="x = 1" /> 處的極限值存在，導數值為 <MathInline math="f'(1) = 2" />。
            因此，該函數在分界點 <strong><MathInline math="x = 1" /> 處是可微的</strong>。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 利用導函數極限定義，求根式函數 <MathInline math="f(x) = \sqrt{x+1}" />（定義域為 <MathInline math="x \ge -1" />）在 <MathInline math="x > -1" /> 時的導函數 <MathInline math="f'(x)" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：使用分子有理化，約去 <MathInline math="h" />。答案：<MathInline math="f'(x) = \frac{1}{2\sqrt{x+1}}" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 證明立方根函數 <MathInline math="f(x) = x^{1/3}" /> 在點 <MathInline math="x = 0" /> 處連續，但在該點不可微。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：利用定義求導數極限，發現極限值趨於 <MathInline math="\infty" />，代表該點有垂直切線。此時函數連續但不可微。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

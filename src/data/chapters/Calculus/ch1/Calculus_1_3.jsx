import { Definition, Example, Solution, MathInline, MathBlock } from '../../../../components/MathBlocks';

export default function Ch1_1_3() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在數學中，我們可以透過「合成」將多個簡單函數組合為更複雜的函數；相反地，當我們已知一個函數的對應關係時，我們有時會想進行「逆向操作」——即從輸出找回原本的輸入，這就引進了反函數的概念。本單元將詳細探討合成函數的建構與定義域限制，以及反函數的存在條件與求解方法。
      </p>

      {/* 一、合成函數 */}
      <Definition title="合成函數 (Composite Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          給定兩個函數 <MathInline math="f" /> 與 <MathInline math="g" />，其<strong>合成函數</strong> <MathInline math="f \circ g" />（讀作「<MathInline math="f" /> 合成 <MathInline math="g" />」）定義為：
        </p>
        <MathBlock math="(f \circ g)(x) = f(g(x))" />
        
        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          定義域與運作機制 (Domain & Mechanism)：
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '12px' }}>
          合成函數 <MathInline math="f(g(x))" /> 的運作就像是一個兩級流水線機器：輸入 <MathInline math="x" /> 先進入內部函數 <MathInline math="g" /> 得到輸出 <MathInline math="g(x)" />，接著該輸出再做為輸入進入外部函數 <MathInline math="f" />。
          <br />
          因此，<MathInline math="f \circ g" /> 的定義域為：所有使得 <MathInline math="g(x)" /> 有定義，且 <MathInline math="g(x)" /> 的值必須落在 <MathInline math="f" /> 的定義域內的自變數 <MathInline math="x" /> 之集合。
        </p>
        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--border-color)',
          fontSize: '0.92rem',
          color: 'var(--text-secondary)'
        }}>
          ⚠️ <strong>重要性質：不可交換性 (Non-commutativity)</strong>
          <br />
          在一般情況下，函數的合成<strong>不滿足交換律</strong>，即：
          <MathBlock math="f \circ g \neq g \circ f" />
          兩者合成的順序與結果通常截然不同。
        </div>
      </Definition>

      {/* 二、一對一函數與水平線檢驗法 */}
      <Definition title="一對一函數 (One-to-One Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          一個函數 <MathInline math="f" /> 稱為<strong>一對一函數</strong>，是指它不會將兩個不同的輸入對應到同一個輸出值：
        </p>
        <MathBlock math="\text{若 } x_1 \neq x_2 \implies f(x_1) \neq f(x_2)" />
        
        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          水平線檢驗法 (Horizontal Line Test)：
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          在幾何上，一個平面圖形是一個一對一函數的圖形，若且唯若<strong>沒有任何一條水平線與該圖形相交多於一個點</strong>。
          <br />
          - <em>例如：<MathInline math="f(x) = x^3" /> 是對稱通過原點的上升曲線，任意水平線與其最多交於一點，為一對一函數。</em>
          <br />
          - <em>例如：拋物線 <MathInline math="f(x) = x^2" /> 不是一對一函數，因為水平線 <MathInline math="y = 4" /> 會同時與圖形交於 <MathInline math="x = 2" /> 和 <MathInline math="x = -2" /> 兩點。</em>
        </p>
      </Definition>

      {/* 二、反函數的數學定義與取消性質 */}
      <Definition title="反函數的定義 (Definition of Inverse Function)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設 <MathInline math="f" /> 為一個定義域為 <MathInline math="A" />、值域為 <MathInline math="B" /> 的<strong>一對一函數</strong>。則其<strong>反函數</strong> <MathInline math="f^{-1}" /> 的定義域為 <MathInline math="B" />、值域為 <MathInline math="A" />，且滿足：
        </p>
        <MathBlock math="f^{-1}(y) = x \iff f(x) = y \quad (\text{對任意 } y \in B)" />
        
        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          取消性質 (Cancellation Equations)：
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          函數與其反函數具有互逆的消除作用：
        </p>
        <MathBlock math="f^{-1}(f(x)) = x \quad (\text{對所有 } x \in A)" />
        <MathBlock math="f(f^{-1}(x)) = x \quad (\text{對所有 } x \in B)" />
      </Definition>

      {/* 三、反函數的幾何特徵 */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          反函數的幾何對稱性 (Geometric Symmetry)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            若點 <MathInline math="(a, b)" /> 落在函數 <MathInline math="f" /> 的圖形上，即 <MathInline math="f(a) = b" />。
            <br />
            根據反函數定義，這代表 <MathInline math="f^{-1}(b) = a" />，即點 <MathInline math="(b, a)" /> 必然落在反函數 <MathInline math="f^{-1}" /> 的圖形上。
            <br />
            由於點 <MathInline math="(a, b)" /> 與點 <MathInline math="(b, a)" /> 互為關於直線 <MathInline math="y = x" /> 的對稱點，因此：
            <br />
            <strong style={{ color: 'var(--text-primary)' }}>
              反函數 <MathInline math="f^{-1}" /> 的圖形，是由原函數 <MathInline math="f" /> 的圖形以對稱軸直線 <MathInline math="y = x" /> 進行鏡像反射（對折）後得到的。
            </strong>
          </p>
        </div>
      </div>

      {/* 四、求解反函數的步驟 */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
          求解反函數的標準步驟 (Steps to Find the Inverse)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <li>
              <strong>第一步：</strong>設原本的關係式為 <MathInline math="y = f(x)" />。
            </li>
            <li>
              <strong>第二步：</strong>利用代數運算，將該方程式改寫為用 <MathInline math="y" /> 表達 <MathInline math="x" /> 的形式，即解出 <MathInline math="x = f^{-1}(y)" />。
            </li>
            <li>
              <strong>第三步：</strong>為了習慣上將自變數寫為 <MathInline math="x" />，將變數 <MathInline math="x" /> 與 <MathInline math="y" /> 互換，得到 <MathInline math="y = f^{-1}(x)" />。
            </li>
          </ol>
        </div>
      </div>

      {/* 典型例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        觀念探討與典型例題
      </h3>

      {/* 例題 1 */}
      <Example title="1：合成函數的求解與定義域">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設函數 <MathInline math="f(x) = \sqrt{x}" />，其定義域為 <MathInline math="[0, \infty)" />；函數 <MathInline math="g(x) = 2 - x" />，其定義域為全體實數。
          <br />
          (1) 求合成函數 <MathInline math="(f \circ g)(x)" /> 及其定義域。
          <br />
          (2) 求合成函數 <MathInline math="(g \circ f)(x)" /> 及其定義域。
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (1) 求解 (f ∘ g)(x) 及其定義域：
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            根據合成定義：
            <MathBlock math="(f \circ g)(x) = f(g(x)) = f(2 - x) = \sqrt{2 - x}" />
          </div>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            為了使此根式有意義，根號內的值必須大於或等於零：
            <MathBlock math="2 - x \ge 0 \implies x \le 2" />
          </div>
          <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            因此，合成函數 <MathInline math="(f \circ g)(x) = \sqrt{2 - x}" />，其定義域為 <strong><MathInline math="(-\infty, 2]" /></strong>。
          </p>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (2) 求解 (g ∘ f)(x) 及其定義域：
          </p>
          <div style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            根據合成定義：
            <MathBlock math="(g \circ f)(x) = g(f(x)) = g(\sqrt{x}) = 2 - \sqrt{x}" />
          </div>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            自變數 <MathInline math="x" /> 首先必須落在內部函數 <MathInline math="f(x)" /> 的定義域內，即 <MathInline math="x \ge 0" />。
            而外部函數 <MathInline math="g(t) = 2 - t" /> 的定義域為全體實數，故無額外限制。
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            因此，合成函數 <MathInline math="(g \circ f)(x) = 2 - \sqrt{x}" />，其定義域為 <strong><MathInline math="[0, \infty)" /></strong>。
            <br />
            <em>（註：這展示了 <MathInline math="f \circ g \neq g \circ f" />，兩者的對應關係與定義域皆不相同）</em>
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：求有理分式函數的反函數">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設函數 <MathInline math="f(x) = \frac{2x + 3}{x - 1} \quad (x \neq 1)" />：
          <br />
          (1) 驗證此函數是否為一對一函數。
          <br />
          (2) 求出其反函數 <MathInline math="f^{-1}(x)" />，並求出反函數的定義域與值域。
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (1) 驗證一對一函數：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            設對定義域內的任意兩點 <MathInline math="x_1, x_2" />，若滿足 <MathInline math="f(x_1) = f(x_2)" />：
          </p>
          <MathBlock math="\frac{2x_1 + 3}{x_1 - 1} = \frac{2x_2 + 3}{x_2 - 1}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            交叉相乘展開整理：
          </p>
          <MathBlock math="(2x_1 + 3)(x_2 - 1) = (2x_2 + 3)(x_1 - 1)" />
          <MathBlock math="2x_1 x_2 - 2x_1 + 3x_2 - 3 = 2x_1 x_2 - 2x_2 + 3x_1 - 3" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            消去相同項 <MathInline math="2x_1 x_2" /> 與 <MathInline math="-3" />：
          </p>
          <MathBlock math="-2x_1 + 3x_2 = -2x_2 + 3x_1 \implies 5x_2 = 5x_1 \implies x_1 = x_2" />
          <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            因此，由 <MathInline math="f(x_1) = f(x_2) \implies x_1 = x_2" /> 得知，該函數是一對一函數。
          </p>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '6px' }}>
            (2) 求解反函數：
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            令 <MathInline math="y = \frac{2x + 3}{x - 1}" />，兩邊同乘分母 <MathInline math="(x-1)" /> 以求解 <MathInline math="x" />：
          </p>
          <MathBlock math="y(x - 1) = 2x + 3 \implies yx - y = 2x + 3" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將含 <MathInline math="x" /> 的項移到等號左邊，其餘項移到右邊：
          </p>
          <MathBlock math="yx - 2x = y + 3 \implies x(y - 2) = y + 3" />
          <MathBlock math="x = \frac{y + 3}{y - 2}" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將變數 <MathInline math="x" /> 與 <MathInline math="y" /> 互換，得到反函數為：
          </p>
          <MathBlock math="f^{-1}(x) = \frac{x + 3}{x - 2}" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            - <strong>定義域 (Domain)：</strong>由於分母不能為零，反函數的定義域為 <strong><MathInline math="\{x \mid x \neq 2\}" /></strong>（即原本函數的值域）。
            <br />
            - <strong>值域 (Range)：</strong>即原本函數的定義域，為 <strong><MathInline math="\{y \mid y \neq 1\}" /></strong>。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：求限制定義域的根式函數反函數">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設函數 <MathInline math="f(x) = \sqrt{x - 1}" />，其定義域為 <MathInline math="[1, \infty)" />。
          <br />
          試求其反函數 <MathInline math="f^{-1}(x)" /> 並標示其定義域。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            先確定原函數 <MathInline math="f" /> 的值域。當 <MathInline math="x \ge 1" /> 時，根號的值恆大於或等於零，故值域為 <MathInline math="[0, \infty)" />。
            <br />
            令 <MathInline math="y = \sqrt{x - 1} \quad (y \ge 0)" />。
          </p>
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            兩邊平方解出 <MathInline math="x" />：
          </p>
          <MathBlock math="y^2 = x - 1 \implies x = y^2 + 1" />
          <p style={{ marginBottom: '10px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            互換變數得到反函數的表達式：
          </p>
          <MathBlock math="f^{-1}(x) = x^2 + 1" />
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            請注意，反函數的定義域即為原函數的值域，因此必須標記限制條件。
            <br />
            故反函數為 <strong><MathInline math="f^{-1}(x) = x^2 + 1 \quad (x \ge 0)" /></strong>。
            <br />
            <em>（註：若不加上 <MathInline math="x \ge 0" /> 的限制，完整的二次函數 <MathInline math="y = x^2 + 1" /> 在實數域上並非一對一函數，也就不存在對應的反函數）</em>
          </p>
        </Solution>
      </Example>
    </div>
  );
}
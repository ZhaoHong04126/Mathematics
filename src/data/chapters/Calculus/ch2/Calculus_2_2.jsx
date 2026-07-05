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

export default function Calculus_2_2() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在上一節中，我們用「逼近」、「靠近」等直觀詞彙來理解極限。然而，這些詞彙在嚴謹的數學推導中不夠精確。為了消除模糊性，十九世紀以柯西 (Cauchy) 為首的數學家們開始嘗試引入嚴格定義，並最終由魏爾斯特拉斯 (Weierstrass) 確立了極限的嚴格 <MathInline math="\varepsilon-\delta" /> 定義。有了這個定義，我們不僅能嚴格論證單點的極限，更能將本節所介紹的各種「運算法則」與「夾擠定理」給予完美的證明。
      </p>

      {/* 嚴格定義卡片 */}
      <Definition title="極限的嚴格定義 (Epsilon-Delta Definition)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          為了克服直觀定義中「愈來愈接近」這種模糊的用詞，數學家發展了嚴密的 <MathInline math="\epsilon - \delta" /> (Epsilon-Delta) 定義：
        </p>
        <MathBlock math="\forall \epsilon > 0, \exists \delta > 0 \quad \text{such that} \quad 0 < |x - a| < \delta \implies |f(x) - L| < \epsilon" />
        
        <p style={{ margin: '14px 0', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: '1.7' }}>
          "For all (every) <MathInline math="\epsilon > 0" />, there exists a <MathInline math="\delta > 0" />, such that <MathInline math="0 < |x - a| < \delta" />, then <MathInline math="|f(x) - L| < \epsilon" />. We say that the limit of <MathInline math="f(x)" /> as <MathInline math="x" /> approaches <MathInline math="a" /> is <MathInline math="L" />, and we write <MathInline math="\lim_{x \to a} f(x) = L" />."
        </p>
        
        <div style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--border-color)'
        }}>
          <span style={{ fontWeight: '700', color: 'var(--accent-secondary)', display: 'block', marginBottom: '8px' }}>
            📍 白話文解釋：
          </span>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <strong>對於任意給定的誤差容忍度 <MathInline math="\epsilon > 0" />：</strong> 無論你要求函數值 <MathInline math="f(x)" /> 與極限值 <MathInline math="L" /> 的差距有多小，
            </li>
            <li>
              <strong>必定能找到一個對應的範圍限制 <MathInline math="\delta > 0" />：</strong>
            </li>
            <li>
              使得只要自變數 <MathInline math="x" /> 與 <MathInline math="a" /> 的距離小於 <MathInline math="\delta" /> 且不等於 <MathInline math="a" />（即 <MathInline math="0 < |x - a| < \delta" />），
            </li>
            <li>
              函數值 <MathInline math="f(x)" /> 就<strong>一定會</strong>落在你要求的誤差範圍內（即 <MathInline math="|f(x) - L| < \epsilon" />）。
            </li>
          </ul>
        </div>
      </Definition>

      {/* ε-δ 的幾何意義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        ε-δ 定義的幾何意義與邏輯
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px' }}>
        這個定義在本質上是一個「對手遊戲」：
        <br />
        1. 你的對手拿出一條水平帶，其寬度為 <MathInline math="2\epsilon" />，以 <MathInline math="y = L" /> 為中心（即區間 <MathInline math="(L-\epsilon, L+\epsilon)" />）。
        <br />
        2. 你的任務是找出一個以 <MathInline math="x = a" /> 為中心的垂直帶，其寬度為 <MathInline math="2\delta" />（即區間 <MathInline math="(a-\delta, a+\delta)" />，但不包含 <MathInline math="x = a" /> 點本身）。
        <br />
        3. 當所有落在此垂直帶內的自變數，其對應的函數圖形全部都落在對手給定的水平帶之內時，你就贏了。若無論對手給出多麼窄的水平帶（多麼小的 <MathInline math="\epsilon" />），你永遠都有辦法贏，極限就存在且等於 <MathInline math="L" />。
      </p>

      {/* 單側極限的嚴格定義 */}
      <Definition title="單側極限的嚴格定義 (Rigorous Definition of One-sided Limits)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          當自變數僅從單一方向逼近 <MathInline math="a" /> 時，我們將去心鄰域 <MathInline math="0 < |x - a| < \delta" /> 限制為單側區間，即可得到單側極限的嚴格定義：
        </p>
        
        <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>
          1. 右極限 (Right-hand Limit)
        </h5>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.8' }}>
          我們記為 <MathInline math="\lim_{x \to a^+} f(x) = L" />，其嚴格定義為：
        </p>
        <MathBlock math="\forall \epsilon > 0, \exists \delta > 0 \quad \text{such that} \quad a < x < a + \delta \implies |f(x) - L| < \epsilon" />

        <h5 style={{ color: 'var(--text-primary)', marginTop: '20px', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>
          2. 左極限 (Left-hand Limit)
        </h5>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', lineHeight: '1.8' }}>
          我們記為 <MathInline math="\lim_{x \to a^-} f(x) = L" />，其嚴格定義為：
        </p>
        <MathBlock math="\forall \epsilon > 0, \exists \delta > 0 \quad \text{such that} \quad a - \delta < x < a \implies |f(x) - L| < \epsilon" />
      </Definition>

      {/* 定理：極限存在的充要條件 */}
      <Theorem title="定理：極限存在的充要條件 (Criterion for Limit Existence)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          雙側極限 <MathInline math="\lim_{x \to a} f(x)" /> 存在且等於 <MathInline math="L" /> 的充要條件是，左極限與右極限皆存在且相等。即：
        </p>
        <MathBlock math="\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = L \quad \text{且} \quad \lim_{x \to a^+} f(x) = L" />
      </Theorem>

      {/* 充要條件定理的證明 */}
      <Proof title="證明：極限存在的充要條件">
        <p style={{ marginBottom: '10px', fontWeight: '600', color: 'var(--text-primary)' }}>
          必要性 (⇒)：
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
          已知 <MathInline math="\lim_{x \to a} f(x) = L" />。根據定義，給定任意 <MathInline math="\epsilon > 0" />，存在一個 <MathInline math="\delta > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta" /> 時，恆有 <MathInline math="|f(x) - L| < \epsilon" />。
          由於去心鄰域 <MathInline math="0 < |x - a| < \delta" /> 等價於區間：
          <br />
          <MathInline math="a - \delta < x < a" />（左側）與 <MathInline math="a < x < a + \delta" />（右側）。
          因此：
          <br />
          - 當 <MathInline math="a - \delta < x < a" /> 時，顯然滿足 <MathInline math="|f(x) - L| < \epsilon" />，故左極限 <MathInline math="\lim_{x \to a^-} f(x) = L" /> 成立。
          - 當 <MathInline math="a < x < a + \delta" /> 時，亦顯然滿足 <MathInline math="|f(x) - L| < \epsilon" />，故右極限 <MathInline math="\lim_{x \to a^+} f(x) = L" /> 成立。
        </p>
        <p style={{ marginBottom: '10px', fontWeight: '600', color: 'var(--text-primary)' }}>
          充分性 (⇐)：
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          已知左極限 <MathInline math="\lim_{x \to a^-} f(x) = L" /> 且右極限 <MathInline math="\lim_{x \to a^+} f(x) = L" />。
          給定任意 <MathInline math="\epsilon > 0" />：
          <br />
          - 由左極限定義，存在 <MathInline math="\delta_1 > 0" /> 使得當 <MathInline math="a - \delta_1 < x < a" /> 時，有 <MathInline math="|f(x) - L| < \epsilon" />。
          - 由右極限定義，存在 <MathInline math="\delta_2 > 0" /> 使得當 <MathInline math="a < x < a + \delta_2" /> 時，有 <MathInline math="|f(x) - L| < \epsilon" />。
          <br />
          我們取對應的去心半徑 <MathInline math="\delta = \min(\delta_1, \delta_2) > 0" />。
          當自變數滿足 <MathInline math="0 < |x - a| < \delta" /> 時：
          <br />
          - 若 <MathInline math="x < a" />，則有 <MathInline math="a - \delta < x < a" />。因為 <MathInline math="\delta \le \delta_1" />，故有 <MathInline math="a - \delta_1 < x < a" /> 成立，從而 <MathInline math="|f(x) - L| < \epsilon" />。
          - 若 <MathInline math="x > a" />，則有 <MathInline math="a < x < a + \delta" />。因為 <MathInline math="\delta \le \delta_2" />，故有 <MathInline math="a < x < a + \delta_2" /> 成立，從而 <MathInline math="|f(x) - L| < \epsilon" />。
          <br />
          綜上所述，只要自變數滿足 <MathInline math="0 < |x - a| < \delta" />，不論在其左側或右側，皆恆有 <MathInline math="|f(x) - L| < \epsilon" />。
          <br />
          根據極限的定義，這證明了雙側極限 <MathInline math="\lim_{x \to a} f(x) = L" /> 存在。■
        </p>
      </Proof>

      {/* 嚴格定義的先備知識與基本工具 */}
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
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-secondary)',
          backgroundColor: 'rgba(6, 182, 212, 0.03)'
        }}>
          <span>📖 嚴格定義的先備知識與基本工具</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            在處理更進階的 <MathInline math="\epsilon - \delta" /> 證明時，我們需要熟悉一些常見的數學符號、集合表示法以及不等式工具。
          </p>

          <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>常見的數學及邏輯符號：</h5>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <li>
              <strong>微小與巨大常數</strong>：<MathInline math="\epsilon, \delta" /> 通常用以代表任意微小正實數；而 <MathInline math="M, K" /> 則代表任意很大正實數。
            </li>
            <li>
              <strong>對稱鄰近區域 (Symmetric Neighborhood)</strong>：
              <br />
              表示以 <MathInline math="L" /> 為中心、半徑為 <MathInline math="\epsilon" /> 的開區間：
              <MathBlock math="N_{\epsilon}(L) = (L - \epsilon, L + \epsilon) = \{ f(x) \mid L - \epsilon < f(x) < L + \epsilon \} = \{ f(x) \mid |f(x) - L| < \epsilon \}" />
            </li>
            <li>
              <strong>去心對稱鄰近區域 (Deleted Symmetric Neighborhood)</strong>：
              <br />
              表示圍繞 <MathInline math="a" /> 的區域，但不包含 <MathInline math="a" /> 點本身（即 <MathInline math="x \ne a" />）：
              <MathBlock math="N_{\delta}^*(a) = N_{\delta}'(a) = (a - \delta, a) \cup (a, a + \delta) = \{ x \mid a - \delta < x < a \text{ 或 } a < x < a + \delta \}" />
              <MathBlock math="= \{ x \mid 0 < |x - a| < \delta \}" />
            </li>
            <li>
              <strong>邏輯符號</strong>：
              <ul style={{ paddingLeft: '20px', marginTop: '6px', listStyleType: 'circle', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><MathInline math="\forall" /> : for all (所有的、對於任意)</li>
                <li><MathInline math="\ni" /> 或是 s.t. : such that (使得)</li>
                <li><MathInline math="\exists" /> : exist (存在)</li>
              </ul>
              <div style={{
                marginTop: '10px',
                padding: '10px 14px',
                backgroundColor: 'rgba(245, 158, 11, 0.03)',
                borderLeft: '3px solid var(--accent-warm)',
                borderRadius: '4px',
                fontSize: '0.92rem'
              }}>
                <strong>💡 重點觀念</strong>：<MathInline math="\exists" /> 為「至少有一個」的意思。即若存在一個 <MathInline math="\delta^* > 0" /> 滿足極限定義，則任意小於 <MathInline math="\delta^*" /> 的正數 <MathInline math="\delta" /> 亦滿足極限定義。
                <br />
                <span style={{ fontStyle: 'italic', color: 'var(--text-tertiary)' }}>
                  "In general, if a certain <MathInline math="\delta^*" /> 'works' for a given <MathInline math="\epsilon" />, then any <MathInline math="\delta" /> less than <MathInline math="\delta^*" /> will also work."
                </span>
              </div>
            </li>
          </ul>

          <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: '600' }}>放縮法與不等式基本工具：</h5>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li>
              <strong>以多項式來表示另一多項式</strong>：在證明代數極限時，常利用因式分解或長除法作變形。
            </li>
            <li>
              <strong>收斂範圍的次方放縮</strong>：
              <MathBlock math="0 < \delta \le 1 \implies \delta^n \le \delta \quad (n \in \mathbb{N})" />
            </li>
            <li>
              <strong>交集取極小值 (Min)</strong>：為了同時滿足多個條件，我們常取範圍最小者：
              <MathBlock math="N_{\delta_1}'(a) \cap N_{\delta_2}'(a) = N_{\delta}'(a) \quad \text{其中 } \delta = \min\{\delta_1, \delta_2\}" />
            </li>
            <li>
              <strong>聯集取極大值 (Max)</strong>：對於發散至無窮大的條件，取最遠者：
              <MathBlock math="[k_1, \infty) \cap [k_2, \infty) = [k, \infty) \quad \text{其中 } k = \max\{k_1, k_2\}" />
            </li>
            <li>
              <strong>三角不等式 (Triangular Inequality)</strong>：將複雜的誤差拆分成多個項目的核心工具。
              <MathBlock math="||x| - |y|| \le |x \pm y| \le |x| + |y|" />
              <MathBlock math="|x \pm y \pm z| \le |x| + |y| + |z|" />
            </li>
          </ul>
        </div>
      </div>

      {/* 如何寫證明卡片 */}
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
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-primary)',
          backgroundColor: 'rgba(139, 92, 246, 0.03)'
        }}>
          <span>✍️ 如何寫證明 (How to Write an Epsilon-Delta Proof)</span>
        </div>
        <div style={{ padding: '20px' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            遇到證明題時，我們通常不會一開始就直接寫出正式證明，而是分成<strong>「兩步驟」</strong>來進行：先在草稿紙上反推，再正式寫上卷子。
          </p>

          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '12px' }}>
            {/* Step 1 */}
            <div style={{ 
              flex: '1 1 300px', 
              backgroundColor: 'rgba(255, 255, 255, 0.01)', 
              padding: '16px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)' 
            }}>
              <h5 style={{ color: 'var(--accent-primary)', marginBottom: '10px', fontSize: '0.95rem', fontWeight: '700' }}>
                📝 Step 1: 尋找 <MathInline math="\delta" /> (草稿區)
              </h5>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                這是偷偷計算的過程。我們要從<strong>結果</strong>倒推回<strong>條件</strong>：
              </p>
              <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>從不等式 <MathInline math="|f(x) - L| < \epsilon" /> 開始。</li>
                <li>使用代數技巧（如因式分解、約分、放縮法），將其轉化為 <MathInline math="|x - a| < \text{某個關於 } \epsilon \text{ 的式子}" /> 的形式。</li>
                <li>令 <MathInline math="\delta" /> = 那個算出來的式子。</li>
              </ul>
            </div>
            {/* Step 2 */}
            <div style={{ 
              flex: '1 1 300px', 
              backgroundColor: 'rgba(255, 255, 255, 0.01)', 
              padding: '16px', 
              borderRadius: 'var(--radius-sm)', 
              border: '1px solid var(--border-color)' 
            }}>
              <h5 style={{ color: 'var(--accent-secondary)', marginBottom: '10px', fontSize: '0.95rem', fontWeight: '700' }}>
                🖋️ Step 2: 正式證明 (Formal Proof)
              </h5>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                這才是寫在考卷上的標準格式。必須由<strong>條件</strong>順推至<strong>結果</strong>：
              </p>
              <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>給定 (Given)</strong> 任意 <MathInline math="\epsilon > 0" />。</li>
                <li><strong>我們取 (Choose)</strong> <MathInline math="\delta = \text{(你算出的式子)} > 0" />。</li>
                <li><strong>當 (Whenever)</strong> <MathInline math="0 < |x - a| < \delta" /> 時：</li>
                <li style={{ listStyleType: 'none', paddingLeft: '10px', color: 'var(--text-primary)' }}>
                  <MathInline math="|f(x) - L| = \dots" /> (把推導過程順寫下來) <MathInline math="< \epsilon" />
                </li>
                <li><strong>由極限嚴格定義得證</strong>，<MathInline math="\lim_{x \to a} f(x) = L" />。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ε-δ 實戰證明演練 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        ε-δ 實戰證明演練
      </h3>

      <Example title="線性函數極限的 ε-δ 證明 (實戰範例)">
        <p style={{ color: 'var(--text-secondary)' }}>
          證明極限：
        </p>
        <MathBlock math="\lim_{x \to 3} (2x - 1) = 5" />
        
        <Solution>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
            我們按照「尋找 <MathInline math="\delta" />」與「寫出正式證明」的標準步驟來操作：
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }} className="math-serif">
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>1. 列出誤差條件：</strong>
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>
                我們希望 <MathInline math="|f(x) - L| < \epsilon" />，也就是 <MathInline math="|(2x - 1) - 5| < \epsilon" />。
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>2. 化簡不等式：</strong>
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>
                化簡絕對值內部得到 <MathInline math="|2x - 6| < \epsilon" />。提出公因數 2 得到 <MathInline math="2|x - 3| < \epsilon" />，即 <MathInline math="|x - 3| < \frac{\epsilon}{2}" />。
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>3. 決定 <MathInline math="\delta" /> 的值：</strong>
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>
                配合極限定義中的條件 <MathInline math="0 < |x - a| < \delta" />（即 <MathInline math="0 < |x - 3| < \delta" />），我們取 <MathInline math="\delta = \frac{\epsilon}{2}" />。
              </span>
            </div>
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>4. 寫出正式證明：</strong>
              <br />
              <span style={{ color: 'var(--text-secondary)' }}>
                給定 <MathInline math="\epsilon > 0" />，取 <MathInline math="\delta = \frac{\epsilon}{2} > 0" />。
                當自變數滿足 <MathInline math="0 < |x - 3| < \delta" /> 時：
              </span>
              <MathBlock math="|f(x) - L| = |(2x - 1) - 5| = |2x - 6| = 2|x - 3| < 2\delta = 2\left(\frac{\epsilon}{2}\right) = \epsilon" />
              <span style={{ color: 'var(--text-secondary)', display: 'block', marginTop: '6px' }}>
                故由極限之嚴格定義得知，證明完畢。
              </span>
            </div>
          </div>
          <p style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--accent-primary)', marginTop: '10px' }}>
            ■ 證明完畢
          </p>
        </Solution>
      </Example>

      {/* 極限運算法則 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        極限的基本運算法則 (Limit Laws)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        藉由 <MathInline math="\epsilon-\delta" /> 定義，我們可以證明以下的極限代數運算法則。
      </p>

      <Theorem title="極限的基本運算法則 (Limit Laws)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          設 <MathInline math="c" /> 為常數，且極限 <MathInline math="\lim_{x \to a} f(x) = L" /> 與 <MathInline math="\lim_{x \to a} g(x) = M" /> 皆存在且為實數，則有以下法則：
        </p>
        
        <div className="formulas-grid">
          <div className="formula-card">
            <div className="formula-label">1. 加法與減法法則 (Sum & Difference Law)</div>
            <div className="formula-content" style={{ color: 'var(--text-primary)' }}>
              <MathInline math="\lim_{x \to a} [f(x) \pm g(x)] = L \pm M" />
            </div>
          </div>
          <div className="formula-card">
            <div className="formula-label">2. 常數倍法則 (Constant Multiple Law)</div>
            <div className="formula-content" style={{ color: 'var(--text-primary)' }}>
              <MathInline math="\lim_{x \to a} [c \cdot f(x)] = c \cdot L" />
            </div>
          </div>
          <div className="formula-card">
            <div className="formula-label">3. 乘法法則 (Product Law)</div>
            <div className="formula-content" style={{ color: 'var(--text-primary)' }}>
              <MathInline math="\lim_{x \to a} [f(x) \cdot g(x)] = L \cdot M" />
            </div>
          </div>
          <div className="formula-card">
            <div className="formula-label">4. 除法法則 (Quotient Law)</div>
            <div className="formula-content" style={{ color: 'var(--text-primary)' }}>
              <MathInline math="\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{L}{M} \quad (M \ne 0)" />
            </div>
          </div>
          <div className="formula-card">
            <div className="formula-label">5. 乘方法則 (Power Law)</div>
            <div className="formula-content" style={{ color: 'var(--text-primary)' }}>
              <MathInline math="\lim_{x \to a} [f(x)]^n = L^n \quad (n \in \mathbb{N})" />
            </div>
          </div>
          <div className="formula-card">
            <div className="formula-label">6. 開方法則 (Root Law)</div>
            <div className="formula-content" style={{ color: 'var(--text-primary)' }}>
              <MathInline math="\lim_{x \to a} \sqrt[n]{f(x)} = \sqrt[n]{L}" />
            </div>
          </div>
        </div>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '12px', lineHeight: '1.6' }}>
          * 註：開方法則中，若 <MathInline math="n" /> 為偶數，則要求限制極限值 <MathInline math="L > 0" />。
        </p>
      </Theorem>

      {/* 運算法則的證明 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        運算法則之嚴格 ε-δ 證明 (Proofs of Limit Laws)
      </h4>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        以下我們展示如何利用 <MathInline math="\epsilon - \delta" /> 來證明這些運算法則。
      </p>

      {/* 證明：加法法則 */}
      <Proof title="證明：加法法則 (Sum Law)">
        <p style={{ marginBottom: '10px' }}>
          我們想要證明：若 <MathInline math="\lim_{x \to a} f(x) = L" /> 且 <MathInline math="\lim_{x \to a} g(x) = M" />，則 <MathInline math="\lim_{x \to a} [f(x) + g(x)] = L + M" />。
        </p>
        <p style={{ marginBottom: '10px' }}>
          給定任意的 <MathInline math="\epsilon > 0" />。因為誤差容忍度是任意的，我們可以將其分成兩半 <MathInline math="\frac{\epsilon}{2}" />：
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li>
            由 <MathInline math="\lim_{x \to a} f(x) = L" />，存在一個 <MathInline math="\delta_1 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_1" /> 時，恆有 <MathInline math="|f(x) - L| < \frac{\epsilon}{2}" />。
          </li>
          <li>
            由 <MathInline math="\lim_{x \to a} g(x) = M" />，存在一個 <MathInline math="\delta_2 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_2" /> 時，恆有 <MathInline math="|g(x) - M| < \frac{\epsilon}{2}" />。
          </li>
        </ul>
        <p style={{ marginBottom: '10px' }}>
          現在，為了讓這兩個條件同時成立，我們選擇 <MathInline math="\delta = \min(\delta_1, \delta_2)" />（顯然 <MathInline math="\delta > 0" />）。
        </p>
        <p style={{ marginBottom: '10px' }}>
          當自變數滿足 <MathInline math="0 < |x - a| < \delta" /> 時，利用<strong>三角不等式</strong>，我們有：
        </p>
        <MathBlock math="|[f(x) + g(x)] - [L + M]| = |[f(x) - L] + [g(x) - M]|" />
        <MathBlock math="\le |f(x) - L| + |g(x) - M|" />
        <p style={{ margin: '10px 0' }}>
          因為此時 <MathInline math="|x-a| < \delta_1" /> 且 <MathInline math="|x-a| < \delta_2" /> 同時成立，將不等式代入得：
        </p>
        <MathBlock math="< \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon" />
        <p style={{ marginTop: '10px' }}>
          是以，當 <MathInline math="0 < |x - a| < \delta" /> 時，恆有 <MathInline math="|[f(x) + g(x)] - [L + M]| < \epsilon" />。
          <br />
          根據極限的嚴格定義，加法法則成立。■
        </p>
      </Proof>

      {/* 證明：常數倍法則 */}
      <Proof title="證明：常數倍法則 (Constant Multiple Law)">
        <p style={{ marginBottom: '10px' }}>
          我們想要證明：若 <MathInline math="\lim_{x \to a} f(x) = L" /> 且 <MathInline math="c" /> 為任意常數，則 <MathInline math="\lim_{x \to a} [c \cdot f(x)] = c \cdot L" />。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>【第一部分：當 c = 0 時】</strong>：
          <br />
          此時 <MathInline math="c \cdot f(x) = 0" /> 且 <MathInline math="c \cdot L = 0" />。恆有 <MathInline math="|0 - 0| = 0 < \epsilon" />，極限顯然成立。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>【第二部分：當 c ≠ 0 時】</strong>：
          <br />
          給定任意的 <MathInline math="\epsilon > 0" />。由於 <MathInline math="c \ne 0" />，所以 <MathInline math="|c| > 0" />，因此 <MathInline math="\frac{\epsilon}{|c|} > 0" /> 也是一個合法的正數。
        </p>
        <p style={{ marginBottom: '10px' }}>
          因為 <MathInline math="\lim_{x \to a} f(x) = L" />，必定存在一個 <MathInline math="\delta > 0" />，使得當 <MathInline math="0 < |x - a| < \delta" /> 時，恆有：
        </p>
        <MathBlock math="|f(x) - L| < \frac{\epsilon}{|c|}" />
        <p style={{ margin: '10px 0' }}>
          當自變數滿足 <MathInline math="0 < |x - a| < \delta" /> 時，我們有：
        </p>
        <MathBlock math="|c \cdot f(x) - c \cdot L| = |c \cdot (f(x) - L)| = |c| \cdot |f(x) - L|" />
        <p style={{ margin: '10px 0' }}>
          代入不等式得：
        </p>
        <MathBlock math="< |c| \cdot \frac{\epsilon}{|c|} = \epsilon" />
        <p style={{ marginTop: '10px' }}>
          因此，常數倍法則成立。■
        </p>
      </Proof>

      {/* 證明：乘法法則 */}
      <Proof title="證明：乘法法則 (Product Law)">
        <p style={{ marginBottom: '10px' }}>
          我們想要證明：若 <MathInline math="\lim_{x \to a} f(x) = L" /> 且 <MathInline math="\lim_{x \to a} g(x) = M" />，則 <MathInline math="\lim_{x \to a} [f(x) \cdot g(x)] = L \cdot M" />。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>【分析與技巧】</strong>：考慮差值項並插入交叉項 <MathInline math="L \cdot g(x)" />：
        </p>
        <MathBlock math="f(x)g(x) - LM = f(x)g(x) - Lg(x) + Lg(x) - LM = (f(x) - L)g(x) + L(g(x) - M)" />
        <p style={{ margin: '10px 0' }}>
          利用絕對值與三角不等式，我們有：
        </p>
        <MathBlock math="|f(x)g(x) - LM| \le |g(x)| \cdot |f(x) - L| + |L| \cdot |g(x) - M|" />
        <p style={{ margin: '10px 0' }}>
          因為 <MathInline math="\lim_{x \to a} g(x) = M" />，函數 <MathInline math="g(x)" /> 在 <MathInline math="a" /> 的去心鄰域內是有界的。
          我們取誤差為 1，存在一個 <MathInline math="\delta_0 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_0" /> 時，恆有：
        </p>
        <MathBlock math="|g(x) - M| < 1 \implies |g(x)| < |M| + 1" />
        <p style={{ margin: '10px 0' }}>
          我們令常數正數限制 <MathInline math="B = \max(|L|, |M| + 1)" />。顯然有 <MathInline math="|g(x)| < B" /> 且 <MathInline math="|L| < B" />。
        </p>
        <p style={{ marginBottom: '10px' }}>
          現在給定任意的 <MathInline math="\epsilon > 0" />：
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li>
            由 <MathInline math="\lim_{x \to a} f(x) = L" />，存在 <MathInline math="\delta_1 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_1" /> 時，有 <MathInline math="|f(x) - L| < \frac{\epsilon}{2B}" />。
          </li>
          <li>
            由 <MathInline math="\lim_{x \to a} g(x) = M" />，存在 <MathInline math="\delta_2 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_2" /> 時，有 <MathInline math="|g(x) - M| < \frac{\epsilon}{2B}" />。
          </li>
        </ul>
        <p style={{ marginBottom: '10px' }}>
          我們取對應範圍 <MathInline math="\delta = \min(\delta_0, \delta_1, \delta_2)" />（顯然 <MathInline math="\delta > 0" />）。
        </p>
        <p style={{ marginBottom: '10px' }}>
          當自變數滿足 <MathInline math="0 < |x - a| < \delta" /> 時，同時滿足上述所有不等式，因此有：
        </p>
        <MathBlock math="|f(x)g(x) - LM| \le |g(x)| \cdot |f(x) - L| + |L| \cdot |g(x) - M|" />
        <MathBlock math="< B \cdot \frac{\epsilon}{2B} + B \cdot \frac{\epsilon}{2B} = \frac{\epsilon}{2} + \frac{\epsilon}{2} = \epsilon" />
        <p style={{ marginTop: '10px' }}>
          因此，乘法法則成立。■
        </p>
      </Proof>

      {/* 證明：除法法則 */}
      <Proof title="證明：除法法則 (Quotient Law)">
        <p style={{ marginBottom: '10px' }}>
          我們想要證明：若 <MathInline math="\lim_{x \to a} f(x) = L" /> 且 <MathInline math="\lim_{x \to a} g(x) = M" />（其中 <MathInline math="M \ne 0" />），則 <MathInline math="\lim_{x \to a} \frac{f(x)}{g(x)} = \frac{L}{M}" />。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>【證明技巧】</strong>：我們首先利用 <MathInline math="\epsilon-\delta" /> 證明倒數極限性質：<MathInline math="\lim_{x \to a} \frac{1}{g(x)} = \frac{1}{M}" />。隨後即可結合乘法法則得到結果。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>步驟一：證明 <MathInline math="\lim_{x \to a} \frac{1}{g(x)} = \frac{1}{M}" /></strong>
          <br />
          考慮差值：
        </p>
        <MathBlock math="\left| \frac{1}{g(x)} - \frac{1}{M} \right| = \left| \frac{M - g(x)}{g(x)M} \right| = \frac{|g(x) - M|}{|g(x)| \cdot |M|}" />
        <p style={{ margin: '10px 0' }}>
          為了控制分母中的 <MathInline math="|g(x)|" /> 避免其趨近於零，我們利用極限定義取誤差為 <MathInline math="\epsilon' = \frac{|M|}{2} > 0" />。
          這意味著存在 <MathInline math="\delta_0 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_0" /> 時，恆有：
        </p>
        <MathBlock math="|g(x) - M| < \frac{|M|}{2}" />
        <p style={{ margin: '10px 0' }}>
          根據反三角不等式，此時必有：
        </p>
        <MathBlock math="|g(x)| > |M| - \frac{|M|}{2} = \frac{|M|}{2} \implies \frac{1}{|g(x)|} < \frac{2}{|M|}" />
        <p style={{ margin: '10px 0' }}>
          此時，差值項可以被放大為：
        </p>
        <MathBlock math="\left| \frac{1}{g(x)} - \frac{1}{M} \right| < \frac{2}{|M|^2} \cdot |g(x) - M|" />
        <p style={{ margin: '10px 0' }}>
          現在給定任意的 <MathInline math="\epsilon > 0" />。因為 <MathInline math="\lim_{x \to a} g(x) = M" />，存在一個 <MathInline math="\delta_1 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_1" /> 時，恆有：
        </p>
        <MathBlock math="|g(x) - M| < \frac{|M|^2 \epsilon}{2}" />
        <p style={{ margin: '10px 0' }}>
          我們選擇對應範圍 <MathInline math="\delta = \min(\delta_0, \delta_1)" />（顯然 <MathInline math="\delta > 0" />）。當 <MathInline math="0 < |x - a| < \delta" /> 時，前述不等式同時成立，代入可得：
        </p>
        <MathBlock math="\left| \frac{1}{g(x)} - \frac{1}{M} \right| < \frac{2}{|M|^2} \cdot |g(x) - M| < \frac{2}{|M|^2} \cdot \left(\frac{|M|^2 \epsilon}{2}\right) = \epsilon" />
        <p style={{ margin: '10px 0' }}>
          這完成了倒數極限的證明。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>步驟二：結合乘法法則</strong>
          <br />
          利用已經證明的乘法法則，我們有：
        </p>
        <MathBlock math="\lim_{x \to a} \frac{f(x)}{g(x)} = \lim_{x \to a} \left[ f(x) \cdot \frac{1}{g(x)} \right] = \lim_{x \to a} f(x) \cdot \lim_{x \to a} \frac{1}{g(x)} = L \cdot \frac{1}{M} = \frac{L}{M}" />
        <p style={{ marginTop: '10px' }}>
          因此，除法法則成立。■
        </p>
      </Proof>

      {/* 證明：乘方法則 */}
      <Proof title="證明：乘方法則 (Power Law)">
        <p style={{ marginBottom: '10px' }}>
          我們想要證明：若 <MathInline math="\lim_{x \to a} f(x) = L" />，則對任意正整數 <MathInline math="n \in \mathbb{N}" />，皆有 <MathInline math="\lim_{x \to a} [f(x)]^n = L^n" />。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>【證明方法】</strong>：我們可以利用<strong>數學歸納法 (Mathematical Induction)</strong> 與已證明的「乘法法則」來進行證明。
        </p>
        <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
          1. 奠基步驟 (Base Case)：
        </p>
        <p style={{ textIndent: '1em', color: 'var(--text-secondary)' }}>
          當 <MathInline math="n = 1" /> 時，等式為 <MathInline math="\lim_{x \to a} [f(x)]^1 = L^1" />，此式顯然由已知條件 <MathInline math="\lim_{x \to a} f(x) = L" /> 成立。
        </p>
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginTop: '10px' }}>
          2. 歸納假設與步驟 (Inductive Step)：
        </p>
        <p style={{ textIndent: '1em', color: 'var(--text-secondary)' }}>
          假設當 <MathInline math="n = k" /> 時命題成立，即假設 <MathInline math="\lim_{x \to a} [f(x)]^k = L^k" />。
          <br />
          現在考慮 <MathInline math="n = k + 1" /> 的情況，我們可以將乘方寫為：
        </p>
        <MathBlock math="[f(x)]^{k+1} = [f(x)]^k \cdot f(x)" />
        <p style={{ margin: '10px 0', color: 'var(--text-secondary)' }}>
          因為 <MathInline math="\lim_{x \to a} [f(x)]^k = L^k" /> 且 <MathInline math="\lim_{x \to a} f(x) = L" /> 皆存在，我們可以直接應用<strong>極限的乘法法則</strong>：
        </p>
        <MathBlock math="\lim_{x \to a} [f(x)]^{k+1} = \lim_{x \to a} \left( [f(x)]^k \cdot f(x) \right) = \left( \lim_{x \to a} [f(x)]^k \right) \cdot \left( \lim_{x \to a} f(x) \right)" />
        <MathBlock math="= L^k \cdot L = L^{k+1}" />
        <p style={{ marginTop: '10px', color: 'var(--text-secondary)' }}>
          是以，當 <MathInline math="n = k + 1" /> 時命題亦成立。
        </p>
        <p style={{ marginTop: '10px' }}>
          根據數學歸納法，對所有 <MathInline math="n \in \mathbb{N}" />，乘方法則恆成立。■
        </p>
      </Proof>

      {/* 證明：開方法則 */}
      <Proof title="證明：開方法則 (Root Law)">
        <p style={{ marginBottom: '10px' }}>
          我們想要證明：若 <MathInline math="\lim_{x \to a} f(x) = L" />，則 <MathInline math="\lim_{x \to a} \sqrt[n]{f(x)} = \sqrt[n]{L}" />（若 <MathInline math="n" /> 為偶數，則限制 <MathInline math="L > 0" /> 且 <MathInline math="f(x) \ge 0" />）。
        </p>
        <p style={{ marginBottom: '10px' }}>
          <strong>【第一部分：當 <MathInline math="L > 0" /> 時】</strong>
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          利用代數恆等式，對於任意正數 <MathInline math="u, v > 0" />：
        </p>
        <MathBlock math="u^n - v^n = (u - v)(u^{n-1} + u^{n-2}v + \dots + v^{n-1})" />
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
          我們令 <MathInline math="u = \sqrt[n]{f(x)}" /> 且 <MathInline math="v = \sqrt[n]{L}" />，則有：
        </p>
        <MathBlock math="f(x) - L = \left( \sqrt[n]{f(x)} - \sqrt[n]{L} \right) \left( \left(\sqrt[n]{f(x)}\right)^{n-1} + \dots + \left(\sqrt[n]{L}\right)^{n-1} \right)" />
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
          移項並取絕對值，由於分母各項皆大於或等於零，我們可以將分母放大以簡化不等式：
        </p>
        <MathBlock math="\left| \sqrt[n]{f(x)} - \sqrt[n]{L} \right| = \frac{|f(x) - L|}{\left(\sqrt[n]{f(x)}\right)^{n-1} + \left(\sqrt[n]{f(x)}\right)^{n-2}\sqrt[n]{L} + \dots + \left(\sqrt[n]{L}\right)^{n-1}}" />
        <MathBlock math="\le \frac{|f(x) - L|}{\left(\sqrt[n]{L}\right)^{n-1}}" />
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
          令常數正數分母 <MathInline math="C = \left(\sqrt[n]{L}\right)^{n-1} > 0" />。
          現在，給定任意的 <MathInline math="\epsilon > 0" />，因為 <MathInline math="\lim_{x \to a} f(x) = L" />，必定存在一個 <MathInline math="\delta > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta" /> 時，恆有：
        </p>
        <MathBlock math="|f(x) - L| < C \cdot \epsilon" />
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
          當自變數滿足此範圍時，代入放縮關係式得：
        </p>
        <MathBlock math="\left| \sqrt[n]{f(x)} - \sqrt[n]{L} \right| \le \frac{|f(x) - L|}{C} < \frac{C \cdot \epsilon}{C} = \epsilon" />
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
          因此在此情況下命題成立。
        </p>
        
        <p style={{ marginBottom: '10px', marginTop: '20px' }}>
          <strong>【第二部分：當 <MathInline math="L = 0" /> 時】</strong>
        </p>
        <p style={{ color: 'var(--text-secondary)' }}>
          給定任意的 <MathInline math="\epsilon > 0" />，則 <MathInline math="\epsilon^n > 0" />。
          由 <MathInline math="\lim_{x \to a} f(x) = 0" />，存在一個 <MathInline math="\delta > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta" /> 時，恆有：
        </p>
        <MathBlock math="|f(x) - 0| < \epsilon^n \implies f(x) < \epsilon^n" />
        <p style={{ color: 'var(--text-secondary)', margin: '10px 0' }}>
          兩側同開 <MathInline math="n" /> 次方根可得：
        </p>
        <MathBlock math="\sqrt[n]{f(x)} < \epsilon \implies \left| \sqrt[n]{f(x)} - 0 \right| < \epsilon" />
        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
          這完成了 <MathInline math="L = 0" /> 時的極限證明。
        </p>
        <p style={{ marginTop: '10px' }}>
          綜合以上，開方法則成立。■
        </p>
      </Proof>

      {/* 夾擠定理 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        夾擠定理與證明 (Squeeze Theorem)
      </h3>

      <Theorem title="夾擠定理 (Squeeze Theorem / Sandwich Theorem)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
          設在包含 <MathInline math="a" /> 的某去心鄰域內，恆有三個函數滿足不等式關係：
        </p>
        <MathBlock math="g(x) \le f(x) \le h(x)" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
          若兩側的函數在趨近於 <MathInline math="a" /> 時極限相等：
        </p>
        <MathBlock math="\lim_{x \to a} g(x) = \lim_{x \to a} h(x) = L" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          則夾在中間的函數 <MathInline math="f(x)" /> 的極限也必定存在，且其值為：
        </p>
        <MathBlock math="\lim_{x \to a} f(x) = L" />
      </Theorem>

      <Proof title="證明：夾擠定理">
        <p style={{ marginBottom: '10px' }}>
          給定任意的 <MathInline math="\epsilon > 0" />。
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <li>
            由 <MathInline math="\lim_{x \to a} g(x) = L" />，存在一個 <MathInline math="\delta_1 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_1" /> 時，恆有 <MathInline math="|g(x) - L| < \epsilon \iff L - \epsilon < g(x) < L + \epsilon" /> nudge.
          </li>
          <li>
            由 <MathInline math="\lim_{x \to a} h(x) = L" />，存在一個 <MathInline math="\delta_2 > 0" /> 使得當 <MathInline math="0 < |x - a| < \delta_2" /> 時，恆有 <MathInline math="|h(x) - L| < \epsilon \iff L - \epsilon < h(x) < L + \epsilon" />.
          </li>
        </ul>
        <p style={{ marginBottom: '10px' }}>
          我們選擇 <MathInline math="\delta = \min(\delta_1, \delta_2)" />。當 <MathInline math="0 < |x - a| < \delta" /> 時，上述兩個區間與函數不等式關係 <MathInline math="g(x) \le f(x) \le h(x)" /> 同時成立。
        </p>
        <p style={{ marginBottom: '10px' }}>
          結合它們，我們得到：
        </p>
        <MathBlock math="L - \epsilon < g(x) \le f(x) \le h(x) < L + \epsilon" />
        <p style={{ margin: '10px 0' }}>
          進一步簡化為：
        </p>
        <MathBlock math="L - \epsilon < f(x) < L + \epsilon \iff |f(x) - L| < \epsilon" />
        <p style={{ marginTop: '10px' }}>
          是以，當 <MathInline math="0 < |x - a| < \delta" /> 時，恆有 <MathInline math="|f(x) - L| < \epsilon" />。
          <br />
          這證明了 <MathInline math="\lim_{x \to a} f(x) = L" />。■
        </p>
      </Proof>

      {/* 例題 2 */}
      <Example title="2：夾擠定理的應用">
        <p style={{ color: 'var(--text-secondary)' }}>
          證明極限：
        </p>
        <MathBlock math="\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right) = 0" />
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與證明】</strong>：當 <MathInline math="x \to 0" /> 時，<MathInline math="\frac{1}{x} \to \pm\infty" />，使得三角函數 <MathInline math="\sin\left(\frac{1}{x}\right)" /> 在 <MathInline math="[-1, 1]" /> 之間發生無窮次的劇烈震盪，其本身極限不存在。因此我們無法使用乘法法則拆開計算。
          </p>
          <p style={{ marginBottom: '10px' }}>
            此時我們可以利用正弦函數的有界性：對任何不為零的實數 <MathInline math="x \ne 0" />，皆恆有：
          </p>
          <MathBlock math="-1 \le \sin\left(\frac{1}{x}\right) \le 1" />
          <p style={{ margin: '10px 0' }}>
            在不等式各項同乘以非負實數 <MathInline math="x^2" />（由於 <MathInline math="x^2 \ge 0" />，不等號方向保持不變）：
          </p>
          <MathBlock math="-x^2 \le x^2 \sin\left(\frac{1}{x}\right) \le x^2" />
          <p style={{ margin: '10px 0' }}>
            接著，我們求兩端邊界函數在 <MathInline math="x \to 0" /> 時的極限值：
          </p>
          <MathBlock math="\lim_{x \to 0} (-x^2) = 0 \quad \text{且} \quad \lim_{x \to 0} x^2 = 0" />
          <p style={{ margin: '10px 0' }}>
            由於兩端極限皆收斂於同一個實數 0，根據<strong>夾擠定理 (Squeeze Theorem)</strong>，夾在中間的函數極限也必存在且為 0。得證：
          </p>
          <MathBlock math="\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right) = 0" />
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試使用極限的嚴格 <MathInline math="\varepsilon-\delta" /> 定義證明線性極限：
            <MathBlock math="\lim_{x \to 2} (3x + 4) = 10" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：對於任意 <MathInline math="\epsilon > 0" />，試著取對應的 <MathInline math="\delta = \frac{\epsilon}{3}" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 利用夾擠定理求極限：
            <MathBlock math="\lim_{x \to 0^+} x \cos\left(\frac{1}{x}\right) = 0" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：餘弦函數滿足 <MathInline math="-1 \le \cos(1/x) \le 1" />，因 <MathInline math="x \to 0^+" /> 所以 <MathInline math="x > 0" />，同乘不等式後取極限即可）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

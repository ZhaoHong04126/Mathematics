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

export default function Calculus_2_1() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        極限是微積分的靈魂。如果沒有極限的概念，我們就無法定義瞬時變化率（導數）或連續曲線下的面積（積分）。在本單元中，我們將從直觀的角度切入，理解極限的本質與表達方式。
      </p>

      {/* 極限的符號表示卡片 */}
      <Definition title="極限的直觀與符號表示 (Intuitive Limit)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          如果當自變數 <MathInline math="x" /> 靠近 <MathInline math="a" /> 但<strong>不等於</strong> <MathInline math="a" /> 時，函數值 <MathInline math="f(x)" /> 的值可以任意地靠近常數 <MathInline math="L" />，我們記作：
        </p>
        <MathBlock math="\lim_{x \to a} f(x) = L" />
        <p style={{ margin: '14px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          或者用另一種方式表示：
        </p>
        <MathBlock math="f(x) \to L \quad \text{as} \quad x \to a" />
      </Definition>

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
          <span>⚠️ 重要觀念：極限 ≠ 函數值</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-primary)', marginBottom: '12px', lineHeight: '1.7' }}>
            求極限 <MathInline math="\lim_{x \to a} f(x)" /> 與求該點的函數值 <MathInline math="f(a)" /> 是兩件完全不同的事：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <li>
              <strong><MathInline math="f(a)" />：</strong>函數在 <MathInline math="a" /> 這一點的<strong>實際數值</strong>。
            </li>
            <li>
              <strong>極限：</strong>當 <MathInline math="x" /> 逼近 <MathInline math="a" /> 時，函數值<strong>趨向的目標</strong>，我們並不在乎點 <MathInline math="a" /> 表面上的狀況。即使 <MathInline math="f(a)" /> 未定義或不等於 <MathInline math="L" />，極限仍可能存在。
            </li>
          </ul>
        </div>
      </div>

      {/* 代值法的侷限提示卡片 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid hsl(142, 70%, 45%)',
        backgroundColor: 'rgba(16, 185, 129, 0.04)',
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
          color: 'hsl(142, 70%, 45%)',
          backgroundColor: 'rgba(16, 185, 129, 0.03)'
        }}>
          <span>🔍 代值法的侷限</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            雖然透過條列帶入數值（如 <MathInline math="0.9, 0.99, 1.01 \dots" />）可以幫助理解，但這並非嚴謹的求極限方法，有時會因為取值的巧合而產生誤導。
          </p>
        </div>
      </div>

      {/* 單側極限與極限存在性 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        單側極限與極限存在性 (One-sided Limits)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        有時函數在從左邊逼近與從右邊逼近時會表現出截然不同的行為，這就引入了「單側極限」的概念。
      </p>

      <Definition title="單側極限 (One-sided Limits)">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              左極限 (Left-hand Limit)
            </span>
            <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block' }}>
              當自變數 <MathInline math="x" /> 從小於 <MathInline math="a" /> 的方向（左側）無限趨近於 <MathInline math="a" /> 時，函數值 <MathInline math="f(x)" /> 趨近於 <MathInline math="L" />。記作：
            </span>
            <MathBlock math="\lim_{x \to a^-} f(x) = L" />
          </div>
          <div>
            <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
              右極限 (Right-hand Limit)
            </span>
            <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block' }}>
              當自變數 <MathInline math="x" /> 從大於 <MathInline math="a" /> 的方向（右側）無限趨近於 <MathInline math="a" /> 時，函數值 <MathInline math="f(x)" /> 趨近於 <MathInline math="L" />。記作：
            </span>
            <MathBlock math="\lim_{x \to a^+} f(x) = L" />
          </div>
        </div>
      </Definition>

      <Theorem title="極限存在的充要條件 (Criterion for Limit Existence)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          雙側極限 <MathInline math="\lim_{x \to a} f(x)" /> 存在且等於 <MathInline math="L" /> 的充要條件是，左極限與右極限皆存在且相等。即：
        </p>
        <MathBlock math="\lim_{x \to a} f(x) = L \iff \lim_{x \to a^-} f(x) = L \quad \text{且} \quad \lim_{x \to a^+} f(x) = L" />
      </Theorem>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：代數因子約分法">
        <p style={{ color: 'var(--text-secondary)' }}>
          計算極限：
        </p>
        <MathBlock math="\lim_{x \to 2} \frac{x^2 - 4}{x - 2}" />
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：如果直接將 <MathInline math="x = 2" /> 代入，會得到分母與分子均為零的未定式 <MathInline math="\frac{0}{0}" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            但因為極限討論的是 <MathInline math="x \to 2" />（即 <MathInline math="x" /> 無限逼近但<strong>不等於</strong> 2），因此我們有前提 <MathInline math="x - 2 \ne 0" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            這時，我們可以將分子進行因式分解，並將分母與分子的共同因子約分：
          </p>
          <MathBlock math="\frac{x^2 - 4}{x - 2} = \frac{(x - 2)(x + 2)}{x - 2} = x + 2 \quad (\text{因 } x \ne 2)" />
          <p style={{ margin: '10px 0' }}>
            接著，利用極限的性質直接計算：
          </p>
          <MathBlock math="\lim_{x \to 2} \frac{x^2 - 4}{x - 2} = \lim_{x \to 2} (x + 2) = 2 + 2 = 4" />
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：分子有理化法">
        <p style={{ color: 'var(--text-secondary)' }}>
          計算極限：
        </p>
        <MathBlock math="\lim_{x \to 0} \frac{\sqrt{x+1} - 1}{x}" />
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：代入 <MathInline math="x = 0" /> 同樣得到 <MathInline math="\frac{0}{0}" /> 未定式。對於帶有根式的題目，我們可以利用平方差公式將「分子有理化」以消去分母的 <MathInline math="x" />。
          </p>
          <p style={{ marginBottom: '10px' }}>
            將分子與分母同乘共軛根式 <MathInline math="\sqrt{x+1} + 1" />：
          </p>
          <MathBlock math="\frac{\sqrt{x+1} - 1}{x} = \frac{(\sqrt{x+1} - 1)(\sqrt{x+1} + 1)}{x(\sqrt{x+1} + 1)}" />
          <MathBlock math="= \frac{(x+1) - 1}{x(\sqrt{x+1} + 1)} = \frac{x}{x(\sqrt{x+1} + 1)}" />
          <p style={{ margin: '10px 0' }}>
            在限制條件 <MathInline math="x \ne 0" /> 下，消去共同因子 <MathInline math="x" />：
          </p>
          <MathBlock math="= \frac{1}{\sqrt{x+1} + 1}" />
          <p style={{ margin: '10px 0' }}>
            此時即可直接代入求值：
          </p>
          <MathBlock math="\lim_{x \to 0} \frac{\sqrt{x+1} - 1}{x} = \lim_{x \to 0} \frac{1}{\sqrt{x+1} + 1} = \frac{1}{\sqrt{0+1} + 1} = \frac{1}{2}" />
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：分段函數與單側極限分析">
        <p style={{ color: 'var(--text-secondary)' }}>
          設函數 <MathInline math="f(x) = \frac{|x|}{x}" />，求極限 <MathInline math="\lim_{x \to 0} f(x)" /> 是否存在。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：絕對值函數在原點的左右兩側有不同的代數符號，因此我們必須分別分析左極限與右極限。
          </p>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
            1. 從右側逼近 (右極限 <MathInline math="x \to 0^+" />)：
          </p>
          <p style={{ textIndent: '1em', color: 'var(--text-secondary)' }}>
            此時 <MathInline math="x > 0" />，所以 <MathInline math="|x| = x" />。極限為：
          </p>
          <MathBlock math="\lim_{x \to 0^+} \frac{|x|}{x} = \lim_{x \to 0^+} \frac{x}{x} = \lim_{x \to 0^+} 1 = 1" />
          
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginTop: '14px' }}>
            2. 從左側逼近 (左極限 <MathInline math="x \to 0^-" />)：
          </p>
          <p style={{ textIndent: '1em', color: 'var(--text-secondary)' }}>
            此時 <MathInline math="x < 0" />，所以 <MathInline math="|x| = -x" />。極限為：
          </p>
          <MathBlock math="\lim_{x \to 0^-} \frac{|x|}{x} = \lim_{x \to 0^-} \frac{-x}{x} = \lim_{x \to 0^-} (-1) = -1" />
          
          <p style={{ marginTop: '16px', lineHeight: '1.8' }}>
            <strong>【結論】</strong>：由於左極限不等於右極限（即 <MathInline math="\lim_{x \to 0^-} f(x) \ne \lim_{x \to 0^+} f(x)" />），根據極限存在的充要條件定理，該函數在原點的極限 <MathInline math="\lim_{x \to 0} \frac{|x|}{x}" /> <strong>不存在 (Does Not Exist, DNE)</strong>。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 計算有理函數極限：
            <MathBlock math="\lim_{x \to 3} \frac{x^2 - 9}{x^2 - 5x + 6}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：因式分解約分去零因子。答案為：<MathInline math="6" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 計算根式型極限：
            <MathBlock math="\lim_{x \to 1} \frac{\sqrt{x} - 1}{x - 1}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：可利用平方差約分或分子有理化。答案為：<MathInline math="\frac{1}{2}" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}
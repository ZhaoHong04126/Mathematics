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

export default function Calculus_3_3() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在前面的章節中，我們計算導數都是透過極限的定義直接推導。然而，對於複雜的函數（如多項式相乘或有理分式），直接用極限定義計算會變得異常繁瑣且容易出錯。為了提高計算效率，本單元將介紹一組基礎的微分代數法則。這些法則能夠讓我們避開極限的複雜計算，直接得出函數的導數。
      </p>

      {/* 常數與冪函數微分 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        基本微分公式 (Basic Differentiation Rules)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        首先，我們介紹最基礎的幾種函數微分公式：常數函數、冪函數以及它們的線性組合（常數倍與和差）。
      </p>

      <div className="limit-formulas-grid">
        <Definition title="基本微分法則">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '16px'
          }}>
            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                  1. 常數函數法則 (Constant Rule)
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block', fontSize: '0.9rem' }}>
                  對任意常數 <MathInline math="c" />，其導數恆為 0：
                </span>
              </div>
              <MathBlock math="\frac{d}{dx}(c) = 0" />
            </div>

            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                  2. 冪法則 (Power Rule)
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block', fontSize: '0.9rem' }}>
                  對於任意實數 <MathInline math="n" />，自變數 <MathInline math="x" /> 的 <MathInline math="n" /> 次方導數為：
                </span>
              </div>
              <MathBlock math="\frac{d}{dx}(x^n) = n x^{n-1}" />
            </div>

            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                  3. 常數倍法則 (Constant Multiple Rule)
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block', fontSize: '0.9rem' }}>
                  常數與函數乘積的導數，等於該常數乘以該函數의導數：
                </span>
              </div>
              <MathBlock math="\frac{d}{dx}[c f(x)] = c f'(x)" />
            </div>

            <div style={{
              padding: '16px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <div>
                <span style={{ fontWeight: '700', color: 'var(--definition-border)', display: 'block', marginBottom: '4px' }}>
                  4. 和與差法則 (Sum and Difference Rules)
                </span>
                <span style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'block', fontSize: '0.9rem' }}>
                  兩個函數和（或差）的導數，等於它們各自導數的和（或差）：
                </span>
              </div>
              <MathBlock math="\frac{d}{dx}[f(x) \pm g(x)] = f'(x) \pm g'(x)" />
            </div>
          </div>
        </Definition>
      </div>

      {/* 基礎定理證明 */}
      <Proof title="點擊展開：常數法則與冪法則（正整數）的極限證明">
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          1. 證明常數法則：
        </p>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          設 <MathInline math="f(x) = c" />。利用定義：
          <MathBlock math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} = \lim_{h \to 0} \frac{c - c}{h} = \lim_{h \to 0} 0 = 0" />
        </div>
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          2. 證明冪法則（當 n 為正整數）：
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設 <MathInline math="f(x) = x^n" />。利用代數恆等式 <MathInline math="x^n - a^n = (x-a)(x^{n-1} + x^{n-2}a + \dots + a^{n-1})" />：
          <MathBlock math="f'(a) = \lim_{x \to a} \frac{f(x) - f(a)}{x - a} = \lim_{x \to a} \frac{x^n - a^n}{x - a}" />
          <MathBlock math="= \lim_{x \to a} (x^{n-1} + x^{n-2}a + \dots + x a^{n-2} + a^{n-1})" />
          <p style={{ margin: '10px 0' }}>
            在此和式中共有 <MathInline math="n" /> 項。當 <MathInline math="x \to a" /> 時，每一項的值皆趨近於 <MathInline math="a^{n-1}" />：
          </p>
          <MathBlock math="= a^{n-1} + a^{n-2}a + \dots + a a^{n-2} + a^{n-1} = n a^{n-1}" />
          <p style={{ marginTop: '10px' }}>
            因此，將變數換回 <MathInline math="x" /> 可得：<MathInline math="f'(x) = n x^{n-1}" />。<span style={{ float: 'right' }}>■</span>
          </p>
        </div>
      </Proof>

      {/* 乘法法則 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        乘法法則 (The Product Rule)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當我們要對兩個函數的乘積求導時，很多人的直覺會認為導數是兩個導數的乘積，即 <MathInline math="(fg)' = f'g'" />。<strong>這是完全錯誤的！</strong>
        正確的求導公式如下：
      </p>

      <Theorem title="乘法法則 (Product Rule)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          若函數 <MathInline math="f" /> 與 <MathInline math="g" /> 在 <MathInline math="x" /> 處皆可微，則它們的乘積函數 <MathInline math="fg" /> 在 <MathInline math="x" /> 處亦可微，且其導數為：
        </p>
        <MathBlock math="\frac{d}{dx}[f(x)g(x)] = f'(x)g(x) + f(x)g'(x)" />
        <p style={{ margin: '14px 0 0 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          口訣記憶：<strong>「前導後不導，加，前不導後導」</strong>。
        </p>
        
        <Proof title="點擊展開：乘法法則的極限證明">
          <div style={{ marginBottom: '10px' }}>
            設 <MathInline math="F(x) = f(x)g(x)" />。利用導函數定義計算其導數：
            <MathBlock math="F'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x)g(x)}{h}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            這時我們利用微積分中非常經典的技巧——在分子中<strong>同時加上與減去一項相同的項</strong> <MathInline math="f(x+h)g(x)" />：
            <MathBlock math="F'(x) = \lim_{h \to 0} \frac{f(x+h)g(x+h) - f(x+h)g(x) + f(x+h)g(x) - f(x)g(x)}{h}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            將分式拆分為兩部分，並提出公因式：
            <MathBlock math="= \lim_{h \to 0} \left[ f(x+h) \cdot \frac{g(x+h) - g(x)}{h} + g(x) \cdot \frac{f(x+h) - f(x)}{h} \right]" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            利用極限的四則運算法則展開：
            <MathBlock math="= \left( \lim_{h \to 0} f(x+h) \right) \cdot \left( \lim_{h \to 0} \frac{g(x+h) - g(x)}{h} \right) + g(x) \cdot \left( \lim_{h \to 0} \frac{f(x+h) - f(x)}{h} \right)" />
          </div>
          <div style={{ lineHeight: '1.7' }}>
            由於 <MathInline math="f" /> 可微，根據「可微必連續」，我們有 <MathInline math="\lim_{h \to 0} f(x+h) = f(x)" />。而另外兩個極限式正好是 <MathInline math="f'(x)" /> 與 <MathInline math="g'(x)" /> 的定義。代回整理得：
            <MathBlock math="F'(x) = f(x)g'(x) + g(x)f'(x)" />
            即證明了：<MathInline math="[f(x)g(x)]' = f'(x)g(x) + f(x)g'(x)" />。<span style={{ float: 'right' }}>■</span>
          </div>
        </Proof>
      </Theorem>

      {/* 除法法則 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        除法法則 (The Quotient Rule)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        對於商函數（分數函數）求導，微分的分配同樣不適用。我們必須使用除法法則：
      </p>

      <Theorem title="除法法則 (Quotient Rule)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
          若函數 <MathInline math="f" /> 與 <MathInline math="g" /> 在 <MathInline math="x" /> 處皆可微，且分母 <MathInline math="g(x) \ne 0" />，則商函數 <MathInline math="f/g" /> 在 <MathInline math="x" /> 處亦可微，且其導數為：
        </p>
        <MathBlock math="\frac{d}{dx}\left[ \frac{f(x)}{g(x)} \right] = \frac{f'(x)g(x) - f(x)g'(x)}{[g(x)]^2}" />
        <p style={{ margin: '14px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          口訣記憶：<strong>「分母分之（子導母不導，減，子不導母導）」</strong>。
        </p>
        <p style={{ color: 'var(--accent-warm)', fontWeight: '600' }}>
          ⚠️ 注意：分子中間的連接符號為「減號 -」，順序絕對不能顛倒（必須是分子的導數乘以分母，減去分子乘以分母的導數）。
        </p>

        <Proof title="點擊展開：除法法則的極限證明">
          <div style={{ marginBottom: '10px' }}>
            設 <MathInline math="Q(x) = \frac{f(x)}{g(x)}" />。利用極限定義：
            <MathBlock math="Q'(x) = \lim_{h \to 0} \frac{\frac{f(x+h)}{g(x+h)} - \frac{f(x)}{g(x)}}{h}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            將分子通分：
            <MathBlock math="= \lim_{h \to 0} \frac{f(x+h)g(x) - f(x)g(x+h)}{h \cdot g(x+h)g(x)}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            同乘同加項的技巧，分子加減 <MathInline math="f(x)g(x)" />：
            <MathBlock math="= \lim_{h \to 0} \frac{[f(x+h)g(x) - f(x)g(x)] - [f(x)g(x+h) - f(x)g(x)]}{h \cdot g(x+h)g(x)}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            分拆並整理出導數定義式：
            <MathBlock math="= \lim_{h \to 0} \frac{g(x) \cdot \frac{f(x+h) - f(x)}{h} - f(x) \cdot \frac{g(x+h) - g(x)}{h}}{g(x+h)g(x)}" />
          </div>
          <div style={{ lineHeight: '1.7' }}>
            由於 <MathInline math="g" /> 可微，其必連續，因此有 <MathInline math="\lim_{h \to 0} g(x+h) = g(x)" />。
            我們分別求分子與分母的極限：
            <MathBlock math="Q'(x) = \frac{g(x)f'(x) - f(x)g'(x)}{[g(x)]^2}" />
            即證得了除法法則。<span style={{ float: 'right' }}>■</span>
          </div>
        </Proof>
      </Theorem>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：多項式與負指數冪函數求導">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = 3x^5 - 2x^2 + 7 + \frac{4}{x^3}" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            首先，為了方便使用冪法則，我們可以將最後的分式項寫成負指數的形式：
            <MathBlock math="\frac{4}{x^3} = 4x^{-3}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            此時，原函數可重寫為：
            <MathBlock math="f(x) = 3x^5 - 2x^2 + 7 + 4x^{-3}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            利用和差法則與常數倍法則，將每一項分開求導：
            <MathBlock math="f'(x) = \frac{d}{dx}(3x^5) - \frac{d}{dx}(2x^2) + \frac{d}{dx}(7) + \frac{d}{dx}(4x^{-3})" />
          </div>
          <p style={{ marginBottom: '10px' }}>
            利用冪法則 <MathInline math="(x^n)' = n x^{n-1}" /> 分別計算：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <li>第一項：<MathInline math="3 \cdot (5x^4) = 15x^4" /></li>
            <li>第二項：<MathInline math="2 \cdot (2x) = 4x" /></li>
            <li>第三項（常數）：<MathInline math="0" /></li>
            <li>第四項：<MathInline math="4 \cdot (-3x^{-4}) = -12x^{-4}" /></li>
          </ul>
          <div style={{ marginBottom: '10px' }}>
            將所有結果相加，並將負指數形式轉換回分式：
            <MathBlock math="f'(x) = 15x^4 - 4x - \frac{12}{x^4}" />
          </div>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = 15x^4 - 4x - \frac{12}{x^4}" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：應用乘法法則求導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          利用乘法法則求函數 <MathInline math="f(x) = (x^2 + 3x)(x^3 - 5x + 1)" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            令前項為 <MathInline math="u(x) = x^2 + 3x" />，後項為 <MathInline math="v(x) = x^3 - 5x + 1" />。
            我們分別求出它們的導數：
            <MathBlock math="u'(x) = 2x + 3 \quad \text{與} \quad v'(x) = 3x^2 - 5" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            根據乘法法則 <MathInline math="f'(x) = u'(x)v(x) + u(x)v'(x)" /> 代入：
            <MathBlock math="f'(x) = (2x + 3)(x^3 - 5x + 1) + (x^2 + 3x)(3x^2 - 5)" />
          </div>
          <p style={{ marginBottom: '10px' }}>
            將多項式分別展開：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
            <li>第一部分：<MathInline math="(2x+3)(x^3-5x+1) = 2x^4 - 10x^2 + 2x + 3x^3 - 15x + 3 = 2x^4 + 3x^3 - 10x^2 - 13x + 3" /></li>
            <li>第二部分：<MathInline math="(x^2+3x)(3x^2-5) = 3x^4 - 5x^2 + 9x^3 - 15x = 3x^4 + 9x^3 - 5x^2 - 15x" /></li>
          </ul>
          <div style={{ marginBottom: '10px' }}>
            合併同類項：
            <MathBlock math="f'(x) = (2x^4 + 3x^3 - 10x^2 - 13x + 3) + (3x^4 + 9x^3 - 5x^2 - 15x)" />
            <MathBlock math="= (2+3)x^4 + (3+9)x^3 + (-10-5)x^2 + (-13-15)x + 3" />
            <MathBlock math="= 5x^4 + 12x^3 - 15x^2 - 28x + 3" />
          </div>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = 5x^4 + 12x^3 - 15x^2 - 28x + 3" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：應用除法法則求有理分式導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          求有理函數 <MathInline math="f(x) = \frac{x^2 - 1}{x^2 + 1}" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            本題為商的形式，分子為 <MathInline math="u(x) = x^2 - 1" />，分母為 <MathInline math="v(x) = x^2 + 1" />。
            我們分別求其導數：
            <MathBlock math="u'(x) = 2x \quad \text{與} \quad v'(x) = 2x" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            根據除法法則 <MathInline math="f'(x) = \frac{u'(x)v(x) - u(x)v'(x)}{[v(x)]^2}" />：
            <MathBlock math="f'(x) = \frac{(2x)(x^2 + 1) - (x^2 - 1)(2x)}{(x^2 + 1)^2}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            在分子中提出公因式 <MathInline math="2x" /> 並化簡：
            <MathBlock math="f'(x) = \frac{2x \cdot [(x^2 + 1) - (x^2 - 1)]}{(x^2 + 1)^2}" />
            <MathBlock math="= \frac{2x \cdot [x^2 + 1 - x^2 + 1]}{(x^2 + 1)^2}" />
            <MathBlock math="= \frac{2x \cdot 2}{(x^2 + 1)^2} = \frac{4x}{(x^2 + 1)^2}" />
          </div>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = \frac{4x}{(x^2 + 1)^2}" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 求包含根式與分式的函數的導函數：
            <MathBlock math="f(x) = 4x^4 - \frac{3}{\sqrt{x}} + \frac{2}{x^2}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：先將項改寫為冪指數 <MathInline math="-3x^{-1/2} + 2x^{-2}" />。答案為：<MathInline math="f'(x) = 16x^3 + \frac{3}{2x\sqrt{x}} - \frac{4}{x^3}" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 使用除法法則計算有理分式導數：
            <MathBlock math="f(x) = \frac{2x + 1}{x^2 - 3}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：分子導數為 2，分母導數為 <MathInline math="2x" />，注意分子分子間減號運算。答案為：<MathInline math="f'(x) = \frac{-2x^2 - 2x - 6}{(x^2 - 3)^2}" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

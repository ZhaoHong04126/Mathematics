import { Definition, Example, Solution, MathInline, MathBlock, Exercises, ExerciseItem } from '../../../../components/MathBlocks';

export default function Ch1_1_6() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        雙曲函數是一類基於自然指數函數 <MathInline math="e^x" /> 與 <MathInline math="e^{-x}" /> 組合而成的特殊函數。雖然它們是用指數形式定義的，但其代數性質、恆等式與運算規律與常見的三角函數（圓函數）有著高度的類比性。雙曲函數在物理學的懸鏈線（Catenary，如吊橋、電纜自然下垂的曲線）與相對論速度相加中皆有重要應用。
      </p>

      {/* 一、雙曲函數的定義 */}
      <Definition title="雙曲函數的定義 (Definition of Hyperbolic Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          我們定義三個最基礎的雙曲函數如下：
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>1. 雙曲正弦函數 (Hyperbolic Sine)</strong>
            <MathBlock math="\sinh x = \frac{e^x - e^{-x}}{2}" />
            定義域為 <MathInline math="\mathbb{R}" />，值域為 <MathInline math="\mathbb{R}" />，是一個奇函數 (<MathInline math="\sinh(-x) = -\sinh x" />)。
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>2. 雙曲餘弦函數 (Hyperbolic Cosine)</strong>
            <MathBlock math="\cosh x = \frac{e^x + e^{-x}}{2}" />
            定義域為 <MathInline math="\mathbb{R}" />，值域為 <MathInline math="[1, \infty)" />，是一個偶函數 (<MathInline math="\cosh(-x) = \cosh x" />)。其圖形在物理上被稱為<strong>懸鏈線 (Catenary)</strong>。
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>3. 雙曲正切函數 (Hyperbolic Tangent)</strong>
            <MathBlock math="\tanh x = \frac{\sinh x}{\cosh x} = \frac{e^x - e^{-x}}{e^x + e^{-x}}" />
            定義域為 <MathInline math="\mathbb{R}" />，值域為 <MathInline math="(-1, 1)" />，是一個奇函數 (<MathInline math="\tanh(-x) = -\tanh x" />)。以 <MathInline math="y = \pm 1" /> 為其水平漸近線。
          </div>
        </div>

        <p style={{ margin: '14px 0 8px 0', color: 'var(--text-primary)', fontWeight: '600' }}>
          其餘三個雙曲函數：
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
          - 雙曲餘切：<MathInline math="\coth x = \frac{\cosh x}{\sinh x} = \frac{e^x + e^{-x}}{e^x - e^{-x}} \quad (x \neq 0)" />
          <br />
          - 雙曲正割：<MathInline math="\text{sech } x = \frac{1}{\cosh x} = \frac{2}{e^x + e^{-x}}" />
          <br />
          - 雙曲餘割：<MathInline math="\text{csch } x = \frac{1}{\sinh x} = \frac{2}{e^x - e^{-x}} \quad (x \neq 0)" />
        </p>
      </Definition>

      {/* 幾何意義與雙曲恆等式 */}
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          幾何意義與雙曲恆等式 (Hyperbolic Identities)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
            三角函數（如 <MathInline math="\cos \theta, \sin \theta" />）定義在單位圓 <MathInline math="x^2 + y^2 = 1" /> 上，因此又被稱為圓函數。
            <br />
            相對地，雙曲函數 <MathInline math="(\cosh t, \sinh t)" /> 定義在<strong>單位雙曲線</strong>的右半支 <MathInline math="x^2 - y^2 = 1 \ (x \ge 1)" /> 上。對於一個給定的雙曲角（實數）<MathInline math="t" />，雙曲扇形的面積恰好為 <MathInline math="t/2" />。
          </p>

          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
            常用雙曲恆等式：
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', color: 'var(--text-secondary)' }}>
            <div>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>雙曲畢氏定理：</strong><MathInline math="\cosh^2 x - \sinh^2 x = 1" /></li>
                <li><MathInline math="1 - \tanh^2 x = \text{sech}^2 x" /></li>
                <li><MathInline math="\coth^2 x - 1 = \text{csch}^2 x" /></li>
              </ul>
            </div>
            <div>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <li><strong>和差公式：</strong><MathInline math="\sinh(x \pm y) = \sinh x \cosh y \pm \cosh x \sinh y" /></li>
                <li><strong>和差公式：</strong><MathInline math="\cosh(x \pm y) = \cosh x \cosh y \pm \sinh x \sinh y" /></li>
                <li><strong>倍角公式：</strong><MathInline math="\sinh(2x) = 2 \sinh x \cosh x" /></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 二、反雙曲函數 */}
      <Definition title="反雙曲函數與對數形式 (Inverse Hyperbolic Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          由於雙曲函數是用自然指數定義的，所以它們的反函數可以精確地改寫為<strong>對數 (logarithm)</strong> 的形式：
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', color: 'var(--text-secondary)', marginBottom: '14px' }}>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>1. 反雙曲正弦函數 (Inverse Hyperbolic Sine)</strong>
            <MathBlock math="\sinh^{-1} x = \ln\left(x + \sqrt{x^2 + 1}\right) \quad (\text{定義域：} x \in \mathbb{R})" />
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>2. 反雙曲餘弦函數 (Inverse Hyperbolic Cosine)</strong>
            <p style={{ margin: '6px 0', fontSize: '0.85rem', color: 'var(--accent-warm)' }}>
              ⚠️ 注意：由於 <MathInline math="\cosh x" /> 在實數域上並非一對一函數，我們必須限制其定義域為 <MathInline math="[0, \infty)" />。此時，其反函數的定義域為 <MathInline math="[1, \infty)" />：
            </p>
            <MathBlock math="\cosh^{-1} x = \ln\left(x + \sqrt{x^2 - 1}\right) \quad (\text{定義域：} x \ge 1)" />
          </div>
          <div>
            <strong style={{ color: 'var(--text-primary)' }}>3. 反雙曲正切函數 (Inverse Hyperbolic Tangent)</strong>
            <MathBlock math="\tanh^{-1} x = \frac{1}{2} \ln\left(\frac{1+x}{1-x}\right) \quad (\text{定義域：} |x| < 1)" />
          </div>
        </div>
      </Definition>



      {/* 典型例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        觀念探討與典型例題
      </h3>

      {/* 例題 1 */}
      <Example title="證明雙曲恆等式">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試使用定義證明雙曲畢氏恆等式：
          <MathBlock math="\cosh^2 x - \sinh^2 x = 1" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            根據雙曲餘弦與雙曲正弦的定義：
            <MathBlock math="\cosh x = \frac{e^x + e^{-x}}{2} \quad \text{且} \quad \sinh x = \frac{e^x - e^{-x}}{2}" />
            將定義代入原恆等式左邊進行展開：
            <MathBlock math="\cosh^2 x - \sinh^2 x = \left(\frac{e^x + e^{-x}}{2}\right)^2 - \left(\frac{e^x - e^{-x}}{2}\right)^2" />
            <MathBlock math="= \frac{e^{2x} + 2e^x e^{-x} + e^{-2x}}{4} - \frac{e^{2x} - 2e^x e^{-x} + e^{-2x}}{4}" />
            我們知道 <MathInline math="e^x \cdot e^{-x} = e^0 = 1" />，故分子展開後：
            <MathBlock math="= \frac{(e^{2x} + 2 + e^{-2x}) - (e^{2x} - 2 + e^{-2x})}{4}" />
            消去相消項 <MathInline math="e^{2x}" /> 與 <MathInline math="e^{-2x}" />：
            <MathBlock math="= \frac{2 - (-2)}{4} = \frac{4}{4} = 1" />
            左式等於右式，得證。
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="求解雙曲方程式">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試求解雙曲方程式：
          <MathBlock math="2\sinh x - \cosh x = 1" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            將雙曲正弦與雙曲餘弦的指數定義代入方程式：
            <MathBlock math="2\left(\frac{e^x - e^{-x}}{2}\right) - \left(\frac{e^x + e^{-x}}{2}\right) = 1" />
            展開並整理同類項：
            <MathBlock math="(e^x - e^{-x}) - \frac{e^x + e^{-x}}{2} = 1" />
            兩邊同乘以 <MathInline math="2" /> 以消去分母：
            <MathBlock math="2(e^x - e^{-x}) - (e^x + e^{-x}) = 2" />
            <MathBlock math="2e^x - 2e^{-x} - e^x - e^{-x} = 2 \implies e^x - 3e^{-x} = 2" />
            為了消去負指數，兩邊再同乘以 <MathInline math="e^x" />：
            <MathBlock math="(e^x)^2 - 3 = 2e^x \implies (e^x)^2 - 2(e^x) - 3 = 0" />
            這是一個關於 <MathInline math="e^x" /> 的二次方程，我們可以進行因式分解：
            <MathBlock math="(e^x - 3)(e^x + 1) = 0" />
            解得：
            <MathBlock math="e^x = 3 \quad \text{或} \quad e^x = -1" />
            因為對任意實數 <MathInline math="x" />，指數函數值 <MathInline math="e^x" /> 恆大於零。
            <br />
            因此，<MathInline math="e^x = -1" /> 為無效解，必須捨去。
            <br />
            故唯一可能解為：
            <MathBlock math="e^x = 3 \implies x = \ln 3" />
            方程式的解為 <strong><MathInline math="x = \ln 3" /></strong>。
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="推導反雙曲函數對數形式">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試推導反雙曲正切函數的自然對數表達式：
          <MathBlock math="\tanh^{-1} x = \frac{1}{2} \ln\left(\frac{1+x}{1-x}\right) \quad (|x| < 1)" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            令 <MathInline math="y = \tanh^{-1} x" />，這等價於：
            <MathBlock math="x = \tanh y = \frac{e^y - e^{-y}}{e^y + e^{-y}}" />
            將右側分子的負指數消去，上下同乘 <MathInline math="e^y" />：
            <MathBlock math="x = \frac{e^{2y} - 1}{e^{2y} + 1}" />
            利用交叉相乘，解出關於 <MathInline math="e^{2y}" /> 的表達式：
            <MathBlock math="x(e^{2y} + 1) = e^{2y} - 1 \implies x e^{2y} + x = e^{2y} - 1" />
            移項整理將含 <MathInline math="e^{2y}" /> 的項放在等號左邊，其餘放在右邊：
            <MathBlock math="x e^{2y} - e^{2y} = -x - 1 \implies e^{2y}(1 - x) = 1 + x" />
            因為 <MathInline math="|x| < 1" />，故分母 <MathInline math="1-x \neq 0" />。兩邊同除以 <MathInline math="1 - x" />：
            <MathBlock math="e^{2y} = \frac{1 + x}{1 - x}" />
            兩邊取自然對數：
            <MathBlock math="2y = \ln\left(\frac{1 + x}{1 - x}\right) \implies y = \frac{1}{2} \ln\left(\frac{1 + x}{1 - x}\right)" />
            代回 <MathInline math="y = \tanh^{-1} x" /> 即得證。
          </div>
        </Solution>
      </Example>

      {/* 例題 4 */}
      <Example title="雙曲正切的漸近線極限">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          試計算雙曲正切函數在正負無窮遠處的極限值：
          <br />
          (1) <MathInline math="\lim_{x \to \infty} \tanh x" />
          <br />
          (2) <MathInline math="\lim_{x \to -\infty} \tanh x" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            根據定義，雙曲正切可表示為：
            <MathBlock math="\tanh x = \frac{e^x - e^{-x}}{e^x + e^{-x}}" />
            
            <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '10px 0 6px 0' }}>
              (1) 當 <MathInline math="x \to \infty" /> 時：
            </p>
            <MathInline math="e^{-x} \to 0" />。我們將分子與分母同時除以 <MathInline math="e^x" />：
            <MathBlock math="\lim_{x \to \infty} \tanh x = \lim_{x \to \infty} \frac{1 - e^{-2x}}{1 + e^{-2x}} = \frac{1 - 0}{1 + 0} = 1" />

            <p style={{ fontWeight: '600', color: 'var(--text-primary)', margin: '10px 0 6px 0' }}>
              (2) 當 <MathInline math="x \to -\infty" /> 時：
            </p>
            <MathInline math="e^x \to 0" />。極限直接代入可得：
            <MathBlock math="\lim_{x \to -\infty} \tanh x = \lim_{x \to -\infty} \frac{e^x - e^{-x}}{e^x + e^{-x}} = \frac{0 - \infty}{0 + \infty}" />
            為了更嚴格，我們上下同除以 <MathInline math="e^{-x}" />（或同乘 <MathInline math="e^x" />）：
            <MathBlock math="= \lim_{x \to -\infty} \frac{e^{2x} - 1}{e^{2x} + 1} = \frac{0 - 1}{0 + 1} = -1" />
            因此，雙曲正切函數 <MathInline math="y = \tanh x" /> 的兩條水平漸近線分別為 <strong><MathInline math="y = 1" /></strong> 與 <strong><MathInline math="y = -1" /></strong>。
          </div>
        </Solution>
      </Example>

      {/* 自主練習題 */}
      <Exercises>
        <ExerciseItem>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            問題 1：恆等式證明
          </p>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '14px' }}>
            試利用恆等式 <MathInline math="\cosh^2 x - \sinh^2 x = 1" /> 證明：
            <MathBlock math="1 - \tanh^2 x = \text{sech}^2 x" />
          </div>
          <Solution>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              將已知恆等式兩邊同時除以 <MathInline math="\cosh^2 x" />：
              <MathBlock math="\frac{\cosh^2 x}{\cosh^2 x} - \frac{\sinh^2 x}{\cosh^2 x} = \frac{1}{\cosh^2 x}" />
              根據雙曲正切與雙曲正割的定義：
              <MathBlock math="\frac{\sinh^2 x}{\cosh^2 x} = \left(\frac{\sinh x}{\cosh x}\right)^2 = \tanh^2 x" />
              <MathBlock math="\frac{1}{\cosh^2 x} = \left(\frac{1}{\cosh x}\right)^2 = \text{sech}^2 x" />
              代入可得：
              <MathBlock math="1 - \tanh^2 x = \text{sech}^2 x" />
              得證。
            </div>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            問題 2：求解雙曲方程式
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            試求 <MathInline math="\sinh x = 2" /> 的精確解（用自然對數表示）。
          </p>
          <Solution>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              根據定義，方程式為：
              <MathBlock math="\frac{e^x - e^{-x}}{2} = 2 \implies e^x - e^{-x} = 4" />
              兩邊同乘 <MathInline math="e^x" />：
              <MathBlock math="(e^x)^2 - 1 = 4e^x \implies (e^x)^2 - 4(e^x) - 1 = 0" />
              利用公式解求解 <MathInline math="e^x" />：
              <MathBlock math="e^x = \frac{4 \pm \sqrt{(-4)^2 - 4(1)(-1)}}{2} = \frac{4 \pm \sqrt{20}}{2} = 2 \pm \sqrt{5}" />
              由於對任意實數 <MathInline math="x" />，<MathInline math="e^x > 0" />。
              <br />
              因為 <MathInline math="\sqrt{5} > 2" />，所以 <MathInline math="2 - \sqrt{5} < 0" />（捨去）。
              <br />
              我們只取正值：
              <MathBlock math="e^x = 2 + \sqrt{5} \implies x = \ln(2 + \sqrt{5})" />
              <em>（註：這亦等同於直接套用反雙曲正弦公式：<MathInline math="\sinh^{-1}(2) = \ln(2 + \sqrt{2^2 + 1}) = \ln(2 + \sqrt{5})" />）</em>
            </div>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            問題 3：求反函數定義域
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            試求函數 <MathInline math="f(x) = \cosh^{-1}(2x - 1)" /> 的定義域。
          </p>
          <Solution>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              根據反雙曲餘弦函數的定義，<MathInline math="\cosh^{-1}(u)" /> 的自變數必須滿足：
              <MathBlock math="u \ge 1" />
              在此處，自變數為 <MathInline math="2x - 1" />，故限制條件為：
              <MathBlock math="2x - 1 \ge 1" />
              移項解不等式：
              <MathBlock math="2x \ge 2 \implies x \ge 1" />
              故該函數的定義域為 <strong><MathInline math="[1, \infty)" /></strong>。
            </div>
          </Solution>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}
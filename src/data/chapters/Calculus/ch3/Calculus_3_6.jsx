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

export default function Calculus_3_6() {
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
      <h2 style={{ 
        borderLeft: '4px solid var(--accent-primary)', 
        paddingLeft: '12px', 
        margin: '24px 0 16px 0', 
        fontSize: '1.6rem',
        color: 'var(--text-primary)',
        fontWeight: '600'
      }}>
        3.6 反三角函數的導數 (Derivatives of Inverse Trigonometric Functions)
      </h2>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在處理反三角函數時，我們經常會利用「隱函數微分 (Implicit Differentiation)」來推導它們的導數。反三角函數（如反正弦 <MathInline math="\arcsin x" />、反正切 <MathInline math="\arctan x" /> 等）在積分學中非常重要，因為許多常見的有理函數和根式函數的積分都會產生反三角函數。
      </p>

      {/* 1. 反三角函數的導數公式 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、反三角函數求導公式
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        請注意這些公式的定義域限制，以及正函數與餘函數導數之間僅差一個負號的特性。
      </p>

      <div className="limit-formulas-grid">
        <Definition title="反三角函數的導數 (Derivatives of Inverse Trigonometric Functions)">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                1. 反正弦函數 (Arcsine)
              </span>
              <MathBlock math="\frac{d}{dx}(\arcsin x) = \frac{1}{\sqrt{1 - x^2}} \quad (|x| < 1)" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                2. 反餘弦函數 (Arccosine)
              </span>
              <MathBlock math="\frac{d}{dx}(\arccos x) = -\frac{1}{\sqrt{1 - x^2}} \quad (|x| < 1)" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                3. 反正切函數 (Arctangent)
              </span>
              <MathBlock math="\frac{d}{dx}(\arctan x) = \frac{1}{1 + x^2}" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                4. 反餘切函數 (Arccotangent)
              </span>
              <MathBlock math="\frac{d}{dx}(\text{arccot}\, x) = -\frac{1}{1 + x^2}" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                5. 反正割函數 (Arcsecant)
              </span>
              <MathBlock math="\frac{d}{dx}(\text{arcsec}\, x) = \frac{1}{|x|\sqrt{x^2 - 1}} \quad (|x| > 1)" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                6. 反餘割函數 (Arccosecant)
              </span>
              <MathBlock math="\frac{d}{dx}(\text{arccsc}\, x) = -\frac{1}{|x|\sqrt{x^2 - 1}} \quad (|x| > 1)" />
            </div>
          </div>
        </Definition>
      </div>

      <Proof title="點擊展開：反三角函數導數的證明 (利用隱函數微分)">
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          1. 反正弦函數 <MathInline math="\arcsin x" /> 的證明：
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
          設 <MathInline math="y = \arcsin x" />，其中 <MathInline math="-\frac{\pi}{2} \le y \le \frac{\pi}{2}" />。這等價於：
          <MathBlock math="\sin y = x" />
          對兩邊同時對 <MathInline math="x" /> 微分（利用連鎖法則）：
          <MathBlock math="\cos y \cdot \frac{dy}{dx} = 1" />
          <MathBlock math="\frac{dy}{dx} = \frac{1}{\cos y}" />
          因為 <MathInline math="-\frac{\pi}{2} \le y \le \frac{\pi}{2}" />，所以 <MathInline math="\cos y \ge 0" />。利用三角恆等式 <MathInline math="\cos^2 y + \sin^2 y = 1" />：
          <MathBlock math="\cos y = \sqrt{1 - \sin^2 y} = \sqrt{1 - x^2}" />
          代回原式可得：
          <MathBlock math="\frac{dy}{dx} = \frac{1}{\sqrt{1 - x^2}}" />
          因此，<MathInline math="(\arcsin x)' = \frac{1}{\sqrt{1 - x^2}}" />。
        </div>

        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          2. 反正切函數 <MathInline math="\arctan x" /> 的證明：
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設 <MathInline math="y = \arctan x" />，其中 <MathInline math="-\frac{\pi}{2} < y < \frac{\pi}{2}" />。這等價於：
          <MathBlock math="\tan y = x" />
          對兩邊同時對 <MathInline math="x" /> 微分：
          <MathBlock math="\sec^2 y \cdot \frac{dy}{dx} = 1" />
          <MathBlock math="\frac{dy}{dx} = \frac{1}{\sec^2 y}" />
          利用三角恆等式 <MathInline math="\sec^2 y = 1 + \tan^2 y" />，且 <MathInline math="\tan y = x" />：
          <MathBlock math="\sec^2 y = 1 + x^2" />
          代回原式可得：
          <MathBlock math="\frac{dy}{dx} = \frac{1}{1 + x^2}" />
          因此，<MathInline math="(\arctan x)' = \frac{1}{1 + x^2}" />。<span style={{ float: 'right' }}>■</span>
        </div>
      </Proof>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：反三角函數與連鎖法則">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = \arcsin(x^2)" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            本題需要結合反正弦的導數公式與連鎖法則。外層函數為 <MathInline math="\arcsin(u)" />，內層函數為 <MathInline math="u = x^2" />。
            <MathBlock math="\frac{d}{dx}[\arcsin(u)] = \frac{1}{\sqrt{1 - u^2}} \cdot u'" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            代入 <MathInline math="u = x^2" /> 以及 <MathInline math="u' = 2x" />：
            <MathBlock math="f'(x) = \frac{1}{\sqrt{1 - (x^2)^2}} \cdot (2x)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            整理得：
            <MathBlock math="f'(x) = \frac{2x}{\sqrt{1 - x^4}}" />
          </p>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = \frac{2x}{\sqrt{1 - x^4}}" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：反正切函數與指數函數">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="g(x) = \arctan(e^x)" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            結合反正切的導數公式與連鎖法則。外層函數為 <MathInline math="\arctan(u)" />，內層函數為 <MathInline math="u = e^x" />。
            <MathBlock math="\frac{d}{dx}[\arctan(u)] = \frac{1}{1 + u^2} \cdot u'" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            代入 <MathInline math="u = e^x" /> 以及 <MathInline math="u' = e^x" />：
            <MathBlock math="g'(x) = \frac{1}{1 + (e^x)^2} \cdot (e^x)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            整理得：
            <MathBlock math="g'(x) = \frac{e^x}{1 + e^{2x}}" />
          </p>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="g'(x) = \frac{e^x}{1 + e^{2x}}" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 計算函數的導函數：
            <MathBlock math="y = x \arccos x - \sqrt{1 - x^2}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：對 <MathInline math="x \arccos x" /> 使用乘法法則，並注意 <MathInline math="\arccos x" /> 的導數有負號。最後結果會大幅化簡。答案為：<MathInline math="y' = \arccos x" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 計算函數的導函數：
            <MathBlock math="f(x) = \arctan(\ln x)" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：使用連鎖法則。答案為：<MathInline math="f'(x) = \frac{1}{x(1 + (\ln x)^2)}" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

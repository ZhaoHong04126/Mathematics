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

export default function Calculus_3_4() {
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
        除了多項式、根式與有理函數等代數函數外，在物理學、工程學與經濟學中，我們經常遇到所謂的**超越函數 (Transcendental Functions)**，其中包含三角函數、指數函數與對數函數。掌握這些核心超越函數的導數公式，是進行微積分應用（例如相關變率、極值問題與動態建模）的必備工具。
      </p>

      {/* 1. 三角函數的導數 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、三角函數的導數 (Derivatives of Trigonometric Functions)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        三角函數具有週期性與振盪特性，其求導公式在微積分中扮演非常核心的角色。請特別注意負號的位置。
      </p>

      <div className="limit-formulas-grid">
        <Definition title="三角函數求導法則">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                1. 正弦函數 (Sine)
              </span>
              <MathBlock math="\frac{d}{dx}(\sin x) = \cos x" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                2. 餘弦函數 (Cosine)
              </span>
              <MathBlock math="\frac{d}{dx}(\cos x) = -\sin x" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                3. 正切函數 (Tangent)
              </span>
              <MathBlock math="\frac{d}{dx}(\tan x) = \sec^2 x" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                4. 餘切函數 (Cotangent)
              </span>
              <MathBlock math="\frac{d}{dx}(\cot x) = -\csc^2 x" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                5. 正割函數 (Secant)
              </span>
              <MathBlock math="\frac{d}{dx}(\sec x) = \sec x \tan x" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                6. 餘割函數 (Cosecant)
              </span>
              <MathBlock math="\frac{d}{dx}(\csc x) = -\csc x \cot x" />
            </div>
          </div>
        </Definition>
      </div>

      <Proof title="點擊展開：三角函數導數的證明">
        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          1. 正弦函數 <MathInline math="\sin x" /> 的極限證明：
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
          設 <MathInline math="f(x) = \sin x" />。利用極限定義與三角函數和差化積公式（或和角公式）：
          <MathBlock math="f'(x) = \lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h}" />
          <MathBlock math="= \lim_{h \to 0} \frac{\sin x \cos h + \cos x \sin h - \sin x}{h}" />
          <MathBlock math="= \lim_{h \to 0} \left[ \cos x \cdot \left(\frac{\sin h}{h}\right) - \sin x \cdot \left(\frac{1 - \cos h}{h}\right) \right]" />
          利用重要基本極限 <MathInline math="\lim_{h \to 0} \frac{\sin h}{h} = 1" /> 與 <MathInline math="\lim_{h \to 0} \frac{1 - \cos h}{h} = 0" />：
          <MathBlock math="f'(x) = \cos x \cdot (1) - \sin x \cdot (0) = \cos x" />
          因此，<MathInline math="(\sin x)' = \cos x" />。
        </div>

        <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          2. 正切函數 <MathInline math="\tan x" /> 的除法法則證明：
        </p>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          利用關係式 <MathInline math="\tan x = \frac{\sin x}{\cos x}" />，套用除法法則：
          <MathBlock math="\frac{d}{dx}(\tan x) = \frac{d}{dx}\left[ \frac{\sin x}{\cos x} \right]" />
          <MathBlock math="= \frac{(\sin x)' \cos x - \sin x (\cos x)'}{\cos^2 x}" />
          <MathBlock math="= \frac{\cos x \cdot \cos x - \sin x \cdot (-\sin x)}{\cos^2 x}" />
          <MathBlock math="= \frac{\cos^2 x + \sin^2 x}{\cos^2 x}" />
          利用三角恆等式 <MathInline math="\sin^2 x + \cos^2 x = 1" />：
          <MathBlock math="= \frac{1}{\cos^2 x} = \sec^2 x" />
          因此，<MathInline math="(\tan x)' = \sec^2 x" />。<span style={{ float: 'right' }}>■</span>
        </div>
      </Proof>

      {/* 2. 指數與對數函數的導數 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、指數與對數函數的導數 (Derivatives of Exponential and Logarithmic Functions)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        指數函數與對數函數具有獨特的增長性。其中，以常數 <MathInline math="e" /> 為底數的自然指數與自然對數公式最為簡潔：
      </p>

      <div className="limit-formulas-grid">
        <Definition title="指數與對數求導法則">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                1. 自然指數函數 (Natural Exponential)
              </span>
              <MathBlock math="\frac{d}{dx}(e^x) = e^x" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                2. 一般底數指數函數 (General Exponential)
              </span>
              <MathBlock math="\frac{d}{dx}(a^x) = a^x \ln a \quad (a>0, a\ne 1)" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                3. 自然對數函數 (Natural Logarithm)
              </span>
              <MathBlock math="\frac{d}{dx}(\ln x) = \frac{1}{x} \quad (x>0)" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '700', color: 'var(--definition-border)' }}>
                4. 一般底數對數函數 (General Logarithm)
              </span>
              <MathBlock math="\frac{d}{dx}(\log_a x) = \frac{1}{x \ln a} \quad (x>0)" />
            </div>
          </div>
        </Definition>
      </div>

      <Proof title="點擊展開：自然對數導數的極限證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設 <MathInline math="f(x) = \ln x" />，定義域 <MathInline math="x > 0" />。利用導函數的極限定義：
          <MathBlock math="f'(x) = \lim_{h \to 0} \frac{\ln(x+h) - \ln x}{h}" />
          利用對數相減等於真數相除的性質：
          <MathBlock math="= \lim_{h \to 0} \frac{1}{h} \ln\left( \frac{x+h}{x} \right) = \lim_{h \to 0} \frac{1}{h} \ln\left( 1 + \frac{h}{x} \right)" />
          將倍數係數移到指數位置：
          <MathBlock math="= \lim_{h \to 0} \ln\left( 1 + \frac{h}{x} \right)^{\frac{1}{h}}" />
          令 <MathInline math="u = \frac{h}{x}" />，則 <MathInline math="h = ux" />。當 <MathInline math="h \to 0" /> 時，<MathInline math="u \to 0" />：
          <MathBlock math="= \lim_{u \to 0} \ln\left( 1 + u \right)^{\frac{1}{ux}} = \lim_{u \to 0} \ln\left[ (1+u)^{\frac{1}{u}} \right]^{\frac{1}{x}}" />
          利用對數連續性將極限放進真數：
          <MathBlock math="= \ln\left[ \lim_{u \to 0} (1+u)^{\frac{1}{u}} \right]^{\frac{1}{x}}" />
          利用自然底數 <MathInline math="e" /> 的極限定義 <MathInline math="\lim_{u \to 0} (1+u)^{\frac{1}{u}} = e" />：
          <MathBlock math="= \ln(e)^{\frac{1}{x}} = \frac{1}{x} \ln e = \frac{1}{x}" />
          因此，<MathInline math="(\ln x)' = \frac{1}{x}" />。<span style={{ float: 'right' }}>■</span>
        </div>
      </Proof>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        精選例題與解答 (Selected Examples)
      </h3>

      {/* 例題 1 */}
      <Example title="1：乘法法則與三角函數導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = x^3 \sin x" /> 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            本題為乘積的形式，左項為 <MathInline math="u(x) = x^3" />，右項為 <MathInline math="v(x) = \sin x" />。
            我們分別求導：
            <MathBlock math="u'(x) = 3x^2 \quad \text{與} \quad v'(x) = \cos x" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            應用乘法法則 <MathInline math="f'(x) = u'(x)v(x) + u(x)v'(x)" /> 代入：
            <MathBlock math="f'(x) = (3x^2)(\sin x) + (x^3)(\cos x)" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            整理提出公因式 <MathInline math="x^2" />：
            <MathBlock math="f'(x) = x^2(3\sin x + x\cos x)" />
          </div>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = x^2(3\sin x + x\cos x)" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="2：除法法則與指數/三角函數導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = \frac{e^x}{\cos x}" /> 在定義域內的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            本題為商的形式，分子為 <MathInline math="u(x) = e^x" />，分母為 <MathInline math="v(x) = \cos x" />。
            我們分別求導：
            <MathBlock math="u'(x) = e^x \quad \text{與} \quad v'(x) = -\sin x" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            套用除法法則 <MathInline math="f'(x) = \frac{u'(x)v(x) - u(x)v'(x)}{[v(x)]^2}" /> 代入：
            <MathBlock math="f'(x) = \frac{(e^x)(\cos x) - (e^x)(-\sin x)}{\cos^2 x}" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            在分子中提出公因式 <MathInline math="e^x" />，並注意負負得正：
            <MathBlock math="f'(x) = \frac{e^x(\cos x + \sin x)}{\cos^2 x}" />
          </div>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = \frac{e^x(\cos x + \sin x)}{\cos^2 x}" />。
          </p>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="3：對數函數求導與化簡">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="f(x) = x \ln x - x" /> 在對數定義域內的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <div style={{ marginBottom: '10px' }}>
            原函數為兩部分相減，其中前項 <MathInline math="x \ln x" /> 需要使用乘法法則：
            <MathBlock math="\frac{d}{dx}(x \ln x) = (x)' \ln x + x (\ln x)' = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            後項為簡單的 <MathInline math="x" />，其導數為 1。因此，將兩者組合：
            <MathBlock math="f'(x) = \frac{d}{dx}(x\ln x) - \frac{d}{dx}(x) = (\ln x + 1) - 1 = \ln x" />
          </div>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="f'(x) = \ln x" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 計算函數的導函數：
            <MathBlock math="f(x) = e^x \cos x" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：使用乘法法則。答案為：<MathInline math="f'(x) = e^x(\cos x - \sin x)" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 使用除法法則計算商函數導數：
            <MathBlock math="f(x) = \frac{\ln x}{x^2}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：分子導數為 <MathInline math="1/x" />，分母為 <MathInline math="x^2" />，分母平方後為 <MathInline math="x^4" />。答案為：<MathInline math="f'(x) = \frac{1 - 2\ln x}{x^3}" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

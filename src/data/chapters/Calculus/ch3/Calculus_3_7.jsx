import { 
  Definition, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

export default function Calculus_3_7() {
  const subCardStyle = {
    padding: '16px',
    borderRadius: 'var(--radius-sm)',
    backgroundColor: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid var(--border-color)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在本節中，我們將介紹兩種進階的求導技巧與觀念。第一是**對數微分法**，這是一種利用對數律來簡化複雜乘除分式或指數函數的強大技巧；第二是**高階導數**，即對導函數再次求導的過程，這在物理學（如加速度）與幾何學（如曲線凹凸性）中扮演著關鍵角色。
      </p>

      {/* 1. 對數微分法 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、對數微分法 (Logarithmic Differentiation)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        當我們遇到形如 <MathInline math="y = [f(x)]^{g(x)}" /> 的函數，或是包含大量乘法、除法及根號的複雜分式時，直接使用乘除法法則或連鎖法則會非常繁瑣。此時可以先在方程式兩邊取自然對數，再利用對數律化簡，最後配合隱函數微分求得 <MathInline math="\frac{dy}{dx}" />。
      </p>

      <Definition title="對數微分法的三個步驟">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
          <li>
            <strong>步驟一：</strong> 在方程式 <MathInline math="y = f(x)" /> 的兩邊取自然對數，得到 <MathInline math="\ln|y| = \ln|f(x)|" />，並利用對數律（<MathInline math="\ln(ab) = \ln a + \ln b" /> 等）展開化簡。
          </li>
          <li>
            <strong>步驟二：</strong> 兩邊同時對 <MathInline math="x" /> 求導。注意左邊根據連鎖法則會得到 <MathInline math="\frac{1}{y} \cdot \frac{dy}{dx}" />。
          </li>
          <li>
            <strong>步驟三：</strong> 將 <MathInline math="y" /> 移至等號右邊，並將 <MathInline math="y" /> 替換為原本的函數 <MathInline math="f(x)" />，即可求得 <MathInline math="\frac{dy}{dx}" />。
          </li>
        </ul>
      </Definition>

      {/* 例題 1：對數微分法 */}
      <Example title="1：利用對數微分法求解指數底數皆含變數的導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          求函數 <MathInline math="y = x^x" /> (其中 <MathInline math="x > 0" />) 的導函數。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            由於底數和指數都含有變數 <MathInline math="x" />，我們無法直接使用冪函數法則（底數為變數、指數為常數）或指數函數法則（底數為常數、指數為變數）。必須使用對數微分法。
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟一：兩邊取自然對數</strong>
            <MathBlock math="\ln y = \ln(x^x)" />
            利用對數律將指數移到前面：
            <MathBlock math="\ln y = x \ln x" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟二：兩邊同時對 x 求導</strong>
            左邊使用隱函數微分，右邊使用乘法法則：
            <MathBlock math="\frac{1}{y} \frac{dy}{dx} = 1 \cdot \ln x + x \cdot \frac{1}{x}" />
            <MathBlock math="\frac{1}{y} \frac{dy}{dx} = \ln x + 1" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>步驟三：移項並替換 y</strong>
            <MathBlock math="\frac{dy}{dx} = y (\ln x + 1)" />
            將 <MathInline math="y = x^x" /> 代回：
            <MathBlock math="\frac{dy}{dx} = x^x (\ln x + 1)" />
          </p>
          <p>
            <strong>【結論】</strong>：
            導函數為 <MathInline math="y' = x^x (\ln x + 1)" />。
          </p>
        </Solution>
      </Example>

      {/* 2. 高階導數 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、高階導數 (Higher-Order Derivatives)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        如果一個函數 <MathInline math="f" /> 的導函數 <MathInline math="f'" /> 也是可微的，我們就可以對 <MathInline math="f'" /> 再次求導，得到的新函數稱為 <MathInline math="f" /> 的<strong>二階導數 (Second Derivative)</strong>。以此類推，可以求出三階、四階甚至 <MathInline math="n" /> 階導數。
      </p>

      <Definition title="高階導數的符號表示法">
        <div style={subCardStyle}>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            對於函數 <MathInline math="y = f(x)" />，常見的高階導數符號如下：
          </p>
          <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
            <li><strong>一階導數：</strong> <MathInline math="y'" />, <MathInline math="f'(x)" />, <MathInline math="\frac{dy}{dx}" />, <MathInline math="\frac{d}{dx}[f(x)]" /></li>
            <li><strong>二階導數：</strong> <MathInline math="y''" />, <MathInline math="f''(x)" />, <MathInline math="\frac{d^2y}{dx^2}" />, <MathInline math="\frac{d^2}{dx^2}[f(x)]" /></li>
            <li><strong>三階導數：</strong> <MathInline math="y'''" />, <MathInline math="f'''(x)" />, <MathInline math="\frac{d^3y}{dx^3}" /></li>
            <li><strong>n 階導數：</strong> <MathInline math="y^{(n)}" />, <MathInline math="f^{(n)}(x)" />, <MathInline math="\frac{d^ny}{dx^n}" /></li>
          </ul>
        </div>
      </Definition>

      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在物理學中，如果函數 <MathInline math="s(t)" /> 表示物體隨時間 <MathInline math="t" /> 的位置函數，那麼：
        <br/>• 一階導數 <MathInline math="v(t) = s'(t)" /> 代表<strong>速度 (Velocity)</strong>。
        <br/>• 二階導數 <MathInline math="a(t) = v'(t) = s''(t)" /> 代表<strong>加速度 (Acceleration)</strong>。
        <br/>• 三階導數 <MathInline math="j(t) = a'(t) = s'''(t)" /> 稱為<strong>急動度 (Jerk)</strong>。
      </p>

      {/* 例題 2：高階導數 */}
      <Example title="2：計算多項式與三角函數的高階導數">
        <p style={{ color: 'var(--text-secondary)' }}>
          已知 <MathInline math="f(x) = x^4 + \sin(2x)" />，求 <MathInline math="f''(x)" /> 以及 <MathInline math="f'''(0)" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </p>
          <p style={{ marginBottom: '10px' }}>
            我們逐步求導，每次求導都運用基本法則和連鎖法則。
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>一階導數 <MathInline math="f'(x)" />：</strong>
            <MathBlock math="f'(x) = 4x^3 + \cos(2x) \cdot 2 = 4x^3 + 2\cos(2x)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>二階導數 <MathInline math="f''(x)" />：</strong>
            <MathBlock math="f''(x) = \frac{d}{dx}[4x^3 + 2\cos(2x)] = 12x^2 + 2(-\sin(2x) \cdot 2) = 12x^2 - 4\sin(2x)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            <strong>三階導數 <MathInline math="f'''(x)" />：</strong>
            <MathBlock math="f'''(x) = \frac{d}{dx}[12x^2 - 4\sin(2x)] = 24x - 4(\cos(2x) \cdot 2) = 24x - 8\cos(2x)" />
          </p>
          <p style={{ marginBottom: '10px' }}>
            將 <MathInline math="x = 0" /> 代入三階導數中：
            <MathBlock math="f'''(0) = 24(0) - 8\cos(0) = 0 - 8(1) = -8" />
          </p>
          <p>
            <strong>【結論】</strong>：
            二階導數為 <MathInline math="f''(x) = 12x^2 - 4\sin(2x)" />，三階導數在 <MathInline math="x=0" /> 的值為 <MathInline math="-8" />。
          </p>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 利用對數微分法求函數的導函數：
            <MathBlock math="y = \frac{(x-1)^2 \sqrt{x+2}}{x^3}" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：先取對數化簡為 <MathInline math="\ln y = 2\ln(x-1) + \frac{1}{2}\ln(x+2) - 3\ln x" /> 再求導。答案為：<MathInline math="y' = \left[ \frac{2}{x-1} + \frac{1}{2(x+2)} - \frac{3}{x} \right] \frac{(x-1)^2 \sqrt{x+2}}{x^3}" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 求函數的第二階導數：
            <MathBlock math="f(x) = x e^x" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：兩次使用乘法法則。答案為：<MathInline math="f''(x) = (x+2)e^x" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>

    </div>
  );
}

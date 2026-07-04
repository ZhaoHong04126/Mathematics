import { 
  Definition, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem,
  Proof
} from '../../../../components/MathBlocks';

export default function Calculus_3_8() {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <header>
        <h2 style={{ 
          borderLeft: '4px solid var(--accent-primary)', 
          paddingLeft: '12px', 
          margin: '0 0 16px 0', 
          fontSize: '1.6rem',
          color: 'var(--text-primary)',
          fontWeight: '600'
        }}>
          3.8 (補充) 雙曲函數的導數與反函數的導數
        </h2>
        <p style={{ margin: '0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          本節將介紹雙曲函數以及反雙曲函數的導數公式。這些函數在工程與物理的某些領域中非常實用，並且它們的導數公式與三角函數有許多相似之處。
        </p>
      </header>

      {/* 雙曲函數的導數 */}
      <section>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
          1. 雙曲函數的導數
        </h3>
        
        <Definition title="雙曲函數導數公式">
          <p style={{ margin: '0 0 16px 0', lineHeight: '1.8' }}>
            六個基本雙曲函數的導數公式如下：
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {/* 左排：導數為正 */}
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\sinh x) = \cosh x" />
              <Proof title="證明">
                <p>由定義 <MathInline math="\sinh x = \frac{e^x - e^{-x}}{2}" />：</p>
                <MathBlock math="\begin{aligned} \frac{d}{dx}(\sinh x) &= \frac{d}{dx}\left(\frac{e^x - e^{-x}}{2}\right) \\ &= \frac{e^x - (-e^{-x})}{2} \\ &= \frac{e^x + e^{-x}}{2} = \cosh x \end{aligned}" />
              </Proof>
            </div>
            {/* 右排：導數為負 */}
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\text{csch } x) = -\text{csch } x \coth x" />
              <Proof title="證明">
                <p>由定義 <MathInline math="\text{csch } x = (\sinh x)^{-1}" />，使用連鎖法則：</p>
                <MathBlock math="\begin{aligned} \frac{d}{dx}(\text{csch } x) &= -1(\sinh x)^{-2} \cdot \cosh x \\ &= -\frac{\cosh x}{\sinh^2 x} \\ &= -\frac{1}{\sinh x} \cdot \frac{\cosh x}{\sinh x} \\ &= -\text{csch } x \coth x \end{aligned}" />
              </Proof>
            </div>
            
            {/* 左排：導數為正 */}
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\cosh x) = \sinh x" />
              <Proof title="證明">
                <p>由定義 <MathInline math="\cosh x = \frac{e^x + e^{-x}}{2}" />：</p>
                <MathBlock math="\begin{aligned} \frac{d}{dx}(\cosh x) &= \frac{d}{dx}\left(\frac{e^x + e^{-x}}{2}\right) \\ &= \frac{e^x + (-e^{-x})}{2} \\ &= \frac{e^x - e^{-x}}{2} = \sinh x \end{aligned}" />
              </Proof>
            </div>
            {/* 右排：導數為負 */}
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\text{sech } x) = -\text{sech } x \tanh x" />
              <Proof title="證明">
                <p>由定義 <MathInline math="\text{sech } x = (\cosh x)^{-1}" />，使用連鎖法則：</p>
                <MathBlock math="\begin{aligned} \frac{d}{dx}(\text{sech } x) &= -1(\cosh x)^{-2} \cdot \sinh x \\ &= -\frac{\sinh x}{\cosh^2 x} \\ &= -\frac{1}{\cosh x} \cdot \frac{\sinh x}{\cosh x} \\ &= -\text{sech } x \tanh x \end{aligned}" />
              </Proof>
            </div>
            
            {/* 左排：導數為正 */}
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\tanh x) = \text{sech}^2 x" />
              <Proof title="證明">
                <p>由定義 <MathInline math="\tanh x = \frac{\sinh x}{\cosh x}" />，使用除法法則：</p>
                <MathBlock math="\begin{aligned} \frac{d}{dx}(\tanh x) &= \frac{d}{dx}\left(\frac{\sinh x}{\cosh x}\right) \\ &= \frac{\cosh x \cdot \cosh x - \sinh x \cdot \sinh x}{\cosh^2 x} \\ &= \frac{\cosh^2 x - \sinh^2 x}{\cosh^2 x} \\ &= \frac{1}{\cosh^2 x} = \text{sech}^2 x \end{aligned}" />
              </Proof>
            </div>
            {/* 右排：導數為負 */}
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\coth x) = -\text{csch}^2 x" />
              <Proof title="證明">
                <p>由定義 <MathInline math="\coth x = \frac{\cosh x}{\sinh x}" />，使用除法法則：</p>
                <MathBlock math="\begin{aligned} \frac{d}{dx}(\coth x) &= \frac{d}{dx}\left(\frac{\cosh x}{\sinh x}\right) \\ &= \frac{\sinh x \cdot \sinh x - \cosh x \cdot \cosh x}{\sinh^2 x} \\ &= \frac{\sinh^2 x - \cosh^2 x}{\sinh^2 x} \\ &= \frac{-1}{\sinh^2 x} = -\text{csch}^2 x \end{aligned}" />
              </Proof>
            </div>
          </div>
          <p style={{ margin: '16px 0 0 0', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
            注意：與三角函數不同的是，<MathInline math="\frac{d}{dx}(\cosh x)" /> 的結果是正的 <MathInline math="\sinh x" />，並沒有負號。
          </p>
        </Definition>

        <Example title="雙曲函數微分範例">
          <p style={{ margin: '0 0 16px 0' }}>求 <MathInline math="f(x) = \sinh(x^2 + 1)" /> 的導數。</p>
          <Solution>
            <p style={{ margin: '0 0 8px 0' }}>利用連鎖法則 (Chain Rule)：</p>
            <MathBlock math="f'(x) = \cosh(x^2 + 1) \cdot \frac{d}{dx}(x^2 + 1)" />
            <MathBlock math="f'(x) = \cosh(x^2 + 1) \cdot (2x) = 2x \cosh(x^2 + 1)" />
          </Solution>
        </Example>
      </section>

      {/* 反雙曲函數的導數 */}
      <section>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
          2. 反雙曲函數的導數
        </h3>
        
        <Definition title="反雙曲函數導數公式">
          <p style={{ margin: '0 0 16px 0', lineHeight: '1.8' }}>
            六個基本反雙曲函數的導數公式及其定義域限制如下：
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\sinh^{-1} x) = \frac{1}{\sqrt{x^2 + 1}}, \quad \text{對所有 } x" />
              <Proof title="證明">
                <p>令 <MathInline math="y = \sinh^{-1} x" />，則 <MathInline math="\sinh y = x" />。兩邊對 <MathInline math="x" /> 微分：</p>
                <MathBlock math="\cosh y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{1}{\cosh y}" />
                <p>因為 <MathInline math="\cosh^2 y - \sinh^2 y = 1" /> 且 <MathInline math="\cosh y > 0" />：</p>
                <MathBlock math="\cosh y = \sqrt{1 + \sinh^2 y} = \sqrt{1 + x^2}" />
                <p>故 <MathInline math="\frac{d}{dx}(\sinh^{-1} x) = \frac{1}{\sqrt{x^2 + 1}}" />。</p>
              </Proof>
            </div>
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\cosh^{-1} x) = \frac{1}{\sqrt{x^2 - 1}}, \quad x > 1" />
              <Proof title="證明">
                <p>令 <MathInline math="y = \cosh^{-1} x" />，則 <MathInline math="\cosh y = x" /> (<MathInline math="y \ge 0, x > 1" />)。兩邊對 <MathInline math="x" /> 微分：</p>
                <MathBlock math="\sinh y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{1}{\sinh y}" />
                <p>因為 <MathInline math="\cosh^2 y - \sinh^2 y = 1" /> 且 <MathInline math="y > 0 \implies \sinh y > 0" />：</p>
                <MathBlock math="\sinh y = \sqrt{\cosh^2 y - 1} = \sqrt{x^2 - 1}" />
                <p>故 <MathInline math="\frac{d}{dx}(\cosh^{-1} x) = \frac{1}{\sqrt{x^2 - 1}}" />。</p>
              </Proof>
            </div>
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\tanh^{-1} x) = \frac{1}{1 - x^2}, \quad |x| < 1" />
              <Proof title="證明">
                <p>令 <MathInline math="y = \tanh^{-1} x" />，則 <MathInline math="\tanh y = x" />。兩邊對 <MathInline math="x" /> 微分：</p>
                <MathBlock math="\text{sech}^2 y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{1}{\text{sech}^2 y}" />
                <p>因為 <MathInline math="\text{sech}^2 y = 1 - \tanh^2 y = 1 - x^2" />：</p>
                <p>故 <MathInline math="\frac{d}{dx}(\tanh^{-1} x) = \frac{1}{1 - x^2}" />。</p>
              </Proof>
            </div>
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\coth^{-1} x) = \frac{1}{1 - x^2}, \quad |x| > 1" />
              <Proof title="證明">
                <p>令 <MathInline math="y = \coth^{-1} x" />，則 <MathInline math="\coth y = x" />。兩邊對 <MathInline math="x" /> 微分：</p>
                <MathBlock math="-\text{csch}^2 y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{-1}{\text{csch}^2 y}" />
                <p>因為 <MathInline math="\coth^2 y - \text{csch}^2 y = 1 \implies \text{csch}^2 y = \coth^2 y - 1 = x^2 - 1" />：</p>
                <p>故 <MathInline math="\frac{d}{dx}(\coth^{-1} x) = \frac{-1}{x^2 - 1} = \frac{1}{1 - x^2}" />。</p>
              </Proof>
            </div>
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\text{sech}^{-1} x) = -\frac{1}{x\sqrt{1 - x^2}}, \quad 0 < x < 1" />
              <Proof title="證明">
                <p>令 <MathInline math="y = \text{sech}^{-1} x" />，則 <MathInline math="\text{sech } y = x" /> (<MathInline math="y > 0, 0 < x < 1" />)。兩邊對 <MathInline math="x" /> 微分：</p>
                <MathBlock math="-\text{sech } y \tanh y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{-1}{\text{sech } y \tanh y}" />
                <p>因為 <MathInline math="\tanh^2 y = 1 - \text{sech}^2 y" /> 且 <MathInline math="y > 0 \implies \tanh y > 0" />：</p>
                <MathBlock math="\tanh y = \sqrt{1 - \text{sech}^2 y} = \sqrt{1 - x^2}" />
                <p>故 <MathInline math="\frac{dy}{dx} = \frac{-1}{x\sqrt{1 - x^2}}" />。</p>
              </Proof>
            </div>
            <div style={subCardStyle}>
              <MathBlock math="\frac{d}{dx}(\text{csch}^{-1} x) = -\frac{1}{|x|\sqrt{1 + x^2}}, \quad x \neq 0" />
              <Proof title="證明">
                <p>令 <MathInline math="y = \text{csch}^{-1} x" />，則 <MathInline math="\text{csch } y = x" />。兩邊對 <MathInline math="x" /> 微分：</p>
                <MathBlock math="-\text{csch } y \coth y \cdot \frac{dy}{dx} = 1 \implies \frac{dy}{dx} = \frac{-1}{\text{csch } y \coth y}" />
                <p>因為 <MathInline math="\coth^2 y = 1 + \text{csch}^2 y \implies \coth y = \pm\sqrt{1 + \text{csch}^2 y} = \pm\sqrt{1 + x^2}" />。</p>
                <p>由於 <MathInline math="y" /> 與 <MathInline math="x" /> 同號，且 <MathInline math="\coth y" /> 與 <MathInline math="y" /> 同號，故 <MathInline math="\coth y" /> 的正負號與 <MathInline math="x" /> 相同：</p>
                <MathBlock math="\text{csch } y \coth y = x \left(\frac{|x|}{x}\sqrt{1 + x^2}\right) = |x|\sqrt{1 + x^2}" />
                <p>故 <MathInline math="\frac{dy}{dx} = \frac{-1}{|x|\sqrt{1 + x^2}}" />。</p>
              </Proof>
            </div>
          </div>
        </Definition>

        <Example title="反雙曲函數微分範例">
          <p style={{ margin: '0 0 16px 0' }}>求 <MathInline math="y = \tanh^{-1}(3x)" /> 的導數。</p>
          <Solution>
            <p style={{ margin: '0 0 8px 0' }}>同樣利用連鎖法則：</p>
            <MathBlock math="y' = \frac{1}{1 - (3x)^2} \cdot \frac{d}{dx}(3x)" />
            <MathBlock math="y' = \frac{1}{1 - 9x^2} \cdot 3 = \frac{3}{1 - 9x^2}" />
            <p style={{ margin: '8px 0 0 0', color: 'var(--text-secondary)' }}>前提條件為 <MathInline math="|3x| < 1" />，即 <MathInline math="|x| < \frac{1}{3}" />。</p>
          </Solution>
        </Example>
      </section>

      {/* 練習題 */}
      <section>
        <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
          3. 隨堂練習
        </h3>
        <Exercises>
          <ExerciseItem>
            <p>1. 求 <MathInline math="f(x) = x \sinh x" /> 的導數。</p>
            <Solution>
              <p style={{ margin: '0 0 8px 0' }}>使用乘法法則：</p>
              <MathBlock math="f'(x) = 1 \cdot \sinh x + x \cdot \cosh x = \sinh x + x \cosh x" />
            </Solution>
          </ExerciseItem>
          <ExerciseItem>
            <p>2. 求 <MathInline math="g(x) = \cosh^{-1}(x^2)" /> 的導數，並說明定義域限制。</p>
            <Solution>
              <p style={{ margin: '0 0 8px 0' }}>使用反雙曲函數導數公式與連鎖法則：</p>
              <MathBlock math="g'(x) = \frac{1}{\sqrt{(x^2)^2 - 1}} \cdot 2x = \frac{2x}{\sqrt{x^4 - 1}}" />
              <p style={{ margin: '8px 0 0 0' }}>條件為 <MathInline math="x^2 > 1" />，因此 <MathInline math="|x| > 1" />。</p>
            </Solution>
          </ExerciseItem>
        </Exercises>
      </section>
    </div>
  );
}

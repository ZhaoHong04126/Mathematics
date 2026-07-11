import { 
  Definition, 
  Theorem, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  Proof,
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

export default function Calculus_6_1() {
  return (
    <div>
      {/* 導讀與直觀引入 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在第五章中，我們掌握了基本函數的積分公式。但當遇到更複雜的複合函數時，直接求反導函數會變得非常困難。
        例如，若要計算不定積分：
      </p>
      <MathBlock math="\int x \sqrt{x^2+1} \, dx = ?" />
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        我們可以反問：<strong>什麼樣的函數經過微分後會得到 <MathInline math="x \sqrt{x^2+1}" /> 呢？</strong>
        這種包含「內層函數」與「外層函數」相乘的形式，會讓我們聯想到微分的<strong>連鎖法則 (Chain Rule)</strong>。
        <br />
        通常，我們在微積分中面對的基本函數主要有五大類：<strong>指數函數 (Exponential)、對數函數 (Logarithm)、多項式函數 (Polynomial)、三角函數 (Trigonometric)、反三角函數 (Inverse Trigonometric)</strong>。
        當積分式較為繁複時，我們的核心想法是<strong>「設法回歸基本函數」</strong>，而達成此目標最重要的方法就是 <strong>代換積分法 (Substitution Rule)</strong>。
      </p>

      {/* 引入例題的推導展示 */}
      <Example title="直觀引入例題推導">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int x \sqrt{x^2+1} \, dx" />。
        </p>
        <Solution>
          <p style={{ marginBottom: '10px' }}>
            我們注意到根號內部的函數為 <MathInline math="x^2+1" />，而在根號外面乘著一個 <MathInline math="x" />。這剛好與 <MathInline math="x^2+1" /> 的導數只差常數倍數。
          </p>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
            我們令新變數 <MathInline math="u = x^2 + 1" />。
            則 <MathInline math="u" /> 對 <MathInline math="x" /> 的導數為：
            <MathBlock math="\frac{du}{dx} = 2x \implies du = 2x \, dx" />
            這裡的 <MathInline math="du = 2x \, dx" /> 是微積分中常用的<strong>微分量記號 (Differential notation)</strong>。
            <br />
            由此可知，<MathInline math="x \, dx = \frac{1}{2} \, du" />。
          </div>
          <p style={{ marginBottom: '10px' }}>
            現在，我們將原積分式中的所有 <MathInline math="x" /> 變數替換為 <MathInline math="u" />：
          </p>
          <MathBlock math="
            \int x \sqrt{x^2+1} \, dx 
            = \int \sqrt{x^2+1} \cdot (x \, dx) 
            = \int \sqrt{u} \cdot \left(\frac{1}{2} \, du\right)
          " />
          <p style={{ margin: '12px 0 10px 0' }}>
            提取常數 <MathInline math="1/2" />，即可套用基本冪函數積分公式：
          </p>
          <MathBlock math="
            = \frac{1}{2} \int u^{1/2} \, du 
            = \frac{1}{2} \cdot \left(\frac{2}{3} u^{3/2}\right) + C 
            = \frac{1}{3} u^{3/2} + C
          " />
          <p style={{ color: 'var(--accent-warm)', fontWeight: '600', margin: '14px 0 10px 0' }}>
            ⚠️ 關鍵提示：記得帶回原來的自變數 x！
          </p>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            由於原本題目是以自變數 <MathInline math="x" /> 出題，我們最後必須把 <MathInline math="u = x^2 + 1" /> 帶回：
            <MathBlock math="= \frac{1}{3} (x^2+1)^{3/2} + C" />
            我們可以微分檢驗此結果：
            <MathBlock math="\frac{d}{dx}\left[ \frac{1}{3} (x^2+1)^{3/2} + C \right] = \frac{1}{3} \cdot \frac{3}{2} (x^2+1)^{1/2} \cdot (2x) = x\sqrt{x^2+1}" />
            微分結果與被積函數完全吻合！
          </div>
        </Solution>
      </Example>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        <strong>代換積分法 (Substitution Rule)</strong> 的本質就是將不容易直接積分的函數，透過引入一個中間變數 <MathInline math="u" /> 作為橋樑，轉換成比較好計算的形式。它在數學上的正式陳述如下：
      </p>

      {/* 定理卡片 */}
      <Theorem title="代換積分法 (The Substitution Rule)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設 <MathInline math="u = g(x)" /> 為在區間 <MathInline math="I" /> 上可微的函數，其值域在區間 <MathInline math="J" /> 上。
          若函數 <MathInline math="f" /> 在區間 <MathInline math="J" /> 上連續，則：
        </p>
        <MathBlock math="\int f(g(x)) g'(x) \, dx = \int f(u) \, du" />
      </Theorem>

      {/* 備註卡片 */}
      <Definition title="備註與直觀說明 (Remark)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
          若 <MathInline math="F" /> 為 <MathInline math="f" /> 的一個反導函數（即 <MathInline math="F'(x) = f(x)" />），則代換積分公式也可以寫成如下形式：
        </p>
        <MathBlock math="\int F'(g(x)) \cdot g'(x) \, dx = F(g(x)) + C" />
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          這個形式在連鎖法則的對稱性上顯得更直觀與有意義。
          <br />
          其基本證明想法正是利用上面的代換方式：
          <br />
          令 <MathInline math="u = g(x) \implies du = g'(x) \, dx" />，
          <br />
          則原積分式變為：
          <MathInline math="\int F'(u) \, du = F(u) + C = F(g(x)) + C" />。
        </p>
      </Definition>



      {/* 講義中的 5 大類經典例題 */}
      <h3 style={{ margin: '40px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        📚 講義經典例題詳解 (Selected Examples)
      </h3>

      {/* 例題 2 */}
      <Example title="1：多項式與複合函數代換">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 試求：</strong> <MathInline math="\int x^3 \cos(x^4+2) \, dx" />
          </div>
          <div>
            <strong>(2) 試求：</strong> <MathInline math="\int \sqrt{2x+1} \, dx" />
          </div>
          <div>
            <strong>(3) 試求：</strong> <MathInline math="\int \frac{1+4x}{\sqrt{1+x+2x^2}} \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* (1) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (1) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                令 <MathInline math="u = x^4+2" />，則微分量 <MathInline math="du = 4x^3 \, dx \implies x^3 \, dx = \frac{1}{4} \, du" />。
                <br />
                將其代回原積分式：
                <MathBlock math="
                  \int x^3 \cos(x^4+2) \, dx 
                  = \int \cos(u) \cdot \left(\frac{1}{4} \, du\right) 
                  = \frac{1}{4} \int \cos(u) \, du
                " />
                對 <MathInline math="u" /> 積分得到：
                <MathBlock math="= \frac{1}{4} \sin(u) + C" />
                將 <MathInline math="u = x^4+2" /> 帶回原變數，即得特解：
                <MathBlock math="= \frac{1}{4} \sin(x^4+2) + C" />
              </div>
            </div>

            {/* (2) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (2) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                令 <MathInline math="u = 2x+1" />，則微分量 <MathInline math="du = 2 \, dx \implies dx = \frac{1}{2} \, du" />。
                <br />
                將其代回原積分式：
                <MathBlock math="
                  \int \sqrt{2x+1} \, dx 
                  = \int \sqrt{u} \cdot \left(\frac{1}{2} \, du\right) 
                  = \frac{1}{2} \int u^{1/2} \, du
                " />
                對 <MathInline math="u" /> 套用冪法則積分：
                <MathBlock math="
                  = \frac{1}{2} \cdot \left(\frac{2}{3} u^{3/2}\right) + C 
                  = \frac{1}{3} u^{3/2} + C
                " />
                將 <MathInline math="u = 2x+1" /> 帶回原變數，即得：
                <MathBlock math="= \frac{1}{3} (2x+1)^{3/2} + C" />
              </div>
            </div>

            {/* (3) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (3) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                觀察被積函數，根號內部的導數為 <MathInline math="\frac{d}{dx}(1+x+2x^2) = 1+4x" />，這剛好等於分子。
                <br />
                因此，我們令 <MathInline math="u = 1+x+2x^2" />，則微分量為 <MathInline math="du = (1+4x) \, dx" />。
                <br />
                將其代回原積分式：
                <MathBlock math="
                  \int \frac{1+4x}{\sqrt{1+x+2x^2}} \, dx 
                  = \int \frac{1}{\sqrt{u}} \, du 
                  = \int u^{-1/2} \, du
                " />
                進行積分：
                <MathBlock math="= 2u^{1/2} + C = 2\sqrt{u} + C" />
                帶回原本的變數 <MathInline math="x" />：
                <MathBlock math="= 2\sqrt{1+x+2x^2} + C" />
              </div>
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="2：指數與三角函數的直接微分簡記法">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 試求：</strong> <MathInline math="\int e^{\sin\theta} \cos\theta \, d\theta" />
          </div>
          <div>
            <strong>(2) 試求：</strong> <MathInline math="\int \frac{\cos x}{1+\sin^2 x} \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* (1) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (1) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                由於 <MathInline math="\cos\theta \, d\theta = d(\sin\theta)" />，我們可以直接將積分改寫為對 <MathInline math="\sin\theta" /> 運算子的微分形式：
                <MathBlock math="\int e^{\sin\theta} \cos\theta \, d\theta = \int e^{\sin\theta} \, d(\sin\theta)" />
                此時可以直接套用指數積分公式 <MathInline math="\int e^u du = e^u + C" />：
                <MathBlock math="= e^{\sin\theta} + C" />
              </div>
            </div>

            {/* (2) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (2) 詳解：</h5>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
                講義中提示：<strong>「如果覺得不大適應如此直接操作的話，直接用替代/代換變數的方法來做，比較不會有問題。」</strong> 以下我們提供兩種寫法對比。
              </p>
              
              <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '16px', margin: '12px 0' }}>
                <h6 style={{ color: 'var(--text-primary)', margin: '0 0 6px 0', fontSize: '0.9rem' }}>寫法一：直接微分形式法 (Direct Differential Method)</h6>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  因為 <MathInline math="\cos x \, dx = d(\sin x)" />：
                  <MathBlock math="\int \frac{\cos x}{1+\sin^2 x} \, dx = \int \frac{1}{1+\sin^2 x} \, d(\sin x)" />
                  對照反正切函數的導數公式 <MathInline math="\frac{d}{du}(\tan^{-1}u) = \frac{1}{1+u^2}" />，可直接寫出結果：
                  <MathBlock math="= \tan^{-1}(\sin x) + C" />
                </div>
              </div>

              <div style={{ borderLeft: '2px solid rgba(255,255,255,0.1)', paddingLeft: '16px', margin: '12px 0' }}>
                <h6 style={{ color: 'var(--text-primary)', margin: '0 0 6px 0', fontSize: '0.9rem' }}>寫法二：常規變數代換法 (Alternative Substitution Method)</h6>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  令 <MathInline math="u = \sin x \implies du = \cos x \, dx" />。
                  <br />
                  代入積分式中：
                  <MathBlock math="\int \frac{\cos x}{1+\sin^2 x} \, dx = \int \frac{1}{1+u^2} \, du" />
                  進行積分：
                  <MathBlock math="= \tan^{-1}(u) + C" />
                  將 <MathInline math="u = \sin x" /> 帶回，得到相同結果：
                  <MathBlock math="= \tan^{-1}(\sin x) + C" />
                </div>
              </div>
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 4 */}
      <Example title="3：正切與正割函數的代換積分">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(3) 試求正切函數的積分：</strong> <MathInline math="\int \tan x \, dx" />
          </div>
          <div>
            <strong>(4) 試求正割函數的積分：</strong> <MathInline math="\int \sec x \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* (3) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>正切積分 (3) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                我們利用三角恆等式將正切寫成正弦與餘弦之商：
                <MathBlock math="\int \tan x \, dx = \int \frac{\sin x}{\cos x} \, dx" />
                注意到分子的導數與分母相關：<MathInline math="d(\cos x) = -\sin x \, dx \implies \sin x \, dx = -d(\cos x)" />。
                <br />
                代入可得：
                <MathBlock math="
                  = \int \frac{-d(\cos x)}{\cos x} 
                  = - \int \frac{1}{\cos x} \, d(\cos x)
                " />
                對分數求積分得到對數函數：
                <MathBlock math="= -\ln|\cos x| + C" />
                利用對數的性質，常數負一可以收到真數的次方：
                <MathBlock math="= \ln|(\cos x)^{-1}| + C = \ln\left|\frac{1}{\cos x}\right| + C = \ln|\sec x| + C" />
                這兩種答案形式均正確且常用。
              </div>
            </div>

            {/* (4) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>正割積分 (4) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                這是一個非常經典的微積分技巧。為了能夠進行代換積分，我們在分子分母同乘以 <MathInline math="\sec x + \tan x" />：
                <MathBlock math="
                  \int \sec x \, dx 
                  = \int \sec x \cdot \frac{\tan x + \sec x}{\tan x + \sec x} \, dx 
                  = \int \frac{\sec^2 x + \sec x \tan x}{\tan x + \sec x} \, dx
                " />
                此時，我們驚奇地發現，分母 <MathInline math="\tan x + \sec x" /> 的導數正是分子 <MathInline math="\sec^2 x + \sec x \tan x" />。
                <br />
                因此：
                <MathBlock math="d(\tan x + \sec x) = (\sec^2 x + \sec x \tan x) \, dx" />
                我們可以直接代換寫成微分形式：
                <MathBlock math="
                  = \int \frac{1}{\tan x + \sec x} \, d(\tan x + \sec x)
                " />
                對此分數結構進行積分，即得：
                <MathBlock math="= \ln|\tan x + \sec x| + C" />
              </div>
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 5 */}
      <Example title="4：繁雜複合函數的代換">
        <div style={{ color: 'var(--text-secondary)' }}>
          <strong>(5) 試求：</strong> <MathInline math="\int \frac{e^x}{e^x + e^{-x}} \, dx" />
        </div>
        <Solution>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            講義說明：<strong>「若其中一個函數太過繁雜出現時，也可以試試用替代/代換的方法。」</strong>
          </p>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            由於分母有負指數 <MathInline math="e^{-x}" /> 顯得繁雜，我們令 <MathInline math="u = e^x" />，則微分量為 <MathInline math="du = e^x \, dx" />。
            <br />
            此時，分母中的另一項 <MathInline math="e^{-x} = \frac{1}{e^x} = \frac{1}{u}" />。
            <br />
            將變數全體替換為 <MathInline math="u" />：
            <MathBlock math="
              \int \frac{e^x}{e^x + e^{-x}} \, dx 
              = \int \frac{1}{u + \frac{1}{u}} \, du 
              = \int \frac{1}{\frac{u^2 + 1}{u}} \, du 
              = \int \frac{u}{u^2 + 1} \, du
            " />
            這是一個容易處理的分式積分。再次進行微分形式化簡：
            <br />
            由於 <MathInline math="d(u^2+1) = 2u \, du \implies u \, du = \frac{1}{2} d(u^2+1)" />：
            <MathBlock math="
              = \int \frac{\frac{1}{2} d(u^2+1)}{u^2+1} 
              = \frac{1}{2} \int \frac{1}{u^2+1} \, d(u^2+1) 
              = \frac{1}{2} \ln|u^2+1| + C
            " />
            因為對於任何實數 <MathInline math="u" /> 來說，<MathInline math="u^2+1" /> 恆大於零，因此絕對值可省略。
            <br />
            最後，將 <MathInline math="u = e^x" /> 帶回原變數：
            <MathBlock math="
              = \frac{1}{2} \ln(e^{2x} + 1) + C
            " />
          </div>
        </Solution>
      </Example>

      {/* 對稱區間上的定積分：偶函數與奇函數 */}
      <h3 style={{ margin: '40px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        🔄 對稱區間上的定積分：偶函數與奇函數 (Symmetric Integrals)
      </h3>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        當定積分的積分區間是關於原點對稱的 <MathInline math="[-a, a]" /> 時，若被積函數具有特殊的對稱性（偶函數或奇函數），我們可以利用變數代換法將積分計算極大地簡化。
      </p>

      {/* 定義卡片 */}
      <Definition title="偶函數與奇函數 (Even and Odd Functions)">
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>偶函數 (Even Function)</strong>：
            若對定義域中的所有 <MathInline math="x" />，皆滿足：
            <MathBlock math="f(-x) = f(x)" />
            則稱 <MathInline math="f" /> 為<strong>偶函數</strong>。其函數圖形對稱於 <MathInline math="y" /> 軸。
          </li>
          <li>
            <strong>奇函數 (Odd Function)</strong>：
            若對定義域中的所有 <MathInline math="x" />，皆滿足：
            <MathBlock math="f(-x) = -f(x)" />
            則稱 <MathInline math="f" /> 為<strong>奇函數</strong>。其函數圖形對稱於原點。
          </li>
        </ol>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem', marginTop: '12px' }}>
          💡 <strong>直觀理解</strong>：奇函數與偶函數的對稱性質，可以藉由圖形面積的幾何意義來加深理解。
        </p>
      </Definition>

      {/* 判別偶函數與奇函數例題 */}
      <Example title="偶函數與奇函數判別">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <strong>(1) 判別函數是否為偶函數：</strong> <MathInline math="f(x) = 1 - x^4" />
          </div>
          <div>
            <strong>(2) 判別函數是否為奇函數：</strong> <MathInline math="f(x) = x^3 + x" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (1) 解答：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                我們計算 <MathInline math="f(-x)" />：
                <MathBlock math="f(-x) = 1 - (-x)^4 = 1 - x^4 = f(x)" />
                由於 <MathInline math="f(-x) = f(x)" />，因此 <MathInline math="f" /> 為<strong>偶函數</strong>。
              </div>
            </div>
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (2) 解答：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                我們計算 <MathInline math="f(-x)" />：
                <MathBlock math="f(-x) = (-x)^3 + (-x) = -x^3 - x = -(x^3 + x) = -f(x)" />
                由於 <MathInline math="f(-x) = -f(x)" />，因此 <MathInline math="f" /> 為<strong>奇函數</strong>。
              </div>
            </div>
          </div>
        </Solution>
      </Example>

      {/* 對稱區間定積分定理 */}
      <Theorem title="對稱區間上的積分定理 (Integrals of Symmetric Functions)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f" /> 在對稱區間 <MathInline math="[-a, a]" /> 上連續：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            若 <MathInline math="f" /> 為偶函數，則：
            <MathBlock math="\int_{-a}^{a} f(x) \, dx = 2 \int_{0}^{a} f(x) \, dx" />
          </li>
          <li>
            若 <MathInline math="f" /> 為奇函數，則：
            <MathBlock math="\int_{-a}^{a} f(x) \, dx = 0" />
          </li>
        </ol>
      </Theorem>

      {/* 定理證明 */}
      <Proof title="定理 (1) 偶函數積分公式證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          我們將對稱區間的定積分拆解為兩部分：
          <MathBlock math="\int_{-a}^{a} f(x) \, dx = \int_{-a}^{0} f(x) \, dx + \int_{0}^{a} f(x) \, dx" />
          對於左半邊的積分式 <MathInline math="\int_{-a}^{0} f(x) \, dx" />，我們使用變數代換法：
          <br />
          令 <MathInline math="u = -x \implies du = -dx" />（即 <MathInline math="dx = -du" />）。
          <br />
          當 <MathInline math="x = -a \implies u = a" />；當 <MathInline math="x = 0 \implies u = 0" />。
          <br />
          代入可得：
          <MathBlock math="
            \int_{-a}^{0} f(x) \, dx 
            = \int_{a}^{0} f(-u) (-du) 
            = -\int_{a}^{0} f(-u) \, du 
            = \int_{0}^{a} f(-u) \, du
          " />
          由於 <MathInline math="f" /> 是偶函數，滿足 <MathInline math="f(-u) = f(u)" />，因此：
          <MathBlock math="= \int_{0}^{a} f(u) \, du = \int_{0}^{a} f(x) \, dx" />
          將其代回原積分加總式中：
          <MathBlock math="
            \int_{-a}^{a} f(x) \, dx 
            = \int_{0}^{a} f(x) \, dx + \int_{0}^{a} f(x) \, dx 
            = 2 \int_{0}^{a} f(x) \, dx
          " />
          證明完畢。
          <br />
          （註：奇函數的證明方式完全相同，只需在代換步驟中套用 <MathInline math="f(-u) = -f(u)" />，兩項積分便會互相抵消為零。）
        </div>
      </Proof>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        或者我們可以用圖形來觀察：偶函數的圖形左右對稱，因此左半邊與右半邊在對稱區間內的面積完全相同，積分加總為右半邊的兩倍；奇函數的圖形關於原點對稱，左半邊與右半邊的函數值符號相反，因此在對稱區間內的面積大小相等但符號相反，積分相加正好完全抵消為零。
      </p>

      {/* 對稱定積分例題 */}
      <Example title="對稱區間定積分計算">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 試求定積分：</strong> <MathInline math="\int_{-2}^{2} (x^6+1) \, dx" />
          </div>
          <div>
            <strong>(2) 試求定積分：</strong> <MathInline math="\int_{-1}^{1} \frac{\tan x}{1+x^2+x^4} \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* (1) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (1) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                被積函數為 <MathInline math="f(x) = x^6 + 1" />。
                <br />
                由於其偶次方項特點，易知 <MathInline math="f(-x) = (-x)^6 + 1 = x^6 + 1 = f(x)" /> 為偶函數。
                <br />
                由於積分區間為對稱區間 <MathInline math="[-2, 2]" />，我們可以套用偶函數定積分定理：
                <MathBlock math="
                  \int_{-2}^{2} (x^6+1) \, dx 
                  = 2 \int_{0}^{2} (x^6+1) \, dx
                " />
                進行定積分計算：
                <MathBlock math="
                  = 2 \left[ \frac{1}{7}x^7 + x \right]_0^2 
                  = 2 \left( \frac{1}{7}(2)^7 + 2 - 0 \right) 
                  = 2 \left( \frac{128}{7} + \frac{14}{7} \right) 
                  = 2 \left( \frac{142}{7} \right) 
                  = \frac{284}{7}
                " />
              </div>
            </div>

            {/* (2) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (2) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                被積函數極為複雜： <MathInline math="f(x) = \frac{\tan x}{1+x^2+x^4}" />。如果直接求反導函數會非常困難。
                <br />
                我們首先檢查其對稱性，計算 <MathInline math="f(-x)" />：
                <MathBlock math="
                  f(-x) 
                  = \frac{\tan(-x)}{1+(-x)^2+(-x)^4} 
                  = \frac{-\tan x}{1+x^2+x^4} 
                  = -f(x)" />
                由於滿足 <MathInline math="f(-x) = -f(x)" />，因此 <MathInline math="f(x)" /> 是一個<strong>奇函數</strong>。
                <br />
                因為積分區間為對稱區間 <MathInline math="[-1, 1]" />，根據奇函數的定積分定理，該積分可以直接簡化為：
                <MathBlock math="\int_{-1}^{1} \frac{\tan x}{1+x^2+x^4} \, dx = 0" />
                （透過奇函數的對稱性質，我們免去了極其複雜的反導函數求解過程，直接得出結果為 0。）
              </div>
            </div>
          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試用代換積分法求不定積分：<MathInline math="\int x^2 e^{x^3} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：令 <MathInline math="u = x^3 \implies du = 3x^2 dx" />。答案：<MathInline math="\frac{1}{3} e^{x^3} + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 試用代換積分法求不定積分：<MathInline math="\int \frac{\ln x}{x} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：令 <MathInline math="u = \ln x \implies du = \frac{1}{x} dx" />。答案：<MathInline math="\frac{1}{2} (\ln x)^2 + C" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

import { Definition, Theorem, Example, Solution, MathInline, MathBlock, Exercises, ExerciseItem } from '../../../../components/MathBlocks';

export default function Calculus_6_6() {
  return (
    <div>
      {/* 導讀 */}
      <div style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在前面的章節中，我們討論定積分 <MathInline math="\int_{a}^{b} f(x) \, dx" /> 時，通常有兩個基本假設：
        <ol style={{ margin: '8px 0 8px 20px', paddingLeft: '0' }}>
          <li>積分區間 <MathInline math="[a, b]" /> 必須是<strong>有限區間 (Bounded Interval)</strong>。</li>
          <li>被積函數 <MathInline math="f(x)" /> 在該區間上必須是<strong>有界函數 (Bounded Function)</strong>。</li>
        </ol>
        然而在實際應用中（如物理學、機率論與工程數學），我們經常會遇到積分區間無限，或是被積函數在某些點趨近於無窮大的情況。
        為了解決這些問題，我們必須推廣定積分的定義，這就是<strong>瑕積分 (Improper Integrals)</strong>。
      </div>

      {/* 一、第一類瑕積分：無窮區間 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        一、第一類瑕積分：無窮區間 (Type I: Infinite Intervals)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        當定積分的上限、下限或兩者皆為無窮大時，我們稱之為第一類瑕積分。其基本思想是利用極限，先計算有限區間上的積分，再令端點趨近於無窮大。
      </div>

      <Definition title="第一類瑕積分的定義">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            1. <strong>單邊無窮上限：</strong>
            <br />
            若 <MathInline math="f(x)" /> 在 <MathInline math="[a, \infty)" /> 上連續，則：
            <MathBlock math="\int_{a}^{\infty} f(x) \, dx = \lim_{t \to \infty} \int_{a}^{t} f(x) \, dx" />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            2. <strong>單邊無窮下限：</strong>
            <br />
            若 <MathInline math="f(x)" /> 在 <MathInline math="(-\infty, b]" /> 上連續，則：
            <MathBlock math="\int_{-\infty}^{b} f(x) \, dx = \lim_{t \to -\infty} \int_{t}^{b} f(x) \, dx" />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            3. <strong>雙邊無窮區間：</strong>
            <br />
            若 <MathInline math="f(x)" /> 在 <MathInline math="(-\infty, \infty)" /> 上連續，我們可以任意選擇一個實數 <MathInline math="c" />（通常選 <MathInline math="c = 0" />）將其拆開：
            <MathBlock math="\int_{-\infty}^{\infty} f(x) \, dx = \int_{-\infty}^{c} f(x) \, dx + \int_{c}^{\infty} f(x) \, dx" />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', color: 'var(--text-primary)', fontWeight: '500' }}>
            收斂與發散 (Convergence & Divergence)：
            <br />
            <span style={{ color: 'var(--text-secondary)', fontWeight: 'normal' }}>
              若上述極限存在且為有限值，則稱該瑕積分<strong>收斂 (Convergent)</strong>，此極限值即為該積分的值。
              若極限不存在，則稱其為<strong>發散 (Divergent)</strong>。
              注意：對於雙邊無窮區間，<strong>必須兩個子積分皆收斂</strong>，整個瑕積分才算收斂，其值為兩子積分之和。
            </span>
          </div>
        </div>
      </Definition>

      <Theorem title={<>重要基準：<MathInline math="p" />-級數型無窮積分 (The <MathInline math="p" />-Integral)</>}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          考慮瑕積分 <MathInline math="\int_{1}^{\infty} \frac{1}{x^p} \, dx" />，其中 <MathInline math="p" /> 為常數：
          <ul style={{ margin: '8px 0 0 20px', paddingLeft: '0' }}>
            <li>當 <MathInline math="p > 1" /> 時，該瑕積分<strong>收斂</strong>。</li>
            <li>當 <MathInline math="p \le 1" /> 時，該瑕積分<strong>發散</strong>。</li>
          </ul>
        </div>
      </Theorem>



      {/* 二、第二類瑕積分：無窮不連續點 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        二、第二類瑕積分：無窮不連續點 (Type II: Discontinuous Integrands)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        如果被積函數 <MathInline math="f(x)" /> 在積分區間中的某個或多個點趨向於無窮大，這些點稱為<strong>瑕點 (Singularities)</strong>，相應的積分便稱為第二類瑕積分。
      </div>

      <Definition title="第二類瑕積分的定義">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            1. <strong>瑕點在左端點：</strong>
            <br />
            若 <MathInline math="f(x)" /> 在 <MathInline math="(a, b]" /> 上連續，且在 <MathInline math="a" /> 處有垂直漸近線（即 <MathInline math="\lim_{x \to a^+} |f(x)| = \infty" />），則：
            <MathBlock math="\int_{a}^{b} f(x) \, dx = \lim_{t \to a^+} \int_{t}^{b} f(x) \, dx" />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            2. <strong>瑕點在右端點：</strong>
            <br />
            若 <MathInline math="f(x)" /> 在 <MathInline math="[a, b)" /> 上連續，且在 <MathInline math="b" /> 處有垂直漸近線（即 <MathInline math="\lim_{x \to b^-} |f(x)| = \infty" />），則：
            <MathBlock math="\int_{a}^{b} f(x) \, dx = \lim_{t \to b^-} \int_{a}^{t} f(x) \, dx" />
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            3. <strong>瑕點在區間內部：</strong>
            <br />
            若 <MathInline math="f(x)" /> 在 <MathInline math="[a, b]" /> 上除了點 <MathInline math="c \in (a, b)" /> 之外皆連續，而在 <MathInline math="c" /> 處有垂直漸近線，則定義為：
            <MathBlock math="\int_{a}^{b} f(x) \, dx = \int_{a}^{c} f(x) \, dx + \int_{c}^{b} f(x) \, dx" />
            其中兩項子積分必須依照上述 1 與 2 的左/右端點瑕點定義進行計算。<strong>只有當此兩個子積分皆收斂時</strong>，原瑕積分才算收斂。
          </div>
        </div>
      </Definition>

      <Theorem title={<>重要基準：有限區間上的 <MathInline math="p" />-積分</>}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          考慮以 <MathInline math="x = 0" /> 為瑕點的積分 <MathInline math="\int_{0}^{1} \frac{1}{x^p} \, dx" />，其中 <MathInline math="p" /> 為常數：
          <ul style={{ margin: '8px 0 0 20px', paddingLeft: '0' }}>
            <li>當 <MathInline math="p < 1" /> 時，該瑕積分<strong>收斂</strong>，其值為 <MathInline math="\frac{1}{1-p}" />。</li>
            <li>當 <MathInline math="p \ge 1" /> 時，該瑕積分<strong>發散</strong>。</li>
          </ul>
        </div>
      </Theorem>

      {/* 三、審斂法 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        三、瑕積分的比較審斂法 (Comparison Tests)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        很多時候，我們無法輕易求出被積函數的反導函數。此時，可以透過將其與已知的標準函數（如 <MathInline math="1/x^p" /> 或 <MathInline math="e^{-ax}" />）進行比較，來判定該瑕積分是收斂還是發散。
      </div>

      <Theorem title="直接比較審斂法 (Direct Comparison Test)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設 <MathInline math="f" /> 與 <MathInline math="g" /> 在 <MathInline math="[a, \infty)" /> 上為連續函數，且滿足 <MathInline math="f(x) \ge g(x) \ge 0" /> 對於所有 <MathInline math="x \ge a" /> 皆成立：
          <ol style={{ margin: '8px 0 0 20px', paddingLeft: '0' }}>
            <li>若 <MathInline math="\int_{a}^{\infty} f(x) \, dx" /> <strong>收斂</strong>，則 <MathInline math="\int_{a}^{\infty} g(x) \, dx" /> 也<strong>收斂</strong>。</li>
            <li>若 <MathInline math="\int_{a}^{\infty} g(x) \, dx" /> <strong>發散</strong>，則 <MathInline math="\int_{a}^{\infty} f(x) \, dx" /> 也<strong>發散</strong>。</li>
          </ol>
          <div style={{ marginTop: '8px', fontStyle: 'italic' }}>
            （口訣：大收則小收，小發則大發）
          </div>
        </div>
      </Theorem>

      <Theorem title="極限比較審斂法 (Limit Comparison Test)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          設正值函數 <MathInline math="f(x) \ge 0" /> 與 <MathInline math="g(x) > 0" /> 在 <MathInline math="[a, \infty)" /> 上連續。如果極限：
          <MathBlock math="L = \lim_{x \to \infty} \frac{f(x)}{g(x)}" />
          存在，且 <MathInline math="0 < L < \infty" />，則兩個瑕積分：
          <MathBlock math="\int_{a}^{\infty} f(x) \, dx \quad \text{與} \quad \int_{a}^{\infty} g(x) \, dx" />
          具有<strong>相同的收斂性</strong>（即同時收斂，或同時發散）。
        </div>
      </Theorem>

      {/* 四、經典例題 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        四、經典例題詳解
      </h3>

      {/* 例題 1 */}
      <Example title="第一類瑕積分：分部積分與極限">
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          計算瑕積分： <MathInline math="\int_{1}^{\infty} \frac{\ln x}{x^2} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              這是一個上限為無窮大的第一類瑕積分。第一步，我們先將其寫成極限形式：
              <MathBlock math="\int_{1}^{\infty} \frac{\ln x}{x^2} \, dx = \lim_{t \to \infty} \int_{1}^{t} \frac{\ln x}{x^2} \, dx" />
            </div>
            <div style={{ margin: '14px 0' }}>
              為了求出不定積分 <MathInline math="\int \frac{\ln x}{x^2} \, dx" />，我們使用<strong>分部積分法 (Integration by Parts)</strong>：
              <br />
              令 <MathInline math="u = \ln x \implies du = \frac{1}{x} \, dx" />
              <br />
              令 <MathInline math="dv = x^{-2} \, dx \implies v = -\frac{1}{x}" />
              <br />
              代入公式 <MathInline math="\int u \, dv = uv - \int v \, du" />：
              <MathBlock math="
                \int \frac{\ln x}{x^2} \, dx 
                = -\frac{\ln x}{x} - \int \left( -\frac{1}{x} \right) \frac{1}{x} \, dx
                = -\frac{\ln x}{x} + \int x^{-2} \, dx
                = -\frac{\ln x}{x} - \frac{1}{x} + C
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              帶入定積分上下限 <MathInline math="1" /> 到 <MathInline math="t" />：
              <MathBlock math="
                \int_{1}^{t} \frac{\ln x}{x^2} \, dx 
                = \left[ -\frac{\ln x}{x} - \frac{1}{x} \right]_1^t 
                = \left( -\frac{\ln t}{t} - \frac{1}{t} \right) - (0 - 1)
                = 1 - \frac{\ln t}{t} - \frac{1}{t}
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              取極限 <MathInline math="t \to \infty" />：
              <br />
              顯然 <MathInline math="\lim_{t \to \infty} \frac{1}{t} = 0" />。
              而對於 <MathInline math="\lim_{t \to \infty} \frac{\ln t}{t}" />，這是 <MathInline math="\frac{\infty}{\infty}" /> 型的未定式，我們使用<strong>洛必達法則 (L'Hôpital's Rule)</strong>：
              <MathBlock math="\lim_{t \to \infty} \frac{\ln t}{t} = \lim_{t \to \infty} \frac{1/t}{1} = 0" />
              因此，
              <MathBlock math="
                \int_{1}^{\infty} \frac{\ln x}{x^2} \, dx 
                = \lim_{t \to \infty} \left( 1 - \frac{\ln t}{t} - \frac{1}{t} \right) 
                = 1 - 0 - 0 = 1
              " />
              此瑕積分<strong>收斂</strong>，其值為 <MathInline math="1" />。
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title="雙邊無窮區間之瑕積分">
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          計算瑕積分： <MathInline math="\int_{-\infty}^{\infty} \frac{1}{1+x^2} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              這是一個雙邊無窮的瑕積分。我們必須將其拆解為兩個單邊無窮的積分，通常選擇 <MathInline math="c = 0" />：
              <MathBlock math="
                \int_{-\infty}^{\infty} \frac{1}{1+x^2} \, dx 
                = \int_{-\infty}^{0} \frac{1}{1+x^2} \, dx + \int_{0}^{\infty} \frac{1}{1+x^2} \, dx
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              我們分別計算這兩個子積分：
              <br />
              1. 右半邊：
              <MathBlock math="
                \int_{0}^{\infty} \frac{1}{1+x^2} \, dx 
                = \lim_{t \to \infty} \int_{0}^{t} \frac{1}{1+x^2} \, dx
                = \lim_{t \to \infty} \Big[ \arctan x \Big]_0^t
                = \lim_{t \to \infty} \arctan t - 0 
                = \frac{\pi}{2}
              " />
              2. 左半邊：
              <MathBlock math="
                \int_{-\infty}^{0} \frac{1}{1+x^2} \, dx 
                = \lim_{s \to -\infty} \int_{s}^{0} \frac{1}{1+x^2} \, dx
                = \lim_{s \to -\infty} \Big[ \arctan x \Big]_s^0
                = 0 - \lim_{s \to -\infty} \arctan s
                = -\left( -\frac{\pi}{2} \right) = \frac{\pi}{2}
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              因為兩個子積分皆收斂，故原積分收斂，其值為兩者之和：
              <MathBlock math="
                \int_{-\infty}^{\infty} \frac{1}{1+x^2} \, dx 
                = \frac{\pi}{2} + \frac{\pi}{2} = \pi
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title="第二類瑕積分：端點為瑕點">
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          計算瑕積分： <MathInline math="\int_{0}^{1} \ln x \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              當 <MathInline math="x \to 0^+" /> 時，<MathInline math="\ln x \to -\infty" />，因此左端點 <MathInline math="x = 0" /> 是本題的瑕點。
              我們寫出其極限形式：
              <MathBlock math="\int_{0}^{1} \ln x \, dx = \lim_{t \to 0^+} \int_{t}^{1} \ln x \, dx" />
            </div>
            <div style={{ margin: '14px 0' }}>
              利用分部積分法，我們知道 <MathInline math="\ln x" /> 的反導函數為：
              <MathBlock math="\int \ln x \, dx = x\ln x - x + C" />
              代入積分上下限：
              <MathBlock math="
                \int_{t}^{1} \ln x \, dx 
                = \Big[ x\ln x - x \Big]_t^1
                = (1\ln 1 - 1) - (t\ln t - t)
                = -1 - t\ln t + t
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              現在取極限 <MathInline math="t \to 0^+" />：
              <br />
              顯然 <MathInline math="\lim_{t \to 0^+} t = 0" />。
              對於 <MathInline math="\lim_{t \to 0^+} t\ln t" />，我們將其改寫為 <MathInline math="\frac{\ln t}{1/t}" /> 以便使用洛必達法則：
              <MathBlock math="
                \lim_{t \to 0^+} t\ln t 
                = \lim_{t \to 0^+} \frac{\ln t}{t^{-1}} 
                = \lim_{t \to 0^+} \frac{1/t}{-t^{-2}} 
                = \lim_{t \to 0^+} (-t) = 0
              " />
              因此，
              <MathBlock math="
                \int_{0}^{1} \ln x \, dx 
                = \lim_{t \to 0^+} (-1 - t\ln t + t) 
                = -1 - 0 + 0 = -1
              " />
              該瑕積分<strong>收斂</strong>，其值為 <MathInline math="-1" />。
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 4 */}
      <Example title="比較審斂法判定收斂性">
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          判定下列瑕積分是否收斂： <MathInline math="\int_{1}^{\infty} \frac{2 + \cos x}{x} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              被積函數為 <MathInline math="f(x) = \frac{2+\cos x}{x}" />，由於分子含有三角函數，很難直接求出反導函數。
              我們考慮使用<strong>直接比較審斂法</strong>。
            </div>
            <div style={{ margin: '14px 0' }}>
              我們知道，餘弦函數的值域為 <MathInline math="-1 \le \cos x \le 1" />。
              因此，分子滿足：
              <MathBlock math="2 + \cos x \ge 2 - 1 = 1" />
              由於在積分區間 <MathInline math="[1, \infty)" /> 上，<MathInline math="x > 0" />，我們可以將不等式兩邊除以 <MathInline math="x" />：
              <MathBlock math="\frac{2+\cos x}{x} \ge \frac{1}{x} > 0" />
            </div>
            <div style={{ margin: '14px 0' }}>
              我們已知基準積分（<MathInline math="p=1" /> 時）：
              <MathBlock math="\int_{1}^{\infty} \frac{1}{x} \, dx" />
              是<strong>發散</strong>的。
              根據直接比較審斂法的「小發則大發」原則，由於較小的函數的積分發散，較大函數的積分也必定發散。
              <br />
              結論：瑕積分 <MathInline math="\int_{1}^{\infty} \frac{2+\cos x}{x} \, dx" /> <strong>發散</strong>。
            </div>
          </div>
        </Solution>
      </Example>


      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 計算第一類瑕積分：<MathInline math="\int_{0}^{\infty} e^{-2x} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：極限為 <MathInline math="\lim_{t \to \infty} \Big[ -\frac{1}{2}e^{-2x} \Big]_0^t = \frac{1}{2}" />，收斂）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 計算第二類瑕積分：<MathInline math="\int_{0}^{4} \frac{1}{\sqrt{x}} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：瑕點在 <MathInline math="x = 0" />，答案為 <MathInline math="\lim_{t \to 0^+} \Big[ 2\sqrt{x} \Big]_t^4 = 4" />，收斂）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 3.</strong> 判定瑕積分的收斂性：<MathInline math="\int_{1}^{\infty} \frac{x^2}{x^4 + 3x + 1} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：利用極限比較審斂法，與 <MathInline math="g(x) = \frac{1}{x^2}" /> 比較。因為 <MathInline math="\lim_{x \to \infty} \frac{f(x)}{g(x)} = 1" />，且 <MathInline math="\int_{1}^{\infty} \frac{1}{x^2} \, dx" /> 收斂，故原積分收斂）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

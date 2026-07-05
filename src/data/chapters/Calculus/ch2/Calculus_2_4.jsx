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

export default function Calculus_2_4() {
  return (
    <div>
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在研究函數的極限後，下一個最自然的幾何特徵便是「連續性 (Continuity)」。直觀而言，若一個函數的圖形可以「一筆畫」完成，沒有任何中斷、跳躍或空心點，我們就說該函數是連續的。在本節中，我們將透過極限給予連續性嚴謹的數學定義，分類常見的不連續點，並深入探討三個極具學術價值的存在性定理：<b>極值定理 (EVT)</b>、<b>介值定理 (IVT)</b> 與其衍生應用<b>勘根定理</b>。
      </p>

      {/* 第一部分：連續性的定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、點連續與區間連續 (Continuity at a Point & on an Interval)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        數學上，函數在某個特定點要達到「連續」，必須同時滿足定義域、極限存在性以及極限值與函數值相等這三個必備條件。
      </p>

      <Definition title="點連續的定義 (Continuity at a Point)">
        <p style={{ marginBottom: '12px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設函數 <MathInline math="f(x)" /> 定義在包含常數 <MathInline math="c" /> 的開區間內。若滿足以下三個條件，則稱函數 <MathInline math="f" /> 在點 <MathInline math="c" /> 處<b>連續 (Continuous)</b>：
        </p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>函數值有定義</strong>：<MathInline math="f(c)" /> 存在（即 <MathInline math="c" /> 落在 <MathInline math="f" /> 的定義域內）。
          </li>
          <li>
            <strong>極限存在</strong>：<MathInline math="\lim_{x \to c} f(x)" /> 存在。
          </li>
          <li>
            <strong>值相等</strong>：極限值等於函數值，即：
            <MathBlock math="\lim_{x \to c} f(x) = f(c)" />
          </li>
        </ol>
        <p style={{ marginTop: '12px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若上述三個條件中<strong>有任意一個不滿足</strong>，則稱函數 <MathInline math="f" /> 在點 <MathInline math="c" /> 處<b>不連續 (Discontinuous)</b>，此點 <MathInline math="c" /> 稱為<b>不連續點 (Point of Discontinuity)</b>。
        </p>
      </Definition>

      {/* 單側連續性 */}
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0' }}>
        如同極限有單側極限，連續性也有單側連續的概念：
      </p>

      <Definition title="單側連續性 (One-sided Continuity)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          - <strong>右連續 (Continuous from the right)</strong>：若 <MathInline math="\lim_{x \to c^+} f(x) = f(c)" />，則稱 <MathInline math="f" /> 在點 <MathInline math="c" /> 處右連續。
          <br />
          - <strong>左連續 (Continuous from the left)</strong>：若 <MathInline math="\lim_{x \to c^-} f(x) = f(c)" />，則稱 <MathInline math="f" /> 在點 <MathInline math="c" /> 處左連續。
        </p>
      </Definition>

      <Definition title="區間連續的定義 (Continuity on an Interval)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          1. <strong>開區間連續</strong>：若函數 <MathInline math="f" /> 在開區間 <MathInline math="(a, b)" /> 內的每一個點都連續，則稱其在開區間內連續。
          <br />
          2. <strong>閉區間連續</strong>：若函數 <MathInline math="f" /> 在開區間 <MathInline math="(a, b)" /> 內連續，且在左端點 <MathInline math="a" /> 處右連續，在右端點 <MathInline math="b" /> 處左連續，則稱其在閉區間 <MathInline math="[a, b]" /> 上連續。
        </p>
      </Definition>

      {/* 例題 1 */}
      <Example title="1：分段函數在分界點的連續性">
        <div style={{ color: 'var(--text-secondary)' }}>
          設分段函數定義如下，試求常數 <MathInline math="k" /> 的值，使函數 <MathInline math="f(x)" /> 在其定義域內皆為連續函數：
          <MathBlock math="f(x) = \begin{cases} x^2 - kx + 3, & x < 2 \\ 2x + k, & x \ge 2 \end{cases}" />
        </div>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            當 <MathInline math="x < 2" /> 時，<MathInline math="f(x) = x^2 - kx + 3" /> 為多項式函數，在該開區間內顯然連續；當 <MathInline math="x > 2" /> 時，<MathInline math="f(x) = 2x + k" /> 亦為多項式函數，同樣連續。
            <br />
            因此，唯一可能發生不連續的點在分界點 <strong><MathInline math="x = 2" /></strong>。
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            為了使函數在 <MathInline math="x = 2" /> 處連續，必須滿足極限存在且等於該點函數值，亦即：
            <MathBlock math="\lim_{x \to 2^-} f(x) = \lim_{x \to 2^+} f(x) = f(2)" />
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>1. 計算左極限：</strong>
            <MathBlock math="\lim_{x \to 2^-} f(x) = \lim_{x \to 2^-} (x^2 - kx + 3) = 2^2 - 2k + 3 = 7 - 2k" />
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>2. 計算右極限與函數值 f(2)：</strong>
            <MathBlock math="\lim_{x \to 2^+} f(x) = f(2) = 2(2) + k = 4 + k" />
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>3. 令左右極限相等求值：</strong>
            <MathBlock math="7 - 2k = 4 + k \implies 3k = 3 \implies k = 1" />
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            因此，當 <strong><MathInline math="k = 1" /></strong> 時，該函數在全體實數域上皆為連續函數。
          </div>
        </Solution>
      </Example>

      {/* 第二部分：不連續點的分類 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、不連續點的分類 (Classification of Discontinuities)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        若函數在某點 <MathInline math="c" /> 處不滿足連續條件，我們可以依據極限在該點的行為，將不連續點細分為以下四種類型：
      </p>

      {/* 不連續點四類卡片 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', margin: '24px 0' }}>
        
        {/* 可去 */}
        <div style={{
          backgroundColor: 'var(--proof-bg)',
          border: '1px solid var(--border-color)',
          borderTop: '4px solid var(--accent-secondary)',
          borderRadius: 'var(--radius-md)',
          padding: '20px'
        }} className="math-serif">
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.05rem', fontWeight: '700' }}>
            1. 可去不連續點 (Removable Discontinuity)
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <strong>特徵</strong>：雙側極限 <MathInline math="\lim_{x \to c} f(x)" /> 存在，但極限值<strong>不等於</strong>該點函數值 <MathInline math="f(c)" />（或者 <MathInline math="f(c)" /> 未定義）。
            <br />
            <strong>幾何表現</strong>：圖線上只有一個單純的「空心孔」，我們可以藉由重定義該點的數值來使函數重新連續。
            <br />
            <strong>範例</strong>：<MathInline math="f(x) = \frac{x^2 - 1}{x - 1}" /> 在 <MathInline math="x = 1" />。
          </p>
        </div>

        {/* 跳躍 */}
        <div style={{
          backgroundColor: 'var(--proof-bg)',
          border: '1px solid var(--border-color)',
          borderTop: '4px solid var(--accent-warm)',
          borderRadius: 'var(--radius-md)',
          padding: '20px'
        }} className="math-serif">
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.05rem', fontWeight: '700' }}>
            2. 跳躍不連續點 (Jump Discontinuity)
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <strong>特徵</strong>：左極限與右極限皆存在，但<strong>互不相等</strong>。
            <br />
            <strong>幾何表現</strong>：圖線在該點發生了高度的「斷層」或跳躍。
            <br />
            <strong>範例</strong>：符號函數 <MathInline math="f(x) = \text{sgn}(x) = \frac{x}{|x|}" /> 在 <MathInline math="x = 0" />（左極限為 -1，右極限為 1）。
          </p>
        </div>

        {/* 無窮 */}
        <div style={{
          backgroundColor: 'var(--proof-bg)',
          border: '1px solid var(--border-color)',
          borderTop: '4px solid var(--accent-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '20px'
        }} className="math-serif">
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.05rem', fontWeight: '700' }}>
            3. 無窮不連續點 (Infinite Discontinuity)
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <strong>特徵</strong>：單側或雙側極限至少有一個趨向於正無窮大或負無窮大。
            <br />
            <strong>幾何表現</strong>：該點對應一條垂直漸近線。
            <br />
            <strong>範例</strong>：倒數平方函數 <MathInline math="f(x) = \frac{1}{x^2}" /> 在 <MathInline math="x = 0" />。
          </p>
        </div>

        {/* 振盪 */}
        <div style={{
          backgroundColor: 'var(--proof-bg)',
          border: '1px solid var(--border-color)',
          borderTop: '4px solid hsl(320, 80%, 60%)',
          borderRadius: 'var(--radius-md)',
          padding: '20px'
        }} className="math-serif">
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.05rem', fontWeight: '700' }}>
            4. 振盪不連續點 (Oscillating Discontinuity)
          </h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>
            <strong>特徵</strong>：當自變數逼近該點時，函數值無窮次激烈振盪，無法穩定趨近任何實數或無窮。
            <br />
            <strong>幾何表現</strong>：圖形在該點附近擺動密度趨向無限。
            <br />
            <strong>範例</strong>：正弦振盪函數 <MathInline math="f(x) = \sin\left(\frac{1}{x}\right)" /> 在 <MathInline math="x = 0" />。
          </p>
        </div>

      </div>

      {/* 第三部分：連續函數的性質 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        三、連續函數的性質與複合函數極限 (Properties & Composition)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        連續函數在各種代數運算下具備極佳的封閉性。此外，連續性也是極限運算中能將「極限符號直接搬移進函數括弧內」的核心保證。
      </p>

      <Theorem title="連續函數的運算法則">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若函數 <MathInline math="f" /> 與 <MathInline math="g" /> 在點 <MathInline math="c" /> 處連續，且 <MathInline math="A" /> 為常數，則下列各函數在點 <MathInline math="c" /> 處亦為連續：
          <MathBlock math="f + g, \quad f - g, \quad A \cdot f, \quad f \cdot g, \quad \frac{f}{g} \ (\text{需滿足 } g(c) \ne 0)" />
        </div>
      </Theorem>

      <Theorem title="複合函數的連續性與極限搬移定理">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '12px' }}>
          若極限 <MathInline math="\lim_{x \to c} g(x) = b" />，且外部函數 <MathInline math="f" /> 在點 <MathInline math="b" /> 處連續，則：
          <MathBlock math="\lim_{x \to c} f(g(x)) = f\left( \lim_{x \to c} g(x) \right) = f(b)" />
        </div>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          特別地，若內部函數 <MathInline math="g" /> 在點 <MathInline math="c" /> 連續，且外部函數 <MathInline math="f" /> 在點 <MathInline math="g(c)" /> 連續，則其複合函數 <MathInline math="f \circ g" /> 在點 <MathInline math="c" /> 處亦連續：
          <MathBlock math="\lim_{x \to c} f(g(x)) = f(g(c))" />
        </div>
      </Theorem>

      <Example title="2：複合函數極限的計算">
        <div style={{ color: 'var(--text-secondary)' }}>
          試計算極限：
          <MathBlock math="\lim_{x \to 1} \arcsin\left( \frac{1 - \sqrt{x}}{1 - x} \right)" />
        </div>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            <strong>【分析與解答】</strong>：
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            我們首先定義外部函數 <MathInline math="f(t) = \arcsin(t)" /> 與內部函數 <MathInline math="g(x) = \frac{1 - \sqrt{x}}{1 - x}" />。
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            因為反三角函數 <MathInline math="\arcsin(t)" /> 在其定義域內是連續函數，所以我們可以使用極限搬移定理，先計算內部函數 <MathInline math="g(x)" /> 的極限：
            <MathBlock math="L = \lim_{x \to 1} \frac{1 - \sqrt{x}}{1 - x}" />
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            將分母因式分解：
            <MathBlock math="1 - x = (1 - \sqrt{x})(1 + \sqrt{x})" />
            在限制條件 <MathInline math="x \ne 1" /> 下，消去共同因子：
            <MathBlock math="L = \lim_{x \to 1} \frac{1 - \sqrt{x}}{(1 - \sqrt{x})(1 + \sqrt{x})} = \lim_{x \to 1} \frac{1}{1 + \sqrt{x}} = \frac{1}{1 + 1} = \frac{1}{2}" />
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            由於外部函數 <MathInline math="f(t) = \arcsin(t)" /> 在 <MathInline math="t = \frac{1}{2}" /> 處連續，因此將結果帶回：
            <MathBlock math="\lim_{x \to 1} \arcsin\left( \frac{1 - \sqrt{x}}{1 - x} \right) = \arcsin\left( \lim_{x \to 1} \frac{1 - \sqrt{x}}{1 - x} \right) = \arcsin\left( \frac{1}{2} \right) = \frac{\pi}{6}" />
          </div>
        </Solution>
      </Example>

      {/* 第四部分：連續函數的重要定理 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.4rem', fontWeight: '600' }}>
        四、連續函數的重要定理 (Key Theorems of Continuous Functions)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '24px' }}>
        在微積分中，連續函數擁有許多優良的性質。以下三個定理（介值定理、勘根定理、極值定理）均用來保證特定點或值的「存在性」。
      </p>

      {/* 勘根定理卡片 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(6, 182, 212, 0.03)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-secondary)',
          backgroundColor: 'rgba(6, 182, 212, 0.02)'
        }}>
          <span>🔍 勘根定理 (Bolzano's Theorem / Root-finding Theorem)</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            這是介值定理最實用的應用。如果我們發現一個連續函數在某個區間的兩端一正一負，亦即函數值異號，那麼該函數圖形在跨越這個區間時，必定會與 <MathInline math="x" /> 軸相交。
          </p>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: '700' }}>定理內容：</h5>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            若函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上連續，且兩端點函數值<b>異號</b>（即 <MathInline math="f(a) \cdot f(b) < 0" />），則在開區間 <MathInline math="(a, b)" /> 內至少存在一個實數 <MathInline math="c" /> 使得：
            <MathBlock math="f(c) = 0" />
            <span style={{ fontSize: '0.92rem', fontStyle: 'italic', display: 'block', marginTop: '10px', color: 'var(--text-tertiary)' }}>
              *註：這保證了方程式 <MathInline math="f(x) = 0" /> 在該區間內必定有實數根。
            </span>
          </div>
        </div>
      </div>

      {/* 介值定理卡片 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-primary)',
        backgroundColor: 'rgba(139, 92, 246, 0.03)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-primary)',
          backgroundColor: 'rgba(139, 92, 246, 0.02)'
        }}>
          <span>📏 介值定理 (Intermediate Value Theorem, IVT)</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            直觀來說，如果你從海拔 100 公尺爬到 500 公尺，只要你的軌跡是連續的，你在此過程中必定會經過這之間的任何高度（例如海拔 300 公尺）。
          </p>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: '700' }}>定理內容：</h5>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            若函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上連續，且 <MathInline math="k" /> 是一個介於 <MathInline math="f(a)" /> 與 <MathInline math="f(b)" /> 之間的任意實數（其中 <MathInline math="f(a) \ne f(b)" />），則在開區間 <MathInline math="(a, b)" /> 內至少存在一個實數 <MathInline math="c" /> 使得：
            <MathBlock math="f(c) = k" />
          </div>
        </div>
      </div>

      {/* 極值定理卡片 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(245, 158, 11, 0.03)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-warm)',
          backgroundColor: 'rgba(245, 158, 11, 0.02)'
        }}>
          <span>⛰️ 極值定理 (Extreme Value Theorem, EVT)</span>
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '14px' }}>
            此定理保證了一個連續函數在閉區間內一定能找到「最高點」與「最低點」。
          </p>
          <h5 style={{ color: 'var(--text-primary)', marginBottom: '8px', fontSize: '1rem', fontWeight: '700' }}>定理內容：</h5>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            若函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上連續，則 <MathInline math="f" /> 在該閉區間內必能取得絕對極大值 (Absolute Maximum) <MathInline math="M" /> 與絕對極小值 (Absolute Minimum) <MathInline math="m" />。
            <br />
            亦即，在閉區間 <MathInline math="[a, b]" /> 中至少存在兩個實數 <MathInline math="x_1, x_2" /> 使得：
            <MathBlock math="f(x_1) = m, \quad f(x_2) = M \quad \text{且} \quad m \le f(x) \le M \quad (\forall x \in [a, b])" />
          </div>
          <div style={{
            marginTop: '16px',
            padding: '10px 14px',
            backgroundColor: 'rgba(245, 158, 11, 0.02)',
            borderLeft: '3px solid var(--accent-warm)',
            borderRadius: '4px',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)'
          }}>
            💡 <strong>反思條件的重要性：</strong>
            <br />
            1. <strong>若區間非閉區間：</strong>例如 <MathInline math="f(x) = x" /> 在開區間 <MathInline math="(0, 1)" /> 連續，由於端點不包含在內，無法取得極值。
            <br />
            2. <strong>若函數非連續：</strong>例如在閉區間 <MathInline math="[0, 1]" /> 內，在半路將最高點扣掉變成不連續點，也可能無法取得極小或極大值。因此「連續」與「閉區間」兩大條件缺一不可。
          </div>
        </div>
      </div>

      {/* 例題 3 */}
      <Example title="3：介值（勘根）定理證明實根存在">
        <div style={{ color: 'var(--text-secondary)' }}>
          試證明五次代數方程式 <MathInline math="x^5 - 3x - 1 = 0" /> 在閉區間 <MathInline math="[1, 2]" /> 內至少存在一個實根。
        </div>
        <Solution>
          <div style={{ marginBottom: '10px' }}>
            <strong>【證明步驟】</strong>：
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>1. 構造函數並說明連續性：</strong>
            <br />
            我們設函數 <MathInline math="f(x) = x^5 - 3x - 1" />。
            <br />
            由於 <MathInline math="f(x)" /> 是一個多項式函數，根據多項式函數的性質，它在全體實數域上皆連續，因此在閉區間 <MathInline math="[1, 2]" /> 上亦為連續。
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>2. 計算區間端點的函數值：</strong>
            <br />
            - 當 <MathInline math="x = 1" /> 時：
            <MathBlock math="f(1) = 1^5 - 3(1) - 1 = 1 - 3 - 1 = -3 < 0" />
            - 當 <MathInline math="x = 2" /> 時：
            <MathBlock math="f(2) = 2^5 - 3(2) - 1 = 32 - 6 - 1 = 25 > 0" />
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
            <strong>3. 套用勘根定理：</strong>
            <br />
            因為 <MathInline math="f(x)" /> 在閉區間 <MathInline math="[1, 2]" /> 連續，且兩端點的函數值異號，即：
            <MathBlock math="f(1) \cdot f(2) = (-3) \cdot 25 = -75 < 0" />
            根據勘根定理（或介值定理取 <MathInline math="N = 0" />），在開區間 <MathInline math="(1, 2)" /> 內至少存在一個實數 <MathInline math="c" /> 滿足：
            <MathBlock math="f(c) = c^5 - 3c - 1 = 0" />
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            這意謂著方程式 <MathInline math="x^5 - 3x - 1 = 0" /> 在閉區間 <MathInline math="[1, 2]" /> 內至少有一個實數根。 <MathInline math="\blacksquare" />
          </div>
        </Solution>
      </Example>

      {/* 第五部分：課後練習題 */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />

      <Exercises>
        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            1. 設分段函數如下，若該函數在 <MathInline math="x = 1" /> 處連續，求實數 <MathInline math="a" /> 與 <MathInline math="b" /> 的值：
            <MathBlock math="f(x) = \begin{cases} a x^2 + b, & x < 1 \\ 4, & x = 1 \\ 2a x - b, & x > 1 \end{cases}" />
          </div>
          <Solution>
            <div style={{ marginBottom: '10px' }}>
              <strong>【解答】</strong>
              <br />
              為了使 <MathInline math="f(x)" /> 在 <MathInline math="x = 1" /> 處連續，必須滿足左極限與右極限皆等於該點的函數值 <MathInline math="f(1) = 4" />：
              <MathBlock math="\lim_{x \to 1^-} f(x) = \lim_{x \to 1^+} f(x) = 4" />
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <strong>1. 左極限部分：</strong>
              <MathBlock math="\lim_{x \to 1^-} (ax^2 + b) = a(1)^2 + b = a + b" />
              因此我們得到第一個方程式：
              <MathBlock math="a + b = 4 \quad \text{--- (1)}" />
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <strong>2. 右極限部分：</strong>
              <MathBlock math="\lim_{x \to 1^+} (2ax - b) = 2a(1) - b = 2a - b" />
              因此我們得到第二個方程式：
              <MathBlock math="2a - b = 4 \quad \text{--- (2)}" />
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <strong>3. 聯立求解 (1) 與 (2)：</strong>
              <br />
              將兩式相加：
              <MathBlock math="(a + b) + (2a - b) = 4 + 4 \implies 3a = 8 \implies a = \frac{8}{3}" />
              代回式 (1) 求得 <MathInline math="b" />：
              <MathBlock math="b = 4 - a = 4 - \frac{8}{3} = \frac{4}{3}" />
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              開區間內的第一個方程式：
            </div>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            2. 分類函數 <MathInline math="f(x) = \frac{x^2 - x - 6}{x^2 - 9}" /> 的所有不連續點。
          </div>
          <Solution>
            <div style={{ marginBottom: '10px' }}>
              <strong>【解答】</strong>
              <br />
              首先對分子與分母進行因式分解，找出使分母為零的點：
              <MathBlock math="f(x) = \frac{(x-3)(x+2)}{(x-3)(x+3)}" />
              分母為零的點為 <strong><MathInline math="x = 3" /></strong> 與 <strong><MathInline math="x = -3" /></strong>。我們分別討論這兩點的極限行為：
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <strong>1. 檢驗 x = 3 的極限：</strong>
              <MathBlock math="\lim_{x \to 3} f(x) = \lim_{x \to 3} \frac{(x-3)(x+2)}{(x-3)(x+3)} = \lim_{x \to 3} \frac{x+2}{x+3} = \frac{3+2}{3+3} = \frac{5}{6}" />
              因為雙側極限存在（且為有限實數），但函數在該點無定義，因此 <strong><MathInline math="x = 3" /> 是可去不連續點 (Removable Discontinuity)</strong>。
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              <strong>2. 檢驗 x = -3 的極限：</strong>
              <br />
              當 <MathInline math="x \to -3" /> 時，分子趨近於 <MathInline math="-3+2 = -1" />，分母趨近於 0，為「非零常數除以零」的發散形式：
              <MathBlock math="\lim_{x \to -3^+} f(x) = -\infty, \quad \lim_{x \to -3^-} f(x) = \infty" />
              由於極限為無窮大，因此 <strong><MathInline math="x = -3" /> 是無窮不連續點 (Infinite Discontinuity)</strong>。
            </div>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            3. 計算複合極限值：
            <MathBlock math="\lim_{x \to 0} \cos\left( \frac{\sin x}{x} \right)" />
          </div>
          <Solution>
            <div style={{ marginBottom: '10px' }}>
              <strong>【解答】</strong>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              設外部函數 <MathInline math="f(t) = \cos(t)" /> 且內部函數 <MathInline math="g(x) = \frac{\sin x}{x}" />。
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              已知基本極限：
              <MathBlock math="b = \lim_{x \to 0} \frac{\sin x}{x} = 1" />
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              由於餘弦函數 <MathInline math="f(t) = \cos(t)" /> 在實數域上的每一點皆連續，特別是在 <MathInline math="t = 1" /> 連續。因此，根據複合函數極限搬移定理：
              <MathBlock math="\lim_{x \to 0} \cos\left( \frac{\sin x}{x} \right) = \cos\left( \lim_{x \to 0} \frac{\sin x}{x} \right) = \cos(1)" />
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              因此，該極限值為 <strong><MathInline math="\cos(1)" /></strong>（注意此處為弧度值）。
            </div>
          </Solution>
        </ExerciseItem>

        <ExerciseItem>
          <div style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '8px' }}>
            4. 試證明方程式 <MathInline math="\cos x = x" /> 在開區間 <MathInline math="(0, \frac{\pi}{2})" /> 內至少有一個實根。
          </div>
          <Solution>
            <div style={{ marginBottom: '10px' }}>
              <strong>【證明】</strong>
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              我們首先將方程式改寫為 <MathInline math="\cos x - x = 0" /> 的形式，並定義函數：
              <MathBlock math="f(x) = \cos x - x" />
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              由於餘弦函數 <MathInline math="\cos x" /> 與線性函數 <MathInline math="x" /> 在全實數上皆為連續函數，兩者相減的差函數 <MathInline math="f(x)" /> 在閉區間 <MathInline math="[0, \frac{\pi}{2}]" /> 上亦為連續。
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              計算閉區間兩個端點的函數值：
              <br />
              - 當 <MathInline math="x = 0" /> 時：
              <MathBlock math="f(0) = \cos(0) - 0 = 1 - 0 = 1 > 0" />
              - 當 <MathInline math="x = \frac{\pi}{2}" /> 時：
              <MathBlock math="f\left(\frac{\pi}{2}\right) = \cos\left(\frac{\pi}{2}\right) - \frac{\pi}{2} = 0 - \frac{\pi}{2} = -\frac{\pi}{2} < 0" />
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              因為 <MathInline math="f(x)" /> 在 <MathInline math="[0, \frac{\pi}{2}]" /> 上連續，且 <MathInline math="f(0) \cdot f\left(\frac{\pi}{2}\right) = 1 \cdot \left(-\frac{\pi}{2}\right) = -\frac{\pi}{2} < 0" />。
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              根據勘根定理，在開區間 <MathInline math="(0, \frac{\pi}{2})" /> 內至少存在一個實數 <MathInline math="c" /> 使得 <MathInline math="f(c) = 0" />，即：
              <br />
              <MathBlock math="\cos c - c = 0 \implies \cos c = c" />
              這證明了方程式 <MathInline math="\cos x = x" /> 在該開區間內至少存在一個實數根。 <MathInline math="\blacksquare" />
            </div>
          </Solution>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

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


export default function Calculus_5_3() {
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
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px'
  };

  return (
    <div>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在前一節中，我們探討了如何求得曲線下方的面積。當時，我們要求函數 <MathInline math="f(x)" /> 必須非負。
        然而，更一般的情況下，函數的圖像可能會落到 <MathInline math="x" /> 軸下方。
        在本節中，我們將引進<strong>「定積分」 (Definite Integral)</strong> 的正式定義，它透過黎曼和的極限，將面積的概念推廣到了一般函數上。
      </p>

      {/* 定積分的正式定義 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        一、定積分的數學定義 (Definition of Definite Integral)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        給定定義在閉區間 <MathInline math="[a, b]" /> 上的連續函數 <MathInline math="f: [a, b] \longrightarrow \mathbb{R}" />（特別注意：此時 <strong><MathInline math="f" /> 不需要為正值</strong>，即 <MathInline math="f" /> 不需要 positive）。
        我們將區間 <MathInline math="[a, b]" /> 分成等長的 <MathInline math="n" /> 個子區間 (subintervals)，每一段的寬度為：
        <MathBlock math="\Delta x = \frac{b - a}{n}" />
        並令子區間端點為：
        <MathBlock math="a = x_0 < x_1 = x_0 + \Delta x < x_2 = x_0 + 2\Delta x < \dots < x_n = b" />
        在每一個子區間 <MathInline math="[x_{i-1}, x_i]" /> 中，我們選取一個樣本點 (Sample Point) <MathInline math="x_i^* \in [x_{i-1}, x_i]" />。
        此時我們可構造出一個加總式，稱為<strong>黎曼和 (Riemann Sum)</strong>：
        <MathBlock math="\sum_{i=1}^n f(x_i^*) \Delta x" />
        <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
          註：<strong>黎曼和本身「沒有極限記號」</strong>，它僅代表有限個長方形面積的代數和。
        </span>
      </div>

      <Definition title="定積分 (Definite Integral)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '10px' }}>
          設 <MathInline math="f" /> 為定義在 <MathInline math="[a, b]" /> 上的函數，若以下極限存在：
          <MathBlock math="\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i^*) \Delta x" />
          且該極限值與子區間分割方式以及樣本點 <MathInline math="x_i^*" /> 的選取方式無關，則我們稱此極限值為 <MathInline math="f" /> 在區間 <MathInline math="[a, b]" /> 上的<strong>定積分</strong>。
          此時也稱 <MathInline math="f" /> 在該區間上是<strong>可積的 (Integrable)</strong>，上述方式定義出來的積分稱為<strong>黎曼積分 (Riemann Integral)</strong>。
        </div>
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', paddingTop: '10px', marginTop: '10px', fontSize: '0.9rem', color: 'var(--text-tertiary)' }}>
          <strong>符號解析：</strong>
          <ul style={{ paddingLeft: '20px', margin: '6px 0 0 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <li><MathInline math="\int" /> 稱為<strong>積分符號 (拉長的 S)</strong>，源自拉長字型的 S (Sum)。</li>
            <li><MathInline math="f(x)" /> 稱為<strong>被積函數 (Integrand)</strong>。</li>
            <li><MathInline math="a" /> 稱為<strong>下限 (Lower Limit)</strong>，而 <MathInline math="b" /> 稱為<strong>上限 (Upper Limit)</strong>。</li>
            <li><MathInline math="dx" /> 中的 <MathInline math="x" /> 代表積分變數。</li>
          </ul>
        </div>
      </Definition>

      <Definition title="虛擬變數的性質 (Dummy Variable)">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
          定積分 <MathInline math="\int_a^b f(x) \, dx" /> 是一個<strong>數值</strong>，與積分變數符號無關（稱為虛擬變數 dummy variable），即：
          <MathBlock math="\int_a^b f(x) \, dx = \int_a^b f(u) \, du = \int_a^b f(y) \, dy" />
          換成任何變數字母都可以，<strong>但必須全部一起更換</strong>。
        </div>
      </Definition>

      {/* 可積性定理 */}
      <Theorem title="可積的充分條件 (Theorem of Integrability)">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: 0 }}>
          如果函數 <MathInline math="f" /> 在閉區間 <MathInline math="[a, b]" /> 上是<strong>連續的 (Continuous)</strong>，或者只有<strong>有限個第一類間斷點（跳躍間斷點）</strong>，則 <MathInline math="f" /> 在 <MathInline math="[a, b]" /> 上必定是可積的。
        </p>
      </Theorem>


      {/* 西格瑪求和性質與公式 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        二、常用西格瑪 (\(\Sigma\)) 求和性質與冪次和公式
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        在使用黎曼和的定義計算定積分的極限時，我們需要熟練運用西格瑪（\(\Sigma\)）的代數運算性質，以及整數冪次求和公式。
      </p>

      <Definition title="西格瑪 (Σ) 運算性質">
        <div className="grid-2x2 limit-formulas-grid">
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              1. 常數項求和
            </span>
            <MathBlock math="\sum_{i=1}^n c = cn" />
          </div>
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              2. 提出常數
            </span>
            <MathBlock math="\sum_{i=1}^n c a_i = c \sum_{i=1}^n a_i" />
          </div>
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              3. 分配律（和）
            </span>
            <MathBlock math="\sum_{i=1}^n (a_i + b_i) = \sum_{i=1}^n a_i + \sum_{i=1}^n b_i" />
          </div>
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              4. 分配律（差）
            </span>
            <MathBlock math="\sum_{i=1}^n (a_i - b_i) = \sum_{i=1}^n a_i - \sum_{i=1}^n b_i" />
          </div>
        </div>
      </Definition>

      <Theorem title="常用連續整數冪次和公式">
        <div className="limit-formulas-grid" style={gridStyle}>
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              1. 一次方和 (等差數列和)
            </span>
            <MathBlock math="\sum_{i=1}^n i = \frac{n(n+1)}{2}" />
          </div>
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              2. 平方和
            </span>
            <MathBlock math="\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}" />
          </div>
          <div style={subCardStyle}>
            <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
              3. 立方和
            </span>
            <MathBlock math="\sum_{i=1}^n i^3 = \left( \frac{n(n+1)}{2} \right)^2" />
          </div>
        </div>
      </Theorem>

      {/* 定積分的運算性質 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        三、定積分的運算性質 (Properties of the Definite Integral)
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px' }}>
        定積分具有許多十分優美的代數與幾何運算性質，它們在簡化複雜的積分計算中扮演了極重要的角色。
      </p>

      <Definition title="定積分基本代數性質">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px', lineHeight: '1.7' }}>
          <li>
            <strong>1. 積分上限與下限對調：</strong>
            <MathBlock math="\int_b^a f(x) \, dx = -\int_a^b f(x) \, dx" />
            當我們反向積分時（寬度 <MathInline math="\Delta x" /> 的方向相反），其值變號。
          </li>
          <li>
            <strong>2. 區間長度為零：</strong>
            <MathBlock math="\int_a^a f(x) \, dx = 0" />
            寬度為 0 的長方形，其面積顯然為 0。
          </li>
          <li>
            <strong>3. 常數函數的積分：</strong>
            <MathBlock math="\int_a^b c \, dx = c(b - a) \quad (\text{其中 } c \text{ 為任意常數})" />
            這代表一個寬度為 <MathInline math="b-a" />、高度為 <MathInline math="c" /> 的長方形面積。
          </li>
          <li>
            <strong>4. 線性性質 (Linear Properties)：</strong>
            <MathBlock math="\int_a^b [f(x) \pm g(x)] \, dx = \int_a^b f(x) \, dx \pm \int_a^b g(x) \, dx" />
            <MathBlock math="\int_a^b c f(x) \, dx = c \int_a^b f(x) \, dx" />
          </li>
          <li>
            <strong>5. 區間可加性 (Additivity)：</strong>
            <MathBlock math="\int_a^c f(x) \, dx + \int_c^b f(x) \, dx = \int_a^b f(x) \, dx \quad (\text{無論 } c \text{ 是否位於 } a, b \text{ 之間})" />
            這個性質常被用在處理分段定義函數或絕對值函數的積分。
          </li>
        </ul>
      </Definition>

      {/* 定積分的大小比較性質 */}
      <h4 style={{ margin: '24px 0 12px 0', color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: '600' }}>
        定積分的大小比較與估計 (Comparison Properties)
      </h4>
      
      <Theorem title="比較性質">
        <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px', lineHeight: '1.7', margin: 0 }}>
          <li>
            <strong>1. 保號性 (Nonnegativity)：</strong>
            若在 <MathInline math="[a, b]" /> 上 <MathInline math="f(x) \ge 0" />，則：
            <MathBlock math="\int_a^b f(x) \, dx \ge 0" />
          </li>
          <li>
            <strong>2. 單調性 (Monotonicity)：</strong>
            若在 <MathInline math="[a, b]" /> 上 <MathInline math="f(x) \ge g(x)" />，則：
            <MathBlock math="\int_a^b f(x) \, dx \ge \int_a^b g(x) \, dx" />
          </li>
          <li>
            <strong>3. 估計性質 (Bounding Theorem)：</strong>
            若在 <MathInline math="[a, b]" /> 上 <MathInline math="m \le f(x) \le M" />，則：
            <MathBlock math="m(b - a) \le \int_a^b f(x) \, dx \le M(b - a)" />
          </li>
          <li>
            <strong>4. 積分三角不等式 (Triangle Inequality)：</strong>
            若 <MathInline math="f(x)" /> 在 <MathInline math="[a, b]" /> 上可積，則：
            <MathBlock math="\left| \int_a^b f(x) \, dx \right| \le \int_a^b |f(x)| \, dx" />
          </li>
        </ul>
      </Theorem>

      {/* 精選例題 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.3rem', fontWeight: '600' }}>
        四、精選例題與詳細解答 (Examples)
      </h3>

      <Example title="1：利用幾何面積求定積分">
        <p style={{ color: 'var(--text-secondary)' }}>
          試求定積分 <MathInline math="\int_0^2 \sqrt{4 - x^2} \, dx" /> 之值。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            考慮函數關係式 <MathInline math="y = \sqrt{4 - x^2}" />。
            我們將等號兩邊平方：
            <MathBlock math="y^2 = 4 - x^2 \implies x^2 + y^2 = 4" />
            這是一個以原點為中心、半徑為 <MathInline math="r = 2" /> 的圓形。
            由於原本的函數為 <MathInline math="y = \sqrt{4 - x^2} \ge 0" />，它代表這個圓形的上半圓。
            <br />
            積分區間為 <MathInline math="x \in [0, 2]" />，這剛好是該半圓落在第一象限的部分，即圓面積的<strong>四分之一</strong>。
            <br /><br />
            因此，我們可以利用幾何圖形的面積公式直接求得此定積分之值：
            <MathBlock math="\int_0^2 \sqrt{4 - x^2} \, dx = \frac{1}{4} \cdot \pi r^2 = \frac{1}{4} \cdot \pi (2)^2 = \pi" />
          </div>
        </Solution>
      </Example>

      <Example title="2：利用黎曼和定義與極限求定積分">
        <div style={{ color: 'var(--text-secondary)' }}>
          試使用定積分的黎曼和極限定義，計算定積分：
          <MathBlock math="\int_1^3 x^2 \, dx" />
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <strong>【第一步：切分區間與計算寬度】</strong>
            <br />
            將區間 <MathInline math="[1, 3]" /> 等分成 <MathInline math="n" /> 段，則每個子區間的寬度為：
            <MathBlock math="\Delta x = \frac{3 - 1}{n} = \frac{2}{n}" />
            <strong>【第二步：設定右端點作為樣本點】</strong>
            <br />
            我們選擇每個區間的右端點作為樣本點 <MathInline math="x_i^* = x_i" />：
            <MathBlock math="x_i = a + i\Delta x = 1 + \frac{2i}{n} \quad (i = 1, 2, \dots, n)" />
            <strong>【第三步：寫出右端點黎曼和 Rₙ】</strong>
            <br />
            被積函數為 <MathInline math="f(x) = x^2" />，我們將高度值代入：
            <MathBlock math="R_n = \sum_{i=1}^n f(x_i) \Delta x = \sum_{i=1}^n \left( 1 + \frac{2i}{n} \right)^2 \cdot \frac{2}{n}" />
            展開括號：
            <MathBlock math="R_n = \frac{2}{n} \sum_{i=1}^n \left( 1 + \frac{4i}{n} + \frac{4i^2}{n^2} \right)" />
            利用西格瑪（求和）的分配律拆開：
            <MathBlock math="R_n = \frac{2}{n} \left[ \sum_{i=1}^n 1 + \frac{4}{n}\sum_{i=1}^n i + \frac{4}{n^2}\sum_{i=1}^n i^2 \right]" />
            套用連續整數的求和公式：
            <MathBlock math="\sum_{i=1}^n 1 = n, \quad \sum_{i=1}^n i = \frac{n(n+1)}{2}, \quad \sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}" />
            代入並展開：
            <MathBlock math="R_n = \frac{2}{n} \left[ n + \frac{4}{n} \cdot \frac{n(n+1)}{2} + \frac{4}{n^2} \cdot \frac{n(n+1)(2n+1)}{6} \right]" />
            <MathBlock math="R_n = 2 + 4 \cdot \frac{n+1}{n} + \frac{4}{3} \cdot \frac{(n+1)(2n+1)}{n^2}" />
            <MathBlock math="R_n = 2 + 4 \left( 1 + \frac{1}{n} \right) + \frac{4}{3} \left( 1 + \frac{1}{n} \right)\left( 2 + \frac{1}{n} \right)" />
            <strong>【第四步：取無窮分割之極限】</strong>
            <br />
            令 <MathInline math="n \to \infty" />：
            <MathBlock math="\lim_{n \to \infty} R_n = 2 + 4(1) + \frac{4}{3}(1)(2) = 2 + 4 + \frac{8}{3} = 6 + \frac{8}{3} = \frac{26}{3}" />
            因此，定積分的精確值為 <strong><MathInline math="26/3" /></strong>。
            <br />
            <em>（註：若利用後續學習的微積分基本定理 FTC 計算：<MathInline math="\left[ \frac{x^3}{3} \right]_1^3 = \frac{27}{3} - \frac{1}{3} = \frac{26}{3}" />，兩者完全一致！）</em>
          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試將以下黎曼和的無窮極限寫成在區間 <MathInline math="[0, \pi]" /> 上的定積分形式：
            <MathBlock math="\lim_{n \to \infty} \sum_{i=1}^n \left( (x_i^*)^3 + x_i^* \sin(x_i^*) \right) \Delta x" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （答案：根據定義，這可以直接對應為 <MathInline math="\int_0^\pi (x^3 + x \sin x) \, dx" />。）
            </span>
          </div>
        </ExerciseItem>
        
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 試利用定積分的運算性質與幾何面積定義，計算下列定積分：
            <MathBlock math="\int_{-2}^2 (x - \sqrt{4 - x^2}) \, dx" />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：將積分拆開為 <MathInline math="\int_{-2}^2 x \, dx - \int_{-2}^2 \sqrt{4 - x^2} \, dx" />。
              前項中 <MathInline math="y = x" /> 為奇函數或正負面積剛好抵消，故其值為 0；後項為半徑為 2 的半圓面積，值為 <MathInline math="\frac{1}{2} \pi (2)^2 = 2\pi" />。
              因此，答案為：<MathInline math="0 - 2\pi = -2\pi" />。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

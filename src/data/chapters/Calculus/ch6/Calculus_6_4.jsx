import { 
  Definition, 
  // Theorem, 
  Example, 
  Solution, 
  MathInline, 
  MathBlock, 
  // Proof,
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks';

export default function Calculus_6_4() {
  return (
    <div>
      {/* 導讀 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在本節中，我們將學習一種專門用來處理含有根式如 <MathInline math="\sqrt{a^2-x^2}" />、<MathInline math="\sqrt{a^2+x^2}" /> 或 <MathInline math="\sqrt{x^2-a^2}" /> 的被積函數之積分技巧。
        這種方法稱為<strong>三角代換法 (Trigonometric Substitution)</strong>。
        其核心思想是：<strong>藉由將代數變數代換為三角函數，利用三角恆等式（如平方關係）將根號內部的平方和或平方差項化簡，從而消除根號，將代數積分轉換為上一節所學的三角函數積分。</strong>
      </p>

      {/* 一、三大核心三角代換類型 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        一、三大核心三角代換類型
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        根據根號內代數式的型態，我們有以下三種標準的代換選擇，各代換皆有其特定的角度限制範圍（以確保代換後三角函數為單射且根號展開後取正值）：
      </div>

      {/* 類型 1 */}
      <Definition title={<>類型一：正弦代換 (適用於根式 <MathInline math="\sqrt{a^2-x^2}" />)</>}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '260px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <div>
              <strong>代換設定：</strong> 令 <MathInline math="x = a \sin \theta" />，限制角度 <MathInline math="\theta \in [-\frac{\pi}{2}, \frac{\pi}{2}]" />。
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>微分量：</strong> <MathInline math="dx = a \cos \theta \, d\theta" />。
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>根式化簡：</strong>
              <MathBlock math="\sqrt{a^2-x^2} = \sqrt{a^2 - a^2\sin^2\theta} = \sqrt{a^2(1-\sin^2\theta)} = a \cos\theta" />
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>直角三角形幾何關係：</strong> 對邊為 <MathInline math="x" />，斜邊為 <MathInline math="a" />，鄰邊為 <MathInline math="\sqrt{a^2-x^2}" />。
            </div>
          </div>
          <div style={{ width: '220px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: '5px' }}>
            <svg width="220" height="150" viewBox="0 0 240 150">
              {/* 三角形填充與外框 */}
              <path d="M 30 110 L 160 110 L 160 30 Z" stroke="var(--accent-primary)" strokeWidth="2.5" fill="rgba(139, 92, 246, 0.05)" strokeLinejoin="round" />
              {/* 直角標記 */}
              <path d="M 150 110 L 150 100 L 160 100" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />
              {/* 角度 theta 弧度 */}
              <path d="M 55 110 A 25 25 0 0 0 52.4 97.5" stroke="var(--accent-warm)" strokeWidth="2" fill="none" />
              {/* 角度 theta 文字 */}
              <text x="60" y="103" fill="var(--accent-warm)" fontSize="14" fontFamily="math, serif" fontStyle="italic">θ</text>
              {/* 對邊標籤 x */}
              <text x="170" y="75" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">x</text>
              {/* 斜邊標籤 a */}
              <text x="80" y="60" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">a</text>
              {/* 鄰邊標籤 √(a² - x²) */}
              <text x="65" y="130" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">√(a² - x²)</text>
            </svg>
          </div>
        </div>
      </Definition>

      {/* 類型 2 */}
      <Definition title={<>類型二：正切代換 (適用於根式 <MathInline math="\sqrt{a^2+x^2}" />)</>}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '260px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <div>
              <strong>代換設定：</strong> 令 <MathInline math="x = a \tan \theta" />，限制角度 <MathInline math="\theta \in (-\frac{\pi}{2}, \frac{\pi}{2})" />。
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>微分量：</strong> <MathInline math="dx = a \sec^2 \theta \, d\theta" />。
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>根式化簡：</strong>
              <MathBlock math="\sqrt{a^2+x^2} = \sqrt{a^2 + a^2\tan^2\theta} = \sqrt{a^2(1+\tan^2\theta)} = a \sec\theta" />
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>直角三角形幾何關係：</strong> 對邊為 <MathInline math="x" />，鄰邊為 <MathInline math="a" />，斜邊為 <MathInline math="\sqrt{a^2+x^2}" />。
            </div>
          </div>
          <div style={{ width: '220px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: '5px' }}>
            <svg width="220" height="150" viewBox="0 0 240 150">
              {/* 三角形填充與外框 */}
              <path d="M 30 110 L 160 110 L 160 30 Z" stroke="var(--accent-primary)" strokeWidth="2.5" fill="rgba(139, 92, 246, 0.05)" strokeLinejoin="round" />
              {/* 直角標記 */}
              <path d="M 150 110 L 150 100 L 160 100" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />
              {/* 角度 theta 弧度 */}
              <path d="M 55 110 A 25 25 0 0 0 52.4 97.5" stroke="var(--accent-warm)" strokeWidth="2" fill="none" />
              {/* 角度 theta 文字 */}
              <text x="60" y="103" fill="var(--accent-warm)" fontSize="14" fontFamily="math, serif" fontStyle="italic">θ</text>
              {/* 對邊標籤 x */}
              <text x="170" y="75" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">x</text>
              {/* 斜邊標籤 √(a² + x²) */}
              <text x="45" y="60" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">√(a² + x²)</text>
              {/* 鄰邊標籤 a */}
              <text x="90" y="130" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">a</text>
            </svg>
          </div>
        </div>
      </Definition>

      {/* 類型 3 */}
      <Definition title={<>類型三：割線代換 (適用於根式 <MathInline math="\sqrt{x^2-a^2}" />)</>}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: '1', minWidth: '260px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
            <div>
              <strong>代換設定：</strong> 令 <MathInline math="x = a \sec \theta" />。
              角度限制：當 <MathInline math="x \ge a" /> 時，限制 <MathInline math="\theta \in [0, \frac{\pi}{2})" />；當 <MathInline math="x \le -a" /> 時，限制 <MathInline math="\theta \in [\pi, \frac{3\pi}{2})" />。
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>微分量：</strong> <MathInline math="dx = a \sec \theta \tan \theta \, d\theta" />。
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>根式化簡：</strong>
              <MathBlock math="\sqrt{x^2-a^2} = \sqrt{a^2\sec^2\theta - a^2} = \sqrt{a^2(\sec^2\theta-1)} = a \tan\theta" />
            </div>
            <div style={{ marginTop: '8px' }}>
              <strong>直角三角形幾何關係：</strong> 斜邊為 <MathInline math="x" />，鄰邊為 <MathInline math="a" />，對邊為 <MathInline math="\sqrt{x^2-a^2}" />。
            </div>
          </div>
          <div style={{ width: '220px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', padding: '5px' }}>
            <svg width="220" height="150" viewBox="0 0 240 150">
              {/* 三角形填充與外框 */}
              <path d="M 30 110 L 160 110 L 160 30 Z" stroke="var(--accent-primary)" strokeWidth="2.5" fill="rgba(139, 92, 246, 0.05)" strokeLinejoin="round" />
              {/* 直角標記 */}
              <path d="M 150 110 L 150 100 L 160 100" stroke="var(--text-tertiary)" strokeWidth="1.2" fill="none" />
              {/* 角度 theta 弧度 */}
              <path d="M 55 110 A 25 25 0 0 0 52.4 97.5" stroke="var(--accent-warm)" strokeWidth="2" fill="none" />
              {/* 角度 theta 文字 */}
              <text x="60" y="103" fill="var(--accent-warm)" fontSize="14" fontFamily="math, serif" fontStyle="italic">θ</text>
              {/* 對邊標籤 √(x² - a²) */}
              <text x="170" y="75" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">√(x² - a²)</text>
              {/* 斜邊標籤 x */}
              <text x="80" y="60" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">x</text>
              {/* 鄰邊標籤 a */}
              <text x="90" y="130" fill="var(--text-primary)" fontSize="13" fontFamily="math, serif" fontWeight="600">a</text>
            </svg>
          </div>
        </div>
      </Definition>


      {/* 二、經典例題詳解 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        二、經典例題詳解
      </h3>

      {/* 例題 1 */}
      <Example title={<>類型一：根號 <MathInline math="a^2 - x^2" /> 的正弦代換</>}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{\sqrt{9-x^2}}{x^2} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              被積函數含有根式 <MathInline math="\sqrt{9-x^2}" />，此為類型一，其中常數 <MathInline math="a = 3" />。
              我們令：
              <MathBlock math="x = 3 \sin \theta \quad \left( -\frac{\pi}{2} \le \theta \le \frac{\pi}{2} \right)" />
              則微分量與根式分別化簡為：
              <MathBlock math="dx = 3 \cos \theta \, d\theta" />
              <MathBlock math="\sqrt{9-x^2} = \sqrt{9 - 9\sin^2\theta} = \sqrt{9\cos^2\theta} = 3\cos\theta" />
            </div>
            <div style={{ margin: '14px 0' }}>
              將其代回原代數積分式中：
              <MathBlock math="
                \int \frac{\sqrt{9-x^2}}{x^2} \, dx 
                = \int \frac{3\cos\theta}{(3\sin\theta)^2} \cdot (3\cos\theta \, d\theta) 
                = \int \frac{9\cos^2\theta}{9\sin^2\theta} \, d\theta
              " />
              約分後，利用餘切定義與平方恆等式：
              <MathBlock math="
                = \int \cot^2 \theta \, d\theta 
                = \int (\csc^2 \theta - 1) \, d\theta
              " />
              進行逐項積分：
              <MathBlock math="
                = -\cot \theta - \theta + C
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              由於原本題目為自變數 <MathInline math="x" />，我們必須將 <MathInline math="\theta" /> 與 <MathInline math="\cot\theta" /> 還原為 <MathInline math="x" />：
              <br />
              1. 根據代換設定： <MathInline math="\sin\theta = \frac{x}{3} \implies \theta = \arcsin\left(\frac{x}{3}\right)" />。
              <br />
              2. 利用直角三角形關係：對邊為 <MathInline math="x" />，斜邊為 <MathInline math="3" />，則鄰邊為 <MathInline math="\sqrt{9-x^2}" />。
              由此可得：
              <MathBlock math="\cot \theta = \frac{\text{鄰邊}}{\text{對邊}} = \frac{\sqrt{9-x^2}}{x}" />
              代回積分結果，即得最終解：
              <MathBlock math="
                = -\frac{\sqrt{9-x^2}}{x} - \arcsin\left(\frac{x}{3}\right) + C
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title={<>類型二：根號 <MathInline math="a^2 + x^2" /> 的正切代換</>}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{1}{x^2\sqrt{x^2+4}} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              被積函數分母含有根式 <MathInline math="\sqrt{x^2+4}" />，此為類型二，其中常數 <MathInline math="a = 2" />。
              我們令：
              <MathBlock math="x = 2 \tan \theta \quad \left( -\frac{\pi}{2} < \theta < \frac{\pi}{2} \right)" />
              則微分量與根式分別化簡為：
              <MathBlock math="dx = 2 \sec^2 \theta \, d\theta" />
              <MathBlock math="\sqrt{x^2+4} = \sqrt{4\tan^2\theta+4} = \sqrt{4\sec^2\theta} = 2\sec\theta" />
            </div>
            <div style={{ margin: '14px 0' }}>
              將變數代回原代數積分式中：
              <MathBlock math="
                \int \frac{1}{x^2\sqrt{x^2+4}} \, dx 
                = \int \frac{1}{(2\tan\theta)^2 \cdot 2\sec\theta} \cdot (2\sec^2\theta \, d\theta) 
                = \int \frac{2\sec^2\theta}{8\tan^2\theta \cdot 2\sec\theta} \, d\theta
              " />
              約分簡化係數與割線函數：
              <MathBlock math="
                = \frac{1}{8} \int \frac{\sec\theta}{\tan^2\theta} \, d\theta
              " />
              將正切與割線以正弦、餘弦表示：
              <MathBlock math="
                \frac{\sec\theta}{\tan^2\theta} 
                = \frac{1/\cos\theta}{\sin^2\theta/\cos^2\theta} 
                = \frac{\cos\theta}{\sin^2\theta} 
                = \csc\theta\cot\theta
              " />
              因此積分式變為：
              <MathBlock math="
                = \frac{1}{8} \int \csc\theta\cot\theta \, d\theta 
                = -\frac{1}{8} \csc\theta + C
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              利用幾何直角三角形將其還原為自變數 <MathInline math="x" />：
              <br />
              由 <MathInline math="\tan\theta = \frac{x}{2}" /> 可知，直角三角形的對邊為 <MathInline math="x" />，鄰邊為 <MathInline math="2" />，斜邊為 <MathInline math="\sqrt{x^2+4}" />。
              由此可得：
              <MathBlock math="\csc\theta = \frac{\text{斜邊}}{\text{對邊}} = \frac{\sqrt{x^2+4}}{x}" />
              代回積分結果，即得最終解：
              <MathBlock math="
                = -\frac{\sqrt{x^2+4}}{8x} + C
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title={<>類型三：根號 <MathInline math="x^2 - a^2" /> 的割線代換</>}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分（假定 <MathInline math="x > 5" />）： <MathInline math="\int \frac{1}{\sqrt{x^2-25}} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              被積函數分母含有根式 <MathInline math="\sqrt{x^2-25}" />，此為類型三，其中常數 <MathInline math="a = 5" />。
              由於 <MathInline math="x > 5" />，我們令：
              <MathBlock math="x = 5 \sec \theta \quad \left( 0 < \theta < \frac{\pi}{2} \right)" />
              則微分量與根式化簡為：
              <MathBlock math="dx = 5 \sec \theta \tan \theta \, d\theta" />
              <MathBlock math="\sqrt{x^2-25} = \sqrt{25\sec^2\theta-25} = 5\tan\theta" />
            </div>
            <div style={{ margin: '14px 0' }}>
              將變數代回原積分式：
              <MathBlock math="
                \int \frac{1}{\sqrt{x^2-25}} \, dx 
                = \int \frac{1}{5\tan\theta} \cdot (5\sec\theta\tan\theta \, d\theta) 
                = \int \sec\theta \, d\theta
              " />
              套用我們在 6.3 節中推導出的割線基本積分公式：
              <MathBlock math="
                = \ln|\sec\theta + \tan\theta| + C_1
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              利用幾何直角三角形將其還原為自變數 <MathInline math="x" />：
              <br />
              由 <MathInline math="\sec\theta = \frac{x}{5}" /> 可知，直角三角形的斜邊為 <MathInline math="x" />，鄰邊為 <MathInline math="5" />，對邊為 <MathInline math="\sqrt{x^2-25}" />。
              由此可得：
              <MathBlock math="\tan\theta = \frac{\text{對邊}}{\text{鄰邊}} = \frac{\sqrt{x^2-25}}{5}" />
              代回對數積分結果中：
              <MathBlock math="
                = \ln\left| \frac{x}{5} + \frac{\sqrt{x^2-25}}{5} \right| + C_1 
                = \ln\left| x + \sqrt{x^2-25} \right| - \ln 5 + C_1
              " />
              由於 <MathInline math="-\ln 5" /> 為常數，我們可以將常數合併記為 <MathInline math="C = C_1 - \ln 5" />，即得最終解：
              <MathBlock math="
                = \ln\left| x + \sqrt{x^2-25} \right| + C
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 4 */}
      <Example title="二次多項式配方結合三角代換">
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{1}{\sqrt{x^2+2x+5}} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              根號內部是一個二次多項式 <MathInline math="x^2+2x+5" />，我們無法直接進行三角代換。
              此類問題的第一步是進行<strong>配方法 (Completing the Square)</strong>：
              <MathBlock math="x^2 + 2x + 5 = (x^2 + 2x + 1) + 4 = (x+1)^2 + 4" />
              因此，原積分式可以寫成：
              <MathBlock math="\int \frac{1}{\sqrt{(x+1)^2+4}} \, dx" />
            </div>
            <div style={{ margin: '14px 0' }}>
              現在，這符合類型二的根式型態（即 <MathInline math="u^2 + a^2" /> 的形式，此時 <MathInline math="u = x+1, a = 2" />）。
              我們令：
              <MathBlock math="x + 1 = 2 \tan\theta \implies dx = 2\sec^2\theta \, d\theta" />
              且根式化簡為：
              <MathBlock math="\sqrt{(x+1)^2+4} = \sqrt{4\tan^2\theta+4} = 2\sec\theta" />
            </div>
            <div style={{ margin: '14px 0' }}>
              代回原積分式：
              <MathBlock math="
                \int \frac{1}{2\sec\theta} \cdot (2\sec^2\theta \, d\theta) 
                = \int \sec\theta \, d\theta 
                = \ln|\sec\theta + \tan\theta| + C_1
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              最後使用直角三角形還原自變數：
              <br />
              由 <MathInline math="\tan\theta = \frac{x+1}{2}" /> 可知，直角三角形的對邊為 <MathInline math="x+1" />，鄰邊為 <MathInline math="2" />，斜邊為 <MathInline math="\sqrt{(x+1)^2+4} = \sqrt{x^2+2x+5}" />。
              由此可得：
              <MathBlock math="\sec\theta = \frac{\text{斜邊}}{\text{鄰邊}} = \frac{\sqrt{x^2+2x+5}}{2}" />
              帶回對數式並合併分母常數：
              <MathBlock math="
                = \ln\left| \frac{\sqrt{x^2+2x+5}}{2} + \frac{x+1}{2} \right| + C_1 
                = \ln\left| (x+1) + \sqrt{x^2+2x+5} \right| + C
              " />
            </div>
          </div>
        </Solution>
      </Example>


      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求不定積分：<MathInline math="\int \frac{x^2}{\sqrt{9-x^2}} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：令 <MathInline math="x = 3\sin\theta" />。答案：<MathInline math="\frac{9}{2}\arcsin\left(\frac{x}{3}\right) - \frac{x\sqrt{9-x^2}}{2} + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 試求不定積分：<MathInline math="\int \frac{1}{(x^2+9)^2} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：令 <MathInline math="x = 3\tan\theta" />，利用 <MathInline math="x^2+9 = 9\sec^2\theta" /> 化簡。答案：<MathInline math="\frac{x}{18(x^2+9)} + \frac{1}{54}\arctan\left(\frac{x}{3}\right) + C" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

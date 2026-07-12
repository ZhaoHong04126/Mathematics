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

export default function Calculus_6_3() {
  return (
    <div>
      {/* 導讀 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在本節中，我們將專注於探討含有三角函數（如正弦、餘弦、正切、割線等）的冪次與乘積之積分方法。
        這類積分稱為<strong>三角積分 (Trigonometric Integrals)</strong>。
        處理三角積分的核心思想是：<strong>利用三角恆等式（如平方關係、倍角與半角公式、積化和差等）進行代數變形，將其整理為適合代換積分法（u-代換）的型態。</strong>
      </p>

      {/* 一、單個三角函數的高次冪積分 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        一、單個三角函數的高次冪積分
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        在處理複合乘積前，我們首先研究最基礎的四種單一三角函數的高次冪積分：
        <MathBlock math="(1) \ \int \sin^m x \, dx, \quad (2) \ \int \cos^m x \, dx, \quad (3) \ \int \tan^m x \, dx, \quad (4) \ \int \sec^m x \, dx" />
        以下我們將這四個積分的公式與其<strong>詳細推導過程</strong>分開列出：
      </div>

      {/* 1. 正弦高次冪 */}
      <div style={{ margin: '24px 0', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', margin: '0 0 10px 0', fontWeight: '600' }}>
          1. 正弦高次冪： <MathInline math="\int \sin^m x \, dx" />
        </h4>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
          <strong>遞迴公式 (Reduction Formula)：</strong>
          <MathBlock math="\int \sin^m x \, dx = -\frac{1}{m} \sin^{m-1} x \cos x + \frac{m-1}{m} \int \sin^{m-2} x \, dx \quad (m \ge 2)" />
        </div>
        <Proof title="展開查看詳細推導過程">
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              我們將被積函數拆為兩部分，以便使用分部積分法：
              <MathBlock math="\sin^m x = \sin^{m-1} x \cdot \sin x" />
              令：
              <MathBlock math="u = \sin^{m-1} x, \quad dv = \sin x \, dx" />
              則對應的微分與積分量為：
              <MathBlock math="du = (m-1)\sin^{m-2} x \cos x \, dx, \quad v = -\cos x" />
            </div>
            <div style={{ margin: '14px 0' }}>
              套用分部積分公式 <MathInline math="\int u \, dv = uv - \int v \, du" />：
              <MathBlock math="
                \int \sin^m x \, dx 
                = -\sin^{m-1} x \cos x - \int (-\cos x) \cdot (m-1)\sin^{m-2} x \cos x \, dx
              " />
              整理被積函數，提取常數 <MathInline math="(m-1)" />：
              <MathBlock math="
                = -\sin^{m-1} x \cos x + (m-1) \int \sin^{m-2} x \cos^2 x \, dx
              " />
              利用平方關係恆等式 <MathInline math="\cos^2 x = 1 - \sin^2 x" /> 取代餘弦項：
              <MathBlock math="
                = -\sin^{m-1} x \cos x + (m-1) \int \sin^{m-2} x (1 - \sin^2 x) \, dx
              " />
              展開並拆開積分：
              <MathBlock math="
                = -\sin^{m-1} x \cos x + (m-1) \int \sin^{m-2} x \, dx - (m-1) \int \sin^m x \, dx
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              我們發現等式最右側又出現了目標積分項。設 <MathInline math="I_m = \int \sin^m x \, dx" />，將其移項至等式左側：
              <MathBlock math="
                I_m + (m-1)I_m = -\sin^{m-1} x \cos x + (m-1) I_{m-2}
              " />
              <MathBlock math="
                m I_m = -\sin^{m-1} x \cos x + (m-1) I_{m-2}
              " />
              等式兩側同除以 <MathInline math="m" />，即得證遞迴公式：
              <MathBlock math="
                \int \sin^m x \, dx = -\frac{1}{m} \sin^{m-1} x \cos x + \frac{m-1}{m} \int \sin^{m-2} x \, dx
              " />
            </div>
          </div>
        </Proof>
      </div>

      {/* 2. 餘弦高次冪 */}
      <div style={{ margin: '24px 0', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', margin: '0 0 10px 0', fontWeight: '600' }}>
          2. 餘弦高次冪： <MathInline math="\int \cos^m x \, dx" />
        </h4>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
          <strong>遞迴公式 (Reduction Formula)：</strong>
          <MathBlock math="\int \cos^m x \, dx = \frac{1}{m} \cos^{m-1} x \sin x + \frac{m-1}{m} \int \cos^{m-2} x \, dx \quad (m \ge 2)" />
        </div>
        <Proof title="展開查看詳細推導過程">
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              我們將被積函數拆分，使用分部積分法：
              <MathBlock math="\cos^m x = \cos^{m-1} x \cdot \cos x" />
              令：
              <MathBlock math="u = \cos^{m-1} x, \quad dv = \cos x \, dx" />
              則對應的微分與積分量為：
              <MathBlock math="du = -(m-1)\cos^{m-2} x \sin x \, dx, \quad v = \sin x" />
            </div>
            <div style={{ margin: '14px 0' }}>
              套用分部積分公式 <MathInline math="\int u \, dv = uv - \int v \, du" />：
              <MathBlock math="
                \int \cos^m x \, dx 
                = \cos^{m-1} x \sin x - \int \sin x \cdot \left[-(m-1)\cos^{m-2} x \sin x\right] \, dx
              " />
              整理並提取常數項：
              <MathBlock math="
                = \cos^{m-1} x \sin x + (m-1) \int \cos^{m-2} x \sin^2 x \, dx
              " />
              利用平方關係恆等式 <MathInline math="\sin^2 x = 1 - \cos^2 x" /> 取代正弦項：
              <MathBlock math="
                = \cos^{m-1} x \sin x + (m-1) \int \cos^{m-2} x (1 - \cos^2 x) \, dx
              " />
              展開並拆開積分：
              <MathBlock math="
                = \cos^{m-1} x \sin x + (m-1) \int \cos^{m-2} x \, dx - (m-1) \int \cos^m x \, dx
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              設 <MathInline math="J_m = \int \cos^m x \, dx" />，將最右邊的目標積分項移項至左側：
              <MathBlock math="
                J_m + (m-1)J_m = \cos^{m-1} x \sin x + (m-1) J_{m-2}
              " />
              <MathBlock math="
                m J_m = \cos^{m-1} x \sin x + (m-1) J_{m-2}
              " />
              兩側同除以 <MathInline math="m" />，即得證遞迴公式：
              <MathBlock math="
                \int \cos^m x \, dx = \frac{1}{m} \cos^{m-1} x \sin x + \frac{m-1}{m} \int \cos^{m-2} x \, dx
              " />
            </div>
          </div>
        </Proof>
      </div>

      {/* 3. 正切高次冪 */}
      <div style={{ margin: '24px 0', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', margin: '0 0 10px 0', fontWeight: '600' }}>
          3. 正切高次冪： <MathInline math="\int \tan^m x \, dx" />
        </h4>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
          <strong>遞迴公式 (Reduction Formula)：</strong>
          <MathBlock math="\int \tan^m x \, dx = \frac{\tan^{m-1} x}{m-1} - \int \tan^{m-2} x \, dx \quad (m \ge 2)" />
        </div>
        <Proof title="展開查看詳細推導過程">
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              正切高次冪的推導只需利用三角代數恆等式與簡單的 u-代換即可，不需要使用分部積分。
              我們將其拆分出一個 <MathInline math="\tan^2 x" />：
              <MathBlock math="\tan^m x = \tan^{m-2} x \cdot \tan^2 x" />
              利用平方關係恆等式 <MathInline math="\tan^2 x = \sec^2 x - 1" />：
              <MathBlock math="
                \int \tan^m x \, dx 
                = \int \tan^{m-2} x (\sec^2 x - 1) \, dx 
                = \int \tan^{m-2} x \sec^2 x \, dx - \int \tan^{m-2} x \, dx
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              針對左邊的積分項 <MathInline math="\int \tan^{m-2} x \sec^2 x \, dx" />，
              因為正切函數的導數為 <MathInline math="d(\tan x) = \sec^2 x \, dx" />，
              我們可以令 <MathInline math="u = \tan x \implies du = \sec^2 x \, dx" />：
              <MathBlock math="
                \int \tan^{m-2} x \sec^2 x \, dx 
                = \int u^{m-2} \, du 
                = \frac{u^{m-1}}{m-1} 
                = \frac{\tan^{m-1} x}{m-1}
              " />
              代回原式，即可得證遞迴公式：
              <MathBlock math="
                \int \tan^m x \, dx = \frac{\tan^{m-1} x}{m-1} - \int \tan^{m-2} x \, dx
              " />
            </div>
          </div>
        </Proof>
      </div>

      {/* 4. 割線高次冪 */}
      <div style={{ margin: '24px 0', padding: '16px', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ color: 'var(--accent-primary)', fontSize: '1.15rem', margin: '0 0 10px 0', fontWeight: '600' }}>
          4. 割線高次冪： <MathInline math="\int \sec^m x \, dx" />
        </h4>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px 0' }}>
          <strong>遞迴公式 (Reduction Formula)：</strong>
          <MathBlock math="\int \sec^m x \, dx = \frac{1}{m-1} \sec^{m-2} x \tan x + \frac{m-2}{m-1} \int \sec^{m-2} x \, dx \quad (m \ge 2)" />
        </div>
        <Proof title="展開查看詳細推導過程">
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              我們將被積函數拆分出一個 <MathInline math="\sec^2 x" /> 以便使用分部積分法：
              <MathBlock math="\sec^m x = \sec^{m-2} x \cdot \sec^2 x" />
              令：
              <MathBlock math="u = \sec^{m-2} x, \quad dv = \sec^2 x \, dx" />
              則對應的微分與積分量為：
              <MathBlock math="du = (m-2)\sec^{m-3} x \cdot (\sec x \tan x) \, dx = (m-2)\sec^{m-2} x \tan x \, dx" />
              <MathBlock math="v = \tan x" />
            </div>
            <div style={{ margin: '14px 0' }}>
              套用分部積分公式 <MathInline math="\int u \, dv = uv - \int v \, du" />：
              <MathBlock math="
                \int \sec^m x \, dx 
                = \sec^{m-2} x \tan x - \int \tan x \cdot \left[(m-2)\sec^{m-2} x \tan x\right] \, dx
              " />
              整理並將常數 <MathInline math="(m-2)" /> 提到積分符號外面：
              <MathBlock math="
                = \sec^{m-2} x \tan x - (m-2) \int \sec^{m-2} x \tan^2 x \, dx
              " />
              利用平方恆等式 <MathInline math="\tan^2 x = \sec^2 x - 1" /> 取代正切項：
              <MathBlock math="
                = \sec^{m-2} x \tan x - (m-2) \int \sec^{m-2} x (\sec^2 x - 1) \, dx
              " />
              展開並拆開積分：
              <MathBlock math="
                = \sec^{m-2} x \tan x - (m-2) \int \sec^m x \, dx + (m-2) \int \sec^{m-2} x \, dx
              " />
            </div>
            <div style={{ margin: '14px 0' }}>
              設 <MathInline math="S_m = \int \sec^m x \, dx" />，將等式右側的目標積分項移至左邊：
              <MathBlock math="
                S_m + (m-2)S_m = \sec^{m-2} x \tan x + (m-2) S_{m-2}
              " />
              <MathBlock math="
                (m-1) S_m = \sec^{m-2} x \tan x + (m-2) S_{m-2}
              " />
              兩側同除以 <MathInline math="m-1" />，即得證遞迴公式：
              <MathBlock math="
                \int \sec^m x \, dx = \frac{1}{m-1} \sec^{m-2} x \tan x + \frac{m-2}{m-1} \int \sec^{m-2} x \, dx
              " />
            </div>
          </div>
        </Proof>
      </div>

      {/* 例題 1 (單獨 cos^3 x) */}
      <Example title="單獨奇數次方的餘弦積分">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \cos^3 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              這是單個餘弦函數的奇數次方（<MathInline math="m = 3" />）。
              我們提取一個 <MathInline math="\cos x" />，並將剩下的 <MathInline math="\cos^2 x" /> 轉換成正弦：
            </p>
            <MathBlock math="
              \cos^2 x = 1 - \sin^2 x
            " />
            <p>積分式展開為：</p>
            <MathBlock math="
              \int \cos^3 x \, dx 
              = \int \cos^2 x (\cos x \, dx) 
              = \int (1 - \sin^2 x) (\cos x \, dx)
            " />
            <p>
              令 <MathInline math="u = \sin x" />，則微分量 <MathInline math="du = \cos x \, dx" />：
            </p>
            <MathBlock math="
              = \int (1 - u^2) \, du 
              = u - \frac{1}{3}u^3 + C
            " />
            <p>將 <MathInline math="u = \sin x" /> 帶回，即得：</p>
            <MathBlock math="
              = \sin x - \frac{1}{3}\sin^3 x + C
            " />
          </div>
        </Solution>
      </Example>

      {/* 例題 2 (單獨 tan^3 x) */}
      <Example title="正切高次冪遞迴求解">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \tan^3 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              這是單個正切函數的三次方（<MathInline math="m = 3" />）。
              我們可以直接套用正切的遞迴公式（令 <MathInline math="m=3" />）：
            </p>
            <MathBlock math="
              \int \tan^3 x \, dx 
              = \frac{\tan^{3-1} x}{3-1} - \int \tan^{3-2} x \, dx 
              = \frac{1}{2}\tan^2 x - \int \tan x \, dx
            " />
            <p>
              我們已知基本公式 <MathInline math="\int \tan x \, dx = \ln|\sec x| + C" />（詳細推導可見後續第三節的證明區塊），代入即得：
            </p>
            <MathBlock math="
              = \frac{1}{2}\tan^2 x - \ln|\sec x| + C
            " />
            <div style={{ marginTop: '12px', paddingLeft: '16px', borderLeft: '2px solid var(--accent-warm)', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-sm)', padding: '10px' }}>
              <strong>💡 不套用公式的直接推導法：</strong>
              <br />
              <MathBlock math="
                \int \tan^3 x \, dx 
                = \int \tan x \cdot \tan^2 x \, dx 
                = \int \tan x (\sec^2 x - 1) \, dx 
                = \int \tan x \sec^2 x \, dx - \int \tan x \, dx
              " />
              前項中，令 <MathInline math="u = \tan x \implies du = \sec^2 x \, dx" />，則 <MathInline math="\int u \, du = \frac{1}{2}u^2" />；後項直接積分。
              因此同樣得到：
              <MathBlock math="= \frac{1}{2}\tan^2 x - \ln|\sec x| + C" />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 3 (單獨 sec^3 x) */}
      <Example title="割線高次冪與分部積分（經典例題：割線三次方）">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \sec^3 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              此題中，割線的次方為奇數（<MathInline math="m = 3" />）。
              這是不定積分中極為經典的題目。我們可以使用<strong>分部積分法 (Integration by Parts)</strong> 來推導（亦等同於割線遞迴公式的推導）：
            </p>
            <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--accent-primary)', margin: '12px 0' }}>
              令：
              <MathBlock math="u = \sec x, \quad dv = \sec^2 x \, dx" />
              則對應的微分與積分量為：
              <MathBlock math="du = \sec x \tan x \, dx, \quad v = \tan x" />
            </div>
            <p>套用分部積分公式 <MathInline math="\int u \, dv = uv - \int v \, du" />：</p>
            <MathBlock math="
              \int \sec^3 x \, dx 
              = \sec x \tan x - \int \tan x (\sec x \tan x \, dx) 
              = \sec x \tan x - \int \sec x \tan^2 x \, dx
            " />
            <p>利用恆等式 <MathInline math="\tan^2 x = \sec^2 x - 1" /> 將被積函數改寫：</p>
            <MathBlock math="
              = \sec x \tan x - \int \sec x (\sec^2 x - 1) \, dx 
              = \sec x \tan x - \int (\sec^3 x - \sec x) \, dx
            " />
            <p>拆開積分後移項（同型循環積分）：</p>
            <MathBlock math="
              \int \sec^3 x \, dx = \sec x \tan x - \int \sec^3 x \, dx + \int \sec x \, dx
            " />
            <MathBlock math="
              2 \int \sec^3 x \, dx = \sec x \tan x + \int \sec x \, dx
            " />
            <p>
              利用基本公式 <MathInline math="\int \sec x \, dx = \ln|\sec x + \tan x|" />：
            </p>
            <MathBlock math="
              2 \int \sec^3 x \, dx = \sec x \tan x + \ln|\sec x + \tan x|
            " />
            <p>同除以 2，即得：</p>
            <MathBlock math="
              \int \sec^3 x \, dx = \frac{1}{2} \left( \sec x \tan x + \ln|\sec x + \tan x| \right) + C
            " />
            <p style={{ color: 'var(--accent-warm)', fontWeight: '600', marginTop: '10px' }}>
              💡 備註：此積分結果極常出現在後續的「三角代換法」與「極座標求弧長、面積」的計算中，建議將其結果熟記。
            </p>
          </div>
        </Solution>
      </Example>


      {/* 二、正弦與餘弦的冪次乘積 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        二、正弦與餘弦的冪次乘積： <MathInline math="\int \sin^m x \cos^n x \, dx" />
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        當面對這種類型的積分時，我們可以根據冪次 <MathInline math="m" /> 與 <MathInline math="n" /> 的奇偶性，採取以下三種經典策略：
      </p>

      <Definition title="正弦與餘弦冪次積分策略">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            <strong>1. 若正弦的次方 m 為奇數 (m = 2k + 1)：</strong>
            <br />
            保留一個 <MathInline math="\sin x" /> 作為微分量，將其餘的正弦項利用平方恆等式 <MathInline math="\sin^2 x = 1 - \cos^2 x" /> 轉換成餘弦項，然後令 <MathInline math="u = \cos x" />（此時 <MathInline math="du = -\sin x \, dx" />）。
            <MathBlock math="\int \sin^{2k+1} x \cos^n x \, dx = \int (\sin^2 x)^k \cos^n x (\sin x \, dx) = \int (1 - \cos^2 x)^k \cos^n x (\sin x \, dx)" />
          </div>
          <div>
            <strong>2. 若餘弦的次方 n 為奇數 (n = 2k + 1)：</strong>
            <br />
            保留一個 <MathInline math="\cos x" /> 作為微分量，將其餘的餘弦項利用平方恆等式 <MathInline math="\cos^2 x = 1 - \sin^2 x" /> 轉換成正弦項，然後令 <MathInline math="u = \sin x" />（此時 <MathInline math="du = \cos x \, dx" />）。
            <MathBlock math="\int \sin^m x \cos^{2k+1} x \, dx = \int \sin^m x (\cos^2 x)^k (\cos x \, dx) = \int \sin^m x (1 - \sin^2 x)^k (\cos x \, dx)" />
          </div>
          <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
            <strong>3. 若正弦與餘弦的次方 m, n 皆為偶數：</strong>
            <br />
            在此情況下，無法直接分離出奇數次方作為微分量，必須使用<strong>半角公式 (Half-Angle Formulas)</strong> 降低冪次：
            <MathBlock math="\sin^2 x = \frac{1 - \cos(2x)}{2}, \quad \cos^2 x = \frac{1 + \cos(2x)}{2}" />
            有時亦可配合使用正弦倍角公式： <MathInline math="\sin x \cos x = \frac{1}{2} \sin(2x)" />。
          </div>
        </div>
      </Definition>

      {/* 例題 4 */}
      <Example title="正弦次方為奇數的積分">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \sin^5 x \cos^2 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              被積函數中，正弦的次方為奇數（<MathInline math="5" />），餘弦的次方為偶數（<MathInline math="2" />）。
              我們提取一個 <MathInline math="\sin x" />，並將剩下的 <MathInline math="\sin^4 x" /> 化為餘弦：
            </p>
            <MathBlock math="
              \sin^4 x = (\sin^2 x)^2 = (1 - \cos^2 x)^2
            " />
            <p>將此代回原積分式：</p>
            <MathBlock math="
              \int \sin^5 x \cos^2 x \, dx 
              = \int (\sin^2 x)^2 \cos^2 x (\sin x \, dx) 
              = \int (1 - \cos^2 x)^2 \cos^2 x (\sin x \, dx)
            " />
            <p>
              令 <MathInline math="u = \cos x" />，則 <MathInline math="du = -\sin x \, dx \implies \sin x \, dx = -du" />。
              代換後得到：
            </p>
            <MathBlock math="
              = \int (1 - u^2)^2 u^2 (-du) 
              = -\int (1 - 2u^2 + u^4) u^2 \, du 
              = -\int (u^2 - 2u^4 + u^6) \, du
            " />
            <p>逐項積分：</p>
            <MathBlock math="
              = -\left( \frac{1}{3}u^3 - \frac{2}{5}u^5 + \frac{1}{7}u^7 \right) + C
              = -\frac{1}{3}u^3 + \frac{2}{5}u^5 - \frac{1}{7}u^7 + C
            " />
            <p>最後，將 <MathInline math="u = \cos x" /> 帶回：</p>
            <MathBlock math="
              = -\frac{1}{3}\cos^3 x + \frac{2}{5}\cos^5 x - \frac{1}{7}\cos^7 x + C
            " />
          </div>
        </Solution>
      </Example>

      {/* 例題 5 */}
      <Example title="正弦與餘弦皆為偶數次方的積分">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求定積分： <MathInline math="\int_{0}^{\pi} \sin^2 x \cos^2 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              因為正弦與餘弦的次方都是偶數（<MathInline math="2" />），我們必須使用半角公式進行降次。
              這裡有兩種常見降次方法：
            </p>
            <div style={{ paddingLeft: '16px', borderLeft: '2px solid var(--accent-primary)', margin: '12px 0' }}>
              <strong>方法一：直接使用半角公式代換</strong>
              <MathBlock math="
                \sin^2 x \cos^2 x 
                = \left(\frac{1 - \cos 2x}{2}\right) \left(\frac{1 + \cos 2x}{2}\right) 
                = \frac{1 - \cos^2 2x}{4}
              " />
              再度對 <MathInline math="\cos^2 2x" /> 套用半角公式：
              <MathBlock math="
                = \frac{1}{4} \left( 1 - \frac{1 + \cos 4x}{2} \right) 
                = \frac{1}{8} (1 - \cos 4x)
              " />
              <strong>方法二：利用倍角公式先合併再降次</strong>
              <MathBlock math="
                \sin^2 x \cos^2 x 
                = (\sin x \cos x)^2 
                = \left(\frac{1}{2} \sin 2x\right)^2 
                = \frac{1}{4} \sin^2 2x 
                = \frac{1}{4} \left( \frac{1 - \cos 4x}{2} \right) 
                = \frac{1}{8} (1 - \cos 4x)
              " />
            </div>
            <p>不論用哪種方法，代數變形後被積函數皆化為 <MathInline math="\frac{1}{8}(1 - \cos 4x)" />。接下來進行定積分計算：</p>
            <MathBlock math="
              \int_{0}^{\pi} \sin^2 x \cos^2 x \, dx 
              = \int_{0}^{\pi} \frac{1}{8} (1 - \cos 4x) \, dx
            " />
            <MathBlock math="
              = \frac{1}{8} \left[ x - \frac{1}{4}\sin 4x \right]_0^{\pi}
            " />
            <MathBlock math="
              = \frac{1}{8} \left( \left(\pi - \frac{1}{4}\sin 4\pi\right) - \left(0 - \frac{1}{4}\sin 0\right) \right)
            " />
            <p>
              由於 <MathInline math="\sin 4\pi = 0" /> 且 <MathInline math="\sin 0 = 0" />，代入計算得到：
            </p>
            <MathBlock math="
              = \frac{1}{8} (\pi - 0) = \frac{\pi}{8}
            " />
          </div>
        </Solution>
      </Example>


      {/* 三、正切與割線的冪次乘積 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        三、正切與割線的冪次乘積： <MathInline math="\int \tan^m x \sec^n x \, dx" />
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        在學習這類型的積分技巧前，我們必須先掌握正切與割線的基本積分公式。
      </p>

      {/* 定理：基本公式 */}
      <Theorem title="正切與割線的基本積分">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <strong>1. 正切函數的積分：</strong>
            <MathBlock math="\int \tan x \, dx = \ln|\sec x| + C" />
          </div>
          <div>
            <strong>2. 割線函數的積分：</strong>
            <MathBlock math="\int \sec x \, dx = \ln|\sec x + \tan x| + C" />
          </div>
        </div>
      </Theorem>

      <Proof title="展開查看證明">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 證明： <MathInline math="\int \tan x \, dx = \ln|\sec x| + C" /></strong>
            <br />
            將正切化為正弦與餘弦之比：
            <MathBlock math="\int \tan x \, dx = \int \frac{\sin x}{\cos x} \, dx" />
            令 <MathInline math="u = \cos x \implies du = -\sin x \, dx \implies \sin x \, dx = -du" />。代入積分式：
            <MathBlock math="\int \frac{\sin x}{\cos x} \, dx = \int \frac{-du}{u} = -\ln|u| + C = -\ln|\cos x| + C" />
            利用對數性質，將負號移至真數的指數位置：
            <MathBlock math="-\ln|\cos x| = \ln\left|(\cos x)^{-1}\right| = \ln\left|\frac{1}{\cos x}\right| = \ln|\sec x|" />
            得證.
          </div>
          <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '10px' }}>
            <strong>(2) 證明： <MathInline math="\int \sec x \, dx = \ln|\sec x + \tan x| + C" /></strong>
            <br />
            這是一個極為巧妙的數學技巧。我們將分子與分母同乘上 <MathInline math="\sec x + \tan x" />：
            <MathBlock math="\int \sec x \, dx = \int \sec x \cdot \frac{\sec x + \tan x}{\sec x + \tan x} \, dx = \int \frac{\sec^2 x + \sec x \tan x}{\sec x + \tan x} \, dx" />
            觀察分母 <MathInline math="g(x) = \sec x + \tan x" />，其導數為：
            <MathBlock math="g'(x) = \sec x \tan x + \sec^2 x" />
            這正好等於分子！這符合對數積分的經典形式 <MathInline math="\int \frac{g'(x)}{g(x)} \, dx = \ln|g(x)| + C" />。
            <br />
            因此：
            <MathBlock math="\int \frac{\sec^2 x + \sec x \tan x}{\sec x + \tan x} \, dx = \ln|\sec x + \tan x| + C" />
            得證.
          </div>
        </div>
      </Proof>

      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', margin: '20px 0 16px 0' }}>
        針對一般型態的積分 <MathInline math="\int \tan^m x \sec^n x \, dx" />，我們主要依據割線與正切的次方進行策略分類：
      </p>

      <Definition title="正切與割線冪次積分策略">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            <strong>1. 若割線的次方 n 為偶數 (n = 2k, 且 n &ge; 2)：</strong>
            <br />
            保留一個 <MathInline math="\sec^2 x" /> 作為微分量，將剩下的割線項利用恆等式 <MathInline math="\sec^2 x = 1 + \tan^2 x" /> 轉換成正切項，然後令 <MathInline math="u = \tan x" />（此時 <MathInline math="du = \sec^2 x \, dx" />）。
            <MathBlock math="\int \tan^m x \sec^{2k} x \, dx = \int \tan^m x (\sec^2 x)^{k-1} (\sec^2 x \, dx) = \int \tan^m x (1 + \tan^2 x)^{k-1} (\sec^2 x \, dx)" />
          </div>
          <div>
            <strong>2. 若正切的次方 m 為奇數 (m = 2k + 1)：</strong>
            <br />
            保留一個 <MathInline math="\sec x \tan x" /> 作為微分量，將剩下的正切項利用恆等式 <MathInline math="\tan^2 x = \sec^2 x - 1" /> 轉換成割線項，然後令 <MathInline math="u = \sec x" />（此時 <MathInline math="du = \sec x \tan x \, dx" />）。
            <MathBlock math="\int \tan^{2k+1} x \sec^n x \, dx = \int (\tan^2 x)^k \sec^{n-1} x (\sec x \tan x \, dx) = \int (\sec^2 x - 1)^k \sec^{n-1} x (\sec x \tan x \, dx)" />
          </div>
        </div>
      </Definition>

      {/* 例題 6 */}
      <Example title="割線次方為偶數的積分">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \tan^6 x \sec^4 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              割線的次方為偶數（<MathInline math="4" />）。
              我們分離出一個 <MathInline math="\sec^2 x" /> 作為微分量，並將剩下的 <MathInline math="\sec^2 x" /> 化為正切：
            </p>
            <MathBlock math="
              \sec^4 x = \sec^2 x \cdot \sec^2 x = (1 + \tan^2 x) \sec^2 x
            " />
            <p>代回原積分式：</p>
            <MathBlock math="
              \int \tan^6 x \sec^4 x \, dx 
              = \int \tan^6 x (1 + \tan^2 x) (\sec^2 x \, dx)
            " />
            <p>
              令 <MathInline math="u = \tan x" />，則微分量 <MathInline math="du = \sec^2 x \, dx" />：
            </p>
            <MathBlock math="
              = \int u^6 (1 + u^2) \, du 
              = \int (u^6 + u^8) \, du
            " />
            <p>進行積分：</p>
            <MathBlock math="
              = \frac{1}{7}u^7 + \frac{1}{9}u^9 + C
            " />
            <p>將 <MathInline math="u = \tan x" /> 帶回：</p>
            <MathBlock math="
              = \frac{1}{7}\tan^7 x + \frac{1}{9}\tan^9 x + C
            " />
          </div>
        </Solution>
      </Example>

      {/* 例題 7 */}
      <Example title="正切次方為奇數的積分">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \tan^3 x \sec^3 x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              正切的次方為奇數（<MathInline math="3" />）。
              我們提取因子 <MathInline math="\sec x \tan x" />，並將剩下的 <MathInline math="\tan^2 x" /> 化為割線項：
            </p>
            <MathBlock math="
              \tan^2 x = \sec^2 x - 1
            " />
            <p>將積分式重寫為：</p>
            <MathBlock math="
              \int \tan^3 x \sec^3 x \, dx 
              = \int (\tan^2 x) \sec^2 x (\sec x \tan x \, dx) 
              = \int (\sec^2 x - 1) \sec^2 x (\sec x \tan x \, dx)
            " />
            <p>
              令 <MathInline math="u = \sec x" />，則微分量 <MathInline math="du = \sec x \tan x \, dx" />：
            </p>
            <MathBlock math="
              = \int (u^2 - 1) u^2 \, du 
              = \int (u^4 - u^2) \, du
            " />
            <p>進行積分：</p>
            <MathBlock math="
              = \frac{1}{5}u^5 - \frac{1}{3}u^3 + C
            " />
            <p>將 <MathInline math="u = \sec x" /> 帶回：</p>
            <MathBlock math="
              = \frac{1}{5}\sec^5 x - \frac{1}{3}\sec^3 x + C
            " />
          </div>
        </Solution>
      </Example>


      {/* 四、不同角度的三角乘積：積化和差 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        四、不同角度的三角乘積：積化和差
      </h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        當被積函數為兩個不同角度的正弦與餘弦函數相乘，例如 <MathInline math="\sin(mx)\cos(nx)" /> 時，我們可以使用高中所學的<strong>積化和差公式 (Product-to-Sum Formulas)</strong> 將乘積拆解為和或差，進而直接積分。
      </p>

      {/* 定理：積化和差 */}
      <Theorem title="積化和差公式">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <MathBlock math="\sin A \cos B = \frac{1}{2} \left[ \sin(A - B) + \sin(A + B) \right]" />
          <MathBlock math="\sin A \sin B = \frac{1}{2} \left[ \cos(A - B) - \cos(A + B) \right]" />
          <MathBlock math="\cos A \cos B = \frac{1}{2} \left[ \cos(A - B) + \cos(A + B) \right]" />
        </div>
      </Theorem>

      {/* 例題 8 */}
      <Example title="利用積化和差公式進行積分">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \sin(4x) \cos(5x) \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <p>
              在此題中，我們有 <MathInline math="A = 4x" /> 且 <MathInline math="B = 5x" />。
              套用第一個積化和差公式：
            </p>
            <MathBlock math="
              \sin(4x) \cos(5x) 
              = \frac{1}{2} \left[ \sin(4x - 5x) + \sin(4x + 5x) \right] 
              = \frac{1}{2} \left[ \sin(-x) + \sin(9x) \right]
            " />
            <p>
              利用正弦函數的奇函數性質，即 <MathInline math="\sin(-x) = -\sin x" />：
            </p>
            <MathBlock math="
              = \frac{1}{2} \left[ -\sin x + \sin(9x) \right]
            " />
            <p>代回原積分式：</p>
            <MathBlock math="
              \int \sin(4x) \cos(5x) \, dx 
              = \frac{1}{2} \int (-\sin x + \sin(9x)) \, dx
            " />
            <p>逐項進行簡單積分（注意連鎖法則微分的逆運算）：</p>
            <MathBlock math="
              = \frac{1}{2} \left( \cos x - \frac{1}{9}\cos(9x) \right) + C 
              = \frac{1}{2}\cos x - \frac{1}{18}\cos(9x) + C
            " />
          </div>
        </Solution>
      </Example>


      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求不定積分：<MathInline math="\int \sin^3 x \cos^5 x \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：正弦為奇數次方，令 <MathInline math="u = \cos x" /> 進行代換。答案：<MathInline math="-\frac{1}{6}\cos^6 x + \frac{1}{8}\cos^8 x + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 試求不定積分：<MathInline math="\int \tan^3 x \sec^4 x \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：可選擇割線為偶數次方策略令 <MathInline math="u = \tan x" />，或選擇正切為奇數次方策略令 <MathInline math="u = \sec x" />。
              若以 <MathInline math="u = \tan x" /> 解，答案為：<MathInline math="\frac{1}{4}\tan^4 x + \frac{1}{6}\tan^6 x + C" />。
              這與以 <MathInline math="u = \sec x" /> 所解出的答案 <MathInline math="\frac{1}{6}\sec^6 x - \frac{1}{4}\sec^4 x + C_2" /> 僅差在常數項關係，兩者皆為正確答案。）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

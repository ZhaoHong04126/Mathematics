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

export default function Calculus_6_2() {
  return (
    <div>
      {/* 導讀與直觀引入 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在 6.1 節中，我們學習了代換積分法（微分連鎖法則的逆運算）。然而，當遇到兩個不同類型函數乘積的積分時，代換法往往行不通。
        例如，若要計算不定積分：
      </p>
      <MathBlock math="\int x \sin x \, dx = ?" />
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        這時，我們需要微分<strong>乘法法則 (Product Rule)</strong> 的逆運算，也就是 <strong>分部積分法 (Integration by Parts)</strong>。
        它是微積分中處理乘積積分最重要、最通用的工具。
      </p>

      {/* 公式推導與定理 */}
      <Theorem title="分部積分法 (Integration by Parts)">
        <p style={{ marginBottom: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          設 <MathInline math="u = f(x)" /> 與 <MathInline math="v = g(x)" /> 為在區間上可微的函數。不定積分的分部積分公式為：
        </p>
        <MathBlock math="\int u \, dv = uv - \int v \, du" />
        <p style={{ marginTop: '14px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          若寫成函數自變數 <MathInline math="x" /> 的完整形式，則為：
        </p>
        <MathBlock math="\int f(x) g'(x) \, dx = f(x) g(x) - \int g(x) f'(x) \, dx" />
      </Theorem>

      <Proof title="分部積分公式之推導">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
          根據微分的乘法法則，對於兩個可微函數 <MathInline math="f(x)" /> 與 <MathInline math="g(x)" /> 的乘積，其導數為：
          <MathBlock math="(f(x) \cdot g(x))' = f'(x) \cdot g(x) + f(x) \cdot g'(x)" />
          兩邊同時對 <MathInline math="x" /> 進行積分：
          <MathBlock math="\int [f(x) \cdot g(x)]' \, dx = \int f'(x) g(x) \, dx + \int f(x) g'(x) \, dx" />
          根據微積分基本定理，左邊的積分正是函數乘積本身（不計常數）：
          <MathBlock math="f(x) \cdot g(x) = \int f'(x) g(x) \, dx + \int f(x) g'(x) \, dx" />
          移項整理，將 <MathInline math="\int f(x) g'(x) \, dx" /> 孤立在左側：
          <MathBlock math="\int f(x) g'(x) \, dx = f(x) g(x) - \int g(x) f'(x) \, dx" />
          如果我們令 <MathInline math="u = f(x) \implies du = f'(x) \, dx" />，並且令 <MathInline math="v = g(x) \implies dv = g'(x) \, dx" />，
          那麼帶入上式後，即得簡潔好記的公式：
          <MathBlock math="\int u \, dv = uv - \int v \, du" />
          證明完畢。
        </div>
      </Proof>

      {/* 微分記號的直觀理解 */}
      <Definition title="微分形式的直觀理解與口訣">
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
          分部積分在實際計算中，使用「微分形式記號」會更加靈活快速。我們可以將公式寫成：
        </p>
        <MathBlock math="\int f(x) \, d(g(x)) = f(x) \cdot g(x) - \int g(x) \, d(f(x))" />
        
        {/* 直觀結構視覺化 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '16px',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          margin: '20px 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--accent-primary)', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>1</span>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600' }}>
              第一步：搬移到 d 後面 <MathInline math="\int f(x) g(x) \, dx \implies \int f(x) \, d(g(x))" />
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', paddingLeft: '32px', margin: 0 }}>
            先將其中一個容易積分的函數 <MathInline math="g(x)" /> 積分後「搬到微分算子 <MathInline math="d" /> 後面」。
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--accent-secondary)', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>2</span>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600' }}>
              第二步：d 前後相乘 <MathInline math="f(x) \cdot g(x)" />
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', paddingLeft: '32px', margin: 0 }}>
            直接將 <MathInline math="d" /> 前面的 <MathInline math="f(x)" /> 與 <MathInline math="d" /> 後面的 <MathInline math="g(x)" /> 乘在一起，作為解答的第一部分。
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={{ display: 'flex', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: 'var(--accent-warm)', color: 'white', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 'bold' }}>3</span>
            <div style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: '600' }}>
              第三步：d 前後對調並微分 <MathInline math="- \int g(x) \, d(f(x))" />
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', paddingLeft: '32px', margin: 0 }}>
            將 <MathInline math="d" /> 前後的函數位置對調（<MathInline math="g" /> 到前面，<MathInline math="f" /> 進到 <MathInline math="d" /> 後面），對新的 <MathInline math="d(f(x)) = f'(x) \, dx" /> 進行微分，然後求剩下的積分。
          </p>
        </div>
      </Definition>

      {/* 核心重點：LIATE 法則 */}
      <h3 style={{ margin: '40px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        🎯 重點：如何選擇 u 與 dv？（LIATE 法則）
      </h3>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        分部積分最困難的步驟在於：<strong>決定哪個部分是 <MathInline math="u" />，哪個部分是 <MathInline math="dv" />。</strong>
        如果選錯了，新的積分式 <MathInline math="\int v \, du" /> 會比原積分更繁雜，甚至陷入死胡同。
        <br />
        一般來說，我們面對的基本函數可以歸納為五大類。我們可以使用 <strong>LIATE 法則</strong>（留在原地優先順序）來決定：
      </p>

      {/* 結合手寫與 LIATE 的整合型視覺化卡片 */}
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        margin: '24px 0',
        boxShadow: 'var(--shadow-md)'
      }}>
        <p style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '1.05rem', marginBottom: '24px', textAlign: 'center' }}>
          🎯 「留在原地」排行榜與 LIATE 優先級整合圖表
        </p>
        
        {/* 三個等級的分組區塊 */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '24px'
        }}>
          {/* 等一級 */}
          <div style={{
            flex: '2 1 280px',
            border: '1.5px solid rgba(244, 63, 94, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 16px 16px 16px',
            backgroundColor: 'rgba(244, 63, 94, 0.01)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            minWidth: '240px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '16px',
              backgroundColor: 'rgb(244, 63, 94)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '2px 10px',
              borderRadius: '10px'
            }}>
              等一級 (留在原地優先)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              {/* L */}
              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 6px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(244, 63, 94)' }}>L</span>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>對數函數</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><MathInline math="\ln x, \log_a x" /></div>
              </div>
              {/* I */}
              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 6px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(244, 63, 94)' }}>I</span>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>反三角函數</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}><MathInline math="\sin^{-1}x, \tan^{-1}x" /></div>
              </div>
            </div>
          </div>

          {/* 等二級 */}
          <div style={{
            flex: '1 1 140px',
            border: '1.5px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 16px 16px 16px',
            backgroundColor: 'rgba(245, 158, 11, 0.01)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            minWidth: '140px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '16px',
              backgroundColor: 'rgb(245, 158, 11)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '2px 10px',
              borderRadius: '10px'
            }}>
              等二級
            </div>
            <div style={{ display: 'flex', height: '100%', marginTop: '4px' }}>
              {/* A */}
              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 6px', textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(245, 158, 11)' }}>A</span>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>冪函數/多項式</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><MathInline math="x^2, 3x+5, x^r" /></div>
              </div>
            </div>
          </div>

          {/* 等三級 */}
          <div style={{
            flex: '2 1 280px',
            border: '1.5px solid rgba(56, 189, 248, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '20px 16px 16px 16px',
            backgroundColor: 'rgba(56, 189, 248, 0.01)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            position: 'relative',
            minWidth: '240px'
          }}>
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '16px',
              backgroundColor: 'rgb(56, 189, 248)',
              color: 'white',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              padding: '2px 10px',
              borderRadius: '10px'
            }}>
              等三級 (移到後面積分)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '4px' }}>
              {/* T */}
              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 6px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(56, 189, 248)' }}>T</span>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>三角函數</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><MathInline math="\sin x, \cos x" /></div>
              </div>
              {/* E */}
              <div style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '10px 6px', textAlign: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'rgb(56, 189, 248)' }}>E</span>
                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', margin: '4px 0' }}>指數函數</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}><MathInline math="e^x, a^x" /></div>
              </div>
            </div>
          </div>
        </div>

        {/* 雙向指示箭頭 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          padding: '0 8px',
          borderTop: '1px dashed var(--border-color)',
          paddingTop: '20px'
        }}>
          {/* 留在原地 箭頭 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'rgb(244, 63, 94)', fontWeight: 'bold', width: '90px', textAlign: 'right' }}>留在原地 (u)</span>
            <div style={{ flex: 1, height: '4px', backgroundColor: 'rgb(244, 63, 94)', position: 'relative', borderRadius: '2px' }}>
              <div style={{
                position: 'absolute',
                left: '-2px',
                top: '-4px',
                width: '0',
                height: '0',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: '10px solid rgb(244, 63, 94)'
              }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', width: '60px' }}>等一級優先</span>
          </div>

          {/* 搬到 d 後面 箭頭 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: 'rgb(56, 189, 248)', fontWeight: 'bold', width: '90px', textAlign: 'right' }}>搬到 d 後面</span>
            <div style={{ flex: 1, height: '4px', backgroundColor: 'rgb(56, 189, 248)', position: 'relative', borderRadius: '2px' }}>
              <div style={{
                position: 'absolute',
                right: '-2px',
                top: '-4px',
                width: '0',
                height: '0',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: '10px solid rgb(56, 189, 248)'
              }} />
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', width: '60px' }}>等三級優先</span>
          </div>
        </div>

        {/* 記憶小提示 */}
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', marginTop: '20px', lineHeight: '1.6', borderTop: '1px dashed var(--border-color)', paddingTop: '16px' }}>
          💡 <strong>記憶與應用小訣竅</strong>：<br />
          - <strong>L</strong> 與 <strong>I</strong> (等一級) 微分後結構通常會簡化（例如對數微分後變分式，反三角微分後變代數根式），但很難積分，因此<strong>絕對優先設為 <MathInline math="u" /> (留在原地)</strong>。<br />
          - <strong>T</strong> 與 <strong>E</strong> (等三級) 無論是微分或積分，形式都很容易處理且維持原樣（例如 <MathInline math="e^x" /> 積分還是 <MathInline math="e^x" />），因此<strong>優先搬到後面做為 <MathInline math="dv" /> (搬到 d 後面)</strong>。<br />
          - <strong>雙曲函數與有理函數</strong>：視具體題目靈活對待，大部分可參照此原則。
        </p>
      </div>

      {/* 經典例題：對比不同的 u, dv 選擇 */}
      <Example title="1：探討不同設法與正確求解">
        <p style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int x \sin x \, dx" />。
        </p>
        <Solution>
          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
            分析：被積函數為 <MathInline math="x" />（多項式，A 級）與 <MathInline math="\sin x" />（三角函數，T 級）相乘。
            根據 LIATE 法則，A 級優先度高於 T 級，因此我們應該令 <MathInline math="u = x" />（留在原地），而令 <MathInline math="dv = \sin x \, dx" />（搬到後面）。
          </p>

          <p style={{ color: 'var(--text-secondary)', margin: '12px 0 8px 0' }}>
            我們來對比幾種不同的設法：
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ padding: '12px', borderLeft: '3px solid var(--accent-warm)', backgroundColor: 'rgba(245, 158, 11, 0.03)' }}>
              <strong>設法一（不合適）：</strong> 令 <MathInline math="u = \sin x" />， <MathInline math="dv = x \, dx" />。<br />
              則 <MathInline math="du = \cos x \, dx" />， <MathInline math="v = \frac{1}{2} x^2" />。<br />
              套用公式得：
              <MathBlock math="\int x \sin x \, dx = \frac{1}{2} x^2 \sin x - \int \frac{1}{2} x^2 \cos x \, dx" />
              此時，新積分式中的 <MathInline math="x" /> 冪次從 1 次上升到了 2 次，式子變得比原本更難解。這就是弄錯對象帶來的反效果。
            </div>

            <div style={{ padding: '12px', borderLeft: '3px solid var(--accent-secondary)', backgroundColor: 'rgba(6, 182, 212, 0.03)' }}>
              <strong>設法二（正確）：</strong> 令 <MathInline math="u = x" />， <MathInline math="dv = \sin x \, dx" />。<br />
              則 <MathInline math="du = dx" />， <MathInline math="v = -\cos x" />（因為 <MathInline math="\int \sin x \, dx = -\cos x" />）。<br />
              套用公式得：
              <MathBlock math="
                \int x \sin x \, dx 
                = x (-\cos x) - \int (-\cos x) \, dx
              " />
              <MathBlock math="
                = -x \cos x + \int \cos x \, dx 
                = -x \cos x + \sin x + C
              " />
              新積分式 <MathInline math="\int \cos x \, dx" /> 為基本積分，直接得出結果！
            </div>
          </div>

          <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            <h6 style={{ color: 'var(--accent-primary)', marginBottom: '8px', fontSize: '0.95rem' }}>另一種寫法：直接微分形式法 (Direct Differential Method)</h6>
            <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              因為 <MathInline math="\sin x \, dx = d(-\cos x)" />（把三角函數搬到 <MathInline math="d" /> 後面）：
              <MathBlock math="\int x \sin x \, dx = \int x \, d(-\cos x)" />
              使用口訣「<MathInline math="d" /> 前後相乘」減去「前後對調積分」：
              <MathBlock math="= x \cdot (-\cos x) - \int (-\cos x) \, d(x)" />
              <MathBlock math="= -x \cos x + \int \cos x \, dx = -x \cos x + \sin x + C" />
              這兩種方法的本質是完全相同的，但直接微分法在熟練後計算速度更快。
            </div>
          </div>
        </Solution>
      </Example>

      {/* 對數函數與單一函數的經典例題 */}
      <h3 style={{ margin: '45px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        📚 對數與單一函數積分 (Logarithms and Single Functions)
      </h3>

      {/* 例題 2 */}
      <Example title="2：含有對數函數的不定積分">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 試求：</strong> <MathInline math="\int x \ln x \, dx" />
          </div>
          <div>
            <strong>(2) 試求對數函數的基本積分：</strong> <MathInline math="\int \ln x \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* (1) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (1) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                被積函數為多項式 <MathInline math="x" />（A 級）與對數 <MathInline math="\ln x" />（L 級）。
                根據 LIATE 順序，L 級高於 A 級，因此我們必須保留 <MathInline math="\ln x" />，而把 <MathInline math="x" /> 移到後面。
                <br />
                由於 <MathInline math="x \, dx = d\left(\frac{1}{2}x^2\right)" /> :
                <MathBlock math="\int x \ln x \, dx = \int \ln x \, d\left(\frac{1}{2}x^2\right)" />
                套用分部積分公式：
                <MathBlock math="
                  = \frac{1}{2}x^2 \ln x - \int \frac{1}{2}x^2 \, d(\ln x)
                " />
                微分 <MathInline math="d(\ln x) = \frac{1}{x} \, dx" /> 代入：
                <MathBlock math="
                  = \frac{1}{2}x^2 \ln x - \frac{1}{2} \int x^2 \cdot \frac{1}{x} \, dx
                " />
                <MathBlock math="
                  = \frac{1}{2}x^2 \ln x - \frac{1}{2} \int x \, dx
                " />
                <MathBlock math="
                  = \frac{1}{2}x^2 \ln x - \frac{1}{4}x^2 + C
                " />
              </div>
            </div>

            {/* (2) 解答 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (2) 詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                我們雖然熟知 <MathInline math="\frac{d}{dx}(\ln x) = \frac{1}{x}" />，但一直不知道它的反導函數。
                這裡我們可以把 <MathInline math="\ln x" /> 視為 <MathInline math="1 \cdot \ln x" />，將常數 1 搬到微分號後面：
                <MathBlock math="\int \ln x \, dx = \int \ln x \, d(x)" />
                套用分部積分公式：
                <MathBlock math="
                  = x \ln x - \int x \, d(\ln x)
                " />
                由於 <MathInline math="d(\ln x) = \frac{1}{x} \, dx" /> :
                <MathBlock math="
                  = x \ln x - \int x \cdot \frac{1}{x} \, dx
                " />
                <MathBlock math="
                  = x \ln x - \int 1 \, dx 
                  = x \ln x - x + C
                " />
                這是微積分中非常重要且必須記住的基本積分結果！
              </div>
            </div>
          </div>
        </Solution>
      </Example>

      {/* 表格法（Tabular Integration） */}
      <h3 style={{ margin: '45px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        📊 快速解法：表格積分法 (Tabular Integration by Parts)
      </h3>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        當被積函數需要<strong>連續使用多次分部積分法</strong>時（例如：多項式乘以指數函數 <MathInline math="\int p(x) e^{ax} \, dx" />，或多項式乘以三角函數 <MathInline math="\int p(x) \sin(ax) \, dx" />），常規的逐步代入會顯得繁瑣且極易出錯。
        這時，我們可以使用<strong>表格積分法（也稱速計法）</strong>來快速寫出答案。
      </p>

      {/* 表格法說明 */}
      <Definition title="表格法操作步驟">
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <li>
            <strong>建立兩欄：</strong> 左邊為<strong>微分欄（不動）</strong>，右邊為<strong>積分欄（動）</strong>。
          </li>
          <li>
            <strong>左欄（微分）：</strong> 將多項式部分寫在左欄上方，並依次向下微分，直到結果為 <strong>0</strong> 止（或出現循環）。
          </li>
          <li>
            <strong>右欄（積分）：</strong> 將另一函數寫在右欄上方，並向下依次積分，直到與左欄的 0 對齊。
          </li>
          <li>
            <strong>相乘並配號：</strong> 從左欄第一項開始，<strong>沿對角線向右下方</strong>連接右欄的下一項，並在連線上交替標註正負號 <strong><MathInline math="+" />, <MathInline math="-" />, <MathInline math="+" />, <MathInline math="-" /></strong>（第一條為正）。
          </li>
          <li>
            <strong>寫出解答：</strong> 將所有連線兩端的項相乘並乘以其標註的符號，最後加上常數 <MathInline math="C" />。
          </li>
        </ol>
      </Definition>

      {/* 表格法範例展示 */}
      <Example title="3：多次分部積分（表格法）">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 試求：</strong> <MathInline math="\int t^2 e^t \, dt" />
          </div>
          <div>
            <strong>(2) 試求：</strong> <MathInline math="\int x^3 \sin(2x) \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* 子題 1 表格法 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 12px 0' }}>子題 (1) 詳解： <MathInline math="\int t^2 e^t \, dt" /></h5>
              
              {/* 表格 UI */}
              <div style={{ overflowX: 'auto', margin: '16px 0' }}>
                <table style={{ width: '100%', maxWidth: '400px', borderCollapse: 'collapse', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '10px' }}>正負號</th>
                      <th style={{ padding: '10px' }}>微分 <MathInline math="u" /> (不動)</th>
                      <th style={{ padding: '10px' }}>積分 <MathInline math="dv" /> (動)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px', color: 'var(--accent-secondary)' }}></td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="t^2" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="e^t" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>+ ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="2t" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="e^t" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-warm)', fontWeight: 'bold' }}>- ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="2" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="e^t" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>+ ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--text-tertiary)' }}><MathInline math="0" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="e^t" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                對角線相乘，我們可以直接寫出：
                <MathBlock math="
                  \int t^2 e^t \, dt 
                  = t^2(e^t) - 2t(e^t) + 2(e^t) + C 
                  = (t^2 - 2t + 2)e^t + C
                " />
              </div>
            </div>

            {/* 子題 2 表格法 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 12px 0' }}>子題 (2) 詳解： <MathInline math="\int x^3 \sin(2x) \, dx" /></h5>
              
              {/* 表格 UI */}
              <div style={{ overflowX: 'auto', margin: '16px 0' }}>
                <table style={{ width: '100%', maxWidth: '500px', borderCollapse: 'collapse', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                      <th style={{ padding: '10px' }}>正負號</th>
                      <th style={{ padding: '10px' }}>微分 <MathInline math="u" /> (不動)</th>
                      <th style={{ padding: '10px' }}>積分 <MathInline math="dv" /> (動)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '10px' }}></td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="x^3" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="\sin(2x)" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>+ ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="3x^2" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="-\frac{1}{2}\cos(2x)" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-warm)', fontWeight: 'bold' }}>- ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="6x" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="-\frac{1}{4}\sin(2x)" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>+ ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="6" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="\frac{1}{8}\cos(2x)" /></td>
                    </tr>
                    <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                      <td style={{ padding: '10px', color: 'var(--accent-warm)', fontWeight: 'bold' }}>- ↘</td>
                      <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--text-tertiary)' }}><MathInline math="0" /></td>
                      <td style={{ padding: '10px' }}><MathInline math="\frac{1}{16}\sin(2x)" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                對角線交叉配對相乘：
                <MathBlock math="
                  \int x^3 \sin(2x) \, dx 
                  = x^3 \left(-\frac{1}{2}\cos(2x)\right) - 3x^2 \left(-\frac{1}{4}\sin(2x)\right) + 6x \left(\frac{1}{8}\cos(2x)\right) - 6 \left(\frac{1}{16}\sin(2x)\right) + C
                " />
                化簡係數：
                <MathBlock math="
                  = -\frac{1}{2}x^3 \cos(2x) + \frac{3}{4}x^2 \sin(2x) + \frac{3}{4}x \cos(2x) - \frac{3}{8}\sin(2x) + C
                " />
                將 <MathInline math="\sin(2x)" /> 與 <MathInline math="\cos(2x)" /> 同類項合併：
                <MathBlock math="
                  = \left( -\frac{1}{2}x^3 + \frac{3}{4}x \right) \cos(2x) + \left( \frac{3}{4}x^2 - \frac{3}{8} \right) \sin(2x) + C
                " />
              </div>
            </div>

          </div>
        </Solution>
      </Example>

      {/* ⚠️ 核心技巧與注意點：無法微分到 0 的表格法 */}
      <h3 style={{ margin: '40px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: '600' }}>
        ⚠️ 核心注意：無法微分到 0 時的表格法處理
      </h3>
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        並非所有函數微分後都會變成 0。例如對數函數 <MathInline math="\ln x \to 1/x \to -1/x^2 \dots" />，微分項會無窮延續下去。
        這時如果使用表格法，我們可以在任意一列停止，但<strong>最後一列的項必須「水平相乘再積分」</strong>。
      </p>

      <Example title="4：無法微分至 0 的表格法應用">
        <p style={{ color: 'var(--text-secondary)' }}>
          試使用表格法求不定積分： <MathInline math="\int x \ln x \, dx" />。
        </p>
        <Solution>
          <div style={{ color: 'var(--text-secondary)' }}>
            在微分一欄中，我們將對數寫在上方。因為 <MathInline math="\ln x" /> 微分後不會得到 0，我們在第一步便停止：
            
            {/* 表格 UI */}
            <div style={{ overflowX: 'auto', margin: '16px 0' }}>
              <table style={{ width: '100%', maxWidth: '400px', borderCollapse: 'collapse', textAlign: 'center', backgroundColor: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <th style={{ padding: '10px' }}>正負</th>
                    <th style={{ padding: '10px' }}>微分 <MathInline math="u" /> (不動)</th>
                    <th style={{ padding: '10px' }}>積分 <MathInline math="dv" /> (動)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '10px' }}></td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="\ln x" /></td>
                    <td style={{ padding: '10px' }}><MathInline math="x" /></td>
                  </tr>
                  <tr style={{ borderTop: '1px dashed rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '10px', color: 'var(--accent-secondary)', fontWeight: 'bold' }}>+ ↘ (對角線)</td>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}><MathInline math="\frac{1}{x}" /></td>
                    <td style={{ padding: '10px' }}><MathInline math="\frac{1}{2}x^2" /></td>
                  </tr>
                  <tr style={{ borderTop: '2px solid var(--accent-warm)' }}>
                    <td style={{ padding: '10px', color: 'var(--accent-warm)', fontWeight: 'bold' }}>- → (水平積分)</td>
                    <td style={{ padding: '10px', fontWeight: 'bold', color: 'var(--accent-warm)' }}><MathInline math="\frac{1}{x}" /></td>
                    <td style={{ padding: '10px', color: 'var(--accent-warm)' }}><MathInline math="\frac{1}{2}x^2" /></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ margin: '12px 0', lineHeight: '1.7' }}>
              💡 <strong>最後一列規則</strong>：對角線的 <MathInline math="\ln x" /> 與 <MathInline math="\frac{1}{2}x^2" /> 直接相乘（正號）；
              最後一列水平的兩項 <MathInline math="\frac{1}{x}" /> 與 <MathInline math="\frac{1}{2}x^2" /> 水平相乘並標註負號，<strong>放入積分符號內</strong>：
            </p>
            <MathBlock math="
              \int x \ln x \, dx 
              = \ln x \cdot \left(\frac{1}{2}x^2\right) - \int \left( \frac{1}{x} \cdot \frac{1}{2}x^2 \right) \, dx
            " />
            <MathBlock math="
              = \frac{1}{2}x^2 \ln x - \frac{1}{2}\int x \, dx 
              = \frac{1}{2}x^2 \ln x - \frac{1}{4}x^2 + C
            " />
            這樣得出的答案與逐步積分法完全一致。這在處理反三角函數或對數函數與代數函數乘積時同樣非常管用。
          </div>
        </Solution>
      </Example>

      {/* 其他經典特殊狀況：反三角函數與循環積分 */}
      <h3 style={{ margin: '45px 0 20px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        🔄 特殊類型與循環積分 (Special Cases & Circular Integration)
      </h3>

      {/* 例題 5 */}
      <Example title="5：單一反三角函數與循環積分">
        <div style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <strong>(1) 試求單一反正切函數的積分：</strong> <MathInline math="\int \tan^{-1} x \, dx" />
          </div>
          <div>
            <strong>(2) 試求指數與三角乘積的循環積分：</strong> <MathInline math="\int e^x \sin x \, dx" />
          </div>
          <div>
            <strong>(3) 試求正割三次方積分：</strong> <MathInline math="\int \sec^3 x \, dx" />
          </div>
        </div>
        <Solution>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* (1) 反正切 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (1) 反正切積分詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                與對數積分同理，我們將反正切視為乘以 1，即 <MathInline math="\int \tan^{-1} x \, d(x)" /> :
                <MathBlock math="\int \tan^{-1} x \, dx = x \tan^{-1} x - \int x \, d(\tan^{-1} x)" />
                由於反正切的導數為 <MathInline math="d(\tan^{-1} x) = \frac{1}{1+x^2} \, dx" /> :
                <MathBlock math="= x \tan^{-1} x - \int \frac{x}{1+x^2} \, dx" />
                這是一個簡單的代換積分。分子 <MathInline math="x" /> 可以寫成分母導數的二分之一倍：<MathInline math="x \, dx = \frac{1}{2} d(1+x^2)" />，代入可得：
                <MathBlock math="
                  = x \tan^{-1} x - \frac{1}{2}\int \frac{1}{1+x^2} \, d(1+x^2)
                " />
                <MathBlock math="= x \tan^{-1} x - \frac{1}{2}\ln(1+x^2) + C" />
                （因 <MathInline math="1+x^2 > 0" /> 恆成立，絕對值記號可以省略。）
              </div>
            </div>

            {/* (2) 循環積分 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (2) 循環積分詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                我們注意到 <MathInline math="e^x" /> 與 <MathInline math="\sin x" /> 無論怎麼微分或積分都不會變成 0。
                這時，如果連續使用兩次分部積分，我們會發現<strong>原積分項會再次出現</strong>，從而形成一個代數方程式。
                <br />
                將 <MathInline math="\sin x" /> 移至後面：
                <MathBlock math="\int e^x \sin x \, dx = \int e^x \, d(-\cos x)" />
                <MathBlock math="= -e^x \cos x - \int (-\cos x) d(e^x) = -e^x \cos x + \int e^x \cos x \, dx" />
                對第二項的 <MathInline math="\int e^x \cos x \, dx" /> 再次進行分部積分（將 <MathInline math="\cos x" /> 移至後面）：
                <MathBlock math="= -e^x \cos x + \int e^x \, d(\sin x)" />
                <MathBlock math="= -e^x \cos x + \left[ e^x \sin x - \int \sin x \, d(e^x) \right]" />
                <MathBlock math="= -e^x \cos x + e^x \sin x - \int e^x \sin x \, dx" />
                將等式兩端連起來，我們發現：
                <MathBlock math="
                  \int e^x \sin x \, dx = e^x(\sin x - \cos x) - \int e^x \sin x \, dx
                " />
                我們將右邊的負積分項移到左邊，合併同類項：
                <MathBlock math="
                  2 \int e^x \sin x \, dx = e^x(\sin x - \cos x)
                " />
                兩邊除以 2，並加上積分常數 <MathInline math="C" />，即得特解：
                <MathBlock math="
                  \int e^x \sin x \, dx = \frac{1}{2} e^x(\sin x - \cos x) + C
                " />
              </div>
            </div>

            {/* (3) 正割三次方 */}
            <div>
              <h5 style={{ color: 'var(--accent-primary)', margin: '0 0 8px 0' }}>子題 (3) 正割三次方積分詳解：</h5>
              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                將 <MathInline math="\sec^3 x" /> 拆解為 <MathInline math="\sec x \cdot \sec^2 x" />。
                由於我們知道 <MathInline math="\int \sec^2 x \, dx = \tan x" />，因此可以將其搬至後面：
                <MathBlock math="
                  \int \sec^3 x \, dx 
                  = \int \sec x \cdot \sec^2 x \, dx 
                  = \int \sec x \, d(\tan x)" 
                />
                套用公式：
                <MathBlock math="= \sec x \tan x - \int \tan x \, d(\sec x)" />
                利用導數公式 <MathInline math="d(\sec x) = \sec x \tan x \, dx" /> :
                <MathBlock math="
                  = \sec x \tan x - \int \tan x \cdot (\sec x \tan x) \, dx
                " />
                <MathBlock math="= \sec x \tan x - \int \tan^2 x \sec x \, dx" />
                利用三角恆等式 <MathInline math="\tan^2 x = \sec^2 x - 1" /> :
                <MathBlock math="
                  = \sec x \tan x - \int (\sec^2 x - 1) \sec x \, dx
                " />
                <MathBlock math="
                  = \sec x \tan x - \int \sec^3 x \, dx + \int \sec x \, dx
                " />
                這時，左端的 <MathInline math="\int \sec^3 x \, dx" /> 再次出現在右端！
                我們將右側的負積分項移至左側合併：
                <MathBlock math="
                  2 \int \sec^3 x \, dx = \sec x \tan x + \int \sec x \, dx
                " />
                我們在 6.1 節中已求得 <MathInline math="\int \sec x \, dx = \ln|\sec x + \tan x| + C" />。代入後除以 2，即得：
                <MathBlock math="
                  \int \sec^3 x \, dx = \frac{1}{2} \sec x \tan x + \frac{1}{2} \ln|\sec x + \tan x| + C
                " />
                此積分在後續的「三角代換法」與幾何應用（如計算曲線弧長）中會頻繁使用，務必掌握。
              </div>
            </div>

          </div>
        </Solution>
      </Example>

      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試用分部積分法計算不定積分：<MathInline math="\int x e^{2x} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：多項式在原地微分，指數函數搬到後面積分。答案：<MathInline math="\frac{1}{2} x e^{2x} - \frac{1}{4} e^{2x} + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 試求不定積分：<MathInline math="\int x^2 \ln x \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：因為對數不好積分，務必令 <MathInline math="u = \ln x" />，並使用無法微分至 0 的表格法或常規公式。答案：<MathInline math="\frac{1}{3} x^3 \ln x - \frac{1}{9} x^3 + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 3.</strong> 試求不定積分：<MathInline math="\int \sin^{-1} x \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：視為與 1 相乘，移項後利用反三角函數的導數進行計算。答案：<MathInline math="x \sin^{-1} x + \sqrt{1-x^2} + C" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

import { MathInline, MathBlock } from '../../../../components/MathBlocks';

export default function Calculus_2_5() {
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
    <div className="limit-formulas-grid">
      {/* 標題與引言 */}
      <p style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在處理極限問題時，除了使用極限的運算法則與夾擠定理外，熟記一些核心函數的「常用極限公式」可以幫助我們快速化簡與求解。以下彙整了微積分中在有理函數、無理函數、三角函數、指數函數與對數函數下最常遇到的基礎極限公式。
      </p>

      {/* 1. 有理函數極限 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-primary)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-primary)',
          backgroundColor: 'rgba(139, 92, 246, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          一、有理函數極限 (Rational Functions)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.7' }}>
            以下公式中，設定冪指數 <MathInline math="n > 0" /> 且底數 <MathInline math="a > 1" />：
          </p>
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                1. 冪函數的無窮遠倒數極限
              </span>
              <MathBlock math="\lim_{x \to \infty} \frac{1}{x^n} = 0" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                2. 指數函數的無窮遠倒數極限
              </span>
              <MathBlock math="\lim_{x \to \infty} \frac{1}{a^x} = 0" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                3. 反比例函數原點右極限
              </span>
              <MathBlock math="\lim_{x \to 0^+} \frac{1}{x} = +\infty" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                4. 反比例函數原點左極限
              </span>
              <MathBlock math="\lim_{x \to 0^-} \frac{1}{x} = -\infty" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 無理函數極限 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-secondary)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-secondary)',
          backgroundColor: 'rgba(6, 182, 212, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          二、無理函數極限 (Irrational Functions)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                1. x 次開方根在無窮遠處的極限
              </span>
              <MathBlock math="\lim_{x \to \infty} \sqrt[x]{x} = 1" />
            </div>
          </div>
        </div>
      </div>

      {/* 3. 三角函數極限 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid var(--accent-warm)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'var(--accent-warm)',
          backgroundColor: 'rgba(245, 158, 11, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          三、三角函數極限 (Trigonometric Functions)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                1. 原點處的經典三角極限
              </span>
              <MathBlock math="\lim_{x \to 0} \frac{\sin x}{x} = 1" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                2. 無窮遠處的振盪衰減極限
              </span>
              <MathBlock math="\lim_{x \to \infty} \frac{\sin x}{x} = 0" />
            </div>
          </div>
        </div>
      </div>

      {/* 4. 指數函數極限 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid hsl(340, 80%, 55%)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'hsl(340, 80%, 55%)',
          backgroundColor: 'rgba(236, 72, 153, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          四、指數函數極限 (Exponential Functions)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                1. 自然對數底數 e 的定義極限
              </span>
              <MathBlock math="\lim_{x \to \infty} \left(1 + \frac{1}{x}\right)^x = \lim_{x \to 0} (1+x)^{\frac{1}{x}} = e" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                2. 指數函數原點割線極限
              </span>
              <MathBlock math="\lim_{x \to 0} \frac{e^x - 1}{x} = 1" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                3. 自變數冪次趨近原點的極限
              </span>
              <MathBlock math="\lim_{x \to 0^+} x^x = 1" />
            </div>
          </div>
        </div>
      </div>

      {/* 5. 對數函數極限 */}
      <div style={{
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        borderLeft: '5px solid hsl(142, 70%, 45%)',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '14px 20px',
          fontWeight: '700',
          fontSize: '0.95rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          color: 'hsl(142, 70%, 45%)',
          backgroundColor: 'rgba(16, 185, 129, 0.03)'
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          五、對數函數極限 (Logarithmic Functions)
        </div>
        <div style={{ padding: '20px' }} className="math-serif">
          <div style={gridStyle}>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                1. 對數函數在原點的割線極限
              </span>
              <MathBlock math="\lim_{x \to 0} \frac{\ln(1+x)}{x} = 1" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                2. 自然對數趨近於 0 處的右極限
              </span>
              <MathBlock math="\lim_{x \to 0^+} \ln x = -\infty" />
            </div>
            <div style={subCardStyle}>
              <span style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                3. 自然對數在無窮遠處的極限
              </span>
              <MathBlock math="\lim_{x \to +\infty} \ln x = +\infty" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

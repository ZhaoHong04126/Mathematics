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

export default function Calculus_6_5() {
  return (
    <div>
      {/* 導讀 */}
      <div style={{ margin: '16px 0 24px 0', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
        在本節中，我們將探討如何求解<strong>有理函數 (Rational Functions)</strong>的積分。
        有理函數是指兩個多項式相除所構成的函數：
        <MathBlock math="f(x) = \frac{P(x)}{Q(x)}" />
        其中 <MathInline math="P(x)" /> 與 <MathInline math="Q(x)" /> 皆為實係數多項式。
        部分分式法（Partial Fractions）的基本觀念是：<strong>將一個複雜的有理函數拆解為數個簡單有理函數的分式和，使其可以直接套用對數、反三角函數或冪次積分公式求解。</strong>
      </div>

      {/* 一、前置步驟：真有理分式 vs 假有理分式 */}
      <h3 style={{ margin: '32px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        一、前置步驟：真有理分式與多項式長除法
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        在使用部分分式法分解之前，我們必須先檢查多項式的次數（degree）：
      </div>

      <Definition title="有理分式的類別與預處理">
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            1. <strong>真有理分式 (Proper Rational Function)：</strong>
            <br />
            當分子次數小於分母次數，即 <MathInline math="\deg(P) < \deg(Q)" /> 時。此時可直接進行部分分式分解。
          </div>
          <div style={{ marginTop: '12px', borderTop: '1px dashed var(--border-color)', paddingTop: '12px' }}>
            2. <strong>假有理分式 (Improper Rational Function)：</strong>
            <br />
            當分子次數大於或等於分母次數，即 <MathInline math="\deg(P) \ge \deg(Q)" /> 時。我們<strong>必須先利用多項式長除法 (Long Division)</strong> 將其改寫為：
            <MathBlock math="\frac{P(x)}{Q(x)} = S(x) + \frac{R(x)}{Q(x)}" />
            其中 <MathInline math="S(x)" /> 是商式（Polynomial Quotient），而餘式 <MathInline math="R(x)" /> 的次數必定滿足 <MathInline math="\deg(R) < \deg(Q)" />（即 <MathInline math="\frac{R(x)}{Q(x)}" /> 為真有理分式）。
            <br />
            此時積分便轉化為：
            <MathBlock math="\int \frac{P(x)}{Q(x)} \, dx = \int S(x) \, dx + \int \frac{R(x)}{Q(x)} \, dx" />
            前項為多項式積分，後項則可使用部分分式法求解。
          </div>
        </div>
      </Definition>

      {/* 二、部分分式分解的四種 Case */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        二、部分分式分解的四種情況 (Cases)
      </h3>
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
        假定 <MathInline math="\frac{R(x)}{Q(x)}" /> 為真有理分式。我們對分母 <MathInline math="Q(x)" /> 進行因式分解，依其分解出的因子類別，主要分為以下四種拆解情況：
      </div>

      {/* Case 1 */}
      <Definition title={<>Case 1：分母 <MathInline math="Q(x)" /> 含有互異一次因子 (Distinct Linear Factors)</>}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            若 <MathInline math="Q(x)" /> 可完全分解為相異的一次實因子：
            <MathBlock math="Q(x) = (a_1x + b_1)(a_2x + b_2)\dots(a_kx + b_k)" />
            則可將分式拆解為：
            <MathBlock math="\frac{R(x)}{Q(x)} = \frac{A_1}{a_1x + b_1} + \frac{A_2}{a_2x + b_2} + \dots + \frac{A_k}{a_kx + b_k}" />
            其中 <MathInline math="A_1, A_2, \dots, A_k" /> 為待確定常數。
          </div>
        </div>
      </Definition>

      {/* Case 2 */}
      <Definition title={<>Case 2：分母 <MathInline math="Q(x)" /> 含有重複一次因子 (Repeated Linear Factors)</>}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            若 <MathInline math="Q(x)" /> 中含有某個一次因子 <MathInline math="ax + b" /> 重複出現 <MathInline math="r" /> 次（即含有項 <MathInline math="(ax+b)^r" />）：
            <br />
            則在部分分式分解中，該項必須對應拆解出以下 <MathInline math="r" /> 個分式之和：
            <MathBlock math="\frac{A_1}{ax + b} + \frac{A_2}{(ax + b)^2} + \dots + \frac{A_r}{(ax + b)^r}" />
          </div>
        </div>
      </Definition>

      {/* Case 3 */}
      <Definition title={<>Case 3：分母 <MathInline math="Q(x)" /> 含有互異不可約二次因子 (Distinct Irreducible Quadratic Factors)</>}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            不可約二次因子是指在實數體上無法再因式分解的二次式 <MathInline math="ax^2 + bx + c" />（其判別式 <MathInline math="b^2 - 4ac < 0" />）。
            <br />
            若 <MathInline math="Q(x)" /> 中含有此相異二次因子，則拆解式中該項對應的分子<strong>必須設為一次多項式形式</strong>：
            <MathBlock math="\frac{Ax + B}{ax^2 + bx + c}" />
          </div>
        </div>
      </Definition>

      {/* Case 4 */}
      <Definition title={<>Case 4：分母 <MathInline math="Q(x)" /> 含有重複不可約二次因子 (Repeated Irreducible Quadratic Factors)</>}>
        <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
          <div>
            若 <MathInline math="Q(x)" /> 含有不可約二次因子 <MathInline math="ax^2 + bx + c" /> 且重複出現 <MathInline math="r" /> 次（即含有項 <MathInline math="(ax^2+bx+c)^r" />）：
            <br />
            則在部分分式分解中，該項必須對應拆解出以下 <MathInline math="r" /> 個分式之和，且每個分子皆為一次式：
            <MathBlock math="\frac{A_1x + B_1}{ax^2 + bx + c} + \frac{A_2x + B_2}{(ax^2 + bx + c)^2} + \dots + \frac{A_rx + B_r}{(ax^2 + bx + c)^r}" />
          </div>
        </div>
      </Definition>


      {/* 三、經典例題與詳細步驟解答 */}
      <h3 style={{ margin: '40px 0 16px 0', color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: '600', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
        三、經典例題詳解
      </h3>

      {/* 例題 1 */}
      <Example title="前置處理：假有理函數積分">
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{x^3+x}{x-1} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              被積函數分子次數為 3，分母次數為 1。這是一個<strong>假有理函數</strong>。
              第一步我們必須進行多項式除法。
              將 <MathInline math="x^3+x" /> 除以 <MathInline math="x-1" />：
              <MathBlock math="x^3 + x = (x^2 + x + 2)(x - 1) + 2" />
              因此可改寫為：
              <MathBlock math="\frac{x^3+x}{x-1} = x^2 + x + 2 + \frac{2}{x-1}" />
            </div>
            <div style={{ margin: '14px 0' }}>
              現在我們可以對每一項直接進行積分：
              <MathBlock math="
                \int \frac{x^3+x}{x-1} \, dx 
                = \int \left( x^2 + x + 2 + \frac{2}{x-1} \right) \, dx
              " />
              <MathBlock math="
                = \frac{x^3}{3} + \frac{x^2}{2} + 2x + 2\ln|x-1| + C
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 2 */}
      <Example title={<>Case 1 實例：分母為互異一次因子</>}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{5x-4}{x^2-x-2} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              首先，我們將分母因式分解：
              <MathBlock math="x^2 - x - 2 = (x-2)(x+1)" />
              因為分母是互異一次因子，我們將分式設為部分分式：
              <MathBlock math="\frac{5x-4}{(x-2)(x+1)} = \frac{A}{x-2} + \frac{B}{x+1}" />
            </div>
            <div style={{ margin: '14px 0' }}>
              同乘分母 <MathInline math="(x-2)(x+1)" /> 以消去分母，得到代數恆等式：
              <MathBlock math="5x - 4 = A(x+1) + B(x-2)" />
              我們可以使用<strong>代入法 (Substitution Method)</strong> 來求解常數 <MathInline math="A" /> 與 <MathInline math="B" />：
              <br />
              1. 令 <MathInline math="x = 2" />（消去包含 <MathInline math="B" /> 的項）：
              <MathBlock math="5(2) - 4 = A(2+1) \implies 6 = 3A \implies A = 2" />
              2. 令 <MathInline math="x = -1" />（消去包含 <MathInline math="A" /> 的項）：
              <MathBlock math="5(-1) - 4 = B(-1-2) \implies -9 = -3B \implies B = 3" />
            </div>
            <div style={{ margin: '14px 0' }}>
              將求得的常數代回，並進行積分：
              <MathBlock math="
                \int \frac{5x-4}{x^2-x-2} \, dx 
                = \int \left( \frac{2}{x-2} + \frac{3}{x+1} \right) \, dx
              " />
              利用對數積分公式，得最終解：
              <MathBlock math="
                = 2\ln|x-2| + 3\ln|x+1| + C
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 3 */}
      <Example title={<>Case 2 實例：分母含有重複一次因子</>}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{x^2+1}{(x-1)^2(x+1)} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              分母中一次式 <MathInline math="x-1" /> 重複了兩次。根據 Case 2 的設定方式，部分分式拆解應為：
              <MathBlock math="\frac{x^2+1}{(x-1)^2(x+1)} = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{x+1}" />
            </div>
            <div style={{ margin: '14px 0' }}>
              等號兩邊同乘分母 <MathInline math="(x-1)^2(x+1)" />，得到代數式：
              <MathBlock math="x^2 + 1 = A(x-1)(x+1) + B(x+1) + C(x-1)^2" />
              使用適當數值代入：
              <br />
              1. 令 <MathInline math="x = 1" />：
              <MathBlock math="1^2 + 1 = B(1+1) \implies 2 = 2B \implies B = 1" />
              2. 令 <MathInline math="x = -1" />：
              <MathBlock math="(-1)^2 + 1 = C(-1-1)^2 \implies 2 = 4C \implies C = \frac{1}{2}" />
              3. 為了求出常數 <MathInline math="A" />，我們可以比較 <MathInline math="x^2" /> 項的係數。
              右式展開後，<MathInline math="x^2" /> 的係數為 <MathInline math="A + C" />。左式 <MathInline math="x^2" /> 係數為 1：
              <MathBlock math="1 = A + C \implies A = 1 - \frac{1}{2} = \frac{1}{2}" />
            </div>
            <div style={{ margin: '14px 0' }}>
              將常數代回並積分：
              <MathBlock math="
                \int \frac{x^2+1}{(x-1)^2(x+1)} \, dx 
                = \int \left( \frac{1/2}{x-1} + \frac{1}{(x-1)^2} + \frac{1/2}{x+1} \right) \, dx
              " />
              逐項積分（注意第二項使用冪次規則）：
              <MathBlock math="
                = \frac{1}{2}\ln|x-1| - \frac{1}{x-1} + \frac{1}{2}\ln|x+1| + C
              " />
            </div>
          </div>
        </Solution>
      </Example>

      {/* 例題 4 */}
      <Example title={<>Case 3 實例：分母含有不可約二次因子</>}>
        <div style={{ color: 'var(--text-secondary)', marginBottom: '14px' }}>
          試求不定積分： <MathInline math="\int \frac{2x^2-x+4}{x^3+4x} \, dx" />。
        </div>
        <Solution>
          <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            <div style={{ margin: '14px 0' }}>
              首先將分母因式分解：
              <MathBlock math="x^3 + 4x = x(x^2+4)" />
              其中二次式 <MathInline math="x^2+4" /> 在實數體上不可約。
              依據 Case 3，我們設定分解型態：
              <MathBlock math="\frac{2x^2-x+4}{x(x^2+4)} = \frac{A}{x} + \frac{Bx+C}{x^2+4}" />
            </div>
            <div style={{ margin: '14px 0' }}>
              同乘分母 <MathInline math="x(x^2+4)" />：
              <MathBlock math="2x^2 - x + 4 = A(x^2+4) + (Bx+C)x" />
              展開並按冪次整理右式：
              <MathBlock math="2x^2 - x + 4 = (A+B)x^2 + Cx + 4A" />
              比較左右兩邊係數：
              <br />
              - 常數項比較： <MathInline math="4 = 4A \implies A = 1" />。
              <br />
              - <MathInline math="x" /> 項係數比較： <MathInline math="C = -1" />。
              <br />
              - <MathInline math="x^2" /> 項係數比較： <MathInline math="A+B = 2 \implies 1+B = 2 \implies B = 1" />。
            </div>
            <div style={{ margin: '14px 0' }}>
              常數為 <MathInline math="A = 1, B = 1, C = -1" />。代回積分式中：
              <MathBlock math="
                \int \frac{2x^2-x+4}{x^3+4x} \, dx 
                = \int \left( \frac{1}{x} + \frac{x-1}{x^2+4} \right) \, dx 
                = \int \frac{1}{x} \, dx + \int \frac{x}{x^2+4} \, dx - \int \frac{1}{x^2+4} \, dx
              " />
              計算三項子積分：
              <br />
              1. 第一項： <MathInline math="\ln|x|" />。
              <br />
              2. 第二項：令 <MathInline math="u = x^2+4, du = 2xdx" />，得 <MathInline math="\frac{1}{2}\ln(x^2+4)" />。
              <br />
              3. 第三項：利用標準公式 <MathInline math="\int \frac{dx}{x^2+a^2} = \frac{1}{a}\arctan\left(\frac{x}{a}\right)" />，得 <MathInline math="\frac{1}{2}\arctan\left(\frac{x}{2}\right)" />。
              <br />
              合併三項結果，即得最終解：
              <MathBlock math="
                = \ln|x| + \frac{1}{2}\ln(x^2+4) - \frac{1}{2}\arctan\left(\frac{x}{2}\right) + C
              " />
            </div>
          </div>
        </Solution>
      </Example>


      {/* 隨堂練習 */}
      <Exercises>
        <ExerciseItem>
          <div>
            <strong>練習 1.</strong> 試求不定積分：<MathInline math="\int \frac{x-9}{x^2-3x-10} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：因式分解分母為 <MathInline math="(x-5)(x+2)" />。答案：<MathInline math="2\ln|x+2| - \ln|x-5| + C" />）
            </span>
          </div>
        </ExerciseItem>
        <ExerciseItem>
          <div>
            <strong>練習 2.</strong> 試求不定積分：<MathInline math="\int \frac{10}{(x-1)(x^2+9)} \, dx" />。
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', display: 'block', marginTop: '6px' }}>
              （提示：拆解為 <MathInline math="\frac{A}{x-1} + \frac{Bx+C}{x^2+9}" /> 並解得 <MathInline math="A = 1, B = -1, C = -1" />。答案：<MathInline math="\ln|x-1| - \frac{1}{2}\ln(x^2+9) - \frac{1}{3}\arctan\left(\frac{x}{3}\right) + C" />）
            </span>
          </div>
        </ExerciseItem>
      </Exercises>
    </div>
  );
}

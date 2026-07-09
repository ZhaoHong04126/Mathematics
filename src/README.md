# 大學數學：講義內容撰寫教學指南

歡迎開始撰寫數學講義！本專案採用 **React JSX** 來建構每個章節的單元。這表示您可以直接在講義中撰寫 HTML 結構、插入 React 元件、排版數學公式，甚至可以加入互動式的圖表。

本指南將教您如何建立新單元、使用內建的學術排版元件，以及如何將其配置到側邊欄選單中。

---

## 📂 目錄結構與檔案命名

講義的 JSX 檔案一律存放在 `src/data/chapters/` 目錄中，並根據**「學科/章節」**劃分資料夾。
推薦的命名與路徑結構如下：
- `src/data/chapters/Calculus/ch1/Calculus_1_1.jsx` （微積分第一章 1.1 單元）
- `src/data/chapters/Calculus/ch1/Calculus_1_2.jsx` （微積分第一章 1.2 單元）
- `src/data/chapters/LinearAlgebra/ch1/LA_1_1.jsx` （線性代數第一章 1.1 單元）

---

## 📝 基礎範本 (Template)

每次建立新的單元 JSX 檔案時，可以直接複製並修改以下範本：

```jsx
import { 
  Definition, 
  Theorem, 
  Example, 
  Solution, 
  Proof, 
  MathInline, 
  MathBlock, 
  Exercises, 
  ExerciseItem 
} from '../../../../components/MathBlocks'; // 👈 注意：深度已變為四層，需使用四個 ../

export default function MyUnit() {
  return (
    <div>
      <p style={{ margin: '14px 0', color: 'var(--text-secondary)' }}>
        這是您的單元引言或前言。
      </p>

      {/* 在此處開始撰寫您的定義、定理與例題 */}
      
    </div>
  );
}
```
> **注意**：導入路徑 `../../../../components/MathBlocks` 的層級數量，會取決於您的檔案放在多深的資料夾中。若放置於 `src/data/chapters/[Course]/ch[N]/`，深度為四層，故使用 `../../../../`。

---

## 🛠️ 排版元件使用指南

本專案提供了一套專門針對數學與學術排版設計的元件庫，包含以下元件：

### 1. 數學公式元件

#### 🏷️ 行內公式：`<MathInline math="..." />`
- **用途**：用於文字段落中的簡短公式或符號。
- **範例**：
  ```jsx
  <p>設有一矩陣 <MathInline math="A = [a_{ij}]" /> 位於實數空間中。</p>
  ```

#### 🏷️ 區塊公式：`<MathBlock math="..." />`
- **用途**：獨立成行、置中且放大顯示的重要公式。
- **範例**
  ```jsx
  <MathBlock math="AB = \\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}" />
  ```

> ⚠️ **非常重要：LaTeX 斜線轉義規則**
> 由於 JSX 是 JavaScript 環境，在字串屬性 `math="..."` 之中，**必須使用雙反斜線 `\\` 來代表 LaTeX 的單反斜線 `\`**。
> - ❌ 錯誤：`math="\sqrt{x}"` (這會造成語法解析警告或錯誤)
> -  正確：`math="\\sqrt{x}"`
> - ❌ 錯誤：`math="\begin{bmatrix} a & b \\ c & d \end{bmatrix}"`
> -  正確：`math="\\begin{bmatrix} a & b \\\\ c & d \\end{bmatrix}"` (矩陣換行的雙反斜線在 JS 中需要寫成四個反斜線 `\\\\`)

---

### 2. 學術內容卡片

#### 🏷️ 定義卡片：`<Definition title="...">內容</Definition>`
- **用途**：名詞定義、定理前提。
- **範例**：
  ```jsx
  <Definition title="矩陣的乘法">
    設二矩陣相乘...
  </Definition>
  ```

#### 🏷️ 定理卡片：`<Theorem title="...">內容</Theorem>`
- **用途**：數學定理、重要公式、性質。
- **範例**：
  ```jsx
  <Theorem title="行列式幾何意義">
    二階行列式代表向量張成的平行四邊形面積...
  </Theorem>
  ```

#### 🏷️ 證明卡片（可收合）：`<Proof title="...">證明內容</Proof>`
- **用途**：放置定理的推導與證明過程。預設為折疊狀態，讀者點擊後會展開。
- **範例**：
  ```jsx
  <Proof title="夾擠定理的證明">
    <p>第一步，利用函數邊界進行縮小...</p>
  </Proof>
  ```

#### 🏷️ 例題卡片：`<Example title="...">題目內容</Example>`
- **用途**：經典題目或練習題。
- **配置解答**：可與 `<Solution>解答內容</Solution>` 搭配使用，解答預設會被摺疊起來，讀者需要點擊「顯示解答」才能看見。
- **範例**：
  ```jsx
  <Example title="求極限值">
    求 <MathInline math="\\lim_{x \\to 0} \\frac{\\sin x}{x}" />。
    <Solution>
      <p>解：利用夾擠定理可證得極限值為 1。</p>
    </Solution>
  </Example>
  ```

#### 🏷️ 練習題清單：`<Exercises>...</Exercises>`
- **用途**：置於單元最下方，提供課後練習。與 `<ExerciseItem>` 搭配使用。
- **範例**：
  ```jsx
  <Exercises>
    <ExerciseItem>1. 設 A 與 B 為兩對稱矩陣，證明 AB 為對稱矩陣的充要條件為 AB = BA。</ExerciseItem>
    <ExerciseItem>2. 計算極限值...</ExerciseItem>
  </Exercises>
  ```

---

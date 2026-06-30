# 大學數學個人電子講義與知識庫 (University Mathematics Note Repository)

這是一個專為大學數學學科（如微積分、線性代數、常微分方程、機率與統計、離散數學等）學習與記錄打造的個人電子講義與知識庫系統。本專案採用 **Vite + React** 建構，具備學術感極強的書籍風格排版，並專注於將筆記與 LaTeX 數學公式進行即時網頁美化。

---

## 🎨 系統特色

- **多學科架構**：整合微積分、線性代數、多變量微積分等核心課程的大綱框架，滿足全方位的數學筆記需求。
- **JSX 組件化驅動**：每個單元或小節都是一個獨立的 React 元件，可自由客製排版、加入互動元素、插圖或程式碼。
- **學術級排版元件庫**：內建「定義」、「定理」、「例題」、「折疊解答」、「折疊證明」、「練習題」等卡片式元件，排版貼近實體教科書。
- **LaTeX 數學公式美化**：支援行內與區塊數學公式（利用襯線字體與護眼配色），公式排版美觀且載入速度快。
- **極簡圖書風格設計**：左側為側邊大綱導覽，右側為全螢幕講義閱讀區，具備護眼雙色主題（深色/淺色）與精緻字體。
- **智慧搜尋與定位**：輸入關鍵字時大綱會即時進行篩選，若命中子章節，會自動展開其所屬的父章節。

---

## 📂 專案檔案結構

- `src/components/MathBlocks.jsx`：**學術排版元件庫**。包含行內/區塊公式、定義、定理、例題、解答摺疊、證明摺疊、練習題等組件。
- `src/data/chapters/`：**講義內容資料夾**。每個小節的獨立 JSX 檔案依據學科與章節分類存放於此（例如 `Calculus/ch1/Calculus_1_1.jsx`）。
- `src/data/chapters.js`：**講義大綱配置檔**。定義了學科、章、節、子節的層級樹狀結構，並將各節連結至對應的 JSX 元件。
- `src/components/Sidebar.jsx`：側邊欄導覽組件，負責搜尋、大綱渲染與收合。
- `src/components/MainContent.jsx`：主要內容渲染器，負責整合麵包屑與動態元件渲染。
- `src/index.css`：全域樣式表，包含主題配色、字型導入與元件的 CSS 樣式。

---

## ✍️ 如何新增講義與筆記 (JSX 模式)

### 第一步：建立單元檔案
在 `src/data/chapters/` 目錄中，根據科目與章節建立對應的子資料夾與 JSX 檔案。例如，若要新增微積分第一章的「何謂函數」，可建立：
`src/data/chapters/Calculus/ch1/Calculus_1_1.jsx`

### 第二步：編寫單元內容
在新建的檔案中，複製並修改以下基礎學術範本：

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
} from '../../../../components/MathBlocks'; // 👈 注意：深度為四層，需使用四個 ../

export default function Calculus_1_1() {
  return (
    <div>
      <p style={{ margin: '14px 0', color: 'var(--text-secondary)' }}>
        本單元將介紹函數的基本定義...
      </p>

      <Definition title="函數的定義">
        設 A 與 B 為兩個非空集合，若對 A 中的每一個元素...
      </Definition>
    </div>
  );
}
```

> ⚠️ **重要提示 (LaTeX 反斜線轉義)**：
> 在屬性 `math="..."` 中寫入 LaTeX 公式時，**必須使用雙反斜線 `\\` 來代表 LaTeX 的單反斜線 `\`**。
> - ❌ 錯誤：`math="\sqrt{x}"` (會造成語法解析警告或錯誤)
> -  正確：`math="\\sqrt{x}"`

### 第三步：將單元配置到目錄 (Sidebar)
1. 打開 **`src/data/chapters.js`**。
2. 在檔案頂部匯入新建的單元元件：
   ```javascript
   import Calculus_1_1 from './chapters/Calculus/ch1/Calculus_1_1';
   ```
3. 在 `chaptersData` 陣列中尋找對應的學科與章節，將原先的 `content: "未有此內容"` 欄位改為 **`component: Calculus_1_1`**：
   ```javascript
   {
     id: "1-1-1",
     title: "1.1 何謂函數？",
     component: Calculus_1_1  // 👈 將元件指派給此章節
   }
   ```
完成後，網頁的側邊欄大綱、首頁索引與麵包屑將會自動與您的 JSX 內容進行綁定與渲染！

---

## 🚀 常用指令

### 安裝相依套件
在專案根目錄下執行：
```bash
npm install
```

### 啟動開發伺服器
執行以下指令啟動本機伺服器：
```bash
npm run dev
```

### 編譯生產版本
若需要編譯並壓縮專案以供部署：
```bash
npm run build
```
編譯完成後的靜態檔案將輸出於 `dist/` 資料夾中。

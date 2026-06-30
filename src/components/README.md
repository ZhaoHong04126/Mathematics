# 📂 src/components 元件說明與使用指南

此資料夾包含了本系統的所有 React 視圖元件。本系統架構將「內容」與「渲染」分離，以下是各個元件的職責、內部程式碼邏輯與使用方法說明。

---

## 🗺️ 元件概覽

| 檔案名稱 | 職責說明 | 主要屬性 (Props) / 狀態 (State) |
| :--- | :--- | :--- |
| **[MathBlocks.jsx](https://github.com/ZhaoHong04126/MultivariableCalculus/blob/main/src/components/MathBlocks.jsx)** | 學術公式與講義排版元件庫（定義、定理、例題、折疊解答與證明等）。 | `math`, `title`, `children` |
| **[Sidebar.jsx](https://github.com/ZhaoHong04126/MultivariableCalculus/blob/main/src/components/Sidebar.jsx)** | 左側樹狀章節大綱選單，支援搜尋篩選、多層級收合與行動端適應。 | `activeTopicId`, `setActiveTopicId`, `searchQuery`, `setSearchQuery`, `mobileOpen`, `setMobileOpen` |
| **[MainContent.jsx](https://github.com/ZhaoHong04126/MultivariableCalculus/blob/main/src/components/MainContent.jsx)** | 右側主內容閱讀區，支援多層麵包屑導覽、首頁目錄索引與動態元件載入。 | `activeTopicId`, `setActiveTopicId` |

---

## 1. 🧮 MathBlocks.jsx (學術排版元件庫)

這是專為大學數學電子講義與知識庫設計的排版組件庫。它封裝了 `index.css` 中預先定義好的學術卡片樣式，讓作者在 JSX 中能以簡單的 HTML 標籤寫出美觀的版面。

### 內含元件說明：

#### 🔹 `MathInline` (行內公式)
- **程式碼邏輯**：將傳入的 `math` 字串包裹在具有 `math-inline` 類別名的 `<span>` 中。其字體採用 Lora (Serif) 襯線字，並配合主題色強調。
- **使用範例**：
  ```jsx
  <MathInline math="f(x, y)" />
  ```

#### 🔹 `MathBlock` (區塊公式)
- **程式碼邏輯**：將 `math` 字串包裹在 `.math-block` 之中，以區塊元素 (`<div>`) 置中呈現，並支援橫向溢出滾動。
- **使用範例**：
  ```jsx
  <MathBlock math="\\nabla f = \\left( \\frac{\\partial f}{\\partial x}, \\frac{\\partial f}{\\partial y} \\right)" />
  ```

#### 🔹 `Definition` & `Theorem` (定義與定理)
- **程式碼邏輯**：渲染為邊框卡片，分別使用 `.definition-block` 與 `.theorem-block`。頂部有內建的 SVG 書本/書卷圖示，並支援傳入 `title` 作為標題。
- **使用範例**：
  ```jsx
  <Definition title="偏導數">偏導數的數學定義...</Definition>
  ```

#### 🔹 `Example` & `Solution` (例題與摺疊解答)
- **程式碼邏輯**：
  - `Example` 會渲染 `.example-block`。
  - `Solution` 內部維護了一個 `isOpen` 的布林值狀態。它會渲染一個「顯示解答 / 隱藏解答」的按鈕，點擊時切換 `isOpen`，動態顯示 `.solution-body`。
- **使用範例**：
  ```jsx
  <Example title="求極值">
    求函數在... 的極值。
    <Solution>
      解題步驟...
    </Solution>
  </Example>
  ```

#### 🔹 `Proof` (可收合定理證明)
- **程式碼邏輯**：內部維護 `isOpen` 狀態，點擊頂部標題列（`.proof-header`）時會旋轉箭頭並動態展開/摺疊底下的 `.proof-body`。
- **使用範例**：
  ```jsx
  <Proof title="連鎖律定理證明">
    證明步驟...
  </Proof>
  ```

#### 🔹 `Exercises` & `ExerciseItem` (課後練習題)
- **程式碼邏輯**：渲染底部練習題卡片區塊（`.exercises-card`），並在內部條列呈現 `<ExerciseItem>`。
- **使用範例**：
  ```jsx
  <Exercises>
    <ExerciseItem>1. 試求...</ExerciseItem>
  </Exercises>
  ```

---

## 2. 🌲 Sidebar.jsx (側邊大綱導覽列)

此元件負責網頁左側的大綱樹狀選單渲染。它支援三層導覽：**學科（Course） $\to$ 章（Chapter） $\to$ 節（Section）**（在程式碼變數中對應為 `chapter` $\to$ `topic` $\to$ `subtopic`），並內建搜尋即時過濾與折疊邏輯。

### 核心功能與內部邏輯：

1. **多層級展開/收合狀態**：
   - 透過 `expandedChapters` 狀態管理「學科（Course）」的展開（預設「微積分 `ch1`」與「線性代數 `ch2`」為展開狀態）。
   - 透過 `expandedTopics` 狀態管理「章（Chapter）」的展開。
2. **搜尋與過濾演算法**：
   - 當使用者在搜尋框輸入關鍵字 `searchQuery` 時，系統會遍歷 `chaptersData`，過濾出**標題匹配搜尋詞的「章（Topic）」或「節（Subtopic）」**。
   - 若某節匹配，其所屬的父章與學科會一併被保留在畫面上。
   - 當搜尋框有內容時，系統會**強制展開所有匹配的學科與章**（不論原本是否折疊），方便使用者直接點擊定位。
3. **行動端響應**：
   - 透過 `mobileOpen` 與 `setMobileOpen` 控制在行動裝置下側邊欄的彈出與半透明背景遮罩（backdrop）的顯示。點擊最終葉子節點時，會自動關閉側邊欄。

---

## 3. 📖 MainContent.jsx (講義閱讀器與儀表板)

此元件是講義的右側主視圖。它具備兩種渲染模式（儀表板模式與閱讀器模式），並自動解析層級關係。

### 核心功能與內部邏輯：

1. **Active ID 解析定位**：
   - 每次 `activeTopicId` 改變時，元件會啟動搜尋：
     1. 先在第一層章（Topic）中尋找匹配的 ID。
     2. 若找不到，則進入第二層節（Subtopic）中尋找，尋找到時會將該節設為 `activeTopic`，並將其父章設為 `parentTopic`。
2. **麵包屑導覽系統**：
   - 根據搜尋結果，麵包屑最高可呈現：`大學數學講義庫 / [學科標題] / [章標題] / [節標題]`。
   - 其中 `[學科標題]` 與 `[章標題]`（如果有 `parentTopic` 的話）都是可點擊的，點擊可以直接跳回上一層，提供極佳的導覽體驗。
3. **動態元件載入 (JSX 模式) 與降級支援 (Fallback)**：
   - **JSX 元件載入**：如果 `activeTopic.component` 存在，會將其當作 React 元件直接進行渲染：`<activeTopic.component />`。
   - **降級字串解析**：若沒有 `component`，則執行 `renderMarkdownAndMath(activeTopic.content)`。該函數會將 `content` 字串以換行符切分，並透過正則表達式解析簡易 Markdown 語法（如 `#`、`##`、`- `）以及用 `$` 包裹的數學公式。
4. **首頁目錄索引 (Welcome Dashboard)**：
   - 當 `activeTopicId` 為空時，會渲染首頁。
   - 遍歷整個 `chaptersData`，將每一個學科（如微積分、線性代數）渲染為獨立卡片。卡片內會列出該學科的所有大章節。
   - 若章節底下有 `subtopics` (節)，會自動在卡片內部以縮排虛線列表的精緻小字呈現小節連結，支持在首頁直接點擊跳轉到最終節點。

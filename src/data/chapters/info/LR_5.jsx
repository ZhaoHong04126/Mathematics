export default function LR5() {
  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '8px',
    marginBottom: '8px',
    fontSize: '0.95rem'
  };

  const thStyle = {
    textAlign: 'left',
    padding: '12px 16px',
    borderBottom: '2px solid var(--border-color)',
    color: 'var(--text-primary)',
    fontWeight: '600',
    backgroundColor: 'rgba(255, 255, 255, 0.02)'
  };

  const tdStyle = {
    padding: '16px',
    borderBottom: '1px solid var(--border-color)',
    color: 'var(--text-secondary)',
    verticalAlign: 'top',
    lineHeight: '1.6'
  };

  const dateStyle = {
    fontWeight: '500',
    color: 'var(--accent-secondary)',
    whiteSpace: 'nowrap'
  };

  const milestoneStyle = {
    fontWeight: '600',
    color: 'var(--accent-primary)'
  };

  return (
    <div>
      <p style={{ margin: '14px 0 24px 0', color: 'var(--text-secondary)' }}>
        在這裡記錄您開發與撰寫本微積分電子講義的里程碑與路程記錄。以下是一個預置的表格範本，您可以自行增減欄位與行數！
      </p>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>日期</th>
              <th style={thStyle}>里程碑 / 版本</th>
              <th style={thStyle}>進度與內容說明</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>2026-06-29</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.0 初始化架構</td>
              <td style={tdStyle}>
                - 建置 Vite + React 基礎專案<br />
                - 設計響應式側邊欄<br />
                - 實作三層目錄展開收合與全域搜尋功能
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>2026-06-30</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.1 單元構建</td>
              <td style={tdStyle}>
                - 設計並封裝 `MathBlocks` 學術公式與排版元件庫<br />
                - 實作首頁歡迎儀表板子小節直接跳轉功能
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>2026-07-01</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.2 製作微積分</td>
              <td style={tdStyle}>
                - 第一章完結<br />
                - 設計淺色書籍風格佈局
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>2026-07-02</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.3 製作微積分</td>
              <td style={tdStyle}>
                - 第二章完結<br />
                - 把 [ 1.3反函數 ] 改為 [ 1.3合成函數與反函數 ]
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>2026-07-03</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.4 製作微積分</td>
              <td style={tdStyle}>
                - 製作 3.1 ~ 3.6<br />
                - 編寫第四章內容(預寫)
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>2026-07-04</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.5 側邊欄優化與微積分第三章推進</td>
              <td style={tdStyle}>
                - 優化側邊欄介面（縮減間距與寬度、替換「資訊與資源」專屬圖示）<br />
                - 更新第三章導覽目錄索引，對齊最新章節架構<br />
                - 完成 [ 3.6 反三角函數的導數 ] 內容編製<br />
                - 完成 [ 3.7 對數微分法與高階導數 ] 內容編製
              </td>
            </tr>
            <tr>
              <td style={{ ...tdStyle, ...dateStyle }}>未來規劃</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.6 持續撰寫與優化</td>
              <td style={tdStyle}>
                - 繼續完成後續微積分章節<br />
                - 逐步豐富例題與隨堂練習解答
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

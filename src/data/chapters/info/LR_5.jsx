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
                - 設計深色書籍風格佈局與響應式側邊欄<br />
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
              <td style={{ ...tdStyle, ...dateStyle }}>未來規劃</td>
              <td style={{ ...tdStyle, ...milestoneStyle }}>v0.2 自定義撰寫與內容填充</td>
              <td style={tdStyle}>
                - 開始填充內容<br />
                - 逐步撰寫各單元的練習題與定理推導過程
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

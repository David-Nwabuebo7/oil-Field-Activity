import { useState } from 'react'
import { Download, FileText, Clock } from 'lucide-react'
const reports = () => {
 const [reportRange, setReportRange] = useState<{ from: string; to: string; [key: string]: string }>({ from: "", to: "" })
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>Reports</h1>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>Generate and export production reports</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Date range card */}
        <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><Clock size={14} color="#3b82f6" /> Select Date Range</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {[["From", "from"], ["To", "to"]].map(([label, key]) => (
              <div key={key}>
                <label style={{ color: "#475569", fontSize: 11, display: "block", marginBottom: 6 }}>{label}</label>
                <input type="date" value={reportRange[key]} onChange={e => setReportRange(p => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px", color: "#e2e8f0", fontSize: 12, outline: "none" }} />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Last 7 days", "Last 30 days", "Last 90 days", "YTD"].map(p => (
              <button key={p} style={{ padding: "5px 10px", borderRadius: 8, background: "#0f172a", border: "1px solid #334155", color: "#64748b", fontSize: 11, cursor: "pointer" }}>{p}</button>
            ))}
          </div>
        </div>

        {/* Export options */}
        <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><Download size={14} color="#22c55e" /> Export Options</h2>
          {[
            { label: "Production Report", desc: "Daily/weekly production summary", fmt: "PDF", color: "#ef4444" },
            { label: "Well Status Report", desc: "All wells health summary", fmt: "CSV", color: "#22c55e" },
            { label: "Pressure Analysis", desc: "Pressure gradient data", fmt: "XLSX", color: "#3b82f6" },
            { label: "Flow Rate Log", desc: "Hourly flow rate records", fmt: "CSV", color: "#22c55e" },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #1e3a5f" }}>
              <div>
                <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 500 }}>{r.label}</div>
                <div style={{ color: "#475569", fontSize: 11 }}>{r.desc}</div>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, background: `${r.color}20`, border: `1px solid ${r.color}40`, color: r.color, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                <Download size={10} /> {r.fmt}
              </button>
            </div>
          ))}
        </div>

        {/* Recent reports */}
        <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f", gridColumn: "1 / -1" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 20 }}>Recent Reports</h2>
          {[
            { name: "Production Report - March 2026", date: "Apr 1, 2026", size: "2.4 MB", type: "PDF" },
            { name: "Well Status Report - Q1 2026", date: "Apr 1, 2026", size: "847 KB", type: "CSV" },
            { name: "Pressure Analysis - Mar 2026", date: "Mar 28, 2026", size: "1.1 MB", type: "XLSX" },
            { name: "Production Report - Feb 2026", date: "Mar 1, 2026", size: "2.2 MB", type: "PDF" },
          ].map(r => (
            <div key={r.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #1e3a5f" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: r.type === "PDF" ? "rgba(239,68,68,.15)" : r.type === "CSV" ? "rgba(34,197,94,.15)" : "rgba(59,130,246,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FileText size={14} color={r.type === "PDF" ? "#ef4444" : r.type === "CSV" ? "#22c55e" : "#3b82f6"} />
                </div>
                <div>
                  <div style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ color: "#475569", fontSize: 11 }}>{r.date} · {r.size}</div>
                </div>
              </div>
              <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 8, background: "#0f172a", border: "1px solid #334155", color: "#94a3b8", fontSize: 11, cursor: "pointer" }}>
                <Download size={10} /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default reports

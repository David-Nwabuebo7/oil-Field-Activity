import React from 'react'

const settings = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>Settings</h1>
        <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>System preferences & configuration</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { title: "Data Refresh Rate", desc: "How often live data is fetched", options: ["5s", "10s", "30s", "1m"], selected: "10s" },
          { title: "Pressure Units", desc: "Display units for pressure readings", options: ["psi", "bar", "kPa", "MPa"], selected: "psi" },
          { title: "Flow Rate Units", desc: "Display units for production", options: ["bpd", "bph", "m³/day"], selected: "bpd" },
          { title: "Alert Threshold", desc: "Warning trigger level", options: ["80%", "85%", "90%", "95%"], selected: "90%" },
        ].map(s => (
          <div key={s.title} style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
            <h3 style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{s.title}</h3>
            <p style={{ color: "#475569", fontSize: 11, marginBottom: 14 }}>{s.desc}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {s.options.map(o => (
                <button key={o} style={{ padding: "5px 12px", borderRadius: 8, background: o === s.selected ? "#3b82f6" : "#0f172a", border: `1px solid ${o === s.selected ? "#3b82f6" : "#334155"}`, color: o === s.selected ? "#fff" : "#64748b", fontSize: 11, cursor: "pointer" }}>{o}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default settings
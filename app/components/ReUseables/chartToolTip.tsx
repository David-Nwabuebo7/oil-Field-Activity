// ─── CUSTOM TOOLTIP ───────────────────────────────────────────────────────────

const fmt = (n: number | null | undefined) => n?.toLocaleString() ?? "—";
const ChartTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color?: string }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 10, padding: "10px 14px" }}>
      <p style={{ color: "#94a3b8", fontSize: 11, marginBottom: 4 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>{p.name}: {fmt(p.value)}</p>
      ))}
    </div>
  );
};
export default ChartTooltip

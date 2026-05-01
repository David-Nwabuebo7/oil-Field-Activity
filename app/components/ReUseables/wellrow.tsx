import { Droplets, ChevronRight } from "lucide-react";

interface configProps {
  active: { color: string, bg: string, label: string, dot: string };
  warning: { color: string, bg: string, label: string, dot: string };
  "shut-in": { color: string, bg: string, label: string, dot: string };
}

interface WellRowProps {
  well: { status: string, name: string, pressure: number, flowRate: number, lastUpdated: string };
  onSelect: () => void;
  selected: boolean;
}
const fmt = n => n?.toLocaleString() ?? "—";

const WellRow = ({ well: well, onSelect: onSelect, selected: selected }: WellRowProps) => {

  const statusConfig: configProps = {
    active: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Active", dot: "bg-green-400" },
    warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Warning", dot: "bg-yellow-400" },
    "shut-in": { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Shut-in", dot: "bg-red-400" },
  };
  const cfg = statusConfig[well?.status]; //use to return a particular property of an object using the name

  return (
    <tr onClick={() => onSelect(well)} style={{ borderBottom: "1px solid #1e3a5f", cursor: "pointer", background: selected ? "rgba(59,130,246,.07)" : "transparent", transition: "background .15s" }}
      onMouseEnter={e => !selected && (e.currentTarget.style.background = "rgba(255,255,255,.03)")}
      onMouseLeave={e => !selected && (e.currentTarget.style.background = "transparent")}>
      <td style={{ padding: "13px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #334155" }}>
            <Droplets size={13} color="#3b82f6" />
          </div>
          <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{well?.name}</span>
        </div>
      </td>
      <td style={{ padding: "13px 16px" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, background: cfg?.bg, fontSize: 11, fontWeight: 600, color: cfg?.color }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg?.color, display: "inline-block", animation: well?.status === "active" ? "pulse 2s infinite" : "none" }} />
          {cfg?.label}
        </span>
      </td>
      <td style={{ padding: "13px 16px", color: "#94a3b8", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{fmt(well?.pressure)} <span style={{ color: "#475569", fontSize: 10 }}>psi</span></td>
      <td style={{ padding: "13px 16px", color: "#94a3b8", fontFamily: "'Space Mono', monospace", fontSize: 12 }}>{fmt(well?.flowRate)} <span style={{ color: "#475569", fontSize: 10 }}>bpd</span></td>
      <td style={{ padding: "13px 16px" }}><span style={{ color: "#475569", fontSize: 11 }}>{well?.lastUpdated}</span></td>
      <td style={{ padding: "13px 16px" }}>
        <ChevronRight size={14} color="#3b82f6" />
      </td>
    </tr>
  );
};
export default WellRow
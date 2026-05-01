
import { TrendingUp, TrendingDown } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import Skeleton from "../../skeleton";
interface StatsCardProps {
  title: string;
  value: number | string;
  unit: string;
  trend: "up" | "down";
  trendVal: string;
  icon: React.ElementType;
  color: string;
  sparkData?: { value: number }[];
  loading: boolean;

}

const fmt = n => n?.toLocaleString() ?? "—";
const StatCard = ({ title: title, value: value, unit: unit, trend: trend, trendVal: trendVal, icon: Icon, color: color, sparkData: sparkData, loading: loading }: StatsCardProps) => {
  const positive = trend === "up";
  return (
    <div style={{ background: "#1e293b", borderRadius: 20, padding: "22px 24px", border: "1px solid #1e3a5f", position: "relative", overflow: "hidden", transition: "transform .2s, box-shadow .2s", cursor: "default" }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${color}22`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
      <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon size={18} color={color} />
          </div>
          <span style={{ color: "#64748b", fontSize: 12, fontWeight: 500, letterSpacing: ".5px", textTransform: "uppercase" }}>{title}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 20, background: positive ? "rgba(34,197,94,.12)" : "rgba(239,68,68,.12)" }}>
          {positive ? <TrendingUp size={11} color="#22c55e" /> : <TrendingDown size={11} color="#ef4444" />}
          <span style={{ fontSize: 11, color: positive ? "#22c55e" : "#ef4444", fontWeight: 600 }}>{trendVal}</span>
        </div>
      </div>
      {loading ? <Skeleton h={36} r={6} /> : (
        <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14 }}>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#f1f5f9", fontFamily: "'Space Mono', monospace", letterSpacing: -1 }}>{fmt(value)}</span>
          <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{unit}</span>
        </div>
      )}
      {sparkData && !loading && (
        <ResponsiveContainer width="100%" height={44}>
          <AreaChart data={sparkData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs><linearGradient id={`sg-${title}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={color} stopOpacity={0.3} /><stop offset="95%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
            <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} fill={`url(#sg-${title})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default StatCard
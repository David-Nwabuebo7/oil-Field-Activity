import React from 'react'
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, AreaChart, Area } from 'recharts';
import ChartTooltip from '../chartToolTip';
interface AnalyticsProps {
  wellsData: object[];
  pressureDepthData: object[];
}
const Analytics = ({ wellsData, pressureDepthData }: AnalyticsProps) => {
  const fmt = (n: number | null | undefined) => n?.toLocaleString() ?? "—";
  return (
    <div>
      <div>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>Analytics</h1>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>Field-wide performance metrics</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
          {/* Production by well bar chart */}
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Production by Well</h2>
            <p style={{ color: "#475569", fontSize: 11, marginBottom: 18 }}>Current flow rate (bpd)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={wellsData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="flowRate" name="Flow Rate" fill="#3b82f6" radius={[6, 6, 0, 0]}
                  label={false}
                  isAnimationActive={true}>
                  {wellsData?.map((w, i) => (
                  <rect key={i} fill={(w as { status: string })?.status === "active" ? "#3b82f6" : (w as { status: string })?.status === "warning" ? "#f59e0b" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pressure by well */}
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Pressure by Well</h2>
            <p style={{ color: "#475569", fontSize: 11, marginBottom: 18 }}>Current reservoir pressure (psi)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={wellsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} width={50} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="pressure" name="Pressure" fill="#f59e0b" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Full pressure-depth with gradient */}
          <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f", gridColumn: "1 / -1" }}>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>Pressure Gradient Profile</h2>
            <p style={{ color: "#475569", fontSize: 11, marginBottom: 18 }}>Hydrostatic pressure vs. depth · typical reservoir profile</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={pressureDepthData}>
                <defs><linearGradient id="depthGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={.4} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                <XAxis dataKey="depth" name="Depth" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}ft`} />
                <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `${v}psi`} />
                <Tooltip content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const d = payload[0]?.payload;
                  return <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px" }}>
                    <p style={{ color: "#64748b", fontSize: 10 }}>Depth: {fmt(d?.depth)} ft</p>
                    <p style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600 }}>{fmt(d?.pressure)} psi</p>
                  </div>;
                }} />
                <Area type="monotone" dataKey="pressure" name="Pressure" stroke="#f59e0b" strokeWidth={2.5} fill="url(#depthGrad)" dot={{ r: 3, fill: "#f59e0b" }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics

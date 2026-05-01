import {useState , useRef} from 'react'
import Skeleton from './skeleton';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";

import ChartTooltip from './chartToolTip'

const fmt = n => n?.toLocaleString() ?? "—";

 interface ChartRowProps {
    loading: boolean;
    pressureDepthData:object[];
 }
const chartsRow = ({loading:loading , pressureDepthData:pressureDepthData}:ChartRowProps) => {






  const [timeRange, setTimeRange] = useState("daily");


  const generateProductionData = (days = 30) => {
    const data = [];
    let base = 2400;
    for (let i = days; i >= 0; i--) {
      const d = new Date(); 
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      base += (Math.random() - 0.45) * 120;
      base = Math.max(1800, Math.min(3200, base));
      data.push({ label, production: Math.round(base), target: 2600 });
    }
    return data;
  };

  const generateWeeklyData = () => {
    const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7", "Wk 8"];
    return weeks.map(w => ({ label: w, production: 2200 + Math.round(Math.random() * 800), target: 2600 }));
  };

  const generateMonthlyData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months.map(m => ({ label: m, production: 68000 + Math.round(Math.random() * 20000), target: 78000 }));
  };

  const prodDaily = useRef(generateProductionData(30)).current;
  const prodWeekly = useRef(generateWeeklyData()).current;
  const prodMonthly = useRef(generateMonthlyData()).current;
  const prodData = timeRange === "daily" ? prodDaily : timeRange === "weekly" ? prodWeekly : prodMonthly;





  return (
<div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
   
                   {/* Production chart */}
                   <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                       <div>
                         <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>Production Output</h2>
                         <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>bbl/day vs. target</p>
                       </div>
                       <div style={{ display: "flex", gap: 4 }}>
                         {["daily","weekly","monthly"].map(r => (
                           <button key={r} onClick={()=>setTimeRange(r)} style={{ padding: "5px 12px", borderRadius: 8, background: timeRange === r ? "#3b82f6" : "#0f172a", border: `1px solid ${timeRange === r ? "#3b82f6" : "#334155"}`, color: timeRange === r ? "#fff" : "#64748b", fontSize: 11, fontWeight: 500, cursor: "pointer", textTransform: "capitalize" }}>{r}</button>
                         ))}
                       </div>
                     </div>
                     {loading ? <Skeleton h={220} r={12} /> : (
                       <ResponsiveContainer width="100%" height={220}>
                         <AreaChart data={prodData}>
                           <defs>
                             <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={.35}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
                             <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={.15}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                           <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                           <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} width={50} />
                           <Tooltip content={<ChartTooltip />} />
                           <Legend wrapperStyle={{ fontSize: 11, color: "#64748b" }} />
                           <Area type="monotone" dataKey="target" name="Target" stroke="#22c55e" strokeDasharray="4 4" strokeWidth={1.5} fill="url(#tgtGrad)" dot={false} />
                           <Area type="monotone" dataKey="production" name="Production" stroke="#3b82f6" strokeWidth={2} fill="url(#prodGrad)" dot={false} />
                         </AreaChart>
                       </ResponsiveContainer>
                     )}
                   </div>
   
                   {/* Pressure vs Depth */}
                   <div style={{ background: "#1e293b", borderRadius: 20, padding: 24, border: "1px solid #1e3a5f" }}>
                     <div style={{ marginBottom: 20 }}>
                       <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>Pressure vs Depth</h2>
                       <p style={{ color: "#475569", fontSize: 11, marginTop: 2 }}>psi gradient profile</p>
                     </div>
                     {loading ? <Skeleton h={220} r={12} /> : (
                       <ResponsiveContainer width="100%" height={220}>
                         <LineChart data={pressureDepthData} layout="vertical">
                           <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
                           <XAxis type="number" dataKey="pressure" name="Pressure (psi)" tick={{ fill: "#475569", fontSize: 9 }} axisLine={false} tickLine={false} />
                           <YAxis type="number" dataKey="depth" name="Depth (ft)" reversed tick={{ fill: "#475569", fontSize: 9 }} axisLine={false} tickLine={false} width={46} tickFormatter={v => `${v/1000}k`} />
                           <Tooltip content={({ active, payload }) => {
                             if (!active || !payload?.length) return null;
                             const d = payload[0]?.payload;
                             return <div style={{ background: "#0f172a", border: "1px solid #334155", borderRadius: 8, padding: "8px 12px" }}>
                               <p style={{ color: "#64748b", fontSize: 10 }}>Depth: {fmt(d?.depth)} ft</p>
                               <p style={{ color: "#f59e0b", fontSize: 12, fontWeight: 600 }}>Pressure: {fmt(d?.pressure)} psi</p>
                             </div>;
                           }} />
                           <Line type="monotone" dataKey="pressure" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2, fill: "#f59e0b" }} />
                         </LineChart>
                       </ResponsiveContainer>
                     )}
                   </div>
                 </div>
  )
}

export default chartsRow
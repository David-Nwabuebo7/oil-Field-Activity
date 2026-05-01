import {useEffect, useState
} from 'react'
import { AreaChart, Area, XAxis, YAxis,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { Activity , Gauge,Play, Square, SlidersHorizontal, MapPin, Ruler, Layers, X} from "lucide-react";
import ChartTooltip from './chartToolTip';

interface configProps{
    active :{color:string , bg: string , label:string , dot: string};
    warning :{color:string , bg: string , label:string , dot: string};
    "shut-in":{color:string , bg: string , label:string , dot: string};
}

interface Panelprops{
    well:{ status:string , name:string , pressure:number , flowRate:number , lastUpdated:string , location:string , depth:number| string, type:string};
    onClosed: ()=> void;
    
   
}
const fmt = (n: number | null | undefined)=> n?.toLocaleString() ?? "—";



const WellPanel = ({ well, onClosed }:Panelprops) => {


    const generateWellTimeSeries = (base:number, variance:number, points = 48) => {
  const data = []; let v = base;
  for (let i = points; i >= 0; i--) {
    const d = new Date(); d.setHours(d.getHours() - i);
    v += (Math.random() - 0.5) * variance;
    v = Math.max(base * 0.7, Math.min(base * 1.3, v));
    data.push({ time: d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }), value: Math.round(v) });
  }
  return data;
};
const statusConfig:configProps = {
  active:  { color: "#22c55e", bg: "rgba(34,197,94,0.12)",  label: "Active",  dot: "bg-green-400" },
  warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Warning", dot: "bg-yellow-400" },
  "shut-in":{ color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Shut-in", dot: "bg-red-400" },
};

const [pressureSeries, setPressureSeries] = useState([]);
const [flowSeries, setFlowSeries] = useState([]);
const [flowVal, setFlowVal] = useState(well?.flowRate);

useEffect(() => {
  if (!well) return;

  setPressureSeries(generateWellTimeSeries(well?.pressure, 80));
  setFlowSeries(generateWellTimeSeries(well?.flowRate || 0,30));
  setFlowVal(well?.flowRate)
}, [well]);


  const [running, setRunning] = useState(well?.status !== "shut-in");
  const cfg = statusConfig[well?.status];


  const every8Pressure = Array.isArray(pressureSeries) ? pressureSeries?.filter((_, i) => i % 8  === 0):[];
 const every8Flowrate = flowSeries?.length ? flowSeries?.filter((_,i)=> i % 3 === 0 ):[];

 



  return (
    <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, width: 480, background: "#0d1929", borderLeft: "1px solid #1e3a5f", zIndex: 100, overflowY: "auto", animation: "slideIn .25s ease" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #1e3a5f", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#0d1929", zIndex: 10 }}>
        <div>
          <div style={{ color: "#64748b", fontSize: 11, marginBottom: 3, letterSpacing: 1, textTransform: "uppercase" }}>Well Details</div>
          <div style={{ color: "#f1f5f9", fontSize: 18, fontWeight: 700 }}>{well?.name}</div>
        </div>
        <button onClick={onClosed} style={{ width: 32, height: 32, borderRadius: 8, background: "#1e293b", border: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <X size={14} color="#94a3b8" />
        </button>
      </div>
      <div style={{ padding: 24 }}>
        {/* Info grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[
            { label: "Location", value: well?.location, icon: MapPin },
            { label: "Depth",    value: `${fmt(well?.depth)} ft`, icon: Ruler },
            { label: "Type",     value: well?.type, icon: Layers },
            { label: "Status",   value: cfg?.label, icon: Activity, color: cfg?.color },
          ].map(({ label, value, icon: Ic, color }) => (
            <div key={label} style={{ background: "#1e293b", borderRadius: 12, padding: "14px 16px", border: "1px solid #1e3a5f" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <Ic size={12} color={color || "#3b82f6"} />
                <span style={{ color: "#475569", fontSize: 11, textTransform: "uppercase", letterSpacing: .5 }}>{label}</span>
              </div>
              <span style={{ color: color || "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Pressure chart */}
        <div style={{ background: "#1e293b", borderRadius: 14, padding: 18, border: "1px solid #1e3a5f", marginBottom: 16 }}>
          <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <Gauge size={13} color="#3b82f6" /> Pressure (psi) — Last 48h
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={every8Pressure}>
              <defs><linearGradient id="pd-press" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={.3}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="time" tick={{ fill: "#475569", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 9 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<ChartTooltip />} />
              <Area type="monotone" dataKey="value" name="Pressure" stroke="#3b82f6" strokeWidth={1.5} fill="url(#pd-press)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Flow chart */}
        <div style={{ background: "#1e293b", borderRadius: 14, padding: 18, border: "1px solid #1e3a5f", marginBottom: 24 }}>
          <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 14, display: "flex", alignItems: "center", gap: 6 }}>
            <Activity size={13} color="#22c55e" /> Flow Rate (bpd) — Last 48h
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <AreaChart data={every8Flowrate}>
              <defs><linearGradient id="pd-flow" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="time" tick={{ fill: "#475569", fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 9 }} axisLine={false} tickLine={false} width={40} />
              <Tooltip content={<ChartTooltip active={well?.status}  payload={well}/>} />
              <Area type="monotone" dataKey="value" name="Flow Rate" stroke="#22c55e" strokeWidth={1.5} fill="url(#pd-flow)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Controls */}
        <div style={{ background: "#1e293b", borderRadius: 14, padding: 20, border: "1px solid #1e3a5f" }}>
          <div style={{ color: "#94a3b8", fontSize: 12, fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
            <SlidersHorizontal size={13} color="#f59e0b" /> Well Controls
          </div>
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <button onClick={() => setRunning(true)} style={{ flex: 1, padding: "10px", borderRadius: 10, background: running ? "#22c55e" : "#1e3a5f", border: "none", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .2s" }}>
              <Play size={13} /> Start
            </button>
            <button onClick={() => setRunning(false)} style={{ flex: 1, padding: "10px", borderRadius: 10, background: !running ? "#ef4444" : "#1e3a5f", border: "none", color: "#fff", fontWeight: 600, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all .2s" }}>
              <Square size={13} /> Stop
            </button>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ color: "#64748b", fontSize: 11 }}>Flow Rate Adjustment</span>
              <span style={{ color: "#3b82f6", fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 600 }}>{flowVal} bpd</span>
            </div>
            <input type="range" min={0} max={1000} value={flowVal} disabled={!running} onChange={(e)=>setFlowVal(+e.target.value)}
              style={{ width: "100%", accentColor: "#3b82f6", cursor: "pointer" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
              <span style={{ color: "#334155", fontSize: 10 }}>0 bpd</span>
              <span style={{ color: "#334155", fontSize: 10 }}>1000 bpd</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellPanel

import { useRef, useState } from 'react'
import { RefreshCw } from 'lucide-react'
import { Zap, Droplets, Gauge, Activity, Filter, ChevronRight } from 'lucide-react'
import StatCard from './StatsCard'
import ChartsRow from "../../chartsRow";
import Skeleton from '../../skeleton'
import WellRow from '../../wellrow';
import WellPanel from '../../wellpanel';
interface DashboardProps {
  loading: boolean;
  liveStats: { production: number; activeWells: number; avgPressure: number; avgFlow: number };
  Search: string;
  UpdatePage: () => void;
}

interface DepthProps {
  depth: number;
  pressure: number;
}


const dashboard = ({ loading: loading, liveStats: liveStats, Search: Search, UpdatePage: UpdatePage }: DashboardProps) => {

  // Production spark data per stat
  const sparkProduction = useRef(Array.from({ length: 20 }, (_, i) => ({ value: 2400 + Math.random() * 600 }))).current;
  const sparkPressure = useRef(Array.from({ length: 20 }, (_, i) => ({ value: 3000 + Math.random() * 600 }))).current;
  const sparkFlow = useRef(Array.from({ length: 20 }, (_, i) => ({ value: 350 + Math.random() * 150 }))).current;
  const sparkWells = useRef(Array.from({ length: 20 }, (_, i) => ({ value: 4 + Math.round(Math.random() * 2) }))).current;




  const wellsData = [
    { id: "W-01", name: "Well-01", location: "Block A-7", depth: 12400, type: "Oil", status: "active", pressure: 3200, flowRate: 500, lastUpdated: "2 mins ago", lat: 29.7, lng: -95.3 },
    { id: "W-02", name: "Well-02", location: "Block B-3", depth: 10800, type: "Gas", status: "active", pressure: 4100, flowRate: 380, lastUpdated: "5 mins ago", lat: 29.8, lng: -95.1 },
    { id: "W-03", name: "Well-03", location: "Block A-2", depth: 9600, type: "Oil", status: "warning", pressure: 2750, flowRate: 210, lastUpdated: "12 mins ago", lat: 29.6, lng: -95.4 },
    { id: "W-04", name: "Well-04", location: "Block C-1", depth: 14200, type: "Oil", status: "active", pressure: 3850, flowRate: 620, lastUpdated: "1 min ago", lat: 29.9, lng: -95.2 },
    { id: "W-05", name: "Well-05", location: "Block B-9", depth: 11100, type: "Gas", status: "shut-in", pressure: 1200, flowRate: 0, lastUpdated: "2 hrs ago", lat: 29.5, lng: -95.0 },
    { id: "W-06", name: "Well-06", location: "Block D-4", depth: 13300, type: "Oil", status: "active", pressure: 3600, flowRate: 445, lastUpdated: "3 mins ago", lat: 30.0, lng: -95.5 },
    { id: "W-07", name: "Well-07", location: "Block A-11", depth: 8900, type: "Gas", status: "warning", pressure: 2100, flowRate: 155, lastUpdated: "18 mins ago", lat: 29.7, lng: -94.9 },
    { id: "W-08", name: "Well-08", location: "Block C-6", depth: 15600, type: "Oil", status: "active", pressure: 4400, flowRate: 710, lastUpdated: "1 min ago", lat: 30.1, lng: -95.3 },
  ];
  const [selectedWell, setSelectedWell] = useState<object | null>(null);

  const filteredWells = wellsData.filter(w =>
    w.name.toLowerCase().includes(Search?.toLowerCase()) ||
    w.location.toLowerCase().includes(Search?.toLowerCase())
  );


  const pressureDepthData: DepthProps[] = [
    { depth: 0, pressure: 14.7 },
    { depth: 1000, pressure: 450 },
    { depth: 2000, pressure: 890 },
    { depth: 3000, pressure: 1340 },
    { depth: 4000, pressure: 1820 },
    { depth: 5000, pressure: 2290 },
    { depth: 6000, pressure: 2780 },
    { depth: 7000, pressure: 3150 },
    { depth: 8000, pressure: 3480 },
    { depth: 9000, pressure: 3820 },
    { depth: 10000, pressure: 4150 },
    { depth: 11000, pressure: 4390 },
    { depth: 12000, pressure: 4620 },
    { depth: 13000, pressure: 4800 },
  ];




  return (
    <div >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }} >
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>Field Overview</h1>
          <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>Last updated: just now · April 17, 2026</p>
        </div>
        {/** add a function to refresh the whole page */}
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 10, background: "#1e293b", border: "1px solid #1e3a5f", color: "#94a3b8", fontSize: 12, cursor: "pointer" }} onClick={() => console.log('Reload')}>
          <RefreshCw size={12} /> Refresh
        </button>
      </div>
      {/* Stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <StatCard loading={loading} title="Total Production" value={liveStats?.production} unit="bbl/day" trend="up" trendVal="+5.2%" icon={Zap} color="#3b82f6" sparkData={sparkProduction} />
<StatCard loading={loading} title="Active Wells" value={liveStats?.activeWells} unit="wells" trend="up" trendVal="+1" icon={Droplets} color="#22c55e" sparkData={sparkWells} />
<StatCard loading={loading} title="Avg Pressure" value={liveStats?.avgPressure} unit="psi" trend="down" trendVal="-1.8%" icon={Gauge} color="#f59e0b" sparkData={sparkPressure} />
<StatCard loading={loading} title="Avg Flow Rate" value={liveStats?.avgFlow} unit="bpd" trend="up" trendVal="+3.1%" icon={Activity} color="#a855f7" sparkData={sparkFlow} />
      </div>
      <ChartsRow pressureDepthData={pressureDepthData} loading={loading} />

      <div style={{ background: "#1e293b", borderRadius: 20, border: "1px solid #1e3a5f", overflow: "hidden" }}>
        <div style={{ padding: "18px 24px", borderBottom: "1px solid #1e3a5f", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>Well Status</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, background: "#0f172a", border: "1px solid #334155", color: "#64748b", fontSize: 11, cursor: "pointer" }}><Filter size={10} /> Filter</button>
            <button onClick={UpdatePage} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 10px", borderRadius: 8, background: "#3b82f6", border: "none", color: "#fff", fontSize: 11, cursor: "pointer" }}>View All <ChevronRight size={10} /></button>
          </div>
        </div>
        {loading ? (
          <div style={{ padding: 24 }}>{[0, 1, 2, 3].map(i => <div key={i} style={{ marginBottom: 12 }}><Skeleton h={40} r={8} /></div>)}</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                {["Well", "Status", "Pressure", "Flow Rate", "Updated", ""].map(h => (
                  <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 10, color: "#475569", fontWeight: 600, letterSpacing: .5, textTransform: "uppercase" }}>{h}</th>
                ))}
              </tr></thead>
              <tbody>
                {filteredWells?.slice(0, 6).map(w => (
                  <WellRow key={w?.id} well={w} onSelect={()=>setSelectedWell(w)} selected={selectedWell?.id === w?.id} />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedWell && <WellPanel well={selectedWell} onClosed={() => setSelectedWell(null)} />}
      </div>

    </div>
  )
}

export default dashboard

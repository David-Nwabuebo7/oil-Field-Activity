import { useState } from 'react'
import WellRow from '../wellrow';
import WellPanel from '../wellpanel';

interface WellPageprop {
    Search: string
}

const WellPage = ({ Search }: WellPageprop) => {
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
    const [selectedWell, setSelectedWell] = useState(null);

    const filteredWells = wellsData.filter(w =>
        w.name.toLowerCase().includes(Search.toLowerCase()) ||
        w.location.toLowerCase().includes(Search.toLowerCase())
    );
    const statusConfig = {
        active: { color: "#22c55e", bg: "rgba(34,197,94,0.12)", label: "Active", dot: "bg-green-400" },
        warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", label: "Warning", dot: "bg-yellow-400" },
        "shut-in": { color: "#ef4444", bg: "rgba(239,68,68,0.12)", label: "Shut-in", dot: "bg-red-400" },
    };

    return (
        <div>
            <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>Wells</h1>
                <p style={{ color: "#475569", fontSize: 12, marginTop: 2 }}>All {wellsData?.length} registered wells · click a row for details</p>
            </div>
            {/* Status summary pills */}
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                {Object.entries(statusConfig).map(([k, v]) => {
                    const count = wellsData?.filter(w => w.status === k).length;
                    return <div key={k} style={{ padding: "6px 14px", borderRadius: 20, background: v?.bg, border: `1px solid ${v?.color}33`, fontSize: 12, color: v?.color, fontWeight: 600 }}>{v?.label}: {count}</div>;
                })}
            </div>
            <div style={{ background: "#1e293b", borderRadius: 20, border: "1px solid #1e3a5f", overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead><tr style={{ borderBottom: "1px solid #1e3a5f" }}>
                            {["Well", "Status", "Pressure", "Flow Rate", "Updated", ""].map(h => (
                                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 10, color: "#475569", fontWeight: 600, letterSpacing: .5, textTransform: "uppercase" }}>{h}</th>
                            ))}
                        </tr></thead>
                        <tbody>
                            {filteredWells.map(w => (
                               <WellRow key={w.id} well={w} onSelect={() => setSelectedWell(w)} selected={selectedWell?.id === w.id} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {selectedWell && <WellPanel well={selectedWell} onClosed={() => setSelectedWell(null)} />}
            </div>



        </div>
    )
}

export default WellPage

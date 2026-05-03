
import {
  Bell, Search, Activity, AlertTriangle, XCircle, 
} from "lucide-react";


interface NavBarProps{
    search:string | undefined;
    sidebarOpen:boolean;
   Notifications: {
    id: number;
    type: string;
    msg: string;
    time: string;
  }[];
    notifOpen:boolean;
    unread:number;
    toggleNotifOpen: ()=> void;
    InputVal: (e: React.ChangeEvent<HTMLInputElement>) => void
}


const navBar = ({search:search , sidebarOpen:sidebarOpen , Notifications:notifications , notifOpen:notifOpen , unread:unread , toggleNotifOpen:NotifOpen , InputVal:InputVal}:NavBarProps) => {


  return (
    <div>
         {/* ── NAVBAR ── */}
                <header style={{ height: 60, background: "#0d1929", borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", padding: "0 24px", gap: 16, flexShrink: 0 }}>
                  <div style={{ flex: 1, position: "relative" }}>
                    <Search size={14} color="#475569" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
                    <input value={search} onChange={InputVal} placeholder="Search wells, locations…"
                      style={{ width: "100%", maxWidth: 340, background: "#1e293b", border: "1px solid #1e3a5f", borderRadius: 10, padding: "8px 12px 8px 34px", color: "#e2e8f0", fontSize: 12, outline: "none" }} />
                  </div>
        
                  {/* Live indicator */}
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 10px", borderRadius: 20, background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.2)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse 2s infinite", display: "inline-block" }} />
                    <span style={{ fontSize: 10, color: "#22c55e", fontWeight: 600, letterSpacing: .5 }}>LIVE</span>
                  </div>
        
                  {/* Notifications */}
                  <div style={{ position: "relative" } } >
                    <button onClick={NotifOpen}  style={{ width: 36, height: 36, borderRadius: 10, background: "#1e293b", border: "1px solid #1e3a5f", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
                      <Bell size={15} color="#94a3b8" />
                      <span style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#ef4444", fontSize: 9, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{unread}</span>
                    </button>
                    {notifOpen && (
                      <div style={{ position: "absolute", top: 44, right: 0, width: 280, background: "#1e293b", border: "1px solid #334155", borderRadius: 14, zIndex: 200, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}>
                        <div style={{ padding: "12px 16px", borderBottom: "1px solid #334155", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 13 }}>Notifications</span>
                          <span style={{ color: "#475569", fontSize: 10, cursor: "pointer" }}>Mark all read</span>
                        </div>
                        {notifications?.map(n => (
                          <div key={n?.id} style={{ padding: "12px 16px", borderBottom: "1px solid #1e293b", display: "flex", gap: 10, alignItems: "flex-start" , cursor:'pointer' }}>
                            <div style={{ marginTop: 2  , cursor : 'pointer'}}>
                              {n?.type === "warning" && <AlertTriangle size={13} color="#f59e0b" />}
                              {n?.type === "danger"  && <XCircle size={13} color="#ef4444" />}
                              {n?.type === "info"    && <Bell size={13} color="#3b82f6" />}
                              {n?.type === "success" && <Activity size={13} color="#22c55e" />}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ color: "#cbd5e1", fontSize: 12 }}>{n.msg}</div>
                              <div style={{ color: "#475569", fontSize: 10, marginTop: 2 }}>{n.time} ago</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
    
                  {/* Avatar */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#3b82f6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#fff" }}>JE</div>
                    {sidebarOpen && <div style={{ lineHeight: 1.2 }}><div style={{ fontSize: 12, fontWeight: 600, color: "#e2e8f0" }}>J. Engineer</div><div style={{ fontSize: 10, color: "#475569" }}>Senior PE</div></div>}
                  </div>
                </header>
    </div>
  )
}

export default navBar

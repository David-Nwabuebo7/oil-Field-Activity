
import { Droplets } from 'lucide-react'

interface LogoProps {
  sidebarOpen: boolean;
}
const logo = ( {sidebarOpen:sidebarOpen}:LogoProps)=> {

  return (
   <div style={{ width: sidebarOpen ? 220 : 64, background: "#0d1929", borderRight: "1px solid #1e3a5f", display: "flex", flexDirection: "column", transition: "width .25s ease", flexShrink: 0, zIndex: 50 }}>
        {/* Logo */}
        <div style={{ padding: "20px 16px", borderBottom: "1px solid #1e3a5f", display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
          <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#3b82f6,#1d4ed8)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Droplets size={16} color="#fff" />
          </div>
          {sidebarOpen && <div><div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 14, letterSpacing: -.2 }}>PetroDash</div><div style={{ color: "#475569", fontSize: 10 }}>Field Monitor</div></div>}
        </div>
    </div>
  )
}

export default logo

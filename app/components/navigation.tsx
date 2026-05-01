
import { ChevronLeft , Menu } from 'lucide-react'

 interface NavigationProps {
  sidebarOpen: boolean;
  onClick: () => void;
 }
const navigation = ({sidebarOpen:sidebarOpen , onClick:onClick}:NavigationProps) => {
  return (
        <div style={{ padding: "12px 8px", borderTop: "1px solid #1e3a5f" }} className='flex items-center-safe' onClick={onClick}>
          <button  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: sidebarOpen ? "flex-end" : "center", gap: 8, padding: "8px 10px", borderRadius: 10, background: "transparent", border: "none", cursor: "pointer" }}>
          {sidebarOpen ? <ChevronLeft size={14} color="#475569" /> : <Menu size={14} color="#475569" />}
            {sidebarOpen && <span style={{ fontSize: 11, color: "#475569" }} >Collapse</span>}
          </button>
        </div>
  
  )
}

export default navigation

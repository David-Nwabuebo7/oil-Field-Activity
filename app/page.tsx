'use client';
import React ,{ useState, useEffect  } from "react";
import { LayoutDashboard, Droplets, BarChart3, FileText, Settings } from 'lucide-react'
import Logo from './components/logo'
import ReUseable from './components/ReUseables/ReUseable'
import MenuBar from './components/navigation'
import NavBar from "./components/navBar";
import Dashboard from "./components/ReUseables/pages/dashboard/dashboard";
import Analytics from "./components/ReUseables/pages/Analytics";
import Reports from "./components/ReUseables/pages/reports";
import WellPage from "./components/ReUseables/pages/WellPage";
import Setting from "./components/ReUseables/pages/settings";
export default function Home() {


  interface NavItem {
    Id: number;
    Tittle: string;
    Icon: React.ElementType;
    State: boolean;
  }

  interface NotifProps {
    id: number;
    type: string;
    msg: string;
    time: string;
  }

  const [Pages, setPages] = useState('Dashboard');

  const [activeId, setActiveId] = useState(1); // default Dashboard
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifOpen, setNotifOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [liveStats, setLiveStats] = useState({ production: 2847, activeWells: 5, avgPressure: 3268, avgFlow: 402 });


  // this is the right way to do it instead of making Icon:<LayoutDashboard/>  it better to use the imported libarary as a normal object value not ass an jsx.element
  const NavObj: NavItem[] = [
    { Icon: LayoutDashboard, Tittle: 'Dashboard', Id: 1, State: true },
    { Icon: Droplets, Tittle: 'Wells', Id: 2, State: false },
    { Icon: BarChart3, Tittle: 'Analytics', Id: 3, State: false },
    { Icon: FileText, Tittle: 'Reports', Id: 4, State: false },
    { Icon: Settings, Tittle: 'settings', Id: 5, State: false },

  ]
  // controls the specific data on the notifications object that is active
  function Show(id: number, title: string) {
    setPages(title)
    setActiveId(id);

    console.log(Pages)
  }
  // notification data
  const notifications: NotifProps[] = [
    { id: 1, type: "warning", msg: "Well-03 pressure below threshold", time: "12m" },
    { id: 2, type: "danger", msg: "Well-07 flow rate dropping rapidly", time: "18m" },
    { id: 3, type: "info", msg: "Well-08 maintenance scheduled", time: "1h" },
    { id: 4, type: "success", msg: "Well-04 production target met", time: "2h" },
  ];
  const NavList = NavObj?.map((items) => {

    const { Icon, Tittle, Id } = items
    // better way to do it
    const IconComponent = Icon;


    return <ReUseable
      show={() => Show(Id, Tittle)}
      icon={<IconComponent
        size={16}
        color={activeId === Id ? "#93c5fd" : "#64748b"}
      />}
      tittle={Tittle}
      key={Id}
      active={activeId === Id}
      sidebarOpen={sidebarOpen}

    />

  })
  // search function
  function ManSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)


  }


  // Fake loading
  // what this does as tthe page loads the first it waits for 1400ms before making loading false
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1400); return () => clearTimeout(t); }, []);

  // Fake real-time updates
  useEffect(() => {
    const iv = setInterval(() => {
      setLiveStats(prev => ({
        production: Math.max(2200, Math.min(3400, prev.production + Math.round((Math.random() - 0.5) * 60))),
        activeWells: prev.activeWells,
        avgPressure: Math.max(2800, Math.min(3800, prev.avgPressure + Math.round((Math.random() - 0.5) * 30))),
        avgFlow: Math.max(300, Math.min(550, prev.avgFlow + Math.round((Math.random() - 0.5) * 15))),
      }));
    }, 3000);
    return () => clearInterval(iv);
  }, []);



  const pressureDepthData = [
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

const pageMap: Record<string, React.ReactElement>  = {
    Dashboard: <Dashboard loading={loading} liveStats={liveStats} Search={search} UpdatePage={() => setPages('Wells')} />,
    Wells: <WellPage Search={search} />,
    Analytics: <Analytics wellsData={wellsData} pressureDepthData={pressureDepthData} />,
    Reports: <Reports />,
    settings: <Setting />,
  };
  const currentpage = pageMap[Pages];












  return (
    <div>
      <div className="flex min-h-screen h-screen  bg-[#0a1628]  text-[#e2e8f0]  justify-center   ">
        <aside className='flex flex-col h-screen  left-0 ' style={{ width: sidebarOpen ? 220 : 64, background: "#0d1929", borderRight: "1px solid #1e3a5f", display: "flex", flexDirection: "column", transition: "width .25s ease", flexShrink: 0, zIndex: 50 }}>
          <div >
            <Logo sidebarOpen={sidebarOpen} />
          </div>
          <div className='flex flex-col  justify-center'>
            {NavList}
          </div>
          <div className=" mt-auto">
            <MenuBar onClick={() => setSidebarOpen((prev) => !prev)} sidebarOpen={sidebarOpen} />
          </div>

        </aside>
        <div className="flex-1 flex-col  " style={{ overflowY: 'hidden' }} >
          <div className="">

            <NavBar Notifications={notifications} toggleNotifOpen={() => setNotifOpen((prev) => !prev)} notifOpen={notifOpen} unread={notifications?.length} InputVal={ManSearch} search={search} sidebarOpen={sidebarOpen} />
          </div>

          {notifOpen && <div onClick={() => setNotifOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 100 }} />}
          <main className="h-[90vh]" style={{ flex: 1, overflowY: 'scroll', padding: "24px", animation: "fadeUp .35s ease" }} >

            {currentpage}
          </main>

        </div>

      </div>
    </div>

  );
}

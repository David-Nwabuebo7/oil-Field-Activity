import React from 'react'

interface ReUseableProps {
  icon: React.ElementType | React.ReactNode;
  tittle: string;
  show: () => void;
  active: boolean;
  sidebarOpen: boolean;
}

const ReUseable = ({icon:icon , tittle: tittle , show:show  , active:active ,sidebarOpen:sidebarOpen}:ReUseableProps) => {
  return (
    <nav onClick={show} className="flex p-2 hover:text-blue-200">
  <button
    className={`flex items-center gap-2 w-full p-2 rounded-lg transition
      hover:bg-blue-500/25 
      ${active ? "bg-blue-500/15 border border-blue-500/25 " : ""}`}
  >
    <div className="shrink-0 hover: focus:text-blue-200">
      {icon && React.cloneElement(icon, {
        size: 16,
        color: active ? "#93c5fd" : "#64748b",
      })}
    </div>

    {sidebarOpen && (
      <span
        className={`text-sm font-medium hover:text-blue-200 ${
          active ? "text-blue-300" : "text-gray-500"
        }`}
      >
        {tittle}
      </span>
    )}

    {active && sidebarOpen && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 hover:text-blue-200"  />
    )}
  </button>
</nav>
  )
}

export default ReUseable

 

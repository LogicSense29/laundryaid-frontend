import { LayoutDashboard, ShoppingBag, Store, Settings } from "lucide-react";

export default function AdminTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={18} /> },
    { id: "bookings", label: "Bookings", icon: <ShoppingBag size={18} /> },
    { id: "vendors", label: "Vendors", icon: <Store size={18} /> },
    { id: "settings", label: "Settings", icon: <Settings size={18} /> },
  ];

  return (
    <div className="flex overflow-x-auto no-scrollbar justify-center gap-2 mb-8 bg-gray-100 p-1.5 rounded-2xl w-fit mx-auto shadow-inner">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 ${
            activeTab === tab.id
              ? "bg-[#c85f0b] text-white shadow-lg transform scale-105"
              : "text-gray-500 hover:text-gray-800 hover:bg-white/50"
          }`}
        >
          {tab.icon}
          <span className="hidden lg:block whitespace-nowrap">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

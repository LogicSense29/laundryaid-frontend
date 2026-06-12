import { 
  ShoppingBag, 
  Users, 
  Banknote, 
  TrendingUp, 
  Store 
} from "lucide-react";

export default function OverviewPanel({ bookings, vendors = [] }) {
  const totalBookings = bookings.length;
  const revenue = bookings.reduce((sum, b) => {
    const pkg = (b.package || b.service || "").toLowerCase();
    const prices = { "wash & fold": 6000, deluxe: 10000, premium: 25000 };
    return sum + (prices[pkg] || 0);
  }, 0);
  const totalUsers = new Set(bookings.map((b) => b.name)).size;
  const pendingVendors = vendors.filter(v => v.status === 'pending').length;

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: <ShoppingBag className="text-blue-600" size={24} />,
      bgColor: "bg-blue-50",
      trend: "+12% this month",
    },
    {
      label: "Total Revenue",
      value: `₦${revenue.toLocaleString()}`,
      icon: <Banknote className="text-green-600" size={24} />,
      bgColor: "bg-green-50",
      trend: "+8% from last week",
    },
    {
      label: "Active Users",
      value: totalUsers,
      icon: <Users className="text-purple-600" size={24} />,
      bgColor: "bg-purple-50",
      trend: "5 new today",
    },
    {
      label: "Pending Vendors",
      value: pendingVendors,
      icon: <Store className="text-orange-600" size={24} />,
      bgColor: "bg-orange-50",
      trend: "Action required",
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                <TrendingUp size={14} />
                <span>{stat.trend.split(' ')[0]}</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                {stat.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-bold text-[#03170a] mb-4">Activity Overview</h4>
          <div className="h-48 flex items-center justify-center border-2 border-dashed border-gray-100 rounded-xl">
             <p className="text-gray-400 text-sm">Revenue chart coming soon...</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h4 className="text-lg font-bold text-[#03170a] mb-4">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-3">
             <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <p className="text-xs font-bold text-[#127733] mb-1">New Booking</p>
                <p className="text-[10px] text-gray-500 leading-tight">Create an order manually</p>
             </button>
             <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <p className="text-xs font-bold text-[#c85f0b] mb-1">Download Report</p>
                <p className="text-[10px] text-gray-500 leading-tight">Export monthly stats</p>
             </button>
             <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors font-poppins">
                <p className="text-xs font-bold text-blue-600 mb-1 font-poppins">Send Promo</p>
               <p className="text-[10px] text-gray-500 leading-tight">Blast email to users</p>
             </button>
             <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl text-left transition-colors">
                <p className="text-xs font-bold text-purple-600 mb-1">System Health</p>
                <p className="text-[10px] text-gray-500 leading-tight">All systems operational</p>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

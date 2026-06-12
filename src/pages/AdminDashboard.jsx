import { API_BASE_URL } from "@/config";
import AdminSettings from "@/components/ui/AdminSettings";
import AdminTabs from "@/components/ui/AdminTabs";
import BookingTable from "@/components/ui/BookingTable";
import VendorTable from "@/components/ui/VendorTable";
import OverviewPanel from "@/components/ui/OverviewPanel";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Bell, Search, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BASE = API_BASE_URL;

const dummyVendors = [
  {
    id: 1,
    fullName: "John Doe",
    email: "john@shop.com",
    phone: "08012345678",
    businessName: "John's Laundry Point",
    address: "12, Ring Road, Ibadan",
    spaceType: "shop",
    status: "pending"
  },
  {
    id: 2,
    fullName: "Jane Smith",
    email: "jane@home.com",
    phone: "09087654321",
    businessName: "Jane's Residence",
    address: "Block B, Room 4, UI, Ibadan",
    spaceType: "house",
    status: "pending"
  }
];

export default function AdminDashboard() {
  const { adminAuthFetch, admin, adminToken } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [bookings, setBookings] = useState([]);
  const [vendors, setVendors] = useState(dummyVendors);

  useEffect(() => {
    if (!adminToken || !admin) {
      navigate("/admin/login");
      return;
    }

    const fetchAdminBookings = async () => {
      try {
        const res = await adminAuthFetch(`${BASE}/api/admin/bookings`);
        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings || []);
        }
      } catch (err) {
        console.error("Failed to fetch admin bookings:", err);
      }
    };
    fetchAdminBookings();
  }, [adminAuthFetch, admin, adminToken, navigate]);

  if (!adminToken || !admin) return null;

  const updateStatus = (id, newStatus) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: newStatus } : b
    );
    setBookings(updated);
  };

  const handleDeleteBooking = async (id) => {
    if (admin?.role !== 'superadmin') {
      toast.error("Only superadmins can delete bookings");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const res = await adminAuthFetch(`${BASE}/api/admin/bookings/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        toast.success("Booking deleted");
        setBookings(prev => prev.filter(b => (b.request_id || b.id) !== id));
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const approveVendor = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'approved' } : v));
  };

  const rejectVendor = (id) => {
    setVendors(prev => prev.map(v => v.id === id ? { ...v, status: 'rejected' } : v));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-poppins">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-4 py-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-[#03170a]">Admin Panel</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">LaundryAid Management</p>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full border border-transparent focus-within:border-[#127733] focus-within:bg-white transition-all">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder="Search anything..." className="bg-transparent border-none outline-none text-xs w-40" />
             </div>
             <button className="relative p-2 text-gray-400 hover:text-[#127733] transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             <div className="flex items-center gap-2 pl-4 border-l border-gray-100">
                <div className="text-right hidden sm:block">
                   <p className="text-xs font-bold text-gray-900">{admin?.name}</p>
                   <p className="text-[10px] text-gray-500 capitalize">{admin?.role}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-tr from-[#127733] to-green-400 rounded-full flex items-center justify-center text-white shadow-sm ring-2 ring-white uppercase">
                   {admin?.name?.[0] || <User size={18} />}
                </div>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
           <div>
              <h1 className="text-3xl font-bold text-gray-900 capitalize">{activeTab}</h1>
              <p className="text-gray-500 text-sm">Welcome back! Here's what's happening today.</p>
           </div>
           
           <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="transition-all duration-300">
          {activeTab === "overview" && <OverviewPanel bookings={bookings} vendors={vendors} />}
          {activeTab === "bookings" && (
            <BookingTable 
              bookings={bookings} 
              updateStatus={updateStatus} 
              onDelete={handleDeleteBooking}
              isAdminSuper={admin?.role === 'superadmin'}
            />
          )}
          {activeTab === "vendors" && (
            <VendorTable vendors={vendors} onApprove={approveVendor} onReject={rejectVendor} />
          )}
          {activeTab === "settings" && <AdminSettings />}
        </div>
      </main>
    </div>
  );
}

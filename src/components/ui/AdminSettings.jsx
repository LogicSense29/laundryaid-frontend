import { API_BASE_URL } from "@/config";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LogOut, 
  Lock, 
  User, 
  Settings, 
  Bell, 
  ShieldCheck,
  ChevronRight,
  UserPlus
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";

export default function AdminSettings() {
  const navigate = useNavigate();
  const { admin, logoutAdmin, adminAuthFetch } = useAuth();
  
  const [showCreateAdmin, setShowCreateAdmin] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", password: "", role: "admin" });

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await adminAuthFetch(`${API_BASE_URL}/api/admin/create`, {
        method: "POST",
        body: JSON.stringify(newAdmin)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Admin created successfully!");
        setShowCreateAdmin(false);
        setNewAdmin({ name: "", email: "", password: "", role: "admin" });
      } else {
        toast.error(data.error || "Failed to create admin");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const sections = [
    {
      title: "Account Security",
      items: [
        { label: "Change Password", icon: <Lock size={16} />, status: "Coming soon" },
        { label: "Two-Factor Auth", icon: <ShieldCheck size={16} />, status: "Disabled" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { label: "Notifications", icon: <Bell size={16} />, status: "On" },
        { label: "Profile Details", icon: <User size={16} />, status: "Edit" },
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                 <Settings size={20} className="text-gray-600" />
              </div>
              <h3 className="font-bold text-gray-900">Admin Preferences</h3>
           </div>
        </div>

        <div className="p-6 space-y-8">
           {sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                 <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">{section.title}</h4>
                 <div className="space-y-1">
                    {section.items.map((item, i) => (
                       <button 
                          key={i}
                          className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                       >
                          <div className="flex items-center gap-3 text-gray-700">
                             <div className="text-gray-400 group-hover:text-[#127733] transition-colors">
                                {item.icon}
                             </div>
                             <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <span className="text-xs text-gray-400">{item.status}</span>
                             <ChevronRight size={14} className="text-gray-300" />
                          </div>
                       </button>
                    ))}
                 </div>
              </div>
           ))}

           {admin?.role === 'superadmin' && (
              <div className="space-y-3 pt-4 border-t border-gray-50">
                 <h4 className="text-[10px] font-bold text-[#127733] uppercase tracking-widest px-1">Superadmin Actions</h4>
                 <button 
                    onClick={() => setShowCreateAdmin(!showCreateAdmin)}
                    className="w-full flex items-center justify-between p-3 bg-green-50/50 hover:bg-green-50 rounded-xl transition-colors border border-green-100"
                 >
                    <div className="flex items-center gap-3 text-[#127733]">
                       <UserPlus size={18} />
                       <span className="text-sm font-bold">Create New Admin</span>
                    </div>
                 </button>

                 {showCreateAdmin && (
                    <form onSubmit={handleCreateAdmin} className="p-4 bg-gray-50 rounded-xl space-y-4 border border-gray-100 mt-2">
                       <input 
                          type="text" placeholder="Full Name" required
                          value={newAdmin.name} onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                          className="w-full p-2 border rounded text-sm"
                       />
                       <input 
                          type="email" placeholder="Email Address" required
                          value={newAdmin.email} onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                          className="w-full p-2 border rounded text-sm"
                       />
                       <input 
                          type="password" placeholder="Password" required minLength="6"
                          value={newAdmin.password} onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                          className="w-full p-2 border rounded text-sm"
                       />
                       <select 
                          value={newAdmin.role} onChange={(e) => setNewAdmin({...newAdmin, role: e.target.value})}
                          className="w-full p-2 border rounded text-sm"
                       >
                          <option value="admin">Admin</option>
                          <option value="superadmin">Superadmin</option>
                       </select>
                       <button type="submit" className="w-full bg-[#127733] text-white py-2 rounded text-sm font-bold hover:bg-[#0e5c27] transition-all">
                          Create Account
                       </button>
                    </form>
                 )}
              </div>
           )}
        </div>

        <div className="p-6 bg-red-50/50 border-t border-red-50">
           <button
             onClick={handleLogout}
             className="w-full flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all shadow-md active:scale-[0.98] font-bold"
           >
             <LogOut size={18} />
             Logout from Dashboard
           </button>
        </div>
      </div>
      
      <p className="text-center text-[10px] text-gray-400 font-medium">
         LaundryAid Admin v1.0.4 • Signed in as {admin?.name}
      </p>
    </div>
  );
}

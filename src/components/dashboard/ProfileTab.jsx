import { API_BASE_URL } from "@/config";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { User, Phone, Mail, Wallet, LogOut } from "lucide-react";
import { ClipLoader } from "react-spinners";

const BASE = API_BASE_URL;

export default function ProfileTab() {
  const { user, authFetch, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await authFetch(`${BASE}/api/user/profile`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <ClipLoader color="#127733" size={32} />
      </div>
    );
  }

  const displayEmail = profile?.email || user?.email || "—";
  const displayMobile = profile?.mobile || user?.mobile || "—";
  const walletBalance = Number(profile?.wallet_balance || 0);
  const totalBookings = Number(profile?.total_bookings || 0);
  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
      })
    : "—";

  return (
    <div className="space-y-4">
      {/* Avatar + Name */}
      <div className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-sm">
        <img 
          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${displayEmail}`} 
          alt="Avatar" 
          className="w-14 h-14 rounded-full bg-gray-100 shrink-0 border-2 border-[#127733]"
        />
        <div>
          <p className="font-semibold text-[#03170a] text-base">{displayEmail.split("@")[0]}</p>
          <p className="text-xs text-gray-500">Member since {joinedDate}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-[#127733]">{totalBookings}</p>
          <p className="text-xs text-gray-500 mt-1">Total Bookings</p>
        </div>
        <div className="bg-orange-50 rounded-2xl p-4 text-center">
          <p className="text-2xl font-bold text-[#c85f0b]">
            ₦{walletBalance.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Wallet Balance</p>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
        <h3 className="font-semibold text-sm text-[#03170a]">Account Details</h3>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Mail size={16} className="text-[#127733] shrink-0" />
          <span className="truncate">{displayEmail}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Phone size={16} className="text-[#127733] shrink-0" />
          <span>{displayMobile}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Wallet size={16} className="text-[#127733] shrink-0" />
          <span>Wallet: ₦{walletBalance.toLocaleString()}</span>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-3 border border-red-400 text-red-500 rounded-2xl text-sm font-medium"
      >
        <LogOut size={16} />
        Logout
      </button>
    </div>
  );
}

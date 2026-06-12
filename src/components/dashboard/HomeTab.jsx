import { API_BASE_URL } from "@/config";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Package, Clock, CheckCircle, Truck, ArrowRight } from "lucide-react";
import { ClipLoader } from "react-spinners";

const BASE = API_BASE_URL;

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short" }) : "—";

export default function HomeTab({ onTabChange }) {
  const { authFetch, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await authFetch(`${BASE}/api/user/bookings?page=1&limit=100`);
        if (res.ok) {
          const data = await res.json();
          setBookings(data.bookings || []);
          setTotalBookings(data.total || 0);
          setActiveCount(data.activeCount || 0);
          setDeliveredCount(data.deliveredCount || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const firstName = user?.email?.split("@")[0] || "there";
  const latest = bookings[0];

  // Upcoming delivery within 48h
  const upcomingDelivery = bookings.find((b) => {
    if (!b.delivery_date) return false;
    const diff = new Date(b.delivery_date) - Date.now();
    return diff > 0 && diff <= 2 * 86400000;
  });

  return (
    <div className="space-y-4">
      {/* Greeting */}
      <div>
        <h2 className="text-xl font-bold text-[#03170a]">
          Hey {firstName} 👋
        </h2>
        <p className="text-sm text-gray-500">Here's your laundry overview</p>
      </div>

      {/* Upcoming delivery alert */}
      {upcomingDelivery && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-3">
          <Truck size={18} className="text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-medium text-amber-800">Delivery arriving soon</p>
            <p className="text-xs text-amber-600">
              Your {upcomingDelivery.package} order delivers on {formatDate(upcomingDelivery.delivery_date)}
            </p>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-[#127733]">{totalBookings}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Total</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-[#c85f0b]">{activeCount}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Active</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
          <p className="text-xl font-bold text-blue-500">{deliveredCount}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">Done</p>
        </div>
      </div>

      {/* Latest booking */}
      {loading ? (
        <div className="flex justify-center py-6">
          <ClipLoader color="#127733" size={24} />
        </div>
      ) : latest ? (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm text-[#03170a]">Latest Booking</h3>
            <button
              onClick={() => onTabChange("bookings")}
              className="text-xs text-[#127733] flex items-center gap-1"
            >
              View all <ArrowRight size={12} />
            </button>
          </div>
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-sm capitalize">{latest.package}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Pickup: {formatDate(latest.pickup_date)} · Delivery: {formatDate(latest.delivery_date)}
              </p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                latest.status === "delivered"
                  ? "bg-green-50 text-green-600"
                  : "bg-yellow-50 text-yellow-600"
              }`}
            >
              {latest.status}
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-6 shadow-sm text-center text-gray-400">
          <Package size={36} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No bookings yet</p>
          <button
            onClick={() => onTabChange("book")}
            className="mt-3 text-sm text-[#127733] font-medium underline"
          >
            Book your first laundry
          </button>
        </div>
      )}

      {/* Quick book CTA */}
      <button
        onClick={() => onTabChange("book")}
        className="w-full bg-[#127733] text-white py-3.5 rounded-2xl font-medium text-sm"
      >
        + New Booking
      </button>
    </div>
  );
}

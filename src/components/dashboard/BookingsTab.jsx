import { API_BASE_URL } from "@/config";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";
import { Package, Calendar, CheckCircle, Clock, Truck } from "lucide-react";

const BASE = API_BASE_URL;

const STATUS_CONFIG = {
  pending: { label: "Pending", color: "text-yellow-600 bg-yellow-50", icon: Clock },
  picked_up: { label: "Picked Up", color: "text-blue-600 bg-blue-50", icon: Truck },
  ready: { label: "Ready", color: "text-purple-600 bg-purple-50", icon: Package },
  delivered: { label: "Delivered", color: "text-green-600 bg-green-50", icon: CheckCircle },
};

const STATUS_STEPS = ["pending", "picked_up", "ready", "delivered"];

const formatDate = (d) =>
  d ? new Date(d).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function BookingsTab() {
  const { authFetch, user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [totalBookings, setTotalBookings] = useState(0);
  const observerRef = useRef(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (page === 1) setLoading(true);
        else setLoadingMore(true);

        const res = await authFetch(`${BASE}/api/user/bookings?page=${page}&limit=10`);
        if (res.ok) {
          const data = await res.json();
          setBookings((prev) => (page === 1 ? data.bookings || [] : [...prev, ...(data.bookings || [])]));
          setHasMore(data.hasMore);
          setTotalBookings(data.total || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchBookings();
  }, [page, authFetch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !loadingMore) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 1.0 }
    );
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, loadingMore]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <ClipLoader color="#127733" size={32} />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="text-center py-16 text-gray-400">
        <Package size={48} className="mx-auto mb-3 opacity-40" />
        <p className="font-medium">No bookings yet</p>
        <p className="text-sm mt-1">Your laundry history will appear here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-400">{totalBookings} booking(s)</p>
      {bookings.map((b) => {
        const statusKey = (b.status || "pending").toLowerCase();
        const config = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;
        const StatusIcon = config.icon;
        const stepIndex = STATUS_STEPS.indexOf(statusKey);
        const progress = ((stepIndex + 1) / STATUS_STEPS.length) * 100;

        return (
          <div key={b.request_id} className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-[#03170a] text-sm capitalize">{b.package}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Booked {formatDate(b.created_at)}
                </p>
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${config.color}`}>
                <StatusIcon size={12} />
                {config.label}
              </span>
            </div>

            {/* Progress */}
            <div className="space-y-1">
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full transition-all ${
                    statusKey === "delivered" ? "bg-[#127733]" : "bg-[#c85f0b]"
                  }`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400">
                {STATUS_STEPS.map((s) => (
                  <span key={s} className={s === statusKey ? "text-[#127733] font-medium" : ""}>
                    {STATUS_CONFIG[s].label}
                  </span>
                ))}
              </div>
            </div>

            {/* Dates */}
            <div className="flex gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                Pickup: {formatDate(b.pickup_date)}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                Delivery: {formatDate(b.delivery_date)}
              </span>
            </div>
          </div>
        );
      })}
      
      {/* Infinite Scroll Observer Target */}
      <div ref={observerRef} className="h-4 w-full"></div>
      {loadingMore && (
        <div className="flex justify-center py-4">
          <ClipLoader color="#127733" size={24} />
        </div>
      )}
    </div>
  );
}

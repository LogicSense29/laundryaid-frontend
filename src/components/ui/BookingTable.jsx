import { 
  History, 
  MapPin, 
  User, 
  CreditCard,
  Clock,
  Package,
  Truck,
  CheckCircle2,
  Trash2
} from "lucide-react";

export default function BookingTable({ bookings, updateStatus, onDelete, isAdminSuper }) {
  if (bookings.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
        <History className="mx-auto text-gray-300 mb-4" size={48} />
        <p className="text-gray-500 font-medium font-poppins">No bookings found.</p>
      </div>
    );
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <Clock size={14} />;
      case 'processing': return <Package size={14} />;
      case 'ready': return <Truck size={14} />;
      case 'delivered': return <CheckCircle2 size={14} />;
      default: return null;
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <table className="min-w-full text-sm">
        <thead className="bg-[#127733] text-white">
          <tr>
            <th className="p-4 text-left font-semibold">Customer</th>
            <th className="p-4 text-left font-semibold">Service</th>
            <th className="p-4 text-left font-semibold">Pickup</th>
            <th className="p-4 text-left font-semibold">Status</th>
            <th className="p-4 text-right font-semibold">Payment</th>
            {isAdminSuper && <th className="p-4 text-right font-semibold">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-poppins">
          {bookings.map((b) => (
            <tr key={b.request_id || b.id} className="hover:bg-green-50/50 transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-[#127733] rounded-full flex items-center justify-center font-bold text-xs">
                    {b.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900">{b.name}</span>
                    <div className="flex items-center gap-1 text-[10px] text-gray-500">
                      <MapPin size={10} />
                      <span className="truncate max-w-[120px]">{b.address}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                  (b.package || b.service) === 'Premium' ? 'bg-indigo-100 text-indigo-700' : 
                  (b.package || b.service) === 'Deluxe' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                }`}>
                   {b.package || b.service}
                </span>
              </td>
              <td className="p-4 text-gray-600 font-medium italic">
                {b.pickup_date ? new Date(b.pickup_date).toLocaleDateString() : b.pickupDate}
              </td>
              <td className="p-4">
                <select
                  value={b.status || 'pending'}
                  onChange={(e) => updateStatus(b.request_id || b.id, e.target.value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider outline-none border-none cursor-pointer transition-all ${
                    b.status === "new"
                      ? "bg-yellow-100 text-yellow-700"
                      : b.status === "processing"
                      ? "bg-blue-100 text-blue-700"
                      : b.status === "ready"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="ready">Ready</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="p-4 text-right">
                 <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-gray-700 font-mono font-bold text-xs">
                       <CreditCard size={12} className="text-gray-400" />
                       {b.paystack_reference || b.paymentRef || 'N/A'}
                    </div>
                    <span className="text-[10px] text-green-600 font-bold tracking-tight">PAID</span>
                 </div>
              </td>
              {isAdminSuper && (
                <td className="p-4 text-right">
                  <button 
                    onClick={() => onDelete(b.request_id || b.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Booking"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

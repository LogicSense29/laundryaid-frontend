import { Check, X, Shield, MapPin, Building, Phone, Mail } from "lucide-react";

export default function VendorTable({ vendors, onApprove, onReject }) {
  if (vendors.length === 0) {
    return (
      <div className="bg-white p-10 rounded-2xl shadow-sm text-center border border-gray-100">
        <Shield className="mx-auto text-gray-300 mb-4" size={48} />
        <p className="text-gray-500 font-medium font-poppins">No vendor applications yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100 animate-in fade-in duration-500">
      <table className="min-w-full text-sm">
        <thead className="bg-[#127733] text-white font-poppins">
          <tr>
            <th className="p-4 text-left font-semibold">Vendor Details</th>
            <th className="p-4 text-left font-semibold">Location</th>
            <th className="p-4 text-center font-semibold">Space Type</th>
            <th className="p-4 text-center font-semibold">Status</th>
            <th className="p-4 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 font-poppins">
          {vendors.map((v) => (
            <tr key={v.id} className="hover:bg-green-50/50 transition-colors">
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 mb-1">{v.fullName}</span>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <Mail size={10} className="text-[#127733]" />
                      <span>{v.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <Phone size={10} className="text-[#127733]" />
                      <span>{v.phone}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-start gap-2 max-w-xs">
                  <MapPin className="text-gray-400 shrink-0 mt-0.5" size={14} />
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-800 text-xs">{v.businessName}</span>
                    <span className="text-[10px] text-gray-500 leading-tight italic">{v.address}</span>
                  </div>
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                  <Building size={12} className="text-gray-400" />
                  <span className="text-[10px] font-bold">{v.spaceType}</span>
                </div>
              </td>
              <td className="p-4 text-center">
                <span className={`inline-block px-3 py-1.5 rounded-xl text-[10px] font-extrabold uppercase tracking-wider ${
                  v.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : v.status === 'approved' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {v.status}
                </span>
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  {v.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onApprove(v.id)}
                        className="p-2 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                        title="Approve Vendor"
                      >
                        <Check size={18} />
                      </button>
                      <button
                        onClick={() => onReject(v.id)}
                        className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm active:scale-95"
                        title="Reject Vendor"
                      >
                        <X size={18} />
                      </button>
                    </>
                  )}
                  {v.status !== 'pending' && (
                    <div className="flex items-center justify-end gap-1 text-gray-400 italic text-[10px] font-medium">
                       <span>Processed</span>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { API_BASE_URL } from "@/config";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ClipLoader } from "react-spinners";
import { Copy, Check, Users, Wallet, Gift } from "lucide-react";
import { toast } from "react-hot-toast";

const BASE = API_BASE_URL;

export default function ReferralsTab() {
  const { authFetch, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawStep, setWithdrawStep] = useState(1);
  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [withdrawDetails, setWithdrawDetails] = useState({
    amount: "",
    bankName: "",
    accountName: "",
    accountNumber: "",
    otp: ""
  });

  const fetchStats = async () => {
    try {
      const res = await authFetch(`${BASE}/api/user/referrals`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, []);

  const handleWithdrawRequest = async (e) => {
    e.preventDefault();
    if (withdrawDetails.amount > (stats?.walletBalance || 0)) {
      return toast.error("Insufficient wallet balance");
    }
    setWithdrawLoading(true);
    try {
      const res = await authFetch(`${BASE}/api/user/wallet/withdraw/request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: withdrawDetails.amount })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setWithdrawStep(2);
      } else {
        toast.error(data.error || "Failed to request withdrawal");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setWithdrawLoading(false);
    }
  };

  const handleWithdrawVerify = async (e) => {
    e.preventDefault();
    setWithdrawLoading(true);
    try {
      const res = await authFetch(`${BASE}/api/user/wallet/withdraw/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(withdrawDetails)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setShowWithdrawModal(false);
        setWithdrawStep(1);
        setWithdrawDetails({ amount: "", bankName: "", accountName: "", accountNumber: "", otp: "" });
        fetchStats(); // Refresh wallet balance
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setWithdrawLoading(false);
    }
  };

  const handleCopy = () => {
    const code = stats?.referralCode || user?.referralCode;
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Referral code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLink = () => {
    const code = stats?.referralCode || user?.referralCode;
    const link = `https://laundryaid.com.ng/request?ref=${code}`;
    if (navigator.share) {
      navigator.share({ title: "LaundryAid", text: "Get clean laundry with LaundryAid!", url: link });
    } else {
      navigator.clipboard.writeText(link);
      toast.success("Link copied!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <ClipLoader color="#127733" size={32} />
      </div>
    );
  }

  const referralCode = stats?.referralCode || user?.referralCode || "—";
  const referredCount = stats?.referredCount || 0;
  const totalEarned = stats?.totalEarned || 0;
  const walletBalance = stats?.walletBalance || 0;
  const referred = stats?.referred || [];

  return (
    <div className="space-y-4">
      {/* How it works */}
      <div className="bg-gradient-to-r from-[#127733] to-[#1a9944] rounded-2xl p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Gift size={18} />
          <span className="font-semibold text-sm">Earn 15% per referral</span>
        </div>
        <p className="text-xs opacity-90 leading-relaxed">
          Share your code. When a friend books and pays, you earn 15% of their transaction — credited to your wallet.
        </p>
      </div>

      {/* Referral Code */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <p className="text-xs text-gray-500 mb-2">Your referral code</p>
        <div className="flex items-center gap-3">
          <span className="flex-1 text-xl font-bold tracking-widest text-[#127733] bg-green-50 rounded-xl px-4 py-3 text-center">
            {referralCode}
          </span>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-gray-100 text-gray-600 active:scale-95 transition-transform"
          >
            {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
          </button>
        </div>
        <button
          onClick={handleShareLink}
          className="mt-3 w-full py-2.5 bg-[#c85f0b] text-white rounded-xl text-sm font-medium"
        >
          Share Link
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
          <Users size={18} className="mx-auto text-[#127733] mb-1" />
          <p className="text-lg font-bold text-[#03170a]">{referredCount}</p>
          <p className="text-[10px] text-gray-400">Referred</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
          <Gift size={18} className="mx-auto text-[#c85f0b] mb-1" />
          <p className="text-lg font-bold text-[#03170a]">₦{totalEarned.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400">Earned</p>
        </div>
        <div className="bg-white rounded-2xl p-3 shadow-sm text-center">
          <Wallet size={18} className="mx-auto text-blue-500 mb-1" />
          <p className="text-lg font-bold text-[#03170a]">₦{walletBalance.toLocaleString()}</p>
          <p className="text-[10px] text-gray-400">Wallet</p>
          {walletBalance > 0 && (
            <button 
              onClick={() => setShowWithdrawModal(true)}
              className="mt-2 w-full py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition-colors"
            >
              Withdraw
            </button>
          )}
        </div>
      </div>

      {/* Referred users list */}
      {referred.length > 0 && (
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold text-sm text-[#03170a] mb-3">People you referred</h3>
          <div className="space-y-2">
            {referred.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-gray-700">{r.email}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(r.joinedAt).toLocaleDateString("en-NG", { month: "short", year: "numeric" })}
                  </p>
                </div>
                <span className="text-[#127733] font-semibold text-xs">
                  +₦{Number(r.earned).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {referred.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Users size={40} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No referrals yet</p>
          <p className="text-xs mt-1">Share your code to start earning</p>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl">
            <h3 className="text-lg font-bold text-[#03170a] mb-1">
              {withdrawStep === 1 ? "Withdraw Funds" : "Verify OTP"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {withdrawStep === 1 ? `Available Balance: ₦${walletBalance.toLocaleString()}` : "Enter the 6-digit code sent to your email."}
            </p>

            {withdrawStep === 1 ? (
              <form onSubmit={handleWithdrawRequest} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">Amount (₦)</label>
                  <input type="number" required min="100" max={walletBalance} 
                    value={withdrawDetails.amount}
                    onChange={e => setWithdrawDetails({...withdrawDetails, amount: e.target.value})}
                    className="w-full mt-1 p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-[#127733]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Bank Name</label>
                  <input type="text" required placeholder="e.g. GTBank"
                    value={withdrawDetails.bankName}
                    onChange={e => setWithdrawDetails({...withdrawDetails, bankName: e.target.value})}
                    className="w-full mt-1 p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-[#127733]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Account Number</label>
                  <input type="text" required maxLength="10" placeholder="10-digit account number"
                    value={withdrawDetails.accountNumber}
                    onChange={e => setWithdrawDetails({...withdrawDetails, accountNumber: e.target.value})}
                    className="w-full mt-1 p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-[#127733]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600">Account Name</label>
                  <input type="text" required placeholder="Name on account"
                    value={withdrawDetails.accountName}
                    onChange={e => setWithdrawDetails({...withdrawDetails, accountName: e.target.value})}
                    className="w-full mt-1 p-2.5 border rounded-xl bg-gray-50 text-sm focus:outline-[#127733]" />
                </div>
                <div className="flex gap-3 pt-3">
                  <button type="button" onClick={() => setShowWithdrawModal(false)} className="flex-1 p-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium">Cancel</button>
                  <button type="submit" disabled={withdrawLoading} className="flex-1 p-2.5 bg-[#127733] text-white rounded-xl font-medium disabled:opacity-50">
                    {withdrawLoading ? "Processing..." : "Next"}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleWithdrawVerify} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600">6-Digit OTP</label>
                  <input type="text" required maxLength="6" placeholder="123456"
                    value={withdrawDetails.otp}
                    onChange={e => setWithdrawDetails({...withdrawDetails, otp: e.target.value})}
                    className="w-full mt-1 p-3 text-center text-xl tracking-[0.5em] font-bold border rounded-xl bg-gray-50 focus:outline-[#127733]" />
                </div>
                <div className="flex gap-3 pt-3">
                  <button type="button" onClick={() => setWithdrawStep(1)} className="flex-1 p-2.5 bg-gray-100 text-gray-600 rounded-xl font-medium">Back</button>
                  <button type="submit" disabled={withdrawLoading} className="flex-1 p-2.5 bg-[#127733] text-white rounded-xl font-medium disabled:opacity-50">
                    {withdrawLoading ? "Verifying..." : "Confirm Withdrawal"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

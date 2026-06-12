import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Home as HomeIcon, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronRight,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";

const vendorSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  businessName: z.string().min(2, "Business or House name is required"),
  address: z.string().min(10, "Please provide a complete address"),
  spaceType: z.enum(["shop", "house", "apartment", "office", "other"], {
    errorMap: () => ({ message: "Please select a space type" }),
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function VendorRegistration() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      spaceType: "shop"
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    // Simulate API call
    console.log("Vendor Registration Data:", data);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success("Registration successful! We'll contact you soon.");
    reset();
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg border border-[#127733]/10">
          <div className="w-20 h-20 bg-[#127733]/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-[#127733]" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4 font-poppins">Application Received!</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Thank you for your interest in becoming a LaundryAid Dropoff Vendor. 
            Our team will review your application and visit your location within 48 hours for verification.
          </p>
          <button 
            onClick={() => setIsSuccess(false)}
            className="bg-[#127733] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#0e5e28] transition-colors"
          >
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="text-center mb-12" data-aos="fade-up">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#127733] mb-4">
          Become a Dropoff Vendor
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-white">
          Earn extra income by turning your shop or house into a LaundryAid collection point. 
          Join our network of trusted partners today.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Why Join Section */}
        <div className="lg:col-span-2 space-y-6" data-aos="fade-right">
          <div className="bg-[#127733] text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-4">Why Partner with Us?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 p-1 rounded-full mt-1">
                    <ChevronRight size={16} />
                  </div>
                  <span>Earn Monthly commission when orders dropped off at your location.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 p-1 rounded-full mt-1">
                    <ChevronRight size={16} />
                  </div>
                  <span>Increase foot traffic to your existing business.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 p-1 rounded-full mt-1">
                    <ChevronRight size={16} />
                  </div>
                  <span>Free branding and marketing materials provided.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-white/20 p-1 rounded-full mt-1">
                    <ChevronRight size={16} />
                  </div>
                  <span>Simple app for tracking and managing orders.</span>
                </li>
              </ul>
            </div>
            {/* Abstract Background Element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-2">Requirement:</h4>
            <p className="text-sm text-gray-600 italic">
              "All vendors must have a secure space to store laundry bags and be available during standard business hours."
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-xl' border border-gray-100" data-aos="fade-left">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  {...register("fullName")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>}
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all`}
                    placeholder="john@example.com"
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    {...register("phone")}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all`}
                    placeholder="0802 345 6789"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            {/* Business/House Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business or House Name</label>
              <div className="relative">
                <Building className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <input
                  {...register("businessName")}
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.businessName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all`}
                  placeholder="e.g. Divine Supermarket or Block A, Room 4"
                />
              </div>
              {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName.message}</p>}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Drop-off Point Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3.5 text-gray-400" size={18} />
                <textarea
                  {...register("address")}
                  rows="2"
                  className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all resize-none`}
                  placeholder="Full street address, city, state"
                ></textarea>
              </div>
              {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
            </div>

            {/* Space Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Space</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { value: "shop", label: "Shop", icon: <Building size={16} /> },
                  { value: "house", label: "House", icon: <HomeIcon size={16} /> },
                  { value: "apartment", label: "Apartment", icon: <HomeIcon size={16} /> },
                  { value: "office", label: "Office", icon: <Building size={16} /> },
                  { value: "other", label: "Other", icon: <ChevronRight size={16} /> },
                ].map((item) => (
                  <label 
                    key={item.value}
                    className={`flex items-center justify-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${
                      register("spaceType").value === item.value 
                        ? 'bg-[#127733]/10 border-[#127733] text-[#127733]' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <input
                      {...register("spaceType")}
                      type="radio"
                      value={item.value}
                      className="hidden"
                    />
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
              {errors.spaceType && <p className="mt-1 text-xs text-red-500">{errors.spaceType.message}</p>}
            </div>

            {/* Passwords */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Create Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input
                    {...register("confirmPassword")}
                    type={showPassword ? "text" : "password"}
                    className={`w-full pl-10 pr-10 py-3 bg-gray-50 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-[#127733] focus:border-transparent outline-none transition-all`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
              </div>
            </div> */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#c85f0b] hover:bg-[#b0530a] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { API_BASE_URL } from "@/config";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import BookingFailed from "./BookingFailed";
import { LoaderComponent } from "./Loading";
import { PaystackButton } from "react-paystack";
import { LockIcon, Gift, Copy } from "lucide-react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import { ClipLoader } from "react-spinners";



// Validation Schemas
const schemas = [
  z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    contact: z.string().min(11, "Phone number is too short"),
    referred_by: z.string().optional(),
  }),
  z.object({
    serviceType: z.enum(["basic", "ironing", "premium"]),
    pickupOption: z.enum(["pickup", "dropoff"]),
    dropOffOption: z.enum(["aanfani", "oluyole"]),
  }),
  z.object({
    address: z.string().min(5, "Address is too short"),
  }),
  // z.object({ promo_code: z.string().min(13, "Invalid Voucher") }),
  z.object({}),
  z.object({})
];

// Pricing per package
const packagePricing = {
  // "wash & fold": 12000,
    basic: 12000,
  ironing: 10000,
  // basic_80: 10000,
  // basic_plus: 20000,
  premium: 35000,
};

export default function RequestForm({ onTabChange }) {
  const [selected, setSelected] = useState();
  const [minDate, setMinDate] = useState(new Date());
  const { login, token, authFetch, user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [voucherLoading, setVoucherLoading] = useState(false);
  const [showReferralPopup, setShowReferralPopup] = useState(false);
  const [pendingAuth, setPendingAuth] = useState(null);

  // Read referral code from URL ?ref=XXXXX
  const referredBy = new URLSearchParams(window.location.search).get("ref") || "";

  const checkCountRequestBase = `${API_BASE_URL}/api/count_request`;

  useEffect(()=> {
    const checkCount = async () => {
      try {
        const res = await fetch(checkCountRequestBase);

        if(!res.ok){
          console.log(res);
          return;
        }

  //  const today = new Date();
  //  const tomorrow = new Date(today);
  //  tomorrow.setDate(today.getDate() + 1);
  const result = await res.json()

    // console.log(result);
    // console.log(result.date);

  if(!result.date){
    setMinDate(new Date());
    return;
  }

  setMinDate(new Date(result.date))

      }catch(err){
        setErrors(err.error)
        console.log(err)
      }
    }

    checkCount();
  }, [])

  const {
    register,
    trigger,
    getValues,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[step - 1]),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      serviceType: "basic",
      pickupOption: "pickup",
      dropOffOption: "aanfani",
      promo_code: "",
      address: "",
      referred_by: referredBy,
    },
  });

  // Autofill form if user is logged in and has previous bookings
  useEffect(() => {
    const fetchLatestBooking = async () => {
      if (!token) return;
      try {
        const res = await authFetch(`${API_BASE_URL}/api/user/bookings`);
        if (res.ok) {
          const data = await res.json();
          if (data.bookings && data.bookings.length > 0) {
            const latest = data.bookings[0];
            const currentValues = getValues();
            if (!currentValues.name && latest.name) setValue("name", latest.name, { shouldValidate: true });
            if (!currentValues.email && latest.email) setValue("email", latest.email, { shouldValidate: true });
            if (!currentValues.contact && latest.contact) setValue("contact", latest.contact, { shouldValidate: true });
            if (!currentValues.address && latest.address) setValue("address", latest.address, { shouldValidate: true });
          }
        }
      } catch (err) {
        console.error("Failed to fetch latest booking for autofill", err);
      }
    };

    fetchLatestBooking();
  }, [token, authFetch, setValue, getValues]);

 const voucherCode = watch("promo_code");

const [discount, setDiscount] = useState(0);
const deliveryFee = 2000
const selectedPackage = watch("serviceType");
const selectedPickupOption = watch("pickupOption");
const basePrice = packagePricing[selectedPackage] || 0;
const finalPrice =
  selectedPackage === "basic" || selectedPackage === "ironing"
    ? basePrice - 0
    : basePrice - discount;

// console.log(finalPrice)

 useEffect(() => {
   if (!voucherCode) {
    //  setStatus(null);
    console.log('From no voucher')
    setDiscount(0)
     return;
   }

   const debounce = setTimeout(async () => {
     //  setLoading(true);

     // Voucher backend
     const {email} = getValues()
      await handlePromoBlur(voucherCode, email);

     // Voucher frontend
    //  checkFcode(voucherCode);

     //  setLoading(false);
     //  setStatus(result);
   }, 600); // wait 600ms after typing stops

   return () => clearTimeout(debounce);
 }, [voucherCode]);


  const next = async (type) => {
    const valid = await trigger();
    if (valid) setStep((s) => s + 1);
    type == "submit" && handleSubmit(onSubmit)();
  };

  const back = () => setStep((s) => s - 1);

  // const pickupDate = new Date(Date.now() + 86400000)
  //   .toISOString()
  //   .split("T")[0];
  // const deliveryDate = new Date(Date.now() + 4 * 86400000)
  //   .toISOString()
  //   .split("T")[0];

  // // Add 1 day to selected for pickup
  // const pickupDate = new Date(selected.getTime() + 1 * 86400000)
  //   .toISOString()
  //   .split("T")[0];

  // // Add 4 days to selected for delivery
  // const delivery = new Date(selected);
  // delivery.setDate(delivery.getDate() + 4);


  // const deliveryDate = delivery.toISOString().split("T")[0];

  const pickupDateStr = selected ? new Date(selected) : new Date();
  pickupDateStr.setDate(pickupDateStr.getDate());
  const pickupDate = pickupDateStr.toLocaleDateString("en-CA"); // "YYYY-MM-DD"

  const deliveryDateStr = selected ? new Date(selected) : new Date();
  deliveryDateStr.setDate(deliveryDateStr.getDate() + 4);
  const deliveryDate = deliveryDateStr.toLocaleDateString("en-CA");


  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endDate = new Date(today);
  endDate.setDate(today.getDay() + 3);

  const handlePromoBlur = async (code, email) => {
    if (!code) {
      setDiscount(0);
      return;
    }
setVoucherLoading(false)
    try {
      setVoucherLoading(true)
      const res = await fetch(
        `${API_BASE_URL}/api/promo_code`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ promo_code: code, email: email }),
        }
      );
      // console.log(res);

      if (!res.ok) {
        const result = await res.json();
        setVoucherLoading(false);
        setError("promo_code", {
          type: "manual",
          message: result.error,
        });
console.log(res.text)
         setDiscount(0);
      } else {
        setVoucherLoading(false);
        clearErrors("promo_code"); // remove error if valid
        const result = await res.json()
        setDiscount(result.percentage)
        // console.log(result)
      }
    } catch (err) {
      setVoucherLoading(false);
      setError("promo_code", {
        type: "manual",
        message: "Error checking voucher",
      });
    } finally {
      setVoucherLoading(false);
    }
  };

  const checkFcode = (code) => {
    const voucher = "freedompromo";
    const lowercase = code.toLocaleLowerCase()

    if(lowercase !== voucher){
       setDiscount(0);

      setError("promo_code", {
        type: "manual",
        message: "Invalid Code",
      });
    } else {
             clearErrors("promo_code"); // remove error if valid
             setDiscount(5000);
    }
  }

  const onSubmit = async () => {
    setLoading(true);
    setErrors(null);

    const values = getValues();
    const finalData = {
      ...values,
      pickupDate,
      deliveryDate,
      // clothes_count: values.serviceType === "basic_80" ? 80 : 150,
       // basic_plus or others
    };
    console.log(finalData);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/add_request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      if (res.ok) {
        // alert("✅ Booking & payment successful!");
        const result = await res.json();
        const { name } = result.request;
        const slicedName = name.split(" ")[0];
        setLoading(false);
        toast.success("✅ Booking successful!", {
          delay: 0,
        });
        toast.success(`${slicedName} Check your Email 😊`, {
          delay: 1500,
        });
        //  console.log("Success:", result);
        setStep(1);
        if (result.token) {
          setPendingAuth({ user: result.user, token: result.token });
        }
        setShowReferralPopup(true);
      } else {
        toast.error("❌ Booking failed", { error: res.body.message });
        setErrors(res.status || "Something went wrong.");
        setLoading(false)
        // console.log(res.status);
      }
    } catch (err) {
      toast.error("❌ Booking failed", { error: err });
      setErrors(err.error || "Something went wrong.");
      console.log(err.error);
    } finally {
      setLoading(false);
    }
  };

  const testURL = `${API_BASE_URL}/api/add_request`;
  const baseURL = `${API_BASE_URL}/api/add_request`;
  const onPaymentSuccess = async (ref) => {
    setLoading(true);
    setError(null);

    const values = getValues();
    const finalData = {
      ...values,
      pickupDate,
      deliveryDate,
      paymentRef: ref.reference,
      paidAmount: finalPrice,
      // paidAmount: packagePricing[values.serviceType],
    };

    try {
      const response = await fetch(testURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
      ...values,
      pickupDate,
      deliveryDate,
      paymentRef: ref.reference,
      paidAmount: finalPrice,
      referred_by: values.referred_by || undefined,
      // paidAmount: packagePricing[values.serviceType],
    }),
      });

      const data = await response.json();
      if (response.ok) {
        const { name } = data.request;
        const slicedName = name.split(" ")[0];
        setLoading(false);
        toast.success("✅ Booking successful!", {
          delay: 0,
        });
        toast.success(`${slicedName} Check your Email 😊`, {
          delay: 1500,
        });
        setStep(1);
        if (data.token) {
          setPendingAuth({ user: data.user, token: data.token });
        }
        setShowReferralPopup(true);
      } else {
        //  setLoading(false);
        toast.error("❌ Booking failed", { error: data.error });
        setError(response.status || "Something went wrong.");
        console.log(data.error || data.message);
        console.log("from error", data.error);
      }
    } catch (err) {
      toast.error("❌ Booking failed", { error: err });
      setError(err.error || "Something went wrong.");
      setLoading(false);
      console.log(err);
    } finally{
      setLoading(false)
    }
  };

  const paystackProps = {
    email: getValues("email"),
    // amount: packagePricing[getValues("serviceType")] * 100,
    amount: finalPrice * 100,
    publicKey: `${import.meta.env.VITE_PAYSTACK_PUBLIC_KEY}`,
    text: "Pay Now",
    onSuccess: onPaymentSuccess,
    onClose: () => {
      toast.error("Payment was closed");
    },
  };

  // console.log(typeof packagePricing[getValues("serviceType")]);

  return (
    <div className='bg-white rounded-xl p-4 shadow'>
      <h2 className='text-lg font-bold mb-4 text-[#127733] text-center'>
        Laundry Booking
      </h2>

      {/* Step Indicators */}
      <ol className='flex justify-between text-xs sm:text-sm mb-6'>
        {["Personal", "Service", "Pickup", "Confirm"].map((label, i) => (
          <li key={i} className='flex flex-col items-center w-full'>
            <span
              className={`w-8 h-8 flex items-center justify-center rounded-full font-semibold mb-1 ${
                step === i + 1
                  ? "bg-[#c85f0b] text-white"
                  : "bg-gray-300 text-gray-600"
              }`}>
              {i + 1}
            </span>
            <span
              className={step === i + 1 ? "text-[#c85f0b]" : "text-gray-500"}>
              {label}
            </span>
          </li>
        ))}
      </ol>

      {/* Form */}
      <form onSubmit={(e) => e.preventDefault()} className='space-y-2 text-sm'>
        {step === 1 && (
          <div className='space-y-3'>
            <input
              {...register("name")}
              placeholder='Full Name'
              className='w-full p-3 border rounded-lg'
            />
            {errors.name && (
              <p className='text-red-500'>{errors.name.message}</p>
            )}

            <input
              {...register("email")}
              placeholder='Email'
              className='w-full p-3 border rounded-lg'
              type='email'
            />
            {errors.email && (
              <p className='text-red-500'>{errors.email.message}</p>
            )}

            <input
              {...register("contact")}
              placeholder='Phone Number'
              className='w-full p-3 border rounded-lg'
            />
            {errors.contact && (
              <p className='text-red-500'>{errors.contact.message}</p>
            )}

            {!token && (
              <input
                {...register("referred_by")}
                placeholder='Referral Code (Optional)'
                className='w-full p-3 border rounded-lg'
              />
            )}
          </div>
        )}

        {step === 2 && (
          <>
            <label className='block font-medium'>Service Type</label>
            <select
              {...register("serviceType")}
              className='w-full p-3 border rounded-lg'>
              {/* <option value='wash & fold'>{`Wash & Fold - ₦${
                discount > 0 && selectedPackage == "wash & fold"
                  ? finalPrice.toLocaleString()
                  : "6,000"
              }`}</option> */}
              {/* <option value='wash & fold' disabled={discount > 0}>
                Wash & Fold - ₦6,000{" "}
              </option> */}
              {/* <option value='wash & fold'>{`Wash & Fold ₦${
                discount > 0 && selectedPackage == "basic_80"
                  ? finalPrice.toLocaleString()
                  : "8,000"
              }`}</option> */}
              <option value='basic'>{`Basic (Up to 80 clothes) - ₦${
                discount > 0 && selectedPackage == "basic"
                  ? finalPrice.toLocaleString()
                  : "12,000"
              }`}</option>
              <option value='ironing'>{`Ironing (Up 40 clothes) - ₦${
                discount > 0 && selectedPackage == "ironing"
                  ? finalPrice.toLocaleString()
                  : "10,000"
              }`}</option>
              <option value='premium'>{`Premium - ₦${
                discount > 0 && selectedPackage == "premium"
                  ? finalPrice.toLocaleString()
                  : "35,000"
              }`}</option>
            </select>

            <label className='block font-medium mt-4'>Pickup Option</label>
            <select
              {...register("pickupOption")}
              className='w-full p-3 border rounded-lg'>
              <option value='pickup'>
                {selectedPackage === "basic_80" || selectedPackage === "basic_plus" ? "Pickup" : "Free Pickup"}
              </option>
              <option value='dropoff'>Dropoff</option>
            </select>
            {/* {selectedPackage == "basic" && selectedPickupOption == "pickup" && (
              <span className='text-xs text-primary font-bold'>
                Delivery fee ₦{deliveryFee.toLocaleString()}{" "}
              </span>
            )} */}
            {
             selectedPickupOption == "dropoff" && (
              <>
                          <label className='block font-medium mt-4'>Dropoff Location</label>
            <select
              {...register("dropOffOption")}
              className='w-full p-3 border rounded-lg'>
              <option value='aanfani'>
                Aanfani
              </option>
              <option value='oluyole'>Dropoff</option>
            </select>
              </>
             )
            }

            <label className='block font-medium mt-4'>
              Voucher Code(Optional)
            </label>
            <div className='relative'>
              <input
                {...register("promo_code")}
                // onChange={(e) => handlePromoBlur(e.target.value)}
                className='w-full p-3 border rounded-lg'
              />

              {voucherLoading && (
                <span className='absolute right-1/2 top-1 translate-y-1/2'>
                  <ClipLoader
                    color='#fb8c3b'
                    loading={voucherLoading}
                    size={15}
                    className='text-primary'
                  />
                </span>
              )}
            </div>
            {errors.promo_code && (
              <p className='text-red-500 text-[14px]'>
                {errors.promo_code.message}
              </p>
            )}
          </>
        )}

        {step === 3 && (
          <>
            <label className='block font-medium'>Pickup/Dropoff Date</label>
            {/* <input
                type='text'
                value={new Date(today).toLocaleDateString()}
                className='w-full p-3 border rounded-lg bg-gray-100'
              /> */}
            <DatePicker
              className='w-[100%] p-3 border rounded-lg date-picker'
              selected={selected}
              onChange={(date) => setSelected(date)}
              minDate={minDate}
              dayClassName={(date) => {
                // highlight the minDate with custom color
                if (date.toDateString() === minDate.toDateString()) {
                  return "bg-primary text-white rounded-full"; // Tailwind classes
                }
                return undefined;
              }}
              placeholderText='Select date'
            />

            <label className='block font-medium mt-4'>Address</label>
            <textarea
              {...register("address")}
              placeholder='Enter your address'
              className='w-full p-3 border rounded-lg'
            />
            {errors.address && (
              <p className='text-red-500'>{errors.address.message}</p>
            )}
          </>
        )}

        {step === 4 && (
          <div className='bg-gray-50 p-4 rounded-lg space-y-2'>
            <p>
              <strong>Name:</strong> {getValues("name")}
            </p>
            <p>
              <strong>Email:</strong> {getValues("email")}
            </p>
            <p>
              <strong>Phone:</strong> {getValues("contact")}
            </p>
            <p>
              <strong>Service:</strong> {getValues("serviceType")}
            </p>
            <p>
              <strong>Pickup Option:</strong> {getValues("pickupOption")}
            </p>
            <p>
              <strong>Address:</strong> {getValues("address")}
            </p>
            <p>
              <strong>Pickup:</strong> {pickupDate}
            </p>
            <p>
              <strong>Delivery:</strong> {deliveryDate}
            </p>
            <p>
              <strong>Total:</strong> ₦
              {/* {packagePricing[getValues("serviceType")].toLocaleString()} */}
              {finalPrice.toLocaleString()}
            </p>
          </div>
        )}

        {step === 5 &&
          (!loading ? (
            <div className='text-center space-y-8'>
              <div className='shadow-sm border border-gray-300 p-5 rounded-lg space-y-3 bg-gradient-to-b sm:bg-gradient-to-r from-[#CFE3D6] via-[#a7cdb7] to-[#7cbf9e]'>
                <p>Amount</p>
                <p className='text-2xl'>
                  <strong>
                    {/* ₦{packagePricing[getValues("serviceType")].toLocaleString()} */}
                    ₦{finalPrice.toLocaleString()}
                  </strong>
                </p>
                <div>
                  <span className='flex justify-center items-center text-xs text-gray-500 space-x-1'>
                    <i className=''>Secured by Paystack</i>
                    <LockIcon size={14} />
                  </span>
                  <span>
                    <i>LaundryAid</i>
                  </span>
                </div>
              </div>
              <PaystackButton
                {...paystackProps}
                className='w-full bg-[#c85f0b] text-white p-3 rounded-lg'
              />
            </div>
          ) : (
            <LoaderComponent loading={loading} />
          ))}

        {/* {loading && !error && <LoaderComponent loading={loading} />} */}
        {/* If Booking Fails */}
        {error && <BookingFailed message={error} />}

        {/* Navigation Buttons */}
        <div className='flex justify-between mt-4'>
          {step > 1 && (
            <button
              type='button'
              onClick={back}
              className='px-4 py-2 rounded-full bg-gray-200'>
              Back
            </button>
          )}
          {step < 5 && (
            <button
              type='button'
              onClick={() => next(step == 5 && "submit")}
              className='px-5 py-2 rounded-full bg-[#c85f0b] text-white'>
              {step < 5 ? "Next" : error && "Retry"}
            </button>
          )}
        </div>
      </form>

      {/* Referral Popup Modal */}
      {showReferralPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-xl">
            <div className="w-16 h-16 bg-[#127733]/10 rounded-full flex items-center justify-center mx-auto">
              <Gift className="text-[#127733]" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#03170a]">Refer a Friend. Earn for Life.</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Earn <span className="font-bold text-[#c85f0b]">15% commission</span> every time your referral completes a laundry order with LaundryAid.
            </p>
            <div className="flex flex-col gap-3 pt-4">
              {(() => {
                const referralCode = pendingAuth?.user?.referralCode || user?.referralCode;
                const link = referralCode ? `https://laundryaid.com.ng/request?ref=${referralCode}` : "";
                
                if (!link) return null;

                return (
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      toast.success("Link copied!");
                    }}
                    className="w-full flex items-center justify-between gap-2 bg-[#127733]/10 text-[#127733] border border-[#127733]/20 p-3 rounded-xl font-semibold hover:bg-[#127733]/20 transition-colors"
                  >
                    <span className="truncate text-sm">{link}</span>
                    <Copy size={18} className="flex-shrink-0" />
                  </button>
                );
              })()}
              <button 
                onClick={() => {
                  setShowReferralPopup(false);
                  if (pendingAuth?.token) {
                    login(pendingAuth.user, pendingAuth.token);
                    navigate("/dashboard");
                  } else {
                    onTabChange ? onTabChange("home") : navigate("/dashboard");
                  }
                }}
                className="w-full text-gray-500 font-medium"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

//  {
//    step < 5 ? "Next" : error ? "Retry" : "Submit";
//  }

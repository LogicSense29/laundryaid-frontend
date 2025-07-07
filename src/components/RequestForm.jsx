import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import BookingFailed from "./BookingFailed";
import { LoaderComponent } from "./Loading";
// import { PaystackButton } from "react-paystack";

// Validation Schemas
const schemas = [
  z.object({
    name: z.string().min(2, "Full name is required"),
    email: z.string().email("Invalid email"),
    contact: z.string().min(11, "Phone number is too short"),
  }),
  z.object({
    serviceType: z.enum(["wash & fold", "deluxe", "premium"]),
    pickupOption: z.enum(["pickup", "delivery"]),
  }),
  z.object({
    address: z.string().min(5, "Address is too short"),
  }),
  z.object({}),
  z.object({}),
];

// Pricing per package
const packagePricing = {
  "wash & fold": 6000,
  deluxe: 10000,
  premium: 25000,
};

export default function RequestForm() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    trigger,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schemas[step - 1]),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      contact: "",
      serviceType: "wash & fold",
      pickupOption: "pickup",
      address: "",
    },
  });

  const next = async (type) => {
    const valid = await trigger();
    if (valid) setStep((s) => s + 1);
    type == "submit" && handleSubmit(onSubmit)();
  };

  const back = () => setStep((s) => s - 1);

  const pickupDate = new Date(Date.now() + 86400000)
    .toISOString()
    .split("T")[0];
  const deliveryDate = new Date(Date.now() + 5 * 86400000)
    .toISOString()
    .split("T")[0];

  const onSubmit = async () => {
    setLoading(true);
    setError(null);

    const values = getValues();
    const finalData = {
      ...values,
      pickupDate,
      deliveryDate,
      clothes_count: 80,
    };
    console.log(finalData);

    try {
      const res = await fetch(
        "https://laundryaid-backend.onrender.com/api/add_request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalData),
        }
      );

      if (res.ok) {
        // alert("✅ Booking & payment successful!");
        const result = await res.json();
        setLoading(false)
        toast.success("✅ Booking successful!");
       console.log("Success:", result);
        setStep(1);
      } else {
        toast.success("❌ Booking failed", { error: res.text });
        setError(res.status || "Something went wrong.");
        console.log(res.status);
      }
    } catch (err) {
      toast.success("❌ Booking failed", { error: err });
      setError(err.message || "Something went wrong.");
      console.log(err)
    }
  };

  const onPaymentSuccess = async (ref) => {
    const values = getValues();
    const finalData = {
      ...values,
      pickupDate,
      deliveryDate,
      paymentRef: ref.reference,
      paidAmount: packagePricing[values.serviceType],
    };

    try {
      const res = await fetch("/api/add_request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await res.json();
      if (result.success) {
        alert("✅ Booking & payment successful!");
        setStep(1);
      } else {
        alert("❌ Booking failed: " + result.message);
      }
    } catch (err) {
      alert("Error submitting booking: " + err.message);
    }
  };

  const paystackProps = {
    email: getValues("email"),
    amount: packagePricing[getValues("serviceType")] * 100,
    publicKey: "pk_test_adad6377c193642ad173ef1f3653cc0ab7abc89f",
    text: "Pay Now",
    onSuccess: onPaymentSuccess,
    onClose: () => alert("Payment was not completed"),
  };

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
      <form onSubmit={(e) => e.preventDefault()} className='space-y-4 text-sm'>
        {step === 1 && (
          <>
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
          </>
        )}

        {step === 2 && (
          <>
            <label className='block font-medium'>Service Type</label>
            <select
              {...register("serviceType")}
              className='w-full p-3 border rounded-lg'>
              <option value='wash & fold'>Wash & Fold - ₦6,000</option>
              <option value='deluxe'>Deluxe - ₦10,000</option>
              <option value='premium'>Premium - ₦25,000</option>
            </select>

            <label className='block font-medium mt-4'>Pickup Option</label>
            <select
              {...register("pickupOption")}
              className='w-full p-3 border rounded-lg'>
              <option value='pickup'>Pickup at Store</option>
              <option value='delivery'>Self Delivery</option>
            </select>
          </>
        )}

        {step === 3 && (
          <>
            <label className='block font-medium'>Pickup Date</label>
            <input
              type='text'
              value={new Date(pickupDate).toLocaleDateString()}
              disabled
              className='w-full p-3 border rounded-lg bg-gray-100'
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
              {packagePricing[getValues("serviceType")].toLocaleString()}
            </p>
          </div>
        )}

        {/* {step === 5 && (
          <div className="text-center">
            <PaystackButton
              {...paystackProps}
              className="w-full bg-[#c85f0b] text-white p-3 rounded-lg"
            />
          </div>
        )} */}
        {loading && !error && <LoaderComponent loading={loading}/>}
        {/* If Booking Fails */}
        {error && <BookingFailed message={error}/>}

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
          {step <= 4 && (
            <button
              type='button'
              onClick={() => next(step == 4 && "submit")}
              className='px-5 py-2 rounded-full bg-[#c85f0b] text-white'>
              {step < 4 ? "Next" : error ? "Retry" : "Submit"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

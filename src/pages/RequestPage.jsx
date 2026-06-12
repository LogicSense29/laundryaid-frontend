import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import RequestForm from "@/components/RequestForm";

export default function RequestPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && token) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, token, navigate]);

  if (user && token) return null;

  return (
    <div className=" font-poppins flex flex-col pt-16 pb-12 px-4">
      <div className="max-w-lg mx-auto w-full">
        <RequestForm />
      </div>
    </div>
  );
}

import { API_BASE_URL } from "@/config";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NoPage from "./pages/NoPage";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import RequestPage from "./pages/RequestPage";
import AdminDashboard from "./pages/AdminDashboard";
import VendorRegistration from "./pages/VendorRegistration";
import AdminLogin from "./pages/AdminLogin";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, [pathname]);
    
    return null;
  };

  useEffect(() => {
    AOS.init({ delay: 300 });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/track-visit`, {
      method: "POST",
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main website layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="become-a-vendor" element={<VendorRegistration />} />
            <Route path="request" element={<RequestPage />} />
            <Route path="auth" element={<Auth />} />
            <Route path="*" element={<NoPage />} />
          </Route>

          {/* Clean dashboard layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
        </Routes>
        <Toaster
          position="top-center"
          toastOptions={{ duration: 8000 }}
        />
      </BrowserRouter>
    </>
  );
}

export default App;

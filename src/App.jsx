import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import NoPage from "./pages/NoPage";
import MainLayout from "./components/layouts/MainLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main website layout */}
        <Route path='/' element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path='contact' element={<Contact />} />
          <Route path='auth' element={<Auth />} />
          <Route path='*' element={<NoPage />} />
        </Route>

        {/* Clean dashboard layout (no navbar/footer/gradient) */}
        <Route element={<DashboardLayout />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin' element={<AdminDashboard />} />
        </Route>
      </Routes>
      <Toaster
        position='top-right'
        toastOptions={{
          duration: 6000, // All toasts stay for 6 seconds
        }}
      />
    </BrowserRouter>
  );
}

export default App;

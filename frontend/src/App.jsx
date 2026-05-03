import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter } from "react-router-dom";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Cart from "./pages/Cart";
import "./App.css";
import Payment from "./pages/Payment";
import { Contact } from "lucide-react";
import ContactPage from "./pages/Contact";
import AboutPage from "./pages/About";
import FAQPage from "./pages/FAQ";
import ShippingPolicy from "./pages/ShipingPolicy";
import PrivacyPolicy from "./pages/Privecy";
import OrderPage from "./pages/Order";
import ReturnsPolicy from "./pages/Returns";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path ='/returns' element={<ReturnsPolicy />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
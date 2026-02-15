import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

/* ================= USER PAGES ================= */
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import UPIPayment from "./pages/UpiPayment";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import Login from "./Login";
import Signup from "./Signup";

/* ================= ADMIN PAGES ================= */
import Dashboard from "./Admin/Apages/Dashboard";
import Products from "./Admin/Apages/Products";
import AddProduct from "./Admin/Apages/AddProduct";
import Orders from "./Admin/Apages/Orders";
import EditProduct from "./Admin/Apages/EditProduct";

/* ================= PROTECTED ROUTES ================= */
import AdminProtectedRoute from "./Admin/AdminProtectedRoute";
import UserProtectedRoute from "./UserProtectedRoute";

const App = () => {
  const location = useLocation();

  // Hide navbar on auth, checkout, payment & admin pages
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    [
      "/login",
      "/signup",
      "/checkout",
      "/upi-payment",
      "/order-success",
    ].includes(location.pathname);

  // Show footer only on home page
  const showFooter = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* ================= USER ROUTES ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />

        <Route
          path="/checkout"
          element={
            <UserProtectedRoute>
              <Checkout />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <UserProtectedRoute>
              <MyOrders />
            </UserProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <UserProtectedRoute>
              <Profile />
            </UserProtectedRoute>
          }
        />

        <Route path="/upi-payment" element={<UPIPayment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminProtectedRoute>
              <Dashboard />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <AdminProtectedRoute>
              <Products />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/addproducts"
          element={
            <AdminProtectedRoute>
              <AddProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <AdminProtectedRoute>
              <EditProduct />
            </AdminProtectedRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <AdminProtectedRoute>
              <Orders />
            </AdminProtectedRoute>
          }
        />
      </Routes>

      {showFooter && <Footer />}
    </>
  );
};

export default App;
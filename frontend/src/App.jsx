import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import UserLogin from './AllForms/Login/UserLogin';
import RegisterLoginUser from './AllForms/Login/RegisterUser';
import ForgotPassword from './AllForms/Login/ForgotPassword';
import ResetPassword from './AllForms/Login/ResetPassword';
import Home from './components/Homepage/Home';
import Menu from './components/Menu/Menu';
import Delivery from './components/Delivery/Delivery';
import News from './components/News/News';
import Party from './components/Party/Party';
import Careers from './components/Careers/Careers';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import CartIcon from './components/Cart/CartIcon';
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/Cart/CheckoutPage';
import ApplyForJob from './AllForms/ApplyForJob';
import JobsByLocation from './components/Careers/JobsByLocation';
import Receipt from './components/Cart/Receipt';
import ProfilePage from './components/Profile/ProfilePage';
import BookParty from './AllForms/BookParty';
import AdminLogin from './AllForms/Login/AdminDashboard/AdminLogin';
import ProtectedAdminRoute from './AllForms/Login/AdminDashboard/ProtectedAdminRoute';
import AdminDashboard from './AllForms/Login/AdminDashboard/AdminDashboard';

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const hideLayout = ['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname) || isAdminRoute;

  return (
    <div>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Delivery" element={<Delivery />} />
        <Route path="/News" element={<News />} />
        <Route path="/Party" element={<Party />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Careers/:city" element={<JobsByLocation />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<RegisterLoginUser />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/ApplyForJob" element={<ApplyForJob />} />
        <Route path="/BookParty" element={<BookParty />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/Home" replace />} />
      </Routes>

      {!isAdminRoute && <CartIcon />}
      {!hideLayout && <Footer />}
    </div>
  );
};

export default App;
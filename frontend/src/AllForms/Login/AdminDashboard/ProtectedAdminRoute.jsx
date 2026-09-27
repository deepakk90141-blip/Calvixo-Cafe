import { Navigate, Outlet } from 'react-router-dom';
import { isAdminAuthenticated } from '../../../utils/adminAuth';

const ProtectedAdminRoute = () => {
  return isAdminAuthenticated() ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default ProtectedAdminRoute;

import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contextapi/AuthContext';

const PrivateRoute = () => {
  const { isLogged } = useContext(AuthContext) || { isLogged: false, login: () => {}, logout: () => {} };
  const location = useLocation(); // Lấy thông tin URL hiện tại

  return isLogged ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace /> // Lưu URL hiện tại
  );
};

export default PrivateRoute;

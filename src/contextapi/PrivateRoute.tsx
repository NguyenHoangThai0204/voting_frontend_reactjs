// components/PrivateRoute.js
import { Outlet, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contextapi/AuthContext';

const PrivateRoute = () => {
  const { isLogged } = useContext(AuthContext) || { isLogged: false, login: () => {}, logout: () => {} };

  return isLogged ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

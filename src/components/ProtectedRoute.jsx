import { Outlet, Navigate } from 'react-router-dom';

function ProtectedRoute() {
  const token = JSON.parse(localStorage.getItem('userToken'));
  // console.log(token);
  //if use token from context, get null
  return token ? <Outlet /> : <Navigate to="/" replace />;
}

export default ProtectedRoute;

import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
  
  if (!authToken) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;

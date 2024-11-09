import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useSelector((state) => state.user);
  

  if (currentUser) {
    const entity = currentUser.entity;

    

    if (entity === 'PROVIDER') {
      return <Navigate to="/provider/profile" />;
    } else if (entity === 'NGO') {
      return <Navigate to="/ngo/profile" />;
    }
  }

  return children;
};

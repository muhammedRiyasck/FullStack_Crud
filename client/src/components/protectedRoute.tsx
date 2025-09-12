
// ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactNode } from 'react';

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const user = useSelector((store: {userReducer: {  userData: any } }) => store.userReducer.userData);
  // const user = useSelector((state:{userData:any})=> state.userData);

  if (!user?.name){
     return <Navigate to="/authForm" />
    } 

    if(user?.role=='admin') return <Navigate to='/adminDashboard' />

  return children;  
};

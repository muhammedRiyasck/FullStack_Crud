import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactNode } from 'react';


const PublicRoute = ({children}:{ children: ReactNode }) => {
    const user = useSelector((store: {userReducer: {  userData: any } }) => store.userReducer.userData);

    if(user?.name) return <Navigate to='/' />
    return children
}

export { PublicRoute}



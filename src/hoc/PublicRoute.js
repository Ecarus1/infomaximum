import { useAuthStatus } from '../hooks/authStatus.hook';

import {Navigate} from 'react-router-dom';

const PublicRoute = ({children}) => {
    if (localStorage.getItem('token')) {
        return <Navigate to='/'/>
    }

    return children;
}
 
export default PublicRoute;
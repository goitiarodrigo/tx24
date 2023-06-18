import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = () => {

    return (
        window.localStorage.getItem('token') ?
                <Navigate to='/home'/>
            :
                <Outlet />
     )
}

export default PublicRoutes
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {

  return (
    !window.localStorage.getItem('token') ?
            <Navigate to='/login' />
        :
            <Outlet />
        
  )
}

export default PrivateRoutes
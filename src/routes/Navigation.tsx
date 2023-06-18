import { Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import { routes } from './routes'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

const Navigation = () => {
  return (
    <>
        <BrowserRouter>
            <Suspense fallback={<h1>Loading</h1>}>
                <>
                    <Routes>
                        <Route path='/' element={<PrivateRoutes />}>
                            {
                                routes.map(route =>
                                    route.private ? (
                                        <Route
                                            key={route.path}
                                            path={route.path}
                                            element={<route.Component />}
                                        />
                                    )
                                    : null
                                )
                            }
                            
                            <Route path="/*" element={<Navigate to="/home" replace />} />
                        </Route>
                        <Route path="/" element={<PublicRoutes />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                    </Routes>
                </>
            </Suspense>
        </BrowserRouter>
    </>
  )
}

export default Navigation
import { LazyExoticComponent, lazy } from "react"

type JSXComponent = () => JSX.Element

interface IRoutes{
    to: string,
    path: string,
    Component: LazyExoticComponent<JSXComponent> | JSXComponent,
    name: string,
    private?: boolean,
}

const LazyLogin = lazy(() => import(/*webpackChunkName='Login' */'../pages/Login/Login'))
const LazyRegister = lazy(() => import(/*webpackChunkName='Register' */'../pages/Register/Register'))
const LazyHome = lazy(() => import(/*webpackChunkName='Home'*/'../pages/Home/Home'))
const LazyTransactions = lazy(() => import(/*webpackChunkName='Transactions'*/'../pages/Transactions/Transactions'))

export const routes: IRoutes[] = [
    {
        to: '/login',
        path: '/login',
        Component: LazyLogin,
        name: 'Login'
    },
    {
        to: '/register',
        path: '/register',
        Component: LazyRegister,
        name: 'Register'
    },
    {
        to: '/home',
        path: '/home',
        Component: LazyHome,
        name: 'Home',
        private: true
    },
    {
        to: '/transactions',
        path: '/transactions',
        Component: LazyTransactions,
        name: 'Transactions',
        private: true
    }
]
import { closeSessionSvg } from '../../assets/CloseSession.svg'
import styles from './navBar.module.scss'
import { useNavigate, NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { CryptoContext } from '../../context/CryptoContext'

const NavBar = () => {
    const { user } = useContext(CryptoContext)
    const { username } = user
    const navigate = useNavigate()

    const handleSignOut = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className={styles.nav_container}>
            <div className={styles.logo_container}>
                <div onClick={() => navigate('/home')} className={styles.logo}/>
                <span>TX 24</span>
            </div>
            <nav>
                <NavLink
                    className={({ isActive }) => {
                        return isActive ? `${styles.active}` : ""
                    }}
                    to={'/home'}
                >
                        Home
                </NavLink>
                <NavLink
                    className={({ isActive }) => {
                        return isActive ? `${styles.active}` : ""
                    }}
                    to={'/transactions'}
                >
                    Historial de compras
                </NavLink>
                <span>{username}</span>
                <div
                    className={styles.close_session_svg}
                    title='Sign out'
                    onClick={handleSignOut}
                >
                    
                    {closeSessionSvg('white')}
                </div>
            </nav>
            
        </div>
    )
}
export default NavBar
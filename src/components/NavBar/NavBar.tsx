import { closeSessionSvg } from '../../assets/CloseSession.svg'
import styles from './navBar.module.scss'
import { useNavigate, NavLink } from 'react-router-dom'

const NavBar = () => {
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
                        console.log(isActive)
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
                <span>{'Username'}</span>
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
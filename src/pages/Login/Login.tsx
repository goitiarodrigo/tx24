import { ChangeEvent, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from  './login.module.scss'
import Input from '../../components/Input/Input'
import { CryptoContext } from '../../context/CryptoContext'

const Login = () => {

    const { logUser } = useContext(CryptoContext)
    const navigate = useNavigate()
    const [error, setError] = useState({error: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        password: '',
        email: ''
    })

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser({...user, [name]: value})
    }

    const handeOnSubmit = async (e: any) => {
        e.preventDefault()
        if (isLoading) return
        setIsLoading(true)
        const {success, error}: any = await logUser({email: user.email, password: user.password, type_log: 'login'})
        if (success) {
            setIsLoading(false)
            return navigate('/home')
        } else {
            setError({ error })
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_image}/>
            <div className={styles.form_container}>
                <form >
                    <label>Email</label>
                    <Input
                        placeholder='example@gmail.com'
                        name='email'
                        value={user.email}
                        type="email"
                        onChange={onHandleChange}
                        required
                    />
                    <label>Password</label>
                    <Input
                        placeholder='password'
                        name='password'
                        value={user.password}
                        type="password"
                        onChange={onHandleChange}
                        required
                    />
                    <div className={styles.errors}>{error.error !== '' ? error.error.toUpperCase() : null}</div>
                    <input onClick={handeOnSubmit} className={isLoading ? styles.disabled : styles.enabled} value='Login' type='submit'/>
                </form>
                <span>Don't have an account yet?, <span onClick={() => navigate('/register')}> Register</span></span>
            </div>
        </div>
    )
}
export default Login
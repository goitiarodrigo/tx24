import styles from './register.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'
import { logUserService } from '../../services/logUser.service'

const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState({error: ''})
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: ''
    })

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser({...user, [name]: value})
    }

    const handeOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsLoading(true)
        const {success, response, error}: any = await logUserService({email: user.email, password: user.password, username: user.username, type_log: 'register'})
        if (success) {
            localStorage.setItem('token', response.access_token)
            localStorage.setItem('username', response.user.username)
            localStorage.setItem('id', response.user.id)
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
                <form onSubmit={isLoading ? ()=>{} : handeOnSubmit}>
                    <label>Username</label>
                    <Input
                        placeholder='username'
                        name='username'
                        value={user.username}
                        onChange={onHandleChange}
                        required
                    />
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
                    <input className={isLoading ? styles.disabled : styles.enabled} value='Register' type='submit'/>
                </form>
                <span>Do you already have an account?, <span onClick={() => navigate('/login')}> Login</span></span>
            </div>
        </div>
    )
}
export default Register
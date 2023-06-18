import styles from './register.module.scss'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Input/Input'

const Login = () => {
    const navigate = useNavigate()
    const [existError, setExistError] = useState(false)
    const [user, setUser] = useState({
        username: '',
        password: '',
        email: ''
    })

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser({...user, [name]: value})
    }

    const handeOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_image}/>
            <div className={styles.form_container}>
                <form onSubmit={handeOnSubmit}>
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
                    <div className={styles.errors}></div>
                    <input value='Register' type='submit'/>
                </form>
                <span>Don't have an account yet?, <span onClick={() => navigate('/login')}> Login</span></span>
            </div>
        </div>
    )
}
export default Login
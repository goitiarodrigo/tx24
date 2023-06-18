import { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from  './login.module.scss'
import Input from '../../components/Input/Input'

const Login = () => {
    const navigate = useNavigate()
    const [existError, setExistError] = useState(false)
    const [user, setUser] = useState({
        password: '',
        email: ''
    })

    const onHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target
        setUser({...user, [name]: value})
    }

    const handeOnSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        localStorage.setItem('token', '1111')
        navigate('/home')
    }

    return (
        <div className={styles.login_container}>
            <div className={styles.login_image}/>
            <div className={styles.form_container}>
                <form onSubmit={handeOnSubmit}>
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
                    <input value='Login' type='submit'/>
                </form>
                <span>Do you already have an account?, <span onClick={() => navigate('/register')}> Register</span></span>
            </div>
        </div>
    )
}
export default Login
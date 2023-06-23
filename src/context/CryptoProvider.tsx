import { CryptoContext } from "./CryptoContext"
import { useEffect, useState } from 'react'
import { Socket, io } from 'socket.io-client'
import { IUserData, logUserService } from "../services/logUser.service"
import toast from 'react-hot-toast'

interface IProps {
    children: JSX.Element | JSX.Element[]
}

export const CryptoProvider = ({children}: IProps) => {

    const [user, setUser] = useState({username: localStorage.getItem('username') ?? '', email: '', id: ''})
    const [cryptoData, setCryptoData] = useState<any[]>([])
    const [allCryptos, setAllCryptos] = useState<any[]>([])
    const [wallet, setWallet] = useState<any[]>([])

    const logUser = async ({email, password, username, type_log}: IUserData) => {
        const {success, response, error}: any = await logUserService({email, password, username, type_log})
        if (success) {
            setUser({
                username: response.user.username,
                email: response.user.email,
                id: response.user.id
            })
            localStorage.setItem('token', response.access_token)
            localStorage.setItem('username', response.user.username)
            localStorage.setItem('id', response.user.id)
            return { success }
        } else {
            return { success, error }
        }
    }
    

    useEffect(() => {
        let socket: Socket<any> | undefined = undefined
        if (localStorage.getItem('token')){
            const socket = io('http://localhost:5000')

            socket.on('connect', () => {
                
            })

            socket.on('price_alert', (updated_crypto) => {
                setCryptoData(updated_crypto)
                toast(`${updated_crypto.length} coins were updated`,
                    {
                        style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        },
                    }
                );
                
            })
        }

        return () => {
            if (socket) socket.disconnect();
        }
    }, [user, setUser])

    return (
        <CryptoContext.Provider value={{
            cryptoData,
            logUser,
            user,
            setAllCryptos,
            allCryptos,
            setWallet,
            wallet
        }}>
            {children}
        </CryptoContext.Provider>
    )
}
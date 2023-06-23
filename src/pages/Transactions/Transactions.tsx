import { useContext, useState, useEffect } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import styles from './transactions.module.scss'
import { Toaster, toast } from 'react-hot-toast'
import { CryptoContext } from '../../context/CryptoContext'
import { get_coin_wallet, get_transactions } from '../../services/crypto.service'
import Wallet from '../../components/Wallet/Wallet'
import Loader from '../../components/Loader/Loader'

interface ITransaction {
    amount: number,
    id: number,
    purchase_price: number,
    timestamp: string,
    type_currency_purchased: string,
    type_currency_used: string,
    type_of_transaction: string
}

const Transactions = () => {

    const { wallet, setWallet } = useContext(CryptoContext)
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState<ITransaction[]>([])

    useEffect(() => {
        getTransactions()
        if (wallet.length === 0) {
            get_coins()
        }
    }, [])

    async function get_coins() {
        const resp: any = await get_coin_wallet(localStorage.getItem('token')!, localStorage.getItem('id')!)
        setWallet(resp.data)
    }

    async function getTransactions(){
        setIsLoading(true)
        const { success, resp, error } = await get_transactions(localStorage.getItem('token')!, localStorage.getItem('id')!)
        if (success) {
            setData(resp.data)
            setIsLoading(false)
        } else {
            toast.error("Something was wrong: " + error)
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <NavBar />
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <div className={styles.transactions_container}>
                
                <h1>Transactions history</h1>
                <div className={styles.wallet_container}>
                    {
                        wallet?.map((element) => {
                            return <Wallet key={element.id} data={element}/>
                        })
                    }
                    
                </div>
                <div className={styles.table_container}>
                    <table>
                        <thead>
                            <tr>
                                <td>Time</td>
                                <td>Crypto Currency Purchased</td>
                                <td>Crypto Currency Used</td>
                                <td>Type of transaction</td>
                                <td>Purchase Price</td>
                                <td>Quantity</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(({amount, id, purchase_price, timestamp, type_currency_purchased, type_currency_used, type_of_transaction}) => (
                                    <tr key={id}>
                                        <td>{ new Date(timestamp).toLocaleString() }</td>
                                        <td>{ type_currency_purchased.toUpperCase() }</td>
                                        <td>{ type_currency_used.toUpperCase() }</td>
                                        <td>{ type_of_transaction }</td>
                                        <td>{ (purchase_price).toFixed(4) }</td>
                                        <td>{ (amount).toFixed(4) }</td>
                                    </tr>
                                ))
                            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Transactions
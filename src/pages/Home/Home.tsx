import { useContext, useEffect, useState, useRef } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { arrowRotateSvg } from '../../assets/ArrowRotate.svg'
import styles from './home.module.scss'
import Body from '../../components/Body/Body'
import { CryptoContext } from '../../context/CryptoContext'
import { get_crypto_currencies } from '../../services/crypto.service'
import { Toaster } from 'react-hot-toast'
import BalanceModal from '../../components/BalanceModal/BalanceModal'
import Loader from '../../components/Loader/Loader'

const Home = () => {

    const { allCryptos, setAllCryptos, setWallet } = useContext(CryptoContext)
    const [existError, setExistError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [coinSelected, setCoinSelected] = useState({coin_client: '', coin_platform: 'Bitcoin'})
    const [totalValueExchange, setTotalValueExchange] = useState(0)
    const [isOpenModal, setIsOpenModal] = useState(false)

    const inputRef = useRef<any>(null)

    useEffect(() => {
        getCryptoCurrencies()
    }, [])
    
    async function getCryptoCurrencies() {
        setLoading(true)
        const { success, resp, wallet: wallet_data } = await get_crypto_currencies(localStorage.getItem('token')!, localStorage.getItem('id')!)

        if (success) {
            if (!wallet_data || wallet_data.length === 0) {
                setIsOpenModal(true)
            }
            setWallet(wallet_data)
            setAllCryptos(resp)
            setLoading(false)
        }
        else {
            setExistError(true)
            setLoading(false)
        }
    }

    const handleChange = (e: any) => {
        const { value, name } = e.target
        setCoinSelected({...coinSelected, [name]: value})
    }

    const calculateCoinValue = () => {
        const crypto_client_filtered = allCryptos.filter(el => el.name.toLowerCase() === coinSelected.coin_platform.toLowerCase())
        return (1 / crypto_client_filtered[0]?.current_price).toFixed(4)
    }

    const handleCalculateExchange = () => {
        if (inputRef.current.value) {
            const result = inputRef.current.value / allCryptos.filter(el => el.name.toLowerCase() === coinSelected.coin_platform.toLowerCase())[0].current_price
            setTotalValueExchange(result)
        }
    }

    const handleAmountValue = (e: any) => {
        const { value } = e.target
        inputRef.current.value = value
    }

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={styles.home_container}>
            <NavBar />
            <Toaster
                position="top-right"
                reverseOrder={true}
            />
            <header className={styles.header_container}>
                <div className={styles.title}>
                    <h1>Cryptocurrency exchange.</h1>
                    <span>Values are shown in EUR</span>
                </div>
                <section className={styles.calculator_container}>
                    <div className={styles.calculator_section}>
                        <h4>Exchange</h4>
                        <div>
                            <span>Pay: {0}</span>
                            <span>Don't have this type of currency</span>
                        </div>
                        <div className={styles.select_container}>
                            <input ref={inputRef} placeholder='0.00' type='number' onChange={handleAmountValue}/>
                            {/* <select name='coin_client' value={coinSelected.coin_client} onChange={handleChange}>
                                {
                                    allCryptos.map(({ name, id }) => (
                                        <option key={id}>{ name }</option>
                                    ))
                                }
                            </select> */}
                            <span className={styles.currency}>EUR</span>
                        </div>
                    </div>
                    <span onClick={handleCalculateExchange} className={styles.arrow_svg}>
                        {arrowRotateSvg()}
                    </span>
                    <div className={styles.calculator_section}>
                        <div className={styles.exchange_rate}>
                            <span>Exchange rate: </span>
                            <span>{`1 EUR = ${calculateCoinValue()} ${coinSelected.coin_platform}`}</span>
                        </div>
                        
                        <div>
                            <span>{(totalValueExchange).toFixed(2)}</span>
                            <select name='coin_platform' value={coinSelected.coin_platform} onChange={handleChange}>
                                {
                                    allCryptos.map(({ name, id }) => (
                                        <option key={id}>{ name }</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </section>
            </header>
            {/* <div className={styles.crypto_price_container}>
                <CryptoCard />
            </div> */}
            <Body />
            {
                isOpenModal ?
                    <BalanceModal onClose={setIsOpenModal} refetch={getCryptoCurrencies} />
                :
                    null
            }
        </div>
    )
}
export default Home
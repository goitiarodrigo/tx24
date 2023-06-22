import { useContext, useState, useRef, ChangeEvent } from 'react'
import { crossSvg } from '../../assets/Cross.svg'
import { infoSvg } from '../../assets/Info.svg'
import styles from './purchaseModal.module.scss'
import { CryptoContext } from '../../context/CryptoContext'
import { ICryptoInfo } from '../../interfaces/crypto.interface'
import { post_transaction } from '../../services/crypto.service'

interface IProps {
    onClose: (value: boolean) => void,
    cryptoData: ICryptoInfo
}

const styles_types = {
    loading: {type: 'disable', value: 'Wait'},
    done: {type: 'isDone', value: 'Done'},
    ready: {type: 'enable', value: 'Continue'},
    error: {type: 'isError', value: 'Error'}
}

const Modal = ({ onClose, cryptoData }: IProps) => {

    const { allCryptos, user } = useContext(CryptoContext)
    const { id } = user
    const [coinSelected, setCoinSelected] = useState({client_coin: 'EUR', platform_coin: ''})
    const [totalReceive, setTotalReceive] = useState('0')
    const [status, setStatus] = useState<'loading' | 'done' | 'error' | 'ready'>('ready')

    const inputRef = useRef<any>(null)

    const handleSellCrypto = async () => {
        if (status === 'ready') {
            setStatus('loading')
            const dataBody = {
                user: id,
                type_currency_purchased: cryptoData.name,
                type_currency_used: coinSelected.client_coin,
                type_of_transaction: 'Sell',
                amount: Number(inputRef.current.value),
                purchase_price: Number(cryptoData.current_price),
                wallet: {
                    balance_spent: {coin: coinSelected.client_coin, quantity: Number(inputRef.current.value)},
                    purchased_balance: {coin: cryptoData.name, quantity: Number(totalReceive)}
                }
            }
            const { success } = await post_transaction(localStorage.getItem('token')!, dataBody)
            if (success) {
                setStatus('done')
                setTimeout(() => setStatus('ready'), 1000)
            } else {
                setStatus('error')
                setTimeout(() => setStatus('ready'), 1000)
            }
        }
    }

    const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        const result = calculatePrice(Number(value))
        setTotalReceive(result)

    }

    const handleChange = (e: any) => {
        setTotalReceive('0')
        inputRef.current.value = '0'
        const { value, name } = e.target
        setCoinSelected({...coinSelected, [name]: value})
    }

    const calculatePrice = (amount?: number) => {
        if (coinSelected.client_coin !== 'EUR') {
            const { current_price }  : ICryptoInfo = allCryptos.filter(element => element.name.toLowerCase() === coinSelected.client_coin.toLowerCase())[0]
            const result = (((amount ?? 1) * current_price) / cryptoData.current_price).toFixed(4)
            return result
        } else {
            if (!amount) return (cryptoData.current_price).toFixed(4)
            return (amount * cryptoData.current_price).toFixed(4)
        }
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <span onClick={() => onClose(false)} className={styles.cross}>{crossSvg()}</span>
                <div className={styles.modal_body_container}>
                    <h3>Buy crypto to your wallet.</h3>
                    <div className={styles.pay_container}>
                        <div>
                            <label>You pay</label>
                            <input ref={inputRef} type='number' onChange={handleChangeAmount} />
                        </div>
                        <select name='client_coin' onClick={handleChange}>
                            <option >EUR</option>
                            {
                                allCryptos?.map(({name, id}) => (
                                    <option key={id}>{ name }</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={styles.rate}>
                        <span>{infoSvg()}</span>
                        <span>Balance: 452 Bitcoin</span>
                    </div>
                    <div className={styles.rate}>
                        <span>{infoSvg()}</span>
                        <span>{`1 ${coinSelected.client_coin} = ${calculatePrice()} ${cryptoData.name}`}</span>
                    </div>
                    <div className={styles.receive_container}>
                        <div>
                            <span>You receive</span>
                            <span>{ totalReceive }</span>
                        </div>
                        <span>{ cryptoData.name }</span>
                    </div>
                </div>
                <button
                    className={`${styles[styles_types[status].type]}`}
                    onClick={handleSellCrypto}
                >
                    {styles_types[status].value}
                </button>
            </div>
        </div>
    )
}
export default Modal
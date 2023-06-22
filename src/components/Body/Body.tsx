import { CryptoContext } from '../../context/CryptoContext'
import CryptoCard from '../CryptoCard/CryptoCard'
import styles from './body.module.scss'
import { useContext, useState, useEffect } from 'react'

const Body = () => {

    const { allCryptos, cryptoData } = useContext(CryptoContext)
    const [updatedCryptoData, setUpdatedCryptoData] = useState(allCryptos)

    useEffect(() => {
        const updatedCrypto = allCryptos.map((element) => {
            let ind: number | undefined = undefined
            const crypto_currency = cryptoData.some((el, index) => {
                
                if (el.id === element.id) {
                    ind = index
                    return true
                }
            })
            if (crypto_currency) {
                return cryptoData[ind!]
            }
            else return element
        })

        setUpdatedCryptoData(updatedCrypto)
    }, [cryptoData])

    return (
        <div className={styles.body_container}>
            <span className={styles.body_title}>Real-time cryptocurrency prices</span>
            <div className={styles.crypto_prices_container}>
                {
                    updatedCryptoData?.map((element) => (
                        <CryptoCard key={element.id} data={element} />
                    ))
                }
            </div>
        </div>
    )
}
export default Body
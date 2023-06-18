import CryptoCard from '../CryptoCard/CryptoCard'
import styles from './body.module.scss'

const Body = () => {
  return (
    <div className={styles.body_container}>
        <span className={styles.body_title}>Real-time cryptocurrency prices</span>
        <div className={styles.crypto_prices_container}>
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
            <CryptoCard />
        </div>
    </div>
  )
}
export default Body
import CryptoCard from '../../components/CryptoCard/CryptoCard'
import NavBar from '../../components/NavBar/NavBar'
import { arrowRotateSvg } from '../../assets/ArrowRotate.svg'
import styles from './home.module.scss'
import Body from '../../components/Body/Body'

const Home = () => {
    return (
        <div className={styles.home_container}>
            <NavBar />
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
                            <input placeholder='0.00' type='number'/>
                            <select>
                                <option>1</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                    <span className={styles.arrow_svg}>
                        {arrowRotateSvg()}
                    </span>
                    <div className={styles.calculator_section}>
                        <div className={styles.exchange_rate}>
                            <span>Exchange rate: </span>
                            <span>{`1 BTCN = 1.3453 ETH`}</span>
                        </div>
                        
                        <div>
                            <span>{"0.00"}</span>
                            <select>
                                <option>dsadsadsa</option>
                                <option>2</option>
                            </select>
                        </div>
                    </div>
                </section>
            </header>
            {/* <div className={styles.crypto_price_container}>
                <CryptoCard />
            </div> */}
            <Body />
        </div>
    )
}
export default Home
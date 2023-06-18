import { crossSvg } from '../../assets/Cross.svg'
import { infoSvg } from '../../assets/Info.svg'
import styles from './modal.module.scss'

interface IProps {
    currencyType: string,
    currentValue: string | number,
    onClose: (value: boolean) => void,
}

const Modal = () => {

    const handleClose = () => {
        
    }

    const handleSellCrypto = () => {

    }

  return (
    <div className={styles.modal_container}>
        <div className={styles.modal}>
            <span onClick={handleClose} className={styles.cross}>{crossSvg()}</span>
            <div className={styles.modal_body_container}>
                <h3>Buy or sell crypto to your wallet.</h3>
                <div className={styles.pay_container}>
                    <div>
                        <label>You pay</label>
                        <input type='number' />
                    </div>
                    <select>
                        <option>Bitcoin</option>
                        <option>Ethereum</option>
                    </select>
                </div>
                <div className={styles.rate}>
                    <span>{infoSvg()}</span>
                    <span>Balance: 452 Bitcoin</span>
                </div>
                <div className={styles.rate}>
                    <span>{infoSvg()}</span>
                    <span>1 Bitcoin = 12.1231 Ethereum</span>
                </div>
                <div className={styles.receive_container}>
                    <div>
                        <span>You receive</span>
                        <span>9.6124553</span>
                    </div>
                    <select>
                        <option>Bitcoin</option>
                        <option>Ethereum</option>
                    </select>
                </div>
            </div>
            <button onClick={handleSellCrypto}>Continue</button>
        </div>
    </div>
  )
}
export default Modal
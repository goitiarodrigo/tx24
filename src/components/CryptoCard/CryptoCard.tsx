import { useState } from 'react'
import { arrowDown } from '../../assets/ArrowDown.svg'
import { sheepSvg } from '../../assets/Sheep.svg'
import styles from './cryptoCard.module.scss'
import Modal from '../Modal/Modal'

const CryptoCard = () => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    return (
        <>
            <article className={`${styles.card_container}`}>
                <span className={`${styles.percentage_state} ${styles.value_down}`}><span>{arrowDown()}</span>{` 0,39%`}</span>
                <span className={styles.currency_type}><img src='./src/assets/coin.png' alt='coin' /> {"Bitcoin "} <span style={{color: 'gray'}}>{`-BTC `}</span></span>
                <div className={styles.difference_container}>
                    <div>
                        <span>Current Value</span>
                        <span style={{backgroundColor: 'transparent'}} className={`${styles.value_down} ${styles.value}`}>{`€29.611557`}</span>
                    </div>
                    <div>
                        <span>24h %</span>
                        <span style={{backgroundColor: 'transparent'}} className={`${styles.value_down} ${styles.percentage}`}>{`1.3%`}</span>
                    </div>
                </div>
                <span onClick={handleOpenModal} className={styles.purchase_container} title='Buy crypto'>
                    <div>
                        {sheepSvg()}
                    </div>
                </span>
                
            </article>
            {
                isOpenModal ? 
                    <Modal />
                :
                    null
            }
        </>
    )
}
export default CryptoCard
import { useState } from 'react'
import { arrowDown } from '../../assets/ArrowDown.svg'
import { sheepSvg } from '../../assets/Sheep.svg'
import styles from './cryptoCard.module.scss'
import Modal from '../PurchaseModal/PurchaseModal'
import { calulatePercetange_old_and_current_price } from '../../utils/calculateValues.util'
import { arrowUp } from '../../assets/ArrowUp.svg'
import { ICrypto } from '../../interfaces/crypto.interface'

const CryptoCard = ({ data }: ICrypto) => {
    const { abbreviation, current_price, old_price, previous_day_price, id, image, name } =  data
    const [isOpenModal, setIsOpenModal] = useState(false)

    const handleOpenModal = () => {
        setIsOpenModal(true)
    }

    const { result, type } = calulatePercetange_old_and_current_price(current_price, old_price)
    const { result: resultPrevANDCurrent, type: typePrevANDCurrent } = calulatePercetange_old_and_current_price(current_price, previous_day_price)

    return (
        <>
            <article className={`${styles.card_container}`}>
                {
                    type === 'positive' ? 
                        <span className={`${styles.percentage_state} ${styles.value_up}`}>
                            <span>{arrowUp()}</span>
                            {`${result.toFixed(2)}% `}
                        </span>
                    :
                        <span className={`${styles.percentage_state} ${styles.value_down}`}>
                            <span>{arrowDown()}</span>
                            {`${result.toFixed(2)}% `}
                        </span>
                }
                <span className={styles.currency_type}><img src={image} alt='coin' /> {name} <span style={{color: 'gray'}}>{` -${abbreviation}`}</span></span>
                <div className={styles.difference_container}>
                    <div>
                        <span>Current Value</span>
                        <span style={{backgroundColor: 'transparent'}} className={`${type === 'positive' ? styles.value_up : styles.value_down} ${styles.value}`}>{`EUR ${(current_price).toFixed(4)}`}</span>
                    </div>
                    <div>
                        <span>24h %</span>
                        <span style={{backgroundColor: 'transparent'}} className={`${typePrevANDCurrent === 'negative' ? styles.value_down : styles.value_up} ${styles.percentage}`}>{`${typePrevANDCurrent === 'negative' ? '↓' : '↑' } ${(resultPrevANDCurrent).toFixed(2)}%`}</span>
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
                    <Modal onClose={setIsOpenModal} cryptoData={data}/>
                :
                    null
            }
        </>
    )
}
export default CryptoCard
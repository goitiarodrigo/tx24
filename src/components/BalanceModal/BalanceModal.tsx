import { useState } from 'react'
import { accredit_balance } from '../../services/crypto.service'
import styles from './balanceModal.module.scss'

const BalanceModal = ({onClose, refetch}: {onClose: (value: boolean) => void, refetch: () => Promise<void>}) => {

    const [isLoading, setIsLoading] = useState(false)

    const handleAccredit = async () => {
        setIsLoading(true)
        const dataBody = {
            user: localStorage.getItem('id'),
            crypto_name: 'EUR',
            balance: 500
        }

        const { success } = await accredit_balance(localStorage.getItem('token')!, dataBody)

        if (success) {
            await refetch()
            setIsLoading(false)
            onClose(false)
        } else {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.modal_container}>
            <div className={styles.modal}>
                <h2>🎉🎊 Congratulations!!. You have won 500 euros for having logged in. 🎊🎉</h2>
                <span>↓ ↓ ↓ To accredit click below  ↓ ↓ ↓ </span>
                <button className={isLoading ? styles.disable : styles.enable} onClick={handleAccredit}>{ isLoading ? 'WAIT' : 'ACCREDIT'}</button>
            </div>
        </div>
    )
}
export default BalanceModal
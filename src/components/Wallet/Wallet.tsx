import styles from './wallet.module.scss'
import { useMemo } from 'react'

interface IProps {
    data: {
        id: number,
        crypto_name: string,
        balance: number
    },
}

const Wallet = ({data }: IProps) => {
    
    const { crypto_name, balance } = data
    

    return (
        <div className={styles.wallet}>
            <h3>{ crypto_name.toUpperCase() }</h3>
            <span>{`${crypto_name.substring(0, 4)} ${balance}`}</span>
        </div>
    )
}
export default Wallet
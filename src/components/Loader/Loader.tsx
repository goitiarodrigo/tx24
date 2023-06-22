import { arrowRotateSvg } from '../../assets/ArrowRotate.svg'
import styles from './loader.module.scss'

const Loader = () => {
  return (
    <div className={styles.loader_container}>
        <div>
            {arrowRotateSvg('60px', '60px')}
        </div>
    </div>
  )
}
export default Loader
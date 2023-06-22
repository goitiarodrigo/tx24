import styles from  './App.module.scss'
import { CryptoProvider } from './context/CryptoProvider'
import Navigation from './routes/Navigation'

function App() {

  return (
    <div className={styles.app_container}>
        <CryptoProvider>
            <Navigation />
        </CryptoProvider>
        
    </div>
  )
}

export default App

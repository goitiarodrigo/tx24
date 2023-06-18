import styles from  './App.module.scss'
import Login from './pages/Login/Login'
import Navigation from './routes/Navigation'

function App() {

  return (
    <div className={styles.app_container}>
      <Navigation />
    </div>
  )
}

export default App

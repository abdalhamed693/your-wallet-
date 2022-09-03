import React from 'react'
import styles from './Home.module.css'
import TransactionForm from './TransactionForm'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useColloction } from '../../hooks/useColloction'
import TransactionList from './TransactionList'
export default function Home() {
  const {user} = useAuthContext()
  const  {documents , error} = useColloction('transaction' , ["uid" , "==" , user.uid] , ["createdAt" , "desc"] )
  console.log(documents);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList tranasctions={documents}/>}
      </div>
      <div className={styles.sidebar}>
       <TransactionForm uid={user.uid}/>
      </div>
    </div>
  )
}

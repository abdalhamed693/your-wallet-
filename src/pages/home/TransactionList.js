import React from 'react'
import styles from './Home.module.css'
import { useFireStor } from '../../hooks/useFireStore'
export default function TransactionList({tranasctions}) {
  const {deleteDocument}=useFireStor('transaction')
  return (
    <ul className={styles.transaction}>
      {tranasctions.map((transaction)=>(
        <li key={transaction.id}>
          <p className={styles.name}>{transaction.name}</p>
          <p className={styles.amount}>${transaction.amount}</p>
          <button onClick={()=>deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}

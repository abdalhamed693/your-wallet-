import React from 'react'
import { useState , useEffect } from 'react'
import { useFireStor } from '../../hooks/useFireStore'
export default function TransactionForm({uid}) {
    const [name , setName] = useState('')
    const [amount , setAmount] = useState('')
    const {addDocument , response}= useFireStor('transaction')

    const handelSubmit = (e)=>{
        e.preventDefault()
        addDocument({
            uid ,
            name , 
            amount
        });
    }
       useEffect(() => {
         if (response.success) {
          setName('')
          setAmount('')
         }
       }, [response.success])

       
  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handelSubmit}>
        <label>
            <span>Transaction name:</span>
            <input
            type="text"
            required
            onChange={(e)=> setName(e.target.value)}
            value={name}
            />
        </label>
        <label>
            <span>Amount ($):</span>
            <input
            type="number"
            required
            onChange={(e)=> setAmount(e.target.value)}
            value={amount}
            />
        </label>
        <button type='submit'>Add Transaction</button>
      </form>
    </>
  )
}

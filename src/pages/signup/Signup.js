import React from 'react'
import { useState } from 'react'
import { useSingup } from '../../hooks/useSinguo'
import styles from './Signup.module.css'
export default function Signup() {
  const [dispalyName , setDisplayName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const {error,isPinding,singup} = useSingup()
  const handelSubmit =(e)=> {
    e.preventDefault()
    singup( email , password,dispalyName);
  }
  return (
    <form onSubmit={handelSubmit} className={styles['singup-form']}>
      <h2>Singup</h2>
      <label>
        <span>Display Name</span>
        <input
        type="text"
        onChange={(e)=> setDisplayName(e.target.value)}
        value={dispalyName}
        />
      </label>
      <label>
        <span>Email</span>
        <input
        type="email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
        <span>Password</span>
        <input
        type="password"
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
        />
      </label>
      {!isPinding&&<button className='btn' type='Submit'>Singup</button>}
      {isPinding&&<button className='btn'>loding</button>}
      {error&& error}
    </form>
  )
}

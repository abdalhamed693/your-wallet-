import React from 'react'
import { useState } from 'react'
import styles from './Login.module.css'
import { useLogin } from '../../hooks/useLogin'
export default function Login() {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const {error,isPinding,login} = useLogin()

  const handelSubmit = (e)=>{
    e.preventDefault()
    login(email , password);
  }

  return (
    <form className={styles['login-form']} onSubmit={handelSubmit}>
      <h2>login</h2>
      <label>
        <span>Email</span>
        <input
        type="email"
        onChange={(e)=> setEmail(e.target.value)}
        value={email}
        />
      </label>
      <label>
        <span>password</span>
        <input
        type="password"
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
        />
      </label>
     {!isPinding && <button type='Submit' className='btn'>login</button>}
     {isPinding && <button className='btn' disabled>loading</button>}
     {error&&<p>{error}</p>}
    </form>
  )
}

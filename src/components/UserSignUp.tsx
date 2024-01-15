import React from 'react'
import { api } from '~/utils/api'
import { useState } from 'react';

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [secret_hash, setSecret_hash] = useState("");
  const [mobile, setMobile] = useState("")  
  const signUpMutation = api.signUp.createUser.useMutation()
    function usercreate(){
      signUpMutation.mutate({
        name,
        secret_hash, 
        email,
        mobile
      })
    }
  return (
    <div>
      <form onSubmit={ (e) => {
        e.preventDefault()
        usercreate()
      }}>

        <input 
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type='email'
          placeholder='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}     
        />
        
        <input
          type='password'
          placeholder='password'
          value={secret_hash}
          onChange={(e) => setSecret_hash(e.target.value)}
         />

        <input
          type='tel' 
          placeholder='phone'
          value={mobile}
          onChange={(e) => setMobile(e.target.value)} 
         />
        <input type='submit'  />
      </form>
    </div>
  )
}

export default UserSignUp
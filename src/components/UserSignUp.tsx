import React from 'react'
import { api } from '~/utils/api'
import { useState } from 'react';

const UserSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [secret_hash, setSecret_hash] = useState("");
  const [mobile, setMobile] = useState("")  

  //Use SingUp to create a new user
  const signUpMutation = api.signUp.createUser.useMutation()

  //create a new user

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
       
       //After you send the form data, the frontend will redirect you to the next form to update the extra data
       e.preventDefault()
        usercreate()
       
        window.location.href = "/";
       
       
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
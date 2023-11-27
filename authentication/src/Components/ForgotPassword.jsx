//This is frontend

import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"

const ForgotPassword = () => {
    // For Registration 
const [email,setEmail ] = useState()

const navigate = useNavigate();

axios.defaults.withCredentials =true;  
const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post('http://localhost:3001/forgot-password', {email})
  .then(result=>{
    console.log(result);
    if(result.data === "Successfully Logged in"){
        navigate('/login', { replace: true })
    }
})
.catch(err=>console.log(err))
}
  return (
    
    <>
    <div className='logIn'>
       <form method="POST" className="form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <div className="siginup">
            <h1 className="my-3">Forgot Password</h1>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            // value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <input
          type="submit"
          name="signup"
          id="signup"
          value="Send"
          className="btn btn-primary"
          // onClick={loginUser}
        ></input>
      </form> 
    </div>
    </>
  )
}

export default ForgotPassword


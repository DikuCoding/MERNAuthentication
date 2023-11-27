//This is frontend

import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"

const Login = () => {
    // For Registration 
// const [name,setName ] = useState()
const [email,setEmail ] = useState()
const [password,setPassword ] = useState()

const navigate = useNavigate();

axios.defaults.withCredentials =true;  
const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post('https://deploy-mern-authentication-api-xi.vercel.app/login', {email,password})
  .then(result=>{
    console.log(result);
    if(result.data === "Successfully Logged in"){
        navigate('/home', { replace: true })
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
            <h1 className="my-3">Login</h1>
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
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password "
            name="password"
            // value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
          />
        </div>
        <input
          type="submit"
          name="signup"
          id="signup"
          value="Log In"
          className="btn btn-primary"
          // onClick={loginUser}
        ></input>
      </form> 
      {/* <p>Already have an account</p> */} <br /><br />
      <Link to="/forgot-password">Forgot Password</Link>
      <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0'>Signup</Link>
    </div>
    </>
  )
}

export default Login

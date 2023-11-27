//This is frontend

import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom"


const ResetPassword = () => {
    // For Registration 
const [password,setPassword ] = useState()
const navigate = useNavigate();
const {id, token} = useParams()

axios.defaults.withCredentials =true;  
const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post('deploy-mern-authentication-api-xi.vercel.app
/reset-password/${id}/${token}', {password})
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
           New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="email"
            name="email"
            // value={email}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <input
          type="submit"
          name="signup"
          id="signup"
          value="Update"
          className="btn btn-primary"
          // onClick={loginUser}
        ></input>
      </form> 
    </div>
    </>
  )
}

export default ResetPassword


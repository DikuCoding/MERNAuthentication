import React from 'react'
import { useState } from 'react'
import axios from 'axios' 
import {Link, useNavigate} from "react-router-dom"

const Signup = () => {
     // For Registration 
const [name,setName ] = useState()
const [email,setEmail ] = useState()
const [password,setPassword ] = useState();

const navigate = useNavigate();

const handleSubmit =(e)=>{
  e.preventDefault();
  axios.post('deploy-mern-authentication-api-xi.vercel.app
/register', {name,email,password})
  // .then(result=>{console.log(result)
  .then(res=>{alert("Account Created")
      navigate('/login')
})
   .catch(err=>console.log(err))
}
  return (
    <div className='signup'>
      <div>
      <h2>Register</h2>
      <form className='form' onSubmit={handleSubmit}>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Name</label>
    <input type="text" className="form-control"  aria-describedby="emailHelp"
    name='name'
    onChange={(e)=>setName(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control"  aria-describedby="emailHelp"
    name='email'
    onChange={(e)=>setEmail(e.target.value)}/>
  </div>
  <div className="mb-3">
    <label for="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1"
    name='password'
    onChange={(e)=>setPassword(e.target.value)}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
    <label className="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-success">Submit</button>
</form>
    </div>
    </div>
  )
}

export default Signup

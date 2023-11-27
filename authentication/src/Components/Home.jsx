import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  axios.defaults.withCredentials =true;
  const navigate = useNavigate();
  //for authentication
  useEffect(()=>{
    axios.get('https://deploy-mern-authentication-api-xi.vercel.app
/home')
    .then(result=>{console.log(result)
      if(result.data !=="Successfully Logged in"){
        navigate('/login',{replace:true})
      }
  })
     .catch(err=>console.log(err))
  },[])
  return (
    <div className='home'>
     <h2>This is Home page</h2>
    </div>
  )
}

export default Home

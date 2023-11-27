import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

const ShowData = () => {
const [users, setUsers] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:3001/getUsers')
        .then(users=> setUsers(users.data))
        .catch(err => console.log(err))
    },[])
  return (
    <div className='usersData w-100 vh-100 d-flex justify-content-center align-items-center'>
        <div className='w-50'>
        <h2>This is a data from database.</h2>
      <table className='table my-4'>
        <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Password</th>
        </tr>
        </thead>
        <tbody>
            {
                users.map(user =>{
                   return <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                    </tr>
                })
            }
        </tbody>
        
      </table>
      </div>
    </div>
  )
}

export default ShowData

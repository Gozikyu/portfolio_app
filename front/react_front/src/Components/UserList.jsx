import React, { useEffect, useState } from 'react'
import User from './User'
import axios from 'axios'
const UserList = () => {

  const [users, setUsers] = useState([])

  useEffect(()=> {
      axios.get('http://localhost:3001/users')
      .then((results) => {
        console.log(results)
        setUsers(results.data)
      })
      .catch((data) =>{
        console.log(data)
      })
    }
  )

  return(
    <div className='userList'>
        {users.map((data) => {
          return(
              <User data={ data } key={ data.id } />
          )
        })}
    </div>
  )
}

export default UserList;
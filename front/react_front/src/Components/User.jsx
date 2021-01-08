import React from 'react'

const User = (props) => {

  console.log(props.data)

  return(
    <div>
      <span>{ props.data.name }</span>
    </div>
  )
  
}
export default User
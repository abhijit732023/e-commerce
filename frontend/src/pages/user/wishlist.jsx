import React, { useEffect, useState } from 'react'
import {Container, ENV_File, useAuth} from '../../FilesPaths/all_path'
import axios from 'axios'
import { Link } from 'react-router-dom'


function Wish_List() {
  const{user}=useAuth()
  const [userid, setUserid] = useState([])
  // Removed console.log(user._id) here to avoid error when user is undefined
  
console.log(user);

useEffect(() => {
  if (user) {
    console.log('user', user);
    setUserid(user._id);  // Set the user ID if the user is logged in
  }
}, [user]);

  return (
    <Container>
      <Link to={`/cart/${userid}`}>
      
      cart
      </Link>


    </Container>
  
  )
}

export default Wish_List

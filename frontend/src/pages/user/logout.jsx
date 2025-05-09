import React from 'react'
import { useAuth } from '../../FilesPaths/all_path'
function Logout() {
    const{logout}=useAuth()
  return (
    <div>
      <button
       onClick={logout}>logout</button>
    </div>
  )
}

export default Logout

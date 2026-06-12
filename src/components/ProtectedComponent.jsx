import { useAuth } from '@/context/AuthContext'
import React from 'react'

function ProtectedComponent({children}) {
    const {user} = useAuth()

    if (!user) {
        return <p>Please Log in to view this</p>
    }
  return (
<>
    {children}
</>
  )
}

export default ProtectedComponent

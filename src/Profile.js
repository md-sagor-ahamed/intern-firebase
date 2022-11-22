import React from 'react'
import { AuthContext } from './context/Auth.context'

export const Profile = () => {
    const currentUser = React.useContext(AuthContext)
    return <pre>{JSON.stringify(currentUser, null, 2)}</pre>
}
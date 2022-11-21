import React from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../utils/firebase.config'

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(null)
    React.useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            console.log(user)
            setCurrentUser(user)
        })
    }, [])
    // const currentUser = auth.currentUser


  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
}
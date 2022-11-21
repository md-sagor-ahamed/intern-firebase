import React from 'react';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import {  Nav } from './Nav'
import { Register } from './Register'
import { Login } from './Login'
import { ForgotPassword } from './ForgotPassword'
import { ResetPassword } from './ResetPassword'
import { Profile } from './Profile'
import { Private } from './Private'
import { AuthProvider, AuthContext } from './context/Auth.context'
import { Fade } from '@mui/material';

const AuthRequired = ({children}) => {
  const location = useLocation()
  const currentUser = React.useContext(AuthContext)
  if(currentUser){
    return children
  }else{
    return <Navigate to='/login' state={{ from: location.pathname }} />//
  }
}

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top', horizontal: 'right'}} TransitionComponent={Fade}>
    <AuthProvider>
      <BrowserRouter>
      <Nav />
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<AuthRequired><Profile /></AuthRequired>} />
          <Route path='/private' element={<AuthRequired><Private /></AuthRequired>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;

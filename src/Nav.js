import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth"

import { auth } from './utils/firebase.config'
import { AuthContext } from './context/Auth.context'


export const Nav = () => {
    const navigate = useNavigate()
    const {currentUser} = React.useContext(AuthContext)
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Firebase Auth
            </Typography>
            
            {!currentUser && (
                <>
                            <Button component={NavLink} to='/notes' sx={{
                            '&.active':{
                                bgColor: 'primary.dark'
                            }
                        }} color="inherit">Notes</Button>
                        <Button component={NavLink} to='/register' sx={{
                            '&.active':{
                                bgColor: 'primary.dark'
                            }
                        }} color="inherit">Register</Button>
                        <Button component={NavLink} to='/login' sx={{
                            '&.active':{
                                bgColor: 'primary.dark'
                            }
                        }} color="inherit">Login</Button>
                </>
            )}
            {currentUser && (
                <>
                    <Button component={NavLink} to='/notes' sx={{
                            '&.active':{
                                bgColor: 'primary.dark'
                            }
                        }} color="inherit">Notes</Button>
                    <Button component={NavLink} to='/profile' sx={{
                        '&.active':{
                            bgColor: 'primary.dark'
                        }
                    }} color="inherit">Profile</Button>
                    <Button component={NavLink} to='/notes/add' sx={{
                        '&.active':{
                            bgColor: 'primary.dark'
                        }
                    }} color="inherit">Add Note</Button>
                    <Button component={NavLink} to='/private' sx={{
                        '&.active':{
                            bgColor: 'primary.dark'
                        }
                    }} color="inherit">Private</Button>
                    <Button onClick={() => {
                        signOut(auth)
                        navigate("/login")
                    }} color="inherit">Logout</Button>
                </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    )
}


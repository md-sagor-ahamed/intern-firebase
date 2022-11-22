import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as Navigate, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { useSnackbar } from 'notistack';

import { auth } from "./utils/firebase.config"


export const Register = () => {
    const [userInfo, setUserInfo] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const handleChange = e => {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      })
    }

    const googleSingIn = async () => {
      const provider = new GoogleAuthProvider()
      try{
        await signInWithPopup(auth, provider)
        enqueueSnackbar("Register Sucessfull, Please login", {variant: 'success'})
        navigate('/profile')
      }catch(err){
        enqueueSnackbar(err.message, {variant: 'error'})
      }
    }

    const handleSubmit = async e => {
      e.preventDefault()
      //submitting to firebase
      try{
        const user = await createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        updateProfile(auth.currentUser, {
          displayName: userInfo.firstName + " " + userInfo.lastName
        })
        enqueueSnackbar("Register Sucessfull, Please login", {variant: 'success'})
        navigate('/profile')
        // setSuccess(true)
        console.log(user)
      }catch(err){
        enqueueSnackbar(err.message, {variant: 'error'})
      }
    }
    return (
    
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={handleChange}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={Navigate} to='/login' href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
          <Button
              type="submit"
              fullWidth
              onClick={googleSingIn}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In with Google
            </Button>
        </Box>
      </Container>
    )
}



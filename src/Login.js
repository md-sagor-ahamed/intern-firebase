
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
import { Link as Navigate, useNavigate, useLocation } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from 'notistack';

import { auth } from "./utils/firebase.config"



export const Login = () => {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
        password: ''
    })
    const {state} = useLocation()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()
    const handleChange = e => {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async e => {
      e.preventDefault()
      //submitting to firebase
      try{
        await signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        enqueueSnackbar("Login successfull", {variant: 'success'})
        navigate(state?.from || '/profile')
        // setSuccess(true)
      }catch(err){
        console.log(err.message)
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={Navigate} to='/forgot-password' href="#" variant="body2">
                  Forgot Password? Reset Password
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    )
}


import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth';


import { auth } from "./utils/firebase.config"


export const ForgotPassword = () => {
    const [userInfo, setUserInfo] = React.useState({
        email: '',
    })
    // const {state} = useLocation()
    const navigate = useNavigate()

    const handleChange = e => {
      setUserInfo({
        ...userInfo,
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      // submitting to firebase
      try{
        await sendPasswordResetEmail(auth, userInfo.email)
        console.log('password reset email successfully sent')
        navigate('/login')
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
            Reset Password
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Container>
    )
}
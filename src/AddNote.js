import { Button, Container, TextField, Typography, Box } from '@mui/material'
import React from 'react'
import { addDoc, Timestamp } from 'firebase/firestore'
import { notesColRef } from './utils/firebase.config'
import { AuthContext } from './context/Auth.context'
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom'

export default function AddNote() {
  const [note, setNote] = React.useState({
    title: '',
    description: '',
  })
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const { currentUser } = React.useContext(AuthContext)

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    addDoc(notesColRef, {
      ...note,
      createdAt: Timestamp.fromDate(new Date()),
      user: {
        id: currentUser.uid,
        displayName: currentUser.displayName 
      }
    }).then(() => {
      navigate('/notes')
      enqueueSnackbar("Note added successfully", {variant: 'success'})
      console.log("Note added successfully")
    }).catch((err) => {
      enqueueSnackbar(err.message, {variant: 'error'})
    })
  }
  return (
    <Container maxWidth="xs">
      <Typography 
      variant="h5" 
      component="h1" 
      textAlign="center" 
      sx={{ mt: 2, color: "text.secondary"}}
      >
      Add A Note
      </Typography>
      <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ ml: 3, display: "block", flexDirection: "colum", gap: 2}}
      >
        <TextField 
        name="title"
        label="Title"
        variant="filled"
        onChange={handleChange}
        value={note.title}
        fullWidth
        required
        sx={{marginBottom: "10px"}}
      
        />
        <TextField
        multiline
        fullWidth
        required
        value={note.description}
        name="description"
        variant="filled"
        label="Description"
        onChange={handleChange}
        rows="5"
        />
        <Button color="primary" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit">Add a Note</Button>
      </Box>
    </Container>
  )
}

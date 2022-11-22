import { Button, Container, TextField, Typography, Box } from '@mui/material'
import React from 'react'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { notesColRef } from './utils/firebase.config'
import { AuthContext } from './context/Auth.context'
import { useSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom'


export default function EditNote() {
  const [note, setNote] = React.useState({
    title: '',
    description: '',
  })

  const { noteId } = useParams()

  React.useEffect(()=> {
    (async () => {
      const docRef = doc(notesColRef, noteId);
      const currentDoc = await getDoc(docRef);
      if(currentDoc.exists){
        const data = currentDoc.data();
        console.log("Document exist", data)
        setNote({
          ...data,
        })
      }
    })();
  }, [noteId])
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const { currentUser } = React.useContext(AuthContext)

  const handleChange = (e) => {
    setNote({
      ...note,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const docRef = doc(notesColRef, noteId);
    if(note.user.id === currentUser.uid){
      await updateDoc(docRef, {
        ...note,
      });
      navigate('/notes')
      enqueueSnackbar("Note update successfully", {variant: 'success'})
      console.log("Note added successfully")
    }else{
      enqueueSnackbar("Note update failed", {variant: 'error'})
    }
  }
  return (
    <Container maxWidth="xs">
      <Typography 
      variant="h5" 
      component="h1" 
      textAlign="center" 
      sx={{ mt: 2, color: "text.secondary"}}
      >
      Edit Note
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
        <Button color="primary" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} type="submit"> update Note </Button>
      </Box>
    </Container>
  )
}

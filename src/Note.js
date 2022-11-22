import { CardHeader, Card, IconButton, CardContent, Avatar, Menu, MenuItem, Typography } from '@mui/material'
import React from 'react'
import { MoreVert as MoreVertIcon } from  '@mui/icons-material'
import { red } from  '@mui/material/colors'
import { Link } from 'react-router-dom'
import { AuthContext } from './context/Auth.context'
import { doc, deleteDoc } from 'firebase/firestore'
import { notesColRef } from './utils/firebase.config'


export default function Note({note}) {
    const [ anchorEl, setAnchorEl] = React.useState(null)
    const { currentUser } = React.useContext(AuthContext)
    const checkOwnerShip = currentUser?.uid === note.user.id

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const handleDelete = async () => {
       const docRef = doc(notesColRef, note.id)
       try {
        if(checkOwnerShip){
            await deleteDoc(docRef)
            console.log("Note deleted successfully")
        }
       }catch(err){
        console.log(err.message)
       }
    }
    console.log(note)
  return (
    <Card variant="outlined">
        <CardHeader
         avatar={
            <Avatar sx={{bgcolor: red[500]}} arial-label="recipe" >
                {note?.user?.displayName[0].toUpperCase()}
            </Avatar>
        }
        action={
                checkOwnerShip? (
                <IconButton onClick={handleClick} arial-label="settings" >
                    <MoreVertIcon />
                </IconButton>
                ) : null
        }
        title = {note.user?.displayName}
        subheader={note.createdAt.toDate().toLocaleDateString()}
        >
        </CardHeader>
        <CardContent>
            <Menu
            onClose={handleClose}
            onClick={handleClose}
            open={Boolean(anchorEl)}
            anchorEl = {anchorEl}
            transformOrigin={{ horizontal: "right", vertical: "top"}}
            anchorOrigin = {{ horizontal: "right", vertical: "bottom"}}
            >
                <MenuItem component={Link} to={`edit/${note.id}`}>
                    Edit
                </MenuItem>
                <MenuItem onClick={handleDelete} component={Link} to={`edit/${note.id}`}>
                    Delete
                </MenuItem>
            </Menu>
            <Typography variant="h4" color="text.secondary">
                {note.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                {note.description}
            </Typography>
        </CardContent>
    </Card>
  )
}

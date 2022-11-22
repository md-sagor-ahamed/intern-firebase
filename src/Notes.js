import { Container, Grid } from '@mui/material'
import React from 'react'
import { NoteContext } from './context/Note.context'
import Note from './Note'

export default function Notes() {
    const { notes } = React.useContext(NoteContext)
  return (
    <Container sx={{ mt: 2 }}>
        <Grid container spacing={2}>
            {notes &&
            notes.map((note) => {
                return (
                    <Grid item sm={4} key={note.id}>
                        <Note note={note} />
                    </Grid>
                )
            })
            }
        </Grid>
    </Container>
  )
}

import { FormEvent, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface AddPropTypes {
    handleAddSubmit: (url: string) => void
}

export default function AddRowDialog(props: AddPropTypes) {
    const { handleAddSubmit } = props

    const [open, setOpen] = useState(false)
    const [isValid, setIsValid] = useState(true)
    const [url, setUrl] = useState('')

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const isValidUrl = (url: string) => {
        try {
            return Boolean(new URL(url))
        } catch (e) {
            return false
        }
    }

    const handleTextFieldChange = (e: FormEvent<EventTarget>) => {
        const element = e.currentTarget as HTMLInputElement
        const url = element.value
        if (isValidUrl(url)) {
            setUrl(url)
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }

    const handleSubmit = () => {
        setOpen(false)
        handleAddSubmit(url)
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Row
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle>Shorten a URL</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the URL that you wish to shorten here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="https://"
                        error={!isValid}
                        type="url"
                        fullWidth
                        variant="standard"
                        onChange={handleTextFieldChange}
                        helperText="Enter a valid URL"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} disabled={!isValid}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

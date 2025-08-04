import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'

const MessageBox = (props) => {
  
    const handleClose = (event, reason) =>
    {
        if (reason === 'clickaway')
        {
            return;
        }
        props.setSnackbarOpen(false);
    }

    return (
    <>
            <Snackbar open={props.snackbarOpen} autoHideDuration={6000} onClose={handleClose}>
                                <Alert
                                    onClose={handleClose}
                                    severity={props.boxType}
                                    variant="filled"
                                    sx={{ width: '100%' }}
                                >
                                    {props.boxMessage}
                                </Alert>
        </Snackbar>
    </>
  )
}

export default MessageBox

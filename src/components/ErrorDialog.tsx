import { useStore } from "@/store"
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Divider, Typography } from "@mui/material"

const ErrorDialog = () => {
    const { message, error, removeError, showError, show } = useStore((state) => state)

    const handleClose = () => {
        showError(false)

        setTimeout(() => {
            removeError()
        }, 100)
    }

    return (
        <Dialog open={show!} maxWidth="sm" fullWidth>
            <DialogTitle>Error</DialogTitle>
            <Divider />
            <DialogContent>
                <Typography fontWeight="bold" variant="h6" mb={3}>{message}</Typography>
                <Typography color="error">Technical details:</Typography>
                <Typography variant="subtitle2">{error?.toString()}</Typography>
            </DialogContent>
            <DialogActions sx={{p: 2}}>
                <Button color="orange" variant="text" sx={{fontWeight: "bold"}} onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorDialog
import { Snackbar } from "@mui/material"
import { Dispatch, SetStateAction, useState } from "react"

type RenderFunction = () => JSX.Element
type SetState<T> = Dispatch<SetStateAction<T>>

const useSnackbar = (): [renderSnackbar: RenderFunction, showAlert: SetState<boolean>, setMessage: SetState<string>] => {
    const [showAlert, setShowAlert] = useState<boolean>(false)
    const [message, setMessage] = useState<string>("")

    const handleClose = () => {
        setShowAlert(false)
        setMessage("")
    }

    const renderSnackbar = () => {
        return (
            <Snackbar 
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                autoHideDuration={2000}
                open={showAlert}
                message={message}
                onClose={handleClose}
            />
        )
    }

    return [renderSnackbar, setShowAlert, setMessage]
}

export default useSnackbar
import { useState } from "react"
import { Box, Container, Typography, useTheme, Button, Paper, Stack, CircularProgress} from "@mui/material"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useNavigate } from "react-router-dom"
import UrlStats from "@/components/UrlStats"
import { IUrlStats } from "@/models/IUrlStats"
import Navbar from "@/components/Navbar"
import TextInput from "@/components/TextInput"
import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { IShortUrlSchema, ShortUrlSchema } from "@/models/UrlInput.schema"
import { IResponseData, IResponseDataError } from "@/models/IResponseData"
import { getEnv } from "@/utils/getEnv"
import { getError } from "@/utils/getError"
import { useStore } from "@/store"
import useSnackbar from "@/hooks/useSnackbar"

const defaultValue = {
    shortUrl: ""
}

const UrlTracker = () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [renderSnackbar, showSnackbar, setMessage] = useSnackbar()
    const [urlStats, setUrlStats] = useState<IUrlStats | null>(null)
    const [tracking, setTracking] = useState<boolean>(false)
    const setDialogError = useStore((state) => state.setError)
    const { control, handleSubmit, reset } = useForm<IShortUrlSchema>({
        mode: "all",
        reValidateMode: "onChange",
        defaultValues: defaultValue,
        resolver: yupResolver<IShortUrlSchema>(ShortUrlSchema)
    })

    const handleTrackUrl = async (data: IShortUrlSchema) => {
        const urlTag = data.shortUrl!.split("/")

        setTracking(true)
        try {
            const { data:urlStats } = await axios.post<IResponseData>(`${getEnv("server_url")}${getEnv("server_uri")}/track`, {
                tag: urlTag[urlTag.length-1]
            })

            if(!urlStats.data) {
                setMessage("Short URL is invalid or does not exist")
                showSnackbar(true)
                return
            }

            setUrlStats(urlStats.data)
            reset()
        } catch (e) {
            const error = e as AxiosError<IResponseDataError>

            setDialogError(getError(error))
        }
        finally {
            setTracking(false)
        }
    }

    return (
        <>
            {renderSnackbar()}
            <Navbar />
            <Box pb={7} pt={3}>
                <Container>
                    <Button startIcon={<ArrowBackIosNewIcon />} color="orange" variant="text" sx={{mb: 3}} onClick={() => navigate("/")}>
                        Back
                    </Button>

                    <Typography variant="h4" sx={{color: theme.palette.orange.main}} mb={3}>
                        URL Tracker
                    </Typography>

                    <Box py={2} px={3} component={Paper} elevation={2}>
                        <TextInput
                            control={control}
                            name="shortUrl"
                            fullWidth
                            size="small"
                            label="Enter short link"
                            color="orange"
                            sx={{mb: 1}}
                            InputProps={{
                                endAdornment: 
                                <Button
                                    disableElevation
                                    variant="text"
                                    size="small"
                                    color="orange"
                                    sx={{fontWeight: "bold"}}
                                    onClick={handleSubmit(handleTrackUrl)}
                                >
                                    Track
                                </Button>
                            }}
                            disabled={tracking}
                        />

                        {tracking && <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                            <Typography variant="subtitle1">Tracking URL...</Typography>
                            <CircularProgress size={20} color="orange"/>
                        </Stack>}
                        {urlStats && <UrlStats urlStats={urlStats}/>}
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default UrlTracker
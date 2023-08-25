import { Grid, Typography, Container, Paper, Button, Box, Stack, CircularProgress, Divider } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import ShrinkedUrl from "@/components/ShrinkedUrl";
import axios, { AxiosError } from "axios";
import { getEnv } from "@/utils/getEnv";
import { IUrlStats } from "@/models/IUrlStats";
import { IResponseData, IResponseDataError } from "@/models/IResponseData";
import { getError } from "@/utils/getError";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"
import { useStore } from "@/store";
import TextInput from "./TextInput";
import { ILongUrlSchema, LongUrlSchema } from "@/models/UrlInput.schema";

const defaultValue = {
    longUrl: ""
}

const UrlInput = () => {
    const [shrinking, setShrinking] = useState<boolean>(false);
    const [shortenedUrl, setShortenedUrl] = useState<IUrlStats | null>(null);
    const setDialogError = useStore((state) => state.setError)
    const navigate = useNavigate()
    const { control, handleSubmit, reset } = useForm<ILongUrlSchema>({
        defaultValues: defaultValue,
        mode: "all",
        reValidateMode: "onChange",
        resolver: yupResolver<ILongUrlSchema>(LongUrlSchema)
    })

    const handleShrinkUrl = async (data: ILongUrlSchema) => {
        setShrinking(true)
        try {
            const { data: shortenedUrl } = await axios.post<IResponseData>(`${getEnv("server_url")}${getEnv("server_uri")}`, { longUrl: data.longUrl })

            setShortenedUrl(shortenedUrl.data)
            reset()
            window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" })
        } catch (e) {
            const error = e as AxiosError<IResponseDataError>
            
            setDialogError(getError(error))
        }
        finally {
            setShrinking(false)
        }
    }

    return (
        <Container sx={{pb: 7, pt: 3}}>
            <Grid container justifyContent="center">
                <Grid item xs={12} component={Paper} py={2} px={3} elevation={2}>
                    <Typography variant="subtitle1" fontWeight="bold">
                        Enter or paste link
                    </Typography>

                    <Box py={1}>
                        <TextInput
                            control={control}
                            name="longUrl"
                            fullWidth
                            size="small"
                            label="Enter link"
                            color="orange"
                            InputProps={{
                                endAdornment: 
                                <Button
                                    disableElevation
                                    variant="text"
                                    size="small"
                                    color="orange"
                                    sx={{fontWeight: "bold"}}
                                    onClick={handleSubmit(handleShrinkUrl)}
                                >
                                    Shorten
                                </Button>
                            }}
                            disabled={shrinking}
                        />
                    </Box>

                    {shrinking && <Stack direction="row" justifyContent="center" alignItems="center" gap={1}>
                        <Typography variant="subtitle1">Shrinking URL...</Typography>
                        <CircularProgress size={20} color="orange"/>
                    </Stack>}
                    <ShrinkedUrl urlStats={shortenedUrl}/>

                    <Divider textAlign="center" sx={{my: 2}}>
                        <small>OR</small>
                    </Divider>
                    
                    <Stack alignItems="center" gap={1}>
                        <Typography>Track URL visits</Typography>
                        <Button variant="text" color="orange" sx={{fontWeight: "bold"}} onClick={() => navigate("/url-tracker")}>URL Tracker</Button>
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    )
}

export default UrlInput
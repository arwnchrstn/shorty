import { Box, Button, Typography, useTheme, Grid } from "@mui/material"
import { IUrlStats } from "@/models/IUrlStats";
import axios, { AxiosError } from "axios";
import { IResponseDataError } from "@/models/IResponseData";
import { useStore } from "@/store";
import { getError } from "@/utils/getError";
import { useNavigate } from "react-router-dom";
import { getEnv } from "@/utils/getEnv";

interface IUrlStatsProps {
    urlStats: IUrlStats | null
}

const UrlStats = ({ urlStats }: IUrlStatsProps) => {
    const theme = useTheme()
    const setDialogError = useStore(state => state.setError)
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await axios.delete(`${getEnv("server_url")}${getEnv("server_uri")}/${urlStats?.shortUrlTag}`)
        } catch (e) {
            const error = e as AxiosError<IResponseDataError>

            setDialogError(getError(error))
        }
        finally {
            navigate("/")
        }
    }

    return (
        <Box pt={2}>
            <Grid container>
                <Grid item xs={12} md={3} display="flex" justifyContent="center">
                    <Box 
                        component="img"
                        sx={{
                            aspectRatio: 1/1,
                            width: "70%"
                        }}
                        src={urlStats?.qrCode}
                        alt={`${window.location.origin}/${urlStats?.shortUrlTag}`}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    <Typography fontWeight="bold" sx={{color: theme.palette.orange.main}} noWrap>
                        {window.location.origin}/{urlStats?.shortUrlTag}
                    </Typography>
                    <Typography variant="subtitle2" fontWeight="bold" noWrap>{urlStats?.actualUrl}</Typography>
                    <Button variant="contained" color="error" size="small" sx={{my: 2}} onClick={handleDelete}>Delete URL</Button>
                    <Typography>Total Visits:</Typography>
                    <Typography variant="h2" sx={{color: theme.palette.orange.main}}>{urlStats?.visitCount}</Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UrlStats
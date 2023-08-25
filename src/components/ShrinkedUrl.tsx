import { Stack, Typography, useTheme, Button, Box } from "@mui/material"
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IUrlStats } from "@/models/IUrlStats";
import useSnackbar from "@/hooks/useSnackbar";

type IShrinkedUrlProps = {
    urlStats: Partial<IUrlStats> | null
}

const ShrinkedUrl = ({ urlStats }: IShrinkedUrlProps) => {
    const theme = useTheme()
    const [renderSnackbar, showSnackbar, setMessage] = useSnackbar()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${window.location.origin}/${urlStats?.shortUrlTag}`)
        showSnackbar(true)
        setMessage("Copied to clipboard")
    }

    if(!urlStats) return

    return (
        <Stack alignItems="center" py={1} gap={0}>
            {renderSnackbar()}

            <Typography sx={{color: theme.palette.orange.main}} variant="h6" fontWeight="bold">
                Shortened URL
            </Typography>
            <Box 
                component="img"
                sx={{
                    aspectRatio: 1/1,
                    height: 200
                }}
                src={urlStats.qrCode}
                alt={`${window.location.origin}/${urlStats?.shortUrlTag}`}
            />
            <Typography>
                {window.location.origin}/{urlStats.shortUrlTag}
            </Typography>
            <Button disableElevation variant="contained" size="small" color="orange" endIcon={<ContentCopyIcon />} onClick={copyToClipboard}>
                Copy
            </Button>
        </Stack>
    )
}

export default ShrinkedUrl
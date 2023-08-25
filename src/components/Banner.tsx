import { Box, Container, Grid, Typography, useTheme, Button } from "@mui/material"
import linkImg from "@/assets/link_short.png";

const Banner = () => {
    const theme = useTheme(); 

    return (
        <Box>
            <Container>
                <Grid container py={4}>
                    <Grid item xs={12} md={8} display="flex" flexDirection="column" justifyContent="center" alignItems="flex-start">
                        <Typography variant="h3" mb={3}>
                            Shorten URLs using <b style={{color: theme.palette.orange.main}}>Shor.ty</b>
                        </Typography>
                        <Typography variant="h6" pb={1}>
                            Shor.ty will help you shorten long URLs from different websites and share them much easier
                        </Typography>
                        <Typography variant="subtitle1" pb={1}>
                            This tool is written using React and TypeScript, click the button below to view the source code
                        </Typography>
                        <Button disableElevation variant="contained" size="small" color="orange">
                            View Source Code
                        </Button>
                    </Grid>
                    <Grid item xs={12} md={4} display={{xs: "none", md: "block"}}>
                        <Box component="img" src={linkImg} width="100%"/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Banner
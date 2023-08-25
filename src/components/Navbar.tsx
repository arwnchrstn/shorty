import { Box, Container, Typography, Paper, useTheme } from "@mui/material"

const Navbar = () => {
    const theme = useTheme();

    return (
        <Box component={Paper} elevation={0} borderRadius={0} py={2}>
            <Container>
                <Typography fontSize={30} fontWeight="bold" color={theme.palette.orange.main}>
                    Shor.ty
                </Typography>
            </Container>
        </Box>
    )
}

export default Navbar
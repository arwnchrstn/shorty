import Navbar from '@/components/Navbar'
import { Box, Button, Container, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Url404 = () => {
    const navigate = useNavigate()

    return (
        <>
            <Navbar />
            <Box my={6}>
                <Container>
                    <Typography variant='h5' textAlign="center">
                        Invalid short URL. URL not found
                    </Typography>

                    <Button sx={{display:"block", mx: "auto", my: 2}} variant='contained' color='orange' onClick={() => navigate("/", {replace: true})}>Back to home</Button>
                </Container>
            </Box>
        </>
    )
}

export default Url404
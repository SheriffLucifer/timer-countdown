import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Timer from './Timer';

const MainContainer: React.FC = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth='sm'>
                <Box sx={{ bgcolor: 'greenyellow', height: '25vh', mt: '50%' }}>
                    <Timer></Timer>
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default MainContainer;

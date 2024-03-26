import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';

const Timer: React.FC = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    const startPauseResumeTimer = useCallback(() => {
        setIsRunning(prevState => !prevState);
    }, []);

    const resetTimer = useCallback(() => {
        setTime(0);
        setIsRunning(false);
    }, []);

    const formatTime = useMemo(() => {
        const minutes = Math.floor(time / 60000);
        const seconds = Math.floor((time % 60000) / 1000);
        const millisrconds = Math.floor((time % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:
        ${String(seconds).padStart(2, '0')}:
        ${String(millisrconds).padStart(2, '0')}`;
    }, [time]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (isRunning) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    return (
        <div style={{ textAlign: 'center' }}>
            <Typography variant='h2' component='h2' bgcolor='violet'>
                Timer
            </Typography>
            <Box
                height={40}
                width={120}
                my={2}
                mx='auto'
                display='flex'
                justifyContent='center'
                alignItems='center'
                sx={{ border: '2px solid magenta', backgroundColor: 'gold', borderRadius: 50 }}
            >
                {formatTime}
            </Box>
            <Button variant='contained' color='primary' onClick={startPauseResumeTimer} style={{ marginRight: 10 }}>
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={resetTimer}>
                Reset
            </Button>
        </div>
    );
};

export default Timer;

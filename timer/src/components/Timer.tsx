import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { TimerProps } from '../types/TimerProps';
import { TimerState } from '../types/TimerState';

const Timer: React.FC<TimerProps> = ({ initialTime = 0 }) => {
    const [state, setState] = useState<TimerState>({
        isRunning: false,
        time: initialTime,
    });

    const startPauseResumeTimer = useCallback(() => {
        setState(prevState => ({ ...prevState, isRunning: !prevState.isRunning }));
    }, []);

    const resetTimer = useCallback(() => {
        setState({ isRunning: false, time: 0 });
    }, []);

    const formatTime = useMemo(() => {
        const minutes = Math.floor(state.time / 60000);
        const seconds = Math.floor((state.time % 60000) / 1000);
        const millisrconds = Math.floor((state.time % 1000) / 10);

        return `${String(minutes).padStart(2, '0')}:
        ${String(seconds).padStart(2, '0')}:
        ${String(millisrconds).padStart(2, '0')}`;
    }, [state.time]);

    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        if (state.isRunning) {
            interval = setInterval(() => {
                setState(prevState => ({ ...prevState, time: prevState.time + 10 }));
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [state.isRunning]);

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
                {state.isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant='outlined' color='secondary' onClick={resetTimer}>
                Reset
            </Button>
        </div>
    );
};

export default Timer;

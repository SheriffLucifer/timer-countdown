import React, { useEffect, useState } from 'react';
import InputTime from './InputTime';
import Progress from './Progress';
import Control from './Control';

import { Typography } from '@mui/joy';
import { STimer } from '../assets/styles/countdown.styles';

import alarm from '../assets/sounds/alarm.wav';

const Countdown = () => {
    const [initialMinutes, setInitialMinutes] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
    const [isRunning, setIsRunning] = useState(false);

    const playAudio = () => {
        new Audio(alarm).play();
    };

    useEffect(() => {
        if (isRunning) {
            const timer = setInterval(() => {
                if (totalSeconds > 0) {
                    setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1);
                }

                if (totalSeconds === 1) {
                    clearInterval(timer);
                    playAudio();
                }
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [isRunning, totalSeconds]);

    const handleTimeChange = (newMinutes: number, newSeconds: number) => {
        const newTotalSeconds = newMinutes * 60 + newSeconds;
        setInitialMinutes(newMinutes);
        setInitialSeconds(newSeconds);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
        setTotalSeconds(newTotalSeconds);
    };

    const handleStartPause = () => {
        setIsRunning(prevIsRunning => !prevIsRunning);
    };

    const handleReset = () => {
        setIsRunning(false);
        setTotalSeconds(0);
        setInitialMinutes(0);
        setInitialSeconds(0);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    };

    return (
        <STimer>
            <hr />
            <Typography level='h1'>Countdown</Typography>
            <InputTime minutes={minutes} seconds={seconds} onTimeChange={handleTimeChange} isRunning={isRunning} />
            <Progress totalSeconds={totalSeconds} initialMinutes={initialMinutes} initialSeconds={initialSeconds} />
            <Control isRunning={isRunning} onStartPause={handleStartPause} onReset={handleReset} />
        </STimer>
    );
};

export default Countdown;

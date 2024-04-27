import React from 'react';
import { InputTimeProps } from '../types/inputTimeProps';
import { Slider } from '@mui/joy';
import { TextField } from '@mui/material';

const InputTime: React.FC<InputTimeProps> = ({ onTimeChange, isRunning, seconds, minutes }) => {
    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newMinutes = parseInt(e.target.value, 10);
        newMinutes = Math.min(newMinutes, 720);
        if (!isNaN(newMinutes)) {
            onTimeChange(newMinutes, seconds);
        }
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newSeconds = parseInt(e.target.value, 10);
        newSeconds = Math.min(newSeconds, 59);
        if (!isNaN(newSeconds)) {
            onTimeChange(minutes, newSeconds);
        }
    };

    const handleSliderChange = (newValue: number) => {
        const newMinutes = Math.floor(newValue / 60);
        const newSeconds = newValue % 60;
        onTimeChange(newMinutes, newSeconds);
    };

    return (
        <div>
            <TextField
                name='minutes'
                label='Minutes'
                type='number'
                value={minutes}
                onChange={handleMinutesChange}
                disabled={isRunning}
                inputProps={{ min: 0, max: 720 }}
            />
            <TextField
                name='seconds'
                label='Seconds'
                type='number'
                value={seconds}
                onChange={handleSecondsChange}
                disabled={isRunning}
                inputProps={{ min: 1, max: 59 }}
            />
            <Slider
                value={minutes * 60 + seconds}
                onChange={(_, newValue) => handleSliderChange(newValue as number)}
                min={0}
                max={60 * 720}
                step={15}
                aria-labelledby='input-slider'
                disabled={isRunning}
            />
        </div>
    );
};

export default InputTime;

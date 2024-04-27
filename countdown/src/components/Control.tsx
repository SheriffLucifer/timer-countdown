import React from 'react';

import { Button, ButtonGroup } from '@mui/material';
import { ControlProps } from '../types/controlProps';

const Control: React.FC<ControlProps> = ({ isRunning, onStartPause, onReset }) => {
    return (
        <div>
            <ButtonGroup disableElevation aria-label='Disabled elevation buttons'>
                <Button variant='contained' onClick={onStartPause}>
                    {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button variant='outlined' onClick={onReset}>
                    Reset
                </Button>
            </ButtonGroup>
        </div>
    );
};

export default Control;

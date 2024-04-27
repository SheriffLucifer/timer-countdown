import { Typography } from '@mui/joy';
import { ProgressProps } from '../types/progressProps';

const Progress: React.FC<ProgressProps> = ({ totalSeconds, initialMinutes, initialSeconds }) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const progressPercentage = Math.round((1 - totalSeconds / (initialMinutes * 60 + initialSeconds)) * 100);

    return (
        <div>
            <Typography level='h3'>
                Time Remaining: {minutes} minutes {seconds} seconds
            </Typography>
            <Typography level='h3'>Progress: {totalSeconds ? progressPercentage : 0}% completed</Typography>
        </div>
    );
};

export default Progress;

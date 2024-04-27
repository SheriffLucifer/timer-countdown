export interface InputTimeProps {
    minutes: number;
    seconds: number;
    onTimeChange: (minutes: number, seconds: number) => void;
    isRunning: boolean;
}

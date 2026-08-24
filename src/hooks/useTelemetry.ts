import { useMemo } from 'react';

export function useTelemetry(speed: number) {
    return useMemo(() => {
        const rpm = Math.round(800 + Math.min(speed * 40, 7200)); // 8000 Max RPM approx
        const boost = Number((speed > 60 ? Math.min((speed - 60) * 0.2, 2.5) : 0).toFixed(1)); // Max 2.5 bar
        const temp = Math.round(90 + Math.min(speed * 0.1, 30)); // Max 120 C

        return { rpm, boost, temp };
    }, [speed]);
}

import { useState, useEffect } from 'react';
import { Location } from '../types';

export function useGhostTrail(ghostMode: boolean, isTestEnv: boolean) {
    const [ghostCoordinates, setGhostCoordinates] = useState<Location[]>([]);

    useEffect(() => {
        let isMounted = true;
        let interval: NodeJS.Timeout | undefined;

        const resetTimer = setTimeout(() => {
            if (!isTestEnv && isMounted && !ghostMode) {
                setGhostCoordinates([]);
            }
        }, 0);

        if (ghostMode) {
            interval = setInterval(() => {
                setGhostCoordinates((prev) => {
                    const newCoords = [
                        ...prev,
                        {
                            latitude: -23.5505 + (Math.random() - 0.5) * 0.05,
                            longitude: -46.6333 + (Math.random() - 0.5) * 0.05,
                        },
                    ];
                    // Keep only the last 50 coordinates to prevent memory leaks
                    return newCoords.slice(-50);
                });
            }, 2000);
        }

        return () => {
            isMounted = false;
            clearTimeout(resetTimer);
            if (interval) clearInterval(interval);
        };
    }, [ghostMode, isTestEnv]);

    return { ghostCoordinates, setGhostCoordinates };
}

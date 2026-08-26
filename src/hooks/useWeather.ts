import { useState, useEffect } from 'react';

export type WeatherCondition = 'clear' | 'rain' | 'fog';

export function useWeather() {
    const [condition, setCondition] = useState<WeatherCondition>(() => {
        const conditions: WeatherCondition[] = ['clear', 'rain', 'fog'];
        return conditions[Math.floor(Math.random() * conditions.length)];
    });

    useEffect(() => {
        // Mock weather changing every minute to simulate dynamic environmental conditions
        const interval = setInterval(() => {
            const conditions: WeatherCondition[] = ['clear', 'rain', 'fog'];
            const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
            setCondition(randomCondition);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const isRaining = condition === 'rain';
    const isFoggy = condition === 'fog';

    return {
        condition,
        isRaining,
        isFoggy,
    };
}

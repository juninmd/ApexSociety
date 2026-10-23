import { useState, useRef, useEffect, useCallback } from 'react';
import type { Hazard } from './HazardContext';
import { useWeather } from '../hooks/useWeather';

export function useHazardState() {
    const [hazards, setHazards] = useState<Hazard[]>([]);
    const [isJammerActive, setIsJammerActive] = useState(false);
    const [isFakePlatesActive, setIsFakePlatesActive] = useState(false);
    const jammerTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const fakePlatesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { isRaining, isFoggy } = useWeather();

    const activateJammer = () => {
        setIsJammerActive(true);
        if (jammerTimeoutRef.current) {
            clearTimeout(jammerTimeoutRef.current);
        }
        jammerTimeoutRef.current = setTimeout(() => {
            setIsJammerActive(false);
            jammerTimeoutRef.current = null;
        }, 60000); // 60 seconds duration
    };

    const activateFakePlates = () => {
        setIsFakePlatesActive(true);
        if (fakePlatesTimeoutRef.current) {
            clearTimeout(fakePlatesTimeoutRef.current);
        }
        fakePlatesTimeoutRef.current = setTimeout(() => {
            setIsFakePlatesActive(false);
            fakePlatesTimeoutRef.current = null;
        }, 120000); // 120 seconds duration
    };

    useEffect(() => {
        return () => {
            if (jammerTimeoutRef.current) {
                clearTimeout(jammerTimeoutRef.current);
            }
            if (fakePlatesTimeoutRef.current) {
                clearTimeout(fakePlatesTimeoutRef.current);
            }
        };
    }, []);

    const addHazard = (hazard: Hazard) => {
        setHazards((prev) => [...prev, { ...hazard, verifications: 1, fakes: 0 }]);
    };

    const verifyHazard = (id: string, isFake?: boolean) => {
        setHazards((prev) =>
            prev
                .map((h) => {
                    if (h.id === id) {
                        if (isFake) {
                            return { ...h, fakes: (h.fakes || 0) + 1 };
                        }
                        return { ...h, verifications: (h.verifications || 0) + 1 };
                    }
                    return h;
                })
                .filter((h) => (h.fakes || 0) < 5),
        ); // Remove if 5 people flagged it as fake
    };

    const updateWeatherHazards = useCallback(() => {
        if (isRaining || isFoggy) {
            const envHazard: Hazard = {
                id: `env-weather`,
                type: 'flare', // using flare to mark on map for now
                location: { latitude: -23.5505, longitude: -46.6333 }, // Mock central location
                reportedAt: new Date().toISOString(),
                severity: isRaining ? 'medium' : 'high',
            };

            setHazards((prev) => {
                const hasEnvHazard = prev.some((h) => h.id === 'env-weather');
                if (!hasEnvHazard) {
                    return [...prev, envHazard];
                }
                return prev;
            });
        } else {
            setHazards((prev) => prev.filter((h) => h.id !== 'env-weather'));
        }
    }, [isRaining, isFoggy]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'test') return;
        // Schedule to avoid calling setState synchronously during render phase
        const timeoutId = setTimeout(updateWeatherHazards, 0);
        return () => clearTimeout(timeoutId);
    }, [updateWeatherHazards]);

    useEffect(() => {
        if (process.env.NODE_ENV === 'test') {
            return;
        }

        const interval = setInterval(() => {
            const now = new Date();
            setHazards((prev) => {
                const filtered = prev.filter((hazard) => {
                    // Do not timeout environmental hazards based on time
                    if (hazard.id === 'env-weather') return true;

                    const reportedAt = new Date(hazard.reportedAt);
                    const diffMs = now.getTime() - reportedAt.getTime();
                    const diffMinutes = diffMs / (1000 * 60);

                    // 30 minutes for blitz, 120 minutes (2 hours) for others
                    if (hazard.type === 'blitz') {
                        return diffMinutes < 30;
                    } else if (hazard.type === 'acidente') {
                        return diffMinutes < 120;
                    }
                    return diffMinutes < 60; // 1 hour default
                });

                return filtered.length === prev.length ? prev : filtered;
            });
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return {
        hazards,
        isJammerActive,
        activateJammer,
        isFakePlatesActive,
        activateFakePlates,
        addHazard,
        verifyHazard,
    };
}

import { useState, useEffect } from 'react';
import { Vibration } from 'react-native';
import * as Location from 'expo-location';
import { Hazard } from '../context/HazardContext';
import { getDistance } from '../utils/location';

interface UseDriveTrackingProps {
    hazards: Hazard[];
    showAlert: (msg: string) => void;
}

export function useDriveTracking({ hazards, showAlert }: UseDriveTrackingProps) {
    const [speed, setSpeed] = useState(0);
    const [proximityAlert, setProximityAlert] = useState<string | null>(null);
    const [isGhostMode, setIsGhostMode] = useState(false);
    const [ghostStartTime, setGhostStartTime] = useState<number | null>(null);

    const handleToggleGhostMode = () => {
        if (!isGhostMode) {
            setGhostStartTime(Date.now());
            setIsGhostMode(true);
        } else {
            const duration = ghostStartTime ? Math.floor((Date.now() - ghostStartTime) / 1000) : 0;
            showAlert(`GHOST MODE OFFLINE: YOU DROVE OFF THE GRID FOR ${duration} SECONDS`);
            setGhostStartTime(null);
            setIsGhostMode(false);
        }
    };

    // Simulate Speed
    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed((prev) => {
                const nextSpeed = prev + Math.floor(Math.random() * 5);
                if (nextSpeed > 140) return 130 + Math.floor(Math.random() * 10);
                return nextSpeed;
            });
        }, 300);
        return () => clearInterval(interval);
    }, []);

    // Location Tracking
    useEffect(() => {
        let locationSub: Location.LocationSubscription | null = null;
        let isCancelled = false;

        const startLocationTracking = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted' || isCancelled) return;

            const sub = await Location.watchPositionAsync(
                { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
                (location) => {
                    if (isCancelled || isGhostMode) return;
                    const { latitude, longitude } = location.coords;

                    const nearbyHazard = hazards.find((hazard) => {
                        const dist = getDistance(
                            latitude,
                            longitude,
                            hazard.location.latitude,
                            hazard.location.longitude,
                        );
                        return dist < 2 && (hazard.type === 'blitz' || hazard.type === 'acidente');
                    });

                    if (nearbyHazard && proximityAlert !== nearbyHazard.id) {
                        const msg =
                            nearbyHazard.type === 'blitz'
                                ? 'ALERTA: BLITZ POLICIAL A MENOS DE 2KM!'
                                : 'ALERTA: ACIDENTE A MENOS DE 2KM!';
                        showAlert(msg);
                        setProximityAlert(nearbyHazard.id);
                        Vibration.vibrate([0, 500, 200, 500]); // Vibrate twice
                    } else if (!nearbyHazard) {
                        setProximityAlert(null);
                    }
                },
            );

            if (isCancelled) sub.remove();
            else locationSub = sub;
        };

        startLocationTracking();

        return () => {
            isCancelled = true;
            if (locationSub) locationSub.remove();
        };
    }, [hazards, proximityAlert, showAlert, isGhostMode]);

    return {
        speed,
        isGhostMode,
        handleToggleGhostMode,
    };
}

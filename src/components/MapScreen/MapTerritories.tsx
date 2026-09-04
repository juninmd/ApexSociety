import React, { useState, useEffect } from 'react';
import { Circle } from 'react-native-maps';
import { MOCK_TERRITORIES, MOCK_USERS } from '../../data/mock';
import { getDistance } from '../../utils/location';
import { theme } from '../../theme';

export default function MapTerritories() {
    const [pulseState, setPulseState] = useState(false);

    // Calculate intrusions synchronously on mount or when data changes (currently static mocks)
    // Avoids setState in useEffect warning
    const intruded: Record<string, boolean> = {};
    MOCK_TERRITORIES.forEach((territory) => {
        const hasIntruder = MOCK_USERS.some((user) => {
            // If user belongs to a different crew (or no crew), and is within territory radius
            if (user.crewId !== territory.crewId) {
                const distKm = getDistance(
                    territory.center.latitude,
                    territory.center.longitude,
                    user.location.latitude,
                    user.location.longitude,
                );

                // radius is in meters, so convert to km
                if (distKm <= territory.radius / 1000) {
                    return true;
                }
            }
            return false;
        });

        if (hasIntruder) {
            intruded[territory.id] = true;
        }
    });

    const [pulsingTerritories] = useState<Record<string, boolean>>(intruded);

    useEffect(() => {
        // Simple pulse effect interval
        const interval = setInterval(() => {
            setPulseState((prev) => !prev);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {MOCK_TERRITORIES.map((territory) => {
                const isIntruded = pulsingTerritories[territory.id];

                let fillColor = territory.color;
                let strokeColor = territory.color.replace('0.2', '0.8');
                let strokeWidth = 2;

                if (isIntruded) {
                    fillColor = pulseState ? 'rgba(255, 0, 0, 0.4)' : 'rgba(255, 0, 0, 0.1)';
                    strokeColor = theme.colors.error;
                    strokeWidth = pulseState ? 4 : 2;
                }

                return (
                    <Circle
                        key={territory.id}
                        center={territory.center}
                        radius={territory.radius}
                        fillColor={fillColor}
                        strokeColor={strokeColor}
                        strokeWidth={strokeWidth}
                        testID={`territory-circle-${territory.id}`}
                    />
                );
            })}
        </>
    );
}

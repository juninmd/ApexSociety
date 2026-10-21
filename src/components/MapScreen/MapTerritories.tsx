import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { Circle, Marker } from 'react-native-maps';
import { MOCK_USERS } from '../../data/mock';
import { useTurf } from '../../context/TurfContext';
import { getDistance } from '../../utils/location';
import { theme } from '../../theme';

export default function MapTerritories() {
    const { territories, flagCrew } = useTurf();
    const [pulseState, setPulseState] = useState(false);

    const handleFlagTerritory = (crewId: string) => {
        Alert.alert(
            'Flag Suspicious Activity',
            'Report this crew territory for suspicious/bribe activity to lower their standing?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Flag',
                    style: 'destructive',
                    onPress: () => {
                        flagCrew(crewId, 10);
                        Alert.alert('Territory Flagged', 'Crew standing has been penalized.');
                    },
                },
            ],
        );
    };

    // Calculate intrusions synchronously on mount or when data changes (currently static mocks)
    // Avoids setState in useEffect warning
    const intruded: Record<string, boolean> = {};
    territories.forEach((territory) => {
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
            {territories.map((territory) => {
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
                    <React.Fragment key={`group-${territory.id}`}>
                        <Circle
                            key={territory.id}
                            center={territory.center}
                            radius={territory.radius}
                            fillColor={fillColor}
                            strokeColor={strokeColor}
                            strokeWidth={strokeWidth}
                            testID={`territory-circle-${territory.id}`}
                        />
                        <Marker
                            coordinate={territory.center}
                            onPress={() => handleFlagTerritory(territory.crewId)}
                            opacity={0} // Invisible marker overlay for interactions
                        />
                    </React.Fragment>
                );
            })}
        </>
    );
}

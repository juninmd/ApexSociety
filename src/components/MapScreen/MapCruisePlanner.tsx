import React from 'react';
import { Polyline, Marker, Circle } from 'react-native-maps';
import { theme } from '../../theme';
import { MOCK_TERRITORIES } from '../../data/mock';
import { useHazards } from '../../context/HazardContext';

interface MapCruisePlannerProps {
    waypoints: { latitude: number; longitude: number }[];
}

export default function MapCruisePlanner({ waypoints }: MapCruisePlannerProps) {
    const { hazards } = useHazards();

    // Determine segments and their safety
    const segments = [];
    for (let i = 0; i < waypoints.length - 1; i++) {
        const start = waypoints[i];
        const end = waypoints[i + 1];

        // Basic check if segment intersects any high severity hazard (simplified)
        const isDangerous = hazards.some((hazard) => {
            if (hazard.severity === 'high' || hazard.type === 'blitz') {
                // VERY simplified distance check to see if segment is near hazard
                const latDiff = hazard.location.latitude - start.latitude;
                const lngDiff = hazard.location.longitude - start.longitude;
                const dist = Math.sqrt(latDiff * latDiff + lngDiff * lngDiff);
                return dist < 0.05; // ~5km roughly
            }
            return false;
        });

        segments.push({
            coordinates: [start, end],
            isDangerous,
        });
    }

    return (
        <>
            {segments.map((segment, index) => (
                <Polyline
                    key={`segment-${index}`}
                    coordinates={segment.coordinates}
                    strokeColor={segment.isDangerous ? theme.colors.error : theme.colors.secondary}
                    strokeWidth={segment.isDangerous ? 6 : 4}
                    lineDashPattern={segment.isDangerous ? [10, 5] : [1]}
                />
            ))}
            {waypoints.map((wp, index) => (
                <Marker key={`wp-${index}`} coordinate={wp} pinColor={theme.colors.secondary} />
            ))}
            {/* Crew Territories Layer */}
            {MOCK_TERRITORIES.map((territory) => (
                <Circle
                    key={territory.id}
                    center={territory.center}
                    radius={territory.radius}
                    fillColor={territory.color}
                    strokeColor={territory.color.replace('0.2', '0.8')}
                    strokeWidth={2}
                />
            ))}
        </>
    );
}

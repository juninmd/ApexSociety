import React from 'react';
import { Polyline, Marker, Circle } from 'react-native-maps';
import { theme } from '../../theme';
import { MOCK_TERRITORIES } from '../../data/mock';

interface MapCruisePlannerProps {
    waypoints: { latitude: number; longitude: number }[];
}

export default function MapCruisePlanner({ waypoints }: MapCruisePlannerProps) {
    return (
        <>
            {waypoints.length > 0 && (
                <Polyline
                    coordinates={waypoints}
                    strokeColor={theme.colors.secondary}
                    strokeWidth={4}
                    lineDashPattern={[1]}
                />
            )}
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

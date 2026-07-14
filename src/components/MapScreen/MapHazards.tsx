import React from 'react';
import { Marker } from 'react-native-maps';
import { theme } from '../../theme';
import { useHazards } from '../../context/HazardContext';

export default function MapHazards() {
    const { hazards } = useHazards();

    return (
        <>
            {hazards.map((hazard) => {
                let markerColor = theme.colors.error;
                let title = 'Perigo';
                if (hazard.type === 'blitz') {
                    markerColor = '#0000FF'; // Blue for police
                    title = 'BLITZ POLICIAL';
                } else if (hazard.type === 'radar') {
                    markerColor = theme.colors.primary; // Yellow
                    title = 'RADAR';
                } else if (hazard.type === 'acidente') {
                    markerColor = theme.colors.error; // Red
                    title = 'ACIDENTE';
                }

                return (
                    <Marker
                        key={hazard.id}
                        coordinate={{
                            latitude: hazard.location.latitude,
                            longitude: hazard.location.longitude,
                        }}
                        title={title}
                        description={`Reportado em: ${new Date(hazard.reportedAt).toLocaleTimeString()}`}
                        pinColor={markerColor}
                        opacity={0.8}
                    />
                );
            })}
        </>
    );
}

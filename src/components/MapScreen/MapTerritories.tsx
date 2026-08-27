import React from 'react';
import { Circle } from 'react-native-maps';
import { MOCK_TERRITORIES } from '../../data/mock';

export default function MapTerritories() {
    return (
        <>
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

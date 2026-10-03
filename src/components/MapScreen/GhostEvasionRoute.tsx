import React from 'react';
import { Polyline } from 'react-native-maps';
import { theme } from '../../theme';
import { useConvoy } from '../../context/ConvoyContext';

export default function GhostEvasionRoute() {
    const { ghostMode, ghostCoordinates } = useConvoy();

    if (!ghostMode || ghostCoordinates.length < 2) {
        return null;
    }

    return (
        <Polyline
            coordinates={ghostCoordinates}
            strokeColor={theme.colors.secondary} // Purple/pink for ghost mode
            strokeWidth={4}
            lineDashPattern={[5, 10]} // Dashed line to indicate stealth/fake path
            testID="ghost-evasion-route"
        />
    );
}

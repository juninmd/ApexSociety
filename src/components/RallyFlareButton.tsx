import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useConvoy } from '../context/ConvoyContext';
import { useDriveTracking } from '../hooks/useDriveTracking';
import { useHazards } from '../context/HazardContext';
import { useUI } from '../context/UIContext';
import { Target } from 'lucide-react-native';

export default function RallyFlareButton() {
    const { isConvoyActive, deployRallyFlare, rallyPoint } = useConvoy();
    const { location } = useDriveTracking({
        hazards: useHazards().hazards,
        showAlert: useUI().showAlert,
    });

    if (!isConvoyActive || !location) return null;

    const handleDeploy = () => {
        deployRallyFlare(location);
    };

    return (
        <TouchableOpacity
            style={[styles.button, rallyPoint && styles.buttonActive]}
            onPress={handleDeploy}
        >
            <Target color={rallyPoint ? '#000' : theme.colors.primary} size={28} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.card,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonActive: {
        backgroundColor: theme.colors.primary,
        shadowOpacity: 0.8,
    },
});

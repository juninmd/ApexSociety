import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';

interface MapControlsProps {
    isOfflineMapCached: boolean;
    handleOfflineMapToggle: () => void;
    isPlannerActive: boolean;
    togglePlanner: () => void;
}

export default function MapControls({
    isOfflineMapCached,
    handleOfflineMapToggle,
    isPlannerActive,
    togglePlanner,
}: MapControlsProps) {
    return (
        <View style={styles.topRightControls}>
            <CustomButton
                title={isOfflineMapCached ? 'CLEAR CACHE' : 'OFFLINE MAP'}
                onPress={handleOfflineMapToggle}
                variant="secondary"
                style={styles.offlineButton}
            />
            <CustomButton
                title={isPlannerActive ? 'CANCEL CRUISE' : 'PLAN CRUISE'}
                onPress={togglePlanner}
                variant={isPlannerActive ? 'danger' : 'primary'}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topRightControls: {
        position: 'absolute',
        top: 60,
        right: 20,
        width: 140,
        gap: 10,
    },
    offlineButton: {
        paddingVertical: 8,
    },
});

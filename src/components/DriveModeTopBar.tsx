import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { Ghost, AlertTriangle, Zap } from 'lucide-react-native';
import HeatLevelIndicator from './HeatLevelIndicator';
import { theme } from '../theme';
import { useConvoy } from '../context/ConvoyContext';
import { useHazards } from '../context/HazardContext';
import { useReputation } from '../context/ReputationContext';
import { Location } from '../types';

interface DriveModeTopBarProps {
    isGhostMode: boolean;
    onToggleGhostMode: () => void;
    heatLevel: number;
    currentLocation?: Location;
}

export default function DriveModeTopBar({
    isGhostMode,
    onToggleGhostMode,
    heatLevel,
    currentLocation,
}: DriveModeTopBarProps) {
    const { isConvoyActive, triggerEvac, evacActive } = useConvoy();
    const { deployHeatDecoy } = useHazards();
    const { spendReputation } = useReputation();

    const handleDeployDecoy = () => {
        if (!currentLocation) {
            Alert.alert('LOCATION REQUIRED', 'Cannot deploy decoy without GPS signal.');
            return;
        }

        if (spendReputation(100)) {
            // Deploy a decoy slightly offset from the user to simulate drawing heat away
            deployHeatDecoy({
                latitude: currentLocation.latitude + 0.01,
                longitude: currentLocation.longitude + 0.01,
            });
            Alert.alert(
                'DECOY DEPLOYED',
                'A heat flare was deployed. The police are investigating the fake call.',
                [{ text: 'OK' }],
            );
        } else {
            Alert.alert('INSUFFICIENT REP', 'You need 100 REP to deploy a heat decoy.');
        }
    };

    return (
        <View style={styles.topBar}>
            <TouchableOpacity style={styles.decoyButton} onPress={handleDeployDecoy}>
                <Zap size={24} color={theme.colors.warning} />
                <Text style={styles.decoyText}>DECOY</Text>
            </TouchableOpacity>
            {isConvoyActive && (
                <TouchableOpacity
                    style={[styles.evacButton, evacActive && styles.evacButtonActive]}
                    onPress={triggerEvac}
                >
                    <AlertTriangle size={24} color={evacActive ? '#FFFFFF' : theme.colors.error} />
                    <Text style={[styles.evacText, evacActive && styles.evacTextActive]}>EVAC</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity
                style={[styles.ghostButton, isGhostMode && styles.ghostButtonActive]}
                onPress={onToggleGhostMode}
            >
                <Ghost
                    size={24}
                    color={isGhostMode ? theme.colors.primary : theme.colors.textSecondary}
                />
                <Text style={[styles.ghostText, isGhostMode && styles.ghostTextActive]}>
                    {isGhostMode ? 'GHOST ON' : 'GHOST OFF'}
                </Text>
            </TouchableOpacity>
            <HeatLevelIndicator level={heatLevel} />
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        width: '100%',
        zIndex: 10,
    },
    ghostButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    ghostButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(255, 0, 85, 0.1)',
    },
    ghostText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
    ghostTextActive: {
        color: theme.colors.primary,
    },
    evacButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.error,
        marginLeft: 10,
    },
    evacButtonActive: {
        backgroundColor: theme.colors.error,
    },
    evacText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
    evacTextActive: {
        color: '#FFFFFF',
    },
    decoyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.warning,
        marginRight: 10,
    },
    decoyText: {
        color: theme.colors.warning,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 8,
    },
});

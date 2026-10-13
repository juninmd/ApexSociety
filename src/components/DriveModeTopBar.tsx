import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ghost, AlertTriangle } from 'lucide-react-native';
import HeatLevelIndicator from './HeatLevelIndicator';
import { theme } from '../theme';
import { useConvoy } from '../context/ConvoyContext';

interface DriveModeTopBarProps {
    isGhostMode: boolean;
    onToggleGhostMode: () => void;
    heatLevel: number;
}

export default function DriveModeTopBar({
    isGhostMode,
    onToggleGhostMode,
    heatLevel,
}: DriveModeTopBarProps) {
    const { isConvoyActive, triggerEvac, evacActive } = useConvoy();

    return (
        <View style={styles.topBar}>
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
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface RadarStatusProps {
    isHighSpeed: boolean;
}

export default function RadarStatus({ isHighSpeed }: RadarStatusProps) {
    return (
        <View style={styles.radarStatus}>
            <Text style={styles.radarStatusText}>
                {isHighSpeed ? 'RADAR ATIVO: ALERTA' : 'BUSCANDO BLITZ...'}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    radarStatus: {
        position: 'absolute',
        top: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    radarStatusText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        letterSpacing: 2,
    },
});

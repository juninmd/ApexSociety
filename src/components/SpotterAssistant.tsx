import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useHazards } from '../context/HazardContext';
import { useWeather } from '../hooks/useWeather';

export default function SpotterAssistant() {
    const { heatLevel } = useHazards();
    const { isRaining, isFoggy } = useWeather();

    let advice = 'SPOTTER: Route Clear. Keep pushing.';
    let level = 'safe';

    if (heatLevel > 2) {
        advice = 'SPOTTER: Heavy police presence detected. Reroute to underground paths.';
        level = 'danger';
    } else if (heatLevel > 0) {
        advice = 'SPOTTER: Radar or Blitz ahead. Stay alert.';
        level = 'warning';
    } else if (isRaining) {
        advice = 'SPOTTER: Wet conditions. Traction reduced. Corner with care.';
        level = 'warning';
    } else if (isFoggy) {
        advice = 'SPOTTER: Visibility low. Follow the leader closely.';
        level = 'warning';
    }

    return (
        <View style={[styles.container, styles[level as 'safe' | 'warning' | 'danger']]}>
            <Text
                style={[
                    styles.text,
                    styles[`${level}Text` as 'safeText' | 'warningText' | 'dangerText'],
                ]}
            >
                {advice}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    safe: {
        borderColor: '#4CAF50',
    },
    warning: {
        borderColor: theme.colors.warning,
    },
    danger: {
        borderColor: theme.colors.error,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    text: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        letterSpacing: 1,
        textAlign: 'center',
    },
    safeText: {
        color: '#4CAF50',
    },
    warningText: {
        color: theme.colors.warning,
    },
    dangerText: {
        color: theme.colors.error,
    },
});

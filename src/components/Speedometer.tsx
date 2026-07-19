import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';

interface SpeedometerProps {
    speed: number;
    pulseAnim: Animated.Value;
    isHighSpeed: boolean;
}

export default function Speedometer({ speed, pulseAnim, isHighSpeed }: SpeedometerProps) {
    return (
        <Animated.View
            style={[
                styles.speedometerContainer,
                { transform: [{ scale: pulseAnim }] },
                isHighSpeed && { borderColor: theme.colors.error },
            ]}
        >
            <Text
                style={[
                    styles.speedValue,
                    isHighSpeed && { color: theme.colors.error },
                ]}
            >
                {speed}
            </Text>
            <Text style={styles.speedUnit}>KM/H</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    speedometerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 4,
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    speedValue: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 84,
        includeFontPadding: false,
    },
    speedUnit: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 24,
        marginTop: -10,
    },
});

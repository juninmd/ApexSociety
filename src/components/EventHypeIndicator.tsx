import React, { useEffect, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';

interface EventHypeIndicatorProps {
    hypeScore: number;
}

export default function EventHypeIndicator({ hypeScore }: EventHypeIndicatorProps) {
    const [pulseAnim] = useState(() => new Animated.Value(0));

    useEffect(() => {
        if (hypeScore >= 100) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        } else {
            pulseAnim.setValue(0);
        }
    }, [hypeScore, pulseAnim]);

    if (hypeScore < 100) {
        return null; // Don't render glow if not hyped
    }

    return (
        <Animated.View
            style={[
                styles.glowContainer,
                {
                    opacity: pulseAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.3, 0.8],
                    }),
                },
            ]}
            pointerEvents="none"
        />
    );
}

const styles = StyleSheet.create({
    glowContainer: {
        ...StyleSheet.absoluteFillObject,
        borderWidth: 2,
        borderColor: '#FF6400',
        borderRadius: 8,
        shadowColor: '#FF6400',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 5,
        zIndex: 1,
    },
});

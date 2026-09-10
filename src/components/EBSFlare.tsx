import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';
import { useConvoy } from '../context/ConvoyContext';

export default function EBSFlare() {
    const { ebsActive } = useConvoy();
    const [opacity] = useState(new Animated.Value(0));

    useEffect(() => {
        if (ebsActive) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(opacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacity, {
                        toValue: 0.2,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        } else {
            opacity.setValue(0);
            Animated.timing(opacity, { toValue: 0, duration: 0, useNativeDriver: true }).stop();
        }
    }, [ebsActive, opacity]);

    if (!ebsActive) return null;

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <View style={styles.flareBox}>
                <Text style={styles.title}>EMERGENCY BROADCAST SYSTEM</Text>
                <Text style={styles.message}>
                    CRITICAL HAZARD DEPLOYED BY CONVOY. REDUCE SPEED IMMEDIATELY.
                </Text>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999, // Render on top of everything
        pointerEvents: 'none', // Allow passing touches through
    },
    flareBox: {
        backgroundColor: 'rgba(26, 26, 26, 0.95)',
        borderWidth: 2,
        borderColor: theme.colors.error,
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
        width: '85%',
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 22,
        color: theme.colors.error,
        textAlign: 'center',
        marginBottom: 10,
    },
    message: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        color: theme.colors.white,
        textAlign: 'center',
    },
});

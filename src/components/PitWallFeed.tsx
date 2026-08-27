import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { theme } from '../theme';
import { Radio } from 'lucide-react-native';

const FEED_MESSAGES = [
    '[SYSTEM] CONVOY ESTABLISHED',
    '[NIGHT RIDER] Acidente reportado na Av. Paulista',
    '[PRO TUNER] Blitz avistada. Evitem a ponte.',
    '[SYSTEM] Risco elevado na zona sul',
    '[STREET LEGEND] Chegando no encontro secreto...',
];

export default function PitWallFeed() {
    const [messageIndex, setMessageIndex] = useState(0);
    const [fadeAnim] = useState(() => new Animated.Value(0));

    useEffect(() => {
        // Simple loop to cycle through messages
        const interval = setInterval(() => {
            Animated.sequence([
                Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
                Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
            ]).start();

            setTimeout(() => {
                setMessageIndex((prev) => (prev + 1) % FEED_MESSAGES.length);
            }, 500);
        }, 5000);

        // Initial fade in
        Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }).start();

        return () => clearInterval(interval);
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Radio color={theme.colors.primary} size={16} />
            </View>
            <Animated.Text style={[styles.feedText, { opacity: fadeAnim }]} numberOfLines={1}>
                {FEED_MESSAGES[messageIndex]}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        position: 'absolute',
        top: 60, // Place below the Top Bar in Drive Mode
        zIndex: 10,
    },
    iconContainer: {
        marginRight: 10,
    },
    feedText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        flex: 1,
    },
});

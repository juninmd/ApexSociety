import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { Zap } from 'lucide-react-native';

interface SlipstreamBannerProps {
    isDrafting: boolean;
}

export default function SlipstreamBanner({ isDrafting }: SlipstreamBannerProps) {
    if (!isDrafting) return null;

    return (
        <View style={styles.container}>
            <Zap color={theme.colors.secondary} size={16} />
            <Text style={styles.text}>SLIPSTREAM BOOST ACTIVE</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100, // Below top bar
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 229, 255, 0.2)', // Cyan transparent
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 8,
        zIndex: 5,
    },
    text: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
        letterSpacing: 1,
    },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { theme } from '../theme';

interface GarageQRPassProps {
    eventId: string;
}

export default function GarageQRPass({ eventId }: GarageQRPassProps) {
    // Generate some deterministic-looking lines for a mock barcode
    const seed = eventId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const lines = Array.from({ length: 40 }).map((_, i) => {
        const width = ((seed * (i + 1)) % 5) + 1;
        const x = i * 6 + ((seed * i) % 3);
        return <Rect key={i} x={x} y={0} width={width} height={100} fill={theme.colors.text} />;
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>FAST-TRACK PASS</Text>
            <Text style={styles.subtitle}>ID: {eventId.toUpperCase()}</Text>

            <View style={styles.barcodeContainer}>
                <Svg height="100" width="250" viewBox="0 0 250 100">
                    <Rect x="0" y="0" width="250" height="100" fill="#fff" />
                    <View style={{ marginLeft: 10, marginTop: 0 }}>
                        <Svg height="100" width="230" viewBox="0 0 230 100">
                            {lines}
                        </Svg>
                    </View>
                </Svg>
            </View>

            <Text style={styles.instructions}>APRESENTE NA ENTRADA DO EVENTO</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: theme.colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        width: 300,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        marginBottom: 5,
        letterSpacing: 2,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginBottom: 20,
        letterSpacing: 1,
    },
    barcodeContainer: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    instructions: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        textAlign: 'center',
    },
});

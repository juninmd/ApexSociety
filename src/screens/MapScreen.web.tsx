import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Map } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

export default function MapScreen() {
    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.card]}
            style={styles.container}
        >
            <View style={styles.overlay} />
            <View style={styles.content}>
                <Map size={64} color={theme.colors.primary} style={styles.icon} />
                <Text style={styles.title}>Map Experience</Text>
                <Text style={styles.subtitle}>
                    The interactive map is optimized for our mobile app. Download ApexSociety to see
                    who&apos;s around you!
                </Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => Linking.openURL('https://github.com/apexsociety/apexsociety')}
                    activeOpacity={0.8}
                >
                    <Text style={styles.buttonText}>GET THE APP</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    overlay: {
        position: 'absolute',
        top: -100,
        left: -50,
        right: -50,
        height: 400,
        backgroundColor: theme.colors.primary,
        opacity: 0.05,
        transform: [{ skewY: '-10deg' }],
        zIndex: 0,
    },
    content: {
        alignItems: 'center',
        maxWidth: 400,
        zIndex: 1,
    },
    icon: {
        marginBottom: 24,
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 42,
        marginBottom: 16,
        textAlign: 'center',
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 48,
        lineHeight: 28,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 48,
        paddingVertical: 16,
        transform: [{ skewX: '-20deg' }],
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        fontWeight: 'bold',
        transform: [{ skewX: '20deg' }],
        letterSpacing: 1,
    },
});

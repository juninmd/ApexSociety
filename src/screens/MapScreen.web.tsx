import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Map } from 'lucide-react-native';
import { theme } from '../theme';

export default function MapScreen() {
    return (
        <View style={styles.container}>
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
                >
                    <Text style={styles.buttonText}>GET THE APP</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        maxWidth: 400,
    },
    icon: {
        marginBottom: 24,
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 32,
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 32,
        paddingVertical: 12,
        transform: [{ skewX: '-15deg' }],
    },
    buttonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 16,
        fontWeight: 'bold',
        transform: [{ skewX: '15deg' }], // Counter-skew text
    },
});

import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Map } from 'lucide-react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Map size={64} color="#FFD700" style={styles.icon} />
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
        backgroundColor: '#000000',
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
        color: '#FFFFFF',
        fontFamily: 'Oswald_400Regular',
        fontSize: 32,
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        color: '#AAAAAA',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 32,
        paddingVertical: 12,
        transform: [{ skewX: '-15deg' }],
    },
    buttonText: {
        color: '#000000',
        fontFamily: 'Oswald_400Regular',
        fontSize: 16,
        fontWeight: 'bold',
        transform: [{ skewX: '15deg' }], // Counter-skew text
    },
});

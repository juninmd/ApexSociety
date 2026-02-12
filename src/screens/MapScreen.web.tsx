import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.map}>
                <Text style={styles.webMapText}>Map not available on Web</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    map: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
    },
    webMapText: {
        color: '#757575',
        fontFamily: 'Oswald_400Regular',
        fontSize: 18,
    },
});

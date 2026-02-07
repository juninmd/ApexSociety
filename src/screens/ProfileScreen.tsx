import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen({ route }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{route.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#FFD700',
        fontFamily: 'Oswald_700Bold',
        fontSize: 30,
        textTransform: 'uppercase',
    }
});

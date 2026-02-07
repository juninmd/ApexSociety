import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MenuScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>MENU</Text>
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
    }
});

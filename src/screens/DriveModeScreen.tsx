import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import ReportCheckpointButton from '../components/ReportCheckpointButton';

export default function DriveModeScreen() {
    const [speed, setSpeed] = useState(0);

    useEffect(() => {
        // Simulate speed changes to create a dynamic racing feel
        const interval = setInterval(() => {
            setSpeed((prevSpeed) => {
                const change = Math.floor(Math.random() * 11) - 3;
                let newSpeed = prevSpeed + change;
                if (newSpeed < 60) newSpeed = Math.min(newSpeed + 15, 60);
                if (newSpeed > 180) newSpeed = 180;
                return newSpeed;
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={styles.speedometerContainer}>
                        <Text style={styles.speedValue}>{speed}</Text>
                        <Text style={styles.speedUnit}>KM/H</Text>
                    </View>

                    <View style={styles.actionsContainer}>
                        <ReportCheckpointButton />
                    </View>
                </View>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 60,
    },
    speedometerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 250,
        borderRadius: 125,
        borderWidth: 4,
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    speedValue: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 84,
        includeFontPadding: false,
    },
    speedUnit: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 24,
        marginTop: -10,
    },
    actionsContainer: {
        width: '100%',
        paddingHorizontal: 40,
    },
});

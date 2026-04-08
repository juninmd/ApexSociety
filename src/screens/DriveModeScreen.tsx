import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';
import ReportHazardButton from '../components/ReportHazardButton';

export default function DriveModeScreen() {
    const [speed, setSpeed] = useState(0);
    const pulseAnim = React.useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const interval = setInterval(() => {
            setSpeed((prev) => {
                const nextSpeed = prev + Math.floor(Math.random() * 5);
                if (nextSpeed > 140) return 130 + Math.floor(Math.random() * 10);
                return nextSpeed;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (speed > 100) {
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [speed, pulseAnim]);

    const isHighSpeed = speed > 100;

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1a1a1a', '#000000']} style={styles.gradient}>
                <View style={styles.content}>
                    <View style={styles.radarStatus}>
                        <Text style={styles.radarStatusText}>
                            {isHighSpeed ? 'RADAR ATIVO: ALERTA' : 'BUSCANDO BLITZ...'}
                        </Text>
                    </View>

                    <Animated.View
                        style={[
                            styles.speedometerContainer,
                            { transform: [{ scale: pulseAnim }] },
                            isHighSpeed && { borderColor: theme.colors.error },
                        ]}
                    >
                        <Text
                            style={[
                                styles.speedValue,
                                isHighSpeed && { color: theme.colors.error },
                            ]}
                        >
                            {speed}
                        </Text>
                        <Text style={styles.speedUnit}>KM/H</Text>
                    </Animated.View>

                    <View style={styles.actionsContainer}>
                        <ReportHazardButton type="blitz" />
                        <ReportHazardButton type="radar" />
                        <ReportHazardButton type="acidente" />
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    radarStatus: {
        position: 'absolute',
        top: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    radarStatusText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        letterSpacing: 2,
    },
});

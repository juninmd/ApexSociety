import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { CloudRain, CloudFog, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { useWeather } from '../hooks/useWeather';
import { useHazards } from '../context/HazardContext';

export default function WeatherHazardBanner() {
    const { isRaining, isFoggy } = useWeather();
    const { hazards } = useHazards();
    const [opacity] = useState(new Animated.Value(0));

    const isVisible = isRaining || isFoggy;
    const envHazard = hazards.find((h) => h.id === 'env-weather');

    useEffect(() => {
        if (isVisible && envHazard) {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [isVisible, envHazard, opacity]);

    if (!isVisible) return null;

    let warningText = 'CAUTION: HAZARDOUS WEATHER';
    let Icon = AlertTriangle;

    if (isRaining) {
        warningText = 'SLIPPERY ROAD: RAIN DETECTED';
        Icon = CloudRain;
    } else if (isFoggy) {
        warningText = 'LOW VISIBILITY: FOG DETECTED';
        Icon = CloudFog;
    }

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <Icon color={theme.colors.error} size={20} style={styles.icon} />
            <Text style={styles.text}>{warningText}</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: theme.colors.error,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 10,
    },
    text: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
    },
});

import React, { useEffect, useState, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { Marker } from 'react-native-maps';
import { theme } from '../../theme';
import { useHazards } from '../../context/HazardContext';

const AnimatedMarker = Animated.createAnimatedComponent(Marker);

export default function MapHazards() {
    const { hazards } = useHazards();

    // Create animated values for all markers. If sos, animate opacity
    const [pulseAnim] = useState(() => new Animated.Value(0.4));

    useEffect(() => {
        const hasSos = hazards.some((h) => h.type === 'sos');
        if (hasSos) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0.4,
                        duration: 800,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        } else {
            pulseAnim.setValue(0.8);
            pulseAnim.stopAnimation();
        }
    }, [hazards, pulseAnim]);

    return (
        <>
            {hazards.map((hazard) => {
                let markerColor = theme.colors.error;
                let title = 'Perigo';

                if (hazard.type === 'blitz') {
                    markerColor = '#0000FF'; // Blue for police
                    title = 'BLITZ POLICIAL';
                } else if (hazard.type === 'radar') {
                    markerColor = theme.colors.primary; // Yellow
                    title = 'RADAR';
                } else if (hazard.type === 'acidente') {
                    markerColor = theme.colors.error; // Red
                    title = 'ACIDENTE';
                } else if (hazard.type === 'sos') {
                    markerColor = '#FF00FF'; // Deep Red / Magenta for SOS
                    title = 'SINAL SOS';
                }

                if (hazard.type === 'sos') {
                    return (
                        <AnimatedMarker
                            key={hazard.id}
                            coordinate={{
                                latitude: hazard.location.latitude,
                                longitude: hazard.location.longitude,
                            }}
                            title={title}
                            description={`Reportado em: ${new Date(hazard.reportedAt).toLocaleTimeString()}`}
                            pinColor={markerColor}
                            style={{ opacity: pulseAnim }}
                        />
                    );
                }

                return (
                    <Marker
                        key={hazard.id}
                        coordinate={{
                            latitude: hazard.location.latitude,
                            longitude: hazard.location.longitude,
                        }}
                        title={title}
                        description={`Reportado em: ${new Date(hazard.reportedAt).toLocaleTimeString()}`}
                        pinColor={markerColor}
                        opacity={0.8}
                    />
                );
            })}
        </>
    );
}

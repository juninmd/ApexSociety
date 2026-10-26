import React, { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Circle } from 'react-native-maps';
import { useHazards } from '../../context/HazardContext';
import { useMapRegion } from '../../hooks/useMapRegion';

export default function PoliceChopper() {
    const { heatLevel } = useHazards();
    const { region } = useMapRegion();
    const [sweepAnim] = useState(() => new Animated.Value(0));
    const animRef = useRef<Animated.CompositeAnimation | null>(null);
    const [isMountedState, setIsMountedState] = useState(true);

    const [currentRadius, setCurrentRadius] = useState(800);

    useEffect(() => {
        let isMounted = true;

        if (heatLevel >= 4) {
            animRef.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(sweepAnim, {
                        toValue: 1,
                        duration: 3000,
                        useNativeDriver: false,
                    }),
                    Animated.timing(sweepAnim, {
                        toValue: 0,
                        duration: 3000,
                        useNativeDriver: false,
                    }),
                ]),
            );
            animRef.current.start();
        } else {
            if (animRef.current) {
                animRef.current.stop();
            }
            sweepAnim.setValue(0);
        }

        return () => {
            isMounted = false;
            if (animRef.current) {
                animRef.current.stop();
            }
        };
    }, [heatLevel, sweepAnim]);

    useEffect(() => {
        if (heatLevel >= 4) {
            const listenerId = sweepAnim.addListener(({ value }) => {
                // Interpolate value from 0-1 to a radius range (e.g. 500 to 1200)
                const pulse = 500 + value * 700;
                setCurrentRadius(pulse);
            });

            return () => {
                sweepAnim.removeListener(listenerId);
            };
        }
    }, [heatLevel, sweepAnim]);

    if (heatLevel < 4 || !isMountedState) {
        return null;
    }

    return (
        <Circle
            center={{
                latitude: region.latitude,
                longitude: region.longitude,
            }}
            radius={currentRadius}
            fillColor="rgba(255, 255, 255, 0.2)"
            strokeColor="rgba(255, 255, 255, 0.8)"
            strokeWidth={1}
            zIndex={2}
        />
    );
}

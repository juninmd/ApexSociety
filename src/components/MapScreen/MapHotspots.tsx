import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import { Circle } from 'react-native-maps';
import { MOCK_HOTSPOTS } from '../../data/mock';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function MapHotspots() {
    const [pulseAnim] = useState(() => new Animated.Value(0.4));

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1500,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0.4,
                    duration: 1500,
                    useNativeDriver: true,
                }),
            ]),
        ).start();
    }, [pulseAnim]);

    return (
        <>
            {MOCK_HOTSPOTS.map((hotspot) => (
                <AnimatedCircle
                    key={hotspot.id}
                    center={hotspot.center}
                    radius={hotspot.radius}
                    fillColor={hotspot.color}
                    strokeColor="transparent"
                    style={{ opacity: pulseAnim }}
                />
            ))}
        </>
    );
}

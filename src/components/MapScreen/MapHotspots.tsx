import React, { useEffect, useState } from 'react';
import { Animated, Alert } from 'react-native';
import { Circle, Marker } from 'react-native-maps';
import { MOCK_HOTSPOTS } from '../../data/mockExtra';
import { useEvents } from '../../context/EventContext';
import { useReputation } from '../../context/ReputationContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function MapHotspots() {
    const [pulseAnim] = useState(() => new Animated.Value(0.4));
    const { getEventHeatmaps } = useEvents();
    const { checkInHotspot } = useReputation();

    const handleCheckIn = (id: string, name?: string) => {
        const success = checkInHotspot(id);
        if (success) {
            Alert.alert(
                'Flash Meet Check-In!',
                `You earned 50 REP at ${name || 'the flash meet'}!`,
            );
        } else {
            Alert.alert('Already Checked In', 'You have already checked into this flash meet.');
        }
    };

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

    const allHotspots = [...MOCK_HOTSPOTS, ...getEventHeatmaps()];

    return (
        <>
            {allHotspots.map((hotspot) => (
                <React.Fragment key={`group-${hotspot.id}`}>
                    <AnimatedCircle
                        key={hotspot.id}
                        center={hotspot.center}
                        radius={hotspot.radius}
                        fillColor={hotspot.color}
                        strokeColor="transparent"
                        style={{ opacity: pulseAnim }}
                    />
                    <Marker
                        coordinate={hotspot.center}
                        onPress={() => handleCheckIn(hotspot.id, 'Flash Meet')}
                        opacity={0} // Invisible marker overlay for interactions
                    />
                </React.Fragment>
            ))}
        </>
    );
}

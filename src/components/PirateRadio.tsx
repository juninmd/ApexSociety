import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Radio, Music, Volume2, VolumeX } from 'lucide-react-native';
import { theme } from '../theme';
import { styles } from './PirateRadioStyles';

const STATIONS = [
    { id: '1', name: 'NIGHTCITY FM', genre: 'Synthwave' },
    { id: '2', name: 'TOUGE BEATS', genre: 'Eurobeat' },
    { id: '3', name: 'UNDERGROUND', genre: 'Phonk' },
];

export default function PirateRadio() {
    const [isOn, setIsOn] = useState(false);
    const [stationIndex, setStationIndex] = useState(0);
    const [eqAnims] = useState([
        new Animated.Value(0.2),
        new Animated.Value(0.5),
        new Animated.Value(0.3),
        new Animated.Value(0.8),
        new Animated.Value(0.4),
    ]);

    useEffect(() => {
        if (!isOn) {
            eqAnims.forEach((anim) => anim.setValue(0.1));
            return;
        }

        const animateBar = (anim: Animated.Value) => {
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: Math.random() * 0.8 + 0.2,
                    duration: 150 + Math.random() * 150,
                    useNativeDriver: false, // height animation doesn't support native driver well
                }),
                Animated.timing(anim, {
                    toValue: Math.random() * 0.4 + 0.1,
                    duration: 150 + Math.random() * 150,
                    useNativeDriver: false,
                }),
            ]).start(({ finished }) => {
                if (finished && isOn) {
                    animateBar(anim);
                }
            });
        };

        eqAnims.forEach(animateBar);

        return () => {
            eqAnims.forEach((anim) => anim.stopAnimation());
        };
    }, [isOn, eqAnims]);

    const toggleRadio = () => setIsOn(!isOn);

    const nextStation = () => {
        if (!isOn) return;
        setStationIndex((prev) => (prev + 1) % STATIONS.length);
    };

    const currentStation = STATIONS[stationIndex];

    return (
        <View style={[styles.container, isOn && styles.containerActive]}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Radio
                        size={16}
                        color={isOn ? theme.colors.primary : theme.colors.textSecondary}
                    />
                    <Text style={[styles.title, isOn && styles.titleActive]}>PIRATE RADIO</Text>
                </View>
                <TouchableOpacity onPress={toggleRadio} style={styles.powerBtn}>
                    {isOn ? (
                        <Volume2 size={18} color={theme.colors.primary} />
                    ) : (
                        <VolumeX size={18} color={theme.colors.textSecondary} />
                    )}
                </TouchableOpacity>
            </View>

            {isOn ? (
                <TouchableOpacity style={styles.display} onPress={nextStation}>
                    <View style={styles.stationInfo}>
                        <Text style={styles.stationName}>{currentStation.name}</Text>
                        <Text style={styles.genre}>{currentStation.genre}</Text>
                    </View>
                    <View style={styles.equalizer}>
                        {eqAnims.map((anim, i) => (
                            <Animated.View
                                key={i}
                                style={[
                                    styles.eqBar,
                                    {
                                        height: anim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['10%', '100%'],
                                        }),
                                    },
                                ]}
                            />
                        ))}
                    </View>
                </TouchableOpacity>
            ) : (
                <View style={styles.offDisplay}>
                    <Text style={styles.offText}>OFFLINE</Text>
                </View>
            )}
        </View>
    );
}

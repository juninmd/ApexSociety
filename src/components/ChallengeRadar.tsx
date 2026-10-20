import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { MOCK_USERS } from '../data/mock';
import ReputationWagerModal from './ReputationWagerModal';
import { styles } from './ChallengeRadarStyles';
import { User } from '../types';

export default function ChallengeRadar() {
    const [isScanning, setIsScanning] = useState(false);
    const [pulseAnim] = useState(() => new Animated.Value(0));
    const [radarAnim] = useState(() => new Animated.Value(0));
    const [targetFound, setTargetFound] = useState<User | null>(null);
    const [showWager, setShowWager] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isScanning) {
            Animated.loop(
                Animated.timing(radarAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
            ).start();

            // Simulate finding a random target after 3 seconds
            timer = setTimeout(() => {
                const randomUser = MOCK_USERS[Math.floor(Math.random() * MOCK_USERS.length)];
                setTargetFound(randomUser);
                setIsScanning(false);
                radarAnim.stopAnimation();

                // Pulse the target icon
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(pulseAnim, {
                            toValue: 1,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                        Animated.timing(pulseAnim, {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true,
                        }),
                    ]),
                ).start();
            }, 3000);
        }

        return () => {
            if (timer) clearTimeout(timer);
            radarAnim.stopAnimation();
            pulseAnim.stopAnimation();
        };
    }, [isScanning, radarAnim, pulseAnim]);

    const handleChallenge = () => {
        setShowWager(true);
    };

    return (
        <View style={styles.container}>
            {targetFound ? (
                <View style={styles.targetContainer}>
                    <Animated.View style={[styles.targetIcon, { opacity: pulseAnim }]} />
                    <Text style={styles.targetText}>TARGET: {targetFound.username}</Text>
                    <TouchableOpacity style={styles.challengeButton} onPress={handleChallenge}>
                        <Text style={styles.challengeButtonText}>RACE NOW</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity
                    style={[styles.radarButton, isScanning && styles.radarButtonActive]}
                    onPress={() => setIsScanning(true)}
                    disabled={isScanning}
                >
                    <Animated.View
                        style={[
                            styles.radarSweep,
                            {
                                transform: [
                                    {
                                        rotate: radarAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg'],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                    <Text style={styles.radarText}>
                        {isScanning ? 'SCANNING...' : 'SCAN FOR RACERS'}
                    </Text>
                </TouchableOpacity>
            )}

            {showWager && targetFound && (
                <ReputationWagerModal
                    visible={showWager}
                    onClose={() => {
                        setShowWager(false);
                        setTargetFound(null); // Reset after challenge
                    }}
                    rivalName={targetFound.username}
                />
            )}
        </View>
    );
}

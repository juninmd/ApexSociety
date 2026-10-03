import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { theme } from '../theme';
import { MOCK_USERS } from '../data/mock';
import ReputationWagerModal from './ReputationWagerModal';

export default function ChallengeRadar() {
    const [isScanning, setIsScanning] = useState(false);
    const [pulseAnim] = useState(() => new Animated.Value(0));
    const [radarAnim] = useState(() => new Animated.Value(0));
    const [targetFound, setTargetFound] = useState<any>(null);
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

            {showWager && (
                <ReputationWagerModal
                    visible={showWager}
                    onClose={() => {
                        setShowWager(false);
                        setTargetFound(null); // Reset after challenge
                    }}
                    targetUser={targetFound.username}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
    },
    radarButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderWidth: 2,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    radarButtonActive: {
        borderColor: theme.colors.secondary,
    },
    radarSweep: {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 100,
        height: 100,
        backgroundColor: 'rgba(0, 255, 0, 0.3)',
        borderBottomRightRadius: 100,
        transformOrigin: 'bottom left',
    },
    radarText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        zIndex: 10,
    },
    targetContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    targetIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.error,
        marginBottom: 10,
    },
    targetText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 18,
        marginBottom: 15,
    },
    challengeButton: {
        backgroundColor: theme.colors.error,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    challengeButtonText: {
        color: '#FFF',
        fontFamily: theme.fonts.primary.bold,
    },
});

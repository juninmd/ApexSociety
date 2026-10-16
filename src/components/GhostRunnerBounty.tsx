import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useUI } from '../context/UIContext';

interface GhostRunnerBountyProps {
    isGhostMode: boolean;
    heatLevel: number;
}

export default function GhostRunnerBounty({ isGhostMode, heatLevel }: GhostRunnerBountyProps) {
    const [evasionTime, setEvasionTime] = useState(0);
    const { addReputation } = useReputation();
    const { showAlert } = useUI();

    const evasionTimeRef = React.useRef(0);

    useEffect(() => {
        evasionTimeRef.current = evasionTime;
    }, [evasionTime]);

    useEffect(() => {
        if (!isGhostMode) {
            if (evasionTimeRef.current > 10) {
                // If they evade for more than 10 ticks (seconds)
                const bounty = Math.floor(
                    evasionTimeRef.current * (heatLevel > 0 ? heatLevel : 1) * 2,
                );
                addReputation(bounty);
                showAlert(`GHOST RUNNER BONUS: +${bounty} REP FOR SUCCESSFUL EVASION`);
            }
            setTimeout(() => setEvasionTime(0), 0);
            evasionTimeRef.current = 0;
            return;
        }

        const interval = setInterval(() => {
            setEvasionTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [isGhostMode, addReputation, heatLevel, showAlert]);

    if (!isGhostMode) return null;

    return (
        <View style={styles.container}>
            <View style={styles.banner}>
                <Text style={styles.title}>GHOST DECOY ACTIVE</Text>
                <Text style={styles.subtitle}>
                    EVASION TIMER: <Text style={styles.timer}>{evasionTime}s</Text>
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 100,
        width: '100%',
        alignItems: 'center',
        zIndex: 10,
    },
    banner: {
        backgroundColor: 'rgba(0,0,0,0.85)',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#00FFFF',
        alignItems: 'center',
    },
    title: {
        color: '#00FFFF',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        letterSpacing: 1,
    },
    subtitle: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 12,
        marginTop: 4,
    },
    timer: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
    },
});

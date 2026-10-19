import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { theme } from '../theme';
import { useTurf } from '../context/TurfContext';
import { styles } from '../screens/CrewScreenStyles';

interface TakeoverButtonProps {
    crewId: string;
    cooldown: number;
    setCooldown: (val: number) => void;
    takeoverActive: boolean;
    setTakeoverActive: (val: boolean) => void;
}

export default function TakeoverButton({
    crewId,
    cooldown,
    setCooldown,
    takeoverActive,
    setTakeoverActive,
}: TakeoverButtonProps) {
    const { claimTurf, territories } = useTurf();

    const handlePress = () => {
        const turfToClaim = territories.find((t) => t.crewId === crewId);
        if (!turfToClaim) {
            Alert.alert('TURF WAR', 'This crew has no turf to claim.');
            return;
        }

        if (!takeoverActive) {
            setTakeoverActive(true);
            Alert.alert(
                'TAKEOVER INITIATED',
                'You have begun a Turf Takeover! Win a race on their turf to claim dominance.',
            );
        } else {
            claimTurf(turfToClaim.id, 10);
            setTakeoverActive(false);
            setCooldown(60); // 60 seconds cooldown
            Alert.alert('TAKEOVER SUCCESS', '+10% DOMINANCE CLAIMED!');
        }
    };

    return (
        <TouchableOpacity
            style={[
                styles.challengeButton,
                {
                    marginTop: 10,
                    borderColor:
                        cooldown > 0
                            ? theme.colors.textSecondary
                            : takeoverActive
                              ? theme.colors.error
                              : theme.colors.primary,
                    backgroundColor:
                        cooldown > 0
                            ? 'rgba(100, 100, 100, 0.1)'
                            : takeoverActive
                              ? 'rgba(255, 0, 0, 0.1)'
                              : 'rgba(212, 175, 55, 0.1)',
                },
            ]}
            disabled={cooldown > 0}
            onPress={handlePress}
        >
            <Text
                style={[
                    styles.challengeButtonText,
                    {
                        color:
                            cooldown > 0
                                ? theme.colors.textSecondary
                                : takeoverActive
                                  ? theme.colors.error
                                  : theme.colors.primary,
                    },
                ]}
            >
                {cooldown > 0
                    ? `COOLDOWN (${cooldown}s)`
                    : takeoverActive
                      ? 'CONFIRM TAKEOVER VICTORY'
                      : 'INITIATE TAKEOVER'}
            </Text>
        </TouchableOpacity>
    );
}

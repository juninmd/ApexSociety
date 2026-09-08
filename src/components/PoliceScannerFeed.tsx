import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Radio } from 'lucide-react-native';
import { useHazards } from '../context/HazardContext';
import { theme } from '../theme';

interface Transmission {
    id: string;
    text: string;
    timestamp: number;
}

export default function PoliceScannerFeed() {
    const { hazards } = useHazards();
    const [transmissions, setTransmissions] = useState<Transmission[]>([]);
    const [isScanning, setIsScanning] = useState(false);
    const [fadeAnim] = useState(() => new Animated.Value(0));

    useEffect(() => {
        // Find recent high-severity or police/blitz hazards to trigger transmissions
        const recentHazards = hazards.filter(
            (h) => h.type === 'blitz' || h.type === 'sos' || h.severity === 'high',
        );

        if (recentHazards.length > 0) {
            const latestHazard = recentHazards[recentHazards.length - 1];

            // Check if we already logged this hazard
            const alreadyLogged = transmissions.some((t) => t.id === latestHazard.id);

            if (!alreadyLogged) {
                let msg = '';
                if (latestHazard.type === 'blitz') {
                    msg =
                        'DISPATCH: All units, unauthorized street race detected. Set up barricades on route.';
                } else if (latestHazard.type === 'sos') {
                    msg = 'DISPATCH: Officer needs assistance, high speed pursuit in progress.';
                } else {
                    msg =
                        'DISPATCH: Reports of reckless driving in the area. Proceed with caution.';
                }

                const newTransmission = {
                    id: latestHazard.id,
                    text: msg,
                    timestamp: Date.now(),
                };

                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsScanning(true);

                // Pulse animation
                Animated.sequence([
                    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                    Animated.timing(fadeAnim, {
                        toValue: 0.5,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
                ]).start();

                setTransmissions((prev) => [...prev.slice(-2), newTransmission]);

                // Reset scanning state after a few seconds
                setTimeout(() => {
                    setIsScanning(false);
                }, 5000);
            }
        }
    }, [hazards, transmissions, fadeAnim]);

    if (transmissions.length === 0) return null;

    const latestTx = transmissions[transmissions.length - 1];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Animated.View style={{ opacity: isScanning ? fadeAnim : 0.5 }}>
                    <Radio
                        color={isScanning ? theme.colors.error : theme.colors.textSecondary}
                        size={14}
                    />
                </Animated.View>
                <Text style={[styles.title, isScanning && styles.titleActive]}>
                    POLICE SCANNER {isScanning ? '[ACTIVE]' : '[STANDBY]'}
                </Text>
            </View>
            <Text style={styles.message} numberOfLines={2}>
                {latestTx.text}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderWidth: 1,
        borderColor: 'rgba(255, 0, 0, 0.3)',
        padding: 10,
        borderRadius: 4,
        marginBottom: 10,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.error,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        color: theme.colors.textSecondary,
        marginLeft: 6,
        letterSpacing: 1,
    },
    titleActive: {
        color: theme.colors.error,
    },
    message: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.text,
        fontStyle: 'italic',
    },
});

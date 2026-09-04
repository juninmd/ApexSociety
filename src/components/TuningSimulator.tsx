import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wrench } from 'lucide-react-native';
import { theme } from '../theme';

interface TuningSimulatorProps {
    initialHp?: string;
    engine?: string;
}

export default function TuningSimulator({ initialHp, engine }: TuningSimulatorProps) {
    const defaultHp = initialHp ? parseInt(initialHp.replace(/[^0-9]/g, ''), 10) : 0;
    const [hp, setHp] = useState(defaultHp);
    const [upgrades, setUpgrades] = useState({
        ecu: false,
        turbo: false,
        exhaust: false,
    });

    const handleUpgrade = (part: keyof typeof upgrades, hpBoost: number) => {
        if (!upgrades[part]) {
            setUpgrades((prev) => ({ ...prev, [part]: true }));
            setHp((prev) => prev + hpBoost);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>TUNING SIMULATOR</Text>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>ENGINE</Text>
                    <Text style={styles.statValue}>{engine || 'UNKNOWN'}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>POWER (HP)</Text>
                    <Text style={[styles.statValue, hp > defaultHp && styles.boostedValue]}>
                        {hp} HP
                    </Text>
                </View>
            </View>

            <View style={styles.partsContainer}>
                <TouchableOpacity
                    style={[styles.partButton, upgrades.ecu && styles.partButtonActive]}
                    onPress={() => handleUpgrade('ecu', 50)}
                    disabled={upgrades.ecu}
                >
                    <Wrench
                        size={16}
                        color={upgrades.ecu ? theme.colors.black : theme.colors.primary}
                    />
                    <Text style={[styles.partText, upgrades.ecu && styles.partTextActive]}>
                        ECU TUNE (+50)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.partButton, upgrades.turbo && styles.partButtonActive]}
                    onPress={() => handleUpgrade('turbo', 120)}
                    disabled={upgrades.turbo}
                >
                    <Wrench
                        size={16}
                        color={upgrades.turbo ? theme.colors.black : theme.colors.primary}
                    />
                    <Text style={[styles.partText, upgrades.turbo && styles.partTextActive]}>
                        BIG TURBO (+120)
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.partButton, upgrades.exhaust && styles.partButtonActive]}
                    onPress={() => handleUpgrade('exhaust', 15)}
                    disabled={upgrades.exhaust}
                >
                    <Wrench
                        size={16}
                        color={upgrades.exhaust ? theme.colors.black : theme.colors.primary}
                    />
                    <Text style={[styles.partText, upgrades.exhaust && styles.partTextActive]}>
                        RACING EXHAUST (+15)
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
        marginBottom: 20,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        color: theme.colors.primary,
        marginBottom: 15,
        letterSpacing: 1,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statBox: {
        flex: 1,
    },
    statLabel: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.textSecondary,
        marginBottom: 4,
    },
    statValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.white,
    },
    boostedValue: {
        color: '#4CAF50',
    },
    partsContainer: {
        gap: 10,
    },
    partButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 4,
        backgroundColor: 'transparent',
    },
    partButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    partText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.primary,
        marginLeft: 10,
    },
    partTextActive: {
        color: theme.colors.black,
    },
});

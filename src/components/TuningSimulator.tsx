import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Wrench, Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';

import { styles } from './TuningSimulatorStyles';

interface TuningSimulatorProps {
    initialHp?: string;
    engine?: string;
}

export default function TuningSimulator({ initialHp, engine }: TuningSimulatorProps) {
    const defaultHp = initialHp ? parseInt(initialHp.replace(/[^0-9]/g, ''), 10) : 0;
    const [hp, setHp] = useState(defaultHp);
    const { addReputation } = useReputation();
    const [upgrades, setUpgrades] = useState({
        ecu: false,
        turbo: false,
        exhaust: false,
    });
    const [hasWagered, setHasWagered] = useState(false);

    const handleUpgrade = (part: keyof typeof upgrades, hpBoost: number) => {
        if (!upgrades[part]) {
            setUpgrades((prev) => ({ ...prev, [part]: true }));
            setHp((prev) => prev + hpBoost);
        }
    };

    const handleWager = () => {
        if (hasWagered) {
            Alert.alert('Wager Closed', 'You have already raced this build.');
            return;
        }

        const rivalHp = defaultHp + 100; // Mock rival with +100 HP base
        setHasWagered(true);

        if (hp > rivalHp) {
            addReputation(500); // Win
            Alert.alert(
                'PINK SLIP WON',
                'Your tuning paid off! You beat the rival and gained 500 REP.',
            );
        } else {
            addReputation(-200); // Lose
            Alert.alert(
                'BUSTED',
                "Your build wasn't fast enough. The rival won, you lost 200 REP.",
            );
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Text style={styles.title}>TUNING SIMULATOR</Text>
                <TouchableOpacity
                    onPress={handleWager}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Trophy
                        color={hasWagered ? theme.colors.textSecondary : theme.colors.primary}
                        size={16}
                    />
                    <Text
                        style={{
                            color: hasWagered ? theme.colors.textSecondary : theme.colors.primary,
                            marginLeft: 4,
                            fontFamily: theme.fonts.secondary.bold,
                            fontSize: 12,
                        }}
                    >
                        WAGER PINK SLIP
                    </Text>
                </TouchableOpacity>
            </View>

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

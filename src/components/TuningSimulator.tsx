import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Wrench } from 'lucide-react-native';
import { theme } from '../theme';

import { styles } from './TuningSimulatorStyles';

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

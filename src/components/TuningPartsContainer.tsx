import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Wrench } from 'lucide-react-native';
import { theme } from '../theme';
import { styles } from './TuningSimulatorStyles';

interface TuningPartsContainerProps {
    upgrades: { ecu: boolean; turbo: boolean; exhaust: boolean };
    handleUpgrade: (part: 'ecu' | 'turbo' | 'exhaust', hpBoost: number) => void;
}

export default function TuningPartsContainer({ upgrades, handleUpgrade }: TuningPartsContainerProps) {
    return (
        <View style={styles.partsContainer}>
            <TouchableOpacity
                style={[styles.partButton, upgrades.ecu && styles.partButtonActive]}
                onPress={() => handleUpgrade('ecu', 50)}
                disabled={upgrades.ecu}
            >
                <Wrench size={16} color={upgrades.ecu ? theme.colors.black : theme.colors.primary} />
                <Text style={[styles.partText, upgrades.ecu && styles.partTextActive]}>
                    ECU TUNE (+50)
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.partButton, upgrades.turbo && styles.partButtonActive]}
                onPress={() => handleUpgrade('turbo', 120)}
                disabled={upgrades.turbo}
            >
                <Wrench size={16} color={upgrades.turbo ? theme.colors.black : theme.colors.primary} />
                <Text style={[styles.partText, upgrades.turbo && styles.partTextActive]}>
                    BIG TURBO (+120)
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.partButton, upgrades.exhaust && styles.partButtonActive]}
                onPress={() => handleUpgrade('exhaust', 15)}
                disabled={upgrades.exhaust}
            >
                <Wrench size={16} color={upgrades.exhaust ? theme.colors.black : theme.colors.primary} />
                <Text style={[styles.partText, upgrades.exhaust && styles.partTextActive]}>
                    RACING EXHAUST (+15)
                </Text>
            </TouchableOpacity>
        </View>
    );
}

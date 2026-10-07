import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Wrench, Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useWeather } from '../hooks/useWeather';
import { styles } from './TuningSimulatorStyles';
import TuningStatsRow from './tuning/TuningStatsRow';
import TuningPartsContainer from './tuning/TuningPartsContainer';

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
    const [wear, setWear] = useState(0);
    const [tires, setTires] = useState<'Street' | 'Slick'>('Street');
    const { isRaining } = useWeather();

    const handleUpgrade = (part: keyof typeof upgrades, hpBoost: number) => {
        if (!upgrades[part]) {
            setUpgrades((prev) => ({ ...prev, [part]: true }));
            setHp((prev) => prev + hpBoost);
            setWear((prev) => Math.min(prev + 10, 100)); // Increase wear on tuning
        }
    };

    const handleWager = () => {
        if (wear >= 100) {
            Alert.alert(
                'Vehicle Damaged',
                'Your vehicle wear is at 100%. Repair it before racing.',
            );
            return;
        }

        if (hasWagered) {
            Alert.alert('Wager Closed', 'You have already raced this build.');
            return;
        }

        // Apply weather penalty
        let effectiveHp = hp;
        if (isRaining && tires === 'Slick') {
            effectiveHp -= 150; // Severe penalty for slicks in the rain
            Alert.alert(
                'WEATHER PENALTY',
                'Racing slicks in the rain caused a severe loss of traction (-150 HP equivalent)',
            );
        }

        const rivalHp = defaultHp + 100; // Mock rival with +100 HP base
        setHasWagered(true);
        setWear((prev) => Math.min(prev + 20, 100)); // Increase wear on racing

        if (effectiveHp > rivalHp) {
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

    const handleRepair = () => {
        if (wear === 0) return;
        addReputation(-100);
        setWear(0);
        Alert.alert('Repaired', 'Vehicle fully repaired for 100 REP.');
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
                        color={
                            hasWagered || wear >= 100
                                ? theme.colors.textSecondary
                                : theme.colors.primary
                        }
                        size={16}
                    />
                    <Text
                        style={{
                            color:
                                hasWagered || wear >= 100
                                    ? theme.colors.textSecondary
                                    : theme.colors.primary,
                            marginLeft: 4,
                            fontFamily: theme.fonts.secondary.bold,
                            fontSize: 12,
                        }}
                    >
                        WAGER PINK SLIP
                    </Text>
                </TouchableOpacity>
            </View>

            <TuningStatsRow engine={engine} hp={hp} defaultHp={defaultHp} wear={wear} />

            <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 }}
            >
                <Text
                    style={{
                        color: theme.colors.textSecondary,
                        fontFamily: theme.fonts.secondary.bold,
                    }}
                >
                    TIRE COMPOUND:
                </Text>
                <TouchableOpacity onPress={() => setTires(tires === 'Street' ? 'Slick' : 'Street')}>
                    <Text
                        style={{
                            color: tires === 'Slick' ? theme.colors.error : theme.colors.primary,
                            fontFamily: theme.fonts.primary.bold,
                        }}
                    >
                        {tires}
                    </Text>
                </TouchableOpacity>
            </View>

            {wear > 0 && (
                <TouchableOpacity style={styles.repairButton} onPress={handleRepair}>
                    <Wrench size={16} color={theme.colors.black} />
                    <Text style={styles.repairButtonText}>REPAIR VEHICLE (-100 REP)</Text>
                </TouchableOpacity>
            )}

            <TuningPartsContainer upgrades={upgrades} handleUpgrade={handleUpgrade} />
        </View>
    );
}

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Wrench, Trophy } from 'lucide-react-native';
import { theme } from '../theme';
import { useTuningSimulation } from '../hooks/useTuningSimulation';
import { styles } from './TuningSimulatorStyles';
import TuningStatsRow from './tuning/TuningStatsRow';
import TuningPartsContainer from './tuning/TuningPartsContainer';

interface TuningSimulatorProps {
    initialHp?: string;
    engine?: string;
}

export default function TuningSimulator({ initialHp, engine }: TuningSimulatorProps) {
    const defaultHp = initialHp ? parseInt(initialHp.replace(/[^0-9]/g, ''), 10) : 0;

    const {
        hp,
        upgrades,
        hasWagered,
        wear,
        tires,
        setTires,
        handleUpgrade,
        handleWager,
        handleRepair,
        weatherPenalty,
        isImpounded,
        handlePayBribe,
    } = useTuningSimulation(defaultHp);

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
                    disabled={isImpounded}
                >
                    <Trophy
                        color={
                            hasWagered || wear >= 100 || isImpounded
                                ? theme.colors.textSecondary
                                : theme.colors.primary
                        }
                        size={16}
                    />
                    <Text
                        style={{
                            color:
                                hasWagered || wear >= 100 || isImpounded
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

            <TuningStatsRow
                engine={engine}
                hp={hp}
                defaultHp={defaultHp}
                wear={wear}
                weatherPenalty={weatherPenalty}
                isImpounded={isImpounded}
            />

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

            {isImpounded ? (
                <TouchableOpacity
                    style={[styles.repairButton, { backgroundColor: theme.colors.error }]}
                    onPress={handlePayBribe}
                >
                    <Wrench size={16} color={theme.colors.black} />
                    <Text style={styles.repairButtonText}>PAY BRIBE (-300 REP)</Text>
                </TouchableOpacity>
            ) : wear > 0 ? (
                <TouchableOpacity style={styles.repairButton} onPress={handleRepair}>
                    <Wrench size={16} color={theme.colors.black} />
                    <Text style={styles.repairButtonText}>REPAIR VEHICLE (-100 REP)</Text>
                </TouchableOpacity>
            ) : null}

            <TuningPartsContainer upgrades={upgrades} handleUpgrade={handleUpgrade} />
        </View>
    );
}

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './TuningSimulatorStyles';

interface TuningStatsRowProps {
    engine?: string;
    hp: number;
    defaultHp: number;
    wear: number;
}

export default function TuningStatsRow({ engine, hp, defaultHp, wear }: TuningStatsRowProps) {
    return (
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
            <View style={styles.statBox}>
                <Text style={styles.statLabel}>WEAR</Text>
                <Text style={[styles.statValue, wear >= 80 ? styles.highWear : styles.normalWear]}>
                    {wear}%
                </Text>
            </View>
        </View>
    );
}

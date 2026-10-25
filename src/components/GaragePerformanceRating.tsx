import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { CarItem } from './CarCard';

interface GaragePerformanceRatingProps {
    cars: CarItem[];
}

export default function GaragePerformanceRating({ cars }: GaragePerformanceRatingProps) {
    const calculateRating = () => {
        let totalHp = 0;
        cars.forEach((car) => {
            if (car.specs?.hp) {
                const hpValue = parseInt(car.specs.hp.replace(/[^0-9]/g, ''), 10) || 0;
                totalHp += hpValue;
            }
        });

        if (totalHp > 1500) return { rank: 'S-TIER', color: '#FFE600' }; // Gold
        if (totalHp > 1000) return { rank: 'A-TIER', color: '#00F0FF' }; // Cyan
        if (totalHp > 500) return { rank: 'B-TIER', color: '#FF0055' }; // Pink
        return { rank: 'C-TIER', color: theme.colors.secondary };
    };

    const rating = calculateRating();

    return (
        <View style={styles.container}>
            <Text style={styles.label}>GARAGE RATING</Text>
            <View style={[styles.badge, { borderColor: rating.color }]}>
                <Text style={[styles.badgeText, { color: rating.color }]}>{rating.rank}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    label: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        color: theme.colors.secondary,
        marginRight: 10,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        borderWidth: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    badgeText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
});

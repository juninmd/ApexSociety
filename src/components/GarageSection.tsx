import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Car } from 'lucide-react-native';
import { theme } from '../theme';
import CarCard, { CarItem } from './CarCard';

interface GarageSectionProps {
    cars: CarItem[];
}

export default function GarageSection({ cars }: GarageSectionProps) {
    const [respectedCars, setRespectedCars] = useState<Record<string, number>>({});

    const handleRespect = (carId: string) => {
        setRespectedCars((prev) => ({
            ...prev,
            [carId]: (prev[carId] || 0) + 1,
        }));
    };

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>MY GARAGE</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>SEE ALL</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.garageList}
            >
                {cars.map((car) => (
                    <CarCard
                        key={car.id}
                        car={car}
                        isRespected={!!respectedCars[car.id]}
                        respectCount={respectedCars[car.id] || 0}
                        onRespect={handleRespect}
                    />
                ))}
                <TouchableOpacity style={styles.addCarCard}>
                    <Car color={theme.colors.secondary} size={32} />
                    <Text style={styles.addCarText}>ADD RIDE</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
        letterSpacing: 1,
    },
    seeAll: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.primary,
    },
    garageList: {
        paddingLeft: 20,
    },
    addCarCard: {
        width: 100,
        height: 140,
        marginRight: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
    },
    addCarText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.secondary,
        marginTop: 10,
    },
});

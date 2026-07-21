import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, Heart } from 'lucide-react-native';
import { theme } from '../theme';

interface CarItem {
    id: string;
    name: string;
    image: string;
}

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
                    <View key={car.id} style={styles.carCard}>
                        <Image source={{ uri: car.image }} style={styles.carImage} />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.9)']}
                            style={styles.carOverlay}
                        >
                            <View style={styles.carDetails}>
                                <Text style={styles.carName}>{car.name}</Text>
                                <TouchableOpacity
                                    style={styles.respectButton}
                                    onPress={() => handleRespect(car.id)}
                                >
                                    <Heart
                                        size={16}
                                        color={
                                            respectedCars[car.id]
                                                ? theme.colors.primary
                                                : theme.colors.white
                                        }
                                        fill={respectedCars[car.id] ? theme.colors.primary : 'none'}
                                    />
                                    <Text style={styles.respectCount}>
                                        {respectedCars[car.id] || 0}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
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
    carCard: {
        width: 200,
        height: 140,
        marginRight: 15,
        backgroundColor: theme.colors.card,
        position: 'relative',
        overflow: 'hidden',
    },
    carImage: {
        width: '100%',
        height: '100%',
    },
    carOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        paddingTop: 40,
    },
    carDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    carName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.white,
    },
    respectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    respectCount: {
        color: theme.colors.white,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 4,
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

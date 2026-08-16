import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Wrench } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';

export interface CarSpecs {
    engine?: string;
    hp?: string;
}

export interface CarItem {
    id: string;
    name: string;
    image: string;
    specs?: CarSpecs;
}

interface CarCardProps {
    car: CarItem;
    isRespected: boolean;
    onRespect: (id: string) => void;
    respectCount: number;
    onPress?: () => void;
}

export default function CarCard({
    car,
    isRespected,
    onRespect,
    respectCount,
    onPress,
}: CarCardProps) {
    const { addReputation } = useReputation();
    const [tunedHp, setTunedHp] = useState<number | null>(null);

    const handleRespectPress = () => {
        onRespect(car.id);
        if (!isRespected) {
            addReputation(5); // +5 rep for a car like
        }
    };

    const handleTune = () => {
        if (car.specs?.hp) {
            const currentHp = tunedHp || parseInt(car.specs.hp.replace(/[^0-9]/g, ''), 10) || 0;
            setTunedHp(currentHp + 10);
        }
    };

    return (
        <TouchableOpacity style={styles.carCard} onPress={onPress} activeOpacity={0.9}>
            <Image source={{ uri: car.image }} style={styles.carImage} />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.carOverlay}>
                <View style={styles.carDetails}>
                    <View>
                        <Text style={styles.carName}>{car.name}</Text>
                        {car.specs && (
                            <View style={styles.specsContainer}>
                                <Text style={styles.carSpecsText}>
                                    {car.specs.engine}
                                    {car.specs.hp
                                        ? ` | ${tunedHp ? tunedHp + ' HP' : car.specs.hp}`
                                        : ''}
                                </Text>
                                <TouchableOpacity style={styles.tuneButton} onPress={handleTune}>
                                    <Wrench
                                        size={10}
                                        color={tunedHp ? '#4CAF50' : theme.colors.secondary}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    <TouchableOpacity style={styles.respectButton} onPress={handleRespectPress}>
                        <Heart
                            size={16}
                            color={isRespected ? theme.colors.primary : theme.colors.white}
                            fill={isRespected ? theme.colors.primary : 'none'}
                        />
                        <Text style={styles.respectCount}>{respectCount}</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
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
        alignItems: 'flex-end',
    },
    carName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.white,
    },
    specsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    carSpecsText: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.secondary,
    },
    tuneButton: {
        marginLeft: 6,
        padding: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 4,
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
});

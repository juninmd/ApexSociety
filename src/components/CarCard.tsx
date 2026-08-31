import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, Wrench, ScanEye } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { styles } from './CarCardStyles';

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
    const [isShowcaseMode, setIsShowcaseMode] = useState(false);
    const [scanAnim] = useState(() => new Animated.Value(0));

    const toggleShowcase = () => {
        if (!isShowcaseMode) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(scanAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scanAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        } else {
            scanAnim.stopAnimation();
        }
        setIsShowcaseMode(!isShowcaseMode);
    };

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

    const hpValue =
        tunedHp || (car.specs?.hp ? parseInt(car.specs.hp.replace(/[^0-9]/g, ''), 10) : 0) || 0;
    // Cap max display HP at 1200 for the progress bar calculation
    const hpProgress = Math.min((hpValue / 1200) * 100, 100);

    return (
        <TouchableOpacity
            style={[styles.carCard, isShowcaseMode && styles.showcaseMode]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <Image source={{ uri: car.image }} style={styles.carImage} />
            <TouchableOpacity style={styles.showcaseButton} onPress={toggleShowcase}>
                <ScanEye size={16} color="#00F0FF" />
            </TouchableOpacity>
            {isShowcaseMode && (
                <Animated.View
                    style={[
                        styles.showcaseOverlay,
                        {
                            opacity: scanAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.5, 1],
                            }),
                        },
                    ]}
                    pointerEvents="none"
                >
                    <Text style={styles.showcaseText}>AR SHOWCASE ACTIVE</Text>
                </Animated.View>
            )}
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={styles.carOverlay}>
                <View style={styles.carDetails}>
                    <View style={{ flex: 1, paddingRight: 10 }}>
                        <Text style={styles.carName}>{car.name}</Text>
                        {car.specs && (
                            <>
                                <View style={styles.specsContainer}>
                                    <Text style={styles.carSpecsText}>
                                        {car.specs.engine}
                                        {car.specs.hp ? ` | ${hpValue} HP` : ''}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.tuneButton}
                                        onPress={handleTune}
                                    >
                                        <Wrench
                                            size={10}
                                            color={tunedHp ? '#4CAF50' : theme.colors.secondary}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.statsContainer}>
                                    <View
                                        style={[
                                            styles.statsBar,
                                            {
                                                width: `${hpProgress}%`,
                                                backgroundColor: tunedHp
                                                    ? '#4CAF50'
                                                    : theme.colors.primary,
                                            },
                                        ]}
                                    />
                                </View>
                            </>
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

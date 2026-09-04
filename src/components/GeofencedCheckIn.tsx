import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';
import { theme } from '../theme';
import { getDistance } from '../utils/location';
import { useReputation } from '../context/ReputationContext';

interface GeofencedCheckInProps {
    eventId: string;
    eventLatitude?: number;
    eventLongitude?: number;
    radiusInKm?: number;
}

export default function GeofencedCheckIn({
    eventId,
    eventLatitude,
    eventLongitude,
    radiusInKm = 0.5, // 500 meters default
}: GeofencedCheckInProps) {
    const { addReputation } = useReputation();
    const [isCheckedIn, setIsCheckedIn] = useState(false);
    const [checking, setChecking] = useState(false);

    const handleCheckIn = async () => {
        if (!eventLatitude || !eventLongitude) {
            Alert.alert('Error', 'Event coordinates not available.');
            return;
        }

        setChecking(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Location access is required for check-in.');
                setChecking(false);
                return;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const distance = getDistance(
                location.coords.latitude,
                location.coords.longitude,
                eventLatitude,
                eventLongitude,
            );

            if (distance <= radiusInKm) {
                setIsCheckedIn(true);
                addReputation(50); // Award rep for attending
                Alert.alert('CHECK-IN SUCESSO', 'Você ganhou 50 REP por comparecer!');
            } else {
                Alert.alert(
                    'Fora de Alcance',
                    `Você está a ${distance.toFixed(1)}km do evento. O limite é ${radiusInKm}km.`,
                );
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível obter sua localização.');
        } finally {
            setChecking(false);
        }
    };

    if (!eventLatitude || !eventLongitude) return null;

    if (isCheckedIn) {
        return (
            <View style={styles.checkedInContainer}>
                <MapPin size={16} color={theme.colors.primary} />
                <Text style={styles.checkedInText}>CHECKED IN</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.checkInButton} onPress={handleCheckIn} disabled={checking}>
            <MapPin size={16} color={theme.colors.black} />
            <Text style={styles.checkInButtonText}>
                {checking ? 'VERIFYING...' : 'GEOFENCED CHECK-IN'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkInButton: {
        backgroundColor: theme.colors.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 15,
        gap: 8,
    },
    checkInButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
        letterSpacing: 1,
    },
    checkedInContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 4,
        marginTop: 15,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        gap: 8,
    },
    checkedInText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
        letterSpacing: 1,
    },
});

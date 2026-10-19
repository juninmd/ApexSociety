import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';
import { theme } from '../theme';
import { getDistance } from '../utils/location';
import { useReputation } from '../context/ReputationContext';
import { useTurf } from '../context/TurfContext';
import { styles } from './GeofencedCheckInStyles';

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
    const { territories } = useTurf();
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

                // Check if the event is inside a claimed turf for bonus
                let isBonusTurf = false;
                for (const territory of territories) {
                    const turfDistance = getDistance(
                        eventLatitude,
                        eventLongitude,
                        territory.center.latitude,
                        territory.center.longitude,
                    );
                    if (turfDistance <= territory.radius / 1000) {
                        // Assuming radius is in meters based on typical map usage, dividing by 1000 to match km output of getDistance
                        isBonusTurf = true;
                        break;
                    }
                }

                if (isBonusTurf) {
                    addReputation(100);
                    Alert.alert(
                        'BÔNUS DE TERRITÓRIO!',
                        'Você ganhou 100 REP (2x) por comparecer em área dominada!',
                    );
                } else {
                    addReputation(50); // Award regular rep for attending
                    Alert.alert('CHECK-IN SUCESSO', 'Você ganhou 50 REP por comparecer!');
                }
            } else {
                Alert.alert(
                    'Fora de Alcance',
                    `Você está a ${distance.toFixed(1)}km do evento. O limite é ${radiusInKm}km.`,
                );
            }
        } catch {
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

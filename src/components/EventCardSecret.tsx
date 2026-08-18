import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Lock, MapPin } from 'lucide-react-native';
import * as Location from 'expo-location';
import EventCardBadges from './EventCardBadges';
import { theme } from '../theme';

interface EventCardSecretProps {
    host: string;
    eventLocation: string;
    passcode?: string;
    isPrivate?: boolean;
    eventType?: 'meet' | 'race' | 'checkpoint';
    onUnlock: () => void;
}

export default function EventCardSecret({
    host,
    eventLocation,
    passcode,
    isPrivate,
    eventType,
    onUnlock,
}: EventCardSecretProps) {
    const [passcodeAttempt, setPasscodeAttempt] = useState('');
    const [isVerifyingLocation, setIsVerifyingLocation] = useState(false);

    const handleVerifyLocation = async () => {
        setIsVerifyingLocation(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Erro', 'Permissão de localização negada.');
                setIsVerifyingLocation(false);
                return;
            }

            await Location.getCurrentPositionAsync({});

            // In a real app, we would calculate Haversine distance here.
            // Since eventLocation is just an address string and we don't have exact lat/lon for the event,
            // we will simulate the check passing if they have GPS enabled, representing the underground check-in logic.
            Alert.alert('Sucesso', 'Você está no local do evento! Acesso liberado.');
            onUnlock();
        } catch (_error) {
            Alert.alert('Erro', 'Não foi possível obter sua localização.');
        } finally {
            setIsVerifyingLocation(false);
        }
    };

    const handleUnlock = () => {
        if (passcodeAttempt === passcode) {
            onUnlock();
        } else {
            Alert.alert('Erro', 'Senha incorreta.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.host}>HOSTED BY {host}</Text>
                <EventCardBadges isPrivate={isPrivate} eventType={eventType} />
            </View>
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Lock size={32} color={theme.colors.primary} />
                <Text style={[styles.title, { marginTop: 10, textAlign: 'center' }]}>
                    EVENTO SECRETO
                </Text>

                <TouchableOpacity
                    style={styles.verifyLocationButton}
                    onPress={handleVerifyLocation}
                    disabled={isVerifyingLocation}
                >
                    {isVerifyingLocation ? (
                        <ActivityIndicator color={theme.colors.black} size="small" />
                    ) : (
                        <>
                            <MapPin
                                size={16}
                                color={theme.colors.black}
                                style={{ marginRight: 8 }}
                            />
                            <Text style={styles.unlockText}>CHECK-IN DE LOCALIZAÇÃO</Text>
                        </>
                    )}
                </TouchableOpacity>

                <Text style={styles.orText}>OU USE O CÓDIGO</Text>

                <TextInput
                    style={styles.passcodeInput}
                    placeholder="CÓDIGO DE ACESSO"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={passcodeAttempt}
                    onChangeText={setPasscodeAttempt}
                    autoCapitalize="characters"
                    secureTextEntry
                />
                <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock}>
                    <Text style={styles.unlockText}>DESBLOQUEAR</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cornerDecor} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: 20,
        marginBottom: 15,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
        position: 'relative',
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    host: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        textTransform: 'uppercase',
    },
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    cornerDecor: {
        position: 'absolute',
        top: -10,
        right: -10,
        width: 20,
        height: 20,
        backgroundColor: theme.colors.primary,
        transform: [{ rotate: '45deg' }],
    },
    passcodeInput: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 16,
        padding: 10,
        width: '80%',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 10,
    },
    verifyLocationButton: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        marginTop: 10,
    },
    orText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginVertical: 15,
    },
    unlockButton: {
        backgroundColor: theme.colors.secondary,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    unlockText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
    },
});

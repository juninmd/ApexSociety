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
import { theme } from '../theme';

interface EventCardSecretActionProps {
    passcode?: string;
    onUnlock: () => void;
}

export default function EventCardSecretAction({ passcode, onUnlock }: EventCardSecretActionProps) {
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

            Alert.alert('Sucesso', 'Você está no local do evento! Acesso liberado.');
            onUnlock();
        } catch {
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
                        <MapPin size={16} color={theme.colors.black} style={{ marginRight: 8 }} />
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
    );
}

const styles = StyleSheet.create({
    title: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        marginBottom: 10,
        textTransform: 'uppercase',
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

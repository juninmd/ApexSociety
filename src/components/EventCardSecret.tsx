import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Lock } from 'lucide-react-native';
import EventCardBadges from './EventCardBadges';
import { theme } from '../theme';

interface EventCardSecretProps {
    host: string;
    passcode?: string;
    isPrivate?: boolean;
    eventType?: 'meet' | 'race' | 'checkpoint';
    onUnlock: () => void;
}

export default function EventCardSecret({
    host,
    passcode,
    isPrivate,
    eventType,
    onUnlock,
}: EventCardSecretProps) {
    const [passcodeAttempt, setPasscodeAttempt] = React.useState('');

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
    unlockButton: {
        backgroundColor: theme.colors.primary,
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

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { MapPin, Users, Clock, Lock } from 'lucide-react-native';
import EventCardBadges from './EventCardBadges';
import EventCardRaceDetails from './EventCardRaceDetails';
import { theme } from '../theme';

interface EventCardProps {
    title: string;
    host: string;
    location: string;
    time: string;
    attendees: number;
    isPrivate?: boolean;
    eventType?: 'meet' | 'race' | 'checkpoint';
    riskLevel?: 'low' | 'medium' | 'high';
    prize?: string;
    isSecret?: boolean;
    passcode?: string;
    onPress?: () => void;
}

export default function EventCard({
    title,
    host,
    location,
    time,
    attendees,
    isPrivate,
    eventType,
    riskLevel,
    prize,
    isSecret,
    passcode,
    onPress,
}: EventCardProps) {
    const [rsvp, setRsvp] = React.useState(false);
    const [isUnlocked, setIsUnlocked] = React.useState(false);
    const [passcodeAttempt, setPasscodeAttempt] = React.useState('');

    const handleUnlock = () => {
        if (passcodeAttempt === passcode) {
            setIsUnlocked(true);
        } else {
            Alert.alert('Erro', 'Senha incorreta.');
        }
    };

    if (isSecret && !isUnlocked) {
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

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.header}>
                <Text style={styles.host}>HOSTED BY {host}</Text>
                <EventCardBadges isPrivate={isPrivate} eventType={eventType} />
            </View>

            <Text style={styles.title} numberOfLines={1}>
                {title}
            </Text>

            <View style={styles.infoRow}>
                <View style={styles.infoItem}>
                    <Clock size={14} color={theme.colors.primary} />
                    <Text style={styles.infoText}>{time}</Text>
                </View>
                <View style={styles.infoItem}>
                    <MapPin size={14} color={theme.colors.primary} />
                    <Text style={styles.infoText}>{location}</Text>
                </View>
            </View>

            <EventCardRaceDetails riskLevel={riskLevel} prize={prize} />

            <View style={styles.footer}>
                <View style={styles.attendeesContainer}>
                    <Users size={14} color={theme.colors.secondary} />
                    <Text style={styles.attendees}>{attendees + (rsvp ? 1 : 0)} GOING</Text>
                </View>
                <TouchableOpacity
                    style={[styles.rsvpButton, rsvp && styles.rsvpButtonActive]}
                    onPress={() => setRsvp(!rsvp)}
                >
                    <Text style={[styles.rsvpText, rsvp && styles.rsvpTextActive]}>
                        {rsvp ? 'CONFIRMADO' : 'PARTICIPAR'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Decorative "Stitch" corner */}
            <View style={styles.cornerDecor} />
        </TouchableOpacity>
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
    infoRow: {
        marginBottom: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    infoText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginLeft: 8,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
        paddingTop: 10,
    },
    attendeesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    attendees: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginLeft: 6,
    },
    rsvpButton: {
        borderWidth: 1,
        borderColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 4,
        transform: [{ skewX: '-10deg' }],
    },
    rsvpButtonActive: {
        backgroundColor: theme.colors.primary,
    },
    rsvpText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
        transform: [{ skewX: '10deg' }],
    },
    rsvpTextActive: {
        color: theme.colors.black,
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

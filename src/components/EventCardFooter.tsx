import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { Users } from 'lucide-react-native';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useEvents } from '../context/EventContext';
import GarageQRPass from './GarageQRPass';

interface EventCardFooterProps {
    eventId: string;
    attendees: number;
    startTime?: string;
    endTime?: string;
}

export default function EventCardFooter({ eventId, attendees, startTime }: EventCardFooterProps) {
    const [rsvp, setRsvp] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const isLive = startTime?.toLowerCase() === 'agora' || false;
    const { addReputation } = useReputation();
    const { incrementHype } = useEvents();

    const handlePress = async () => {
        if (rsvp) {
            setRsvp(false);
            return;
        }

        if (isLive) {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Erro', 'Permissão de localização negada.');
                    return;
                }

                // Simulate getting location
                await Location.getCurrentPositionAsync({});

                Alert.alert('Sucesso', 'Check-in por Localização validado! +20 REP');
                if (addReputation) addReputation(20);
                if (incrementHype) incrementHype(eventId);
                setRsvp(true);
            } catch {
                Alert.alert('Erro', 'Não foi possível verificar sua localização.');
            }
        } else {
            if (addReputation) addReputation(10);
            if (incrementHype) incrementHype(eventId);
            setRsvp(true);
        }
    };

    const handleBoostHype = () => {
        if (incrementHype) {
            incrementHype(eventId);
        }
        if (addReputation) {
            addReputation(5); // Small rep reward for boosting event visibility
        }
    };

    return (
        <View style={styles.footer}>
            <View style={styles.attendeesContainer}>
                <Users size={14} color={theme.colors.secondary} />
                <Text style={styles.attendees}>{attendees + (rsvp ? 1 : 0)} GOING</Text>

                <TouchableOpacity onPress={handleBoostHype} style={styles.boostButton}>
                    <Text style={styles.boostText}>🔥 BOOST</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={styles.fastTrackButton}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.fastTrackText}>PASS</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.rsvpButton,
                        isLive && styles.liveButton,
                        rsvp && !isLive && styles.rsvpButtonActive,
                    ]}
                    onPress={handlePress}
                >
                    <Text
                        style={[
                            styles.rsvpText,
                            isLive && styles.liveText,
                            rsvp && !isLive && styles.rsvpTextActive,
                        ]}
                    >
                        {isLive
                            ? rsvp
                                ? 'CHECKED-IN'
                                : 'CHECK-IN (LIVE)'
                            : rsvp
                              ? 'CONFIRMADO'
                              : 'PARTICIPAR'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setModalVisible(false)}
                >
                    <GarageQRPass eventId={eventId} />
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
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
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fastTrackButton: {
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
        transform: [{ skewX: '-10deg' }],
    },
    fastTrackText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 10,
        transform: [{ skewX: '10deg' }],
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
    liveButton: {
        borderColor: theme.colors.error,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
    },
    liveText: {
        color: theme.colors.error,
    },
    boostButton: {
        marginLeft: 15,
        backgroundColor: 'rgba(255, 69, 0, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 69, 0, 0.3)',
    },
    boostText: {
        color: '#FF4500',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

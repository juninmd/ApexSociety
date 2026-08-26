import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Users } from 'lucide-react-native';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useEvents } from '../context/EventContext';
import GarageQRPassModal from './GarageQRPassModal';
import EventCardActionButtons from './EventCardActionButtons';

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
            <EventCardActionButtons
                isLive={isLive}
                rsvp={rsvp}
                onFastTrackPress={() => setModalVisible(true)}
                onRsvpPress={handlePress}
            />

            <GarageQRPassModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                eventId={eventId}
            />
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
});

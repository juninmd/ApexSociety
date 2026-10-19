import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Users } from 'lucide-react-native';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import { useEvents } from '../context/EventContext';
import GarageQRPassModal from './GarageQRPassModal';
import EventCardActionButtons from './EventCardActionButtons';
import EventDroneRecon from './EventDroneRecon';
import ShowAndShineVotingModal from './ShowAndShineVotingModal';
import EventLiveFeed from './EventLiveFeed';
import { styles } from './EventCardFooterStyles';

interface EventCardFooterProps {
    eventId: string;
    attendees: number;
    startTime?: string;
    endTime?: string;
    eventLatitude?: number;
    eventLongitude?: number;
}

export default function EventCardFooter({
    eventId,
    attendees,
    startTime,
    eventLatitude,
    eventLongitude,
}: EventCardFooterProps) {
    const [rsvp, setRsvp] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [droneReconVisible, setDroneReconVisible] = useState(false);
    const [showAndShineVisible, setShowAndShineVisible] = useState(false);
    const [liveFeedVisible, setLiveFeedVisible] = useState(false);
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

                {isLive && (
                    <TouchableOpacity
                        onPress={() => setLiveFeedVisible(true)}
                        style={[
                            styles.boostButton,
                            {
                                borderColor: theme.colors.secondary,
                                backgroundColor: 'rgba(0, 255, 255, 0.1)',
                            },
                        ]}
                    >
                        <Text style={[styles.boostText, { color: theme.colors.secondary }]}>
                            💬 LIVE
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
            <EventCardActionButtons
                isLive={isLive}
                rsvp={rsvp}
                onFastTrackPress={() => setModalVisible(true)}
                onRsvpPress={handlePress}
                onDroneReconPress={
                    eventLatitude !== undefined && eventLongitude !== undefined
                        ? () => setDroneReconVisible(true)
                        : undefined
                }
                onShowAndShinePress={isLive ? () => setShowAndShineVisible(true) : undefined}
            />

            <GarageQRPassModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                eventId={eventId}
            />

            {eventLatitude !== undefined && eventLongitude !== undefined && (
                <EventDroneRecon
                    visible={droneReconVisible}
                    eventLocation={{ latitude: eventLatitude, longitude: eventLongitude }}
                    onClose={() => setDroneReconVisible(false)}
                />
            )}

            {isLive && (
                <ShowAndShineVotingModal
                    visible={showAndShineVisible}
                    onClose={() => setShowAndShineVisible(false)}
                    eventId={eventId}
                />
            )}

            <EventLiveFeed
                visible={liveFeedVisible}
                onClose={() => setLiveFeedVisible(false)}
                eventId={eventId}
            />
        </View>
    );
}

import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Plus, Zap } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import EventCard from '../components/EventCard';
import { RootStackParamList } from '../navigation/types';
import { useEvents } from '../context/EventContext';
import { useHazards } from '../context/HazardContext';

export default function EventsScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { events, addEvent } = useEvents();
    const { heatLevel } = useHazards();

    const spawnFlashMeet = () => {
        const newFlashMeet = {
            id: `flash-${Date.now()}`,
            title: '🔥 FLASH MEET: UNDERGROUND',
            hostId: 'c1', // Mock host ID
            location: {
                latitude: -23.5505,
                longitude: -46.6333,
                address: 'Secret Location, SP',
            },
            startTime: new Date(Date.now() + 1000 * 60 * 15).toISOString(), // In 15 minutes
            endTime: new Date(Date.now() + 1000 * 60 * 45).toISOString(), // Ends 30 mins after start
            attendees: 0,
            isPrivate: true,
            eventType: 'checkpoint' as const,
            riskLevel: 'high' as const,
            prize: '1500 REP & UNIQUE BADGE',
            isSecret: true,
            passcode: 'SPEED',
            hypeScore: 120, // Start hyped!
        };
        addEvent(newFlashMeet);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>EVENTOS DE CARRO E CORRIDAS</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={spawnFlashMeet} style={{ marginRight: 15 }}>
                        <Zap color={theme.colors.error} size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
                        <Plus color={theme.colors.primary} size={32} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.list}>
                {events.map((event) => {
                    const host = MOCK_CREWS.find((c) => c.id === event.hostId);
                    return (
                        <EventCard
                            key={event.id}
                            eventId={event.id}
                            title={event.title}
                            host={host?.name || 'Unknown Host'}
                            location={event.location.address || 'Unknown Location'}
                            time={event.startTime}
                            attendees={event.attendees}
                            isPrivate={event.isPrivate}
                            eventType={event.eventType}
                            riskLevel={event.riskLevel}
                            prize={event.prize}
                            isSecret={event.isSecret}
                            passcode={event.passcode}
                            weather={event.weather}
                            elevatedRisk={heatLevel > 1} // Heat level > 1 triggers warning
                            eventLatitude={event.location.latitude}
                            eventLongitude={event.location.longitude}
                            onPress={() => {}} // No-op for now
                        />
                    );
                })}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        textTransform: 'uppercase',
        flex: 1,
    },
    headerButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        padding: 20,
        paddingTop: 0,
    },
});

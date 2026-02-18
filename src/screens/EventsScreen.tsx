import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { theme } from '../theme';
import { MOCK_EVENTS, MOCK_CREWS } from '../data/mock';
import EventCard from '../components/EventCard';

export default function EventsScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>UPCOMING EVENTS</Text>
            </View>
            <View style={styles.list}>
                {MOCK_EVENTS.map((event) => {
                    const host = MOCK_CREWS.find((c) => c.id === event.hostId);
                    return (
                        <EventCard
                            key={event.id}
                            title={event.title}
                            host={host?.name || 'Unknown Host'}
                            location={event.location.address || 'Unknown Location'}
                            time={event.startTime}
                            attendees={event.attendees}
                            isPrivate={event.isPrivate}
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
    },
    headerTitle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        textTransform: 'uppercase',
    },
    list: {
        padding: 20,
        paddingTop: 0,
    },
});

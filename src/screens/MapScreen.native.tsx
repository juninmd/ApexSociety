import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { DARK_MAP_STYLE } from '../constants/mapStyles';
import { theme } from '../theme';
import { MOCK_USERS, MOCK_EVENTS, MOCK_CREWS } from '../data/mock';
import EventCardOverlay from '../components/EventCardOverlay';
import ReportCheckpointButton from '../components/ReportCheckpointButton';

export default function MapScreen() {
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    // Mock "next event" for the overlay - simply taking the first one
    const nextEvent = MOCK_EVENTS[0];
    const nextEventHost = MOCK_CREWS.find((c) => c.id === nextEvent.hostId)?.name || 'Unknown Host';

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                customMapStyle={DARK_MAP_STYLE}
                showsUserLocation={true}
            >
                {MOCK_USERS.map((user) => (
                    <Marker
                        key={user.id}
                        coordinate={{
                            latitude: user.location.latitude,
                            longitude: user.location.longitude,
                        }}
                        title={user.username}
                        description={`Last active: ${user.lastActive}`}
                        pinColor={theme.colors.primary} // Yellow for users
                    />
                ))}

                {MOCK_EVENTS.map((event) => {
                    let markerColor = theme.colors.error; // default red
                    if (event.eventType === 'meet') {
                        markerColor = theme.colors.primary; // yellow
                    } else if (event.eventType === 'race') {
                        markerColor = theme.colors.error; // red
                    } else if (event.eventType === 'checkpoint') {
                        markerColor = '#0000FF'; // blue
                    }

                    return (
                        <Marker
                            key={event.id}
                            coordinate={{
                                latitude: event.location.latitude,
                                longitude: event.location.longitude,
                            }}
                            title={event.title}
                            description={event.startTime}
                            pinColor={markerColor}
                        />
                    );
                })}
            </MapView>

            <LinearGradient colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0)']} style={styles.overlay}>
                <View style={styles.topOverlay}>
                    <ReportCheckpointButton />
                    <View>
                        <Text style={styles.timeText}>12:13 AM</Text>
                        <Text style={styles.speedText}>1 KM/H</Text>
                    </View>
                </View>

                {nextEvent && (
                    <EventCardOverlay nextEvent={nextEvent} nextEventHost={nextEventHost} />
                )}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.black,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 60,
        paddingBottom: 100,
        pointerEvents: 'box-none',
    },
    timeText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        textAlign: 'right',
    },
    speedText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 18,
        textAlign: 'right',
    },
    topOverlay: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
});

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { DARK_MAP_STYLE } from '../constants/mapStyles';
import { theme } from '../theme';
import { MOCK_EVENTS, MOCK_CREWS } from '../data/mock';
import MapMarkers from '../components/MapScreen/MapMarkers';
import MapOverlay from '../components/MapScreen/MapOverlay';
import MapHazards from '../components/MapScreen/MapHazards';

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

    // Mock crew territories
    const territories = [
        {
            id: 't1',
            crewId: 'crew-1',
            center: { latitude: -23.5505, longitude: -46.6333 },
            radius: 3000,
            color: 'rgba(255, 0, 85, 0.2)' // FIRST2 Red
        },
        {
            id: 't2',
            crewId: 'crew-2',
            center: { latitude: -23.5815, longitude: -46.6863 },
            radius: 2000,
            color: 'rgba(0, 240, 255, 0.2)' // Cyan
        }
    ];

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
                {/* Crew Territories Layer */}
                {territories.map((territory) => (
                    <Circle
                        key={territory.id}
                        center={territory.center}
                        radius={territory.radius}
                        fillColor={territory.color}
                        strokeColor={territory.color.replace('0.2', '0.8')}
                        strokeWidth={2}
                    />
                ))}

                <MapMarkers />
                <MapHazards />
            </MapView>

            {/* Crew Wars Legend */}
            <View style={styles.legendContainer}>
                <Text style={styles.legendTitle}>TERRITÓRIOS (CREW WARS)</Text>
                {MOCK_CREWS.slice(0, 2).map((crew, idx) => (
                    <View key={crew.id} style={styles.legendRow}>
                        <View style={[styles.legendColor, { backgroundColor: territories[idx].color.replace('0.2', '0.8') }]} />
                        <Text style={styles.legendText}>{crew.name}</Text>
                    </View>
                ))}
            </View>

            <MapOverlay nextEvent={nextEvent} nextEventHost={nextEventHost} />
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
    legendContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    legendTitle: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginBottom: 5,
        letterSpacing: 1,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    legendColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    legendText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
    }
});

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import * as Location from 'expo-location';
import { DARK_MAP_STYLE } from '../constants/mapStyles';
import { theme } from '../theme';
import { MOCK_EVENTS, MOCK_CREWS } from '../data/mock';
import MapMarkers from '../components/MapScreen/MapMarkers';
import MapOverlay from '../components/MapScreen/MapOverlay';

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
                <MapMarkers />
            </MapView>

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
});

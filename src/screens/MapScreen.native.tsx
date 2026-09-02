import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { DARK_MAP_STYLE } from '../constants/mapStyles';
import { theme } from '../theme';
import { MOCK_EVENTS, MOCK_CREWS } from '../data/mock';
import MapMarkers from '../components/MapScreen/MapMarkers';
import MapOverlay from '../components/MapScreen/MapOverlay';
import MapHazards from '../components/MapScreen/MapHazards';
import MapHotspots from '../components/MapScreen/MapHotspots';
import MapCruisePlanner from '../components/MapScreen/MapCruisePlanner';
import MapTerritories from '../components/MapScreen/MapTerritories';
import MapLegend from '../components/MapScreen/MapLegend';
import MapControls from '../components/MapScreen/MapControls';
import { useMapRegion } from '../hooks/useMapRegion';
import { useCruisePlanner } from '../hooks/useCruisePlanner';
import { useNotification } from '../context/NotificationContext';

export default function MapScreen() {
    const { region, setRegion } = useMapRegion();
    const { isPlannerActive, waypoints, togglePlanner, addWaypoint } = useCruisePlanner();
    const { addNotification } = useNotification();
    const [isOfflineMapCached, setIsOfflineMapCached] = useState(false);

    // Mock "next event" for the overlay - simply taking the first one
    const nextEvent = MOCK_EVENTS[0];
    const nextEventHost = MOCK_CREWS.find((c) => c.id === nextEvent.hostId)?.name || 'Unknown Host';

    const handleOfflineMapToggle = () => {
        setIsOfflineMapCached(!isOfflineMapCached);
        if (!isOfflineMapCached) {
            addNotification({
                title: 'OFFLINE MAP',
                message: 'Downloading map tiles for current region...',
                type: 'info',
            });
            setTimeout(() => {
                addNotification({
                    title: 'OFFLINE MAP',
                    message: 'Map cached successfully.',
                    type: 'success',
                });
            }, 3000);
        } else {
            addNotification({
                title: 'OFFLINE MAP',
                message: 'Offline map cache cleared.',
                type: 'info',
            });
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                region={region}
                onRegionChangeComplete={setRegion}
                onPress={(e) => {
                    if (isPlannerActive) {
                        addWaypoint({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude,
                        });
                    }
                }}
                customMapStyle={DARK_MAP_STYLE}
                showsUserLocation={true}
            >
                <MapCruisePlanner waypoints={waypoints} />
                <MapTerritories />
                <MapHotspots />
                <MapMarkers />
                <MapHazards />
            </MapView>

            <MapControls
                isOfflineMapCached={isOfflineMapCached}
                handleOfflineMapToggle={handleOfflineMapToggle}
                isPlannerActive={isPlannerActive}
                togglePlanner={togglePlanner}
            />

            <MapLegend />

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

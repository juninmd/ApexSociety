import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Circle } from 'react-native-maps';
import { DARK_MAP_STYLE } from '../constants/mapStyles';
import { theme } from '../theme';
import { MOCK_EVENTS, MOCK_CREWS, MOCK_TERRITORIES } from '../data/mock';
import MapMarkers from '../components/MapScreen/MapMarkers';
import MapOverlay from '../components/MapScreen/MapOverlay';
import MapHazards from '../components/MapScreen/MapHazards';
import MapHotspots from '../components/MapScreen/MapHotspots';
import { useMapRegion } from '../hooks/useMapRegion';

export default function MapScreen() {
    const { region, setRegion } = useMapRegion();

    // Mock "next event" for the overlay - simply taking the first one
    const nextEvent = MOCK_EVENTS[0];
    const nextEventHost = MOCK_CREWS.find((c) => c.id === nextEvent.hostId)?.name || 'Unknown Host';

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
                {MOCK_TERRITORIES.map((territory) => (
                    <Circle
                        key={territory.id}
                        center={territory.center}
                        radius={territory.radius}
                        fillColor={territory.color}
                        strokeColor={territory.color.replace('0.2', '0.8')}
                        strokeWidth={2}
                    />
                ))}

                <MapHotspots />
                <MapMarkers />
                <MapHazards />
            </MapView>

            {/* Crew Wars Legend */}
            <View style={styles.legendContainer}>
                <Text style={styles.legendTitle}>TERRITÓRIOS (CREW WARS)</Text>
                {MOCK_CREWS.slice(0, 2).map((crew, idx) => (
                    <View key={crew.id} style={styles.legendRow}>
                        <View
                            style={[
                                styles.legendColor,
                                {
                                    backgroundColor: MOCK_TERRITORIES[idx].color.replace(
                                        '0.2',
                                        '0.8',
                                    ),
                                },
                            ]}
                        />
                        <View>
                            <Text style={styles.legendText}>{crew.name}</Text>
                            <Text style={styles.legendSubtext}>
                                Dominance: {MOCK_TERRITORIES[idx].dominance}%
                            </Text>
                        </View>
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
    },
    legendSubtext: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
    },
});

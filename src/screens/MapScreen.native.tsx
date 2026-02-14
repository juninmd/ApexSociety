import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { DARK_MAP_STYLE } from '../constants/mapStyles';
import { theme } from '../theme';

export default function MapScreen() {
    const [region] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_DEFAULT}
                style={styles.map}
                initialRegion={region}
                customMapStyle={DARK_MAP_STYLE}
            >
                <Marker
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title="You"
                    pinColor={theme.colors.primary}
                />
                <Marker
                    coordinate={{ latitude: 37.78325, longitude: -122.4424 }}
                    title="Sports Club US"
                    description="NOSHOW Event"
                    pinColor="#FF0000"
                />
            </MapView>

            <LinearGradient
                colors={[theme.colors.mapOverlayStart, theme.colors.mapOverlayEnd]}
                style={styles.overlay}
            >
                <Text style={styles.timeText}>12:13 AM</Text>
                <Text style={styles.speedText}>1 KM/H</Text>

                <View style={styles.eventCard}>
                    <Text style={styles.eventHost}>SPORTS CLUB US ★</Text>
                    <Text style={styles.eventTitle}>NOSHOW</Text>
                    <Text style={styles.eventTime}>24 Feb 2025 / 21:17</Text>
                    <Text style={styles.eventStatus}>PRIVATE • 2</Text>
                </View>
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
    eventCard: {
        alignSelf: 'flex-end',
        marginBottom: 40,
    },
    eventHost: {
        color: theme.colors.text,
        fontSize: 12,
        fontFamily: theme.fonts.secondary.bold,
        textAlign: 'right',
    },
    eventTitle: {
        color: theme.colors.text,
        fontSize: 32,
        fontFamily: theme.fonts.primary.bold,
        textAlign: 'right',
        textTransform: 'uppercase',
    },
    eventTime: {
        color: theme.colors.textSecondary, // Using textSecondary instead of #CCC
        fontSize: 14,
        fontFamily: theme.fonts.secondary.regular,
        textAlign: 'right',
    },
    eventStatus: {
        color: theme.colors.secondary, // Using secondary instead of #999
        fontSize: 12,
        fontFamily: theme.fonts.secondary.bold,
        textAlign: 'right',
    },
});

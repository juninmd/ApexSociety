import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';

const DARK_MAP_STYLE = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#212121" }]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [{ "color": "#2c2c2c" }]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#8a8a8a" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [{ "color": "#373737" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#3c3c3c" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#000000" }]
    }
];

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
                    pinColor="#FFD700"
                />
                <Marker
                    coordinate={{ latitude: 37.78325, longitude: -122.4424 }}
                    title="Sports Club US"
                    description="NOSHOW Event"
                    pinColor="#FF0000"
                />
            </MapView>

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
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
        backgroundColor: '#000',
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
        color: '#FFD700',
        fontFamily: 'Oswald_700Bold',
        fontSize: 24,
        textAlign: 'right',
    },
    speedText: {
        color: '#FFF',
        fontFamily: 'Oswald_400Regular',
        fontSize: 18,
        textAlign: 'right',
    },
    eventCard: {
        alignSelf: 'flex-end',
        marginBottom: 40,
    },
    eventHost: {
        color: '#FFF',
        fontSize: 12,
        fontFamily: 'Roboto_700Bold',
        textAlign: 'right',
    },
    eventTitle: {
        color: '#FFF',
        fontSize: 32,
        fontFamily: 'Oswald_700Bold',
        textAlign: 'right',
        textTransform: 'uppercase',
    },
    eventTime: {
        color: '#CCC',
        fontSize: 14,
        fontFamily: 'Roboto_400Regular',
        textAlign: 'right',
    },
    eventStatus: {
        color: '#999',
        fontSize: 12,
        fontFamily: 'Roboto_700Bold',
        textAlign: 'right',
    }
});

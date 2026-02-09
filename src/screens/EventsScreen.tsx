import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Users, Clock } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EventsScreen() {
    return (
        <ScrollView style={styles.container}>
            {/* Map Snippet Area */}
            <View style={styles.mapContainer}>
                <LinearGradient colors={['transparent', '#000']} style={styles.mapOverlay} />
                <View style={styles.pinContainer}>
                    <View style={styles.pinOuter}>
                        <View style={styles.pinInner} />
                    </View>
                </View>
                <Text style={styles.mapLabel}>NOPE</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>NOSHOW</Text>
                    <View style={styles.hostRow}>
                        <Text style={styles.hostLabel}>Posted by </Text>
                        <Text style={styles.hostName}>SPORTS CLUB US ★</Text>
                    </View>
                    <View style={styles.collabRow}>
                        <Text style={styles.collabLabel}>IN COLLABORATION WITH</Text>
                        <Text style={styles.collabName}>FIRST3 ★</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailsRow}>
                    <Users color="#FFD700" size={20} />
                    <Text style={styles.detailText}>2 • PRIVATE</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DETAILS</Text>

                    <View style={styles.infoRow}>
                        <MapPin color="#FFF" size={18} />
                        <Text style={styles.infoText}>NOPE</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Clock color="#FFF" size={18} />
                        <View>
                            <Text style={styles.infoText}>STARTS MON 24 FEB 2025 @ 21:17</Text>
                            <Text style={styles.infoText}>ENDS MON 24 FEB 2025 @ 22:17</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>JOIN EVENT</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    mapContainer: {
        height: 300,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: '#FFD700',
    },
    mapOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: 100,
    },
    pinContainer: {
        alignItems: 'center',
    },
    pinOuter: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 0, 0, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FF0000',
    },
    pinInner: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FF0000',
    },
    mapLabel: {
        color: '#FFF',
        marginTop: 10,
        fontFamily: 'Oswald_700Bold',
    },
    content: {
        padding: 20,
    },
    header: {
        marginBottom: 20,
    },
    title: {
        fontSize: 42,
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
        textTransform: 'uppercase',
    },
    hostRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    hostLabel: {
        color: '#888',
        fontFamily: 'Roboto_400Regular',
    },
    hostName: {
        color: '#FFF',
        fontFamily: 'Roboto_700Bold',
        marginLeft: 5,
    },
    collabRow: {
        marginTop: 15,
    },
    collabLabel: {
        color: '#666',
        fontSize: 10,
        fontFamily: 'Roboto_700Bold',
        marginBottom: 2,
    },
    collabName: {
        color: '#FFD700', // Yellow accent
        fontFamily: 'Oswald_700Bold',
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: '#333',
        marginVertical: 15,
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailText: {
        color: '#FFF',
        marginLeft: 10,
        fontFamily: 'Roboto_700Bold',
    },
    section: {
        marginVertical: 10,
    },
    sectionTitle: {
        color: '#666',
        fontSize: 12,
        fontFamily: 'Roboto_700Bold',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    infoText: {
        color: '#FFF',
        marginLeft: 15,
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    actionButton: {
        backgroundColor: '#FFD700',
        padding: 15,
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 0, // angular buttons
        borderWidth: 1,
        borderColor: '#FFF',
    },
    actionButtonText: {
        color: '#000',
        fontFamily: 'Oswald_700Bold',
        fontSize: 18,
    },
});

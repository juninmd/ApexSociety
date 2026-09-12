import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Animated } from 'react-native';
import { Crosshair, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { useHazards } from '../context/HazardContext';
import { Location } from '../types';

interface EventDroneReconProps {
    visible: boolean;
    eventLocation: Location;
    onClose: () => void;
}

export default function EventDroneRecon({ visible, eventLocation, onClose }: EventDroneReconProps) {
    const { hazards } = useHazards();
    const [isScanning, setIsScanning] = useState(true);
    const [threatLevel, setThreatLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('LOW');
    const [nearbyHazardsCount, setNearbyHazardsCount] = useState(0);
    const [scanAnim] = useState(() => new Animated.Value(0));

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (visible) {
            scanAnim.setValue(0);

            Animated.loop(
                Animated.sequence([
                    Animated.timing(scanAnim, {
                        toValue: 1,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scanAnim, {
                        toValue: 0,
                        duration: 1500,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();

            // Simulate drone recon delay
            timer = setTimeout(() => {
                const nearby = hazards.filter((h) => {
                    const latDiff = Math.abs(h.location.latitude - eventLocation.latitude);
                    const lonDiff = Math.abs(h.location.longitude - eventLocation.longitude);
                    return latDiff < 0.05 && lonDiff < 0.05; // ~5km radius roughly
                });

                setNearbyHazardsCount(nearby.length);

                if (nearby.length > 3) setThreatLevel('HIGH');
                else if (nearby.length > 0) setThreatLevel('MEDIUM');
                else setThreatLevel('LOW');

                setIsScanning(false);
                scanAnim.stopAnimation();
            }, 3000);
        } else {
            // Reset state when hiding, safely outside the update cycle if needed,
            // but we'll use a local variable pattern or just suppress if it's annoying,
            // let's just reset when it's closed.
            const timeout = setTimeout(() => setIsScanning(true), 100);
            return () => clearTimeout(timeout);
        }

        return () => {
            if (timer) clearTimeout(timer);
            scanAnim.stopAnimation();
        };
    }, [visible, eventLocation, hazards, scanAnim]);

    const getThreatColor = () => {
        switch (threatLevel) {
            case 'HIGH':
                return theme.colors.error;
            case 'MEDIUM':
                return theme.colors.secondary;
            default:
                return theme.colors.success;
        }
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>DRONE RECON</Text>

                    {isScanning ? (
                        <View style={styles.scanContainer}>
                            <Animated.View style={[styles.scanIndicator, { opacity: scanAnim }]}>
                                <Crosshair color={theme.colors.primary} size={64} />
                            </Animated.View>
                            <Text style={styles.scanningText}>SCANNING AREA FOR THREATS...</Text>
                        </View>
                    ) : (
                        <View style={styles.resultsContainer}>
                            <AlertTriangle color={getThreatColor()} size={48} />
                            <Text style={[styles.threatText, { color: getThreatColor() }]}>
                                THREAT LEVEL: {threatLevel}
                            </Text>
                            <Text style={styles.detailsText}>
                                {nearbyHazardsCount} hazards detected in the sector.
                            </Text>
                            <Text style={styles.adviceText}>
                                {threatLevel === 'HIGH'
                                    ? 'ADVISE EXTREME CAUTION OR REROUTE.'
                                    : 'AREA IS RELATIVELY CLEAR.'}
                            </Text>
                        </View>
                    )}

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>
                            {isScanning ? 'ABORT' : 'DISMISS'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#0d0d1a',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 20,
        marginBottom: 20,
        letterSpacing: 2,
    },
    scanContainer: {
        alignItems: 'center',
        marginVertical: 30,
    },
    scanIndicator: {
        marginBottom: 20,
    },
    scanningText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        letterSpacing: 1,
    },
    resultsContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    threatText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        marginTop: 15,
        marginBottom: 10,
        letterSpacing: 1,
    },
    detailsText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginBottom: 10,
    },
    adviceText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: theme.colors.textSecondary,
        borderRadius: 4,
    },
    closeButtonText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
    },
});

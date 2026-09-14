import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated } from 'react-native';
import { Crosshair, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { useHazards } from '../context/HazardContext';
import { Location } from '../types';
import { styles } from './EventDroneReconStyles';

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

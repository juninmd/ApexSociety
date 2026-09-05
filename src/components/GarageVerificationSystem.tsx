import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CheckCircle, ShieldAlert } from 'lucide-react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';

interface GarageVerificationSystemProps {
    carId: string;
    onVerified: () => void;
}

export default function GarageVerificationSystem({
    carId,
    onVerified,
}: GarageVerificationSystemProps) {
    const [isVerifying, setIsVerifying] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const { addReputation } = useReputation();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isVerifying) {
            timeoutId = setTimeout(() => {
                setIsVerifying(false);
                setIsVerified(true);
                addReputation(100);
                Alert.alert(
                    'BUILD VERIFIED',
                    'Your vehicle specs have been officially verified. +100 REP awarded!',
                );
                onVerified();
            }, 2500);
        }
        return () => clearTimeout(timeoutId);
    }, [isVerifying, addReputation, onVerified]);

    const handleVerification = () => {
        setIsVerifying(true);
    };

    if (isVerified) {
        return (
            <View style={styles.verifiedContainer}>
                <CheckCircle size={20} color="#4CAF50" />
                <Text style={styles.verifiedText}>OFFICIAL VERIFIED BUILD</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>VERIFY YOUR BUILD</Text>
            <Text style={styles.description}>
                Scan your vehicle's VIN or physical modifications via AR to earn the Verified badge
                and Respect points.
            </Text>
            <TouchableOpacity
                style={[styles.button, isVerifying && styles.buttonDisabled]}
                onPress={handleVerification}
                disabled={isVerifying}
            >
                {isVerifying ? (
                    <ActivityIndicator color={theme.colors.black} size="small" />
                ) : (
                    <ShieldAlert size={16} color={theme.colors.black} />
                )}
                <Text style={styles.buttonText}>
                    {isVerifying ? 'SCANNING...' : 'START AR SCAN'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginTop: 15,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        marginBottom: 8,
        letterSpacing: 1,
    },
    description: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginBottom: 15,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.colors.primary,
        paddingVertical: 12,
        borderRadius: 4,
        gap: 8,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#4CAF50',
        marginTop: 15,
        gap: 10,
    },
    verifiedText: {
        color: '#4CAF50',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        letterSpacing: 1,
    },
});

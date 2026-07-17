import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useAlert } from '../context/AlertContext';
import { useHazards } from '../context/HazardContext';
import * as Location from 'expo-location';

export type HazardType = 'blitz' | 'radar' | 'acidente' | 'sos';

interface ReportHazardButtonProps {
    type: HazardType;
}

export default function ReportHazardButton({ type }: ReportHazardButtonProps) {
    const { showAlert } = useAlert();
    const { addHazard } = useHazards();

    const hazardConfig = {
        blitz: {
            text: 'REPORTAR BLITZ',
            color: theme.colors.error,
            alertMsg:
                'Blitz Reportada: Motoristas nas proximidades foram notificados sobre a blitz policial.',
        },
        radar: {
            text: 'REPORTAR RADAR',
            color: theme.colors.primary, // Orange for radar
            alertMsg: 'Radar Reportado: Motoristas notificados sobre fiscalização eletrônica.',
        },
        acidente: {
            text: 'REPORTAR ACIDENTE',
            color: theme.colors.error, // Red for accident
            alertMsg:
                'Acidente Reportado: Motoristas notificados para reduzir a velocidade e ter cautela.',
        },
        sos: {
            text: 'SINAL SOS',
            color: '#FF0000', // Bright Red for SOS
            alertMsg: 'SOS Ativado: Membros da equipe notificados. Aguarde por assistência.',
        },
    };

    const config = hazardConfig[type];

    const handleReportHazard = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                showAlert(`${config.alertMsg} (Sem localização)`);
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            addHazard({
                id: Math.random().toString(36).substr(2, 9),
                type,
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                },
                reportedAt: new Date().toISOString(),
            });

            showAlert(config.alertMsg);
        } catch {
            showAlert(config.alertMsg);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.reportButton, { backgroundColor: config.color }]}
            onPress={handleReportHazard}
        >
            <Text style={styles.reportButtonText}>{config.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    reportButton: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 4,
        transform: [{ skewX: '-10deg' }],
        marginHorizontal: 5,
        minWidth: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    reportButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
        transform: [{ skewX: '10deg' }],
        textAlign: 'center',
    },
});

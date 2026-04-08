import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useAlert } from '../context/AlertContext';

export type HazardType = 'blitz' | 'radar' | 'acidente';

interface ReportHazardButtonProps {
    type: HazardType;
}

export default function ReportHazardButton({ type }: ReportHazardButtonProps) {
    const { showAlert } = useAlert();

    const hazardConfig = {
        blitz: {
            text: 'REPORTAR BLITZ',
            color: theme.colors.error,
            alertMsg:
                'Blitz Reportada: Motoristas nas proximidades foram notificados sobre a blitz policial.',
        },
        radar: {
            text: 'REPORTAR RADAR',
            color: '#f39c12', // Orange for radar
            alertMsg: 'Radar Reportado: Motoristas notificados sobre fiscalização eletrônica.',
        },
        acidente: {
            text: 'REPORTAR ACIDENTE',
            color: '#e74c3c', // Red for accident
            alertMsg:
                'Acidente Reportado: Motoristas notificados para reduzir a velocidade e ter cautela.',
        },
    };

    const config = hazardConfig[type];

    const handleReportHazard = () => {
        showAlert(config.alertMsg);
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

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../theme';
import { useAlert } from '../context/AlertContext';

export default function ReportCheckpointButton() {
    const { showAlert } = useAlert();

    const handleReportCheckpoint = () => {
        showAlert(
            'Checkpoint Reportado: Motoristas nas proximidades foram notificados sobre a blitz.',
        );
    };

    return (
        <TouchableOpacity style={styles.reportButton} onPress={handleReportCheckpoint}>
            <Text style={styles.reportButtonText}>REPORTAR BLITZ</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    reportButton: {
        backgroundColor: theme.colors.error,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 4,
        transform: [{ skewX: '-10deg' }],
    },
    reportButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        transform: [{ skewX: '10deg' }],
    },
});

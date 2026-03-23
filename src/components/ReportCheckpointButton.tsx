import React from 'react';
import { Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function ReportCheckpointButton() {
    const handleReportCheckpoint = () => {
        Alert.alert(
            'Checkpoint Reportado',
            'Motoristas nas proximidades foram notificados sobre a blitz.',
            [{ text: 'OK', style: 'default' }],
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

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from '../../theme';

interface HazardsProps {
    handleReportBlitz: () => void;
    handleReportRadar: () => void;
    handleReportAcidente: () => void;
}

export default function Hazards({
    handleReportBlitz,
    handleReportRadar,
    handleReportAcidente,
}: HazardsProps) {
    return (
        <View style={styles.hazardsContainer}>
            <TouchableOpacity
                style={styles.reportButton}
                onPress={handleReportBlitz}
                activeOpacity={0.8}
            >
                <Text style={styles.reportButtonText}>BLITZ</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.reportButton,
                    { backgroundColor: '#f39c12', shadowColor: '#f39c12' },
                ]}
                onPress={handleReportRadar}
                activeOpacity={0.8}
            >
                <Text style={styles.reportButtonText}>RADAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.reportButton,
                    { backgroundColor: '#e74c3c', shadowColor: '#e74c3c' },
                ]}
                onPress={handleReportAcidente}
                activeOpacity={0.8}
            >
                <Text style={styles.reportButtonText}>ACIDENTE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    hazardsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    reportButton: {
        backgroundColor: theme.colors.error,
        paddingHorizontal: 24,
        paddingVertical: 12,
        transform: [{ skewX: '-20deg' }],
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 5,
    },
    reportButtonText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        fontWeight: 'bold',
        transform: [{ skewX: '20deg' }],
        letterSpacing: 1,
    },
});

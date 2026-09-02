import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../../theme';
import { MOCK_CREWS, MOCK_TERRITORIES } from '../../data/mock';

export default function MapLegend() {
    return (
        <View style={styles.legendContainer}>
            <Text style={styles.legendTitle}>TERRITÓRIOS (CREW WARS)</Text>
            {MOCK_CREWS.slice(0, 2).map((crew, idx) => (
                <View key={crew.id} style={styles.legendRow}>
                    <View
                        style={[
                            styles.legendColor,
                            {
                                backgroundColor: MOCK_TERRITORIES[idx].color.replace('0.2', '0.8'),
                            },
                        ]}
                    />
                    <View>
                        <Text style={styles.legendText}>{crew.name}</Text>
                        <Text style={styles.legendSubtext}>
                            Dominance: {MOCK_TERRITORIES[idx].dominance}%
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    legendContainer: {
        position: 'absolute',
        top: 60,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    legendTitle: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        marginBottom: 5,
        letterSpacing: 1,
    },
    legendRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 2,
    },
    legendColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    legendText: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
    },
    legendSubtext: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
    },
});

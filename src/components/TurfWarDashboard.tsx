import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { theme } from '../theme';
import { useTurf } from '../context/TurfContext';
import { Flag } from 'lucide-react-native';

interface TurfWarDashboardProps {
    crewId: string;
}

export default function TurfWarDashboard({ crewId }: TurfWarDashboardProps) {
    const { territories } = useTurf();
    const crewTerritories = territories.filter((t) => t.crewId === crewId);

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Flag color={theme.colors.error} size={20} />
                <Text style={styles.title}>TURF WAR STATUS</Text>
            </View>

            {crewTerritories.length === 0 ? (
                <Text style={styles.emptyText}>NO TERRITORIES CLAIMED</Text>
            ) : (
                <FlatList
                    data={crewTerritories}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View style={styles.territoryRow}>
                            <View style={styles.infoCol}>
                                <Text style={styles.zoneName}>ZONE {item.id.toUpperCase()}</Text>
                                <View style={styles.barBackground}>
                                    <View
                                        style={[
                                            styles.barFill,
                                            {
                                                width: `${item.dominance}%`,
                                                backgroundColor: item.color,
                                            },
                                        ]}
                                    />
                                </View>
                            </View>
                            <Text style={styles.dominanceText}>{item.dominance}%</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.card,
        padding: 15,
        marginHorizontal: 20,
        marginVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        marginLeft: 10,
        letterSpacing: 1,
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 14,
        textAlign: 'center',
    },
    territoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoCol: {
        flex: 1,
        marginRight: 15,
    },
    zoneName: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        marginBottom: 5,
    },
    barBackground: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 3,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
    },
    dominanceText: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
    },
});

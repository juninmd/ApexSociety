import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { UserPlus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import CrewBadge from './CrewBadge';
import { RootStackParamList } from '../navigation/types';

interface CrewItem {
    id: string;
    name: string;
    rank: string;
}

interface CrewsSectionProps {
    crews: CrewItem[];
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CrewsSection({ crews }: CrewsSectionProps) {
    const navigation = useNavigation<NavigationProp>();

    return (
        <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>CREWS</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>SEE ALL</Text>
                </TouchableOpacity>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.crewsList}
            >
                {crews.map((crew) => (
                    <TouchableOpacity
                        key={crew.id}
                        style={styles.crewItem}
                        onPress={() => navigation.navigate('CrewDetails', { crewId: crew.id })}
                    >
                        <CrewBadge name={crew.name} rank={crew.rank} size="medium" />
                        <Text style={styles.crewName} numberOfLines={1}>
                            {crew.name}
                        </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    style={styles.crewItem}
                    onPress={() => navigation.navigate('CreateCrew')}
                >
                    <View style={styles.addCrewBadge}>
                        <UserPlus color={theme.colors.secondary} size={24} />
                    </View>
                    <Text style={styles.crewName} numberOfLines={1}>
                        CREATE
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
        letterSpacing: 1,
    },
    seeAll: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.primary,
    },
    crewsList: {
        paddingLeft: 20,
    },
    crewItem: {
        alignItems: 'center',
        marginRight: 20,
        width: 80,
    },
    crewName: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.textSecondary,
        marginTop: 5,
        textAlign: 'center',
    },
    addCrewBadge: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: theme.colors.secondary,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

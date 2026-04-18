import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import { Crew } from '../types';
import CrewBadge from '../components/CrewBadge';
import CustomButton from '../components/CustomButton';
import { Users } from 'lucide-react-native';

export default function CrewListScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const renderItem = ({ item }: { item: Crew }) => (
        <TouchableOpacity
            style={styles.crewCard}
            onPress={() => navigation.navigate('CrewDetails', { crewId: item.id })}
            activeOpacity={0.7}
        >
            <CrewBadge name={item.name} rank={item.rank} size="medium" />
            <View style={styles.crewInfo}>
                <Text style={styles.crewName}>{item.name}</Text>
                <Text style={styles.crewTag}>{item.tag}</Text>
                <View style={styles.statsRow}>
                    <Users size={14} color={theme.colors.secondary} />
                    <Text style={styles.statsText}>{item.memberCount} MEMBROS</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>EQUIPES</Text>
            </View>

            <FlatList
                data={MOCK_CREWS}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <CustomButton
                    title="CRIAR EQUIPE"
                    onPress={() => navigation.navigate('CreateCrew')}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: theme.colors.card,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        color: theme.colors.text,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    listContent: {
        padding: 20,
    },
    crewCard: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 10, // Slightly rounded for card look, though Stitch is jagged, list items usually need some separation
        marginBottom: 15,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    crewInfo: {
        marginLeft: 20,
        flex: 1,
    },
    crewName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    crewTag: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        color: theme.colors.primary,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.secondary,
        marginLeft: 5,
    },
    footer: {
        padding: 20,
        backgroundColor: theme.colors.background, // Match background to float nicely or stick to bottom
        borderTopWidth: 1,
        borderTopColor: theme.colors.border,
    },
});

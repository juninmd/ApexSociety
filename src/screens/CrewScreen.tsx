import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Settings, Users, UserPlus, Handshake } from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import CrewMenuItem from '../components/CrewMenuItem';
import CrewHeader from '../components/CrewHeader';
import CrewBanner from '../components/CrewBanner';

export default function CrewScreen() {
    const route = useRoute();
    const params = route.params as { crewId?: string } | undefined;
    const crewId = params?.crewId;

    // Use specific crew if ID provided, otherwise default to first
    const crew = crewId ? MOCK_CREWS.find((c) => c.id === crewId) : MOCK_CREWS[0];

    if (!crew) {
        return (
            <View style={[styles.container, styles.center]}>
                <Text style={styles.errorText}>Equipe não encontrada</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            {/* Crew Card */}
            <CrewHeader name={crew.name} memberCount={crew.memberCount} rank={crew.rank} />

            {/* Red Banner */}
            <CrewBanner name={crew.name} tag={crew.tag} foundedYear={crew.foundedYear} />

            <Text style={styles.sectionHeader}>GERENCIAR</Text>

            <View style={styles.menuList}>
                <CrewMenuItem
                    icon={<Settings color={theme.colors.text} />}
                    title="MUDAR CONFIGURAÇÕES"
                    subtitle="Editar aparência e configurações da equipe"
                />
                <CrewMenuItem
                    icon={<Users color={theme.colors.text} />}
                    title="MEMBROS DA EQUIPE"
                    subtitle="Gerenciar membros"
                />
                <CrewMenuItem
                    icon={<UserPlus color={theme.colors.text} />}
                    title="CONVIDAR MEMBROS"
                    subtitle="Convidar usuários para a equipe"
                />
                <CrewMenuItem
                    icon={<Handshake color={theme.colors.text} />}
                    title="CLASSIFICAÇÃO"
                    subtitle="Ver estatísticas e ranking da equipe"
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.error,
        fontSize: 18,
    },
    sectionHeader: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.textSecondary,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    menuList: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
});

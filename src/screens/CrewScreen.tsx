import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Settings, Users, UserPlus, Handshake } from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import CrewMenuItem from '../components/CrewMenuItem';
import CrewHeader from '../components/CrewHeader';
import CrewBanner from '../components/CrewBanner';
import ChallengeCrewModal from '../components/ChallengeCrewModal';
import TakeoverButton from '../components/TakeoverButton';
import TurfWarDashboard from '../components/TurfWarDashboard';
import { styles } from './CrewScreenStyles';

export default function CrewScreen() {
    const route = useRoute();
    const params = route.params as { crewId?: string } | undefined;
    const crewId = params?.crewId;

    // Use specific crew if ID provided, otherwise default to first
    const [challengeModalVisible, setChallengeModalVisible] = useState(false);
    const [takeoverActive, setTakeoverActive] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const crew = crewId ? MOCK_CREWS.find((c) => c.id === crewId) : MOCK_CREWS[0];

    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

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
            <CrewHeader
                name={crew.name}
                memberCount={crew.memberCount}
                rank={crew.rank}
                notoriety={crew.notoriety}
            />

            {/* Red Banner */}
            <CrewBanner name={crew.name} tag={crew.tag} foundedYear={crew.foundedYear} />

            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={styles.challengeButton}
                    onPress={() => setChallengeModalVisible(true)}
                >
                    <Text style={styles.challengeButtonText}>CHALLENGE CREW (TURF WAR)</Text>
                </TouchableOpacity>

                <TakeoverButton
                    crewId={crew.id}
                    cooldown={cooldown}
                    setCooldown={setCooldown}
                    takeoverActive={takeoverActive}
                    setTakeoverActive={setTakeoverActive}
                />
            </View>

            <TurfWarDashboard crewId={crew.id} />

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
            <ChallengeCrewModal
                visible={challengeModalVisible}
                crewName={crew.name}
                onClose={() => setChallengeModalVisible(false)}
            />
        </ScrollView>
    );
}

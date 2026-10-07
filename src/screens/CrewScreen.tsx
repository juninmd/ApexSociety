import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Settings, Users, UserPlus, Handshake } from 'lucide-react-native';
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';
import CrewMenuItem from '../components/CrewMenuItem';
import CrewHeader from '../components/CrewHeader';
import CrewBanner from '../components/CrewBanner';
import ChallengeCrewModal from '../components/ChallengeCrewModal';
import { useState, useEffect } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { useTurf } from '../context/TurfContext';

import { styles } from './CrewScreenStyles';

export default function CrewScreen() {
    const route = useRoute();
    const params = route.params as { crewId?: string } | undefined;
    const crewId = params?.crewId;

    // Use specific crew if ID provided, otherwise default to first
    const [challengeModalVisible, setChallengeModalVisible] = useState(false);
    const [takeoverActive, setTakeoverActive] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const { claimTurf, territories } = useTurf();
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

                <TouchableOpacity
                    style={[
                        styles.challengeButton,
                        {
                            marginTop: 10,
                            borderColor:
                                cooldown > 0
                                    ? theme.colors.textSecondary
                                    : takeoverActive
                                      ? theme.colors.error
                                      : theme.colors.primary,
                            backgroundColor:
                                cooldown > 0
                                    ? 'rgba(100, 100, 100, 0.1)'
                                    : takeoverActive
                                      ? 'rgba(255, 0, 0, 0.1)'
                                      : 'rgba(212, 175, 55, 0.1)',
                        },
                    ]}
                    disabled={cooldown > 0}
                    onPress={() => {
                        const turfToClaim = territories.find((t) => t.crewId === crew.id);
                        if (!turfToClaim) {
                            Alert.alert('TURF WAR', 'This crew has no turf to claim.');
                            return;
                        }

                        if (!takeoverActive) {
                            setTakeoverActive(true);
                            Alert.alert(
                                'TAKEOVER INITIATED',
                                'You have begun a Turf Takeover! Win a race on their turf to claim dominance.',
                            );
                        } else {
                            claimTurf(turfToClaim.id, 10);
                            setTakeoverActive(false);
                            setCooldown(60); // 60 seconds cooldown
                            Alert.alert('TAKEOVER SUCCESS', '+10% DOMINANCE CLAIMED!');
                        }
                    }}
                >
                    <Text
                        style={[
                            styles.challengeButtonText,
                            {
                                color:
                                    cooldown > 0
                                        ? theme.colors.textSecondary
                                        : takeoverActive
                                          ? theme.colors.error
                                          : theme.colors.primary,
                            },
                        ]}
                    >
                        {cooldown > 0
                            ? `COOLDOWN (${cooldown}s)`
                            : takeoverActive
                              ? 'CONFIRM TAKEOVER VICTORY'
                              : 'INITIATE TAKEOVER'}
                    </Text>
                </TouchableOpacity>
            </View>

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

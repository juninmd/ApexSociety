import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Share2 } from 'lucide-react-native';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';
import ProfileStats from '../components/ProfileStats';
import GarageSection from '../components/GarageSection';
import CrewsSection from '../components/CrewsSection';
import ProfileHeader from '../components/ProfileHeader';
import StickersSection from '../components/StickersSection';
import DriveHistorySection from '../components/DriveHistorySection';
import ScoutScoreBadge from '../components/ScoutScoreBadge';
import { useReputation } from '../context/ReputationContext';
import { useDriveHistory } from '../context/DriveHistoryContext';
import { MOCK_PROFILE_USER } from '../data/mock';
import ReputationWagerModal from '../components/ReputationWagerModal';
import { styles } from './ProfileScreenStyles';

const COVER_IMAGE_URL =
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200';

export default function ProfileScreen() {
    const { reputation, isDecaying } = useReputation();
    const { runs } = useDriveHistory();
    const [wagerModalVisible, setWagerModalVisible] = useState(false);

    const dynamicStats = {
        ...MOCK_PROFILE_USER.stats,
        reputation: reputation.toString() + ' REP',
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header / Cover Image */}
            <ProfileHeader
                user={{ name: MOCK_PROFILE_USER.name, handle: MOCK_PROFILE_USER.handle }}
                coverImageUrl={COVER_IMAGE_URL}
            />

            <View style={styles.contentSection}>
                {/* Bio & Location */}
                <Text style={styles.bio}>{MOCK_PROFILE_USER.bio}</Text>
                <View style={styles.locationRow}>
                    <MapPin color={theme.colors.secondary} size={14} />
                    <Text style={styles.locationText}>{MOCK_PROFILE_USER.location}</Text>
                </View>

                {/* Scout Badge */}
                <ScoutScoreBadge />

                {/* Reputation Decay Warning */}
                {isDecaying && (
                    <View style={styles.decayWarningContainer}>
                        <Text style={styles.decayWarningText}>
                            WARNING: INACTIVITY PENALTY - REP DECAYING!
                        </Text>
                    </View>
                )}

                {/* Stats */}
                <ProfileStats stats={dynamicStats} />

                {/* Actions */}
                <View style={styles.actionButtons}>
                    <CustomButton
                        title="EDIT PROFILE"
                        onPress={() => {}}
                        style={styles.editButton}
                    />
                    <TouchableOpacity style={styles.shareButton}>
                        <Share2 color={theme.colors.primary} size={24} />
                    </TouchableOpacity>
                </View>

                <CustomButton
                    title="CHALLENGE RACER"
                    onPress={() => setWagerModalVisible(true)}
                    style={{ marginBottom: 20 }}
                />
            </View>

            <ReputationWagerModal
                visible={wagerModalVisible}
                onClose={() => setWagerModalVisible(false)}
                rivalName={MOCK_PROFILE_USER.name}
            />

            {/* Garage Section */}
            <GarageSection cars={MOCK_PROFILE_USER.garage} />

            {/* Adesivos Digitais Section */}
            <StickersSection stickers={MOCK_PROFILE_USER.stickers} />

            {/* Crews Section */}
            <CrewsSection crews={MOCK_PROFILE_USER.crews} />

            {/* Drive History Section */}
            <DriveHistorySection runs={runs} />

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

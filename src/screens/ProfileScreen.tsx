import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MapPin, Share2 } from 'lucide-react-native';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';
import ProfileStats from '../components/ProfileStats';
import GarageSection from '../components/GarageSection';
import CrewsSection from '../components/CrewsSection';
import ProfileHeader from '../components/ProfileHeader';
import StickersSection from '../components/StickersSection';
import { useReputation } from '../context/ReputationContext';
import { MOCK_PROFILE_USER } from '../data/mock';

const COVER_IMAGE_URL =
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200';

export default function ProfileScreen() {
    const { reputation } = useReputation();

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
            </View>

            {/* Garage Section */}
            <GarageSection cars={MOCK_PROFILE_USER.garage} />

            {/* Adesivos Digitais Section */}
            <StickersSection stickers={MOCK_PROFILE_USER.stickers} />

            {/* Crews Section */}
            <CrewsSection crews={MOCK_PROFILE_USER.crews} />

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentSection: {
        paddingHorizontal: 20,
        marginTop: 10,
    },
    bio: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        color: theme.colors.text,
        lineHeight: 20,
        marginBottom: 10,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    locationText: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.secondary,
        marginLeft: 5,
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    editButton: {
        flex: 1,
        marginRight: 10,
    },
    shareButton: {
        width: 50,
        height: 50,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

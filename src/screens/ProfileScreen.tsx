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

const USER = {
    name: 'ALEX RACER',
    handle: '@driftking_99',
    bio: 'JDM Enthusiast | Touge Runner | Building a 180SX',
    location: 'Tokyo, Japan',
    stats: {
        followers: '12.5K',
        following: '420',
        reputation: 'ELITE',
    },
    garage: [
        {
            id: '1',
            name: 'NISSAN 180SX',
            image: 'https://images.unsplash.com/photo-1626668893632-6f3d4466d25f?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: '2',
            name: 'MAZDA RX-7',
            image: 'https://images.unsplash.com/photo-1621251978255-a04454d65146?auto=format&fit=crop&q=80&w=800',
        },
        {
            id: '3',
            name: 'TOYOTA SUPRA',
            image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800',
        },
    ],
    crews: [
        { id: 'crew-1', name: 'SPORTS CLUB US', rank: 'LEADER' },
        { id: 'crew-2', name: 'MIDNIGHT RUNNERS', rank: 'MEMBER' },
        { id: 'crew-3', name: 'TOKYO DRIFT', rank: 'ELITE' },
    ],
    stickers: [
        { id: 's1', name: 'NIGHT RIDER', color: '#00F0FF' },
        { id: 's2', name: 'TOUGE KING', color: '#FF0055' },
        { id: 's3', name: 'JDM LEGEND', color: '#FFE600' },
        { id: 's4', name: '1ST MEET', color: '#00FF00' },
    ],
};

const COVER_IMAGE_URL =
    'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&q=80&w=1200';

export default function ProfileScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header / Cover Image */}
            <ProfileHeader
                user={{ name: USER.name, handle: USER.handle }}
                coverImageUrl={COVER_IMAGE_URL}
            />

            <View style={styles.contentSection}>
                {/* Bio & Location */}
                <Text style={styles.bio}>{USER.bio}</Text>
                <View style={styles.locationRow}>
                    <MapPin color={theme.colors.secondary} size={14} />
                    <Text style={styles.locationText}>{USER.location}</Text>
                </View>

                {/* Stats */}
                <ProfileStats stats={USER.stats} />

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
            <GarageSection cars={USER.garage} />

            {/* Adesivos Digitais Section */}
            <StickersSection stickers={USER.stickers} />

            {/* Crews Section */}
            <CrewsSection crews={USER.crews} />

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

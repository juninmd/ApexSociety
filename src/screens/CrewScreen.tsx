import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Settings, Users, UserPlus, Handshake } from 'lucide-react-native';
import { theme } from '../theme';
import { MOCK_CREWS } from '../data/mock';

export default function CrewScreen() {
    const crew = MOCK_CREWS[0];

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* Crew Card */}
                <View style={styles.card}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>{getInitials(crew.name)}</Text>
                    </View>
                    <Text style={styles.crewName}>{crew.name}</Text>
                    <View style={styles.statsRow}>
                        <Users color={theme.colors.secondary} size={14} />
                        <Text style={styles.statsText}>{crew.memberCount} MEMBERS</Text>
                        <Text style={styles.rankText}>{crew.rank}</Text>
                    </View>
                </View>
            </View>

            {/* Red Banner */}
            <View style={styles.banner}>
                <View style={styles.bannerContent}>
                    <View style={styles.bannerLogoSmall} />
                    <View>
                        <Text style={styles.bannerTitle}>{crew.name}</Text>
                        <Text style={styles.bannerSubtitle}>{crew.tag}</Text>
                    </View>
                    <View style={styles.yearBadge}>
                        <Text style={styles.yearText}>{crew.foundedYear}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionHeader}>MANAGE</Text>

            <View style={styles.menuList}>
                <MenuItem
                    icon={<Settings color={theme.colors.text} />}
                    title="CHANGE SETTINGS"
                    subtitle="Edit crew appearance and settings"
                />
                <MenuItem
                    icon={<Users color={theme.colors.text} />}
                    title="CREW MEMBERS"
                    subtitle="Manage invited or current members"
                />
                <MenuItem
                    icon={<UserPlus color={theme.colors.text} />}
                    title="INVITE MEMBERS"
                    subtitle="Invite new members"
                />
                <MenuItem
                    icon={<Handshake color={theme.colors.text} />}
                    title="EVENT COLLAB INVITES"
                    subtitle="See your invitations to collaborate"
                />
            </View>
        </ScrollView>
    );
}

interface MenuItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

const MenuItem = ({ icon, title, subtitle }: MenuItemProps) => (
    <TouchableOpacity style={styles.menuItem}>
        <View style={styles.iconBox}>{icon}</View>
        <View style={styles.menuText}>
            <Text style={styles.menuTitle}>{title}</Text>
            <Text style={styles.menuSubtitle}>{subtitle}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        paddingTop: 60,
    },
    card: {
        backgroundColor: theme.colors.white,
        width: '100%',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 5,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FF4444', // Keep literal for specific design element
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoText: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 30,
    },
    crewName: {
        fontSize: 28,
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.black,
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.secondary,
        marginLeft: 5,
        marginRight: 15,
        fontSize: 12,
    },
    rankText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.black,
        fontSize: 12,
    },
    banner: {
        backgroundColor: theme.colors.error, // Red banner
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 5,
        marginTop: -20, // Overlap effect
        zIndex: -1,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bannerLogoSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: theme.colors.black,
        marginRight: 10,
    },
    bannerTitle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
    },
    bannerSubtitle: {
        color: '#FFCDD2',
        fontFamily: theme.fonts.primary.regular,
        fontSize: 24, // FIR_ST2 styled
        lineHeight: 24,
    },
    yearBadge: {
        backgroundColor: theme.colors.white,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    yearText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
    },
    sectionHeader: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    menuList: {
        paddingHorizontal: 15,
    },
    menuItem: {
        backgroundColor: theme.colors.card,
        flexDirection: 'row',
        padding: 20,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    iconBox: {
        marginRight: 15,
    },
    menuTitle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        marginBottom: 2,
    },
    menuText: {
        flex: 1,
    },
    menuSubtitle: {
        color: '#888', // Keeping literal as it differs from secondary/textSecondary
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
    },
});

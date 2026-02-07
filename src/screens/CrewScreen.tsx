import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Settings, Users, UserPlus, Handshake } from 'lucide-react-native';

export default function CrewScreen() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                {/* Crew Card */}
                <View style={styles.card}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>SC</Text>
                    </View>
                    <Text style={styles.crewName}>SPORTS CLUB US</Text>
                    <View style={styles.statsRow}>
                        <Users color="#666" size={14} />
                        <Text style={styles.statsText}>1 MEMBERS</Text>
                        <Text style={styles.rankText}>♔ FIRST2</Text>
                    </View>
                </View>
            </View>

            {/* Red Banner */}
            <View style={styles.banner}>
                <View style={styles.bannerContent}>
                    <View style={styles.bannerLogoSmall} />
                    <View>
                        <Text style={styles.bannerTitle}>SPORTS CLUB US</Text>
                        <Text style={styles.bannerSubtitle}>FIR_ST2</Text>
                    </View>
                    <View style={styles.yearBadge}>
                        <Text style={styles.yearText}>'25</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionHeader}>MANAGE</Text>

            <View style={styles.menuList}>
                <MenuItem icon={<Settings color="#FFF" />} title="CHANGE SETTINGS" subtitle="Edit crew appearance and settings" />
                <MenuItem icon={<Users color="#FFF" />} title="CREW MEMBERS" subtitle="Manage invited or current members" />
                <MenuItem icon={<UserPlus color="#FFF" />} title="INVITE MEMBERS" subtitle="Invite new members" />
                <MenuItem icon={<Handshake color="#FFF" />} title="EVENT COLLAB INVITES" subtitle="See your invitations to collaborate" />
            </View>
        </ScrollView>
    );
}

const MenuItem = ({ icon, title, subtitle }) => (
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
        backgroundColor: '#121212',
    },
    header: {
        padding: 20,
        alignItems: 'center',
        paddingTop: 60,
    },
    card: {
        backgroundColor: '#FFF',
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
        backgroundColor: '#FF4444',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoText: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
        fontSize: 30,
    },
    crewName: {
        fontSize: 28,
        fontFamily: 'Oswald_700Bold',
        color: '#000',
        marginBottom: 10,
        textTransform: 'uppercase',
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontFamily: 'Roboto_700Bold',
        color: '#666',
        marginLeft: 5,
        marginRight: 15,
        fontSize: 12,
    },
    rankText: {
        fontFamily: 'Roboto_700Bold',
        color: '#000',
        fontSize: 12,
    },
    banner: {
        backgroundColor: '#D32F2F', // Red banner
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
        backgroundColor: '#000',
        marginRight: 10,
    },
    bannerTitle: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
        fontSize: 18,
    },
    bannerSubtitle: {
        color: '#FFCDD2',
        fontFamily: 'Oswald_400Regular',
        fontSize: 24, // FIR_ST2 styled
        lineHeight: 24,
    },
    yearBadge: {
        backgroundColor: '#FFF',
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    yearText: {
        color: '#000',
        fontFamily: 'Oswald_700Bold',
        fontSize: 12,
    },
    sectionHeader: {
        color: '#666',
        fontFamily: 'Roboto_700Bold',
        marginLeft: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    menuList: {
        paddingHorizontal: 15,
    },
    menuItem: {
        backgroundColor: '#1E1E1E',
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
        color: '#FFF',
        fontFamily: 'Roboto_700Bold',
        fontSize: 14,
        marginBottom: 2,
    },
    menuSubtitle: {
        color: '#888',
        fontFamily: 'Roboto_400Regular',
        fontSize: 12,
    }
});

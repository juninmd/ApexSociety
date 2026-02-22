import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MapPin, Share2, Car, UserPlus } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import CustomButton from '../components/CustomButton';
import CrewBadge from '../components/CrewBadge';
import { RootStackParamList } from '../navigation/types';

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
        { id: 'crew-2', name: 'NIGHT RUNNERS', rank: 'MEMBER' },
    ],
};

export default function ProfileScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header / Cover */}
            <View style={styles.headerContainer}>
                <LinearGradient
                    colors={[theme.colors.primary, '#000']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.coverImage}
                >
                    <View style={styles.coverOverlay} />
                </LinearGradient>

                <View style={styles.profileInfoContainer}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>AR</Text>
                        </View>
                        <View style={styles.onlineBadge} />
                    </View>

                    <View style={styles.nameSection}>
                        <Text style={styles.name}>{USER.name}</Text>
                        <Text style={styles.handle}>{USER.handle}</Text>
                    </View>
                </View>
            </View>

            {/* Bio & Location */}
            <View style={styles.contentSection}>
                <Text style={styles.bio}>{USER.bio}</Text>
                <View style={styles.locationRow}>
                    <MapPin size={14} color={theme.colors.secondary} />
                    <Text style={styles.locationText}>{USER.location}</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{USER.stats.followers}</Text>
                        <Text style={styles.statLabel}>FOLLOWERS</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{USER.stats.following}</Text>
                        <Text style={styles.statLabel}>FOLLOWING</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{USER.stats.reputation}</Text>
                        <Text style={styles.statLabel}>REPUTATION</Text>
                    </View>
                </View>

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
            <View style={styles.sectionContainer}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>MY GARAGE</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>SEE ALL</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.garageList}
                >
                    {USER.garage.map((car) => (
                        <View key={car.id} style={styles.carCard}>
                            <Image source={{ uri: car.image }} style={styles.carImage} />
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.9)']}
                                style={styles.carOverlay}
                            >
                                <Text style={styles.carName}>{car.name}</Text>
                            </LinearGradient>
                        </View>
                    ))}
                    <TouchableOpacity style={styles.addCarCard}>
                        <Car color={theme.colors.secondary} size={32} />
                        <Text style={styles.addCarText}>ADD RIDE</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Crews Section */}
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
                    {USER.crews.map((crew) => (
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

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerContainer: {
        marginBottom: 60, // Space for avatar overlap
    },
    coverImage: {
        height: 200,
        width: '100%',
    },
    coverOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    profileInfoContainer: {
        position: 'absolute',
        bottom: -50,
        left: 20,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: theme.colors.background,
    },
    avatarText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        color: theme.colors.primary,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.success,
        borderWidth: 3,
        borderColor: theme.colors.background,
    },
    nameSection: {
        marginLeft: 15,
        marginBottom: 5,
    },
    name: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 28,
        color: theme.colors.text,
        textTransform: 'uppercase',
    },
    handle: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 16,
        color: theme.colors.primary,
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
    statsContainer: {
        flexDirection: 'row',
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 0,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
    },
    statLabel: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 10,
        color: theme.colors.secondary,
        marginTop: 2,
    },
    statDivider: {
        width: 1,
        backgroundColor: theme.colors.border,
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
    garageList: {
        paddingLeft: 20,
    },
    carCard: {
        width: 200,
        height: 140,
        marginRight: 15,
        backgroundColor: theme.colors.card,
        position: 'relative',
        overflow: 'hidden',
    },
    carImage: {
        width: '100%',
        height: '100%',
    },
    carOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        paddingTop: 40,
    },
    carName: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.white,
    },
    addCarCard: {
        width: 100,
        height: 140,
        marginRight: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderStyle: 'dashed',
    },
    addCarText: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.secondary,
        marginTop: 10,
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

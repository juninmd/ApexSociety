import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { theme } from '../theme';

interface User {
    name: string;
    handle: string;
}

interface ProfileHeaderProps {
    user: User;
    coverImageUrl: string;
}

export default function ProfileHeader({ user, coverImageUrl }: ProfileHeaderProps) {
    return (
        <View style={styles.headerContainer}>
            <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />
            <View style={styles.coverOverlay} />

            <View style={styles.profileInfoContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.onlineBadge} />
                </View>
                <View style={styles.nameSection}>
                    <Text style={styles.name}>{user.name}</Text>
                    <Text style={styles.handle}>{user.handle}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        marginBottom: 60,
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
});

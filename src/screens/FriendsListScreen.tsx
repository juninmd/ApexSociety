import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useFriends, Friend } from '../context/FriendContext';
import { theme } from '../theme';
import { UserMinus } from 'lucide-react-native';

export default function FriendsListScreen() {
    const { friends, removeFriend } = useFriends();

    const getStatusColor = (status: Friend['status']) => {
        switch (status) {
            case 'online':
                return '#4CAF50';
            case 'driving':
                return theme.colors.primary;
            case 'offline':
            default:
                return theme.colors.textSecondary;
        }
    };

    const renderItem = ({ item }: { item: Friend }) => (
        <View style={styles.friendCard}>
            <View style={styles.avatarContainer}>
                {item.avatarUrl ? (
                    <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder} />
                )}
                <View
                    style={[
                        styles.statusIndicator,
                        { backgroundColor: getStatusColor(item.status) },
                    ]}
                />
            </View>
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.username}</Text>
                <Text style={styles.friendStatus}>{item.status.toUpperCase()}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFriend(item.id)} style={styles.removeButton}>
                <UserMinus color={theme.colors.error} size={20} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>MEUS AMIGOS</Text>
            {friends.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Você ainda não adicionou amigos.</Text>
                </View>
            ) : (
                <FlatList
                    data={friends}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    headerTitle: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 20,
    },
    listContainer: {
        paddingHorizontal: 20,
    },
    friendCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.card,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.border,
    },
    statusIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderWidth: 2,
        borderColor: theme.colors.card,
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
    },
    friendStatus: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginTop: 2,
    },
    removeButton: {
        padding: 10,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 16,
    },
});

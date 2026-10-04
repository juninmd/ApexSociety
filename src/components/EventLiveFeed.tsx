import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity } from 'react-native';
import { X, Image as ImageIcon } from 'lucide-react-native';
import { theme } from '../theme';

interface EventLiveFeedProps {
    visible: boolean;
    onClose: () => void;
    eventId: string;
}

interface FeedItem {
    id: string;
    user: string;
    message: string;
    time: string;
    type: 'checkin' | 'chat' | 'photo';
}

const MOCK_FEED: FeedItem[] = [
    {
        id: '1',
        user: 'GhostRider',
        message: 'Just pulled up! 🏎️💨',
        time: 'Just now',
        type: 'chat',
    },
    {
        id: '2',
        user: 'SpeedDemon',
        message: 'Checked in at the spot.',
        time: '1m ago',
        type: 'checkin',
    },
    {
        id: '3',
        user: 'DriftKing',
        message: 'Cops at the main entrance, use the back way!',
        time: '2m ago',
        type: 'chat',
    },
    { id: '4', user: 'NightRunner', message: 'Shared a photo', time: '5m ago', type: 'photo' },
];

export default function EventLiveFeed({ visible, onClose, eventId }: EventLiveFeedProps) {
    const [feed, setFeed] = useState<FeedItem[]>(MOCK_FEED);

    // Simulate incoming messages
    useEffect(() => {
        if (!visible) return;
        const interval = setInterval(() => {
            const newMsg: FeedItem = {
                id: Math.random().toString(),
                user: `Racer${Math.floor(Math.random() * 99)}`,
                message: 'VTEC just kicked in yo!',
                time: 'Just now',
                type: 'chat',
            };
            setFeed((prev) => [newMsg, ...prev]);
        }, 15000);
        return () => clearInterval(interval);
    }, [visible]);

    const renderItem = ({ item }: { item: FeedItem }) => {
        return (
            <View style={styles.feedItem}>
                <View style={styles.feedHeader}>
                    <Text style={styles.feedUser}>{item.user}</Text>
                    <Text style={styles.feedTime}>{item.time}</Text>
                </View>
                {item.type === 'photo' ? (
                    <View style={styles.photoContainer}>
                        <ImageIcon color={theme.colors.secondary} size={24} />
                        <Text style={styles.photoText}>Photo Uploaded</Text>
                    </View>
                ) : (
                    <Text
                        style={[
                            styles.feedMessage,
                            item.type === 'checkin' && styles.checkinMessage,
                        ]}
                    >
                        {item.message}
                    </Text>
                )}
            </View>
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>LIVE EVENT FEED</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X color={theme.colors.white} size={24} />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={feed}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContainer}
                        inverted={false}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        height: '70%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingBottom: 10,
    },
    modalTitle: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.primary,
        fontSize: 18,
        letterSpacing: 1,
    },
    closeButton: {
        padding: 5,
    },
    listContainer: {
        paddingBottom: 20,
        gap: 10,
    },
    feedItem: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 12,
        borderRadius: 8,
    },
    feedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    feedUser: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.white,
        fontSize: 14,
    },
    feedTime: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.textSecondary,
        fontSize: 10,
    },
    feedMessage: {
        fontFamily: theme.fonts.primary.regular,
        color: theme.colors.text,
        fontSize: 14,
    },
    checkinMessage: {
        color: theme.colors.secondary,
        fontStyle: 'italic',
    },
    photoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    photoText: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.secondary,
        marginLeft: 10,
        fontSize: 12,
    },
});

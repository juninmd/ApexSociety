import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image as ImageIcon } from 'lucide-react-native';
import { theme } from '../theme';

interface FeedItem {
    id: string;
    user: string;
    message: string;
    time: string;
    type: 'checkin' | 'chat' | 'photo';
}

interface EventFeedCommentProps {
    item: FeedItem;
}

export default function EventFeedComment({ item }: EventFeedCommentProps) {
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
                    style={[styles.feedMessage, item.type === 'checkin' && styles.checkinMessage]}
                >
                    {item.message}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
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

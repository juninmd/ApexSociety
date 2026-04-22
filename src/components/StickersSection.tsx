import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { theme } from '../theme';

interface Sticker {
    id: string;
    name: string;
    color: string;
}

interface StickersSectionProps {
    stickers: Sticker[];
}

export default function StickersSection({ stickers }: StickersSectionProps) {
    return (
        <View style={styles.section}>
            <View style={styles.header}>
                <Text style={styles.title}>ADESIVOS DIGITAIS</Text>
                <Text style={styles.count}>{stickers.length}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.list}>
                {stickers.map((sticker) => (
                    <View key={sticker.id} style={[styles.stickerCard, { borderColor: sticker.color }]}>
                        <View style={[styles.stickerCircle, { backgroundColor: sticker.color }]} />
                        <Text style={styles.stickerName}>{sticker.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    section: {
        marginTop: 30,
        marginBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 15,
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: theme.colors.text,
        letterSpacing: 1,
    },
    count: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        color: theme.colors.primary,
        marginLeft: 10,
    },
    list: {
        paddingLeft: 20,
    },
    stickerCard: {
        width: 100,
        height: 120,
        backgroundColor: '#151515',
        borderWidth: 1,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    stickerCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10,
    },
    stickerName: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 10,
        color: theme.colors.text,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});

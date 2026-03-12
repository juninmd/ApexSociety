import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface CrewBannerProps {
    name: string;
    tag: string;
    foundedYear: string;
}

export default function CrewBanner({ name, tag, foundedYear }: CrewBannerProps) {
    return (
        <View style={styles.banner}>
            <View style={styles.bannerContent}>
                <View style={styles.bannerLogoSmall} />
                <View>
                    <Text style={styles.bannerTitle}>{name}</Text>
                    <Text style={styles.bannerSubtitle}>{tag}</Text>
                </View>
                <View style={styles.yearBadge}>
                    <Text style={styles.yearText}>{foundedYear}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#cc0000',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    bannerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bannerLogoSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#000',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#fff',
    },
    bannerTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        color: '#fff',
    },
    bannerSubtitle: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
    },
    yearBadge: {
        marginLeft: 'auto',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
    },
    yearText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 12,
        color: '#fff',
    },
});

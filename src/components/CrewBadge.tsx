import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CrewBadgeProps {
    name: string;
    rank?: string;
    size?: 'small' | 'medium' | 'large';
}

export default function CrewBadge({ name, rank, size = 'medium' }: CrewBadgeProps) {
    const getDimensions = () => {
        switch (size) {
            case 'small': return { width: 40, height: 40, fontSize: 14 };
            case 'medium': return { width: 60, height: 60, fontSize: 20 };
            case 'large': return { width: 100, height: 100, fontSize: 36 };
        }
    };

    const { width, height, fontSize } = getDimensions();

    // Extract initials
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <View style={styles.container}>
            <View style={[styles.badge, { width, height, borderRadius: width / 2 }]}>
                <Text style={[styles.text, { fontSize }]}>{initials}</Text>
            </View>
            {rank && (
                <View style={styles.rankBadge}>
                    <Text style={styles.rankText}>{rank}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        backgroundColor: '#FF4444',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    text: {
        color: '#FFF',
        fontFamily: 'Oswald_700Bold',
    },
    rankBadge: {
        position: 'absolute',
        bottom: -5,
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    rankText: {
        color: '#000',
        fontSize: 10,
        fontFamily: 'Roboto_700Bold',
        textTransform: 'uppercase',
    }
});

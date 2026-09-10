import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ShieldAlert, ShieldCheck, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { RouteThreatInfo } from '../hooks/useRouteThreat';

interface RouteThreatBannerProps {
    threatInfo: RouteThreatInfo;
}

export default function RouteThreatBanner({ threatInfo }: RouteThreatBannerProps) {
    const { threatLevel, advice } = threatInfo;

    const getConfig = () => {
        switch (threatLevel) {
            case 'high':
                return {
                    color: theme.colors.error,
                    bg: 'rgba(255,0,0,0.2)',
                    Icon: ShieldAlert,
                };
            case 'medium':
                return {
                    color: theme.colors.warning,
                    bg: 'rgba(255, 165, 0, 0.2)',
                    Icon: AlertTriangle,
                };
            case 'low':
            default:
                return {
                    color: '#4CAF50', // Success green
                    bg: 'rgba(76, 175, 80, 0.1)',
                    Icon: ShieldCheck,
                };
        }
    };

    const { color, bg, Icon } = getConfig();

    return (
        <View style={[styles.container, { backgroundColor: bg, borderColor: color }]}>
            <View style={styles.header}>
                <Icon color={color} size={18} />
                <Text style={[styles.title, { color }]}>
                    AI ROUTE THREAT: {threatLevel.toUpperCase()}
                </Text>
            </View>
            <Text style={styles.advice}>{advice}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        marginLeft: 8,
        letterSpacing: 1,
    },
    advice: {
        fontFamily: theme.fonts.primary.regular,
        color: theme.colors.white,
        fontSize: 12,
        lineHeight: 18,
    },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { theme } from '../theme';

interface MenuItemProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

export default function CrewMenuItem({ icon, title, subtitle }: MenuItemProps) {
    return (
        <TouchableOpacity style={styles.menuItem}>
            <View style={styles.iconContainer}>{icon}</View>
            <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{title}</Text>
                <Text style={styles.menuSubtitle}>{subtitle}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.card,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    menuContent: {
        flex: 1,
    },
    menuTitle: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        color: theme.colors.text,
        marginBottom: 2,
    },
    menuSubtitle: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.textSecondary,
    },
});

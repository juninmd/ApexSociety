import { theme } from '../theme';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function CustomButton({
    title,
    onPress,
    variant = 'primary',
    style,
    textStyle,
}: CustomButtonProps) {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary':
                return theme.colors.primary;
            case 'secondary':
                return theme.colors.border;
            case 'danger':
                return theme.colors.error;
            default:
                return theme.colors.primary;
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary':
                return theme.colors.black;
            case 'secondary':
                return theme.colors.white;
            case 'danger':
                return theme.colors.white;
            default:
                return theme.colors.black;
        }
    };

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor: getBackgroundColor() }, style]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        // "Stitch" style: angular, no rounded corners
        borderRadius: 0,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    text: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

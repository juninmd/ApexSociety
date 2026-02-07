import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function CustomButton({ title, onPress, variant = 'primary', style, textStyle }: CustomButtonProps) {
    const getBackgroundColor = () => {
        switch (variant) {
            case 'primary': return '#FFD700';
            case 'secondary': return '#333333';
            case 'danger': return '#D32F2F';
            default: return '#FFD700';
        }
    };

    const getTextColor = () => {
        switch (variant) {
            case 'primary': return '#000000';
            case 'secondary': return '#FFFFFF';
            case 'danger': return '#FFFFFF';
            default: return '#000000';
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
        fontFamily: 'Oswald_700Bold',
        fontSize: 16,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
});

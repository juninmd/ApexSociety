import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { XCircle, AlertTriangle } from 'lucide-react-native';
import { theme } from '../theme';
import { useAlert } from '../context/AlertContext';

export default function GlobalAlert() {
    const { alertMessage, hideAlert } = useAlert();
    const insets = useSafeAreaInsets();
    const [translateY] = useState(new Animated.Value(-100));

    useEffect(() => {
        if (alertMessage) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                speed: 12,
                bounciness: 8,
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -150,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [alertMessage, translateY]);

    if (!alertMessage && translateY.valueOf() === -150) {
        return null;
    }

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    paddingTop: Math.max(insets.top, 20),
                },
            ]}
        >
            <View style={styles.content}>
                <AlertTriangle color={theme.colors.black} size={24} style={styles.icon} />
                <Text style={styles.message} numberOfLines={2}>
                    {alertMessage}
                </Text>
                <TouchableOpacity onPress={hideAlert} style={styles.closeButton}>
                    <XCircle color={theme.colors.black} size={24} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.error,
        zIndex: 9999,
        paddingHorizontal: 16,
        paddingBottom: 16,
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.6,
        shadowRadius: 10,
        elevation: 8,
        borderBottomWidth: 4,
        borderBottomColor: theme.colors.black,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        marginRight: 12,
    },
    message: {
        flex: 1,
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 16,
        textTransform: 'uppercase',
    },
    closeButton: {
        marginLeft: 12,
        padding: 4,
    },
});

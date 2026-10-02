import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { theme } from '../theme';
import { useConvoy } from '../context/ConvoyContext';
import { useAuth } from '../context/AuthContext';

export default function ConvoyChat() {
    const { chatMessages, addChatMessage, isConvoyActive } = useConvoy();
    const { user } = useAuth();
    const [message, setMessage] = useState('');

    if (!isConvoyActive) {
        return null;
    }

    const handleSend = () => {
        if (message.trim()) {
            addChatMessage(user?.username || 'Driver', message.trim());
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>CONVOY CHAT (WALKIE-TALKIE)</Text>
            </View>
            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
                {chatMessages.map((msg) => (
                    <View key={msg.id} style={styles.messageRow}>
                        <Text style={styles.sender}>{msg.sender}: </Text>
                        <Text style={styles.messageText}>{msg.message}</Text>
                    </View>
                ))}
            </ScrollView>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Radio message..."
                    placeholderTextColor={theme.colors.textSecondary}
                    value={message}
                    onChangeText={setMessage}
                    onSubmitEditing={handleSend}
                    returnKeyType="send"
                />
                <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
                    <Text style={styles.sendButtonText}>SEND</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        marginTop: 20,
        padding: 10,
    },
    header: {
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
        paddingBottom: 5,
        marginBottom: 5,
    },
    headerText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.primary,
        fontSize: 12,
        letterSpacing: 1,
    },
    messagesContainer: {
        flex: 1,
        marginBottom: 10,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    sender: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.secondary,
        fontSize: 12,
    },
    messageText: {
        fontFamily: theme.fonts.secondary.regular,
        color: theme.colors.text,
        fontSize: 12,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 4,
        marginLeft: 10,
    },
    sendButtonText: {
        fontFamily: theme.fonts.secondary.bold,
        color: '#000',
        fontSize: 12,
    },
});

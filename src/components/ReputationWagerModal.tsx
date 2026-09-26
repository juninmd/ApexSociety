import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Alert, TextInput } from 'react-native';
import { theme } from '../theme';
import { useReputation } from '../context/ReputationContext';
import CustomButton from './CustomButton';

interface ReputationWagerModalProps {
    visible: boolean;
    onClose: () => void;
    rivalName: string;
}

export default function ReputationWagerModal({
    visible,
    onClose,
    rivalName,
}: ReputationWagerModalProps) {
    const { reputation, addReputation } = useReputation();
    const [wagerAmount, setWagerAmount] = useState('');

    const handleWager = () => {
        const amount = parseInt(wagerAmount, 10);

        if (isNaN(amount) || amount <= 0) {
            Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0.');
            return;
        }

        if (amount > reputation) {
            Alert.alert('Insufficient Funds', 'You do not have enough REP for this wager.');
            return;
        }

        // Simulate a race outcome (50/50 chance)
        const won = Math.random() > 0.5;

        if (won) {
            addReputation(amount);
            Alert.alert('Race Won!', `You smoked ${rivalName} and won ${amount} REP!`);
        } else {
            addReputation(-amount);
            Alert.alert('Race Lost', `You were dusted by ${rivalName}. Lost ${amount} REP.`);
        }

        onClose();
        setWagerAmount('');
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>CHALLENGE: {rivalName}</Text>
                    <Text style={styles.subtitle}>Current Balance: {reputation} REP</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Wager Amount (REP):</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={wagerAmount}
                            onChangeText={setWagerAmount}
                            placeholder="Enter amount..."
                            placeholderTextColor={theme.colors.textSecondary}
                        />
                    </View>

                    <View style={styles.buttonRow}>
                        <CustomButton
                            title="CANCEL"
                            onPress={onClose}
                            variant="secondary"
                            style={styles.button}
                        />
                        <CustomButton
                            title="RACE"
                            onPress={handleWager}
                            variant="primary"
                            style={styles.button}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: theme.colors.card,
        width: '100%',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    title: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 20,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: theme.fonts.primary.regular,
        fontSize: 14,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 8,
    },
    input: {
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.border,
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.regular,
        padding: 12,
        borderRadius: 4,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
    },
    button: {
        flex: 1,
    },
});

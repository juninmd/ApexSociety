import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { theme } from '../theme';

interface ChallengeCrewModalProps {
    visible: boolean;
    crewName: string;
    onClose: () => void;
    onChallenge?: (wagerAmount: number) => void;
}

export default function ChallengeCrewModal({
    visible,
    crewName,
    onClose,
    onChallenge,
}: ChallengeCrewModalProps) {
    const [wager, setWager] = useState('100');

    const handleChallenge = () => {
        const wagerAmount = parseInt(wager) || 0;

        if (wagerAmount < 10) {
            Alert.alert('Erro', 'A aposta mínima é 10 REP.');
            return;
        }

        if (onChallenge) {
            onChallenge(wagerAmount);
        } else {
            Alert.alert(
                'Desafio Enviado',
                `Você desafiou a equipe ${crewName} para uma Turf War apostando ${wagerAmount} REP! Eles foram notificados.`,
            );
        }

        onClose();
    };

    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>CHALLENGE CREW</Text>
                    <Text style={styles.subtitle}>
                        Você quer desafiar a equipe <Text style={styles.highlight}>{crewName}</Text>{' '}
                        para uma Turf War?
                    </Text>

                    <Text style={styles.description}>
                        Isso irá notificar o líder da equipe. Caso aceitem, um evento de Turf War
                        será criado no mapa! Insira o valor de REP que deseja apostar (WAGER):
                    </Text>

                    <View style={styles.wagerContainer}>
                        <Text style={styles.wagerLabel}>WAGER (REP):</Text>
                        <TextInput
                            style={styles.wagerInput}
                            keyboardType="numeric"
                            value={wager}
                            onChangeText={setWager}
                            maxLength={5}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.cancelButtonText}>CANCELAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.challengeButton} onPress={handleChallenge}>
                            <Text style={styles.challengeButtonText}>ENVIAR DESAFIO</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.85)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    title: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 22,
        marginBottom: 10,
        letterSpacing: 1,
    },
    subtitle: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 16,
        marginBottom: 15,
        textAlign: 'center',
    },
    highlight: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
    },
    description: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginBottom: 15,
        textAlign: 'center',
    },
    wagerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.primary,
        paddingBottom: 5,
    },
    wagerLabel: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        marginRight: 10,
    },
    wagerInput: {
        color: theme.colors.white,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        minWidth: 60,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        marginRight: 10,
    },
    cancelButtonText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
    },
    challengeButton: {
        flex: 1,
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        borderWidth: 1,
        borderColor: theme.colors.error,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginLeft: 10,
        transform: [{ skewX: '-10deg' }],
    },
    challengeButtonText: {
        color: theme.colors.error,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        transform: [{ skewX: '10deg' }],
    },
});

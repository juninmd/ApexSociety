import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert, TextInput } from 'react-native';
import { styles } from './ChallengeCrewModalStyles';

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

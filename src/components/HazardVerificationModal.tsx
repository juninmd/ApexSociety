import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { theme } from '../theme';
import { useHazards, Hazard } from '../context/HazardContext';

interface HazardVerificationModalProps {
    visible: boolean;
    hazard: Hazard | null;
    onClose: () => void;
}

export default function HazardVerificationModal({
    visible,
    hazard,
    onClose,
}: HazardVerificationModalProps) {
    const { verifyHazard } = useHazards();

    if (!hazard) return null;

    const handleVerify = (isFake: boolean) => {
        verifyHazard(hazard.id, isFake);
        onClose();
    };

    return (
        <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>VERIFICAR {hazard.type.toUpperCase()}</Text>
                    <Text style={styles.subtitle}>Este alerta ainda é válido?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonVerify]}
                            onPress={() => handleVerify(false)}
                        >
                            <Text style={styles.buttonTextVerify}>+1 CONFIRMAR</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonFake]}
                            onPress={() => handleVerify(true)}
                        >
                            <Text style={styles.buttonTextFake}>-1 FALSO / SAIU</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelButtonText}>CANCELAR</Text>
                    </TouchableOpacity>
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
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#1a1a1a',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
    },
    title: {
        color: theme.colors.white,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 18,
        marginBottom: 10,
    },
    subtitle: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 14,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginHorizontal: 5,
        borderWidth: 1,
    },
    buttonVerify: {
        backgroundColor: 'rgba(50,205,50,0.2)',
        borderColor: '#32CD32',
    },
    buttonTextVerify: {
        color: '#32CD32',
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
    buttonFake: {
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderColor: theme.colors.error,
    },
    buttonTextFake: {
        color: theme.colors.error,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
    cancelButton: {
        paddingVertical: 10,
    },
    cancelButtonText: {
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.primary.regular,
        fontSize: 12,
    },
});

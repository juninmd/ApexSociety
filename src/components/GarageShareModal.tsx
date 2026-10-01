import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { QrCode, X, Share2 } from 'lucide-react-native';
import { theme } from '../theme';
import CustomButton from './CustomButton';

interface GarageShareModalProps {
    visible: boolean;
    onClose: () => void;
    carName: string;
}

export default function GarageShareModal({ visible, onClose, carName }: GarageShareModalProps) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Share2 color={theme.colors.primary} size={24} />
                            <Text style={styles.title}>COMPARTILHAR CARRO</Text>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <X color={theme.colors.text} size={24} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>
                        Escaneie o QR Code para visualizar as especificações do {carName}
                    </Text>

                    <View style={styles.qrContainer}>
                        <QrCode color={theme.colors.black} size={150} />
                        <View style={styles.scanLine} />
                    </View>

                    <CustomButton
                        title="SALVAR QR CODE"
                        onPress={() => {
                            // Mock save functionality
                            onClose();
                        }}
                        style={styles.saveButton}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 20,
    },
    subtitle: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 30,
    },
    qrContainer: {
        width: 200,
        height: 200,
        backgroundColor: theme.colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginBottom: 30,
        position: 'relative',
        overflow: 'hidden',
    },
    scanLine: {
        position: 'absolute',
        top: '50%',
        width: '100%',
        height: 2,
        backgroundColor: 'red',
        shadowColor: 'red',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    },
    saveButton: {
        width: '100%',
    },
});

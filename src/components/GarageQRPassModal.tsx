import React from 'react';
import { StyleSheet, TouchableOpacity, Modal } from 'react-native';
import GarageQRPass from './GarageQRPass';

interface GarageQRPassModalProps {
    visible: boolean;
    onClose: () => void;
    eventId: string;
}

export default function GarageQRPassModal({ visible, onClose, eventId }: GarageQRPassModalProps) {
    return (
        <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
            <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
                <GarageQRPass eventId={eventId} />
            </TouchableOpacity>
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
});

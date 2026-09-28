import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Trophy, X } from 'lucide-react-native';
import { theme } from '../theme';
import CustomButton from './CustomButton';

interface ShowAndShineVotingModalProps {
    visible: boolean;
    onClose: () => void;
    eventId: string;
}

const CATEGORIES = [
    { id: 'jdm', name: 'Best JDM' },
    { id: 'muscle', name: 'Best Muscle' },
    { id: 'euro', name: 'Best Euro' },
    { id: 'stance', name: 'Best Stance' },
];

const CAR_ENTRIES = [
    { id: 'c1', owner: '@driftking_99', car: 'Nissan 180SX' },
    { id: 'c2', owner: '@v8_beast', car: 'Ford Mustang GT' },
    { id: 'c3', owner: '@euro_tuner', car: 'BMW M3 E46' },
    { id: 'c4', owner: '@low_life', car: 'Subaru BRZ' },
];

export default function ShowAndShineVotingModal({
    visible,
    onClose,
    eventId,
}: ShowAndShineVotingModalProps) {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [votes, setVotes] = useState<Record<string, string>>({});

    const handleVote = (carId: string) => {
        if (!selectedCategory) {
            Alert.alert('Selecione uma Categoria', 'Por favor, escolha uma categoria primeiro.');
            return;
        }

        setVotes((prev) => ({
            ...prev,
            [selectedCategory]: carId,
        }));
        Alert.alert(
            'Voto Registrado!',
            `Seu voto para ${CATEGORIES.find((c) => c.id === selectedCategory)?.name} foi computado.`,
        );
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.titleContainer}>
                            <Trophy color={theme.colors.primary} size={24} />
                            <Text style={styles.title}>SHOW & SHINE</Text>
                        </View>
                        <TouchableOpacity onPress={onClose}>
                            <X color={theme.colors.text} size={24} />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.subtitle}>Vote nos melhores carros do evento!</Text>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesScroll}
                    >
                        {CATEGORIES.map((cat) => (
                            <TouchableOpacity
                                key={cat.id}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === cat.id && styles.categoryButtonActive,
                                ]}
                                onPress={() => setSelectedCategory(cat.id)}
                            >
                                <Text
                                    style={[
                                        styles.categoryText,
                                        selectedCategory === cat.id && styles.categoryTextActive,
                                    ]}
                                >
                                    {cat.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <ScrollView style={styles.entriesList}>
                        {CAR_ENTRIES.map((entry) => (
                            <View key={entry.id} style={styles.entryCard}>
                                <View style={styles.entryInfo}>
                                    <Text style={styles.entryCar}>{entry.car}</Text>
                                    <Text style={styles.entryOwner}>{entry.owner}</Text>
                                </View>
                                <CustomButton
                                    title={
                                        votes[selectedCategory || ''] === entry.id
                                            ? 'VOTADO'
                                            : 'VOTAR'
                                    }
                                    onPress={() => handleVote(entry.id)}
                                    variant={
                                        votes[selectedCategory || ''] === entry.id
                                            ? 'secondary'
                                            : 'primary'
                                    }
                                    style={styles.voteButton}
                                />
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderColor: theme.colors.primary,
        padding: 20,
        height: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    title: {
        color: theme.colors.primary,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
    },
    subtitle: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        marginBottom: 20,
    },
    categoriesScroll: {
        maxHeight: 40,
        marginBottom: 20,
    },
    categoryButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginRight: 10,
        borderRadius: 20,
    },
    categoryButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
    },
    categoryText: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
    },
    categoryTextActive: {
        color: theme.colors.primary,
    },
    entriesList: {
        flex: 1,
    },
    entryCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 10,
        borderRadius: 8,
    },
    entryInfo: {
        flex: 1,
    },
    entryCar: {
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
    },
    entryOwner: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 12,
        marginTop: 4,
    },
    voteButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
});

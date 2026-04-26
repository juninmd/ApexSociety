import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { useEvents } from '../context/EventContext';
import { Event } from '../types';
import FormInput from './FormInput';
import EventTypeSelector from './EventTypeSelector';

export default function CreateEventForm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addEvent } = useEvents();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [eventType, setEventType] = useState<'meet' | 'race' | 'checkpoint'>('meet');
    const [riskLevel, setRiskLevel] = useState<'low' | 'medium' | 'high'>('low');
    const [prize, setPrize] = useState('');

    const handleCreate = () => {
        if (!title || !date || !time || !location) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
            return;
        }
        const newEvent: Event = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
            title,
            description,
            hostId: 'user-current',
            location: { latitude: 0, longitude: 0, address: location },
            startTime: `${date} @ ${time}`,
            endTime: `${date} @ ${time}`,
            attendees: 1,
            isPrivate: false,
            eventType,
            ...(eventType === 'race' ? { riskLevel, prize } : {}),
        };
        addEvent(newEvent);
        Alert.alert('Sucesso', 'Evento criado com sucesso!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    return (
        <View style={styles.form}>
            <EventTypeSelector eventType={eventType} setEventType={setEventType} />
            <FormInput
                label="TÍTULO DO EVENTO"
                placeholder="Ex: Encontro de Sexta à Noite"
                value={title}
                onChangeText={setTitle}
            />
            <FormInput
                label="DESCRIÇÃO"
                placeholder="Qual é o plano?"
                value={description}
                onChangeText={setDescription}
                isTextArea
            />
            <View style={styles.row}>
                <View style={styles.halfWidth}>
                    <FormInput
                        label="DATA"
                        placeholder="DD/MM/AAAA"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>
                <View style={styles.halfWidth}>
                    <FormInput
                        label="HORA"
                        placeholder="HH:MM"
                        value={time}
                        onChangeText={setTime}
                    />
                </View>
            </View>
            <FormInput
                label="LOCALIZAÇÃO (ENDEREÇO OU PONTO)"
                placeholder="Onde vamos nos encontrar?"
                value={location}
                onChangeText={setLocation}
            />

            {eventType === 'race' && (
                <>
                    <View style={styles.riskSelector}>
                        <Text style={styles.label}>NÍVEL DE RISCO</Text>
                        <View style={styles.riskButtons}>
                            {(['low', 'medium', 'high'] as const).map((level) => (
                                <TouchableOpacity
                                    key={level}
                                    style={[
                                        styles.riskButton,
                                        riskLevel === level && styles.riskButtonActive,
                                    ]}
                                    onPress={() => setRiskLevel(level)}
                                >
                                    <Text
                                        style={[
                                            styles.riskButtonText,
                                            riskLevel === level && styles.riskButtonTextActive,
                                        ]}
                                    >
                                        {level === 'low'
                                            ? 'BAIXO'
                                            : level === 'medium'
                                              ? 'MÉDIO'
                                              : 'ALTO'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <FormInput
                        label="PREMIAÇÃO"
                        placeholder="Ex: R$ 500 ou Respeito"
                        value={prize}
                        onChangeText={setPrize}
                    />
                </>
            )}

            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <View style={styles.buttonBackground} />
                <Text style={styles.buttonText}>PUBLICAR EVENTO</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>CANCELAR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    form: { padding: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    halfWidth: { width: '48%' },
    createButton: {
        marginTop: 30,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
    },
    buttonBackground: { ...StyleSheet.absoluteFillObject, backgroundColor: theme.colors.primary },
    buttonText: {
        fontFamily: theme.fonts.primary.bold,
        color: '#000',
        fontSize: 18,
        letterSpacing: 2,
        position: 'relative',
        zIndex: 1,
    },
    cancelButton: {
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        marginBottom: 40,
    },
    cancelText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        fontSize: 14,
        letterSpacing: 1,
    },
    label: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        fontSize: 12,
        letterSpacing: 1,
    },
    riskSelector: {
        marginBottom: 20,
    },
    riskButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    riskButton: {
        flex: 1,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        padding: 12,
        marginHorizontal: 4,
        alignItems: 'center',
    },
    riskButtonActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    riskButtonText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        fontSize: 12,
    },
    riskButtonTextActive: {
        color: '#000',
    },
});

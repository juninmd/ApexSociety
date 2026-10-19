import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useEvents } from '../context/EventContext';
import { Event } from '../types';
import { useWeather } from '../hooks/useWeather';
import FormInput from './FormInput';
import EventTypeSelector from './EventTypeSelector';
import CreateEventRiskSelector from './CreateEventRiskSelector';
import CreateEventDateTimeInput from './CreateEventDateTimeInput';
import { styles } from './CreateEventFormStyles';

export default function CreateEventForm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addEvent } = useEvents();
    const { isRaining } = useWeather();
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
            {isRaining && (
                <View style={styles.weatherWarning}>
                    <Text style={styles.weatherWarningText}>
                        ALERTA: PREVISÃO DE CHUVA NA REGIÃO. RISCO ELEVADO PARA CORRIDAS.
                    </Text>
                </View>
            )}
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
            <CreateEventDateTimeInput date={date} setDate={setDate} time={time} setTime={setTime} />
            <FormInput
                label="LOCALIZAÇÃO (ENDEREÇO OU PONTO)"
                placeholder="Onde vamos nos encontrar?"
                value={location}
                onChangeText={setLocation}
            />

            {eventType === 'race' && (
                <CreateEventRiskSelector
                    riskLevel={riskLevel}
                    setRiskLevel={setRiskLevel}
                    prize={prize}
                    setPrize={setPrize}
                />
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

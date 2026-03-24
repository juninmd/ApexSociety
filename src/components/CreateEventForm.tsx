import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/types';
import { useEvents } from '../context/EventContext';
import { Event } from '../types';
import FormInput from './FormInput';

export default function CreateEventForm() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { addEvent } = useEvents();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [eventType, setEventType] = useState<'meet' | 'race' | 'checkpoint'>('meet');

    const handleCreate = () => {
        if (!title || !date || !time || !location) {
            Alert.alert('Error', 'Please fill in all required fields');
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
        };
        addEvent(newEvent);
        Alert.alert('Success', 'Event created successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    return (
        <View style={styles.form}>
            <View style={styles.typeSelectorContainer}>
                <Text style={styles.typeLabel}>EVENT TYPE</Text>
                <View style={styles.typeSelector}>
                    {(['meet', 'race', 'checkpoint'] as const).map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.typeButton,
                                eventType === type && styles.typeButtonActive,
                            ]}
                            onPress={() => setEventType(type)}
                        >
                            <Text
                                style={[
                                    styles.typeButtonText,
                                    eventType === type && styles.typeButtonTextActive,
                                ]}
                            >
                                {type.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <FormInput
                label="EVENT TITLE"
                placeholder="Ex: Friday Night Meet"
                value={title}
                onChangeText={setTitle}
            />
            <FormInput
                label="DESCRIPTION"
                placeholder="What's the plan?"
                value={description}
                onChangeText={setDescription}
                isTextArea
            />
            <View style={styles.row}>
                <View style={styles.halfWidth}>
                    <FormInput
                        label="DATE"
                        placeholder="MM/DD/YYYY"
                        value={date}
                        onChangeText={setDate}
                    />
                </View>
                <View style={styles.halfWidth}>
                    <FormInput
                        label="TIME"
                        placeholder="HH:MM PM"
                        value={time}
                        onChangeText={setTime}
                    />
                </View>
            </View>
            <FormInput
                label="LOCATION (ADDRESS OR SPOT)"
                placeholder="Where are we meeting?"
                value={location}
                onChangeText={setLocation}
            />
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                <View style={styles.buttonBackground} />
                <Text style={styles.buttonText}>PUBLISH EVENT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                <Text style={styles.cancelText}>CANCEL</Text>
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
    typeSelectorContainer: {
        marginBottom: 20,
    },
    typeLabel: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        color: theme.colors.textSecondary,
        marginBottom: 8,
        letterSpacing: 1,
    },
    typeSelector: {
        flexDirection: 'row',
        gap: 10,
    },
    typeButton: {
        flex: 1,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: theme.colors.border,
        alignItems: 'center',
        backgroundColor: theme.colors.card,
    },
    typeButtonActive: {
        borderColor: theme.colors.primary,
        backgroundColor: theme.colors.primary,
    },
    typeButtonText: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 14,
        color: theme.colors.textSecondary,
    },
    typeButtonTextActive: {
        color: theme.colors.black,
    },
});

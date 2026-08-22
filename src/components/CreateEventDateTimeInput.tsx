import React from 'react';
import { View, StyleSheet } from 'react-native';
import FormInput from './FormInput';

interface CreateEventDateTimeInputProps {
    date: string;
    setDate: (date: string) => void;
    time: string;
    setTime: (time: string) => void;
}

export default function CreateEventDateTimeInput({
    date,
    setDate,
    time,
    setTime,
}: CreateEventDateTimeInputProps) {
    return (
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
                <FormInput label="HORA" placeholder="HH:MM" value={time} onChangeText={setTime} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    row: { flexDirection: 'row', justifyContent: 'space-between' },
    halfWidth: { width: '48%' },
});

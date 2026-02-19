import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/types';

export default function CreateEventScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');

    const handleCreate = () => {
        if (!title || !date || !time || !location) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        // Mock creation logic
        console.log('Creating event:', { title, description, date, time, location });
        Alert.alert('Success', 'Event created successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CREATE EVENT</Text>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>EVENT TITLE</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Friday Night Meet"
                        placeholderTextColor={theme.colors.secondary}
                        value={title}
                        onChangeText={setTitle}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="What's the plan?"
                        placeholderTextColor={theme.colors.secondary}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.row}>
                    <View style={[styles.inputGroup, styles.halfInput]}>
                        <Text style={styles.label}>DATE</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="MM/DD/YYYY"
                            placeholderTextColor={theme.colors.secondary}
                            value={date}
                            onChangeText={setDate}
                        />
                    </View>
                    <View style={[styles.inputGroup, styles.halfInput]}>
                        <Text style={styles.label}>TIME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="HH:MM AM/PM"
                            placeholderTextColor={theme.colors.secondary}
                            value={time}
                            onChangeText={setTime}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>LOCATION</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Address or Spot Name"
                        placeholderTextColor={theme.colors.secondary}
                        value={location}
                        onChangeText={setLocation}
                    />
                </View>

                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                    <Text style={styles.createButtonText}>CREATE EVENT</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        padding: 20,
        paddingTop: 60,
        backgroundColor: theme.colors.card,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border,
    },
    headerTitle: {
        color: theme.colors.text,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 24,
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 12,
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: theme.colors.card,
        color: theme.colors.text,
        fontFamily: theme.fonts.secondary.regular,
        padding: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.colors.border,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfInput: {
        width: '48%',
    },
    createButton: {
        backgroundColor: theme.colors.primary,
        padding: 18,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 15,
    },
    createButtonText: {
        color: theme.colors.black,
        fontFamily: theme.fonts.primary.bold,
        fontSize: 18,
        textTransform: 'uppercase',
    },
    cancelButton: {
        padding: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: theme.colors.secondary,
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 14,
        textTransform: 'uppercase',
    },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '../theme';
import { RootStackParamList } from '../navigation/types';
import CrewFormInputs from '../components/CrewFormInputs';

export default function CreateCrewScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [description, setDescription] = useState('');

    const handleCreate = () => {
        if (!name || !tag) {
            Alert.alert('Error', 'Please fill in Crew Name and Tag');
            return;
        }

        if (tag.length > 5) {
            Alert.alert('Error', 'Tag must be 5 characters or less');
            return;
        }

        // Mock creation logic
        console.log('Creating Crew:', { name, tag, description });

        Alert.alert('Success', 'Crew created successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CREATE CREW</Text>
            </View>

            <View style={styles.form}>
                <CrewFormInputs
                    name={name}
                    setName={setName}
                    tag={tag}
                    setTag={setTag}
                    description={description}
                    setDescription={setDescription}
                />

                <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
                    <Text style={styles.createButtonText}>CREATE CREW</Text>
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

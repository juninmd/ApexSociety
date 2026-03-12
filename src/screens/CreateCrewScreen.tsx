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
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>CREW NAME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Night Runners"
                        placeholderTextColor={theme.colors.secondary}
                        value={name}
                        onChangeText={setName}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>TAG (MAX 5 CHARS)</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: NRUN"
                        placeholderTextColor={theme.colors.secondary}
                        value={tag}
                        onChangeText={(text) => setTag(text.toUpperCase())}
                        maxLength={5}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>DESCRIPTION</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="What is your crew about?"
                        placeholderTextColor={theme.colors.secondary}
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

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

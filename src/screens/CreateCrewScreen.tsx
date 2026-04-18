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
            Alert.alert('Erro', 'Por favor, preencha o Nome e a Tag da Equipe');
            return;
        }

        if (tag.length > 5) {
            Alert.alert('Erro', 'A Tag deve ter 5 caracteres ou menos');
            return;
        }

        // Mock creation logic
        console.log('Criando Equipe:', { name, tag, description });

        Alert.alert('Sucesso', 'Equipe criada com sucesso!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>CRIAR EQUIPE</Text>
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
                    <Text style={styles.createButtonText}>CRIAR EQUIPE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelButtonText}>CANCELAR</Text>
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

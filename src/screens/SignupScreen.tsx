import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import { theme } from '../theme';

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSignup = () => {
        Alert.alert('Sucesso', 'Conta criada com sucesso! Você pode fazer login agora.', [
            { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>NOVO CORREDOR</Text>

            <View style={styles.formContainer}>
                <FormInput
                    label="USUÁRIO"
                    placeholder="Escolha seu nome de rua"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <FormInput
                    label="SENHA"
                    placeholder="Sua senha secreta"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <CustomButton title="CRIAR CONTA" onPress={handleSignup} style={styles.signupButton} />

                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
                    <Text style={styles.loginText}>JÁ TEM CONTA? VOLTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        color: theme.colors.white,
        textAlign: 'center',
        marginBottom: 40,
    },
    formContainer: {
        width: '100%',
    },
    signupButton: {
        marginTop: 20,
    },
    loginLink: {
        marginTop: 30,
        alignItems: 'center',
    },
    loginText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.textSecondary,
        fontSize: 14,
    },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import { theme } from '../theme';
import { showAlert } from '../utils/alert';

const MIN_USERNAME = 3; // mesma regra do login (AuthContext)
const MIN_PASSWORD = 6;

export default function SignupScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Antes qualquer entrada (inclusive vazia) dava "Conta criada com sucesso!".
    const handleSignup = () => {
        if (username.trim().length < MIN_USERNAME) {
            setError(`O usuário precisa ter pelo menos ${MIN_USERNAME} caracteres.`);
            return;
        }
        if (password.length < MIN_PASSWORD) {
            setError(`A senha precisa ter pelo menos ${MIN_PASSWORD} caracteres.`);
            return;
        }
        setError(null);
        showAlert('Sucesso', 'Conta criada com sucesso! Você pode fazer login agora.', [
            { text: 'OK', onPress: () => navigation.navigate('Login') },
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
                    onChangeText={(text) => {
                        setUsername(text);
                        setError(null);
                    }}
                    autoCapitalize="none"
                />
                <FormInput
                    label="SENHA"
                    placeholder="Sua senha secreta"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setError(null);
                    }}
                    secureTextEntry
                />

                {error && (
                    <Text
                        accessibilityRole="alert"
                        accessibilityLiveRegion="polite"
                        style={styles.errorText}
                    >
                        {error}
                    </Text>
                )}

                <CustomButton
                    title="CRIAR CONTA"
                    onPress={handleSignup}
                    style={styles.signupButton}
                />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={styles.loginLink}
                >
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
    errorText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.errorText,
        fontSize: 14,
        textAlign: 'center',
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

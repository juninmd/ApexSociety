import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import CustomButton from '../components/CustomButton';
import { theme } from '../theme';

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleLogin = async () => {
        if (!username) {
            Alert.alert('Erro', 'Por favor, insira o nome de usuário.');
            return;
        }
        try {
            await login(username);
            // After successful login, navigation should be handled by AppNavigator observing AuthContext
        } catch (error: any) {
            Alert.alert('Erro no Login', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>APEX SOCIETY</Text>
            <Text style={styles.subtitle}>LOGIN</Text>

            <View style={styles.formContainer}>
                <FormInput
                    label="USUÁRIO"
                    placeholder="Ex: DriftKingBR"
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

                <CustomButton title="ENTRAR" onPress={handleLogin} style={styles.loginButton} />

                <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signupLink}>
                    <Text style={styles.signupText}>NÃO TEM CONTA? CRIE UMA</Text>
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
        fontSize: 42,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 18,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 40,
        letterSpacing: 2,
    },
    formContainer: {
        width: '100%',
    },
    loginButton: {
        marginTop: 20,
    },
    signupLink: {
        marginTop: 30,
        alignItems: 'center',
    },
    signupText: {
        fontFamily: theme.fonts.secondary.bold,
        color: theme.colors.primary,
        fontSize: 14,
    },
});

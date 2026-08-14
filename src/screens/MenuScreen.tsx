import React from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList, RootStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';
import { useAuth } from '../context/AuthContext';
import { useConvoy } from '../context/ConvoyContext';

type MenuScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'Menu'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function MenuScreen() {
    const navigation = useNavigation<MenuScreenNavigationProp>();
    const { logout } = useAuth();
    const { isConvoyActive, toggleConvoy } = useConvoy();

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <CustomButton
                    title={isConvoyActive ? 'DESATIVAR CONVOY' : 'ATIVAR CONVOY'}
                    onPress={toggleConvoy}
                    style={styles.button}
                    variant={isConvoyActive ? 'secondary' : 'primary'}
                />
                <CustomButton
                    title="MODO DIREÇÃO"
                    onPress={() => navigation.navigate('DriveMode')}
                    style={styles.button}
                />
                <CustomButton
                    title="PERFIL"
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.button}
                />
                <CustomButton
                    title="MAPA"
                    onPress={() => navigation.navigate('Map')}
                    style={styles.button}
                />
                <CustomButton
                    title="EVENTOS"
                    onPress={() => navigation.navigate('Events')}
                    style={styles.button}
                />
                <CustomButton
                    title="CLASSIFICAÇÃO"
                    onPress={() => navigation.navigate('Leaderboard')}
                    style={styles.button}
                />
                <CustomButton
                    title="CONFIGURAÇÕES"
                    onPress={() => Alert.alert('Em Breve', 'Configurações em desenvolvimento.')}
                    variant="secondary"
                    style={styles.button}
                />
                <CustomButton
                    title="VERSÃO WEB"
                    onPress={() => Linking.openURL(metadata.homepage)}
                    variant="secondary"
                    style={styles.button}
                />
                <CustomButton
                    title="SAIR (LOGOUT)"
                    onPress={logout}
                    variant="danger"
                    style={styles.button}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        padding: 40,
    },
    menuContainer: {
        gap: 20,
    },
    button: {
        width: '100%',
    },
});

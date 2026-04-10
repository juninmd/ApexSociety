import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';
import { RootTabParamList } from '../navigation/types';
import WebLandingContent from '../components/WebLandingContent';
import { useAlert } from '../context/AlertContext';

export default function MapScreen() {
    const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
    const { showAlert } = useAlert();

    const handleReportBlitz = () => {
        showAlert('Blitz reportada! Alerta emitido para a rede ApexSociety.');
    };

    const handleReportRadar = () => {
        showAlert('Radar Reportado: Motoristas notificados sobre fiscalização eletrônica.');
    };

    const handleReportAcidente = () => {
        showAlert(
            'Acidente Reportado: Motoristas notificados para reduzir a velocidade e ter cautela.',
        );
    };

    return (
        <LinearGradient
            colors={[theme.colors.background, theme.colors.card]}
            style={styles.container}
        >
            <View style={styles.overlay} />
            <WebLandingContent
                handleReportBlitz={handleReportBlitz}
                handleReportRadar={handleReportRadar}
                handleReportAcidente={handleReportAcidente}
                handleDownloadApp={() => Linking.openURL(metadata.githubUrl)}
                handleExploreEvents={() => navigation.navigate('Events')}
            />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    overlay: {
        position: 'absolute',
        top: -100,
        left: -50,
        right: -50,
        height: 400,
        backgroundColor: theme.colors.primary,
        opacity: 0.05,
        transform: [{ skewY: '-10deg' }],
        zIndex: 0,
    },
});

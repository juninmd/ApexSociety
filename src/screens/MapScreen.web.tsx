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
import { useNotification } from '../context/NotificationContext';
import CustomButton from '../components/CustomButton';

export default function MapScreen() {
    const [isOfflineMapCached, setIsOfflineMapCached] = React.useState(false);
    const navigation = useNavigation<BottomTabNavigationProp<RootTabParamList>>();
    const { showAlert } = useAlert();
    const { addNotification } = useNotification();


    const handleOfflineMapToggle = () => {
        setIsOfflineMapCached(!isOfflineMapCached);
        if (!isOfflineMapCached) {
            addNotification({
                title: 'OFFLINE MAP',
                message: 'Downloading map tiles for current region...',
                type: 'info',
            });
            setTimeout(() => {
                addNotification({
                    title: 'OFFLINE MAP',
                    message: 'Map cached successfully.',
                    type: 'success',
                });
            }, 3000);
        } else {
            addNotification({
                title: 'OFFLINE MAP',
                message: 'Offline map cache cleared.',
                type: 'info',
            });
        }
    };

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

            <View style={{ position: 'absolute', top: 60, right: 20, zIndex: 9999 }}>
                <CustomButton
                    title={isOfflineMapCached ? 'CLEAR CACHE' : 'OFFLINE MAP'}
                    onPress={handleOfflineMapToggle}
                    variant="secondary"
                />
            </View>
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

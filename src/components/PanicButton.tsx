import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { AlertTriangle } from 'lucide-react-native';
import * as Location from 'expo-location';
import { theme } from '../theme';
import { useHazards } from '../context/HazardContext';
import { useAlert } from '../context/AlertContext';

export default function PanicButton() {
    const { addHazard } = useHazards();
    const { showAlert } = useAlert();

    const handlePanic = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                showAlert('ALERTA: POLÍCIA REPORTADA! (Sem localização)');
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            const hazard = {
                id: `blitz-${Date.now()}`,
                type: 'blitz' as const,
                location: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    address: 'LOCALIZAÇÃO ATUAL',
                },
                reportedAt: new Date().toISOString(),
            };

            addHazard(hazard);
            showAlert('ALERTA: POLÍCIA REPORTADA!');
        } catch {
            showAlert('ALERTA: POLÍCIA REPORTADA! (Erro na localização)');
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handlePanic} activeOpacity={0.7}>
            <View style={styles.inner}>
                <AlertTriangle color={theme.colors.black} size={28} />
                <Text style={styles.text}>SOS BLITZ</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 150, // above bottom tabs / other content
        right: 20,
        zIndex: 1000,
        backgroundColor: theme.colors.error,
        borderRadius: 30,
        padding: 15,
        elevation: 10,
        shadowColor: theme.colors.error,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
    },
    inner: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: theme.fonts.primary.bold,
        color: theme.colors.black,
        fontSize: 12,
        marginTop: 4,
    },
});

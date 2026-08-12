import React from 'react';
import { View, Text, StyleSheet, Image, Vibration, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { MOCK_PROFILE_USER } from '../data/mock';
import CustomButton from '../components/CustomButton';
import { theme } from '../theme';
import { ArrowLeft } from 'lucide-react-native';

export default function CarDetailsScreen() {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    // Type casting route params since we haven't updated types.ts yet but we will
    const params = route.params as { carId: string } | undefined;
    const carId = params?.carId;

    const car = MOCK_PROFILE_USER.garage.find(c => c.id === carId) || MOCK_PROFILE_USER.garage[0];

    const handleRevEngine = () => {
        // Vibrate to simulate revving engine
        Vibration.vibrate([0, 100, 50, 200, 50, 400]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <ArrowLeft color={theme.colors.white} size={24} />
            </TouchableOpacity>

            <Image source={{ uri: car.image }} style={styles.image} />

            <View style={styles.content}>
                <Text style={styles.title}>{car.name}</Text>

                {car.specs && (
                    <View style={styles.specsContainer}>
                        <Text style={styles.specsTitle}>ESPECIFICAÇÕES</Text>
                        <Text style={styles.specsText}>Motor: {car.specs.engine}</Text>
                        {car.specs.hp && <Text style={styles.specsText}>Potência: {car.specs.hp}</Text>}
                    </View>
                )}

                <View style={styles.actionContainer}>
                    <CustomButton
                        title="ACELERAR MOTOR (REV)"
                        onPress={handleRevEngine}
                        variant="primary"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 20,
    },
    image: {
        width: '100%',
        height: 400,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
        flex: 1,
    },
    title: {
        fontFamily: theme.fonts.primary.bold,
        fontSize: 32,
        color: theme.colors.text,
        marginBottom: 20,
    },
    specsContainer: {
        backgroundColor: theme.colors.card,
        padding: 20,
        borderRadius: 8,
        borderLeftWidth: 3,
        borderLeftColor: theme.colors.primary,
        marginBottom: 30,
    },
    specsTitle: {
        fontFamily: theme.fonts.secondary.bold,
        fontSize: 16,
        color: theme.colors.primary,
        marginBottom: 10,
        letterSpacing: 1,
    },
    specsText: {
        fontFamily: theme.fonts.secondary.regular,
        fontSize: 14,
        color: theme.colors.text,
        marginBottom: 5,
    },
    actionContainer: {
        marginTop: 'auto',
        marginBottom: 40,
    }
});

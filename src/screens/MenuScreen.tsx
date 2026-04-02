import React from 'react';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParamList, RootStackParamList } from '../navigation/types';
import CustomButton from '../components/CustomButton';
import { theme } from '../theme';
import metadata from '../constants/metadata.json';

type MenuScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'Menu'>,
    NativeStackNavigationProp<RootStackParamList>
>;

export default function MenuScreen() {
    const navigation = useNavigation<MenuScreenNavigationProp>();

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <CustomButton
                    title="DRIVE MODE"
                    onPress={() => navigation.navigate('DriveMode')}
                    style={styles.button}
                />
                <CustomButton
                    title="PROFILE"
                    onPress={() => navigation.navigate('Profile')}
                    style={styles.button}
                />
                <CustomButton
                    title="MAP"
                    onPress={() => navigation.navigate('Map')}
                    style={styles.button}
                />
                <CustomButton
                    title="EVENTS"
                    onPress={() => navigation.navigate('Events')}
                    style={styles.button}
                />
                <CustomButton
                    title="SETTINGS"
                    onPress={() => Alert.alert('Coming Soon', 'Settings are under development.')}
                    variant="secondary"
                    style={styles.button}
                />
                <CustomButton
                    title="WEB VERSION"
                    onPress={() => Linking.openURL(metadata.homepage)}
                    variant="secondary"
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

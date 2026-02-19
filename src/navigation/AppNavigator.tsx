import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen
                name="CreateEvent"
                component={CreateEventScreen}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    );
}

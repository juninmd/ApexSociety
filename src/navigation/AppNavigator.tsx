import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import CreateCrewScreen from '../screens/CreateCrewScreen';
import CrewScreen from '../screens/CrewScreen';
import DriveModeScreen from '../screens/DriveModeScreen';
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
            <Stack.Screen
                name="CreateCrew"
                component={CreateCrewScreen}
                options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="CrewDetails" component={CrewScreen} />
            <Stack.Screen name="DriveMode" component={DriveModeScreen} />
        </Stack.Navigator>
    );
}

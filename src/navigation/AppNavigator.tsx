import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import CreateEventScreen from '../screens/CreateEventScreen';
import CreateCrewScreen from '../screens/CreateCrewScreen';
import CrewScreen from '../screens/CrewScreen';
import DriveModeScreen from '../screens/DriveModeScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import CarDetailsScreen from '../screens/CarDetailsScreen';
import { RootStackParamList } from './types';
import { useAuth } from '../context/AuthContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    const { isAuthenticated } = useAuth();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
                <>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Signup" component={SignupScreen} />
                </>
            ) : (
                <>
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
                    <Stack.Screen name="CarDetails" component={CarDetailsScreen} />
                    <Stack.Screen name="DriveMode" component={DriveModeScreen} />
                    <Stack.Screen name="Leaderboard" component={LeaderboardScreen} />
                </>
            )}
        </Stack.Navigator>
    );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Users, Calendar, User, Menu } from 'lucide-react-native';
import { View, StyleSheet } from 'react-native';

// Placeholder screens
import MapScreen from '../screens/MapScreen';
import CrewListScreen from '../screens/CrewListScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MenuScreen from '../screens/MenuScreen';
import { RootTabParamList } from './types';
import { theme } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.secondary,
                tabBarLabelStyle: styles.tabBarLabel,
            }}
        >
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color }) => <Map color={color} size={24} />,
                    tabBarLabel: 'MAPA',
                }}
            />
            <Tab.Screen
                name="Events"
                component={EventsScreen}
                options={{
                    tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
                    tabBarLabel: 'EVENTOS',
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: () => (
                        <View style={styles.menuIconContainer}>
                            <Menu color={theme.colors.menuIcon} size={24} style={styles.menuIcon} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Crews"
                component={CrewListScreen}
                options={{
                    tabBarIcon: ({ color }) => <Users color={color} size={24} />, // Icon for crew
                    tabBarLabel: 'EQUIPES',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color }) => <User color={color} size={24} />,
                    tabBarLabel: 'PERFIL',
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: theme.colors.black,
        borderTopColor: theme.colors.border,
        height: 80,
        paddingBottom: 20,
        paddingTop: 10,
    },
    tabBarLabel: {
        fontFamily: theme.fonts.primary.regular,
        fontSize: 12,
    },
    menuIconContainer: {
        width: 50,
        height: 50,
        backgroundColor: theme.colors.menuIconBg,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        transform: [{ rotate: '45deg' }], // Diamond shape
    },
    menuIcon: {
        transform: [{ rotate: '-45deg' }],
    },
});

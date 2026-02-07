import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Map, Users, Calendar, User, Menu } from 'lucide-react-native';
import { View } from 'react-native';

// Placeholder screens
import MapScreen from '../screens/MapScreen';
import CrewScreen from '../screens/CrewScreen';
import EventsScreen from '../screens/EventsScreen';
import ProfileScreen from '../screens/ProfileScreen'; // Todo
import MenuScreen from '../screens/MenuScreen'; // Todo

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#000000',
                    borderTopColor: '#333333',
                    height: 80,
                    paddingBottom: 20,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: '#FFD700',
                tabBarInactiveTintColor: '#666666',
                tabBarLabelStyle: {
                    fontFamily: 'Oswald_400Regular',
                    fontSize: 12,
                },
            }}
        >
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color }) => <Map color={color} size={24} />,
                    tabBarLabel: 'CHATS' // Based on mock, seems to be first tab
                }}
            />
            <Tab.Screen
                name="Events"
                component={EventsScreen}
                options={{
                    tabBarIcon: ({ color }) => <Calendar color={color} size={24} />,
                    tabBarLabel: 'EVENTS'
                }}
            />
            <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: '#FFD700',
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center',
                            bottom: 10,
                            transform: [{ rotate: '45deg' }] // Diamond shape
                        }}>
                            <Menu color="#000" size={24} style={{ transform: [{ rotate: '-45deg' }] }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Moments"
                component={CrewScreen} // Using CrewScreen here for now from mocks
                options={{
                    tabBarIcon: ({ color }) => <Users color={color} size={24} />, // Icon for crew
                    tabBarLabel: 'MOMENTS'
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen || View}
                options={{
                    tabBarIcon: ({ color }) => <User color={color} size={24} />,
                    tabBarLabel: 'PROFILE'
                }}
            />
        </Tab.Navigator>
    );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FridgeContentScreen from '../screens/FridgeContentScreen';
import MatchmakingScreen from '../screens/MatchmakingScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import CameraScreen from '../screens/CameraScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                style: {
                    borderTopWidth: 0, // Remove top border
                    elevation: 0, // Remove shadow on Android
                },
                showLabel: false,
            }}
            screenOptions={{
                headerShown: false, // This will apply to all screens within this navigator
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/Home.png')} style={{ width: size, height: size, tintColor: color }} />
                    ),
                }}
            />
            <Tab.Screen
                name="FridgeContent"
                component={FridgeContentScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/List.png')} style={{ width: size, height: size, tintColor: color }} />
                    ),
                }}
            />
            <Tab.Screen
                name="AddItem"
                component={CameraScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <View style={{ position: 'absolute', top: -20, alignItems: 'center' }}>
                            <View style={{ backgroundColor: '#fff', borderRadius: 30, padding: 5 }}>
                                <Image source={require('../assets/Plus.png')} style={{ width: size, height: size, tintColor: color }} />
                            </View>
                            <View style={{ position: 'absolute', bottom: -5, width: 50, height: 10, backgroundColor: '#2e78b7', borderRadius: 5 }} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Matchmaking"
                component={MatchmakingScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/Cards.png')} style={{ width: size, height: size, tintColor: color }} />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={UserSettingsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Image source={require('../assets/Profile.png')} style={{ width: size, height: size, tintColor: color }} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

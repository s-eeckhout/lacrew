import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FridgeContentScreen from '../screens/FridgeContentScreen';
import MatchmakingScreen from '../screens/MatchmakingScreen';
import UserSettingsScreen from '../screens/UserSettingsScreen';
import CameraScreen from '../screens/CameraScreen';

import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
    <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
        tabBarActiveTintColor: '#2e78b7',
        tabBarShowLabel: false,
        }}
    >
        <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen
        name="FridgeContent"
        component={FridgeContentScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen
        name="AddItem"
        component={CameraScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="plus" color={color} size={size} />
            ),
            tabBarButton: (props) => (
            // Placeholder for the camera button
            <View {...props} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: props.color }}>Camera</Text>
            </View>
            ),
        }}
        />
        <Tab.Screen
        name="Matchmaking"
        component={MatchmakingScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
            ),
        }}
        />
        <Tab.Screen
        name="Settings"
        component={UserSettingsScreen}
        options={{
            tabBarIcon: ({ color, size }) => (
            <Icon name="cog" color={color} size={size} />
            ),
        }}
        />
    </Tab.Navigator>
    );
}

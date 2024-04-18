import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, View } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import FridgeContentScreen from "../screens/FridgeContentScreen";
import MatchmakingScreen from "../screens/MatchmakingScreen";
import RecipeListScreen from "../screens/RecipeListScreen";
import UserSettingsScreen from "../screens/UserSettingsScreen";
import CameraScreen from "../screens/CameraScreen";
import AddCameraScreen from "../screens/AddCameraScreen";
import GroceryItemScreen from "../screens/GroceryItemScreen";
import RecipeDetailsScreen from "../screens/RecipeDetailsScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function BottomTabNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // This will apply to all screens within this navigator
      }}
    >
      <Stack.Screen
        name="Main"
        component={Navbar}
        options={{ headerShown: false }}
      />
      {/* Add down here all the othe paths for screens that are not rendered as icons in the navbar */}
      <Stack.Screen name="Camera" component={AddCameraScreen} />
      <Stack.Screen name="GroceryItemScreen" component={GroceryItemScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}
function Navbar() {
  return (
    <>
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
              <Image
                source={require("../assets/Home.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="FridgeContent"
          component={FridgeContentScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/List.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="AddItem"
          component={CameraScreen}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <View
                style={{ position: "absolute", top: -20, alignItems: "center" }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 30,
                    padding: 5,
                  }}
                >
                  <Image
                    source={require("../assets/Plus.png")}
                    style={{ width: size, height: size, tintColor: color }}
                  />
                </View>
                <View
                  style={{
                    position: "absolute",
                    bottom: -5,
                    width: 50,
                    height: 10,
                    backgroundColor: "#2e78b7",
                    borderRadius: 5,
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="RecipeList"
          component={RecipeListScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/Cards.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={UserSettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../assets/Profile.png")}
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}

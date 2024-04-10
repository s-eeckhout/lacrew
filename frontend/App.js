import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import {endpoint} from 'utils/endpoint'
import { enableScreens } from 'react-native-screens';
import { Asap_400Regular , Asap_500Medium , Asap_600SemiBold , Asap_400Regular_Italic } from "@expo-google-fonts/asap";
import { useFonts } from "expo-font";
// import { loadFonts } from './GlobalStyles'; // Import the font loading function
// import { AppLoading } from 'expo'; 
enableScreens(false);

export const DataContext = createContext({}); // This will hold our data


export default function App() {
  const [fontsLoaded] = useFonts({Asap_400Regular , Asap_500Medium , Asap_600SemiBold , Asap_400Regular_Italic });
  // const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadApp = async () => {
    await loadFonts();
    setFontsLoaded(true);
  };
  
  
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ENDPOINT ", endpoint)
        const response = await fetch(endpoint);
        const text = await response.text();
        const jsonData = JSON.parse(text);
        setData(jsonData.message);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </DataContext.Provider>
  );
}

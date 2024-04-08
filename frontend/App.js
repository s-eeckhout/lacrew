import React, { useState, useEffect, createContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import {endpoint} from 'utils/endpoint'
import { enableScreens } from 'react-native-screens';
enableScreens(false);

export const DataContext = createContext({}); // This will hold our data


export default function App() {
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

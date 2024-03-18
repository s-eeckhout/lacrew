// App.js in your React Native project

import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const App = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // Function to fetch data from the Flask API
    const fetchData = async () => {
      try {
        // Replace with the IP address and port of your Flask server
        const response = await fetch('http://10.27.82.129:5000/');
        const jsonData = await response.json();
        console.log("data ",jsonData)
        setData(jsonData.message);
      } catch (error) {
        console.error('Error fetching data:', error);
        setData('Error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{data}</Text>
    </View>
  );
};

export default App;

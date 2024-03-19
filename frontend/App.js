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
        const response = await fetch('http://130.229.191.216:5001/');
        const text = await response.text(); // Read response as text first
        console.log("Raw response: ", text);
        const jsonData = JSON.parse(text); // Then try to parse it as JSON
        console.log("Parsed data: ", jsonData);
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

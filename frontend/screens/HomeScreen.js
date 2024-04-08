import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { DataContext } from '../App'; // Import the DataContext if you are using it
import {endpoint} from 'utils/endpoint'


const ScreenTemplate = ({ navigation }) => {
  // Use DataContext if you are passing the API data through context
  // const data = useContext(DataContext);

  // Local state for API data if you're fetching it in the component
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL with your API's URL
        const response = await fetch(endpoint);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        // Render your screen's content with the fetched data
        <Text style={styles.text}>{data.message ? data.message : 'No data fetched'}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
  },
  // Add more styles here as needed
});

export default ScreenTemplate;

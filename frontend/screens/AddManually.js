import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";



const AddForm = ({navigation}) => {

    const BackButton = () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text style={[styles.title, { color: "black" }]}>go Back</Text>
    
            {/* <Image
              source={require("../assets/iconBack.png")}
              style={styles.backImage}
            /> */}
          </TouchableOpacity>
        );
      };

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    category: '',
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., send data to an API)
    console.log('Form data submitted:', formData);
  };

  return (
    <View>
        <BackButton />
        <View style={styles.container}>
            <Text style={styles.title}>Insert grocery</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter name"
                onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text style={styles.label}>Quantity:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter quantity"
                onChangeText={(text) => handleInputChange('quantity', text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Category:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter category"
                onChangeText={(text) => handleInputChange('category', text)}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    backButton: {
        // Adjust style as needed
        position: "absolute",
        display: "flex",
        flexDirection: "row",
        gap: "5",
        alignItems: "center",
        top: 50, // Adjust top as necessary
        left: 10, // Adjust left as necessary
        zIndex: 10, // Ensure button is clickable over other elements
      },

      title: {
        fontWeight: 'bold',
        textAlign: 'center',
      },

  container: {
    marginTop: 90,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    marginLeft:5,
    color: 'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddForm;

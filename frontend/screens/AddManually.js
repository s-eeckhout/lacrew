import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from "@expo/vector-icons";



const AddForm = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);

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
    // Validate input fields (e.g., check if they are not empty)
    if (!formData.name || !formData.quantity || !formData.category) {
      alert('Please fill in all required fields.');
    } else {
        setModalVisible(true);

        // Hide the modal after 3 seconds
        setTimeout(() => {
        setModalVisible(false);
        }, 2000);
    }
  };

  return (
    <View>
        <BackButton />
        <View style={styles.container}>
            <Text style={styles.title1}>Insert new element</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput clearButtonMode="always"
                style={styles.input}
                placeholder="Enter name"
                onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text style={styles.label}>Quantity:</Text>
            <TextInput clearButtonMode="always"
                style={styles.input}
                placeholder="Enter quantity"
                onChangeText={(text) => handleInputChange('quantity', text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Category:</Text>
            <TextInput clearButtonMode="always"
                style={styles.input}
                placeholder="Enter category"
                onChangeText={(text) => handleInputChange('category', text)}
            />

            <Button title="Submit" onPress={handleSubmit} />
        </View>

        <Modal
            visible={isModalVisible}
            animationType="fade"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
            >
            <View style={styles.modalContainer}>
                <Text style={styles.modalText}>Element added</Text>
            </View>
        </Modal>
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

    title1: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },

  container: {
    display: 'flex',
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '80%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalText: {
    padding: 10,
    borderRadius: 20,
    fontSize: 25,
    backgroundColor: 'white',
  }
});

export default AddForm;

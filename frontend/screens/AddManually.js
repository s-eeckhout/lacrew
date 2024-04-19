import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';

const BlueHeader = () => {
  return (
    <Image
      style={styles.BlueHeader}
      contentFit="cover"
      source={require("../assets/BlueHeader.png")} 
    />
  );
}

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

  const [category, setCategory] = useState('');

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);
  

  const handleSubmit = () => {
    formData.category = category;
    // Handle form submission (e.g., send data to an API)
    
    // Validate input fields (e.g., check if they are not empty)
    if (!formData.name || !formData.quantity || !formData.category) {
      alert('Please fill in all required fields.');
    } else {
      console.log('Form data submitted:', formData);
        setModalVisible(true);

        // Hide the modal after 3 seconds
        setTimeout(() => {
        setModalVisible(false);
        }, 2000);

        setCategory('');

        inputRef1.current.clear();
        inputRef2.current.clear();
    }
  };

  const categoryOptions = [
    { label: "Vegetables", value: "vegetables"},
    { label: "Fruit", value: "fruit"},
    { label: "Dairy", value: "dairy"},
    { label: "Meat", value: "Meat"},
    { label: "Pasta", value: "Pasta"},
    { label: "Herbs & Spices", value: "HerbsSpices"},
    { label: "Bread", value: "Bread"},
    { label: "Alcohol", value: "Alcohol"},
    // Add more options here
  ];

  return (
    <View>
        <BlueHeader />
        <BackButton />
        <View style={styles.container}>
            <Text style={styles.title1}>Insert new element</Text>

            <Text style={styles.label}>Name:</Text>
            <TextInput ref={inputRef1} clearButtonMode="always"
                style={styles.input}
                placeholder="Enter name"
                onChangeText={(text) => handleInputChange('name', text)}
            />

            <Text style={styles.label}>Quantity:</Text>
            <TextInput ref={inputRef2} clearButtonMode="always"
                style={styles.input}
                placeholder="Enter quantity"
                onChangeText={(text) => handleInputChange('quantity', text)}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Category:</Text>    
            <View style={styles.category}>
              <RNPickerSelect
                  placeholder={{ label: 'Select a category', value: null }}
                  items={categoryOptions}
                  onValueChange={(value) => setCategory(value)}
                  value={category}
              />
            </View>       
            

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
  BlueHeader: {
    marginTop: -40,
    height: 180,
    width: "100%",
    overflow: "hidden",
  },
  category: {
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    borderRadius: 15,
  },
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
        color: 'white',
        fontSize: 22,
        marginBottom: 50,
    },

  container: {
    display: 'flex',
    marginTop: -80,
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

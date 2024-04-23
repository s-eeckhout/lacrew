import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Ionicons , AntDesign} from "@expo/vector-icons";
import RNPickerSelect from 'react-native-picker-select';
import { endpoint } from "../utils/endpoint";

const BlueHeader = () => {
  return (
    <Image
      style={styles.BlueHeader}
      contentFit="cover"
      source={require("../assets/BlueHeader.png")}
    />
  );
};

const AddForm = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const BackButton = () => {
        return (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={20} color={Color.white} />
            {/* <Text style={[styles.title, { color: "black" }]}>go Back</Text> */}
    
            {/* <Image
              source={require("../assets/iconBack.png")}
              style={styles.backImage}
            /> */}
          </TouchableOpacity>
        );
      };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // today.slice(0, 10);
    // console.log(today)

    function formatDate(date) {
      let month = '' + (date.getMonth() + 1); // Months start at 0
      let day = '' + date.getDate();
      let year = date.getFullYear();
  
      // Add leading zeros if needed
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
  
  const formattedDate = formatDate(today);
  // console.log(formattedDate); // Outputs: "YYYY-MM-DD"

  const [formData, setFormData] = useState({
    name: '',
    quantity: 1,
    category: '',
    day_added: formattedDate,
    expiration_time: '',
  });

  const food_categories = {
    'Milk': 7,
    'Yoghurt': 14,
    'Cheese': 30,
    'Dairy': 14,
    'Butter': 60,
    'Eggs': 30,
    'Vegetables': 5,
    'Fruit': 5,
    'Onion/Garlic': 30,
    'Potatoes': 21,
    'Meat': 7,
    'Fish': 3,
    'Frozen': 180,
    'Bread': 7,
    'Beverages': 180,
    'Juice': 14,
    'Snacks': 180, 
    'Canned': 365,
    'Pasta': 730,
    'Rice': 730,
    'Condiments/Spices': 365,
    'Non-Food': null,
    'Other': null
}
  const [expirationTime, setExpirationTime] = useState(null)
  const addExpirationTime = async () => {
    if (category in food_categories) {
      setExpirationTime(food_categories[category])
      console.log(expirationTime)
      await handleInputChange('expiration_time', expirationTime)
    }

  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const [category, setCategory] = useState('');

  const inputRef1 = useRef(null);
  const inputRef2 = useRef(null);

  const handlePost = async (postContent) => {
    // try {
      const response = await fetch(endpoint + "fridge-items", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          postContent
        ),
      });
      // const json = await response.json();
      if (response.ok) {
        console.log("Update successful"); //Saving recipe",id,  "- after: ", newValue);
      } else {
        console.error("Failed to update");
      }


      // console.log("Update successful");
    // } catch (error) {
    //   console.log("Failed to update");
    // }
  };

  const handleSubmit = () => {
    formData.category = category;
    addExpirationTime();
    console.log(formData)
    // Handle form submission (e.g., send data to an API)
    
    // Validate input fields (e.g., check if they are not empty)
    if (!formData.name || !formData.quantity || !formData.category) {
      alert('Please fill in all required fields.');
    } else {
      handlePost(formData)

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
    { label: "Vegetables", value: "Vegetables"},
    { label: "Fruit", value: "Fruit"},
    { label: "Dairy", value: "Dairy"},
    { label: "Meat", value: "Meat"},
    { label: "Pasta", value: "Pasta"},
    { label: "Herbs & Spices", value: "HerbsSpices"},
    { label: "Bread", value: "Bread"},
    { label: "Alcohol", value: "Alcohol"},
    // Add more options here
  ];

  return (
    <View style={styles.headContainer}>
        <BlueHeader />
        <BackButton />
        <View style={styles.container}>
            <Text style={styles.title1}>Add New Groceries</Text>

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
                onChangeText={(text) => handleInputChange('quantity', parseInt(text))}
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
    marginTop: -30,
    marginLeft:-580,
    // height: 180,
    // width: "100%",
    overflow: "hidden",
    position: "absolute",
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
        top: 72, // Adjust top as necessary
        left: 20, // Adjust left as necessary
        zIndex: 10, // Ensure button is clickable over other elements
    },

    title1: {
        // fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        fontFamily: FontFamily.futuraBold,
        fontSize: 20,
        marginBottom: 50,
    },

  container: {
    flex: 1,
    marginTop: 50,
    padding: 20,
  },
  headContainer: {
    flex: 1,
    backgroundColor: Color.colorWhite,
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

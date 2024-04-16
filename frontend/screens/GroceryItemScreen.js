import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Slider from 'react-native-slider';
import * as Progress from 'react-native-progress';
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';



const GroceryItem = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; // Get the passed item data

  const [value, setValue] = useState(0.2); // Initial value for the slider

  // Custom Back Button component
  const BackButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/iconBack.png')} style={styles.backImage} />
      </TouchableOpacity>
    );
  };

  //const item = groceries.find(item => item.name === 'Milk 🥛');

  const handleValueChange = newValue => {
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.headerText}>{item.name}</Text>

      <Text style={[styles.text, styles.textLayout]}> Leftover Amount </Text>
      <View style={styles.sliderLayout}>
        <Slider
        trackStyle={customStyles3.track}
        thumbStyle={customStyles3.thumb}
        minimumTrackTintColor='#eecba8'
          // style={styles.slider}
          value={value}
          onValueChange={handleValueChange}
        />
        </View>


        <Text style={[styles.text, styles.textLayoutExpiration]}> Expiration Date </Text>
        {/* <View style={styles.sliderLayout}> */}
        <View style={styles.progressLayout}>
        <Progress.Bar 
          progress={item.completed / 100} 
          width={300} 
          color='#eb6e1b'
        />
        {/* </View> */}
        {/* <Text>Value: {value}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: '700',
    marginTop: 30,
    left: 20,
    color: 'black',
    // textAlign: 'left',
    fontSize: 20,
  },
  sliderLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },
  progressLayout:{
    justifyContent: 'center',
    alignItems: 'center',
    top: 80
  },
  text: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: 'black', // Text color based on selected state
    textAlign: "left",
  },
  textLayout: {
    top: 40,
    left: 43,
    textAlign: "left",
  },
  textLayoutExpiration: {
    top: 60,
    left: 43,
    textAlign: "left",
  },
  backButton: {
    // Adjust style as needed
    position: 'absolute',
    top: 50, // Adjust top as necessary
    left: 10, // Adjust left as necessary
    zIndex: 10, // Ensure button is clickable over other elements
  },
  backImage: {
    // Adjust size as needed
    width: 25,
    height: 25,
  },
});

var customStyles3 = StyleSheet.create({
  track: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#d0d0d0',
    width: 300
  },
  thumb: {
    width: 10,
    height: 30,
    borderRadius: 5,
    backgroundColor: '#eb6e1b',
  }
});

export default GroceryItem;
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import Slider from 'react-native-slider';
import * as Progress from 'react-native-progress';
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { endpoint } from '../utils/endpoint';



const GroceryItem = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; // Get the passed item data
  const [sliderValue, setSliderValue] = useState(item.completed)

  const updateBackend = async (newValue) => {
    const response = await fetch(endpoint+`fridge-items/${item.name}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ percentage_left: newValue })
    });

    if (response.ok) {
      console.log('Update successful');
    } else {
      console.error('Failed to update');
    }
  };

  const handleValueChangeComplete = (newValue) => {
    setSliderValue(newValue);
    updateBackend(newValue);
  };


  // Custom Back Button component
  const BackButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../assets/iconBack.png')} style={styles.backImage} />
      </TouchableOpacity>
    );
  };





  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.headerText}>{item.name}</Text>

      <Text style={[styles.text, styles.textLayout]}> Leftover Amount </Text>
      <View style={styles.sliderLayout}>
      <Slider
          style={{ width: 300, height: 40 }}
          minimumValue={0}
          maximumValue={100}
          step={25}
          value={sliderValue}
          onValueChange={newValue => setSliderValue(newValue)}
          onSlidingComplete={handleValueChangeComplete}
          minimumTrackTintColor="#7375c0"
          maximumTrackTintColor="#00a3ff"
          thumbTintColor="#7375c0"
        />
        <Text style={styles.sliderValueText}>{`${sliderValue}%`}</Text>
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
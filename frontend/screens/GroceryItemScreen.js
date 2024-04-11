import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from 'react-native-slider';
import * as Progress from 'react-native-progress';
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";

const GroceryItem = () => {
  const [value, setValue] = useState(0.2); // Initial value for the slider

  const groceries = [
    { name: 'Salad 🥗', days: '02 days', completed: 20 },
    { name: 'Milk 🥛', days: '04 days', completed: 40 },
    { name: 'Carrot 🥕', days: '05 days', completed: 60 },
    { name: 'Avocado 🥑', days: '7 days', completed: 80 },
    { name: 'Corn 🌽', days: '7 days', completed: 30 },
    { name: 'Bacon 🥓', days: '7 days', completed: 50 },
    { name: 'Beans 🍲', days: '7 days', completed: 70 },
    { name: 'Eggplant 🍆', days: '10 days', completed: 90 },
    { name: 'Bread 🍞', days: '30 days', completed: 10 },
  ];

  const item = groceries.find(item => item.name === 'Milk 🥛');

  const handleValueChange = newValue => {
    setValue(newValue);
  };

  return (
    <View style={styles.container}>
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
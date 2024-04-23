import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
//import Slider from 'react-native-slider';
import * as Progress from "react-native-progress";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { endpoint } from "../utils/endpoint";
import { Ionicons , AntDesign} from "@expo/vector-icons";
import { DataContext } from "../App";

const GroceryItem = () => {
  // const context = useContext(DataContext)
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params; // Get the passed item data
  const [sliderValue, setSliderValue] = useState(item.completed);

  const updateBackend = async (newValue) => {
    const response = await fetch(endpoint + `fridge-items/${item.name}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ percentage_left: newValue }),
    });

    if (response.ok) {
      console.log("Update successful");
    } else {
      console.error("Failed to update");
    }
  };

  const handleValueChangeComplete = (newValue) => {
    setSliderValue(newValue);
    updateBackend(newValue);
  };

  // Custom Back Button component
  const BackButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("FridgeContent")}
        style={styles.backButton}
      >
        <AntDesign name="left" size={20} color={Color.blue} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <Text style={styles.headerText}>{item.name}</Text>

        <View style={[{flexDirection:"row"}]}>
      <Text style={[styles.text, styles.textLayout, {color:Color.blue}]}> Leftover Amount </Text>
      <Text style={[styles.textLayout, styles.sliderValueText]}>{`${sliderValue}%`}</Text>
      </View>
      <View style={styles.sliderLayout}>
        <Slider
          style={{ width: 300, height: 0 }}
          minimumValue={0}
          maximumValue={100}
          step={25}
          value={sliderValue}
          onValueChange={(newValue) => setSliderValue(newValue)}
          onSlidingComplete={handleValueChangeComplete}
          minimumTrackTintColor="#00a3ff"
          maximumTrackTintColor={Color.lightgray}
          thumbTintColor={Color.white}
        />
        
      </View>

      <View style={[{flexDirection:"row"}]}>
      <Text style={[styles.text, styles.textLayoutExpiration, {color:Color.orange}]}> Expiration Date </Text>
      <Text style={[styles.sliderValueText,styles.textLayoutExpiration]}>{`${item.days} left`}</Text>
      </View>
      {/* <View style={styles.sliderLayout}> */}
      <View style={styles.progressLayout}>
        <Progress.Bar progress={item.completed / 100} width={300} color={Color.orange} borderWidth={0} unfilledColor={Color.lightgray}/>
        {/* </View> */}
        {/* <Text>Value: {value}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "700",
    marginTop: 70,
    color: "black",
    textAlign: 'center',
    fontSize: 20,
  },
  sliderLayout: {
    justifyContent: "center",
    alignItems: "center",
    top: 40,
  },
  sliderValueText:{
    marginTop:1,
    color:Color.darkGray,
    marginLeft:5,
  },
  progressLayout: {
    justifyContent: "center",
    alignItems: "center",
    top: 80,
  },
  text: {
    fontFamily: FontFamily.futuraBold,
    fontSize: FontSize.size_mini,
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
    position: "absolute",
    top: 70, // Adjust top as necessary
    left: 20, // Adjust left as necessary
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
    backgroundColor: "#d0d0d0",
    width: 300,
  },
  thumb: {
    width: 10,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#eb6e1b",
  },
});

export default GroceryItem;

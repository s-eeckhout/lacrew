import React, { useState, useEffect, useContext } from "react";

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { endpoint } from "../utils/endpoint";
import { createStackNavigator } from "@react-navigation/stack";
// import FridgeContentScreen from "./FridgeContentScreen";
import GroceryItemScreen from "./GroceryItemScreen";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FridgeContentScreen"
        component={FridgeContentScreen}
      />
      <Stack.Screen name="GroceryItemScreen" component={GroceryItemScreen} />
    </Stack.Navigator>
  );
}

const BlueHeader = () => {
  return (
    <Image
      style={styles.BlueHeader}
      contentFit="cover"
      source={require("../assets/BlueHeader.svg")}
    />
  );
};

const TAGS = [
  { label: "All", selected: true },
  { label: "Vegetables", selected: false },
  { label: "Fruit", selected: false },
  { label: "Dairy", selected: false },
  { label: "Eggs", selected: false },
  { label: "Meat", selected: false },
  { label: "Fish", selected: false },
  { label: "Pasta/Rice", selected: false },
  { label: "Potatoes", selected: false },
  { label: "Bread", selected: false },
  { label: "Beverages", selected: false },
  { label: "Canned", selected: false },
  { label: "Frozen", selected: false },
  { label: "Herbs/Spices", selected: false },
  { label: "Others", selected: false },
];

const Tag = ({ label, selected, onPress }) => {
  const containerStyles = {
    borderWidth: selected ? 0 : 1, // Add border if not selected
    borderColor: selected ? "white" : "#7375c0", // Border color same as gradient color
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xl,
    height: 32,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  };

  const labelStyles = {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: selected ? "white" : "black", // Text color based on selected state
    textAlign: "left",
  };

  return (
    <>
      <Pressable onPress={onPress}>
        {selected ? (
          <LinearGradient
            style={[containerStyles]}
            locations={[0, 1]}
            colors={["#7375c0", "#00a3ff"]}
          >
            <Text style={labelStyles}>{label}</Text>
          </LinearGradient>
        ) : (
          <View style={[containerStyles]}>
            <Text style={labelStyles}>{label}</Text>
          </View>
        )}
      </Pressable>
    </>
  );
};

const GroceriesList = () => {
  const navigation = useNavigation(); // This line should be inside your component
  const [tags, setTags] = useState(TAGS);
  const [fridgeItems, setFridgeItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  // State to hold the slider value

  // Get today's date (with time set to 00:00:00 for accurate day difference calculation)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // Function to calculate days until expiration for an item
  function calculateDaysUntilExpiration(item) {
    const dayAdded = new Date(item.day_added);
    const expirationDate = new Date(dayAdded);
    expirationDate.setDate(dayAdded.getDate() + item.expiration_time);

    const differenceInTime = expirationDate.getTime() - today.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return Math.round(differenceInDays);
  }

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching");
      try {
        // Update the URL with your API's URL
        const response = await fetch(endpoint + "fridge-items");
        const json = await response.json();
        console.log("json ",json)
        setFridgeItems(json);
      } catch (error) {
        setError("Failed to fetch data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isFocused]);

  const handlePressItem = (item) => {
    const daysUntilExpiration = calculateDaysUntilExpiration(item);
    const formattedItem = {
      name: item.name,
      days: daysUntilExpiration + " days",
      completed: item.percentage_left,
    };

    console.log("Formatted ITEM ", formattedItem);
    navigation.navigate("GroceryItemScreen", { item: formattedItem });
  };

  // console.log(daysUntilExpirationArray)
  // 
  // Sort displayItems based on daysUntilExpirationArray
  // fridgeItems.sort((a, b) => {
  //   const indexA = fridgeItems.indexOf(a);
  //   const indexB = fridgeItems.indexOf(b);
  //   // console.log(a.name, indexA)
  //   return daysUntilExpirationArray[indexA] - daysUntilExpirationArray[indexB];});
  
  //   // console.log(sorted)
  //   daysUntilExpirationArray.sort();

  // Handle the pressing of tags
  const handleTagPress = (index) => {
    const updatedTags = tags.map((tag, i) => ({
      ...tag,
      selected: i === index ? !tag.selected : false,
    }));
    setTags(updatedTags);
  };
  // Function to get the filtered items based on selected tags
  const getFilteredItems = () => {
    const selectedTags = tags.filter((t) => t.selected).map((t) => t.label);
    if (selectedTags.includes("All")) {
      return fridgeItems;
      // .sort((a, b) => {return daysUntilExpirationArray[a.id-1] - daysUntilExpirationArray[b.id-1];});
    }
    return fridgeItems.filter((item) => selectedTags.includes(item.category)); 
    // .sort((a, b) => {return daysUntilExpirationArray[a.id-1] - daysUntilExpirationArray[b.id-1];});
  };
  // Get the filtered items to display
  const displayItems = getFilteredItems();

  // Map over each item, calculate the days until expiration, and store the result in a new array
  const daysUntilExpirationArray = displayItems 
    ? displayItems.map(calculateDaysUntilExpiration) 
    : [];
  
    // displayItems.sort((a, b) => { 
    //   const indexA = displayItems.indexOf(a);
    //   const indexB = displayItems.indexOf(b);
    //   return daysUntilExpirationArray[indexA] - daysUntilExpirationArray[indexB];});
    // // daysUntilExpirationArray.sort(function(a, b){return a - b});
    
    // console.log(fridgeItems.map(item => item.name).join(','));
    // console.log(displayItems.map(it => it.name).join(','));
    // console.log(daysUntilExpirationArray);

  return (
    <View style={styles.container}>
      <BlueHeader />
      <Text style={styles.headerText}>Fridge Content</Text>

      
        <View style={styles.tagsContainer}>
        <ScrollView horizontal>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag.label}
              selected={tag.selected}
              onPress={() => handleTagPress(index)}
            />
          ))}
          </ScrollView>
        </View>
      

      <ScrollView style={styles.fridgeItemsContainer}>
        {displayItems.map((item, index) => {
          const progress = item.percentage_left / 100;
          // console.log(`Progress for ${item.name}:`, progress);
          return (
            <Pressable key={index} onPress={() => handlePressItem(item)}>
              <View style={styles.item}>
                <View style={[{flexDirection: "row"}]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.daysLeft}>
                    {daysUntilExpirationArray[index] < 0
                    ? 'Expired'
                    : daysUntilExpirationArray[index] === 0
                    ? 'Expires Today!'
                    : daysUntilExpirationArray[index] === 1
                    ? `${daysUntilExpirationArray[index]} day left`
                    : daysUntilExpirationArray[index] > 30
                    ? '> month left'
                    : `${daysUntilExpirationArray[index]} days left`}
                </Text>
                </View>

                <View style={[{flexDirection: "row"}]}>
                  <View style={styles.progress}> 
                    <Progress.Bar progress={progress} width={310} color={Color.orange} borderWidth={0} unfilledColor={Color.lightgray}/>
                  </View>
                  <Text style={styles.percentageLeft}>{item.percentage_left + " %"}</Text>
                </View>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  BlueHeader: {
    marginTop: -50,
    height: 180,
    width: "100%",
    overflow: "hidden",
  },
  headerText: {
    padding: 20,
    fontWeight: "700",
    marginTop: -80,
    left: 20,
    color: "white",
    fontFamily: FontFamily.futuraMedium,
    fontSize: FontSize.size_3xl,
  },
  container: {
    flex: 1,
  },
  item: {
    top: 15,
    justifyContent: "space-between",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
  },
  itemName: {
    fontFamily: FontFamily.futuraMedium,
    fontSize: FontSize.calloutBold_size,
    marginBottom: 3,
  },
  daysLeft:{
    top:1,
    left:5,
    color: Color.gray,
  },
  percentageLeft:{
    top:-6,
    left:5,
    color: Color.darkOrange,
  },
  progress:{
    justifyContent: "space-between",
    height: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    top:140,
    position: "absolute",
  },
  fridgeItemsContainer: {
    top:60,
    marginBottom:90
  },
  label: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: Color.colorWhite,
    textAlign: "left",
  },
});

export default GroceriesList;

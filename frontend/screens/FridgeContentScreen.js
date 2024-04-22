import React, { useState, useEffect, useContext } from "react";

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import { endpoint } from "../utils/endpoint";
import { createStackNavigator } from "@react-navigation/stack";
import FridgeContentScreen from "./FridgeContentScreen";
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
      source={require("../assets/BlueHeader.png")}
    />
  );
};

const TAGS = [
  { label: "All", colors: ["#7375c0", "#00a3ff"], selected: true },
  { label: "Vegetables", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Fruit", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Dairy", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Meat", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Pasta", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Herbs & Spices", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Bread", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Alcohol", colors: ["#7375c0", "#00a3ff"], selected: false },
];

const Tag = ({ label, colors, selected, onPress }) => {
  const containerStyles = {
    borderWidth: selected ? 0 : 1, // Add border if not selected
    borderColor: selected ? "white" : colors[0], // Border color same as gradient color
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
            colors={colors}
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
  // State to hold the slider value

  const isFocused = useIsFocused();

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

  // Map over each item, calculate the days until expiration, and store the result in a new array
  const daysUntilExpirationArray = fridgeItems
    ? fridgeItems.map(calculateDaysUntilExpiration)
    : [];

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
    }
    return fridgeItems.filter((item) => selectedTags.includes(item.category));
  };
  // Get the filtered items to display
  const displayItems = getFilteredItems();

  return (
    <View style={styles.container}>
      <BlueHeader />
      <Text style={styles.headerText}>Fridge Content</Text>

      <ScrollView horizontal>
        <View style={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag.label}
              colors={tag.colors}
              selected={tag.selected}
              onPress={() => handleTagPress(index)}
            />
          ))}
        </View>
      </ScrollView>

      <ScrollView style={styles.fridgeItemsContainer}>
        {displayItems.map((item, index) => {
          const progress = item.percentage_left / 100;
          console.log(`Progress for ${item.name}:`, progress);
          return (
            <Pressable key={index} onPress={() => handlePressItem(item)}>
              <View style={styles.item}>
                <View style={[{flexDirection: "row"}]}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.daysLeft}> {daysUntilExpirationArray[index] + " days"} </Text>
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
    top:-80,
  },
  fridgeItemsContainer: {
    top:-180
  },
  label: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: Color.colorWhite,
    textAlign: "left",
  },
});

export default GroceriesList;

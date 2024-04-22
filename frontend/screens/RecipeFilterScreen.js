import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator , ScrollView , Pressable} from 'react-native';
import { DataContext } from '../App'; // Import the DataContext if you are using it
import {endpoint} from '../utils/endpoint'
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons , AntDesign} from "@expo/vector-icons";

const flags = {
  "Italy": "🇮🇹",
  "USA": "🇺🇸", 
  "Japan": "🇯🇵",
  "Spain": "🇪🇸",
  "Mexico": "🇲🇽",
  "Morocco": "🇲🇦",
  "India": "🇮🇳",
  "Hungary": "🇭🇺"
}


const TAGS = [
  { label: "All", selected: true },
  { label: "Easy", selected: false },
  { label: "Medium", selected: false },
  { label: "Difficult", selected: false }
];

const Tag = ({ label, selected, onPress , containerStyles , colors}) => {
  const labelStyles = {
    fontFamily: FontFamily.sfRegular,
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
            colors={[colors[0], colors[1]]}
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


const FilterList = ({ }) => {
  const route = useRoute();
  
  const [loading, setLoading] = useState(true);
  const {sortedfridgeItems} = route.params
  const [fridgeItems, setFridgeItems] = useState(sortedfridgeItems)
  
  const [tags, setTags] = useState(TAGS);

  const handleTagPress = (index , tags_ , set) => {
    const updatedTags = tags_.map((tag_, i) => ({
      ...tag_,
      selected: i === index ? !tag_.selected : tag_.selected,
      // selected: i === index ? true : false,
    }));
    console.log("pressed item", index);
    set(updatedTags);
  };


  const navigation = useNavigation();
  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };
  const BackButton = () => {
    return (
    // <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeList", { fridgeItems })}
        style={styles.backButton}>
        <AntDesign name="left" size={20} color={Color.blue} />
      </TouchableOpacity>
    //   </View>
    );
  };

  const [AllSelected, setAllSelected] = useState(false);
  const handleSelectAll = () => {
    console.log("pressed selected");
    setAllSelected(!AllSelected)
    const updatedItems = fridgeItems.map(item => ({ ...item, selected: AllSelected }));
    setFridgeItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <Text style={styles.headerText}>Select Filters</Text>
      

      <ScrollView>
      <Text style={styles.descriptionText}>Select the ingredients, cuisine, difficulty level and time that the recipe should have.</Text>

      <View style={[{ flexDirection: "row" }]}> 
      <Text style={styles.filterHeader}>Owned Groceries</Text>
      <TouchableOpacity onPress={handleSelectAll}>
          <Text style={styles.filterSelectAll}>SELECT ALL</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.filterContainer}>
        {fridgeItems // Sort groceries by expiration_time
          .map((item, i) => (
            <Tag
              key={i}
              label={item.name}
              selected={item.selected} 
              onPress={() => handleTagPress(i, Object.values(fridgeItems), setFridgeItems)} 
              containerStyles={[styles.filterIngredients]}
              colors={["darkorange", "darkorange"]}
            />
          ))}
        </View>

        <Text style={styles.filterHeader}>Difficulty Level</Text>
        <View style={styles.filterContainer}>
        {/* <ScrollView horizontal> */}
        
            {tags.map((tag, index) => (
            <Tag
                key={index}
                label={tag.label}
                selected={tag.selected}
                onPress={() => handleTagPress(index, tags, setTags)}
                containerStyles={[styles.filterDifficulty]}
                colors={["#7375c0", "#00a3ff"]}
            />
            ))}
            </View>

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
    marginTop: 40,
    textAlign: "center",
    // left: 20,
    // color: "white",
    fontFamily: FontFamily.futuraMedium,
    fontSize: FontSize.size_base,
  },
  descriptionText: {
    padding: 20,
    // fontWeight: "700",
    marginTop: -10,
    textAlign: "center",
    // left: 20,
    color: Color.gray,
    fontFamily: FontFamily.sfRegular,
    fontSize: FontSize.size_sm,

  },
  backButton: {
    width:20,
    height:20,
    top: 60, // Adjust top as necessary
    left: 25, // Adjust left as necessary
    position: "absolute",
    zIndex: 10, // Ensure button is clickable over other elements
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 5,
    marginRight: -10,
    left: 10
  },
  filterDifficulty: {
    borderWidth: 1, // Add border if not selected
    borderColor: "#7375c0", // Border color same as gradient color
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_5xs,
    height: 32,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  filterIngredients: {
    borderWidth: 1, // Add border if not selected
    borderColor: "darkorange", // Border color same as gradient color
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_lg,
    height: 32,
    marginBottom:10,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  filterHeader: {
    padding: 20,
    // fontWeight: "700",
    // marginTop: 10,
    textAlign: "left",
    // left: 20,
    fontFamily: FontFamily.sfRegular,
    fontSize: FontSize.size_base,
  },
  filterSelectAll: {
    padding: 20,
    // marginTop: 10,
    textAlign: "right",
    left: 120,
    color: Color.darkOrange,
    fontFamily: FontFamily.futuraCondensed,
    fontSize: FontSize.size_base,
  },
  recipeItemLayout: {
    flexDirection: 'row',
    // alignItems: 'left',
    // marginRight: -200,
    // width: 350,
  },
  iconContainer: {
    position: 'absolute',
    top: 60,
    left: 25,
  },
  iconSaved: {
    width:11,
    height:17,
    marginRight: 10,
  },
  tagLayout: {
    justifyContent: "center",
    width: 73,
    borderRadius: Border.br_xl,
    alignItems: "center",
    height: 26,
    position: "absolute",
  },
  whiteText: {
    fontFamily: FontFamily.sfRegular,
    fontSize: FontSize.size_sm,
    color: Color.white,
  },
  filterButton: {
    marginLeft:-65, 
    backgroundColor:Color.backgroundGray,
    width:23, 
    height:18, 
  },
  rectangle: {
    width: 80,
    height: 40,
    // position: "absolute",
    // marginTop:20,
    backgroundColor: Color.backgroundGray,
  },
});

export default FilterList;

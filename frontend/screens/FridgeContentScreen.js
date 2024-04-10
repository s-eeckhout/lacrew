import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import * as Progress from 'react-native-progress';
import { LinearGradient } from "expo-linear-gradient";

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
  { label: 'All', colors: ['#7375c0', '#00a3ff'], selected: true },
  { label: 'Vegetables', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Fruit', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Dairy', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Meat', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Pasta', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Herbs & Spices', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Bread', colors: ['#7375c0', '#00a3ff'], selected: false },
  { label: 'Alcohol', colors: ['#7375c0', '#00a3ff'], selected: false },
];

const Tag = ({ label, colors, selected, onPress }) => {
  const containerStyles = {
    backgroundColor: selected ? colors[0] : 'white',
    borderWidth: selected ? 0 : 1, // Add border if not selected
    borderColor: selected ? 'white' : colors[0], // Border color same as gradient color
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xl,
    height: 32,
    marginHorizontal: Padding.p_xs,
    flexDirection: "row",
    alignItems: "center",
  };

  const labelStyles = {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: selected ? 'white' : 'black', // Text color based on selected state
    textAlign: "left",
  };

  return (
    <>
    {/* <Pressable onPress={onPress}> */}
      {selected ? (
        <LinearGradient
          style={[containerStyles, styles.tagSpaceBlock]}
          locations={[0, 1]}
          colors={colors}
        >
          <Text style={labelStyles}>{label}</Text>
        </LinearGradient>
      ) : (
        <View style={[containerStyles, styles.tagSpaceBlock]}>
          <Text style={labelStyles}>{label}</Text>
        </View>
      )}
    {/* </Pressable> */}
    {/* // TODO: If I make it pressable (eg the item will toggle on or off, only meat appears in the middle?*/}
    </>
  );
};

const GroceriesList = () => {
  const [tags, setTags] = useState(TAGS);

  const handleTagPress = (index) => {
    const updatedTags = tags.map((tag, i) => ({
      ...tag,
      selected: i === index ? !tag.selected : false,
    }));
    setTags(updatedTags);
  };

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

  return (
    <View style={styles.container}>
      <BlueHeader />
      <Text style={styles.headerText}>Fridge Content</Text>
      
      <View style={styles.tagsContainer}>
      {/* <ScrollView horizontal > */}
        {tags.map((tag, index) => (
          <Tag
            key={index}
            label={tag.label}
            colors={tag.colors}
            selected={tag.selected}
            onPress={() => handleTagPress(index)}
          />
        ))}
        {/* </ScrollView> */}
      </View>
      {/* // TODO: If I do the scrollview, the tags all dissapear */}
      
      
      <ScrollView>
      {groceries.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Progress.Bar progress={item.completed / 100} width={200} />
          <Text style={styles.days}>{item.days}</Text>
        </View>
      ))}
      </ScrollView>

      <View style={styles.buttonsContainer}>
        {/* Buttons content */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // Header styles
  },
  BlueHeader: {
    top: -50, 
    height: 152,
    width: 390,
    overflow: "hidden",
  },
  headerText: {
    fontWeight: "700",
    // position: "absolute",
    top: -110, // Adjust this value as per your requirement
    left: 20, // Adjust this value as per your requirement
    color: "white",
    fontFamily: FontFamily.asapSemiBold,
    fontSize: FontSize.size_3xl,
  },
  vectorIcon: {
        top: -340,
        left: -111,
        width: 661,
        height: 459,
        position: "absolute",
      },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
    // padding: Padding.p_3xs,
  },
  item: {
    top: -2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_sm,
    shadowColor: Color.colorBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.calloutBold_size,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: Color.colorGainsboro,
    borderRadius: Border.br_45xl,
    marginRight: 8,
  },
  days: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_sm,
    color: Color.labelColorLightPrimary,
  },
  progressIndicator: {
    width: 20, // Adjust width as needed
    height: 20, // Adjust height as needed
    backgroundColor: Color.colorDarkorange,
    borderRadius: Border.br_45xl,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  tagSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xl,
    height: 32,
    marginTop: -100,
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
        backgroundColor: Color.gradient,
      },
  // Additional styles for tags and buttons can be added here
    label: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: Color.colorWhite,
    textAlign: "left",
  }
});

export default GroceriesList;


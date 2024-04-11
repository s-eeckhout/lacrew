import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { Image } from "expo-image";
import * as Progress from "react-native-progress";
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
  { label: "All", colors: ["#7375c0", "#00a3ff"], selected: true },
  { label: "Vegetables", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Fruit", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Dairy", colors: ["#7375c0", "#00a3ff"], selected: true },
  { label: "Meat", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Pasta", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Herbs & Spices", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Bread", colors: ["#7375c0", "#00a3ff"], selected: false },
  { label: "Alcohol", colors: ["#7375c0", "#00a3ff"], selected: false },
];

const Tag = ({ label, colors, selected, onPress }) => {
  const containerStyles = {
    // backgroundColor: selected ? colors[0] : 'white',
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
      {/* // TODO: Make toggle on/off for 'selected' that it only shows those categories*/}
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
    { name: "Salad 🥗", days: "02 days", completed: 20 },
    { name: "Milk 🥛", days: "04 days", completed: 40 },
    { name: "Carrot 🥕", days: "05 days", completed: 60 },
    { name: "Avocado 🥑", days: "7 days", completed: 80 },
    { name: "Corn 🌽", days: "7 days", completed: 30 },
    { name: "Bacon 🥓", days: "7 days", completed: 50 },
    { name: "Beans 🍲", days: "7 days", completed: 70 },
    { name: "Eggplant 🍆", days: "10 days", completed: 90 },
    { name: "Bread 🍞", days: "30 days", completed: 10 },
  ];

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

      <ScrollView>
        {groceries.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Progress.Bar progress={item.completed / 100} width={200} />
            <Text style={styles.days}>{item.days}</Text>
          </View>
        ))}
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
    fontFamily: FontFamily.asapSemiBold,
    fontSize: FontSize.size_3xl,
  },
  container: {
    flex: 1,
  },
  item: {
    top: -2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_3xs,
  },
  itemName: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.calloutBold_size,
  },
  days: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_sm,
    color: Color.labelColorLightPrimary,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: -25,
  },
  label: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: Color.colorWhite,
    textAlign: "left",
  },
});

export default GroceriesList;

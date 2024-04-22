//import * as React from "react";
import React, { useState, useEffect } from 'react';
import { Image } from "expo-image";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import { DataContext } from "../App"; // Import the DataContext if you are using it
import { endpoint } from "../utils/endpoint";
import * as Progress from "react-native-progress";

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

const GroceriesList = () => {
  const [fridgeItems, setFridgeItems] = useState([])
  
  //Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL with your API's URL
        const response = await fetch(endpoint+"fridge-items");
        const json = await response.json();
        setFridgeItems(json);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //Calculate the days till expiration
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

    const sortedfridgeItems = Object.values(fridgeItems).sort((a, b) => a.expiration_time - b.expiration_time)
    
    // Map over each item, calculate the days until expiration, and store the result in a new array
    const daysUntilExpirationArray = sortedfridgeItems ? sortedfridgeItems.map(calculateDaysUntilExpiration) : [];

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}
        {sortedfridgeItems.map((item, index) => (
          <View key={index} style={styles.item}>
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
            <Progress.Bar
              progress={item.percentage_left / 100}
              width={303}
              color={Color.orange}
              borderWidth={0}
              unfilledColor={Color.lightgray}
            />
            </View>
            <Text style={styles.percentageLeft}>{item.percentage_left + " %"}</Text>
            </View>
          </View>
        ))}
      {/* </ScrollView> */}
    </View>
  );
};

const recipeImages = {
  Pasta: require("../assets/imgs/Pasta.jpg"),
  Burger: require("../assets/imgs/Burger.jpg"),
  Sushi: require("../assets/imgs/Sushi.jpg"),
  Paella: require("../assets/imgs/Paella.jpg"),
  Couscous: require("../assets/imgs/Couscous.jpg"),
  Curry: require("../assets/imgs/Curry.jpg"),
  Ramen: require("../assets/imgs/Ramen.jpg"),
  Pancakes: require("../assets/imgs/Pancakes.jpg"),
  Tacos: require("../assets/imgs/Tacos.jpg"),
  Goulash: require("../assets/imgs/Goulash.jpg"),
};

const Recipe = ({ recipe }) => {
  const navigation = useNavigation();

  const handleRecipePress = () => {
    // console.log('Recipe clicked:', recipe.recipe_name);
    navigation.navigate('RecipeDetails', { recipe });
  };
  const imageSource = recipeImages[recipe.recipe_name];

  switch (recipe.level) {
    case 'easy':
      difficultyColor = Color.green; // Green
      break;
    case 'medium':
      difficultyColor = Color.darkOrange; // Dark orange
      break;
    case 'hard':
      difficultyColor = Color.red; // Red
      break;
  }

  return (
    <TouchableOpacity onPress={handleRecipePress}>
    <View>
      <Image
        style={styles.highlightRecipe1}
        contentFit="cover"
        //get image by recipe name in folder ../assets/recipe_images
        source={imageSource}
      />  
      <Image
        style={styles.unionIcon}
        contentFit="cover"
        source={require("../assets/union.png")}
      />
      <View style={[styles.tagsPosition]}>
        <View style={[styles.tagLayout, styles.recipeTagRed]}>
          <Text style={[styles.whiteText]}>{recipe.from}</Text>
        </View>

        <View style={[styles.tagLayout, styles.recipeTagGreen, , { backgroundColor: difficultyColor }]}>
          <Text style={[styles.whiteText]}>{recipe.level}</Text>
        </View>
      </View>
      <View style={[styles.content, styles.contentSpaceBlock]}>
        <View style={[{flexDirection: "row"}]}> 
        <Text style={[styles.titleRecipe, styles.titleTypo]}> {recipe.recipe_name} </Text>
        <Text style={styles.recipeFlag}> {flags[recipe.from]} </Text>
        </View>

      </View>
      <View style={[styles.RecipeRow1]}>
        <Text style={[styles.recipeDuration]}>{recipe.time+" mins"}</Text>
        <View style={[styles.recipeTagDays, styles.tagLayout]}>
          <Text style={[styles.whiteText]}>{recipe.recipe_id +" days"}</Text>
        </View>
      </View>
      <View style={[styles.ingredients, styles.ingredientsPosition]}>
        {recipe.ingredients.map((ingredient, index) => (
          <Image
            key={index}
            style={styles.iconLayout}
            contentFit="cover"
            source={ingredient}
          />
        ))}
      </View>
    </View>
    </TouchableOpacity>
  );
};

const Home = () => {
  const navigation = useNavigation();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch recipes that include 'carrot' in their ingredients
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(endpoint+"recipes/ingredient/tomato");
        const data = await response.json();
        // Convert the recipes object into an array
        const recipesArray = Object.values(data);
        setRecipes(recipesArray);
        console.log(recipesArray);
      } catch (error) {
        setError('Failed to fetch recipes.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handlePress = (screenName) => {
    // Navigate to the screen you want
    navigation.navigate(screenName);
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Image
        style={[styles.OrangeHeader, styles.HeaderPosition]}
        contentFit="cover"
        source={require("../assets/OrangeHeader.svg")}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.headerText}>
          Did you eat something {"\n"}lately?
        </Text>
        <TouchableOpacity onPress={() => handlePress("FridgeContent")}>
          <Image
            style={styles.iconBlue}
            contentFit="cover"
            source={require("../assets/blueIcon.svg")}
          />
          <Image
            style={styles.iconEdit}
            contentFit="cover"
            source={require("../assets/edit.svg")}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.titleParent, styles.contentSpaceBlock]}>
        <Text style={styles.expiringSoon}>Expiring Soon</Text>
        <GroceriesList />
      </View>

      {/* RECIPE IDEAS */}
      <Image
        style={[styles.BlueHeader, styles.BlueHeaderLayout]}
        contentFit="cover"
        source={require("../assets/BlueMiddle.png")}
      />
      <View style={[styles.titleGroup, styles.contentSpaceBlock]}>
        <Text style={[styles.titleRecipesIdeas]}>
          Recipes with Tomato{" "}
          {/* // TODO Change for top of stack of FridgeItems */}
        </Text>
        <TouchableOpacity onPress={() => handlePress("FridgeContent")}>
          <Image
            style={styles.arrowsarrowRightIcon}
            contentFit="cover"
            source={require("../assets/arrowsarrowright.png")}
          />
        </TouchableOpacity>
      </View>

      {/* RECIPE IDEAS CONTENT */}
      <ScrollView horizontal>
        {/* <View style={[styles.RecipessParent, styles.HeadersPosition]}> */}
        <View style={[styles.container, styles.RecipesParent]}>
          {recipes.map((recipe, index) => (
            <Recipe key={index} recipe={recipe} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderPosition: {
    left: 0,
    position: "absolute",
  },
  contentSpaceBlock: {
    paddingHorizontal: Padding.p_3xs,
    left: 0,
  },
  titleRecipesIdeas: {
    fontFamily: FontFamily.futuraBold,
    fontWeight: "700",
    color: Color.white,
    textAlign: "left",
    width: 305,
    fontSize: FontSize.size_lg,
  },
  BlueHeaderLayout: {
    height: 258,
    position: "absolute",
  },
  contentSpaceBlock: {
    paddingVertical: 0,
    position: "absolute",
  },
  tagsPosition: {
    left: 10,
    top:-5,
    position: "absolute",
    zIndex: 3,
  },
  whiteText: {
    fontFamily: FontFamily.futuraMedium,
    color: Color.white,
    fontWeight: "500",
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    justifyContent: "center",
    // top: 173,
    // left: 5,
    zIndex: 4,
  },
  recipeFlag:{
      // marginBottom: -2,
      // left: 5
      marginLeft:-35,
      // marginTop:-18,
  },
  titleTypo: {
    width: 194,
    color: Color.white,
    fontFamily: FontFamily.futuraBold,
    fontWeight: "700",
    textAlign: "left",
  },
  ingredientsPosition: {
    zIndex: 1,
    alignItems: "center",
  },
  tagRedLayout: {
    padding: Padding.p_xs,
    borderRadius: Border.br_9xl,
    height: 17,
    // justifyContent: "center",
  },
  recipeTagRed: {
    width: 73,
    // padding: Padding.p_xs,
    borderRadius: Border.br_xl,
    alignItems: "center",
    left: 0,
    borderStyle: "solid",
    borderColor: Color.white,
    borderWidth: 1,
    alignItems: "center",
    height: 26,
    position: "absolute",
    top: 168,
    zIndex: 2,
  },
  label: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_xs,
    color: Color.white,
    textAlign: "center",
    top: 6,
  },
  recipeTagGreen: {
    left: 83,
    // backgroundColor: Color.colorLimegreen,
    width: 54,
    alignItems: "center",
    top: 168,
    position: "absolute",
    height: 26,
  },
  tagLayout: {
    width: 54,
    // padding: Padding.p_xs,
    borderRadius: Border.br_9xl,
    height: 17,
    justifyContent: "center",
    zIndex: 4,
  },
  iconLayout: {
    width: 17,
    height: 17,
    marginLeft: 8,
  },
  OrangeHeader: {
    height: 170,
    width: "100%",
    top: 0,
    overflow: "hidden",
  },
  expiringSoon: {
    fontWeight: "600",
    fontFamily: FontFamily.futuraMedium,
    color: Color.blue,
    width: 346,
    height: 23,
    textAlign: "left",
    fontSize: FontSize.size_lg,
  },
  headerText: {
    // fontWeight: "00",
    // position: "absolute",
    top: 45, // Adjust this value as per your requirement
    left: 10, // Adjust this value as per your requirement
    color: "white",
    fontFamily: FontFamily.futuraMedium,
    fontSize: FontSize.size_3xl,
  },
  icon: {
    width: 29,
    height: 28,
    display: "none",
  },
  titleParent: {
    top: 168,
    paddingBottom: Padding.p_3xs,
    alignItems: "center",
    height: 258,
    position: "absolute",
    width: 390,
    overflow: "hidden",
  },
  BlueHeader: {
    top: 450,
    left: -51,
    width: 541,
  },
  arrowsarrowRightIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    overflow: "hidden",
  },
  titleGroup: {
    top: 475,
    paddingHorizontal: 25,
    left: "50%",
    marginLeft: -195,
    width: 390,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  highlightRecipe1: {
    width: 209,
    height: 126,
    // zIndex: 0,
    borderRadius: Border.br_xl,
  },
  unionIcon: {
    height: 107,
    width: 208,
    zIndex: 1,
    top: -35,
    borderRadius: Border.br_xl,
  },
  titleRecipe: {
    fontSize: FontSize.size_xl,
  },
  content: {
    top: 103,
    zIndex: 3,
    width: 208,
    paddingHorizontal: Padding.p_3xs,
    left: 0,
  },
  recipeDuration: {
    fontStyle: "italic",
    fontFamily: FontFamily.asapItalic,
    width: 132,
    color: Color.white,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  recipeTagDays: {
    borderStyle: "solid",
    borderColor: Color.white,
    borderWidth: 1,
    left:-10,
    alignItems: "center",
  },
  RecipeRow1: {
    top: 130,
    justifyContent: "space-between",
    width: 208,
    paddingVertical: 0,
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: Padding.p_3xs,
    left: 6,
    zIndex: 1,
    alignItems: "center",
  },
  iconEdit: {
    top: -44,
    width: 20,
    height: 20,
    marginLeft: 304,
  },
  iconBlue: {
    top: -8,
    width: 50,
    height: 51,
    marginLeft: 290,
  },
  ingredients: {
    top: 148,
    width: 87,
    left: 10,
    position: "absolute",
    flexDirection: "row",
  },
  RecipesParent: {
    // top: 451,
    marginTop: 335,
    padding: Padding.p_3xs,
    flexDirection: "row",
    gap: 10,
    // width: 390,
    // left: 0,
    // zIndex: 0
    // position: "absolute",
  },
  container: {
    flex: 1,
    // zIndex:0
    // backgroundColor: Color.colorWhite,
    // padding: Padding.p_3xs,
  },
  item: {
    padding: Padding.p_xs,
    marginTop: 6,
    justifyContent: "space-between",
    // marginLeft:-103,
    marginBottom: 10,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_base,
    paddingHorizontal: Padding.p_base,
    paddingVertical: Padding.p_sm,
  },
  itemContent: {
    flex: 1,
  },
  progress:{
    // flexDirection: "row",
    justifyContent: "space-between",
    height: 8,
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
  itemName: {
    fontFamily: FontFamily.futuraMedium,
    fontSize: FontSize.calloutBold_size,
    marginBottom: 3,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  tagSpaceBlock: {
    paddingVertical: 0,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xl,
    height: 32,
    // marginTop: -100,
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    backgroundColor: Color.gradient,
  },
  // Additional styles for tags and buttons can be added here
});

export default Home;

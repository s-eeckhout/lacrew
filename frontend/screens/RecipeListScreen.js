import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator , ScrollView , Pressable} from 'react-native';
import { DataContext } from '../App'; // Import the DataContext if you are using it
import {endpoint} from '../utils/endpoint'
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

const recipes = {
  "recipe_1": {
    "recipe_id": 1,
    "recipe_name": "Fall Veloutè",
    "recipe_description": "Indulge in the creamy, comforting warmth of Fall Velouté soup",
    "level": "Medium",
    "from": "Italy",
    "ingredients": [
      "butternut squash",
      "sweet potato",
      "celery",
      "carrot",
      "onion",
      "leek",
      "garlic",
      "vegetable broth",
      "cream",
      "nutmeg",
      "thyme",
      "bay leaf"
    ],
    "preparation": "",
    "image": require("../assets/fall_veloute.png"),
    "time": 105,
    "saved": false
  },
  "recipe_2": {
    "recipe_id": 2,
    "recipe_name": "Bún Chả",
    "recipe_description": "Savor the grilled pork and herb-infused delight of this Vietnamese delight",
    "level": "Easy",
    "from": "Vietnam",
    "ingredients": [
      "grilled pork",
      "rice vermicelli",
      "lettuce",
      "fresh herbs",
      "salad",
      "carrot",
      "fish sauce",
      "sugar",
      "lime juice",
      "garlic",
      "chili"
    ],
    "preparation": "",
    "image": require("../assets/bun_cha.png"),
    "time": 35,
    "saved": true
  }
};

const GROCERIES = [
  { 
      "id": 1,
      "name": "Salad",
      "day_added": "2024-04-11",
      "expiration_time": 2,
      "quantity": 1,
      "category": "",
      "link": "",
      "percentage_left": 20,
      "selected": false
  },
  { 
      "id": 2,
      "name": "Milk",
      "day_added": "2024-04-11",
      "expiration_time": 4,
      "quantity": 1,
      "category": "",
      "link": "",
      "percentage_left": 40,
      "selected": false
  },
  { 
      "id": 3,
      "name": "Carrot",
      "day_added": "2024-04-11",
      "expiration_time": 5,
      "quantity": 1,
      "category": "",
      "link": "",
      "percentage_left": 60,
      "selected": true
  },
  { 
      "id": 4,
      "name": "Avocado",
      "day_added": "2024-04-11",
      "expiration_time": 7,
      "quantity": 1,
      "category": "",
      "link": "",
      "percentage_left": 80,
      "selected": false
  }
];


const BlueHeader = () => {
  return (
    <Image
      style={styles.BlueHeader}
      contentFit="cover"
      source={require("../assets/BlueHeader.png")}
    />
  );
};


const RecipeItem = ({ recipe, lastItem }) => {
  // Count the total number of ingredients
  const totalIngredients = recipe.ingredients.length;
  

  // Count the number of matching ingredients from groceries
  const matchingIngredients = recipe.ingredients.filter(ingredient =>
    GROCERIES.some(item => item.name.toLowerCase() === ingredient.toLowerCase())
  ).length;

  let difficultyColor = '';

  switch (recipe.level) {
    case 'Easy':
      difficultyColor = '#34C759'; // Green
      break;
    case 'Medium':
      difficultyColor = 'darkorange'; // Dark orange
      break;
    case 'Difficult':
      difficultyColor = 'red'; // Red
      break;
    default:
      difficultyColor = '#34C759'; // Green (default to Easy)
  }

  return (
    <View style={[styles.recipeItemLayout]}>
      <Image style={styles.recipeImage} source={recipe.image} />
      <View>
        <View style={styles.recipeNameAndDuration}>
          <Text style={styles.recipeName}>{recipe.recipe_name}</Text>
          <Text style={styles.recipeDuration}>{recipe.time} min</Text>
        </View>

        <Text style={styles.recipeDescription}>{recipe.recipe_description}</Text>
        
        <ScrollView horizontal>
          <View>
            <View style={[styles.tagLayout, { backgroundColor: difficultyColor }]}>
              <Text>{recipe.level}</Text>
            </View>
            <View style={[styles.tagLayout, styles.recipeTagIngredients]}>
              <Text style={[styles.whiteText]}>{`${matchingIngredients}/${totalIngredients}`}</Text>
            </View>
          </View>
        </ScrollView>
        
      </View>
    </View>
  );
};

const TAGS = [
  { label: "All", selected: true },
  { label: "Easy", selected: false },
  { label: "Medium", selected: false },
  { label: "Difficult", selected: false }
];

const Tag = ({ label, selected, onPress , containerStyles , colors}) => {
  const { color1 } = containerStyles;
  const { color2 } = containerStyles;
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
      {/* // TODO: Make toggle on/off for 'selected' that it only shows those categories*/}
    </>
  );
};


const RecipeList = ({  }) => {
  // Use DataContext if you are passing the API data through context
  // const data = useContext(DataContext);

  // Local state for API data if you're fetching it in the component
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL with your API's URL
        const response = await fetch(endpoint);
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error(error);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [tags, setTags] = useState(TAGS);
  const [groceries, selectGroceries] = useState(GROCERIES);
  const handleTagPress = (index , tags_ , set) => {
    const updatedTags = tags_.map((tag_, i) => ({
      ...tag_,
      selected: i === index ? !tag_.selected : tag_.selected,
      // selected: i === index ? true : false,
    }));
    set(updatedTags);
  };

  const navigation = useNavigation();
  const handlePress = (screenName) => {
    navigation.navigate(screenName);
  };

  const [SAVED, setSAVED] = useState(false);
  const savedPress = () => {
    setSAVED(!SAVED); // Toggle the SAVED state
  };

  return (
    // <View style={styles.container}>
    //   {loading ? (
    //     <ActivityIndicator size="large" color="#0000ff" />
    //   ) : error ? (
    //     <Text>{error}</Text>
    //   ) : (
    //     // Render your screen's content with the fetched data
    //     // <Text style={styles.text}>{data.message ? data.message : 'No data fetched'}</Text>
    //   )}
    // </View>

    <View style={styles.container}>
      <BlueHeader />
      <Text style={styles.headerText}>Recipes</Text>

      <View style={styles.iconContainer}>
        <Pressable onPress={savedPress}>
          {SAVED ? (<Image style={[styles.iconSaved]} contentFit="cover" source={require("../assets/iconSaved.png")} />) 
          : (<Image style={[styles.iconToSave]} contentFit="cover" source={require("../assets/iconToSave.png")} />
          )}
        </Pressable>

        <TouchableOpacity onPress={() => handlePress( )}>
          <Image style={styles.iconBullet} contentFit="cover" source={require('../assets/iconBulletCircleFill.png')} />
        </TouchableOpacity>
        {/* // TODO: If we want the tinder thing do it here */}
      </View>

      <ScrollView horizontal>
        <View style={styles.filterContainer}>
          {tags.map((tag, index) => (
            <Tag
              key={index}
              label={tag.label}
              selected={tag.selected}
              onPress={() => handleTagPress(index, tags, setTags)}
              containerStyles={[styles.filterDifficulty]}
              colors = {["#7375c0", "#00a3ff"]}
            />
          ))}

          {Object.values(groceries).map((item, i) => (
              <Tag key={i} label={item.name} selected={item.selected} 
              onPress={() => handleTagPress(i, Object.values(groceries), selectGroceries)} 
              containerStyles={[styles.filterIngredients]}
              colors = {["darkorange", "darkorange"]}
            />
          ))}
        </View>
      </ScrollView>

      <ScrollView>
        <View style={styles.recipesContainer}> 
          {Object.values(recipes)
            .filter(recipe => {
              if (SAVED && !recipe.saved) {
                return false; // Filter out recipes if SAVED is true and recipe.saved is false
              }
              if (tags.some(tag => tag.selected && tag.label !== 'All')) {
                // If any tag other than 'All' is selected, filter recipes based on the selected tag
                return tags.some(tag => tag.selected && recipe.level === tag.label);
              } else if (groceries.some(ingredient => ingredient.selected)) {
                // If any ingredient is selected, filter recipes based on selected ingredients
                const selectedIngredients = groceries
                  .filter(ingredient => ingredient.selected)
                  .map(ingredient => ingredient.name.toLowerCase());
                return selectedIngredients.every(selectedIngredient =>
                  recipe.ingredients.some(recipeIngredient =>
                    recipeIngredient.toLowerCase() === selectedIngredient
                  )
                );
              } else {
                return true; // Show all recipes if 'All' is selected or no tag or ingredient is selected
              }
            })
            .map((recipe, index) => (
              <View style={styles.recipeContainer} key={index}>
                <RecipeItem recipe={recipe} lastItem={index === Object.values(recipes).length - 1} />
              </View>
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
    marginTop: -80,
    left: 20,
    color: "white",
    fontFamily: FontFamily.asapSemiBold,
    fontSize: FontSize.size_3xl,
  },
  container: {
    // flex: 1,
    backgroundColor: Color.colorWhite
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    // marginBottom: -25,
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
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeItemLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 80,
  },
  recipeContainer: {
    marginTop: 5,
    width: 350,
    left:20,
    backgroundColor: 'white',
    borderRadius: Border.br_xl,
  },
  recipeNameAndDuration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    marginTop: 5
  },
  recipesContainer: {
    marginTop: 5
  },
  recipeImage: {
    borderRadius: Border.br_xl,
    width: 60,
    height: 100,
    marginRight: 10,
  },
  recipeName: {
    fontFamily: FontFamily.asapSemiBold,
    fontSize: FontSize.size_lg,
    color: Color.colorDarkslategray,
  },
  recipeDuration: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    marginBottom: -2,
    left: 5
  },
  recipeDescription: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    marginBottom: 5,
  },
  tagLayout: {
    justifyContent: "center",
    width: 73,
    borderRadius: Border.br_xl,
    alignItems: "center",
    height: 26,
    position: "absolute",
    // marginTop: 50,
  },
  daysTag: {
    backgroundColor: 'blue',
    color: Color.trueWhite,
  },
  recipeTagIngredients: {
    width: 73,
    backgroundColor: Color.trueWhite,
    left: 80,
    borderColor: 'red',
    borderWidth: 1,
  },
  recipeTagDifficulty: {
    left: 0,
    backgroundColor: "#34C759",
    width: 54,
  },
  iconContainer: {
    position: 'absolute',
    top: 70,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSaved: {
    width:11,
    height:17,
    marginRight: 10,
  },
  iconToSave: {
    width:20,
    height:20,
    marginRight: 5,
  },
  iconBullet: {
    width: 30,
    height: 30,
  },
});

export default RecipeList;

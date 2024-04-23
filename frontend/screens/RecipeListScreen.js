import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator , ScrollView , Pressable} from 'react-native';
import { DataContext } from '../App'; // Import the DataContext if you are using it
import {endpoint} from '../utils/endpoint'
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";

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

const Difficulties = [
  { label: "All", color: Color.darkGray, selected: true },
  { label: "Easy", color: Color.green, selected: false },
  { label: "Medium", color: Color.yellow, selected: false },
  { label: "Difficult", color: Color.red, selected: false }
];

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

const BlueHeader = () => {
  return (
    <Image
      style={styles.BlueHeader}
      contentFit="cover"
      source={require("../assets/BlueHeader.svg")}
    />
  );
};

const Tag = ({ label, filled, onPress , containerStyles , colors}) => {
  const labelStyles = {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_mini,
    color: filled ? "white" : "black", // Text color based on selected state
    textAlign: "left",
    top:1,
  };

  return (
    <>
      <Pressable onPress={onPress}>
        {filled ? (
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

const RecipeItem = ({ recipe , fridgeItems}) => {
  // Count the total number of ingredients
  const totalIngredients = recipe.ingredients.length;
  const imageSource = recipeImages[recipe.recipe_name];
  const navigation = useNavigation();
  const handleRecipePress = () => {
    navigation.navigate('RecipeDetails', { recipe });
  };

  // Count the number of matching ingredients from groceries
  const matchingIngredients = recipe.ingredients.filter(ingredient =>
    fridgeItems.some(item => item.name.toLowerCase() === ingredient.toLowerCase())
  ).length;

  return (
    <TouchableOpacity onPress={handleRecipePress}>
    <View style={[styles.recipeItemLayout]}>
      <Image style={styles.recipeImage} source={imageSource} />
      <View>
        <View style={styles.recipeNameAndDuration}>
          <Text style={styles.recipeName}>{recipe.recipe_name}</Text>
          <Text style={styles.recipeDuration}>{recipe.time} min</Text>
          
        </View>
        <Text style={styles.recipeFlag}> {flags[recipe.from]} </Text>

        <Text style={styles.recipeDescription}>{recipe.recipe_description}</Text>
        
        {/* <ScrollView horizontal> */}
          <View style={[{flexDirection: "row"}]}>
            <View style={[styles.tagLayout, { backgroundColor: Difficulties.find(difficulty => difficulty.label === recipe.level).color }]}>
              <Text style={[styles.whiteText]}>{recipe.level}</Text>
            </View>
            <View style={[styles.tagLayout, styles.recipeTagIngredients]}>
              {/* <Text style={[styles.whiteText, {color: 'black'}]}>{`${matchingIngredients}/${totalIngredients}`}</Text> */}
              <Tag
                key={1}
                label={`${matchingIngredients}/${totalIngredients}`}
                filled={true}
                onPress={null}
                containerStyles={[styles.recipeTagIngredients, {borderColor: Color.linearGradient1, borderWidth:1}]}
                colors={[Color.linearGradient1, Color.linearGradient2]}
              />
            </View>
          </View>
        {/* </ScrollView> */}
        
      </View>
    </View>
    </TouchableOpacity>
  );
};






const RecipeList = ({  }) => {
  const route = useRoute();
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL with your API's URL
        const response = await fetch(endpoint+"recipes");
        const json = await response.json();
        setRecipes(json);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const [fridgeItems_, setFridgeItems] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Update the URL with your API's URL
        const response = await fetch(endpoint+"fridge-items");
        const json = await response.json();

        // Add 'selected' property to each fridge item and set it to false
        const fridgeItemsWithSelected = json.map(item => ({
          ...item,
          selected: false
        }));

        const sortedfridgeItemsWithSelected = Object.values(fridgeItemsWithSelected).sort((a, b) => a.expiration_time - b.expiration_time)

        setFridgeItems(sortedfridgeItemsWithSelected);
      } catch (error) {
        setError('Failed to fetch data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    console.log("Route params:", route.params); // Log route params

    if (route.params?.fridgeItems) {
      setFridgeItems(route.params.fridgeItems);
      console.log("set items from back button")
      console.log("newfridge!", fridgeItems_)
    } else {
      console.log("fetching items")
      fetchData();
    }
  }, [route.params?.fridgeItems]);
  

  const [difficulties, setDifficulties] = useState(Difficulties);
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

  // const sortedfridgeItems = Object.values(fridgeItems_).sort((a, b) => a.expiration_time - b.expiration_time)
  // setFridgeItems(sortedfridgeItems)

  return (
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
        
          <Image style={styles.iconBullet} contentFit="cover" source={require('../assets/iconBulletCircleFill.svg')} />
        </TouchableOpacity>
        {/* // TODO: If we want the tinder thing do it here */}
      </View>

      {/* <Filters tags={tags} sortedfridgeItems={sortedfridgeItems} handleTagPress={handleTagPress}/> */}
      <View style={styles.filterContainer}>
      <ScrollView horizontal>
      
        {difficulties.map((tag, index) => (
          <Tag
            key={index}
            label={tag.label}
            filled={tag.selected}
            onPress={() => handleTagPress(index, difficulties, setDifficulties)}
            containerStyles={[styles.filterDifficulty, {borderColor: tag.color}]}
            colors={[tag.color, tag.color]}
          />
        ))}
        
        {fridgeItems_ // Sort groceries by expiration_time
          .map((item, i) => (
            <Tag
              key={i}
              label={item.name}
              filled={item.selected} 
              onPress={() => handleTagPress(i, Object.values(fridgeItems_), setFridgeItems)} 
              containerStyles={[styles.filterIngredients, {borderColor: Color.linearGradient1}]}
              colors={[Color.linearGradient1, Color.linearGradient2]}
            />
          ))}
      
      </ScrollView>
      
      <View style={styles.rectangle} />
      <TouchableOpacity onPress={() => navigation.navigate('RecipeFilterScreen', { sortedfridgeItems: fridgeItems_ })}>
          <Image style={styles.filterButton} contentFit="cover" source={require('../assets/iconFilter.svg')} />
      </TouchableOpacity>
      </View>
      

      <ScrollView>
        <View style={styles.recipesContainer}> 
          {Object.values(recipes)
            .filter(recipe => {
              if (SAVED && !recipe.saved) {
                return false; // Filter out recipes if SAVED is true and recipe.saved is false
              }
              if (difficulties.some(tag => tag.selected && tag.label !== 'All')) {
                // If any tag other than 'All' is selected, filter recipes based on the selected tag
                return difficulties.some(tag => tag.selected && recipe.level === tag.label);
              } else if (fridgeItems_.some(ingredient => ingredient.selected)) {
                // If any ingredient is selected, filter recipes based on selected ingredients
                const selectedIngredients = fridgeItems_
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
                <RecipeItem recipe={recipe} fridgeItems = {fridgeItems_}/>
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
    fontFamily: FontFamily.futuraMedium,
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
    marginBottom: 5,
    marginRight: -10,
    left: 10
  },
  filterDifficulty: {
    borderWidth: 1, // Add border if not selected
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_5xs,
    height: 32,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  filterIngredients: {
    borderWidth: 1, // Add border if not selected
    // borderColor: "darkorange", // Border color same as gradient color
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_lg,
    height: 32,
    marginHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  recipeItemLayout: {
    flexDirection: 'row',
    // alignItems: 'left',
    // marginRight: -200,
    // width: 350,
  },
  recipeContainer: {
    marginTop: 5,
    // alignItems: "center",
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
    marginTop: 20,
    // marginBottom: -50,
  },
  recipeImage: {
    borderRadius: Border.br_xl,
    width: 60,
    height: 100,
    marginRight: 10,
  },
  recipeName: {
    fontFamily: FontFamily.futuraMedium,
    fontSize: FontSize.size_lg,
    color: Color.colorDarkslategray,
  },
  recipeDuration: {
    fontFamily: FontFamily.sfRegular,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    marginBottom: -2,
    left: 5
  },
  recipeFlag: {
    marginLeft:230,
    marginTop:-18,
  },
  recipeDescription: {
    fontFamily: FontFamily.sfRegular,
    fontSize: FontSize.size_sm,
    color: Color.gray,
    marginTop:2,
    marginBottom: 15,
    marginRight: 70
  },
  tagLayout: {
    justifyContent: "center",
    marginTop:-10,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_5xs,
    alignItems: "center",
    height: 21,
  },
  whiteText: {
    fontFamily: FontFamily.sfRegular,
    fontSize: FontSize.size_sm,
    color: Color.white,
  },
  recipeTagIngredients: {
    width: 50,
    // top:1,
    marginLeft: 5,
    height:21,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_5xs,
    alignItems: "center",
  },
  iconContainer: {
    position: 'absolute',
    top: 70,
    right: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSaved: {
    width:20,
    height:28,
    marginRight: 10,
  },
  iconToSave: {
    width:20,
    height:25,
    marginRight: 10,
  },
  iconBullet: {
    width: 30,
    height: 30,
  },
  filterButton: {
    marginLeft:-65, 
    backgroundColor:Color.backgroundGray,
    width:29, 
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

export default RecipeList;

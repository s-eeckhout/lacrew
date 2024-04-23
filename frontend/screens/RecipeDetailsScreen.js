// RecipeDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet ,TouchableOpacity} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Divider } from '@rneui/themed';
import { Color, FontFamily, FontSize, Padding, Border } from "../GlobalStyles";
import { Ionicons , AntDesign} from "@expo/vector-icons";
import { endpoint } from "../utils/endpoint";



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
  Dumplings: require("../assets/imgs/Dumplings.jpg"),
  Schweinshaxe: require("../assets/imgs/Schweinshaxe.jpg"),
  Meatballs: require("../assets/imgs/Meatballs.jpg")
};


 

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;
  const navigation = useNavigation();

  const updateBackend = async (newValue) => {
    const response = await fetch(endpoint + `recipes/${recipe.recipe.recipe_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ saved: newValue }),
    });
  
    if (response.ok) {
      console.log("Update successful");
    } else {
      console.error("Failed to update");
    }
  };

  const SaveIcon = (recipe) => {

    const [SAVED, setSAVED] = useState(false);
    const savedPress = () => {
      // setSAVED(!SAVED); // Toggle the SAVED state
      console.log("Saving recipe",recipe.recipe.recipe_id,  "- before: ", recipe.recipe.saved)
      updateBackend(!recipe.recipe.saved)
      console.log("Saving recipe",recipe.recipe.recipe_id,  "- after: ", recipe.recipe.saved)
    };
    return (
      // <View style={styles.iconContainer}>
          <TouchableOpacity onPress={savedPress} style={[styles.backButton]}>
            {/* recipe.saved */}
            {recipe.recipe.saved ? (<Image style={[styles.iconSaved]} contentFit="cover" source={require("../assets/iconSaved.png")} />) 
            : (<Image style={[styles.iconToSave]} contentFit="cover" source={require("../assets/iconToSave.png")} />
            )}
          </TouchableOpacity>
      // </View>
    );
  };

   // Custom Back Button component
   const BackButton = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("RecipeList")}
        style={styles.backButton}
      >
        <AntDesign name="left" size={27} color={Color.white} />
      </TouchableOpacity>
    );
  };


  return (
    <View style={styles.container}>
    
    <SaveIcon recipe = {recipe}/>
    
    <ScrollView >
      
      <Image
        style={styles.image}
        source={recipeImages[recipe.recipe_name]}
        resizeMode="cover"
      />
      <BackButton />
      <Text style={styles.title}>{recipe.recipe_name}</Text>
      <Text style={styles.description}>{recipe.recipe_description}</Text>

      {/* <Divider inset={true} insetType="middle"/> */}
      <View style={styles.information}>
        <Text style={styles.duration}>  <Text style={styles.subTitle}> DURATION {"\n"} </Text> {recipe.time} min  </Text>
        <Divider orientation="vertical"/>
        <Text style={styles.duration}>  <Text style={styles.subTitle}> FROM {"\n"} </Text> {recipe.from}  </Text>
        
        <Divider orientation="vertical"/>
        <Text style={styles.duration}>  <Text style={styles.subTitle}> SERVINGS {"\n"} </Text> 4 </Text>
      </View>
      

      <View style={styles.detailSection}>
        
        <Text style={styles.label}>Ingredients</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient}</Text>
        ))}
      </View>
      <Divider inset={true} insetType="middle" color={Color.gray} margin={20}/>
      <View style={styles.detailSection}>
      
        <Text style={styles.label}>Preparation</Text>
        <Text style={styles.preparation}>{recipe.preparation}</Text>
      </View>
      {/* Other details like duration, level, etc. */}
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 25,
  },
  title: {
    fontFamily: FontFamily.futuraBold,
    fontSize: 25,
    textAlign: "center",
    margin: 10,
  },
  description: {
    fontFamily: FontFamily.sfRegular,
    textAlign: "center",
    fontSize: 16,
    marginBottom: 15,
    color: Color.darkGray,
  },
  duration: {
    textAlign: "center",
    marginTop:10,
    marginBottom: 10,
    marginRight: 15,
    marginLeft:15,
  },
  information: {
    marginTop:5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    fontFamily: FontFamily.futuraCondensed,
    color: Color.darkGray
  },
  detailSection: {
    margin: 10,
  },
  label: {
    fontFamily: FontFamily.futuraMedium,
    fontWeight: 'bold',
    color: Color.blue,
    marginTop:5,
    marginLeft:5,
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 20,
  },
  preparation: {
    fontSize: 16,
    marginLeft:5,
  },
  backButton: {
    // Adjust style as needed
    position: "absolute",
    top: 50, // Adjust top as necessary
    left: 10, // Adjust left as necessary
    zIndex: 10, // Ensure button is clickable over other elements
  },
  iconContainer: {
    position: 'absolute',
    top: 5,
    right: 30,
    alignItems: 'center',
  },
  iconSaved: {
    width:25,
    height:35,
    marginLeft:331,
    marginTop:2,
    position: "absolute",
    alignItems: 'center',
    // zIndex: 10, // Ensure button is clickable over other elements
  },
  iconToSave: {
    width:35,
    height:35,
    marginLeft:325,
    marginTop:2,
    alignItems: 'center',
    position: "absolute",
    // zIndex: 10, // Ensure button is clickable over other elements
  },
});

export default RecipeDetailsScreen;

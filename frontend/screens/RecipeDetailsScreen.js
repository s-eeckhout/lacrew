// RecipeDetailsScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";

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

const RecipeDetailsScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={recipeImages[recipe.recipe_name]}
        resizeMode="cover"
      />
      <Text style={styles.title}>{recipe.recipe_name}</Text>
      <Text style={styles.description}>{recipe.recipe_description}</Text>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Ingredients:</Text>
        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>{ingredient}</Text>
        ))}
      </View>
      <View style={styles.detailSection}>
        <Text style={styles.label}>Preparation:</Text>
        <Text style={styles.preparation}>{recipe.preparation}</Text>
      </View>
      {/* Other details like duration, level, etc. */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  description: {
    fontSize: 16,
    margin: 10,
  },
  detailSection: {
    margin: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredient: {
    fontSize: 16,
    marginLeft: 20,
  },
  preparation: {
    fontSize: 16,
  },
  // Add styles for other elements
});

export default RecipeDetailsScreen;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator , ScrollView } from 'react-native';
import { DataContext } from '../App'; // Import the DataContext if you are using it
import {endpoint} from 'utils/endpoint'
import { Color, FontFamily, FontSize, Border, Padding } from "../GlobalStyles";
import { Image } from "expo-image";

const BlueHeader = () => {
  return (
    <Image
      style={styles.BlueHeader}
      contentFit="cover"
      source={require("../assets/BlueHeader.png")}
    />
  );
};

const Recipe1 = {
  name: "Fall Veloutè",
  imageSource: require("../assets/fall_veloute.png"),
  duration: "105 min",
  tagRedText: "Meal prep!",
  tagGreenText: "Easy",
  tagDaysText: "2 days",
  ingredients: [
    require("../assets/icon--beet.png"),
    require("../assets/icon--carrot.png"),
    require("../assets/icon--onion.png"),
    require("../assets/icon--lemon.png"),
  ],
};

const Recipe2 = {
  name: "Bún Chả",
  imageSource: require("../assets/bun_cha.png"),
  duration: "35 min",
  tagRedText: "Meal prep!",
  tagGreenText: "Easy",
  tagDaysText: "2 days",
  ingredients: [require("../assets/icon--onion.png")],
};

const RecipeItem = ({ recipe, lastItem }) => {
  return (
    <View style={[styles.recipeItemLayout, lastItem && { borderBottomWidth: 0 }]}>
      <Image style={styles.recipeImage} source={recipe.imageSource} />
      <View style={styles.recipeDetails}>
        <Text style={styles.recipeName}>{recipe.name}</Text>
        <Text style={styles.recipeDuration}>{recipe.duration}</Text>
        <Text style={styles.recipeDescription}>{recipe.description}</Text>
        <View style={styles.tagContainer}>
          <Text style={[styles.tag, styles.redTag]}>{recipe.tagRedText}</Text>
          <Text style={[styles.tag, styles.greenTag]}>{recipe.tagGreenText}</Text>
          <Text style={[styles.tag, styles.daysTag]}>{recipe.tagDaysText}</Text>
        </View>
      </View>
    </View>
  );
};


const RecipeList = ({ navigation }) => {
  // Use DataContext if you are passing the API data through context
  // const data = useContext(DataContext);

  // Local state for API data if you're fetching it in the component
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  

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
      <View style={styles.section}>
      <RecipeItem recipe={Recipe1} lastItem />
      </View>
      <View style={styles.section}>
      <RecipeItem recipe={Recipe2} lastItem />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  BlueHeader: {
    top: -50, 
    height: 152,
    width: 390,
    overflow: "hidden",
  },
  headerText: {
    fontWeight: "700",
    top: -110, 
    left: 20, 
    color: "white",
    fontFamily: FontFamily.asapSemiBold,
    fontSize: FontSize.size_3xl,
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  recipeItemLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGainsboro,
    paddingVertical: Padding.p_base,
  },
  section: {
    marginTop: 5,
    width: 350,
    left:20,
    backgroundColor: 'white',
    borderRadius: Border.br_xl,
    padding: Padding.p_base,
    // justifyContent: 'center', // Center vertically
    // alignItems: 'center', // Added to center items horizontally
  },
  recipeImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: Border.br_sm,
  },
  recipeDetails: {
    flex: 1,
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
    marginBottom: 5,
  },
  recipeDescription: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
    marginBottom: 5,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tag: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_xs,
    borderRadius: Border.br_xl,
    paddingHorizontal: Padding.p_sm,
    marginRight: 5,
    marginTop: 5
  },
  redTag: {
    backgroundColor: Color.colorRed,
    color: Color.colorWhite,
  },
  greenTag: {
    backgroundColor: 'green',
    color: Color.trueWhite,
  },
  daysTag: {
    backgroundColor: 'blue',
    color: Color.trueWhite,
  },
});

// export default RecipeItem;

export default RecipeList;

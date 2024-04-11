import * as React from "react";
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
import { endpoint } from "utils/endpoint";
import * as Progress from "react-native-progress";

const GroceriesList = () => {
  const groceries = [
    { name: "Salad 🥗", days: "02 days", completed: 20 },
    { name: "Milk 🥛", days: "04 days", completed: 40 },
    { name: "Carrot 🥕", days: "05 days", completed: 60 },
    { name: "Avocado 🥑", days: "7 days", completed: 80 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        {groceries.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Progress.Bar
              progress={item.completed / 100}
              width={200}
              color="#e69138"
              borderWidth="0"
              unfilledColor="#fce5cd"
            />
            <Text style={styles.days}>{item.days}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Recipe = ({ recipe }) => {
  return (
    <View style={[styles.ShadowBox]}>
      <Image
        style={styles.highlightRecipe1}
        contentFit="cover"
        source={recipe.imageSource}
      />
      <Image
        style={styles.unionIcon}
        contentFit="cover"
        source={require("../assets/union.png")}
      />
      <View style={[styles.tagsPosition]}>
        <View style={[styles.tagLayout, styles.recipeTagRed]}>
          <Text style={[styles.whiteText]}>{recipe.tagRedText}</Text>
        </View>

        <View style={[styles.tagLayout, styles.recipeTagGreen]}>
          <Text style={[styles.whiteText]}>{recipe.tagGreenText}</Text>
        </View>
      </View>
      <View style={[styles.content, styles.contentSpaceBlock]}>
        <Text style={[styles.titleRecipe, styles.titleTypo]}>
          {recipe.name}
        </Text>
      </View>
      <View style={[styles.RecipeRow1, styles.RecipeRow1Position]}>
        <Text style={[styles.recipeDuration]}>{recipe.duration}</Text>
        <View style={[styles.recipeTagDays, styles.tagLayout]}>
          <Text style={[styles.whiteText]}>{recipe.tagDaysText}</Text>
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
  );
};
// TODO: Make recipe clickable and towards new screen that loads recipe data

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

const Home = () => {
  const navigation = useNavigation();

  const handlePress = (screenName) => {
    // Navigate to the screen you want
    navigation.navigate(screenName);
  };
  // TODO: navigation to another screen (does not work yet)

  return (
    <View>
      <Image
        style={[styles.OrangeHeader, styles.HeaderPosition]}
        contentFit="cover"
        source={require("../assets/OrangeHeader.png")}
      />
      <View style={{ padding: 20 }}>
        <Text style={styles.headerText}>
          Did you eat something {"\n"}lately?
        </Text>
        <TouchableOpacity onPress={() => handlePress("FridgeContent")}>
          <Image
            style={styles.iconEdit}
            contentFit="cover"
            source={require("../assets/edit.png")}
          />
        </TouchableOpacity>
      </View>

      <View style={[styles.titleParent, styles.contentSpaceBlock]}>
        <Text style={styles.title}>Expiring Soon</Text>
        <GroceriesList />
      </View>

      {/* RECIPE IDEAS */}
      <Image
        style={[styles.BlueHeader, styles.BlueHeaderLayout]}
        contentFit="cover"
        source={require("../assets/BlueMiddle.png")}
      />
      <View style={[styles.titleGroup, styles.contentSpaceBlock]}>
        <Text style={[styles.titleRecipesIdeas, styles.titleTypo1]}>
          Recipes with Carrot{" "}
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
          <Recipe recipe={Recipe1} />
          <Recipe recipe={Recipe2} />
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
    fontFamily: FontFamily.asapBold,
    fontWeight: "700",
    color: Color.trueWhite,
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
    position: "absolute",
    zIndex: 3,
  },
  whiteText: {
    fontFamily: FontFamily.asapMedium,
    color: "white",
    fontWeight: "500",
    lineHeight: 14,
    fontSize: FontSize.size_xs,
    textAlign: "center",
    justifyContent: "center",
    // top: 173,
    // left: 5,
    zIndex: 4,
  },

  titleTypo: {
    width: 194,
    color: Color.trueWhite,
    fontFamily: FontFamily.asapBold,
    fontWeight: "700",
    textAlign: "left",
  },
  RecipeRow1Position: {
    zIndex: 1,
    alignItems: "center",
  },
  ingredientsPosition: {
    zIndex: 1,
    alignItems: "center",
  },
  ShadowwBox: {
    height: 197,
    shadowOpacity: 1,
    elevation: 20,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: "rgba(0, 0, 0, 0.5)",
    backgroundColor: Color.colorDarkslategray,
    borderRadius: Border.br_xl,
    width: 208,
    alignItems: "center",
    overflow: "hidden",
  },
  tagRedLayout: {
    padding: Padding.p_xs,
    borderRadius: Border.br_9xl,
    height: 17,
    // justifyContent: "center",
  },
  recipeTagRed: {
    width: 73,
    backgroundColor: Color.colorRed,
    // padding: Padding.p_xs,
    borderRadius: Border.br_xl,
    alignItems: "center",
    left: 0,
    height: 26,
    position: "absolute",
    top: 168,
    zIndex: 2,
  },
  label: {
    fontFamily: FontFamily.sFPro,
    fontSize: FontSize.size_xs,
    color: "white",
    textAlign: "center",
    top: 6,
  },
  recipeTagGreen: {
    left: 83,
    backgroundColor: Color.colorLimegreen,
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
    height: 152,
    width: "100%",
    top: 0,
    overflow: "hidden",
  },
  title: {
    fontWeight: "600",
    fontFamily: FontFamily.asapSemiBold,
    color: "#4286c6",
    width: 346,
    height: 23,
    textAlign: "left",
    fontSize: FontSize.size_lg,
  },
  headerText: {
    fontWeight: "700",
    // position: "absolute",
    top: 30, // Adjust this value as per your requirement
    left: 20, // Adjust this value as per your requirement
    color: "white",
    fontFamily: FontFamily.asapSemiBold,
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
    color: Color.trueWhite,
    fontSize: FontSize.size_sm,
    textAlign: "left",
  },
  recipeTagDays: {
    borderStyle: "solid",
    borderColor: Color.trueWhite,
    borderWidth: 1,
    alignItems: "center",
  },
  RecipeRow1: {
    top: 126,
    justifyContent: "space-between",
    width: 208,
    paddingVertical: 0,
    position: "absolute",
    flexDirection: "row",
    paddingHorizontal: Padding.p_3xs,
    left: 0,
  },
  iconEdit: {
    top: -17,
    width: 50,
    height: 50,
    marginLeft: 310,
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
    marginTop: 360,
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
    top: -2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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

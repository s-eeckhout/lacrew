import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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

const UserSettings = () => {
  return (
    <View style={styles.container}>
      <BlueHeader />
      <Text style={styles.headerText}>User Settings</Text>
      <View style={styles.section}>
        <SettingItem title="Food Restrictions/Intolerances" />
        <SettingItem title="Settings" />
        <SettingItem title="Support" lastItem />
      </View>
    </View>
  );
};

const SettingItem = ({ title, lastItem }) => {
  return (
    <View style={[styles.settingItem, lastItem && { borderBottomWidth: 0 }]}>
      <Text style={styles.settingText}>{title}</Text>
      <Image
        style={styles.arrowIcon}
        contentFit="cover"
        source={require("../assets/chevronright.png")}
      />
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
  section: {
    marginTop: -70,
    width: 350,
    left:20,
    backgroundColor: 'white',
    borderRadius: Border.br_xl,
    padding: Padding.p_base,
    // justifyContent: 'center', // Center vertically
    // alignItems: 'center', // Added to center items horizontally
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorGainsboro,
  },
  settingText: {
    fontFamily: FontFamily.asapRegular,
    fontSize: FontSize.size_sm,
    color: Color.colorDarkslategray,
  },
  arrowIcon: {
    width: 10, // Adjust size as needed
    height: 10, // Adjust size as needed
    marginRight: 10,
  },
});

export default UserSettings;

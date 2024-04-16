import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { DataContext } from "../App"; // Import the DataContext if you are using it
import { endpoint } from "utils/endpoint";
import { Padding, Border, FontFamily, Color, FontSize } from "../GlobalStyles";

// TODO: Styling

const FloatingSheet = ({ navigation }) => {
  return (
    <View style={styles.floatingsheet}>
      <View style={styles.titleDesc}>
      <Text style={styles.title}>Add groceries</Text>
        <Text style={styles.desc}>{`How do you want to add your groceries to the list? `}</Text>
      </View>

      <View style={styles.buttonAction}>
        <Pressable
          style={[styles.scanButton, styles.iconFlexBox]}
          onPress={() => {
            navigation.navigate("Camera");
          }}
        >
          <View style={[styles.icon, styles.iconFlexBox]}>
            <Text style={[styles.sfSymbol, styles.titleFlexBox]}>􀈠</Text>
          </View>
          <Text style={[styles.label, styles.labelTypo, styles.scanButtonText]}>
            Scan Receipt
          </Text>
        </Pressable>
        <Text style={[styles.secAction, styles.labelTypo2]}>Add Manually</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleFlexBox: {
    textAlign: "center",
    letterSpacing: 0,
  },
  iconFlexBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  labelTypo: {
    fontWeight: "600",
    lineHeight: 22,
    fontSize: FontSize.bodyBold_size,
    fontFamily: FontFamily.asapRegular,
    textAlign: "center",
    letterSpacing: 0,
  },
  labelTypo2: {
    fontFamily: FontFamily.asapBold,
    fontWeight: "bold",
    fontSize: FontSize.size_lg,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: 0,
    color: Color.colorDarkorange,
  },
  title: {
    fontSize: FontSize.size_3xl,
    marginTop: 60,
    fontWeight: "bold"
  },
  desc: {
    fontSize: FontSize.size_base,
    lineHeight: 20,
    marginTop: 10,
    width: "60%",
    fontFamily: FontFamily.asapRegular,
    textAlign: "center",
    color: Color.labelColorLightPrimary,
    letterSpacing: 0,
    alignSelf: "center",
  },
  titleDesc: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  imageIcon: {
    maxWidth: "100%",
    overflow: "hidden",
    height: 200,
    zIndex: 1,
    marginTop: 24,
    display: "none",
    alignSelf: "stretch",
    width: "100%",
  },
  sfSymbol: {
    fontSize: FontSize.defaultRegularTitle3_size,
    lineHeight: 24,
    fontFamily: FontFamily.asapRegular,
    color: Color.systemBackgroundLightPrimary,
    display: "none",
    textAlign: "center",
    letterSpacing: 0,
  },
  sfSymbolArrowtriangletur: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  icon: {
    height: 22,
    display: "none",
  },
  label: {
    marginLeft: 10,
    color: Color.systemBackgroundLightPrimary,
  },
  secAction: {
    color: "rgb(68, 163, 248)",
    marginTop: 100,
  },
  buttonAction: {
    zIndex: 2,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    borderRadius: Border.br_81xl,
    width: 22,
    zIndex: 3,
    height: 22,
  },
  floatingsheet: {
    borderRadius: 25,
    backgroundColor: Color.systemBackgroundLightPrimary,
    flex: 1,
    paddingHorizontal: Padding.p_13xl,
    paddingTop: 20,
    paddingBottom: Padding.p_11xl,
    alignItems: "center",
    width: "100%",
  },
  scanButton: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "rgb(68, 163, 248)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  scanButtonText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default FloatingSheet;
